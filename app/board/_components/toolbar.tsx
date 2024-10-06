import { ElectricalSymbolsPopover } from "./electrical-symbols-popover";

export function Toolbar() {
  return (
    <div className="flex space-x-2">
      <ElectricalSymbolsPopover />
    </div>
  );
}
