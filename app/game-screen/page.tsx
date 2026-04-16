"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function GameScreen() {
  const router = useRouter();
  const { balance, currentDate, logs, addLog, setBalance, updateDate, inventory, skills } = useGameStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const actionText = input;
    setInput("");
    setLoading(true);

    // Add user action to log
    addLog({ date: currentDate, text: actionText, type: "action" });

    try {
      const res = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: actionText,
          state: { balance, currentDate, inventory, skills }
        })
      });

      const data = await res.json();

      if (data.error) {
        addLog({ date: currentDate, text: `SYSTEM ERROR: ${data.error}`, type: "system" });
      } else {
        // Update Store
        if (data.balanceDelta) setBalance(balance + data.balanceDelta);
        
        // Simple month addition (mocked logic for date progression)
        const dateObj = new Date(currentDate);
        dateObj.setMonth(dateObj.getMonth() + (data.monthsPassed || 1));
        const newDate = dateObj.toISOString().split('T')[0];
        updateDate(newDate);

        addLog({ date: newDate, text: data.narrative, type: "result" });
      }
    } catch (err) {
      addLog({ date: currentDate, text: "Connection failed.", type: "system" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 flex flex-col">
      <header className="border-b border-green-800 pb-4 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-green-400">LIFE RELOADED</h1>
          <p className="text-sm opacity-70">DATE: {currentDate}</p>
        </div>
        <div className="text-right">
          <p className="text-xl">BALANCE: ${balance.toFixed(2)}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-gray-950 border border-green-900 p-4 rounded mb-4 shadow-[0_0_15px_rgba(0,255,0,0.1)]">
        {logs.length === 0 && (
          <p className="opacity-50 italic">System initialized. Awaiting user input...</p>
        )}
        {logs.map((log, i) => (
          <div key={i} className={`mb-4 ${log.type === 'action' ? 'text-blue-400' : log.type === 'system' ? 'text-red-500' : 'text-green-300'}`}>
            <span className="opacity-50 text-xs">[{log.date}]</span> {log.type === 'action' ? '> ' : ''}{log.text}
          </div>
        ))}
        {loading && <p className="animate-pulse text-green-600">Processing simulation...</p>}
      </div>

      <form onSubmit={handleAction} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you want to do?"
          className="flex-1 bg-gray-900 border border-green-800 p-3 rounded focus:outline-none focus:border-green-400 text-green-100"
          disabled={loading}
        />
        <Button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-600 text-white px-6">
          EXECUTE
        </Button>
      </form>
    </main>
  );
}
