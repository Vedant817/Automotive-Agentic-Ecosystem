export interface Vehicle {
  id: string;
  model: string;
  year: number;
  vin: string;
  ownerName: string;
  mileage: number;
  lastServiceDate: string;
  status: 'Healthy' | 'Warning' | 'Critical';
}

export const vehicles: Vehicle[] = [
  {
    id: 'VN12345',
    model: 'Tesla Model 3',
    year: 2022,
    vin: '5YJ3E1EA0NF123456',
    ownerName: 'John Doe',
    mileage: 24500,
    lastServiceDate: '2024-10-12',
    status: 'Warning',
  },
  {
    id: 'VN67890',
    model: 'Ford Mustang Mach-E',
    year: 2023,
    vin: '1FMCU0Hz1PMA67890',
    ownerName: 'Jane Smith',
    mileage: 12000,
    lastServiceDate: '2024-11-01',
    status: 'Healthy',
  }
];

export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find(v => v.id === id);
};
