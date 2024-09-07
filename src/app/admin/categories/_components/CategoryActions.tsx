"use client";

import db from "@/src/db/db";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu";

export async function deleteCategory(id: string) {
  await db.category.delete({ where: { id } });
}

export function DeleteCategoryDropdownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteCategory(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}