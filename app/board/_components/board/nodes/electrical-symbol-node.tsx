import { cn } from "@/lib/utils";
import { ElectricalSymbol } from "@/types";

export type ElectricalSymbolNodeProps = {
  data: ElectricalSymbol;
  selected?: boolean;
};

export function ElectricalSymbolNode({
  data,
  selected,
}: ElectricalSymbolNodeProps) {
  return (
    <div
      className={cn("flex items-center justify-center", {
        "ring-1 ring-blue-500": selected,
      })}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        dangerouslySetInnerHTML={{ __html: data.svg }}
      />
    </div>
  );
}
