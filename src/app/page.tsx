"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Network, ShieldCheck, Layers, Code, User, MapPin, Clock, Lock, Loader2 } from "lucide-react";
import BentoHero from "@/components/bento-hero";
// import { TrueRadialHive } from "@/components/skill-hive"; // Replaced with dynamic
import ContactForm from "@/components/contact-form";
import Testimonials from "@/components/testimonials";
import Guestbook from "@/components/guestbook";
import SpotlightGrid from "@/components/spotlight-grid";
import KonamiCode from "@/components/konami-code";
import ProjectCard from "@/components/project-card";
import ProjectModal from "@/components/project-modal";
import { projects, Project } from "@/lib/projects";
import GlitchText from "@/components/ui/glitch-text";

const TrueRadialHive = dynamic(() => import("@/components/skill-hive").then(mod => mod.TrueRadialHive), {
  loading: () => (
    <div className="flex items-center justify-center w-full h-[400px] text-muted-foreground">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ),
  ssr: false 
});

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30">
      <KonamiCode />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      {/* 
        SUBTLE TEXTURE OVERLAY - OPTIMIZED (No mix-blend-overlay)
      */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* 
        BENTO HERO 
      */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />
        
        <BentoHero />
      </section>

      {/* 
        ABOUT / IDENTITY - REFINED SINGLE CARD
      */}
      <section id="about" className="py-32 px-6">
        <div className="container mx-auto">
          <div className="relative rounded-[3rem] bg-card/30 border border-border backdrop-blur-xl overflow-hidden p-8 md:p-12 lg:p-16 shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
             
             <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                   <div className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-wide uppercase">
                      <User className="w-4 h-4" />
                      <span>About Me</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                     Bridging <span className="text-muted-foreground">Systems</span> & <br/>
                     <span className="text-foreground">User Experience.</span>
                   </h2>
                   <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                      <p>
                        I don&apos;t just write code; I architect solutions. Being self-taught means I learned by breaking things and fixing them—giving me a deep, practical understanding of the entire stack.
                      </p>
                      <p>
                        My philosophy is simple: <strong>Build robust, scale effortlessly, and design beautifully.</strong>
                      </p>
                   </div>
                   <Link 
                     href="/about" 
                     className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-bold rounded-full hover:opacity-90 transition-opacity"
                   >
                     Read Full Journey <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>

                <Link href="/about" className="relative group block">
                   <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-muted/20 border border-border">
                      {/* Portrait Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/10 group-hover:scale-105 transition-transform duration-700">
                         <User className="w-20 h-20 text-muted-foreground" />
                      </div>
                      
                      {/* Overlay Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 to-transparent">
                         <div className="flex justify-between items-end">
                            <div>
                               <h3 className="text-2xl font-bold text-foreground">Farhan</h3>
                               <p className="text-primary font-medium">Full Stack & SysAdmin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background group-hover:rotate-45 transition-transform duration-500">
                               <ArrowRight className="w-5 h-5" />
                            </div>
                         </div>
                      </div>
                   </div>
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 
        SKILLS 
      */}
      <section id="skills" className="py-40 bg-muted/30 backdrop-blur-sm border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Description */}
            <div className="space-y-8 text-left">
              <div className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-wide uppercase">
                <Layers className="w-4 h-4" />
                <span>Capabilities</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Expertise & <br />
                <span className="text-muted-foreground">Tooling.</span>
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                A comprehensive toolset developed through years of production-level engineering. 
                Focused on scalability, performance, and modern user experiences.
              </p>
              
              <div className="space-y-6 pt-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-foreground shrink-0 shadow-sm">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Full Stack Integration</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Seamless data flow from database to frontend with strict typing and security.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-foreground shrink-0 shadow-sm">
                    <Network className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">Cloud Architecture</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Scalable deployments using AWS, Docker, and modern CI/CD pipelines.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Hive (Visual) */}
            <div className="relative flex justify-center lg:justify-end w-full">
              <TrueRadialHive rings={2} />
            </div>
          </div>
        </div>
      </section>

      {/* 
        PROJECTS 
      */}
      <section id="projects" className="py-40 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-primary font-medium text-sm tracking-wide uppercase">
                <Code className="w-4 h-4" />
                <span>Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Featured <span className="text-muted-foreground">Work.</span>
              </h2>
            </div>
            <Link href="/projects" className="group inline-flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors">
              View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 
        SYSTEM ARCHITECTURE 
      */}
      <section id="bug-log" className="py-40 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24 space-y-6">
            <h2 className="text-5xl font-bold tracking-tight text-foreground">Infrastructure</h2>
            <p className="text-muted-foreground font-medium text-xl leading-relaxed border-l-4 border-primary/20 pl-8">
              "Performance metrics and architectural standards that define my deployment strategy."
            </p>
          </div>
          <SpotlightGrid />
        </div>
      </section>

      {/* 
        TESTIMONIALS 
      */}
      <section id="testimonials" className="py-40 px-6">
        <div className="container mx-auto">
          <div className="mb-24 space-y-4 text-center">
            <h2 className="text-5xl font-bold tracking-tight text-foreground">Collaborator Feedback</h2>
            <p className="text-muted-foreground">Trusted by founders and technical leads worldwide.</p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* 
        GUESTBOOK 
      */}
      <section id="guestbook" className="py-40 px-6 bg-muted/30 border-t border-border">
        <div className="container mx-auto grid lg:grid-cols-2 gap-24 items-start">
           <div className="space-y-8 sticky top-32">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.9]">
                Sign the <br /> <span className="text-emerald-500">Guestbook.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Leave your mark. A permanent record of visitors, friends, and collaborators.
              </p>
              <div className="flex gap-4">
                 <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium">
                    System Online
                 </div>
                 <div className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground text-xs font-medium">
                    Public Ledger
                 </div>
              </div>
           </div>
           
           <Guestbook />
        </div>
      </section>

      {/* 
        CONTACT 
      */}
      <section id="contact" className="py-40 bg-gradient-to-b from-transparent to-muted/20 px-6">
        <div className="container mx-auto text-center space-y-20">
          <div className="space-y-8">
            <h2 className="text-7xl md:text-[9rem] font-bold tracking-tight leading-[0.8]">
              LET'S <br /> <span className="text-primary italic">TALK.</span>
            </h2>
            <p className="text-muted-foreground text-2xl font-medium max-w-xl mx-auto">
              Ready to build the next standard of digital excellence?
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto p-12 md:p-16 rounded-[3rem] border border-border bg-card/50 backdrop-blur-3xl shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 
        FOOTER
      */}
      <footer className="py-12 border-t border-border px-6 bg-muted/20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-medium text-muted-foreground">
          <div>© 2026 Farhan Engineering. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
