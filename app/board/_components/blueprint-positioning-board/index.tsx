"use client";

import {
  Background,
  ReactFlow,
  Controls,
  Node,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

type BlueprintNode = Node<{ imageUrl: string }>;

type BlueprintPositioningBoardProps = {
  blueprintUrl: string;
  onPositionFixed: (node: BlueprintNode) => void;
};

export function BlueprintPositioningBoard({
  blueprintUrl,
  onPositionFixed,
}: BlueprintPositioningBoardProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<BlueprintNode>([
    {
      id: "blueprint",
      type: "blueprint",
      position: { x: 0, y: 0 },
      data: { imageUrl: blueprintUrl },
    },
  ]);

  const [isDragging, setIsDragging] = useState(false);

  const onNodeDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onNodeDragStop = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFixPosition = useCallback(() => {
    const blueprintNode = nodes.find((node) => node.id === "blueprint");
    if (blueprintNode) {
      onPositionFixed(blueprintNode);
    }
  }, [nodes, onPositionFixed]);

  const nodeTypes = {
    blueprint: BlueprintNode,
  };

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
      >
        <Background gap={24} size={2} />
        <Controls />
      </ReactFlow>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <Button onClick={handleFixPosition} disabled={isDragging}>
          Fix Blueprint Position
        </Button>
      </div>
    </div>
  );
}

function BlueprintNode({ data }: { data: { imageUrl: string } }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <img
        src={data.imageUrl}
        alt="Blueprint"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
