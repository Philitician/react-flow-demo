import { ToolStoreProvider } from "@/tool-store/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ToolStoreProvider>{children}</ToolStoreProvider>;
}
