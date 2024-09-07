import Link from "next/link";
import { formatCurrency } from "../../lib/formatters";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Category } from "@prisma/client";

export type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
  isAvailableForPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className="flex overflow-hidden flex-col shadow-md rounded-lg bg-white/90 backdrop-blur-lg bg-opacity-80 hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
      <div className="relative w-full h-40 sm:h-48 md:h-56">
        <Image
          src={imagePath}
          fill
          alt={name}
          className="object-cover rounded-t-lg"
        />
      </div>
      <CardHeader className="p-4 text-center">
        <CardTitle className="text-lg font-bold">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {formatCurrency(priceInCents)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <p className="line-clamp-3 text-justify text-sm text-gray-700">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          asChild
          size="lg"
          className="w-full bg-[#62A83c] hover:bg-[#3E3C37] font-bold text-lg"
        >
          <Link href={`/products/${id}/purchase`}>ORDER</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse shadow-lg rounded-lg bg-white backdrop-blur-lg bg-opacity-80">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
