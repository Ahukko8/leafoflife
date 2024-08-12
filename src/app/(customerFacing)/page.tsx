import ServicesHome from "@/src/components/homePage/ServicesHome";
import Hero from "@/src/components/homePage/Hero";
import { ProductCard, ProductCardSkeleton } from "@/src/components/ProductCard";
import { Button } from "@/src/components/ui/button";
import db from "@/src/db/db";
import { cache } from "@/src/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ContactUs from "@/src/components/homePage/Contact";
import AboutUs from "@/src/components/homePage/About";
import Footer from "@/src/components/homePage/Footer"
import Faq from "@/src/components/homePage/Faq";

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

// const getNewestProducts = cache(() => {
//   return db.product.findMany({
//     where: { isAvailableForPurchase: true },
//     orderBy: {
//       orders: {
//         _count: "desc",
//       },
//     },
//     take: 6,
//   });
// }, ["/", "getNewestProducts"]);

const services = [
  {
    id: 1,
    title: "Holistic Medicine",
    description:
      "Holistic medicine focuses on treating the whole person—body, mind, and spirit—rather than just the symptoms of a disease. It emphasizes natural therapies and the body's innate ability to heal itself.",
    icon: "/img/hero-image-secondary.webp",
  },
  {
    id: 2,
    title: "Hijama Therapy",
    description:
      "Prophetic hijama therapy, based on Islamic teachings, uses cupping to enhance health by extracting toxins and improving blood flow. It is a well-established practice recommended by the Prophet Muhammad ﷺ for its therapeutic benefits.",
    icon: "/icons/mobile-app.svg",
  },
  {
    id: 3,
    title: "Herbal Medicine",
    description:
      "Herbal medicine uses plant-based remedies to treat and prevent health conditions, leveraging the natural compounds in herbs for therapeutic effects. It has been practiced for thousands of years and remains a key component of many traditional and modern healing systems.",
    icon: "/icons/ui-ux-design.svg",
  },
  {
    id: 4,
    title: "Traditional Dhivehi Beys",
    description:
      "traditional Dhivehi beys are powerful herbal remedies that have been used for generations in the Maldives. These treatments harness local plants to effectively address a wide range of health issues, reflecting a rich legacy of natural and cultural wisdom.",
    icon: "/icons/ui-ux-design.svg",
  },
  {
    id: 5,
    title: "Herbal Physiotherapy",
    description:"Combination of traditional herbal remedies with physical therapy techniques to enhance healing and recovery. This approach uses plant-based treatments to address pain, inflammation, and muscle or joint issues, integrating natural remedies with therapeutic exercises to improve overall function and well-being.",
    icon: "/icons/ui-ux-design.svg",
  },
  // Add more services as needed
];

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
      <ServicesHome services={services} />
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
            <span>View All</span>
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
