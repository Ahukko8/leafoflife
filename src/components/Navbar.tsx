// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Button } from "./ui/button";
// import { Menu, X } from "lucide-react";
// import Image from "next/image";

// function NavBar() {
//   const [navbar, setNavbar] = useState(false);
//   return (
//     <nav className="bg-[#62A83c] top-0 left-0 right-0 z-10">
//       <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-8">
//         <div className="flex items-center justify-between py-3 md:py-5 md:block">
//           {/* LOGO */}
         
          
//           {/* HAMBURGER BUTTON FOR MOBILE */}
//           <div className="md:hidden flex">
          
//             <Button
//               className="p-2 text-white bg-transparent hover:bg-white/20"
//               onClick={() => setNavbar(!navbar)}
//             >
//               {navbar ? (
//                 <X size={24} />
//               ) : (
//                 <Menu size={24} />
//               )}
//             </Button>
//             <div className="flex items-end">
//             <Link href="/">
//             <Image src="/logo.png" width={50} height={50} alt="logo" />
//           </Link>
//             </div>
            
//           </div>
//         </div>

//         {/* NAVIGATION ITEMS */}
//         <div
//           className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//             navbar ? "block" : "hidden"
//           }`}
//         >
//           <ul className="h-screen md:h-auto items-center justify-center md:flex ">
//             {[
//               { href: "/", label: "HOME" },
//               { href: "/products", label: "PRODUCTS" },
//               { href: "/treatments", label: "TREATMENTS" },
//               { href: "/appointments", label: "APPOINTMENT" },
//               { href: "/#about", label: "ABOUT US" },
//             ].map((item) => (
//               <li key={item.href} className="text-sm text-white font-bold py-2 px-3 text-center hover:bg-white/20 md:hover:bg-transparent md:hover:text-white/80 transition-colors duration-300">
//                 <Link href={item.href} onClick={() => setNavbar(!navbar)}>
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/treatments", label: "Treatments" },
    { href: "/appointments", label: "Appointments" },
    { href: "/#about", label: "About" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="text-2xl font-bold text-green-600">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${scrolled ? 'text-gray-800' : 'text-white'} hover:text-green-500 transition-colors duration-300`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-gray-800' : 'text-white'} hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-white hover:bg-green-500 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;