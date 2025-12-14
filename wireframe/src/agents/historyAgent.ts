import { DiagnosisResult } from './diagnosisAgent';
import { getVehicleById } from '../mockData/vehicles';
import { getServiceHistory } from '../mockData/serviceHistory';

export interface HistoryCorrelation {
  historicalPattern: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  batchNote?: string;
}

export const historyAgent = async (vehicleId: string, diagnosis: DiagnosisResult): Promise<HistoryCorrelation> => {
  console.log('🤖 HistoryAgent: Correlating history...', vehicleId);

  const vehicle = getVehicleById(vehicleId);
  const history = getServiceHistory(vehicleId);

  let historicalPattern = 'No significant recurring issues found.';
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let batchNote = '';

  // Simulate batch defect logic
  if (diagnosis.probableIssue === 'Coolant Pump Failure') {
    // Check if vehicle is in a "bad batch" year
    if (vehicle?.year === 2022) {
         historicalPattern = 'Repeated cooling failures detected in 2022 Model 3 batches.';
         riskLevel = 'High';
         batchNote = 'Batch-X identified for cooling pump defects.';
    }
  }

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 700));

  return {
    historicalPattern,
    riskLevel,
    batchNote
  };
};
