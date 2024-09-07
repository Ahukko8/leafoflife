import db from "@/src/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";
import { Category } from "@prisma/client";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // Fetch the product by ID
  const product = await db.product.findUnique({
    where: { id },
  });

  // Fetch all categories
  const categories: Category[] = await db.category.findMany();

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} categories={categories} />
    </>
  );
}
