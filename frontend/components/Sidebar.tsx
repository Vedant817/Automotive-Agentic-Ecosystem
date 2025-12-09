"use client";
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  Calendar,
  Lightbulb,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useStore } from "@/lib/store";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ isOpen, activeTab, onTabChange }: SidebarProps) {
  const vehicles = useStore((state) => state.vehicles);
  const selectedVehicle = useStore((state) => state.selectedVehicle);
  const setSelectedVehicle = useStore((state) => state.setSelectedVehicle);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "vehicles", label: "Vehicles", icon: Car },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "insights", label: "Insights", icon: Lightbulb },
  ];

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-800 bg-slate-900 transition-transform duration-300 lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-4 h-16">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-white">Auto AI</span>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Vehicles Section */}
      <div className="border-t border-slate-800 px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase text-slate-400">
            Vehicles
          </h3>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
        <div className="space-y-2">
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              className={clsx(
                "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                selectedVehicle?.id === vehicle.id
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <div className="font-medium">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </div>
              <div className="text-xs text-slate-500">{vehicle.id}</div>
              <div
                className={clsx(
                  "mt-1 inline-block rounded px-2 py-1 text-xs font-medium",
                  vehicle.status === "healthy"
                    ? "bg-green-900 text-green-200"
                    : vehicle.status === "warning"
                      ? "bg-yellow-900 text-yellow-200"
                      : "bg-red-900 text-red-200"
                )}
              >
                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4">
        <button className="mt-2 w-full flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
