from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.app.graph.workflow import app_workflow
from backend.app.graph.state import AgentState
from backend.app.tools.vector_store import initialize_vector_db
from backend.app.agents.scheduling import scheduling_agent
from backend.app.agents.insights import insights_agent
import uvicorn

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
    initialize_vector_db()

@app.post("/workflow/start")
async def start_workflow(vehicle_id: str):
    """Starts the detection and diagnosis phase."""
    print(f"🚀 Starting workflow for {vehicle_id}")
    
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

    return {
        "vehicle_id": vehicle_id,
        "initial_message": msg,
        "chat_history": result.get("chat_history", []),
        "diagnosis": result.get("diagnosis_result")
    }

@app.post("/chat/message")
async def chat_message(vehicle_id: str, message: str):
    """Handles user response and resumes workflow."""
    state = SESSION_STORE.get(vehicle_id)
    if not state:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Update History
    state["chat_history"].append({"role": "user", "content": message})
    state["customer_response"] = message.lower()
    
    if "yes" in message.lower():
        # Resume Workflow: Manually run Scheduling -> Insights
        state = scheduling_agent(state)
        state = insights_agent(state)
        
        SESSION_STORE[vehicle_id] = state
        
        return {
            "response": f"Confirmed! Service booked for {state['booking_confirmation'].slot}.",
            "booking": state['booking_confirmation'],
            "manufacturing_alert": state['manufacturing_insight']
        }
    else:
        return {"response": "No problem. I'll snooze this alert."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)