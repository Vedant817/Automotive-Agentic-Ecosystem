from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.graph.workflow import app_workflow
from app.graph.state import AgentState
from app.tools.vector_store import initialize_vector_db
from app.agents.scheduling import scheduling_agent
from app.agents.insights import insights_agent
from app.tools.mock_services import get_vehicle_data
import uvicorn
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Automotive Agentic Ecosystem")

# CORS Setup for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory session store (Use Redis for production)
SESSION_STORE = {}

@app.on_event("startup")
async def startup_event():
    """Initialize Vector DB with mock data on startup."""
    try:
        initialize_vector_db()
        logger.info("✅ Vector DB initialized successfully")
    except Exception as e:
        logger.error(f"❌ Failed to initialize Vector DB: {e}")

@app.get("/")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "message": "Automotive Agentic Ecosystem API"}

@app.post("/workflow/start")
async def start_workflow(vehicle_id: str):
    """Starts the detection and diagnosis phase."""
    try:
        logger.info(f"🚀 Starting workflow for {vehicle_id}")
        
        initial_state = AgentState(
            vehicle_id=vehicle_id,
            telemetry_data=None,
            data_analysis_alert=None,
            diagnosis_result=None,
            customer_response=None,
            chat_history=[],
            booking_confirmation=None,
            manufacturing_insight=None
        )
        
        # Run the graph (stops at Engagement)
        result = app_workflow.invoke(initial_state)
        
        # Save state
        SESSION_STORE[vehicle_id] = result
        
        # Get initial message
        msg = "Connecting..."
        if result.get("chat_history") and len(result["chat_history"]) > 0:
            msg = result["chat_history"][-1]["content"]

        logger.info(f"✅ Workflow started successfully for {vehicle_id}")
        return {
            "vehicle_id": vehicle_id,
            "initial_message": msg,
            "chat_history": result.get("chat_history", []),
            "diagnosis": result.get("diagnosis_result"),
            "telemetry_data": result.get("telemetry_data")
        }
    except Exception as e:
        logger.error(f"❌ Error starting workflow: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat/message")
async def chat_message(vehicle_id: str, message: str):
    """Handles user response and resumes workflow."""
    try:
        logger.info(f"📨 Chat message received for {vehicle_id}: {message}")
        
        state = SESSION_STORE.get(vehicle_id)
        if not state:
            logger.error(f"Session not found for {vehicle_id}")
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Update History
        state["chat_history"].append({"role": "user", "content": message})
        state["customer_response"] = message.lower()
        
        if "yes" in message.lower():
            logger.info(f"✅ User confirmed booking for {vehicle_id}")
            # Resume Workflow: Manually run Scheduling -> Insights
            state = scheduling_agent(state)
            state = insights_agent(state)
            
            SESSION_STORE[vehicle_id] = state
            
            response_msg = f"Confirmed! Service booked for {state['booking_confirmation'].slot}."
            state["chat_history"].append({"role": "assistant", "content": response_msg})
            
            return {
                "response": response_msg,
                "booking": state['booking_confirmation'].dict() if hasattr(state['booking_confirmation'], 'dict') else state['booking_confirmation'],
                "manufacturing_alert": state['manufacturing_insight']
            }
        else:
            logger.info(f"User declined booking for {vehicle_id}")
            response_msg = "No problem. I'll snooze this alert."
            state["chat_history"].append({"role": "assistant", "content": response_msg})
            SESSION_STORE[vehicle_id] = state
            return {"response": response_msg}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error in chat message: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/vehicles")
async def get_vehicles():
    """Get list of mock vehicles."""
    try:
        vehicles = [
            {
                "id": "VN12345",
                "make": "Tesla",
                "model": "Model S",
                "year": 2023,
                "vin": "5TDJKRFH4LS123456",
                "status": "warning",
                "lastUpdate": "2024-12-09T22:16:00Z"
            },
            {
                "id": "VN67890",
                "make": "BMW",
                "model": "X5",
                "year": 2022,
                "vin": "WBADT43452G915234",
                "status": "healthy",
                "lastUpdate": "2024-12-09T22:16:00Z"
            },
            {
                "id": "VN11111",
                "make": "Audi",
                "model": "A6",
                "year": 2023,
                "vin": "WAUZZZ4G2EN123456",
                "status": "critical",
                "lastUpdate": "2024-12-09T22:16:00Z"
            }
        ]
        return {"vehicles": vehicles}
    except Exception as e:
        logger.error(f"❌ Error fetching vehicles: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/telemetry/{vehicle_id}")
async def get_telemetry(vehicle_id: str):
    """Get telemetry data for a vehicle."""
    try:
        data = get_vehicle_data(vehicle_id)
        return {
            "vehicle_id": vehicle_id,
            "telemetry": data
        }
    except Exception as e:
        logger.error(f"❌ Error fetching telemetry: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/session/{vehicle_id}")
async def get_session(vehicle_id: str):
    """Get current session state for a vehicle."""
    try:
        state = SESSION_STORE.get(vehicle_id)
        if not state:
            raise HTTPException(status_code=404, detail="Session not found")
        
        return {
            "vehicle_id": vehicle_id,
            "chat_history": state.get("chat_history", []),
            "diagnosis": state.get("diagnosis_result"),
            "booking": state.get("booking_confirmation"),
            "telemetry_data": state.get("telemetry_data")
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error fetching session: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)