import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Barangay, StockRequest } from "@/data/barangayData";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  barangays: Barangay[];
  selectedBarangayId?: string;
  onSubmit: (request: StockRequest) => void;
}

export function RequestStockDialog({ open, onOpenChange, barangays, selectedBarangayId, onSubmit }: Props) {
  const [barangayId, setBarangayId] = useState(selectedBarangayId || "");
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");

  const selectedBarangay = barangays.find((b) => b.id === barangayId);
  const medicines = selectedBarangay?.medicines || [];

  const handleSubmit = () => {
    if (!barangayId || !medicineName || !quantity || Number(quantity) <= 0) {
      toast.error("Please fill all fields with valid values.");
      return;
    }
    const brgy = barangays.find((b) => b.id === barangayId)!;
    onSubmit({
      id: crypto.randomUUID(),
      barangayId,
      barangayName: brgy.name,
      medicineName,
      quantity: Number(quantity),
      date: new Date().toLocaleDateString(),
      status: "pending",
    });
    toast.success("Stock request submitted!");
    setBarangayId("");
    setMedicineName("");
    setQuantity("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Request New Stock</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Barangay</Label>
            <Select value={barangayId} onValueChange={(v) => { setBarangayId(v); setMedicineName(""); }}>
              <SelectTrigger><SelectValue placeholder="Select barangay" /></SelectTrigger>
              <SelectContent>
                {barangays.map((b) => (
                  <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Medicine</Label>
            <Select value={medicineName} onValueChange={setMedicineName} disabled={!barangayId}>
              <SelectTrigger><SelectValue placeholder="Select medicine" /></SelectTrigger>
              <SelectContent>
                {medicines.map((m) => (
                  <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input type="number" min={1} max={9999} placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
