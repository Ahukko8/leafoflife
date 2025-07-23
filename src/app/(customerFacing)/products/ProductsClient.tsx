"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
import { Nav } from "@/src/components/Nav";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/homePage/Footer";
import { Search, Filter, X, Menu, ChevronRight } from "lucide-react";

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
  url.searchParams.append("limit", "12");
  if (searchTerm) url.searchParams.append("search", searchTerm);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export default function ProductsClient({
  initialCategories,
  initialProducts,
}: ProductsClientProps) {
  const router = useRouter();
  const categories = usePollingCategories(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductCardProps[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts(selectedCategory, currentPage, searchTerm)
      .then(({ products, pagination }) => {
        setProducts(products);
        setTotalPages(pagination.totalPages);
        setTotalCount(pagination.totalCount);
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

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}/purchase`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const selectedCategoryName =
    categories.find((category) => category.id === selectedCategory)?.name ||
    "All Products";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1,
      },
    },
  };

  const sidebarVariants = {
    hidden: { 
      x: -320,
      opacity: 0
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }
    },
    exit: { 
      x: -320,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section - Added top padding to account for fixed navbar */}
      <div className="bg-white border-b border-gray-200 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Our Products
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collection of premium products
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 bg-white"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-green-600" />
                  Categories
                </h3>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                      selectedCategory === null
                        ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>All Products</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                        selectedCategory === category.id
                          ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{category.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden fixed bottom-6 right-6 z-50">
            <Button
              onClick={() => setSidebarOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  variants={sidebarVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-2xl"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Filter className="w-5 h-5 text-green-600" />
                        Categories
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          selectedCategory === null
                            ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        All Products
                      </button>
                      
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setSidebarOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                            selectedCategory === category.id
                              ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {selectedCategoryName}
                </h2>
                {!isLoading && (
                  <p className="text-gray-600 mt-1">
                    {totalCount} {totalCount === 1 ? 'product' : 'products'} found
                  </p>
                )}
              </div>
              
              {/* Mobile Category Display */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setSidebarOpen(true)}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Categories
                </Button>
              </div>
            </div>

            {/* Products Grid */}
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
                  {[...Array(12)].map((_, index) => (
                    <ProductCardSkeleton key={`skeleton-${index}`} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="products"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {products.length > 0 ? (
                    products.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={itemVariants}
                        whileHover={{ 
                          y: -4, 
                          transition: { duration: 0.2 } 
                        }}
                        className="group cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 group-hover:border-green-200">
                          <ProductCard {...product} />
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="col-span-full"
                      variants={itemVariants}
                    >
                      <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                          No products found
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          We could not find any products matching your search. Try adjusting your filters or search terms.
                        </p>
                        <Button
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory(null);
                            setCurrentPage(1);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                          Clear all filters
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {!isLoading && products.length > 0 && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-12"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}