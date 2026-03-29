import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarangayCard } from "@/components/BarangayCard";
import { RequestStockDialog } from "@/components/RequestStockDialog";
import { SummaryCards } from "@/components/SummaryCards";
import { StatusBadge } from "@/components/StatusBadge";
import { initialBarangays, type StockRequest } from "@/data/barangayData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [barangays] = useState(initialBarangays);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBarangayId, setSelectedBarangayId] = useState<string | undefined>();
  const [requests, setRequests] = useState<StockRequest[]>([]);

  const handleRequestFromCard = (id: string) => {
    setSelectedBarangayId(id);
    setDialogOpen(true);
  };

  const handleSubmit = (req: StockRequest) => {
    setRequests((prev) => [req, ...prev]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Medicine Stock Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">Barangay Health Inventory System</p>
          </div>
          <Button onClick={() => { setSelectedBarangayId(undefined); setDialogOpen(true); }} className="gap-2">
            <Plus className="h-4 w-4" />
            Request Stock
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 p-6">
        {/* Summary */}
        <SummaryCards barangays={barangays} />

        {/* Status Legend */}
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-semibold text-muted-foreground">Legend:</span>
          <StatusBadge status="green" />
          <StatusBadge status="amber" />
          <StatusBadge status="red" />
        </div>

        {/* Barangay Cards */}
        <section>
          <h2 className="mb-4 text-lg font-bold">Barangay Overview</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {barangays.map((b) => (
              <BarangayCard key={b.id} barangay={b} onSelect={handleRequestFromCard} />
            ))}
          </div>
        </section>

        {/* Recent Requests */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent Stock Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">No requests yet. Click a barangay card or the button above to request stock.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Barangay</TableHead>
                    <TableHead>Medicine</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-muted-foreground">{r.date}</TableCell>
                      <TableCell className="font-medium">{r.barangayName}</TableCell>
                      <TableCell>{r.medicineName}</TableCell>
                      <TableCell className="text-right">{r.quantity}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">{r.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      <RequestStockDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        barangays={barangays}
        selectedBarangayId={selectedBarangayId}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Index;
