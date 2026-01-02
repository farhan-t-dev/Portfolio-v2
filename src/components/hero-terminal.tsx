"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Wifi, Command, Activity, Server, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Log {
  text: string;
  type: "info" | "success" | "warning" | "error" | "system";
}

export default function HeroTerminal() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cleaner, faster startup sequence
    setTimeout(() => addLog("System Kernel... [OK]", "system"), 500);
    setTimeout(() => addLog("Loading User Profile... [Farhan]", "info"), 1200);
    setTimeout(() => addLog("Establishing Secure Connection...", "warning"), 2000);
    setTimeout(() => addLog("Access Granted. Welcome.", "success"), 2800);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, type: Log["type"] = "info") => {
    setLogs(prev => [...prev, { text, type }]);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    addLog(`$ ${input}`, "info");
    setInput("");

    switch (cmd) {
      case "help":
        addLog("Available commands: status, whoami, projects, contact, clear", "system");
        break;
      case "status":
        addLog("Analyzing System Integrity...", "warning");
        try {
          const res = await fetch('/api/status');
          const data = await res.json();
          addLog(`✔ System Online | Uptime: ${data.uptime}`, "success");
        } catch (err) {
          addLog("❌ Connection Failed", "error");
        }
        break;
      case "clear":
        setLogs([]);
        break;
      case "whoami":
        addLog("Farhan | Full Stack Engineer & SysAdmin", "success");
        break;
      case "contact":
        window.location.href = "#contact";
        addLog("Opening Communication Channel...", "system");
        break;
      case "projects":
        window.location.href = "/projects";
        addLog("Loading Project Archive...", "system");
        break;
      default:
        addLog(`Command '${cmd}' not recognized. Type 'help'.`, "error");
    }
  };

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="glass-panel rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        {/* macOS Style Title Bar */}
        <div className="bg-slate-900/50 px-4 py-3 flex items-center justify-between border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/30">
            <TerminalIcon className="w-3 h-3" />
            <span>farhan — -zsh</span>
          </div>
          <div className="w-12" /> {/* Spacer for centering */}
        </div>

        {/* Terminal Status Bar (Fake Top/Htop Style) */}
        <div className="bg-slate-900/30 px-4 py-2 border-b border-white/5 flex justify-between text-[10px] font-mono text-white/40">
           <div className="flex gap-4">
             <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU: 12%</span>
             <span className="flex items-center gap-1"><Server className="w-3 h-3" /> MEM: 240MB</span>
           </div>
           <div className="flex items-center gap-1 text-emerald-400">
             <Wifi className="w-3 h-3" /> CONNECTED
           </div>
        </div>

        {/* Terminal Body */}
        <div className="h-64 p-4 font-mono text-sm overflow-y-auto" ref={scrollRef}>
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div key={i} className={cn(
                "break-words tracking-wide",
                log.type === "error" ? "text-red-400" :
                log.type === "success" ? "text-emerald-400" :
                log.type === "warning" ? "text-yellow-400" :
                log.type === "system" ? "text-primary" :
                "text-slate-300"
              )}>
                {log.text}
              </div>
            ))}
          </div>
        </div>

        {/* Input Line */}
        <form onSubmit={handleCommand} className="flex items-center bg-slate-900/50 p-3 border-t border-white/5">
          <span className="text-emerald-500 mr-2 font-bold">➜</span>
          <span className="text-blue-400 mr-2">~</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white font-mono placeholder-white/20"
            placeholder="Type 'help'..."
            autoComplete="off"
            autoFocus
          />
        </form>
      </div>
    </motion.div>
  );
}

// Minimal icon component to avoid import error if lucide-react doesn't export Cpu straight away (it does, but safety first)
function Cpu({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
  )
}