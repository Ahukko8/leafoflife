import Link from "next/link";
import { Button } from "@/src/components/ui/button";

interface Treatment {
  id: number;
  title: string;
  description: string;
  // icon: string;
}

interface TreatmentsSectionProps {
  treatments: Treatment[];
}

export default function TreatmentsSection({
  treatments,
}: TreatmentsSectionProps) {
  return (
    <section className="py-12 bg-[url(/img/bg.jpg)] ">
      <div className="container mx-auto">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Our Treatments
          </h2>
          {/* <Button
            className="text-[#62A83c] bg-transparent border-2 border-[#62A83c] hover:bg-[#62A83c] hover:text-white  font-bold"
            asChild
          >
            <Link href="/treatments" className="space-x-2">
              <span>View All</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button> */}
        </div>

        <p className="text-gray-600 mb-8">
          Explore the wide range of treatments we offer to meet your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className=" p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                {treatment.title}
              </h3>
              <p className="text-gray-600">{treatment.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 items-center justify-center">
          <Button
            asChild
            size="lg"
            className="w-auto bg-[#62A83c] text-white hover:bg-[#62A83c]/80"
          >
            <Link href="/treatments">View All Treatments</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
