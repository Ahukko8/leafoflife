import { NextResponse } from "next/server";
import db from "@/src/db/db";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const existingCategory = await db.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category with this name already exists" },
        { status: 400 }
      );
    }

    const newCategory = await db.category.create({
      data: { name },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

// You can also add a GET method here to fetch all categories if needed
export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
