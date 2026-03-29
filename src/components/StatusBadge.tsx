import { cn } from "@/lib/utils";
import type { StockStatus } from "@/data/barangayData";

const statusConfig: Record<StockStatus, { label: string; className: string }> = {
  green: { label: "Sufficient", className: "bg-status-green-bg text-status-green" },
  amber: { label: "Low Stock", className: "bg-status-amber-bg text-status-amber" },
  red: { label: "Critical", className: "bg-status-red-bg text-status-red" },
};

export function StatusBadge({ status }: { status: StockStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", config.className)}>
      <span className={cn("h-2 w-2 rounded-full", {
        "bg-status-green": status === "green",
        "bg-status-amber": status === "amber",
        "bg-status-red": status === "red",
      })} />
      {config.label}
    </span>
  );
}
