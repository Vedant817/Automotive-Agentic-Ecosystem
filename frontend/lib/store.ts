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
  engine_temp_c: number;
  rpm: number;
  speed_kmh: number;
  fuel_level_percent: number;
  battery_voltage: number;
  dtc_codes: string[];
}

export interface DiagnosisResult {
  fault_code: string;
  fault_description: string;
  probable_component: string;
  urgency: string;
  recommendation: string;
}

export interface BookingConfirmation {
  status: string;
  booking_id: string;
  slot: string;
  service_center_id: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
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
  severity: "critical" | "warning" | "info";
  timestamp: string;
  source: string;
}

interface Store {
  // Vehicles
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  
  // Workflow state
  currentVehicleId: string | null;
  telemetryData: TelemetryData | null;
  diagnosis: DiagnosisResult | null;
  chatMessages: ChatMessage[];
  booking: BookingConfirmation | null;
  manufacturingAlert: string | null;
  appointments: Appointment[];
  insights: Insight[];
  
  // UI state
  isConnected: boolean;
  isLoading: boolean;
  
  // Actions
  setVehicles: (vehicles: Vehicle[]) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setCurrentVehicleId: (id: string | null) => void;
  setTelemetryData: (data: TelemetryData | null) => void;
  setDiagnosis: (diagnosis: DiagnosisResult | null) => void;
  setChatMessages: (messages: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  setBooking: (booking: BookingConfirmation | null) => void;
  setManufacturingAlert: (alert: string | null) => void;
  setIsConnected: (connected: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  addAppointment: (appointment: Appointment) => void;
  addInsight: (insight: Insight) => void;
  resetWorkflow: () => void;
  initialize: () => void;
}

export const useStore = create<Store>((set) => ({
  // Initial state
  vehicles: [],
  selectedVehicle: null,
  currentVehicleId: null,
  telemetryData: null,
  diagnosis: null,
  chatMessages: [],
  booking: null,
  manufacturingAlert: null,
  appointments: [],
  insights: [],
  isConnected: false,
  isLoading: false,

  // Actions
  setVehicles: (vehicles) => set({ vehicles }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  setCurrentVehicleId: (id) => set({ currentVehicleId: id }),
  setTelemetryData: (data) => set({ telemetryData: data }),
  setDiagnosis: (diagnosis) => set({ diagnosis }),
  setChatMessages: (messages) => set({ chatMessages: messages }),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setBooking: (booking) => set({ booking }),
  setManufacturingAlert: (alert) => set({ manufacturingAlert: alert }),
  setIsConnected: (connected) => set({ isConnected: connected }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  addInsight: (insight) =>
    set((state) => ({ insights: [...state.insights, insight] })),
  
  resetWorkflow: () => set({
    currentVehicleId: null,
    telemetryData: null,
    diagnosis: null,
    chatMessages: [],
    booking: null,
    manufacturingAlert: null,
  }),

  initialize: () => {
    // Initialize with mock vehicles
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
