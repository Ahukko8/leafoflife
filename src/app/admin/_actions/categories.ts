"use server";

import db from "@/src/db/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const categorySchema = z.object({
  name: z.string().min(1),
});

export async function createCategory(formData: FormData) {
  const result = categorySchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    throw new Error("Invalid category data: " + JSON.stringify(result.error.formErrors));
  }

  const data = result.data;

  try {
    const category = await db.category.create({
      data: {
        name: data.name,
      },
    });

    console.log("Category created:", category);
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }

  revalidatePath("/");
//   revalidatePath("/categories"); // Assuming you have a categories page

  redirect("/admin/categories"); // Assuming you have an admin categories page
}