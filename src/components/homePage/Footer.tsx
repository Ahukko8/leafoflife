import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaViber } from "react-icons/fa";
import { Button } from "../ui/button";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* Logo and Address */}
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
            {/* <Image
              src="/logo.png"
              alt="Leaf of Life Clinic"
              className="h-12 mb-4"
              width={50}
              height={50}
            /> */}
            {/* <p className="text-center md:text-left">
              Leaf of Life Clinic
              <br />
              Ha. Kelaa, Maldives
            </p> */}
          </div>

          

          {/* Social Media Icons */}
          <div className="flex space-x-4">
          {/* <Image
              src="/logo.png"
              alt="Leaf of Life Clinic"
              className="h-12 mb-4"
              width={50}
              height={50}
            /> */}
            <Button className="text-white hover:text-indigo-400">
              <FaFacebook size={24} />
            </Button>
            <Button className="text-white hover:text-indigo-400">
              <FaViber size={24} />
            </Button>
            <Button className="text-white hover:text-indigo-400">
              <FaInstagram size={24} />
            </Button>
            <Button className="text-white hover:text-indigo-400">
              <FaLinkedin size={24} />
            </Button>
          </div>
        </div>
        {/* Contact Information */}
        <div className="mb-8 md:mb-0 text-center md:text-right">
            <p>
              Email:{" "}
              <a
                href="mailto:info@leafclinic.com"
                className="text-indigo-400 hover:underline"
              >
                info.leafoflifeclinic@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+9601234567"
                className="text-indigo-400 hover:underline"
              >
                +960 784 5624
              </a>
            </p>
          </div>
        <div className="mt-8 text-center text-gray-500">
        <div className="flex items-center justify-center">
        <Image
              src="/logo.png"
              alt="Leaf of Life Clinic"
              className=""
              width={50}
              height={50}
            />
        </div>
          &copy; {new Date().getFullYear()} Leaf of Life Clinic, Ha.Kelaa. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
