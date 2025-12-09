"use client";

import { useStore } from "@/lib/store";
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import StatCard from "../ui/StatCard";
import TelemetryChart from "../ui/TelemetryChart";

export default function DashboardPanel() {
  const vehicles = useStore((state) => state.vehicles);
  const selectedVehicle = useStore((state) => state.selectedVehicle);
  const telemetryData = useStore((state) => state.telemetryData);
  const diagnosis = useStore((state) => state.diagnosis);

  const healthyCount = vehicles.filter((v) => v.status === "healthy").length;
  const warningCount = vehicles.filter((v) => v.status === "warning").length;
  const criticalCount = vehicles.filter((v) => v.status === "critical").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Real-time monitoring of your vehicle fleet
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Vehicles"
          value={vehicles.length}
          icon={<Activity className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Healthy"
          value={healthyCount}
          icon={<CheckCircle className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Warnings"
          value={warningCount}
          icon={<AlertTriangle className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard
          title="Critical"
          value={criticalCount}
          icon={<AlertTriangle className="h-6 w-6" />}
          color="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Telemetry Chart */}
        <div className="lg:col-span-2">
          <TelemetryChart />
        </div>

        {/* Diagnosis Info */}
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-white">Diagnosis</h2>
          </div>
          {diagnosis ? (
            <div className="space-y-3">
              <div className="rounded-lg border border-yellow-800 bg-yellow-900/20 p-3">
                <p className="text-sm font-medium text-yellow-200">
                  {diagnosis.fault_description}
                </p>
                <p className="mt-2 text-xs text-yellow-100">
                  Code: {diagnosis.fault_code}
                </p>
                <p className="mt-1 text-xs text-yellow-100">
                  Component: {diagnosis.probable_component}
                </p>
                <p className="mt-1 text-xs text-yellow-100">
                  Urgency: <span className="font-semibold">{diagnosis.urgency}</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-400">No diagnosis yet</p>
          )}
        </div>
      </div>

      {/* Telemetry Data */}
      {telemetryData && (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Telemetry Data</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-lg bg-slate-800 p-3">
              <p className="text-xs text-slate-400">Engine Temp</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {telemetryData.engine_temp_c}°C
              </p>
            </div>
            <div className="rounded-lg bg-slate-800 p-3">
              <p className="text-xs text-slate-400">RPM</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {telemetryData.rpm}
              </p>
            </div>
            <div className="rounded-lg bg-slate-800 p-3">
              <p className="text-xs text-slate-400">Speed</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {telemetryData.speed_kmh} km/h
              </p>
            </div>
            <div className="rounded-lg bg-slate-800 p-3">
              <p className="text-xs text-slate-400">Fuel Level</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {telemetryData.fuel_level_percent}%
              </p>
            </div>
            <div className="rounded-lg bg-slate-800 p-3">
              <p className="text-xs text-slate-400">Battery</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {telemetryData.battery_voltage}V
              </p>
            </div>
            <div className="rounded-lg bg-slate-800 p-3">
              <p className="text-xs text-slate-400">DTC Codes</p>
              <p className="mt-1 text-lg font-semibold text-white">
                {telemetryData.dtc_codes.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Vehicle Details */}
      {selectedVehicle && (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-slate-400">Vehicle ID</p>
              <p className="mt-1 font-medium text-white">{selectedVehicle.id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">VIN</p>
              <p className="mt-1 font-medium text-white">{selectedVehicle.vin}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Status</p>
              <p
                className={`mt-1 font-medium ${
                  selectedVehicle.status === "healthy"
                    ? "text-green-400"
                    : selectedVehicle.status === "warning"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {selectedVehicle.status.charAt(0).toUpperCase() +
                  selectedVehicle.status.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Last Update</p>
              <p className="mt-1 font-medium text-white">
                {new Date(selectedVehicle.lastUpdate).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
