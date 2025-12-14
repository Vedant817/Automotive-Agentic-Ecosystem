import { NextResponse } from 'next/server';
import { appointments, addAppointment, Appointment } from '@/mockData/appointments';

export async function GET() {
  return NextResponse.json(appointments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vehicleId, date, time, reason } = body;

    const newAppointment: Appointment = {
      id: `APT-${Date.now()}`,
      vehicleId,
      date,
      time,
      status: 'Scheduled',
      reason
    };

    addAppointment(newAppointment);

    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to schedule appointment' },
      { status: 500 }
    );
  }
}
