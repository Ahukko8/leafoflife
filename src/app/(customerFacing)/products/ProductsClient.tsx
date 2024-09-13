// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import CategoriesBar from "@/src/components/CategoriesBar";
// // // import { ProductCard, ProductCardSkeleton, ProductCardProps } from "@/src/components/ProductCard";

// // // interface ProductsClientProps {
// // //   initialCategories: { id: string; name: string }[];
// // //   initialProducts: ProductCardProps[];
// // // }

// // // async function fetchProducts(categoryId: string): Promise<ProductCardProps[]> {
// // //   const response = await fetch(`/api/products?categoryId=${categoryId}`);
// // //   return response.json();
// // // }

// // // export default function ProductsClient({ initialCategories, initialProducts }: ProductsClientProps) {
// // //   console.log("Initial categories:", initialCategories);
// // //   console.log("Initial products:", initialProducts);

// // //   const [selectedCategory, setSelectedCategory] = useState<string | undefined>(() => {
// // //     return initialCategories && initialCategories.length > 0 ? initialCategories[0].id : undefined;
// // //   });
// // //   const [categories, setCategories] = useState<{ id: string; name: string }[]>(initialCategories || []);
// // //   const [products, setProducts] = useState<ProductCardProps[]>(initialProducts || []);
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   useEffect(() => {
// // //     if (selectedCategory) {
// // //       setIsLoading(true);
// // //       fetchProducts(selectedCategory)
// // //         .then(fetchedProducts => {
// // //           console.log("Fetched products:", fetchedProducts);
// // //           setProducts(fetchedProducts);
// // //         })
// // //         .catch(error => {
// // //           console.error("Failed to fetch products:", error);
// // //         })
// // //         .finally(() => {
// // //           setIsLoading(false);
// // //         });
// // //     }
// // //   }, [selectedCategory]);

// // //   const handleSelectCategory = (categoryId: string) => {
// // //     console.log("Selected category:", categoryId);
// // //     setSelectedCategory(categoryId);
// // //   };

// // //   console.log("Rendering products:", products);

// // //   return (
// // //     <div className="container mt-10 overflow-hidden flex flex-col md:flex-row">
// // //       <div className="mt-20 w-full md:w-1/4 mr-0 md:mr-6 mb-6 md:mb-0 border border-gray-300 rounded-lg">
// // //         <h2 className="font-bold text-center border-gray-300 bg-primary-leaf text-white">
// // //           CATEGORIES
// // //         </h2>
// // //         <CategoriesBar
// // //           onSelectCategory={handleSelectCategory}
// // //           categories={categories}
// // //           selectedCategory={selectedCategory}
// // //         />
// // //       </div>

// // //       <div className="flex-1">
// // //         <h1 className="font-bold text-3xl text-slate-700 mb-10">
// // //           Discover our Products
// // //         </h1>
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //           {isLoading ? (
// // //             <>
// // //               <ProductCardSkeleton />
// // //               <ProductCardSkeleton />
// // //               <ProductCardSkeleton />
// // //               <ProductCardSkeleton />
// // //               <ProductCardSkeleton />
// // //               <ProductCardSkeleton />
// // //             </>
// // //           ) : products.length > 0 ? (
// // //             products.map((product) => (
// // //               <ProductCard key={product.id} {...product}/>
// // //             ))
// // //           ) : (
// // //             <div>No products found.</div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useState, useEffect, useCallback } from "react";
// // import CategoriesBar from "@/src/components/CategoriesBar";
// // import { ProductCard, ProductCardSkeleton, ProductCardProps } from "@/src/components/ProductCard";

// // interface Category {
// //   id: string;
// //   name: string;
// // }

// // interface ProductsClientProps {
// //   initialCategories: Category[];
// //   initialProducts: ProductCardProps[];
// // }

// // // Custom hook for polling categories
// // function usePollingCategories(initialCategories: Category[], pollingInterval = 5000) {
// //   const [categories, setCategories] = useState<Category[]>(initialCategories);

// //   const fetchCategories = useCallback(async () => {
// //     try {
// //       const response = await fetch('/api/categories');
// //       if (!response.ok) throw new Error('Failed to fetch categories');
// //       const fetchedCategories: Category[] = await response.json();
// //       setCategories(fetchedCategories);
// //     } catch (error) {
// //       console.error("Error fetching categories:", error);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const intervalId = setInterval(fetchCategories, pollingInterval);
// //     return () => clearInterval(intervalId);
// //   }, [fetchCategories, pollingInterval]);

// //   return categories;
// // }

// // async function fetchProducts(categoryId: string): Promise<ProductCardProps[]> {
// //   const response = await fetch(`/api/products?categoryId=${categoryId}`);
// //   if (!response.ok) throw new Error('Failed to fetch products');
// //   return response.json();
// // }

// // export default function ProductsClient({ initialCategories, initialProducts }: ProductsClientProps) {
// //   const categories = usePollingCategories(initialCategories);
// //   const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
// //     return categories.length > 0 ? categories[0].id : null;
// //   });
// //   const [products, setProducts] = useState<ProductCardProps[]>(initialProducts);
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

// //   useEffect(() => {
// //     // If the selected category is deleted, select the first available category or null
// //     if (selectedCategory && !categories.some(cat => cat.id === selectedCategory)) {
// //       setSelectedCategory(categories.length > 0 ? categories[0].id : null);
// //     }
// //   }, [categories, selectedCategory]);

// //   const handleSelectCategory = (categoryId: string | null) => {
// //     console.log("Selected category:", categoryId);
// //     setSelectedCategory(categoryId);
// //   };

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
// import {
//   ProductCard,
//   ProductCardSkeleton,
//   ProductCardProps,
// } from "@/src/components/ProductCard";

// interface Category {
//   id: string;
//   name: string;
// }

// interface ProductsClientProps {
//   initialCategories: Category[];
//   initialProducts: ProductCardProps[];
// }

// function usePollingCategories(
//   initialCategories: Category[],
//   pollingInterval = 5000
// ) {
//   const [categories, setCategories] = useState<Category[]>(initialCategories);

//   const fetchCategories = useCallback(async () => {
//     try {
//       const response = await fetch("/api/categories");
//       if (!response.ok) throw new Error("Failed to fetch categories");
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

// async function fetchProducts(
//   categoryId: string | null
// ): Promise<ProductCardProps[]> {
//   const url = categoryId
//     ? `/api/products?categoryId=${categoryId}`
//     : "/api/products";
//   const response = await fetch(url);
//   if (!response.ok) throw new Error("Failed to fetch products");
//   return response.json();
// }

// export default function ProductsClient({
//   initialCategories,
//   initialProducts,
// }: ProductsClientProps) {
//   const categories = usePollingCategories(initialCategories);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [products, setProducts] = useState<ProductCardProps[]>(initialProducts);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     fetchProducts(selectedCategory)
//       .then((fetchedProducts) => {
//         console.log("Fetched products:", fetchedProducts);
//         setProducts(fetchedProducts);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch products:", error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [selectedCategory]);

//   useEffect(() => {
//     // If the selected category is deleted, select null (All Categories)
//     if (
//       selectedCategory &&
//       !categories.some((cat) => cat.id === selectedCategory)
//     ) {
//       setSelectedCategory(null);
//     }
//   }, [categories, selectedCategory]);

//   const handleSelectCategory = (categoryId: string | null) => {
//     console.log("Selected category:", categoryId);
//     setSelectedCategory(categoryId);
//   };

//   return (
//     <div className="container mt-10 overflow-hidden flex flex-col md:flex-row">
//       <div className="mt-20 w-full md:w-1/4 mr-0 md:mr-6 mb-6 md:mb-0 border border-gray-300 rounded-lg">
//         <h2 className="p-2 font-bold text-center border-gray-300 bg-primary-leaf text-white">
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

import { useState, useEffect, useCallback } from "react";
import CategoriesBar from "@/src/components/CategoriesBar";
import {
  ProductCard,
  ProductCardSkeleton,
  ProductCardProps,
} from "@/src/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";

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
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts(selectedCategory)
      .then((fetchedProducts) => {
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
    if (
      selectedCategory &&
      !categories.some((cat) => cat.id === selectedCategory)
    ) {
      setSelectedCategory(null);
    }
  }, [categories, selectedCategory]);

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setShowCategories(false);
  };

  const titleAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      } 
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <motion.h1
          className="text-4xl font-bold text-slate-700 mb-4 md:mb-0"
          initial="hidden"
          animate="visible"
          variants={titleAnimation}
        >
          Discover our Products
        </motion.h1>
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="md:hidden flex items-center justify-center bg-primary-leaf text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-opacity-90"
        >
          <Filter size={20} className="mr-2" />
          Filter
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <AnimatePresence>
          {(showCategories || !isLoading) && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/4 mr-0 md:mr-6 mb-6 md:mb-0"
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="p-4 font-bold text-center bg-primary-leaf text-white">
                  CATEGORIES
                </h2>
                <CategoriesBar
                  onSelectCategory={handleSelectCategory}
                  categories={categories}
                  selectedCategory={selectedCategory}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[...Array(6)].map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ProductCard {...product} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      key="no-products"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="col-span-full text-center text-lg text-gray-500"
                    >
                      No products found.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}