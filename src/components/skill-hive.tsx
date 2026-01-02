"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Atom, Layers, FileCode, Wind, Move, Database, Box, Layout, 
  Server, TrainFront, Leaf, Hexagon, Triangle, Zap, 
  Container, GitBranch, Cloud, Figma, PenTool, 
  Terminal, Globe, Hammer, Activity, FileJson, GitMerge,
  Code2
} from "lucide-react";
import { skills, Skill } from "@/lib/skills";
import { cn } from "@/lib/utils";
import { useState, useMemo, useEffect, memo, useCallback } from "react";

const iconMap: Record<string, any> = {
  "React": Atom, "Next.js": Layers, "TypeScript": FileCode, "Tailwind CSS": Wind,
  "Framer Motion": Move, "Redux / Zustand": Database, "Three.js": Box,
  "HTML5 / Semantic": Layout, "Node.js": Server, "Express.js": TrainFront,
  "PostgreSQL": Database, "MongoDB": Leaf, "GraphQL": Hexagon, "Prisma ORM": Triangle,
  "Supabase": Zap, "Python / Django": FileJson, "Docker": Container,
  "Kubernetes": Container, "Linux / Bash": Terminal, "Nginx / Apache": Globe,
  "AWS (EC2/S3/Lambda)": Cloud, "CI/CD (Github Actions)": GitMerge,
  "Terraform": Hammer, "Grafana / Prometheus": Activity, "Git / GitHub": GitBranch,
  "Figma": Figma, "UI/UX Principles": PenTool
};

const categoryColors: Record<string, string> = {
  Frontend: "text-blue-400",
  Backend: "text-emerald-400",
  DevOps: "text-purple-400",
  Tools: "text-orange-400",
  Design: "text-pink-400"
};

interface HexProps {
  skill: Skill;
  q: number;
  r: number;
  size: number;
  isHovered: boolean;
  isNeighbor: boolean;
  isAnyHovered: boolean;
  onHover: (skill: Skill | null) => void;
  isCenter?: boolean;
}

const HexCell = memo(({ skill, q, r, size, isHovered, isNeighbor, isAnyHovered, onHover, isCenter }: HexProps) => {
  const Icon = iconMap[skill.name] || Code2;
  
  const x = size * Math.sqrt(3) * (q + r / 2);
  const y = size * (3 / 2) * r;

  return (
    <motion.div
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(skill)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: size * Math.sqrt(3),
        height: size * 2,
        x: `calc(-50% + ${x}px)`,
        y: `calc(-50% + ${y}px)`,
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
      animate={{
        scale: isHovered ? 1.1 : 1,
        opacity: isAnyHovered && !isHovered && !isNeighbor ? 0.3 : 1, 
        zIndex: isHovered ? 30 : isNeighbor ? 20 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group cursor-pointer"
    >
      {/* Base Layer - Soft & Clean */}
      <div className={cn(
        "absolute inset-0 transition-colors duration-500",
        isHovered ? "bg-primary" : isNeighbor ? "bg-white/10" : "bg-white/5",
      )} />
      
      {/* Content Layer */}
      <div className={cn(
        "absolute inset-[1px] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-2",
        "bg-[#020617]", // Solid dark background for contrast
        isHovered && "bg-slate-900" 
      )} style={{ clipPath: "inherit" }}>
        
        <Icon className={cn(
          "w-8 h-8 transition-all duration-500 z-10",
          isHovered ? "text-white" : 
          isNeighbor ? "text-white/80" : "text-slate-600 group-hover:text-slate-400"
        )} />
        
      </div>
    </motion.div>
  );
}, (prev, next) => {
  return (
    prev.isHovered === next.isHovered &&
    prev.isNeighbor === next.isNeighbor &&
    prev.isAnyHovered === next.isAnyHovered &&
    prev.size === next.size &&
    prev.skill.name === next.skill.name
  );
});

HexCell.displayName = "HexCell";

export const TrueRadialHive = ({ rings = 2 }: { rings?: number }) => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [windowWidth, setWidth] = useState(1200);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
    };
    
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const scale = windowWidth < 640 ? 0.55 : windowWidth < 1024 ? 0.75 : 1;
  const hexRadius = 58 * scale;

  const directions = useMemo(() => [
    { dq: 1, dr: -1 }, { dq: 0, dr: -1 }, { dq: -1, dr: 0 },
    { dq: -1, dr: 1 }, { dq: 0, dr: 1 }, { dq: 1, dr: 0 }
  ], []);

  const hexCoords = useMemo(() => {
    const coords = [{ q: 0, r: 0, skill: skills[0] }]; 
    let skillIdx = 1;
    for (let ring = 1; rings >= ring; ring++) {
      let q = directions[4].dq * ring;
      let r = directions[4].dr * ring;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < ring; j++) {
          if (skillIdx < skills.length) {
             coords.push({ q, r, skill: skills[skillIdx] });
          }
          q += directions[i].dq;
          r += directions[i].dr;
          skillIdx++;
        }
      }
    }
    return coords;
  }, [rings, directions]);

  const neighborKeys = useMemo(() => {
    if (!hoveredSkill) return new Set<string>();
    
    const current = hexCoords.find(c => c.skill.name === hoveredSkill.name);
    if (!current) return new Set<string>();

    const keys = new Set<string>();
    directions.forEach(d => {
      keys.add(`${current.q + d.dq},${current.r + d.dr}`);
    });
    return keys;
  }, [hoveredSkill, hexCoords, directions]);

  const handleHover = useCallback((skill: Skill | null) => {
    setHoveredSkill(skill);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center overflow-visible py-10">
        <div className="relative w-full h-full flex items-center justify-center">
          {hexCoords.map((coord, i) => (
            <HexCell
              key={`${coord.q}-${coord.r}`}
              skill={coord.skill}
              q={coord.q}
              r={coord.r}
              size={hexRadius}
              isCenter={i === 0}
              isHovered={hoveredSkill?.name === coord.skill.name}
              isNeighbor={neighborKeys.has(`${coord.q},${coord.r}`)}
              isAnyHovered={hoveredSkill !== null}
              onHover={handleHover}
            />
          ))}
        </div>
      </div>

      {/* Clean Aesthetic Info Panel */}
      <div className="h-24 w-full max-w-sm relative mt-4">
        <AnimatePresence mode="wait">
          {hoveredSkill ? (
            <motion.div
              key={hoveredSkill.name}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <span className="text-xs font-medium tracking-widest text-slate-500 uppercase mb-2">
                {hoveredSkill.category}
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">{hoveredSkill.name}</h3>
              <div className="flex items-center gap-3">
                 <div className="h-1 w-24 bg-slate-800 rounded-full overflow-hidden">
                   <div style={{ width: `${hoveredSkill.level}%` }} className="h-full bg-white/80" />
                 </div>
                 <span className="text-xs text-slate-400 font-mono">{hoveredSkill.level}%</span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="text-slate-500 font-medium text-sm tracking-wide">
                Select a skill to view details
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};