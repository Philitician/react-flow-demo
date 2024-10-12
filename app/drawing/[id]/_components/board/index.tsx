"use client";

import { Controls, ReactFlow, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { match } from "ts-pattern";

import { useToolStore } from "@/tool-store/provider";
import { use, useCallback } from "react";
import { BoardDrawing } from "../../queries";
import { BlueprintBackground } from "./blueprint-background";
import { CustomNode, ElectricalSymbolNode, nodeTypes } from "./nodes";

type BoardProps = {
  boardDrawingPromise: Promise<BoardDrawing>;
};

export function Board({ boardDrawingPromise }: BoardProps) {
  const initialBoardDrawing = use(boardDrawingPromise);
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(
    initialBoardDrawing.nodes
  );
  const pendingSymbol = useToolStore((state) => state.pendingSymbol);
  const selectedTool = useToolStore((state) => state.selectedTool);
  const resetPendingSymbol = useToolStore((state) => state.resetPendingSymbol);
  const resetSelectedTool = useToolStore((state) => state.resetSelectedTool);

  const onPaneClick = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      match(selectedTool)
        .with("symbol", () => {
          if (!pendingSymbol) return;

          const reactFlowBounds = (event.target as Element)
            .closest(".react-flow")
            ?.getBoundingClientRect();
          if (!reactFlowBounds) return;

          const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          };

          const newNode = {
            id: `${pendingSymbol.id}-${nodes.length + 1}`,
            type: "electrical-symbol",
            position,
            data: pendingSymbol,
          } satisfies ElectricalSymbolNode;

          setNodes((nds) => nds.concat(newNode));
          resetPendingSymbol();
        })
        .otherwise(() => {});
      resetSelectedTool();
    },
    [nodes, selectedTool, pendingSymbol, setNodes]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow<CustomNode>
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onPaneClick={onPaneClick}
      >
        <BlueprintBackground blueprintUrl={initialBoardDrawing.blueprintUrl} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
