"use server";

import db from "@/src/db/db";

export async function userOrderExists(email: string, productId: string) {
  return (
    (await db.order.findFirst({
      select: { id: true },
    })) != null
  );
}

