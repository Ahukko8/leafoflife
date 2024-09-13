import { PageHeader } from "../../_components/PageHeader";
import db from "@/src/db/db";
import { ProductForm } from "../_components/ProductForm";

export default async function CreateProductPage() {
  const categories = await db.category.findMany();

  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm categories={categories} />;
    </>
  );
}
