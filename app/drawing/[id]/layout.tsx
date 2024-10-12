import { ToolStoreProvider } from "@/tool-store/provider";
import { ReactFlowProvider } from "@xyflow/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactFlowProvider>
      <ToolStoreProvider>{children}</ToolStoreProvider>
    </ReactFlowProvider>
  );
}
