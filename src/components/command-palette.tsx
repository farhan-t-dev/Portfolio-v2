"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Code, User, Mail, FileText, ArrowRight, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands = [
    {
      heading: "Navigation",
      items: [
        { icon: User, name: "Go to Home", href: "/" },
        { icon: Code, name: "View Projects", href: "/projects" },
        { icon: FileText, name: "View Certificates", href: "/#certificates" },
        { icon: Mail, name: "Contact Me", href: "/#contact" },
      ]
    },
    {
      heading: "Actions",
      items: [
        { icon: Laptop, name: "Check System Status", action: () => router.push("/#status") },
        { icon: FileText, name: "Download Resume", action: () => window.open("/resume.pdf", "_blank") },
      ]
    }
  ];

  const filteredCommands = commands.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const handleSelect = (item: any) => {
    if (item.href) router.push(item.href);
    if (item.action) item.action();
    setOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10"
          >
            <div className="flex items-center border-b border-white/10 px-4">
              <Search className="w-5 h-5 text-white/40 mr-3" />
              <input
                className="flex-1 h-14 bg-transparent text-white placeholder-white/40 outline-none font-mono text-sm"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <div className="text-xs text-white/20 font-mono border border-white/10 px-2 py-1 rounded">ESC</div>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-white/40 font-mono text-sm">No results found.</div>
              ) : (
                filteredCommands.map((group, i) => (
                  <div key={i} className="mb-2">
                    <div className="px-2 py-1 text-xs font-semibold text-white/30 uppercase tracking-wider font-mono">
                      {group.heading}
                    </div>
                    {group.items.map((item, j) => (
                      <button
                        key={j}
                        onClick={() => handleSelect(item)}
                        className="w-full flex items-center px-2 py-3 rounded-md hover:bg-white/5 text-left group transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-white/40 mr-3 group-hover:text-primary transition-colors" />
                        <span className="flex-1 text-white/80 group-hover:text-white text-sm font-medium">
                          {item.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}