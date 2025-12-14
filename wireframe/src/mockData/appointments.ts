export interface Appointment {
  id: string;
  vehicleId: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Pending';
  reason: string;
}

// Initial mock data
export const appointments: Appointment[] = [
  {
    id: 'APT-100',
    vehicleId: 'VN12345',
    date: '2024-10-12',
    time: '10:00 AM',
    status: 'Completed',
    reason: 'Annual Maintenance',
  },
  {
    id: 'APT-101',
    vehicleId: 'VN67890',
    date: '2025-10-15',
    time: '02:00 PM',
    status: 'Scheduled',
    reason: 'Tire Replacement',
  },
  {
    id: 'APT-102',
    vehicleId: 'VN55555',
    date: '2025-10-16',
    time: '09:00 AM',
    status: 'Scheduled',
    reason: 'Brake Inspection',
  }
];

export const addAppointment = (appt: Appointment) => {
  appointments.push(appt);
};