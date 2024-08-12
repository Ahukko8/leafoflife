import { ProductCard, ProductCardSkeleton } from "@/src/components/ProductCard";
import db from "@/src/db/db";
import { cache } from "@/src/lib/cache";
import { Suspense } from "react";

const getProducts = cache( () => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"])

export default function ProductsPage() {
  return (
    <div className="container mt-10 overflow-hidden">
      <h1 className="font-bold text-3xl text-slate-700 mb-10">Discover our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
      </div>
      
    </div>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();

  return products.map((product) => (
    <ProductCard key={product.id} {...product}  />
  ));
}
