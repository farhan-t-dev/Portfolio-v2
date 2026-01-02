"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Award, Calendar, Terminal, User, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { certificates } from "@/lib/certificates";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 pt-32 pb-20 transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Return to Base</span>
        </Link>

        {/* Hero Section with Portrait */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              The <span className="text-primary">Story.</span>
            </h1>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                My path wasn't linear. I didn't graduate from a CS degree into a FAANG job. I built my own curriculum, brick by brick, error by error.
              </p>
              <p>
                Starting with the Linux terminal and scaling up to distributed cloud architectures, I've cultivated a hybrid skillset that bridges the gap between <strong>System Administration</strong> and <strong>Full Stack Engineering</strong>.
              </p>
            </div>
          </div>
          
          {/* Portrait Slot */}
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border bg-muted/20 group shadow-2xl">
            {/* Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
               <User className="w-24 h-24 opacity-10" />
            </div>
            
            <div className="absolute inset-0 border-[1px] border-border m-3 rounded-[2rem] pointer-events-none" />
          </div>
        </div>

        {/* Timeline / Journey */}
        <div className="mb-32 max-w-3xl">
          <div className="flex items-center gap-4 mb-12">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Timeline Log</h2>
          </div>
          
          <div className="space-y-12 border-l border-border ml-3 pl-8 relative">
            <div className="relative">
              <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-background border border-primary text-primary flex items-center justify-center shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] font-bold text-primary mb-2 block uppercase tracking-widest">2026 - Present</span>
              <h3 className="text-xl font-bold text-foreground mb-2">Senior Full Stack Architect</h3>
              <p className="text-muted-foreground">
                Specializing in high-performance Next.js applications and cloud infrastructure. Building scalable systems for global clients.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-background border border-border text-muted-foreground flex items-center justify-center shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              </span>
              <span className="text-[10px] font-bold text-muted-foreground mb-2 block uppercase tracking-widest">2024 - 2025</span>
              <h3 className="text-xl font-bold text-foreground mb-2">The Deep Dive</h3>
              <p className="text-muted-foreground">
                Intensive self-study period. Mastered React, Node.js, and Docker. Completed multiple certifications and deployed 20+ projects.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-background border border-border text-muted-foreground flex items-center justify-center shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              </span>
              <span className="text-[10px] font-bold text-muted-foreground mb-2 block uppercase tracking-widest">2023</span>
              <h3 className="text-xl font-bold text-foreground mb-2">System Administration Roots</h3>
              <p className="text-muted-foreground">
                Started with Linux. Configured home labs, managed VPS instances, and learned the fundamentals of networking and security.
              </p>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Credentials</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="group p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all hover:-translate-y-1 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground shadow-inner">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{cert.date}</span>
                </div>
                
                <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{cert.issuer}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {cert.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded bg-muted text-muted-foreground border border-border">
                      {tag}
                    </span>
                  ))}
                </div>

                <a 
                  href={cert.link} 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-foreground hover:text-primary transition-colors"
                >
                  Verify <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
