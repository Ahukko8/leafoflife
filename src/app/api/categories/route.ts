// import { NextResponse } from "next/server";
// import db from "@/src/db/db";

// export async function GET() {
//   try {
//     const categories = await db.category.findMany();
//     return NextResponse.json(categories);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { name } = await request.json();

//     // Check if category with the same name already exists
//     const existingCategory = await db.category.findUnique({
//       where: { name },
//     });

//     if (existingCategory) {
//       return NextResponse.json(
//         { error: "Category already exists" },
//         { status: 400 }
//       );
//     }

//     // Create new category if it doesn't exist
//     const newCategory = await db.category.create({
//       data: { name },
//     });

//     return NextResponse.json(newCategory, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to add category" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import db from "@/src/db/db";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const existingCategory = await db.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    const newCategory = await db.category.create({
      data: { name },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add category" },
      { status: 500 }
    );
  }
}