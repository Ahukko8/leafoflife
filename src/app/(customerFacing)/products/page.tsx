import { cache } from "@/lib/cache";
import db from "@/src/db/db";
import ProductsClient from "./ProductsClient";

// Fetch categories
export const getCategories = cache(async () => {
  return db.category.findMany({
    orderBy: { name: "asc" },
  });
}, ["/products", "getCategories"]);

// Fetch products based on category
export const getProducts = cache(
  async (categoryId?: string) => {
    return db.product.findMany({
      where: {
        isAvailableForPurchase: true,
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
      },
      orderBy: { name: "asc" },
    });
  },
  ["/products", "getProducts"]
);

export default async function ProductsPage() {
  const categories = await getCategories();
  const initialProducts =
    categories.length > 0 ? await getProducts(categories[0]?.id) : [];

  return (
    <ProductsClient
      initialCategories={categories}
      initialProducts={initialProducts}
    />
  );
}
