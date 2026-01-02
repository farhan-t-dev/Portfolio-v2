"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Database, Layout, Server, Terminal, Search, 
  Settings, ChevronRight, Filter, Plus, ExternalLink,
  Code2, Monitor, Cpu, Box
} from "lucide-react";
import { skills } from "@/lib/skills";
import { cn } from "@/lib/utils";

const categories = [
  { id: "Frontend", icon: Layout },
  { id: "Backend", icon: Server },
  { id: "DevOps", icon: Cpu },
  { id: "Database", icon: Database },
];

export default function SupabaseSkillsSection() {
  const [activeTab, setActiveTab] = useState("Frontend");

  const filteredSkills = skills.filter(s => s.category === activeTab);

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#1c1c1c] rounded-2xl border border-[#303139] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[600px]">
      
      {/* Sidebar (Supabase Style) */}
      <div className="w-full md:w-64 bg-[#171717] border-r border-[#303139] flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 text-[#3ecf8e] mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#3ecf8e]/10 flex items-center justify-center border border-[#3ecf8e]/20">
              <Box className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-tighter text-lg text-white">Console</span>
          </div>

          <nav className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Project_Structure</p>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === cat.id 
                    ? "bg-[#282828] text-white border border-[#303139]" 
                    : "text-slate-400 hover:text-white hover:bg-[#202020]"
                )}
              >
                <cat.icon className={cn("w-4 h-4", activeTab === cat.id ? "text-[#3ecf8e]" : "text-slate-500")} />
                {cat.id}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-[#303139]">
          <div className="flex items-center gap-3 text-slate-500 text-xs">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content (Data Table View) */}
      <div className="flex-1 flex flex-col bg-[#1c1c1c]">
        {/* Top Header */}
        <div className="px-8 py-4 border-b border-[#303139] flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-medium text-white">
            <span className="text-slate-500">Project</span>
            <ChevronRight className="w-4 h-4 text-slate-700" />
            <span>{activeTab}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="bg-[#121212] border border-[#303139] rounded-md pl-8 pr-4 py-1.5 text-xs text-white outline-none focus:border-[#3ecf8e]/50 transition-all"
              />
            </div>
            <button className="bg-[#3ecf8e] text-black px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-[#3ecf8e]/90">
              <Plus className="w-3 h-3" /> Deploy
            </button>
          </div>
        </div>

        {/* Table / Grid */}
        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-[#232323] border border-[#303139] rounded-xl p-5 hover:border-[#3ecf8e]/40 transition-all shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1c1c1c] border border-[#303139] flex items-center justify-center group-hover:border-[#3ecf8e]/30 transition-all">
                    <Code2 className="w-5 h-5 text-slate-400 group-hover:text-[#3ecf8e]" />
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-700 group-hover:text-slate-400" />
                </div>
                
                <h3 className="text-sm font-bold text-white mb-1">{skill.name}</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-4">Level: {skill.level}%</p>
                
                <div className="w-full h-1 bg-[#121212] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    className="h-full bg-[#3ecf8e]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-8 py-3 bg-[#171717] border-t border-[#303139] text-[10px] font-mono text-slate-500 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#3ecf8e] animate-pulse" />
            <span>Connection: Secure</span>
          </div>
          <span>API Latency: 4ms</span>
          <span>Rows: {filteredSkills.length}</span>
        </div>
      </div>
    </div>
  );
}
