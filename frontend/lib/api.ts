import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface DiagnosisRequest {
  vehicle_id: string;
  telemetry_data: Record<string, unknown>;
}

export interface EngagementRequest {
  vehicle_id: string;
  customer_message: string;
}

export interface SchedulingRequest {
  vehicle_id: string;
  service_type: string;
  preferred_date: string;
}

export interface InsightRequest {
  vehicle_id: string;
  issue_type: string;
}

// Diagnosis Agent
export const getDiagnosis = async (request: DiagnosisRequest) => {
  try {
    const response = await apiClient.post("/api/diagnosis", request);
    return response.data;
  } catch (error) {
    console.error("Diagnosis API error:", error);
    throw error;
  }
};

// Engagement Agent
export const getEngagement = async (request: EngagementRequest) => {
  try {
    const response = await apiClient.post("/api/engagement", request);
    return response.data;
  } catch (error) {
    console.error("Engagement API error:", error);
    throw error;
  }
};

// Scheduling Agent
export const scheduleService = async (request: SchedulingRequest) => {
  try {
    const response = await apiClient.post("/api/scheduling", request);
    return response.data;
  } catch (error) {
    console.error("Scheduling API error:", error);
    throw error;
  }
};

// Insights Agent
export const getInsights = async (request: InsightRequest) => {
  try {
    const response = await apiClient.post("/api/insights", request);
    return response.data;
  } catch (error) {
    console.error("Insights API error:", error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await apiClient.get("/health");
    return response.data;
  } catch (error) {
    console.error("Health check error:", error);
    return { status: "disconnected" };
  }
};

// Telematics stream
export const getTelemetryStream = async (vehicleId: string) => {
  try {
    const response = await apiClient.get(`/api/telemetry/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error("Telemetry API error:", error);
    throw error;
  }
};

export default apiClient;
