"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Github, Linkedin, ArrowUpRight, 
  MapPin, Zap, Code2, Command, Cpu, User, Terminal, Activity
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TechOrbit from "./tech-orbit";
import TypewriterText from "@/components/ui/typewriter-text";

// --- Sub-components ---

const BentoCard = ({ children, className, delay = 0, onClick }: any) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Reduced stiffness/damping for better performance
  const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width);
    y.set((clientY - top) / height);
  }

  function onMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  const rotateX = useTransform(mouseY, [0, 1], [1.5, -1.5]); // Subtle rotation
  const rotateY = useTransform(mouseX, [0, 1], [-1.5, 1.5]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-1 group cursor-default shadow-xl transition-colors duration-500",
        onClick && "cursor-pointer hover:border-white/10",
        className
      )}
    >
      <div className="relative z-10 h-full w-full rounded-[2.3rem] overflow-hidden p-6 md:p-8 flex flex-col will-change-transform">
        {children}
      </div>
      
      {/* Optimized Background Spotlight Glow */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([cx, cy]) => `radial-gradient(400px circle at ${Number(cx) * 100}% ${Number(cy) * 100}%, var(--primary-hover-glow), transparent 60%)`
          )
        }}
      />
    </motion.div>
  );
};

export default function BentoHero() {

  const [time, setTime] = useState("");



  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {

        timeZone: 'Asia/Karachi',

        hour: '2-digit',

        minute: '2-digit',

        second: '2-digit',

        hour12: true

      };

      setTime(new Intl.DateTimeFormat('en-US', options).format(now));

    }, 1000);

    return () => clearInterval(timer);

  }, []);



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

                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Full Stack Engineer</span>

              </div>

              

              <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.8] text-foreground font-oswald">

                Architecting <br />

                <span className="font-bold text-primary">

                  <TypewriterText 

                    texts={["resilience.", "excellence.", "interfaces.", "solutions."]}

                    speed={100} 

                    pause={2500} 

                  />

                </span>

              </h1>

              

              <p className="text-muted-foreground max-w-sm text-lg font-medium leading-relaxed mt-4">

                Specialized in building high-performance applications and robust cloud infrastructure.

              </p>

            </div>



            <div className="flex flex-wrap gap-4 mt-12">

              <Link href="/projects" className="px-10 py-5 bg-foreground text-background font-bold uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl">

                View Work <ArrowUpRight className="w-3.5 h-3.5" />

              </Link>

              <div className="flex gap-2">

                {[Github, Linkedin].map((Icon, i) => (

                  <a key={i} href="#" className="w-14 h-14 rounded-full bg-muted/30 border border-border text-foreground hover:bg-muted/50 hover:text-primary transition-all flex items-center justify-center">

                    <Icon className="w-5 h-5" />

                  </a>

                ))}

              </div>

            </div>

          </div>

        </BentoCard>



        {/* 2. TECH STACK (2x1) */}

        <BentoCard className="md:col-span-2 md:row-span-1" delay={0.1} onClick={scrollToSkills}>

          <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-40 group-hover:opacity-100 transition-opacity duration-700">

             <TechOrbit />

          </div>

          <div className="relative z-20 pointer-events-none flex justify-between items-start h-full">

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />

              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Tech Stack</span>

            </div>

            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />

          </div>

        </BentoCard>



        {/* 3. STATUS (1x1) */}

        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between" delay={0.2}>

          <div className="flex justify-between items-start">

            <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />

            <div className="flex flex-col items-end">

               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />

            </div>

          </div>

          <div>

            <div className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-widest">Availability</div>

            <div className="text-2xl font-bold text-foreground tracking-tighter uppercase">Available</div>

            <div className="text-[9px] font-bold text-emerald-500/80 mt-1 uppercase tracking-tighter">Response: &lt; 24h</div>

          </div>

        </BentoCard>



        {/* 4. WORLD CLOCK (1x1) */}

        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between" delay={0.3}>

          <div className="flex justify-between items-start">

            <MapPin className="w-5 h-5 text-primary" />

            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">GMT+5</span>

          </div>

          <div className="space-y-1">

            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Local Time</div>

            <div className="text-2xl font-bold text-foreground tracking-tighter tabular-nums">

              {time || "00:00:00 AM"}

            </div>

            <div className="text-[9px] font-bold text-primary uppercase tracking-tighter">Karachi, PK</div>

          </div>

        </BentoCard>



        {/* 5. EFFICIENCY (1x1) */}

        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between group" delay={0.4}>

          <div className="flex items-center gap-2 text-primary">

            <Activity className="w-4 h-4" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Efficiency</span>

          </div>

          <div className="space-y-3">

             <div className="h-1 w-full bg-muted rounded-full overflow-hidden">

                <motion.div 

                  initial={{ width: 0 }}

                  whileInView={{ width: "94%" }}

                  className="h-full bg-primary" 

                />

             </div>

             <div className="flex justify-between text-[10px] font-bold text-muted-foreground">

                <span>OPTIMIZED</span>

                <span>94%</span>

             </div>

          </div>

          <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-tighter">Performance Load</div>

        </BentoCard>



        {/* 6. ARCHITECTURE (1x1) */}

        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col justify-between" delay={0.5}>

          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">

             <Cpu className="w-4 h-4 text-primary" />

          </div>

          <div>

            <div className="text-xl font-bold text-foreground tracking-tighter leading-tight uppercase">

              Fullstack <br/> Architecture

            </div>

            <div className="text-[9px] font-bold text-muted-foreground mt-2 uppercase tracking-[0.2em]">Engineering Focus</div>

          </div>

        </BentoCard>





      </div>
    </div>
  );
}