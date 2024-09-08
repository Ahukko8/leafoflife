// // "use client";

// // import { useState, useEffect } from "react";
// // import CategoriesBar from "@/src/components/CategoriesBar";
// // import { ProductCard, ProductCardSkeleton, ProductCardProps } from "@/src/components/ProductCard";

// // interface ProductsClientProps {
// //   initialCategories: { id: string; name: string }[];
// //   initialProducts: ProductCardProps[];
// // }

// // async function fetchProducts(categoryId: string): Promise<ProductCardProps[]> {
// //   const response = await fetch(`/api/products?categoryId=${categoryId}`);
// //   return response.json();
// // }

// // export default function ProductsClient({ initialCategories, initialProducts }: ProductsClientProps) {
// //   console.log("Initial categories:", initialCategories);
// //   console.log("Initial products:", initialProducts);

// //   const [selectedCategory, setSelectedCategory] = useState<string | undefined>(() => {
// //     return initialCategories && initialCategories.length > 0 ? initialCategories[0].id : undefined;
// //   });
// //   const [categories, setCategories] = useState<{ id: string; name: string }[]>(initialCategories || []);
// //   const [products, setProducts] = useState<ProductCardProps[]>(initialProducts || []);
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     if (selectedCategory) {
// //       setIsLoading(true);
// //       fetchProducts(selectedCategory)
// //         .then(fetchedProducts => {
// //           console.log("Fetched products:", fetchedProducts);
// //           setProducts(fetchedProducts);
// //         })
// //         .catch(error => {
// //           console.error("Failed to fetch products:", error);
// //         })
// //         .finally(() => {
// //           setIsLoading(false);
// //         });
// //     }
// //   }, [selectedCategory]);

// //   const handleSelectCategory = (categoryId: string) => {
// //     console.log("Selected category:", categoryId);
// //     setSelectedCategory(categoryId);
// //   };

// //   console.log("Rendering products:", products);

// //   return (
// //     <div className="container mt-10 overflow-hidden flex flex-col md:flex-row">
// //       <div className="mt-20 w-full md:w-1/4 mr-0 md:mr-6 mb-6 md:mb-0 border border-gray-300 rounded-lg">
// //         <h2 className="font-bold text-center border-gray-300 bg-primary-leaf text-white">
// //           CATEGORIES
// //         </h2>
// //         <CategoriesBar
// //           onSelectCategory={handleSelectCategory}
// //           categories={categories}
// //           selectedCategory={selectedCategory}
// //         />
// //       </div>

// //       <div className="flex-1">
// //         <h1 className="font-bold text-3xl text-slate-700 mb-10">
// //           Discover our Products
// //         </h1>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {isLoading ? (
// //             <>
// //               <ProductCardSkeleton />
// //               <ProductCardSkeleton />
// //               <ProductCardSkeleton />
// //               <ProductCardSkeleton />
// //               <ProductCardSkeleton />
// //               <ProductCardSkeleton />
// //             </>
// //           ) : products.length > 0 ? (
// //             products.map((product) => (
// //               <ProductCard key={product.id} {...product}/>
// //             ))
// //           ) : (
// //             <div>No products found.</div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect, useCallback } from "react";
// import CategoriesBar from "@/src/components/CategoriesBar";
// import { ProductCard, ProductCardSkeleton, ProductCardProps } from "@/src/components/ProductCard";

// interface Category {
//   id: string;
//   name: string;
// }

// interface ProductsClientProps {
//   initialCategories: Category[];
//   initialProducts: ProductCardProps[];
// }

// // Custom hook for polling categories
// function usePollingCategories(initialCategories: Category[], pollingInterval = 5000) {
//   const [categories, setCategories] = useState<Category[]>(initialCategories);

//   const fetchCategories = useCallback(async () => {
//     try {
//       const response = await fetch('/api/categories');
//       if (!response.ok) throw new Error('Failed to fetch categories');
//       const fetchedCategories: Category[] = await response.json();
//       setCategories(fetchedCategories);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   }, []);

//   useEffect(() => {
//     const intervalId = setInterval(fetchCategories, pollingInterval);
//     return () => clearInterval(intervalId);
//   }, [fetchCategories, pollingInterval]);

//   return categories;
// }

// async function fetchProducts(categoryId: string): Promise<ProductCardProps[]> {
//   const response = await fetch(`/api/products?categoryId=${categoryId}`);
//   if (!response.ok) throw new Error('Failed to fetch products');
//   return response.json();
// }

// export default function ProductsClient({ initialCategories, initialProducts }: ProductsClientProps) {
//   const categories = usePollingCategories(initialCategories);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
//     return categories.length > 0 ? categories[0].id : null;
//   });
//   const [products, setProducts] = useState<ProductCardProps[]>(initialProducts);
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

//   useEffect(() => {
//     // If the selected category is deleted, select the first available category or null
//     if (selectedCategory && !categories.some(cat => cat.id === selectedCategory)) {
//       setSelectedCategory(categories.length > 0 ? categories[0].id : null);
//     }
//   }, [categories, selectedCategory]);

//   const handleSelectCategory = (categoryId: string | null) => {
//     console.log("Selected category:", categoryId);
//     setSelectedCategory(categoryId);
//   };

//   return (
//     <div className="container mt-10 overflow-hidden flex flex-col md:flex-row">
//       <div className="mt-20 w-full md:w-1/4 mr-0 md:mr-6 mb-6 md:mb-0 border border-gray-300 rounded-lg">
//         <h2 className="font-bold text-center border-gray-300 bg-primary-leaf text-white">
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
//               <ProductCard key={product.id} {...product}/>
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

import { useState, useEffect, useCallback } from "react";
import CategoriesBar from "@/src/components/CategoriesBar";
import {
  ProductCard,
  ProductCardSkeleton,
  ProductCardProps,
} from "@/src/components/ProductCard";

interface Category {
  id: string;
  name: string;
}

interface ProductsClientProps {
  initialCategories: Category[];
  initialProducts: ProductCardProps[];
}

function usePollingCategories(
  initialCategories: Category[],
  pollingInterval = 5000
) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const fetchedCategories: Category[] = await response.json();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchCategories, pollingInterval);
    return () => clearInterval(intervalId);
  }, [fetchCategories, pollingInterval]);

  return categories;
}

async function fetchProducts(
  categoryId: string | null
): Promise<ProductCardProps[]> {
  const url = categoryId
    ? `/api/products?categoryId=${categoryId}`
    : "/api/products";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export default function ProductsClient({
  initialCategories,
  initialProducts,
}: ProductsClientProps) {
  const categories = usePollingCategories(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductCardProps[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts(selectedCategory)
      .then((fetchedProducts) => {
        console.log("Fetched products:", fetchedProducts);
        setProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    // If the selected category is deleted, select null (All Categories)
    if (
      selectedCategory &&
      !categories.some((cat) => cat.id === selectedCategory)
    ) {
      setSelectedCategory(null);
    }
  }, [categories, selectedCategory]);

  const handleSelectCategory = (categoryId: string | null) => {
    console.log("Selected category:", categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container mt-10 overflow-hidden flex flex-col md:flex-row">
      <div className="mt-20 w-full md:w-1/4 mr-0 md:mr-6 mb-6 md:mb-0 border border-gray-300 rounded-lg">
        <h2 className="p-2 font-bold text-center border-gray-300 bg-primary-leaf text-white">
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
