"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Calendar, Plus, Clock } from "lucide-react";

export default function AppointmentsPanel() {
  const [showForm, setShowForm] = useState(false);
  const appointments = useStore((state) => state.appointments);
  const addAppointment = useStore((state) => state.addAppointment);
  const selectedVehicle = useStore((state) => state.selectedVehicle);

  const handleAddAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    addAppointment({
      id: Date.now().toString(),
      vehicleId: selectedVehicle?.id || "",
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      serviceType: formData.get("serviceType") as string,
      status: "scheduled",
    });

    setShowForm(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Appointments</h1>
          <p className="mt-2 text-slate-400">
            Schedule and manage service appointments
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Appointment
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleAddAppointment}
          className="rounded-lg border border-slate-800 bg-slate-900 p-6"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Service Type
              </label>
              <select
                name="serviceType"
                required
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-blue-600 focus:outline-none"
              >
                <option>Oil Change</option>
                <option>Tire Rotation</option>
                <option>Brake Service</option>
                <option>Engine Diagnostic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Time
              </label>
              <input
                type="time"
                name="time"
                required
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Schedule
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Appointments List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!appointments || appointments.length === 0 ? (
          <div className="col-span-full rounded-lg border border-slate-800 bg-slate-900 p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-slate-600" />
            <p className="mt-4 text-slate-400">No appointments scheduled</p>
          </div>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="rounded-lg border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {apt.serviceType}
                  </h3>
                  <p className="text-sm text-slate-400">{apt.vehicleId}</p>
                </div>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    apt.status === "scheduled"
                      ? "bg-blue-900 text-blue-200"
                      : apt.status === "completed"
                        ? "bg-green-900 text-green-200"
                        : "bg-red-900 text-red-200"
                  }`}
                >
                  {apt.status}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="h-4 w-4" />
                  {apt.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="h-4 w-4" />
                  {apt.time}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
