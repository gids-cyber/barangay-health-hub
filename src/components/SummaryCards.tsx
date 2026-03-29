import { Card, CardContent } from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { Barangay } from "@/data/barangayData";
import { getOverallStatus } from "@/data/barangayData";

export function SummaryCards({ barangays }: { barangays: Barangay[] }) {
  const statuses = barangays.map((b) => getOverallStatus(b.medicines));
  const sufficient = statuses.filter((s) => s === "green").length;
  const low = statuses.filter((s) => s === "amber").length;
  const critical = statuses.filter((s) => s === "red").length;

  const items = [
    { label: "Total Barangays", value: barangays.length, icon: Activity, color: "text-primary" },
    { label: "Sufficient", value: sufficient, icon: CheckCircle, color: "text-status-green" },
    { label: "Low Stock", value: low, icon: AlertTriangle, color: "text-status-amber" },
    { label: "Critical", value: critical, icon: XCircle, color: "text-status-red" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label} className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-xl bg-muted p-3 ${item.color}`}>
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
