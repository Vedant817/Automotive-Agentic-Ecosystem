import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const REQUEST_TIMEOUT_MS = 60000; // Increase timeout for slower backends
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

type RetryConfig = AxiosRequestConfig & { _retryCount?: number };

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: REQUEST_TIMEOUT_MS,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Add response interceptor for better error handling and limited retries on GET timeouts/network issues
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined;
    const isGetRequest = (config?.method || "").toLowerCase() === "get";
    const isTimeout =
      error.code === "ECONNABORTED" ||
      (typeof error.message === "string" && error.message.toLowerCase().includes("timeout"));
    const isNetwork = !error.response;

    if (config && isGetRequest && (isTimeout || isNetwork)) {
      const retryCount = config._retryCount ?? 0;
      if (retryCount < MAX_RETRIES) {
        config._retryCount = retryCount + 1;
        const backoff = RETRY_DELAY_MS * (retryCount + 1);
        await sleep(backoff);
        return apiClient(config);
      }
    }

    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// Types
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

export interface WorkflowResponse {
  vehicle_id: string;
  initial_message: string;
  chat_history: Array<{ role: string; content: string }>;
  diagnosis: DiagnosisResult;
  telemetry_data?: TelemetryData;
  data_analysis_alert?: { alert_type: string; message: string };
}

export interface ChatResponse {
  response: string;
  booking?: BookingConfirmation;
  manufacturing_alert?: string;
}

// Start workflow for a vehicle
export const startWorkflow = async (vehicleId: string) => {
  try {
    const response = await apiClient.post<WorkflowResponse>(
      "/workflow/start",
      null,
      { params: { vehicle_id: vehicleId } }
    );
    return response.data;
  } catch (error) {
    console.error("Workflow start error:", error);
    
    const err = error as Record<string, unknown>;
    
    // Provide detailed error information
    if (err.code === "ECONNREFUSED" || (err.message as string)?.includes("ECONNREFUSED")) {
      throw new Error(`Backend connection failed. Make sure the backend is running on ${API_BASE_URL}`);
    }
    
    if ((err.response as Record<string, unknown>)?.status === 500) {
      throw new Error(`Backend error: ${((err.response as Record<string, unknown>)?.data as Record<string, unknown>)?.detail || "Internal server error"}`);
    }
    
    if ((err.response as Record<string, unknown>)?.status === 404) {
      throw new Error("Workflow endpoint not found. Check backend configuration.");
    }
    
    if ((err.message as string)?.includes("Network Error")) {
      throw new Error(`Network error: Cannot reach backend at ${API_BASE_URL}`);
    }
    
    throw error;
  }
};

// Send chat message to continue workflow
export const sendChatMessage = async (vehicleId: string, message: string) => {
  try {
    const response = await apiClient.post<ChatResponse>(
      "/chat/message",
      null,
      { params: { vehicle_id: vehicleId, message } }
    );
    return response.data;
  } catch (error) {
    console.error("Chat message error:", error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    await apiClient.get("/");
    return { status: "connected" };
  } catch (error) {
    console.error("Health check error:", error);
    return { status: "disconnected" };
  }
};

// Get vehicles list
export const getVehicles = async () => {
  try {
    const response = await apiClient.get("/vehicles");
    return response.data.vehicles;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

// Get telemetry data for a vehicle
export const getTelemetry = async (vehicleId: string) => {
  try {
    const response = await apiClient.get(`/telemetry/${vehicleId}`);
    return response.data.telemetry;
  } catch (error) {
    console.error("Error fetching telemetry:", error);
    throw error;
  }
};

// Get session data for a vehicle
export const getSession = async (vehicleId: string) => {
  try {
    const response = await apiClient.get(`/session/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

export default apiClient;
