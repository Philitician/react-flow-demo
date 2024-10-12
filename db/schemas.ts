import { CustomNode } from "@/types";
import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const drawing = pgTable("drawing", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  blueprintUrl: text().notNull(),
  nodes: jsonb().$type<CustomNode[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertDrawing = typeof drawing.$inferInsert;
export type SelectDrawing = typeof drawing.$inferSelect;
