import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/StatusBadge";
import { getStockStatus, getOverallStatus, type Barangay } from "@/data/barangayData";

interface Props {
  barangay: Barangay;
  onSelect: (id: string) => void;
}

export function BarangayCard({ barangay, onSelect }: Props) {
  const overall = getOverallStatus(barangay.medicines);

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm"
      onClick={() => onSelect(barangay.id)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-bold">{barangay.name}</CardTitle>
        <StatusBadge status={overall} />
      </CardHeader>
      <CardContent className="space-y-3">
        {barangay.medicines.map((med) => {
          const pct = Math.round((med.currentStock / med.maxStock) * 100);
          const status = getStockStatus(med.currentStock, med.maxStock);
          return (
            <div key={med.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{med.name}</span>
                <span className="font-medium">{med.currentStock}/{med.maxStock}</span>
              </div>
              <Progress
                value={pct}
                className="h-2"
                indicatorClassName={
                  status === "green"
                    ? "bg-status-green"
                    : status === "amber"
                    ? "bg-status-amber"
                    : "bg-status-red"
                }
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
