"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Cpu, Network } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { useEffect } from "react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative z-10 bg-card/80 backdrop-blur-2xl border border-white/10 w-full max-w-5xl max-h-[85vh] overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-background/50 text-foreground hover:bg-primary hover:text-white transition-all border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Side - Fixed aspect for consistency */}
            <div className="w-full md:w-[55%] h-64 md:h-auto relative bg-muted/10 overflow-hidden">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-[45%] p-10 md:p-16 flex flex-col overflow-y-auto">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20">
                    {project.category}
                  </span>
                  <div className="h-[1px] flex-1 bg-border" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight leading-none">{project.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              <div className="space-y-10 flex-1">
                <div>
                  <h3 className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] mb-4 flex items-center gap-2 opacity-60">
                    <Cpu className="w-3.5 h-3.5 text-primary" /> Infrastructure
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-muted border border-border text-muted-foreground hover:border-primary/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {project.technical_details && (
                  <div>
                    <h3 className="text-[10px] font-bold text-foreground uppercase tracking-[0.3em] mb-4 flex items-center gap-2 opacity-60">
                      <Network className="w-3.5 h-3.5 text-primary" /> Technical Specs
                    </h3>
                    <ul className="grid gap-3">
                      {project.technical_details.map((detail, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-3 items-start bg-muted/30 p-3 rounded-xl border border-border/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="font-medium leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-border flex gap-4">
                <Link 
                  href={project.link} 
                  target="_blank"
                  className="flex-[2] bg-foreground text-background font-bold uppercase tracking-widest text-[10px] py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl"
                >
                  Launch App <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link 
                  href={project.link} 
                  target="_blank"
                  className="flex-1 bg-muted border border-border text-foreground font-bold uppercase tracking-widest text-[10px] py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-background transition-all"
                >
                  Code <Github className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

