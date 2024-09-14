"use client"
import Link from "next/link";
import { formatCurrency } from "../../lib/formatters";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { useState } from "react";

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
    <Card className="w-64 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full">
        {imagePath && !imageError ? (
          <Image
            src={imagePath}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm text-gray-500">
            No image
          </div>
        )}
      </div>
      <CardHeader className="p-3">
        <CardTitle className="text-base font-semibold line-clamp-1">{name}</CardTitle>
        <p className="text-sm font-medium text-green-600">
          {formatCurrency(priceInCents)}
        </p>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-3">
        <Button
          asChild
          className="w-full bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          <Link href={`/products/${id}/purchase`}>Order Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="w-64 overflow-hidden rounded-lg shadow-md animate-pulse">
      <div className="aspect-[4/3] w-full bg-gray-300" />
      <CardHeader className="p-3">
        <div className="h-5 w-3/4 rounded-full bg-gray-300" />
        <div className="h-4 w-1/2 rounded-full bg-gray-300" />
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="space-y-2">
          <div className="h-3 w-full rounded-full bg-gray-300" />
          <div className="h-3 w-5/6 rounded-full bg-gray-300" />
        </div>
      </CardContent>
      <CardFooter className="p-3">
        <div className="h-9 w-full rounded bg-gray-300" />
      </CardFooter>
    </Card>
  );
}