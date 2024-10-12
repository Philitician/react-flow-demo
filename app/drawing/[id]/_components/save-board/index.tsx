"use client";

import { Button } from "@/components/ui/button";
import { CustomNode } from "@/types";
import { useNodes } from "@xyflow/react";
import { useParams } from "next/navigation";
import { saveNodes } from "./actions";

export function SaveBoard() {
  const nodes = useNodes<CustomNode>();
  const { id } = useParams<{ id: string }>();
  return (
    <Button
      onClick={async () => {
        await saveNodes(Number(id), { nodes });
      }}
    >
      SaveBoard
    </Button>
  );
}
