"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col bg-[url(/img/bg.jpg)] bg-cover bg-center">
      {/* Logo */}
      {/* <div className="absolute top-0 left-0 p-4 z-20">
        <Image
          src="/logo.png"
          alt="Leaf of Life Clinic Logo"
          width={100}
          height={100}
          className="w-auto h-12 sm:h-16 md:h-15 md:ml-16"
        />
      </div> */}

      {/* Hero image - now at the top for mobile */}
      <div className="w-full md:w-[30%] md:absolute md:right-0 md:top-0 md:bottom-0 z-10 ">
        <div className="relative w-full h-[30vh] md:h-full">
          <Image
            src="/img/hero-img2.png"
            alt="Hero Image"
            fill
            style={{ objectFit: 'contain' }}
            className="md:object-right"
          />
        </div>
      </div>

      {/* Hero text and content */}
      <div className="flex-1 p-6 md:p-20 text-center md:text-left mt-4 md:mt-10 md:w-[70%] z-10">
        <h1 className="font-bold text-[#3E3C37] leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Leaf of Life Clinic
        </h1>
        <h2 className="text-green-800 text-xl sm:text-2xl md:text-3xl mt-2">
          Excellence in Holistic Medicine
        </h2>
        <p className="mt-4 text-[#3E3C37] max-w-screen-sm text-sm sm:text-base md:text-lg leading-relaxed text-justify">
          Located in Ha. Kelaa, we are dedicated to reviving endangered traditions of holistic, herbal, and prophetic medicine. 
          Our mission is to preserve and integrate these time-honored healing practices into modern wellness, 
          offering a unique blend of ancient wisdom and contemporary care for your overall health and well-being.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start">
          <Link href="/appointments" className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
            <Button className="w-full sm:w-[195px] h-[50px] sm:h-[60px] bg-[#62A83c] hover:bg-[#3E3C37] text-base sm:text-lg">
              GET APPOINTMENT
            </Button>
          </Link>
          <Link href="/products" className="w-full sm:w-auto">
            <Button className="w-full sm:w-[195px] h-[50px] sm:h-[60px] text-[#62A83c] bg-transparent border-2 border-[#62A83c] hover:bg-[#62A83c] hover:text-white text-base sm:text-lg">
              PRODUCTS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;