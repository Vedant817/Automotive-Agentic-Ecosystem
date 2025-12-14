import { NextResponse } from 'next/server';
import { masterAgent } from '@/agents/masterAgent';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vehicleId, symptoms, complaint } = body;

    if (!vehicleId || !symptoms) {
      return NextResponse.json(
        { error: 'Missing required fields: vehicleId, symptoms' },
        { status: 400 }
      );
    }

    const result = await masterAgent({
      vehicleId,
      symptoms,
      complaint: complaint || ''
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
