"use client";

import { motion } from "framer-motion";
import { Database, Globe, Server, Shield, Smartphone, Zap, Activity, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

const Packet = ({ path, delay, color = "#38bdf8", duration = 3 }: { path: string, delay: number, color?: string, duration?: number }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 rounded-full z-20"
    style={{ 
      backgroundColor: color,
      boxShadow: `0 0 12px ${color}`,
      offsetPath: `path("${path}")` 
    }}
    initial={{ offsetDistance: "0%", opacity: 0 }}
    animate={{ 
      offsetDistance: "100%", 
      opacity: [0, 1, 1, 0] 
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "linear",
      delay: delay,
    }}
  />
);

const Node = ({ icon: Icon, label, x, y, active = true }: { icon: any, label: string, x: number, y: number, active?: boolean }) => (
  <div 
    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
    style={{ left: x, top: y }}
  >
    <motion.div
      animate={active ? { 
        boxShadow: ["0 0 0px rgba(56,189,248,0)", "0 0 20px rgba(56,189,248,0.2)", "0 0 0px rgba(56,189,248,0)"]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      className={`
        w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500
        ${active ? "bg-slate-900 border-primary/40 text-primary shadow-lg" : "bg-slate-950 border-white/5 text-slate-600"}
      `}
    >
      <Icon className="w-8 h-8" />
      {active && (
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl border border-primary/30" 
        />
      )}
    </motion.div>
    <div className="flex flex-col items-center">
      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-900/80 px-2 py-0.5 rounded border border-white/5">
        {label}
      </span>
    </div>
  </div>
);

export default function ServerArchitecture() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Paths
  const clientToLB = "M 60 100 L 200 100";
  const lbToApp = "M 200 100 L 200 220";
  const appToDB = "M 200 220 L 60 220";
  const appToAuth = "M 200 220 L 340 220";
  
  return (
    <div className="relative w-full max-w-lg mx-auto h-[400px] bg-slate-950/20 rounded-3xl border border-white/5 overflow-hidden">
      {/* Circuit background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <g className="stroke-slate-800/50 fill-none" strokeWidth="2" strokeDasharray="4 4">
          <path d={clientToLB} />
          <path d={lbToApp} />
          <path d={appToDB} />
          <path d={appToAuth} />
        </g>
        
        {/* Active Flow */}
        <Packet path={clientToLB} delay={0} />
        <Packet path={clientToLB} delay={1.5} />
        
        <Packet path={lbToApp} delay={0.5} />
        <Packet path={lbToApp} delay={2} />
        
        <Packet path={appToDB} delay={1.2} color="#10b981" />
        <Packet path={appToDB} delay={2.7} color="#10b981" />

        <Packet path={appToAuth} delay={1.5} color="#8b5cf6" />
      </svg>

      {/* Nodes */}
      <Node icon={Globe} label="User" x={60} y={100} />
      <Node icon={Shield} label="WAF/LB" x={200} y={100} />
      <Node icon={Server} label="App Core" x={200} y={220} />
      <Node icon={Database} label="Postgres" x={60} y={220} />
      <Node icon={Cpu} label="Auth_Auth" x={340} y={220} />

      {/* Stats Overlay */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <div className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-3">
          <Activity className="w-3 h-3 text-emerald-500" />
          <div className="flex flex-col">
            <span className="text-[7px] font-mono text-slate-500 uppercase">Throughput</span>
            <span className="text-[10px] font-mono text-white font-bold">1.2k req/s</span>
          </div>
        </div>
        <div className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-3">
          <Zap className="w-3 h-3 text-yellow-500" />
          <div className="flex flex-col">
            <span className="text-[7px] font-mono text-slate-500 uppercase">Avg_Latency</span>
            <span className="text-[10px] font-mono text-white font-bold">42ms</span>
          </div>
        </div>
      </div>

      {/* Terminal Pulse */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[8px] font-mono text-emerald-500 font-bold uppercase tracking-widest">System_Live</span>
        </div>
      </div>
    </div>
  );
}
