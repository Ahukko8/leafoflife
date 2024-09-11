import React from "react";
import { Card } from "../ui/card";
import OpeningHours from "@/src/components/OpeningHours";

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="pt-20 pb-20 bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-smooth">
        <div className="">
          <h2 className="text-3xl font-extrabold text-gray-900">About Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            At Leaf of Life Clinic, our mission is to revive and integrate
            traditional, holistic, herbal, and prophetic medicine into modern
            wellness practices. We blend ancient wisdom with contemporary care
            to provide effective and natural solutions for your health and
            well-being.
          </p>
        </div>
        <div className="mt-10">
          <Card className="p-6 bg-gray-50 shadow-lg rounded-lg md:col-span-3 lg:col-span-1 lg:col-start-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h3>
            <p className="text-base text-gray-700">
              We believe in the power of nature and tradition. Our approach is
              rooted in the belief that holistic and herbal treatments can
              complement modern medicine, offering a comprehensive approach to
              health and healing.
            </p>
          </Card>
        </div>
        <div className="mt-3">
          <Card className="p-6 bg-gray-50 shadow-lg rounded-lg md:col-span-3 lg:col-span-1 lg:col-start-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h3>
            <p className="text-base text-gray-700">
              Our team consists of experienced practitioners who are dedicated
              to preserving traditional healing practices while embracing modern
              advancements in holistic medicine.
            </p>
          </Card>
        </div>

        <div className="mt-10">
          <OpeningHours />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
