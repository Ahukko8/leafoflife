import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-12 bg-[url(/img/bg.jpg)] ">
      <div className="container mx-auto">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Our Services
          </h2>
          <Button
            className="text-[#62A83c] bg-transparent border-2 border-[#62A83c] hover:bg-[#62A83c] hover:text-white  font-bold"
            asChild
          >
            <Link href="/products" className="space-x-2">
              <span>View All</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <p className="text-gray-600 mb-8">
          Explore the wide range of services we offer to meet your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {services.map((service) => (
            <div
              key={service.id}
              className=" p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="text-sm border-0 outline-0 font-bold hover:bg-transparent"
                  asChild
                >
                  <Link href="/services" className="space-x-2 hover:text-[#62A83c]">
                    <span className="font-bold ">READ MORE</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="mt-12">
          <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-500">
            <Link href="/services">View All Services</Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
}
