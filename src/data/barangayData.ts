export type StockStatus = "green" | "amber" | "red";

export interface Medicine {
  id: string;
  name: string;
  currentStock: number;
  maxStock: number;
  unit: string;
}

export interface Barangay {
  id: string;
  name: string;
  medicines: Medicine[];
}

export interface StockRequest {
  id: string;
  barangayId: string;
  barangayName: string;
  medicineName: string;
  quantity: number;
  date: string;
  status: "pending" | "approved" | "denied";
}

export function getStockStatus(current: number, max: number): StockStatus {
  const pct = current / max;
  if (pct <= 0.25) return "red";
  if (pct <= 0.5) return "amber";
  return "green";
}

export function getOverallStatus(medicines: Medicine[]): StockStatus {
  const statuses = medicines.map((m) => getStockStatus(m.currentStock, m.maxStock));
  if (statuses.includes("red")) return "red";
  if (statuses.includes("amber")) return "amber";
  return "green";
}

export const initialBarangays: Barangay[] = [
  {
    id: "brgy-1",
    name: "Barangay San Isidro",
    medicines: [
      { id: "m1", name: "Paracetamol", currentStock: 450, maxStock: 500, unit: "tablets" },
      { id: "m2", name: "Amoxicillin", currentStock: 200, maxStock: 300, unit: "capsules" },
      { id: "m3", name: "Losartan", currentStock: 180, maxStock: 200, unit: "tablets" },
      { id: "m4", name: "Metformin", currentStock: 300, maxStock: 400, unit: "tablets" },
    ],
  },
  {
    id: "brgy-2",
    name: "Barangay Poblacion",
    medicines: [
      { id: "m5", name: "Paracetamol", currentStock: 120, maxStock: 500, unit: "tablets" },
      { id: "m6", name: "Amoxicillin", currentStock: 50, maxStock: 300, unit: "capsules" },
      { id: "m7", name: "Losartan", currentStock: 90, maxStock: 200, unit: "tablets" },
      { id: "m8", name: "Metformin", currentStock: 150, maxStock: 400, unit: "tablets" },
    ],
  },
  {
    id: "brgy-3",
    name: "Barangay Maligaya",
    medicines: [
      { id: "m9", name: "Paracetamol", currentStock: 480, maxStock: 500, unit: "tablets" },
      { id: "m10", name: "Amoxicillin", currentStock: 280, maxStock: 300, unit: "capsules" },
      { id: "m11", name: "Losartan", currentStock: 190, maxStock: 200, unit: "tablets" },
      { id: "m12", name: "Metformin", currentStock: 380, maxStock: 400, unit: "tablets" },
    ],
  },
  {
    id: "brgy-4",
    name: "Barangay Bagong Silang",
    medicines: [
      { id: "m13", name: "Paracetamol", currentStock: 60, maxStock: 500, unit: "tablets" },
      { id: "m14", name: "Amoxicillin", currentStock: 30, maxStock: 300, unit: "capsules" },
      { id: "m15", name: "Losartan", currentStock: 20, maxStock: 200, unit: "tablets" },
      { id: "m16", name: "Metformin", currentStock: 50, maxStock: 400, unit: "tablets" },
    ],
  },
  {
    id: "brgy-5",
    name: "Barangay Luntian",
    medicines: [
      { id: "m17", name: "Paracetamol", currentStock: 250, maxStock: 500, unit: "tablets" },
      { id: "m18", name: "Amoxicillin", currentStock: 140, maxStock: 300, unit: "capsules" },
      { id: "m19", name: "Losartan", currentStock: 100, maxStock: 200, unit: "tablets" },
      { id: "m20", name: "Metformin", currentStock: 200, maxStock: 400, unit: "tablets" },
    ],
  },
];
