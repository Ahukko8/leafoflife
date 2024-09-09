"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Image from "next/image";


const Hero = () => {
  return (
    <section className="relative h-screen flex items-center bg-[url(/img/bg.jpg)] ">
      <div className=" container mx-auto flex flex-col md:flex-row items-center justify-between p-6">
        <div className="p-20 flex-1 text-center md:text-left ">
          <h2 className="text-green-800 lg:text-2xl md:text-2xl sm:text-xl max-sm:text-md">
            Your Herbal Clininc
          </h2>
          <h1 className="font-bold text-gray-800 leading-tight lg:text-6xl md:text-2xl sm:text-1xl max-sm:text-1xl">
            Leaf of Life Clinic
          </h1>
          <p className="mt-4 text-gray-600 max-w-screen-sm md:text-1xl sm:text-lg max-sm:text-lg leading-relaxed max-sm:leading-normal">
            Located in Ha. Kelaa, where we are dedicated to reviving the
            endangered traditions of holistic, herbal, and prophetic medicine.
            Our mission is to preserve and integrate these time-honored healing
            practices into modern wellness, offering a unique blend of ancient
            wisdom and contemporary care for your overall health and well-being.
          </p>
          <div className="mt-6">
            <Link href="/appointments">
              <Button className="text-lg max-sm:mb-2 bg-[#62A83c] hover:bg-[#3E3C37] mr-4 h-[60px] w-[195px] sm:mb-2">
                GET APPOINTMENT
              </Button>
            </Link>
            <Link href="/products">
              <Button className="text-[#62A83c] bg-transparent border-2 border-[#62A83c] hover:bg-[#62A83c] hover:text-white  font-bold mr-4 h-[60px] w-[195px] text-lg">
                PRODUCTS
              </Button>
            </Link>
          </div>
        </div>
        <div className=" sm:w-[30%] max-sm:hidden">
          <Image
            src="/img/small-img.png"
            alt="Hero Image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
