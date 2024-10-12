"server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import { drawing } from "@/db/schemas";
import { notFound } from "next/navigation";

export const getBoardDrawingById = async (id: number) => {
  const [_drawing] = await db
    .select()
    .from(drawing)
    .where(eq(drawing.id, id))
    .limit(1);
  if (!_drawing) notFound();
  return _drawing;
};

export type BoardDrawing = Awaited<ReturnType<typeof getBoardDrawingById>>;
