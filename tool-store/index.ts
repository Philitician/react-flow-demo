import { ElectricalSymbol } from "@/types";
import { createStore } from "zustand/vanilla";

export type ToolState = {
  pendingSymbol: ElectricalSymbol | null;
  selectedTool: "move" | "line" | "symbol";
};

export type ToolActions = {
  setPendingSymbol: (pendingSymbol: ElectricalSymbol) => void;
  resetPendingSymbol: () => void;
  setSelectedTool: (selectedTool: "move" | "line" | "symbol") => void;
  resetSelectedTool: () => void;
};

export type ToolStore = ToolState & ToolActions;

export const defaultInitState: ToolState = {
  pendingSymbol: null,
  selectedTool: "move",
};

export const createToolStore = (initState: ToolState = defaultInitState) => {
  return createStore<ToolStore>()((set) => ({
    ...initState,
    setPendingSymbol: (pendingSymbol) => set(() => ({ pendingSymbol })),
    resetPendingSymbol: () => set(() => ({ pendingSymbol: null })),
    setSelectedTool: (selectedTool) => set(() => ({ selectedTool })),
    resetSelectedTool: () => set(() => ({ selectedTool: "move" })),
  }));
};
