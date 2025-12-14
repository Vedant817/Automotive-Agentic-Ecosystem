import { RawCustomerData } from './customerDataAgent';

export interface DiagnosticReport {
  reportId: string;
  vehicleId: string;
  suspectedSystems: string[];
  urgency: 'Low' | 'Medium' | 'High';
  summary: string;
  generatedAt: string;
}

export const reportAgent = async (data: RawCustomerData): Promise<DiagnosticReport> => {
  console.log('🤖 ReportAgent: Analyzing raw data...', data);

  // Hardcoded logic for demo
  const isOverheating = data.symptoms.some(s => s.toLowerCase().includes('overheat'));
  const isNoise = data.symptoms.some(s => s.toLowerCase().includes('noise'));

  let suspectedSystems = ['General'];
  let urgency: 'Low' | 'Medium' | 'High' = 'Low';

  if (isOverheating) {
    suspectedSystems = ['Cooling System'];
    urgency = 'High';
  } else if (isNoise) {
    suspectedSystems = ['Suspension', 'Engine'];
    urgency = 'Medium';
  }

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    reportId: `REP-${Math.floor(Math.random() * 10000)}`,
    vehicleId: data.vehicleId,
    suspectedSystems,
    urgency,
    summary: `Customer reports ${data.symptoms.join(', ')}. ${data.complaint}`,
    generatedAt: new Date().toISOString(),
  };
};
