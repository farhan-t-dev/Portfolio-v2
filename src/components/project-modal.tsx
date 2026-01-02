"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Cpu, Network, Calendar, Tag } from "lucide-react";
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#0f172a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl pointer-events-auto flex flex-col md:flex-row relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-slate-900">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-primary" /> Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.technical_details && (
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Network className="w-4 h-4 text-primary" /> Key Features
                      </h3>
                      <ul className="space-y-2">
                        {project.technical_details.map((detail, i) => (
                          <li key={i} className="text-xs text-slate-400 flex gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
                  <Link 
                    href={project.link} 
                    target="_blank"
                    className="flex-1 bg-white text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                  >
                    View Live <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link 
                    href={project.link} 
                    target="_blank"
                    className="flex-1 bg-white/5 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    Source Code <Github className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
