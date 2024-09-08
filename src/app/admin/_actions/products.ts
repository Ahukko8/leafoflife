// "use server";

// import db from "@/src/db/db";
// import { z } from "zod";
// import fs from "fs/promises";
// import { notFound, redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

// const fileSchema = z.instanceof(File, { message: "Required" });
// const imageSchema = fileSchema.refine(
//   (file) => file.size === 0 || file.type.startsWith("image/")
// );

// const addSchema = z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
//   priceInCents: z.coerce.number().int().min(1),
//   categoryId: z.string().min(1),
//   file: fileSchema.refine((file) => file.size > 0, "Required"),
//   image: imageSchema.refine((file) => file.size > 0, "Required"),
// });

// export async function addProduct(prevState: unknown, formData: FormData) {
//   const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
//   if (result.success === false) {
//     return result.error.formErrors.fieldErrors;
//   }

//   const data = result.data;

//   await fs.mkdir("products", { recursive: true });
//   const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
//   await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

//   await fs.mkdir("public/products", { recursive: true });
//   const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
//   await fs.writeFile(
//     `public${imagePath}`,
//     Buffer.from(await data.image.arrayBuffer())
//   );

//   await db.product.create({
//     data: {
//       isAvailableForPurchase: false,
//       name: data.name,
//       description: data.description,
//       priceInCents: data.priceInCents,
//       filePath,
//       imagePath,
//       category: { connect: { id: data.categoryId } },
//     },
//   });

//   revalidatePath("/");
//   revalidatePath("/products");

//   redirect("/admin/products");
// }

// const editSchema = addSchema.extend({
//   file: fileSchema.optional(),
//   image: imageSchema.optional(),
// });

// export async function updateProduct(
//   id: string,
//   prevState: unknown,
//   formData: FormData
// ) {
//   const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
//   if (result.success === false) {
//     return result.error.formErrors.fieldErrors;
//   }

//   const data = result.data;
//   const product = await db.product.findUnique({ where: { id } });

//   if (product == null) return notFound();

//   let filePath = product.filePath;

//   if (data.file != null && data.file.size > 0) {
//     await fs.unlink(product.filePath);
//     filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
//     await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
//   }

//   let imagePath = product.imagePath;

//   if (data.image != null && data.image.size > 0) {
//     await fs.unlink(`public${product.imagePath}`);
//     const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
//     await fs.writeFile(
//       `public${imagePath}`,
//       Buffer.from(await data.image.arrayBuffer())
//     );
//   }

//   await db.product.update({
//     where: { id },
//     data: {
//       name: data.name,
//       description: data.description,
//       priceInCents: data.priceInCents,
//       filePath,
//       imagePath,
//       category: { connect: { id: data.categoryId } },
//     },
//   });

//   revalidatePath("/");
//   revalidatePath("/products");

//   redirect("/admin/products");
// }

// export async function toggleProductAvailability(
//   id: string,
//   isAvailableForPurchase: boolean
// ) {
//   await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

//   revalidatePath("/");
//   revalidatePath("/products");
// }

// export async function deleteProduct(id: string) {
//   const product = await db.product.delete({ where: { id } });

//   if (product == null) return notFound();

//   await fs.unlink(product.filePath);
//   await fs.unlink(`public${product.imagePath}`);

//   revalidatePath("/");
//   revalidatePath("/products");
// }

"use server";

import db from "@/src/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AWS from "aws-sdk";
import { uploadFile } from "@/src/services/s3Service"; // Adjust the import path according to your project structure

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  categoryId: z.string().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Upload image to S3
  const imagePath = `products/${crypto.randomUUID()}-${data.image.name}`;
  const imageUploadResult = await uploadFile(
    data.image,
    process.env.AWS_S3_BUCKET_NAME!
  );

  // Get the image URL from S3 response
  const imageUrl = imageUploadResult.Location;

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: "", // Handle file upload similarly if needed
      imagePath: imageUrl, // Store S3 URL instead of local path
      category: { connect: { id: data.categoryId } },
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let imagePath = product.imagePath;

  if (data.image != null && data.image.size > 0) {
    // Upload new image to S3
    const newImagePath = `products/${crypto.randomUUID()}-${data.image.name}`;
    const imageUploadResult = await uploadFile(
      data.image,
      process.env.AWS_S3_BUCKET_NAME!
    );

    // Get the image URL from S3 response
    imagePath = imageUploadResult.Location;
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: product.filePath,
      imagePath: imagePath, // Update with S3 URL
      category: { connect: { id: data.categoryId } },
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });

  if (product == null) return notFound();

  // Handle S3 file deletion if needed

  revalidatePath("/");
  revalidatePath("/products");
}
