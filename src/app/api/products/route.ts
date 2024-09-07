// import { NextResponse } from "next/server";
// import db from "@/src/db/db";

// export async function GET() {
//   try {
//     const categories = await db.category.findMany();
//     return NextResponse.json(categories);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { name } = await request.json();
//     const newCategory = await db.category.create({
//       data: { name },
//     });
//     return NextResponse.json(newCategory, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
//   }
// }
// src/app/api/products/route.ts

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