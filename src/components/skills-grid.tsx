"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Atom, Layers, FileCode, Wind, Move, Database, Box, Layout, 
  Server, TrainFront, Leaf, Hexagon, Triangle, Zap, 
  Container, GitBranch, Cloud, UploadCloud, Figma, PenTool, 
  Terminal, Ship, Globe, Hammer, Activity, FileJson, GitMerge,
  Code2, Monitor, Wrench
} from "lucide-react";
import { skills } from "@/lib/skills";
import { cn } from "@/lib/utils";

// Icon mapping...
const iconMap: Record<string, any> = {
  "React": Atom,
  "Next.js": Layers,
  "TypeScript": FileCode,
  "Tailwind CSS": Wind,
  "Framer Motion": Move,
  "Redux / Zustand": Database,
  "Three.js": Box,
  "HTML5 / Semantic": Layout,
  "Node.js": Server,
  "Express.js": TrainFront,
  "PostgreSQL": Database,
  "MongoDB": Leaf,
  "GraphQL": Hexagon,
  "Prisma ORM": Triangle,
  "Supabase": Zap,
  "Python / Django": FileJson,
  "Docker": Container,
  "Kubernetes": Ship,
  "Linux / Bash": Terminal,
  "Nginx / Apache": Globe,
  "AWS (EC2/S3/Lambda)": Cloud,
  "CI/CD (Github Actions)": GitMerge,
  "Terraform": Hammer,
  "Grafana / Prometheus": Activity,
  "Git / GitHub": GitBranch,
  "Figma": Figma,
  "UI/UX Principles": PenTool
};

const categories = [
  { id: "Frontend", label: "Frontend", icon: Monitor },
  { id: "Backend", label: "Backend", icon: Server },
  { id: "DevOps", label: "DevOps", icon: Terminal },
  { id: "Tools", label: "Tools", icon: Wrench },
];

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Category Sidebar */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:w-64 pb-2 md:pb-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all min-w-[140px] md:min-w-0 border",
              activeCategory === cat.id
                ? "bg-primary/10 border-primary/50 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                : "bg-white/5 border-transparent text-white/50 hover:bg-white/10 hover:text-white"
            )}
          >
            <cat.icon className={cn("w-4 h-4", activeCategory === cat.id ? "text-primary" : "")} />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Content Area */}
      <div className="flex-1 min-h-[400px]">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const Icon = iconMap[skill.name] || Code2;
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-4 rounded-xl flex items-center gap-4 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-xs text-white/30 font-mono">{skill.level}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}