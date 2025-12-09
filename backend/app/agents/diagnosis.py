from app.graph.state import AgentState
from app.tools.mock_services import get_vehicle_data
from app.models.alerts import DiagnosisResult

def data_analysis_agent(state: AgentState):
    """Fetches data and flags anomalies."""
    print("--- 🔍 Analyzing Data Stream ---")
    vehicle_id = state['vehicle_id']
    data = get_vehicle_data(vehicle_id)
    state['telemetry_data'] = data
    
    # Rule-Based Trigger (Robust for demo)
    if data['engine_temp_c'] > 105.0:
        state['data_analysis_alert'] = {
            "alert_type": "Critical", 
            "message": "Engine Overheating Detected"
        }
    return state

def diagnosis_agent(state: AgentState):
    """Diagnoses the issue based on DTC codes."""
    print("--- 🩺 Diagnosing Fault ---")
    if not state.get('data_analysis_alert'):
        return state

    data = state['telemetry_data']
    
    if "P0301" in data['dtc_codes']:
        state['diagnosis_result'] = DiagnosisResult(
            fault_code="P0301",
            fault_description="Cylinder 1 Misfire detected along with high temperature.",
            probable_component="Cooling System / Ignition Coil",
            urgency="High",
            recommendation="Immediate inspection required."
        )
    return state