"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Github, Linkedin, ArrowUpRight, 
  MapPin, Zap, Code2, Command, Cpu, User, Terminal
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TechOrbit from "./tech-orbit";
import TypewriterText from "@/components/ui/typewriter-text";

// --- Sub-components ---

const BentoCard = ({ children, className, delay = 0, onClick }: any) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width);
    y.set((clientY - top) / height);
  }

  function onMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  const rotateX = useTransform(mouseY, [0, 1], [2, -2]);
  const rotateY = useTransform(mouseX, [0, 1], [-2, 2]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative overflow-hidden rounded-[3rem] border border-border bg-card p-1 backdrop-blur-sm group cursor-default shadow-2xl transition-colors duration-500",
        onClick && "cursor-pointer hover:border-primary/30",
        className
      )}
    >
      <div className="relative z-10 h-full w-full rounded-[2.8rem] overflow-hidden p-6 md:p-8">
        {children}
      </div>
      
      {/* Background Spotlight Glow */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([cx, cy]) => `radial-gradient(600px circle at ${Number(cx) * 100}% ${Number(cy) * 100}%, var(--primary), transparent 40%)`
          )
        }}
      />
    </motion.div>
  );
};

export default function BentoHero() {
  const scrollToSkills = () => {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 auto-rows-[180px]">
        
        {/* 1. HERO IDENTITY (2x2) */}
        <BentoCard className="md:col-span-2 md:row-span-2">
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Full Stack Developer</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] text-foreground">
                Building <br />
                <span className="text-muted-foreground text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
                  <TypewriterText 
                    texts={["Experiences.", "Systems.", "Solutions.", "Resilience."]} 
                    speed={120} 
                    pause={2000} 
                  />
                </span>
              </h1>
              
              <p className="text-muted-foreground max-w-sm text-lg font-medium leading-relaxed">
                Self-taught developer with deep roots in system administration. Architecting resilient web solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/projects" className="px-8 py-4 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-2xl">
                View Work <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="flex gap-2">
                {[Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="p-4 rounded-full bg-muted/20 border border-border text-foreground hover:bg-muted/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </BentoCard>

        {/* 2. TECH ORBIT CARD (2x1) */}
        <BentoCard className="md:col-span-2 md:row-span-1" delay={0.1} onClick={scrollToSkills}>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
             <TechOrbit />
          </div>
          <div className="relative z-20 pointer-events-none flex justify-between items-start h-full">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary uppercase tracking-widest">Core Stack</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </BentoCard>

        {/* 3. AVAILABILITY (1x1) */}
        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between" delay={0.2}>
          <div className="flex justify-between items-start">
            <Zap className="w-6 h-6 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground tracking-tight">Available</div>
            <div className="text-xs font-medium text-muted-foreground mt-1">Open for projects</div>
          </div>
        </BentoCard>

        {/* 4. LOCATION (1x1) */}
        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between text-center" delay={0.3}>
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-foreground">Remote</div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Global</div>
          </div>
        </BentoCard>

        {/* 5. RECENT COMMIT (1x1) */}
        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between group cursor-pointer" delay={0.4}>
          <div className="flex items-center gap-2 text-primary">
            <Code2 className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">Activity</span>
          </div>
          <div className="text-xs text-muted-foreground font-medium leading-relaxed">
            Refactoring system architecture for scalability...
          </div>
          <div className="text-[10px] text-slate-500 font-mono">2h ago</div>
        </BentoCard>

        {/* 6. PROOF/STATS (1x1) */}
        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between" delay={0.5}>
          <div className="text-3xl font-bold text-foreground tracking-tighter leading-none">SysAdmin <br/> & Dev</div>
          <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest font-bold">Hybrid Skillset</div>
        </BentoCard>

      </div>
    </div>
  );
}