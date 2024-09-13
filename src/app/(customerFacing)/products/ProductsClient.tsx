"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ProductCard,
  ProductCardSkeleton,
  ProductCardProps,
} from "@/src/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import CategoriesBar from "@/src/components/CategoriesBar";
import PaginationComponent from "@/src/components/PaginationComponent";

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
  categoryId: string | null,
  page: number,
  searchTerm: string
): Promise<{
  products: ProductCardProps[];
  pagination: { currentPage: number; totalPages: number; totalCount: number };
}> {
  const url = new URL(
    categoryId ? `/api/products?categoryId=${categoryId}` : "/api/products",
    window.location.origin
  );
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", "10");
  if (searchTerm) url.searchParams.append("search", searchTerm);

  const response = await fetch(url.toString());
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts(selectedCategory, currentPage, searchTerm)
      .then(({ products, pagination }) => {
        setProducts(products);
        setTotalPages(pagination.totalPages);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCategory, currentPage, searchTerm]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  // Find the name of the selected category
  const selectedCategoryName =
    categories.find((category) => category.id === selectedCategory)?.name ||
    "All Products";

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.section
        className="text-[#3E3C37] py-12 mb-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-extrabold mb-4 mx-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Products
        </motion.h1>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="w-full md:w-1/3"
          >
            <CategoriesBar
              categories={categories}
              onSelectCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </motion.div>

          <motion.form
            onSubmit={handleSearch}
            className="w-full md:w-2/3 flex gap-2 items-center"
          >
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              className="bg-primary-leaf text-white px-6 py-3 rounded-lg shadow-lg hover:bg-primary-leaf/80 transition-colors"
            >
              Search
            </Button>
          </motion.form>
        </motion.div>
      </motion.section>

      {selectedCategory && (
        <motion.h4
          className="text-2xl font-semibold mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Category: {selectedCategoryName}
        </motion.h4>
      )}

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {[...Array(10)].map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="products"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center text-lg text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                No products found.
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8"
      >
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </motion.div>
    </div>
  );
}
