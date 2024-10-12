import type { BuiltInNode, Node, NodeTypes } from "@xyflow/react";
import { ElectricalSymbolNode } from "./electrical-symbol-node";
import { ElectricalSymbol } from "@/types";

export const nodeTypes = {
  "electrical-symbol": ElectricalSymbolNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

export type ElectricalSymbolNode = Omit<Node<ElectricalSymbol>, "type"> & {
  type: "electrical-symbol";
};

export type CustomNode = BuiltInNode | ElectricalSymbolNode;
