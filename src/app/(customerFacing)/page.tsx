import TreatmentsHome from "@/src/components/homePage/TreatmentsHome";
import Hero from "@/src/components/homePage/Hero";
import { ProductCard, ProductCardSkeleton } from "@/src/components/ProductCard";
import { Button } from "@/src/components/ui/button";
import db from "@/src/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ContactUs from "@/src/components/homePage/Contact";
import AboutUs from "@/src/components/homePage/About";
import Footer from "@/src/components/homePage/Footer";
import Faq from "@/src/components/homePage/Faq";
import treatments from "@/src/app/constants/treatments";

const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="container py-5 pt-20 bg-[#62A83c]/10">
        <ProductGridSection
          title="Most Popular Products"
          productsFetcher={getMostPopularProducts}
        />
      </div>
      <TreatmentsHome treatments={treatments} />
      <AboutUs />
      <Faq />
      <ContactUs />
      <Footer />
    </div>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4 ">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold text-slate-700">{title}</h2>
        <Button className="bg-[#62A83c] hover:bg-[#3E3C37]  font-bold" asChild>
          <Link href="/products" className="space-x-2">
            <span>View More</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
