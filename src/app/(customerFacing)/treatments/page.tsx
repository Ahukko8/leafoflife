"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";
import MOCK_TREATMENTS from "@/src/app/constants/mockTreatments";
import diseases from "@/src/app/constants/diseases";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";

export default function TreatmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredTreatments = MOCK_TREATMENTS.filter((treatment) => {
    const titleMatch = treatment.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const itemsMatch = treatment.items?.some((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return titleMatch || itemsMatch;
  });

  const filteredDiseases = diseases.filter((disease) => {
    const titleMatch = disease.title
      .toLocaleLowerCase()
      .includes(searchTerm.toLowerCase());
    const itemsMatch = disease.items?.some((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return titleMatch || itemsMatch;
  });

  return (
    <div className="container mx-auto py-8 px-4 bg-[url(/img/bg.jpg)]">
      <h1 className="text-4xl font-bold mb-8 text-left text-[#3E3C37] font-sans">TREATMENTS</h1>
      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Search treatments & diseases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTreatments.map((treatment) => (
          <Card
            key={treatment.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            style={{
              backgroundImage: ` url(${treatment.imageUrl})`,
              backgroundSize: "cover", // Adjust if needed, can use 'contain' or 'auto'
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
          
            <CardHeader>
              <CardTitle className="font-extrabold">
                {highlightText(treatment.title, searchTerm)}
              </CardTitle>
              <CardDescription className="text-zinc-900 leading-relaxed text-justify font-bold">
                {highlightText(treatment.description, searchTerm)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {treatment.items && treatment.items.length > 0 && (
                <ul className="mt-2 list-disc pl-5 space-y-2 text-slate-500 leading-relaxed text-justify">
                  {treatment.items.map((item, index) => (
                    <li key={index}>{highlightText(item, searchTerm)}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex mt-2 justify-center">
        <Button
          asChild
          size="lg"
          className="w-auto bg-[#62A83c] text-white hover:bg-[#62A83c]/80"
        >
          <Link href="/appointments">BOOK APPOINTMENT</Link>
        </Button>
      </div>

      {filteredTreatments.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No treatments found.</p>
      )}

      <div className="container mt-10 mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-left text-[#3E3C37]">DISEASES</h1>
        <div className="relative mb-8">
          <p className="leading-relaxed text-justify">
            Below are some of the diseases we diagnose and treat using the above
            mentioned treatment methods. Consult us and we will undergo the
            appropriate treatment technique.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => (
            <Card
              key={disease.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle>
                  {highlightText(disease.title, searchTerm)}
                </CardTitle>
                <CardDescription className="leading-relaxed text-justify">
                  {highlightText(disease.description, searchTerm)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {disease.items && disease.items.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-500">
                    {disease.items.map((item, index) => (
                      <li key={index}>{highlightText(item, searchTerm)}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredDiseases.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No diseases found.</p>
        )}
      </div>
      <div className="w-full h-[1px]  mb-20 bg-gray-300">
        <div className="flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Leaf of Life Clinic"
            className="mt-5"
            width={50}
            height={50}
          />
        </div>
        <p className="text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Leaf of Life Clinic, Ha.Kelaa. All
          rights reserved.
        </p>
      </div>
    </div>
  );
}
