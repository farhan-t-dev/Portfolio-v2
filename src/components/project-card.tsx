"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onClick={() => onClick(project)}
      className="group relative rounded-3xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-primary/30 transition-all duration-500 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10 opacity-60" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-2 rounded-full bg-white text-black">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
             <span className="text-[10px] font-medium uppercase tracking-wider text-primary">
               {project.category}
             </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5 group-hover:border-white/10 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}