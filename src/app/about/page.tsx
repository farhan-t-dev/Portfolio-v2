"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Award, Calendar, Terminal, User, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { certificates } from "@/lib/certificates";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-mono uppercase tracking-widest">Return to Base</span>
        </Link>

        {/* Hero Section with Portrait */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              The <span className="text-primary">Story.</span>
            </h1>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                My path wasn't linear. I didn't graduate from a CS degree into a FAANG job. I built my own curriculum, brick by brick, error by error.
              </p>
              <p>
                Starting with the Linux terminal and scaling up to distributed cloud architectures, I've cultivated a hybrid skillset that bridges the gap between <strong>System Administration</strong> and <strong>Full Stack Engineering</strong>.
              </p>
            </div>
          </div>
          
          {/* Portrait Slot */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-slate-900 group">
            {/* Placeholder for User's Portrait */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-slate-700">
               <User className="w-24 h-24 opacity-20" />
               <span className="absolute bottom-8 text-xs font-mono uppercase tracking-widest opacity-40">Portrait_Placeholder.jpg</span>
            </div>
            {/* You can uncomment this Image component once you have the file
            <Image 
              src="/farhan-portrait.jpg" 
              alt="Farhan" 
              fill 
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
            />
            */}
            <div className="absolute inset-0 border-[1px] border-white/10 m-2 rounded-[1.3rem] pointer-events-none" />
          </div>
        </div>

        {/* Timeline / Journey */}
        <div className="mb-32 max-w-3xl">
          <div className="flex items-center gap-4 mb-12">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Timeline Log</h2>
          </div>
          
          <div className="space-y-12 border-l border-white/10 ml-3 pl-8 relative">
            {/* Timeline Item 1 */}
            <div className="relative">
              <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-slate-950 border border-primary text-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-mono text-primary mb-2 block">2026 - Present</span>
              <h3 className="text-xl font-bold text-white mb-2">Senior Full Stack Architect</h3>
              <p className="text-slate-400">
                Specializing in high-performance Next.js applications and cloud infrastructure. Building scalable systems for global clients.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
              <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-slate-950 border border-white/20 text-slate-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              </span>
              <span className="text-xs font-mono text-slate-500 mb-2 block">2024 - 2025</span>
              <h3 className="text-xl font-bold text-white mb-2">The Deep Dive</h3>
              <p className="text-slate-400">
                Intensive self-study period. Mastered React, Node.js, and Docker. Completed multiple FreeCodeCamp certifications and deployed 20+ projects.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative">
              <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-slate-950 border border-white/20 text-slate-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              </span>
              <span className="text-xs font-mono text-slate-500 mb-2 block">2023</span>
              <h3 className="text-xl font-bold text-white mb-2">System Administration Roots</h3>
              <p className="text-slate-400">
                Started with Linux. Configured home labs, managed VPS instances, and learned the fundamentals of networking and security.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Credentials</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center text-slate-400 border border-white/10">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-500">{cert.date}</span>
                </div>
                
                <h3 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{cert.issuer}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <a 
                  href={cert.link} 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-primary transition-colors"
                >
                  Verify Credential <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
