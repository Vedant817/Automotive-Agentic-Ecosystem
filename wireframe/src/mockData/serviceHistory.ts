export interface ServiceRecord {
  id: string;
  vehicleId: string;
  date: string;
  description: string;
  type: 'Maintenance' | 'Repair' | 'Recall';
  technicianNotes?: string;
  batchId?: string;
}

export const serviceHistory: ServiceRecord[] = [
  {
    id: 'SR-001',
    vehicleId: 'VN12345',
    date: '2023-10-12',
    description: 'Annual Maintenance',
    type: 'Maintenance',
    technicianNotes: 'Routine checkup. All systems normal.',
  },
  {
    id: 'SR-002',
    vehicleId: 'VN12345',
    date: '2024-04-15',
    description: 'Tire Rotation',
    type: 'Maintenance',
  },
  // History for other vehicles in Batch X showing cooling issues
  {
    id: 'SR-003',
    vehicleId: 'VN12346', // Sibling vehicle
    date: '2024-11-20',
    description: 'Coolant Pump Replacement',
    type: 'Repair',
    batchId: 'Batch-X',
    technicianNotes: 'Pump failure detected. Common in this batch.',
  },
  {
    id: 'SR-004',
    vehicleId: 'VN12347', // Another sibling
    date: '2024-12-01',
    description: 'Overheating Diagnosis',
    type: 'Repair',
    batchId: 'Batch-X',
    technicianNotes: 'Cooling system inefficiency.',
  }
];

export const getServiceHistory = (vehicleId: string): ServiceRecord[] => {
  return serviceHistory.filter(r => r.vehicleId === vehicleId);
};

export const getBatchHistory = (batchId: string): ServiceRecord[] => {
  return serviceHistory.filter(r => r.batchId === batchId);
};
