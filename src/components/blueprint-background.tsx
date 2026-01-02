"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";

export default function BlueprintBackground() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Local state to display coordinates since MotionValue can't be rendered directly
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Smooth springs for the blueprint lines
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useMotionValueEvent(mouseX, "change", (latest) => {
    setCoords(prev => ({ ...prev, x: Math.round(latest) }));
  });

  useMotionValueEvent(mouseY, "change", (latest) => {
    setCoords(prev => ({ ...prev, y: Math.round(latest) }));
  });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-[#020617] pointer-events-none">
      {/* 1. The Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.1]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e293b 1px, transparent 1px),
            linear-gradient(to bottom, #1e293b 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #334155 1px, transparent 1px),
            linear-gradient(to bottom, #334155 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px'
        }}
      />

      {/* 2. Mesh Gradients (Organic Fluidity) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      {/* 3. Blueprint Follower Lines */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[1px] bg-primary/20"
        style={{ left: springX }}
      />
      <motion.div 
        className="absolute left-0 right-0 h-[1px] bg-primary/20"
        style={{ top: springY }}
      />

      {/* 4. Mouse Coordinates */}
      <motion.div 
        className="absolute text-[8px] font-mono text-primary/40 flex flex-col pointer-events-none"
        style={{ left: springX, top: springY, x: 10, y: 10 }}
      >
        <span>X: {coords.x}</span>
        <span>Y: {coords.y}</span>
      </motion.div>

      {/* 5. Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}