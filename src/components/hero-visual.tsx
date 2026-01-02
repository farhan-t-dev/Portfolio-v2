"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Globe, Server, Shield, Smartphone, Zap, Cpu, Code, Box } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Layer = ({ icon: Icon, label, delay, yOffset, color }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    style={{ y: yOffset }}
    className="absolute left-1/2 -translate-x-1/2 w-full max-w-sm"
  >
    <div className="relative group cursor-pointer">
      {/* Glass Plate */}
      <div className="h-24 w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 group-hover:bg-primary/5 group-hover:border-primary/40 transform -skew-x-12 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-slate-950/50 border border-white/5 group-hover:border-primary/50 transition-colors`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Stack Layer</span>
            <span className="text-lg font-bold text-white group-hover:text-primary transition-colors">{label}</span>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => <div key={i} className="w-1 h-4 bg-white/5 rounded-full group-hover:bg-primary/20" />)}
        </div>
      </div>
      
      {/* Connector lines to next layer */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-gradient-to-b from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </motion.div>
);

export default function HeroVisual() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
      {/* Central Identity Hub */}
      <div className="relative z-20 w-32 h-32 rounded-3xl bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)] border-4 border-white/20">
        <Code className="w-16 h-16 text-slate-950" />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl bg-primary"
        />
      </div>

      {/* Floating Layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 w-full"><Layer icon={Globe} label="User Interface" delay={0.2} yOffset={y1} color="text-blue-400" /></div>
        <div className="absolute top-[140px] w-full"><Layer icon={Shield} label="Security/Auth" delay={0.4} yOffset={y2} color="text-purple-400" /></div>
        <div className="absolute top-[280px] w-full"><Layer icon={Server} label="System Logic" delay={0.6} yOffset={y3} color="text-emerald-400" /></div>
        <div className="absolute top-[420px] w-full"><Layer icon={Database} label="Data Persistence" delay={0.8} yOffset={y4} color="text-amber-400" /></div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)]" />
      </div>
    </div>
  );
}
