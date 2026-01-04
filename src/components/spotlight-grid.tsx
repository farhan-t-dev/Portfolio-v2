"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Server, Shield, Zap, Globe, Cpu, Activity } from "lucide-react";

export default function SpotlightGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mx-auto">
      <SpotlightCard 
        icon={<Server className="w-6 h-6 text-emerald-500" />}
        title="Infrastructure"
        value="Hybrid Cloud"
        label="Orchestration"
      />
      <SpotlightCard 
        icon={<Activity className="w-6 h-6 text-blue-500" />}
        title="Uptime"
        value="99.99%"
        label="System Health"
      />
      <SpotlightCard 
        icon={<Zap className="w-6 h-6 text-yellow-500" />}
        title="Latency"
        value="< 24ms"
        label="Global Edge"
      />
      <SpotlightCard 
        icon={<Shield className="w-6 h-6 text-purple-500" />}
        title="Security"
        value="Hardened"
        label="Zero Trust"
      />
      <SpotlightCard 
        icon={<Globe className="w-6 h-6 text-pink-500" />}
        title="CDN"
        value="Distributed"
        label="Content Delivery"
      />
      <SpotlightCard 
        icon={<Cpu className="w-6 h-6 text-orange-500" />}
        title="Compute"
        value="Serverless"
        label="Scalability"
      />
    </div>
  );
}

function SpotlightCard({ icon, title, value, label }: { icon: any, title: string, value: string, label: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative border border-border bg-card/40 overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:border-primary/20 shadow-sm will-change-transform"
    >
      {/* Background spotlight effect that adapts to theme */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              var(--primary-hover-glow),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 p-3 w-fit rounded-xl bg-muted border border-border group-hover:border-primary/20 transition-colors">
          {icon}
        </div>
        <div className="mt-auto">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{label}</h4>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-bold text-foreground tracking-tight">{title}</h3>
            <span className="text-sm font-mono text-primary font-black">{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}