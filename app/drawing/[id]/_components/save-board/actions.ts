"use server";

import { db } from "@/db/client";
import { drawing, Drawing } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveNodes(id: number, { nodes }: Pick<Drawing, "nodes">) {
  await db.update(drawing).set({ nodes }).where(eq(drawing.id, id));
  revalidatePath(`/drawing/${id}`);
}
