"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Terminal, Clock, Bug } from "lucide-react";

const logs = [
  {
    id: 1,
    title: "The Redis Race Condition",
    description: "Spent 3 days debugging a distributed lock issue where multiple worker nodes were overlapping on a payment verification process.",
    status: "resolved",
    level: "error",
    date: "Dec 2025",
    lesson: "Atomic operations are your best friend. Switched to Lua scripts for Redis mutations."
  },
  {
    id: 2,
    title: "Memory Leak in SSR",
    description: "Detected a steady climb in memory usage on the production Node.js server. Tracked it down to an unclosed database connection in a middleware.",
    status: "resolved",
    level: "warn",
    date: "Oct 2025",
    lesson: "Always implement rigorous cleanup in 'finally' blocks, especially in high-traffic middlewares."
  }
];

export default function BugLog() {
  return (
    <div className="space-y-6">
      {logs.map((log) => (
        <motion.div
          key={log.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden rounded-xl border border-white/5 bg-slate-900/40"
        >
          <div className="flex items-center justify-between bg-white/5 px-6 py-3 border-b border-white/5">
             <div className="flex items-center gap-3">
               <Bug className={`w-4 h-4 ${log.level === 'error' ? 'text-red-400' : 'text-yellow-400'}`} />
               <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                 Incident #{log.id}
               </span>
             </div>
             <div className="flex items-center gap-2">
               <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                 <Clock className="w-3 h-3" /> {log.date}
               </span>
               <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20">
                 <CheckCircle2 className="w-3 h-3" /> Resolved
               </div>
             </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-2">{log.title}</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              {log.description}
            </p>
            
            <div className="bg-black/40 p-4 rounded-lg border border-white/5">
               <div className="text-[10px] text-primary font-mono uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Terminal className="w-3 h-3" /> Post-Mortem Lesson
               </div>
               <p className="text-sm text-slate-300 italic">
                 "{log.lesson}"
               </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
