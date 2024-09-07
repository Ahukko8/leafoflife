// src/app/api/products/route.ts

import { NextResponse } from "next/server";
import db from "@/src/db/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  console.log("API route called with categoryId:", categoryId);

  const products = await db.product.findMany({
    where: {
      isAvailableForPurchase: true,
      ...(categoryId && { categoryId }),
    },
    include: {
      category: true,
    },
    orderBy: { name: "asc" },
  });

  console.log("API route returning products:", products);

  return NextResponse.json(products);
}