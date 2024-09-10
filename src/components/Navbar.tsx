"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="bg-[#62A83c] top-0 left-0 right-0 z-10">
      <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          {/* LOGO */}
          {/* <Link href="/">
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </Link> */}
          
          {/* HAMBURGER BUTTON FOR MOBILE */}
          <div className="md:hidden">
            <Button
              className="p-2 text-white bg-transparent hover:bg-white/20"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </Button>
          </div>
        </div>

        {/* NAVIGATION ITEMS */}
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            navbar ? "block" : "hidden"
          }`}
        >
          <ul className="h-screen md:h-auto items-center justify-center md:flex ">
            {[
              { href: "/", label: "HOME" },
              { href: "/products", label: "PRODUCTS" },
              { href: "/treatments", label: "TREATMENTS" },
              { href: "/appointments", label: "APPOINTMENT" },
              { href: "/#about", label: "ABOUT US" },
            ].map((item) => (
              <li key={item.href} className="text-sm text-white font-bold py-2 px-3 text-center hover:bg-white/20 md:hover:bg-transparent md:hover:text-white/80 transition-colors duration-300">
                <Link href={item.href} onClick={() => setNavbar(!navbar)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;