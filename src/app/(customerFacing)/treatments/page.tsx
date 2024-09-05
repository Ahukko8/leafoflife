"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";
import MOCK_TREATMENTS from "@/src/app/constants/mockTreatments";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-left">TREATMENTS</h1>
      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Search treatments..."
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
          >
            <CardHeader>
              <CardTitle>
                {highlightText(treatment.title, searchTerm)}
              </CardTitle>
              <CardDescription>
                {highlightText(treatment.description, searchTerm)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {treatment.items && treatment.items.length > 0 && (
                <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-500">
                  {treatment.items.map((item, index) => (
                    <li key={index}>{highlightText(item, searchTerm)}</li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter>
            <Button asChild size="lg" className="w-auto bg-[#62A83c] text-white hover:bg-[#62A83c]/80">
            <Link href="/appointments">Make Appointment</Link>
          </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredTreatments.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No treatments found.</p>
      )}
    </div>
  );
}
