"use client";

import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { vehicles } from '@/mockData/vehicles';
import { Car, User, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

export default function CustomersPage() {
  return (
    <DashboardLayout type="company">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customer Database</h1>
          <p className="text-gray-500">Registered vehicles and owners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Car className="w-8 h-8 text-gray-600" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  vehicle.status === 'Healthy' ? 'bg-green-100 text-green-700' : 
                  vehicle.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {vehicle.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800">{vehicle.model}</h3>
              <p className="text-sm text-gray-500 mb-4">{vehicle.year} • {vehicle.vin}</p>
              
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4 text-gray-400" />
                  {vehicle.ownerName}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                   <ShieldCheck className="w-4 h-4 text-gray-400" />
                   {vehicle.mileage.toLocaleString()} miles
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                   <Calendar className="w-4 h-4 text-gray-400" />
                   Last Service: {vehicle.lastServiceDate}
                </div>
              </div>
            </div>
          ))}
          
          {/* Add some dummy extra cards to fill the view */}
          {[1,2,3].map(i => (
             <div key={i} className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 min-h-[250px]">
                <Car className="w-8 h-8 mb-2 opacity-50" />
                <p className="font-medium">Empty Slot</p>
             </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
