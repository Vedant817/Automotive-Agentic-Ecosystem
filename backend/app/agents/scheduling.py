from app.graph.state import AgentState
from app.tools.mock_services import get_available_slots, book_appointment_api
from app.models.alerts import BookingConfirmation

def scheduling_agent(state: AgentState):
    """Books the appointment."""
    print("--- 📅 Scheduling Service ---")
    
    if state.get("customer_response") != "yes":
        return state

    try:
        # 1. Fetch Slots
        slots = get_available_slots()
        if not slots:
            print("No available slots")
            return state
            
        # 2. Pick first slot for automation
        chosen_slot = slots[0]
        
        # 3. Book
        booking = book_appointment_api(state['vehicle_id'], chosen_slot)
        
        state['booking_confirmation'] = BookingConfirmation(**booking)
        print(f"✅ Appointment booked: {booking['booking_id']}")
    except Exception as e:
        print(f"❌ Error booking appointment: {e}")
        # Create a fallback booking confirmation
        state['booking_confirmation'] = BookingConfirmation(
            status="pending",
            booking_id="BK-FALLBACK",
            slot="To be confirmed",
            service_center_id="SC-Main-Hub"
        )
    
    return state