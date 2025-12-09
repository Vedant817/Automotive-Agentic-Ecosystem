from typing import TypedDict, Optional, List, Dict, Any
from app.models.alerts import DiagnosisResult, BookingConfirmation

class AgentState(TypedDict):
    vehicle_id: str
    telemetry_data: Optional[Dict[str, Any]]
    data_analysis_alert: Optional[Dict[str, Any]]

    diagnosis_result: Optional[DiagnosisResult]
    customer_response: Optional[str]
    chat_history: List[Dict[str, str]]
    booking_confirmation: Optional[BookingConfirmation]
    manufacturing_insight: Optional[str]