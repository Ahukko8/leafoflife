"use server";

import db from "@/src/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadToSpaces } from "@/lib/uploadToSpaces";

// Define the shape of your error object
export interface FormErrors {
  name?: string[];
  description?: string[];
  priceInCents?: string[];
  categoryId?: string[];
  file?: string[];
  image?: string[];
  [key: string]: string[] | undefined;
}

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
  { message: "Must be an image file" }
);

const addSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  priceInCents: z.coerce.number().int().min(1, "Price must be at least 1 cent"),
  categoryId: z.string().min(1, "Category is required"),
  file: fileSchema.refine((file) => file.size > 0, "File is required"),
  image: imageSchema.refine((file) => file.size > 0, "Image is required"),
});

export async function addProduct(prevState: unknown, formData: FormData): Promise<FormErrors | { success: true }> {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    const fileKey = `products/${crypto.randomUUID()}-${data.file.name}`;
    const filePath = await uploadToSpaces(data.file, fileKey);

    const imageKey = `products/${crypto.randomUUID()}-${data.image.name}`;
    const imagePath = await uploadToSpaces(data.image, imageKey);

    if (!filePath || !imagePath) {
      return { error: ["Failed to upload file or image"] } as FormErrors;
    }

    await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath,
        imagePath,
        category: { connect: { id: data.categoryId } },
      },
    });

    revalidatePath("/");
    revalidatePath("/products");

    

    return { success: true};
  } catch (error) {
    console.error("Error adding product:", error);
    return { error: ["An unexpected error occurred while adding the product"] } as FormErrors;
  }
}
const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
): Promise<FormErrors | { error: string }> {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return { error: "Product not found" };

  try {
    let filePath = product.filePath;
    let imagePath = product.imagePath;

    if (data.file && data.file.size > 0) {
      const fileKey = `products/${crypto.randomUUID()}-${data.file.name}`;
      const newFilePath = await uploadToSpaces(data.file, fileKey);
      if (newFilePath) filePath = newFilePath;
    }

    if (data.image && data.image.size > 0) {
      const imageKey = `products/${crypto.randomUUID()}-${data.image.name}`;
      const newImagePath = await uploadToSpaces(data.image, imageKey);
      if (newImagePath) imagePath = newImagePath;
    }

    await db.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath,
        imagePath,
        category: { connect: { id: data.categoryId } },
      },
    });

    revalidatePath("/");
    revalidatePath("/products");

    redirect("/admin/products");
  } catch (error) {
    console.error("Error updating product:", error);
    return { error: "An unexpected error occurred while updating the product" };
  }
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  try {
    await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
    revalidatePath("/");
    revalidatePath("/products");
  } catch (error) {
    console.error("Error toggling product availability:", error);
    return { error: "An unexpected error occurred while updating product availability" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await db.product.delete({ where: { id } });

    if (product == null) return { error: "Product not found" };

    // Note: This doesn't delete the files from DigitalOcean Spaces.
    // You might want to implement this functionality if needed.

    revalidatePath("/");
    revalidatePath("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    return { error: "An unexpected error occurred while deleting the product" };
  }
}