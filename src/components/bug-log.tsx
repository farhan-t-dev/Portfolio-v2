"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Activity, GitCommit, Server, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: number;
  type: "git" | "system" | "security" | "server";
  message: string;
  timestamp: string;
}

const mockLogs: Omit<LogEntry, "id" | "timestamp">[] = [
  { type: "git", message: "feat: optimized database indexing strategy" },
  { type: "server", message: "Deploying build v2.4.0 to production..." },
  { type: "system", message: "Garbage collection completed. Freed 240MB." },
  { type: "security", message: "WAF: Blocked suspicious request from 192.168.x.x" },
  { type: "git", message: "fix: resolved race condition in auth middleware" },
  { type: "server", message: "Health check: All systems operational [200 OK]" },
  { type: "system", message: "Cache invalidated for key: user_profile_data" },
  { type: "git", message: "chore: updated dependencies" },
];

export default function DevTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial logs
    setLogs([
      { id: 1, type: "system", message: "Initializing Dev Log sequence...", timestamp: new Date().toLocaleTimeString() },
      { id: 2, type: "server", message: "Connected to remote origin.", timestamp: new Date().toLocaleTimeString() },
    ]);

    let count = 3;
    const interval = setInterval(() => {
      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      const newLog: LogEntry = {
        id: count++,
        ...randomLog,
        timestamp: new Date().toLocaleTimeString(),
      };

      setLogs((prev) => {
        const updated = [...prev, newLog];
        return updated.slice(-8); // Keep only last 8 logs
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getIcon = (type: string) => {
    switch (type) {
      case "git": return <GitCommit className="w-3 h-3 text-blue-400" />;
      case "server": return <Server className="w-3 h-3 text-emerald-400" />;
      case "security": return <Shield className="w-3 h-3 text-red-400" />;
      default: return <Activity className="w-3 h-3 text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-[#0f172a] border border-white/10 overflow-hidden shadow-2xl font-mono text-sm relative">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-500" />
          <span className="text-xs text-slate-400 uppercase tracking-widest">system_activity.log</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="h-[300px] overflow-y-auto p-6 space-y-3 scroll-smooth"
      >
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3 text-slate-300"
          >
            <span className="text-[10px] text-slate-600 whitespace-nowrap pt-0.5 select-none">
              [{log.timestamp}]
            </span>
            <div className="mt-0.5">{getIcon(log.type)}</div>
            <span className={cn(
              "break-all",
              log.type === "git" && "text-blue-300",
              log.type === "security" && "text-red-300",
              log.type === "server" && "text-emerald-300"
            )}>
              {log.message}
            </span>
          </motion.div>
        ))}
        
        {/* Blinking Cursor */}
        <div className="flex items-center gap-2 text-primary mt-2">
          <span className="text-emerald-500">➜</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>

      {/* Background Noise/Scanline (Optional subtle touch) */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-10" />
    </div>
  );
}