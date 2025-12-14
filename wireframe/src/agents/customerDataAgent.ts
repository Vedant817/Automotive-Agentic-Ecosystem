export interface CustomerInput {
  vehicleId: string;
  symptoms: string[];
  complaint: string;
}

export interface RawCustomerData {
  vehicleId: string;
  symptoms: string[];
  lastService: string;
  complaint: string;
  timestamp: string;
}

import { getVehicleById } from '../mockData/vehicles';

export const customerDataAgent = async (input: CustomerInput): Promise<RawCustomerData> => {
  console.log('🤖 CustomerDataAgent: Collecting data...');
  
  const vehicle = getVehicleById(input.vehicleId);
  const lastService = vehicle ? vehicle.lastServiceDate : 'Unknown';

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    vehicleId: input.vehicleId,
    symptoms: input.symptoms,
    lastService,
    complaint: input.complaint,
    timestamp: new Date().toISOString(),
  };
};
