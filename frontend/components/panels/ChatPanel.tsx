"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { startWorkflow, sendChatMessage } from "@/lib/api";
import { Send, MessageCircle, Loader } from "lucide-react";

export default function ChatPanel() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const selectedVehicle = useStore((state) => state.selectedVehicle);
  const currentVehicleId = useStore((state) => state.currentVehicleId);
  const chatMessages = useStore((state) => state.chatMessages);
  const diagnosis = useStore((state) => state.diagnosis);
  const booking = useStore((state) => state.booking);
  const isLoading = useStore((state) => state.isLoading);
  
  const setCurrentVehicleId = useStore((state) => state.setCurrentVehicleId);
  const setChatMessages = useStore((state) => state.setChatMessages);
  const addChatMessage = useStore((state) => state.addChatMessage);
  const setTelemetryData = useStore((state) => state.setTelemetryData);
  const setDiagnosis = useStore((state) => state.setDiagnosis);
  const setBooking = useStore((state) => state.setBooking);
  const setManufacturingAlert = useStore((state) => state.setManufacturingAlert);
  const setIsLoading = useStore((state) => state.setIsLoading);

  const initializeWorkflow = async () => {
    if (!selectedVehicle) return;
    
    try {
      setIsLoading(true);
      setError("");
      
      const response = await startWorkflow(selectedVehicle.id);
      
      setCurrentVehicleId(selectedVehicle.id);
      setTelemetryData(response.telemetry_data || null);
      setDiagnosis(response.diagnosis);
      setChatMessages(
        response.chat_history.map((msg: { role: string; content: string }) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to start workflow. Make sure backend is running.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize workflow when vehicle is selected
  useEffect(() => {
    if (selectedVehicle && currentVehicleId !== selectedVehicle.id) {
      initializeWorkflow();
    }
  }, [selectedVehicle?.id, currentVehicleId]);

  const handleSend = async () => {
    if (!message.trim() || !currentVehicleId) return;

    try {
      setIsLoading(true);
      setError("");
      
      // Add user message
      addChatMessage({
        role: "user",
        content: message,
      });

      // Send to backend
      const response = await sendChatMessage(currentVehicleId, message);
      
      // Add assistant response
      addChatMessage({
        role: "assistant",
        content: response.response,
      });

      // Update booking and alert if available
      if (response.booking) {
        setBooking(response.booking);
      }
      if (response.manufacturing_alert) {
        setManufacturingAlert(response.manufacturing_alert);
      }

      setMessage("");
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Customer Engagement</h1>
        <p className="mt-2 text-slate-400">
          Chat with the AI-powered customer engagement agent
        </p>
        {selectedVehicle && (
          <p className="mt-1 text-sm text-blue-400">
            Vehicle: {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
          </p>
        )}
      </div>

      {/* Diagnosis Info */}
      {diagnosis && (
        <div className="rounded-lg border border-yellow-800 bg-yellow-900/20 p-4">
          <h3 className="font-semibold text-yellow-200">Diagnosis</h3>
          <p className="mt-1 text-sm text-yellow-100">{diagnosis.fault_description}</p>
          <p className="mt-1 text-xs text-yellow-200">
            Component: {diagnosis.probable_component} | Urgency: {diagnosis.urgency}
          </p>
        </div>
      )}

      {/* Booking Info */}
      {booking && (
        <div className="rounded-lg border border-green-800 bg-green-900/20 p-4">
          <h3 className="font-semibold text-green-200">Booking Confirmed</h3>
          <p className="mt-1 text-sm text-green-100">Slot: {booking.slot}</p>
          <p className="text-xs text-green-200">ID: {booking.booking_id}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-red-800 bg-red-900/20 p-3">
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto rounded-lg border border-slate-800 bg-slate-900 p-6">
        {chatMessages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-slate-600" />
              <p className="mt-4 text-slate-400">
                {isLoading ? "Loading conversation..." : "Start a conversation with the AI agent"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
          placeholder={isLoading ? "Loading..." : "Type your response..."}
          disabled={isLoading || !currentVehicleId}
          className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white placeholder-slate-500 disabled:opacity-50 focus:border-blue-600 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !currentVehicleId}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
