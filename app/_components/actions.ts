"use server";

import { db } from "@/db/client";
import { drawing, InsertDrawing } from "@/db/schemas";
import { revalidatePath } from "next/cache";

export const createDrawing = async (newDrawing: InsertDrawing) => {
  await db.insert(drawing).values(newDrawing);
  revalidatePath("/");
};
