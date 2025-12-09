"use client";

import { useStore } from "@/lib/store";
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import StatCard from "../ui/StatCard";
import TelemetryChart from "../ui/TelemetryChart";

export default function DashboardPanel() {
  const vehicles = useStore((state) => state.vehicles);
  const selectedVehicle = useStore((state) => state.selectedVehicle);
  const insights = useStore((state) => state.insights);

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

        {/* Recent Insights */}
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-white">Recent Insights</h2>
          </div>
          <div className="space-y-3">
            {insights.slice(0, 5).map((insight) => (
              <div
                key={insight.id}
                className="rounded-lg border border-slate-700 bg-slate-800 p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{insight.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {insight.description}
                    </p>
                  </div>
                  <span
                    className={`ml-2 inline-block rounded px-2 py-1 text-xs font-medium ${
                      insight.severity === "critical"
                        ? "bg-red-900 text-red-200"
                        : insight.severity === "warning"
                          ? "bg-yellow-900 text-yellow-200"
                          : "bg-blue-900 text-blue-200"
                    }`}
                  >
                    {insight.severity}
                  </span>
                </div>
              </div>
            ))}
            {insights.length === 0 && (
              <p className="text-center text-slate-400">No insights yet</p>
            )}
          </div>
        </div>
      </div>

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
