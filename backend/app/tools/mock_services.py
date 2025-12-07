import random
from datetime import datetime, timedelta

def get_vehicle_data(vehicle_id: str):
    """Simulates fetching real-time data from a vehicle."""
    # Simulation: Always return 'overheating' data for the demo
    return {
        "vehicle_id": vehicle_id,
        "timestamp": datetime.now().isoformat(),
        "engine_temp_c": 112.5, # Overheating scenario
        "oil_pressure_psi": 35.0,
        "rpm": 2500,
        "dtc_codes": ["P0301"]  # Misfire code
    }

def get_available_slots():
    """Returns mock available appointment slots."""
    tomorrow = datetime.now() + timedelta(days=1)
    return [
        (tomorrow + timedelta(hours=9)).strftime("%Y-%m-%d %H:%M"),
        (tomorrow + timedelta(hours=14)).strftime("%Y-%m-%d %H:%M")
    ]

def book_appointment_api(vehicle_id: str, slot: str):
    """Simulates booking an appointment via API."""
    return {
        "status": "confirmed",
        "booking_id": f"BK-{random.randint(10000, 99999)}",
        "slot": slot,
        "service_center_id": "SC-Main-Hub"
    }