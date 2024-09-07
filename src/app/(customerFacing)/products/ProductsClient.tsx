// // src/app/(customerFacing)/products/ProductsClient.tsx

// "use client";

// import { useState, useEffect } from "react";
// import CategoriesBar from "@/src/components/CategoriesBar";
// import { ProductCard, ProductCardSkeleton } from "@/src/components/ProductCard";

// interface ProductsClientProps {
//   initialCategories: { id: string; name: string }[];
//   initialProducts: any[];
// }

// async function fetchProducts(categoryId: string) {
//   const response = await fetch(`/api/products?categoryId=${categoryId}`);
//   return response.json();
// }

// export default function ProductsClient({ initialCategories, initialProducts }: ProductsClientProps) {
//   const [selectedCategory, setSelectedCategory] = useState<string | undefined>(() => {
//     return initialCategories && initialCategories.length > 0 ? initialCategories[0].id : undefined;
//   });
//   const [categories, setCategories] = useState<{ id: string; name: string }[]>(initialCategories || []);
//   const [products, setProducts] = useState<any[]>(initialProducts || []);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (selectedCategory) {
//       setIsLoading(true);
//       fetchProducts(selectedCategory)
//         .then(fetchedProducts => {
//           console.log("Fetched products:", fetchedProducts);
//           setProducts(fetchedProducts);
//         })
//         .catch(error => {
//           console.error("Failed to fetch products:", error);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     }
//   }, [selectedCategory]);

//   const handleSelectCategory = (categoryId: string) => {
//     setSelectedCategory(categoryId);
//   };

//   return (
//     <div className="container mt-10 overflow-hidden flex flex-col md:flex-row">
//       <div className="mt-20 w-full md:w-1/4 mr-0 md:mr-6 mb-6 md:mb-0">
//         <h2 className="font-bold text-center text-muted-foreground">
//           CATEGORIES
//         </h2>
//         <CategoriesBar
//           onSelectCategory={handleSelectCategory}
//           categories={categories}
//           selectedCategory={selectedCategory}
//         />
//       </div>

//       <div className="flex-1">
//         <h1 className="font-bold text-3xl text-slate-700 mb-10">
//           Discover our Products
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {isLoading ? (
//             <>
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//               <ProductCardSkeleton />
//             </>
//           ) : products.length > 0 ? (
//             products.map((product) => (
//               <ProductCard key={product.id} {...product} />
//             ))
//           ) : (
//             <div>No products found.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import CategoriesBar from "@/src/components/CategoriesBar";
import { ProductCard, ProductCardSkeleton, ProductCardProps } from "@/src/components/ProductCard";

interface ProductsClientProps {
  initialCategories: { id: string; name: string }[];
  initialProducts: ProductCardProps[];
}

async function fetchProducts(categoryId: string): Promise<ProductCardProps[]> {
  const response = await fetch(`/api/products?categoryId=${categoryId}`);
  return response.json();
}

export default function ProductsClient({ initialCategories, initialProducts }: ProductsClientProps) {
  console.log("Initial categories:", initialCategories);
  console.log("Initial products:", initialProducts);

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(() => {
    return initialCategories && initialCategories.length > 0 ? initialCategories[0].id : undefined;
  });
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(initialCategories || []);
  const [products, setProducts] = useState<ProductCardProps[]>(initialProducts || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      fetchProducts(selectedCategory)
        .then(fetchedProducts => {
          console.log("Fetched products:", fetchedProducts);
          setProducts(fetchedProducts);
        })
        .catch(error => {
          console.error("Failed to fetch products:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedCategory]);

  const handleSelectCategory = (categoryId: string) => {
    console.log("Selected category:", categoryId);
    setSelectedCategory(categoryId);
  };

  console.log("Rendering products:", products);

  return (
    <div className="container mt-10 overflow-hidden flex flex-col md:flex-row">
      <div className="mt-20 w-full md:w-1/4 mr-0 md:mr-6 mb-6 md:mb-0">
        <h2 className="font-bold text-center text-muted-foreground">
          CATEGORIES
        </h2>
        <CategoriesBar
          onSelectCategory={handleSelectCategory}
          categories={categories}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="flex-1">
        <h1 className="font-bold text-3xl text-slate-700 mb-10">
          Discover our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
}