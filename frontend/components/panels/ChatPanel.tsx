"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Send, MessageCircle } from "lucide-react";

export default function ChatPanel() {
  const [message, setMessage] = useState("");
  const chatMessages = useStore((state) => state.chatMessages);
  const addChatMessage = useStore((state) => state.addChatMessage);

  const handleSend = () => {
    if (!message.trim()) return;

    addChatMessage({
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    });

    // Simulate AI response
    setTimeout(() => {
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I've analyzed your vehicle. Everything looks good. Your engine temperature is optimal and all systems are functioning normally.",
        timestamp: new Date().toISOString(),
      });
    }, 500);

    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-white">Customer Engagement</h1>
        <p className="mt-2 text-slate-400">
          Chat with the AI-powered customer engagement agent
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto rounded-lg border border-slate-800 bg-slate-900 p-6">
        {chatMessages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-slate-600" />
              <p className="mt-4 text-slate-400">
                Start a conversation with the AI agent
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
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
                  <p className="mt-1 text-xs opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
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
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-600 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
