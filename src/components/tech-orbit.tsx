"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Server, Code2, Globe, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TechOrbit() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Central Node */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-slate-950 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
        <Terminal className="w-6 h-6 text-primary" />
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
      </div>

      {/* Orbit Rings - Resized to fit 180px card height better */}
      {/* Inner Ring: 120px */}
      <div className="absolute w-[120px] h-[120px] border border-white/5 rounded-full" />
      {/* Outer Ring: 200px (Fits comfortably with small margin or slight overflow on very small screens) */}
      <div className="absolute w-[200px] h-[200px] border border-white/5 rounded-full opacity-50" />

      {/* Orbiting Icons - Inner Ring (Radius 60) */}
      <OrbitIcon delay={0} duration={12} radius={60}>
        <Code2 className="w-4 h-4 text-blue-400" />
      </OrbitIcon>
      <OrbitIcon delay={4} duration={12} radius={60}>
        <Server className="w-4 h-4 text-emerald-400" />
      </OrbitIcon>
      <OrbitIcon delay={8} duration={12} radius={60}>
        <Database className="w-4 h-4 text-yellow-400" />
      </OrbitIcon>

      {/* Orbiting Icons - Outer Ring (Radius 100) - Reverse */}
      <OrbitIcon delay={0} duration={18} radius={100} reverse>
        <Globe className="w-4 h-4 text-purple-400" />
      </OrbitIcon>
      <OrbitIcon delay={6} duration={18} radius={100} reverse>
        <Cpu className="w-4 h-4 text-orange-400" />
      </OrbitIcon>
       <OrbitIcon delay={12} duration={18} radius={100} reverse>
        <Terminal className="w-4 h-4 text-slate-400" />
      </OrbitIcon>
    </div>
  );
}

function OrbitIcon({ children, delay, duration, radius, reverse = false }: any) {
  return (
    <motion.div
      className="absolute flex items-center justify-center"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay: -delay }}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg"
        animate={{ rotate: reverse ? 360 : -360 }} // Counter-rotate to keep icon upright
        transition={{ duration, repeat: Infinity, ease: "linear", delay: -delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
