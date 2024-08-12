"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

function NavBar() {
  const [navbar, setNavbar] = useState(false); 
  return (
    <nav className="bg-[#62A83c] top-0 left-0 right-0 z-10 h-full">
      <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          {/* LOGO
          <Link href="/">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
          </Link> */}
          {/* HAMBURGER BUTTON FOR MOBILE */}
          <div className="md:hidden">
            <Button
              className="p-2 bg-transparent hover:bg-white/35"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <Image src="/close.svg" width={30} height={30} alt="logo" />
              ) : (
                <Image
                  src="/hamburger-menu.svg"
                  width={30}
                  height={30}
                  alt="logo"
                  className="focus:border-none active:border-none"
                />
              )}
            </Button>
          </div>
        </div>

        {/* NAVIGATION ITEMS */}
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            navbar ? "p-12 md:p-0 block" : "hidden"
          }`}
        >
          <ul className="h-screen md:h-auto items-center justify-center md:flex space-y-6 md:space-y-0 md:space-x-6">
          <li className="text-sm text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c]  md:hover:text-gray-100/80 md:hover:bg-transparent">
              <Link href="/" onClick={() => setNavbar(!navbar)}>
                HOME
              </Link>
            </li>
            <li className="text-sm text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c]  md:hover:text-gray-100/80 md:hover:bg-transparent">
              <Link href="/products" onClick={() => setNavbar(!navbar)}>
                PRODUCTS
              </Link>
            </li>
            <li className="text-sm  text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c]  md:hover:text-gray-100/80 md:hover:bg-transparent">
              <Link href="/services" onClick={() => setNavbar(!navbar)}>
                SERVICES
              </Link>
            </li>
            <li className="text-sm  text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c]  md:hover:text-gray-100/80 md:hover:bg-transparent">
              <Link href="/appointments" onClick={() => setNavbar(!navbar)}>
                APPOINTMENT
              </Link>
            </li>
            <li className="text-sm  text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c] md:hover:text-gray-100/80 md:hover:bg-transparent">
              <Link href="#about" onClick={() => setNavbar(!navbar)}>
                ABOUT US
              </Link>
            </li>
            <li className="text-sm t text-gray-100 font-bold py-2 text-center hover:bg-[#62A83c]  md:hover:text-gray-100/80 md:hover:bg-transparent">
              <Link href="#contact" scroll={false} onClick={() => setNavbar(!navbar)}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
