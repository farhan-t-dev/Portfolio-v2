"use client";

import { motion } from "framer-motion";
import { 
  Atom, Layers, FileCode, Wind, Move, Database, Box, Layout, 
  Server, TrainFront, Leaf, Hexagon, Triangle, Zap, 
  Container, GitBranch, Cloud, Figma, PenTool, 
  Terminal, Globe, Hammer, Activity, FileJson, GitMerge,
  Code2, Monitor, Wrench, CheckCircle2
} from "lucide-react";
import { skills } from "@/lib/skills";
import { cn } from "@/lib/utils";

const topSkills = skills.slice(0, 6);

export default function SupabaseSkillsCard() {
  return (
    <div className="h-full w-full bg-[#1c1c1c] rounded-3xl border border-[#303139] overflow-hidden flex flex-col">
      {/* Header / Tab Bar */}
      <div className="px-4 py-3 bg-[#232323] border-b border-[#303139] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
            <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[10px] font-mono text-slate-500 ml-2 uppercase tracking-widest">stack_config.sh</span>
        </div>
        <div className="px-2 py-0.5 rounded bg-[#3ecf8e]/10 border border-[#3ecf8e]/20 text-[#3ecf8e] text-[8px] font-bold uppercase">
          Stable
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 p-4 grid grid-cols-2 gap-3">
        {topSkills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-[#282828] border border-[#303139] hover:border-[#3ecf8e]/50 transition-all group"
          >
            <div className="w-8 h-8 rounded-md bg-[#1c1c1c] flex items-center justify-center text-slate-400 group-hover:text-[#3ecf8e] transition-colors shadow-inner">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-200">{skill.name}</span>
              <div className="w-16 h-1 bg-[#1c1c1c] rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-[#3ecf8e]" 
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Status */}
      <div className="px-4 py-2 border-t border-[#303139] bg-[#1c1c1c] flex items-center justify-between text-[9px] font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-[#3ecf8e]" />
          <span>CPU: 12%</span>
        </div>
        <span>Ready_to_Deploy</span>
      </div>
    </div>
  );
}
