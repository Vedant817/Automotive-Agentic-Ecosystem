"use client";

import { useStore } from "@/lib/store";
import { Car, AlertTriangle, CheckCircle } from "lucide-react";

export default function VehiclesPanel() {
  const vehicles = useStore((state) => state.vehicles);
  const setSelectedVehicle = useStore((state) => state.setSelectedVehicle);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Vehicles</h1>
        <p className="mt-2 text-slate-400">
          Manage and monitor your vehicle fleet
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => setSelectedVehicle(vehicle)}
            className="cursor-pointer rounded-lg border border-slate-800 bg-slate-900 p-6 transition-all hover:border-slate-700 hover:bg-slate-800"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-900/20 p-3">
                  <Car className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-sm text-slate-400">{vehicle.id}</p>
                </div>
              </div>
              {vehicle.status === "healthy" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              )}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">VIN</span>
                <span className="text-white">{vehicle.vin}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Status</span>
                <span
                  className={
                    vehicle.status === "healthy"
                      ? "text-green-400"
                      : vehicle.status === "warning"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }
                >
                  {vehicle.status.charAt(0).toUpperCase() +
                    vehicle.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Last Update</span>
                <span className="text-white">
                  {new Date(vehicle.lastUpdate).toLocaleTimeString()}
                </span>
              </div>
            </div>

            <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
