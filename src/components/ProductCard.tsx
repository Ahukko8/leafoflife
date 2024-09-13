// "use client"
// import Link from "next/link";
// import { formatCurrency } from "../../lib/formatters";
// import { Button } from "./ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import Image from "next/image";
// import { useState } from "react";

// export type ProductCardProps = {
//   id: string;
//   name: string;
//   priceInCents: number;
//   description: string;
//   imagePath?: string | null;
//   isAvailableForPurchase: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// };


// export function ProductCard({
//   id,
//   name,
//   priceInCents,
//   description,
//   imagePath,
// }: ProductCardProps) {
//   const [imageError, setImageError] = useState(false);

//   return (
//     <Card className="flex overflow-hidden flex-col shadow-md rounded-lg bg-white/90 backdrop-blur-lg bg-opacity-80 hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
//       <div className="relative w-full h-40 sm:h-48 md:h-56">
//         {imagePath ? (
//           <Image
//             src={imagePath}
//             alt={name}
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             className="object-cover rounded-t-lg"
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
//             Image not available
//           </div>
//         )}
//       </div>
//       <CardHeader className="p-4 text-center">
//         <CardTitle className="text-lg font-bold">{name}</CardTitle>
//         <CardDescription className="text-sm text-gray-500">
//           {formatCurrency(priceInCents)}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex-grow p-4">
//         <p className="line-clamp-3 text-justify text-sm text-gray-700">
//           {description}
//         </p>
//       </CardContent>
//       <CardFooter className="p-4">
//         <Button
//           asChild
//           size="lg"
//           className="w-full bg-[#62A83c] hover:bg-[#3E3C37] font-bold text-lg"
//         >
//           <Link href={`/products/${id}/purchase`}>ORDER</Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

// export function ProductCardSkeleton() {
//   return (
//     <Card className="overflow-hidden flex flex-col animate-pulse shadow-lg rounded-lg bg-white backdrop-blur-lg bg-opacity-80">
//       <div className="w-full aspect-video bg-gray-300" />
//       <CardHeader>
//         <CardTitle>
//           <div className="w-3/4 h-6 rounded-full bg-gray-300" />
//         </CardTitle>
//         <CardDescription>
//           <div className="w-1/2 h-4 rounded-full bg-gray-300" />
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <div className="w-full h-4 rounded-full bg-gray-300" />
//         <div className="w-full h-4 rounded-full bg-gray-300" />
//         <div className="w-3/4 h-4 rounded-full bg-gray-300" />
//       </CardContent>
//       <CardFooter>
//         <Button className="w-full" disabled size="lg"></Button>
//       </CardFooter>
//     </Card>
//   );
// }



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