"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { checkHealth, getVehicles } from "@/lib/api";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const setIsConnected = useStore((state) => state.setIsConnected);
  const setVehicles = useStore((state) => state.setVehicles);
  const setSelectedVehicle = useStore((state) => state.setSelectedVehicle);
  const vehicles = useStore((state) => state.vehicles);

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Check health
        await checkHealth();
        setIsConnected(true);

        // Fetch vehicles from backend
        const vehiclesList = await getVehicles();
        setVehicles(vehiclesList);
        
        // Set first vehicle as selected if none is selected
        if (vehiclesList.length > 0 && vehicles.length === 0) {
          setSelectedVehicle(vehiclesList[0]);
        }
      } catch (error) {
        console.error("Error initializing dashboard:", error);
        setIsConnected(false);
      }
    };

    initializeDashboard();
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, [setIsConnected, setVehicles, setSelectedVehicle, vehicles.length]);

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
}
