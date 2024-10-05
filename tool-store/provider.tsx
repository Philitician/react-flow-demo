"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type ToolStore, createToolStore } from ".";

export type ToolStoreApi = ReturnType<typeof createToolStore>;

export const ToolStoreContext = createContext<ToolStoreApi | undefined>(
  undefined
);

export interface ToolStoreProviderProps {
  children: ReactNode;
}

export const ToolStoreProvider = ({ children }: ToolStoreProviderProps) => {
  const storeRef = useRef<ToolStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createToolStore();
  }

  return (
    <ToolStoreContext.Provider value={storeRef.current}>
      {children}
    </ToolStoreContext.Provider>
  );
};

export const useToolStore = <T,>(selector: (store: ToolStore) => T): T => {
  const toolStoreContext = useContext(ToolStoreContext);

  if (!toolStoreContext) {
    throw new Error(`useToolStore must be used within ToolStoreProvider`);
  }

  return useStore(toolStoreContext, selector);
};
