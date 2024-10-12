import type { BuiltInNode } from "@xyflow/react";
import type { ElectricalSymbolNode } from "./app/drawing/[id]/_components/board/nodes";

export type CustomNode = BuiltInNode | ElectricalSymbolNode;

export type ElectricalSymbol = {
  id: string;
  name: string;
  svg: string;
  description: string;
};
