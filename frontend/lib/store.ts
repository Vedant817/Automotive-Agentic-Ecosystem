import { create } from "zustand";

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  status: "healthy" | "warning" | "critical";
  lastUpdate: string;
}

export interface TelemetryData {
  timestamp: string;
  temperature: number;
  rpm: number;
  speed: number;
  fuelLevel: number;
  batteryVoltage: number;
  anomalies: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Appointment {
  id: string;
  vehicleId: string;
  date: string;
  time: string;
  serviceType: string;
  status: "scheduled" | "completed" | "cancelled";
}

export interface Insight {
  id: string;
  vehicleId: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  timestamp: string;
  source: string;
}

interface Store {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  telemetryData: TelemetryData | null;
  chatMessages: ChatMessage[];
  appointments: Appointment[];
  insights: Insight[];
  isConnected: boolean;
  
  setVehicles: (vehicles: Vehicle[]) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setTelemetryData: (data: TelemetryData) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChatMessages: () => void;
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  setInsights: (insights: Insight[]) => void;
  addInsight: (insight: Insight) => void;
  setIsConnected: (connected: boolean) => void;
  initialize: () => void;
}

export const useStore = create<Store>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  telemetryData: null,
  chatMessages: [],
  appointments: [],
  insights: [],
  isConnected: false,

  setVehicles: (vehicles) => set({ vehicles }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  setTelemetryData: (data) => set({ telemetryData: data }),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  clearChatMessages: () => set({ chatMessages: [] }),
  setAppointments: (appointments) => set({ appointments }),
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  setInsights: (insights) => set({ insights }),
  addInsight: (insight) =>
    set((state) => ({ insights: [...state.insights, insight] })),
  setIsConnected: (connected) => set({ isConnected: connected }),

  initialize: () => {
    // Initialize with mock data
    const mockVehicles: Vehicle[] = [
      {
        id: "VN12345",
        make: "Tesla",
        model: "Model S",
        year: 2023,
        vin: "5TDJKRFH4LS123456",
        status: "warning",
        lastUpdate: new Date().toISOString(),
      },
      {
        id: "VN67890",
        make: "BMW",
        model: "X5",
        year: 2022,
        vin: "WBADT43452G915234",
        status: "healthy",
        lastUpdate: new Date().toISOString(),
      },
    ];
    set({ vehicles: mockVehicles, selectedVehicle: mockVehicles[0] });
  },
}));
