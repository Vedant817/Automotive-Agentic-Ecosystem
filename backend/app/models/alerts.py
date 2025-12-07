from pydantic import BaseModel
from typing import Optional

class DiagnosisResult(BaseModel):
    fault_code: str
    fault_description: str
    probable_component: str
    urgency: str
    recommendation: str

class BookingConfirmation(BaseModel):
    status: str
    booking_id: str
    slot: str
    service_center_id: str