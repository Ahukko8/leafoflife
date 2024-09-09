"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

function NavBar() {
  return (
    <nav className="bg-[#62A83c] top-0 left-0 right-0 z-10">
      <div className="justify-between px-4 mx-auto items-center flex">
       
        <div
          className="flex-1 justify-self-center mb-3 mt-3 block  p-0"
        >
          <ul className="h-10 items-center justify-center flex  space-x-6">
          <li className="text-sm text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c]  hover:text-gray-100/80 hover:bg-transparent">
              <Link href="/">
                HOME
              </Link>
            </li>
            <li className="text-sm text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c] hover:text-gray-100/80 :hover:bg-transparent">
              <Link href="/products">
                PRODUCTS
              </Link>
            </li>
            <li className="text-sm  text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c] hover:text-gray-100/80 hover:bg-transparent">
              <Link href="/treatments">
                SERVICES
              </Link>
            </li>

            <li className="text-sm  text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c]  md:hover:text-gray-100/80 md:hover:bg-transparent">
              <Link href="/appointments">
                APPOINTMENT
              </Link>
            </li>
            <li className="text-sm  text-gray-100 font-bold py-2 text-center  hover:bg-[#62A83c] md:hover:text-gray-100/80 md:hover:bg-transparent">
              <Link href="/#about">
                ABOUT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
