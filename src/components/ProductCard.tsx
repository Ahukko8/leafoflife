"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatCurrency } from "../../lib/formatters";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath?: string | null;
  isAvailableForPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-lg transition hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full rounded-t-2xl overflow-hidden">
        {imagePath && !imageError ? (
          <Image
            src={imagePath}
            alt={name}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
            No image
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-1">
        <CardTitle className="text-lg font-semibold line-clamp-1 text-gray-800">{name}</CardTitle>
        <p className="text-base font-medium text-green-600">
          {formatCurrency(priceInCents)}
        </p>
      </CardHeader>

      <CardContent className="px-4 pt-0 pb-2">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full rounded-xl bg-green-600 text-white text-sm font-medium py-2 hover:bg-green-700 transition"
        >
          <Link href={`/products/${id}/purchase`}>Order Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-md animate-pulse">
      <div className="aspect-[4/3] w-full bg-gray-300 rounded-t-2xl" />
      <CardHeader className="p-4 pb-1">
        <div className="h-5 w-3/4 rounded-full bg-gray-300" />
        <div className="h-4 w-1/2 mt-2 rounded-full bg-gray-300" />
      </CardHeader>
      <CardContent className="px-4 pt-0 pb-2 space-y-2">
        <div className="h-3 w-full rounded-full bg-gray-300" />
        <div className="h-3 w-5/6 rounded-full bg-gray-300" />
        <div className="h-3 w-2/3 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 w-full rounded-xl bg-gray-300" />
      </CardFooter>
    </Card>
  );
}
