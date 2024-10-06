import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type LoadingSpinnerProps = {
  className?: string;
};

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return <Loader2 className={cn("animate-spin text-icon/60", className)} />;
}
