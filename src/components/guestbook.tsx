"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEntries(data);
      }
    } catch (error) {
      console.error("Failed to load guestbook", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (res.ok) {
        const newEntry = await res.json();
        setEntries([newEntry, ...entries]);
        setMessage("");
        // Keep name for convenience
      }
    } catch (error) {
      console.error("Failed to sign", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-6 rounded-2xl border border-white/10 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Sign the Global Log
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name / Alias"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Leave a message for the system..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors h-24 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-slate-950 font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Initialize Transmission
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Recent Transmissions</h4>
        
        {fetching ? (
           <div className="text-center py-10 text-slate-500">
             <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
             Loading Data Streams...
           </div>
        ) : entries.length === 0 ? (
           <div className="text-center py-10 text-slate-500 italic">No transmissions received yet. Be the first.</div>
        ) : (
          <AnimatePresence>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="group relative pl-8 pb-8 border-l border-white/10 last:pb-0 last:border-0"
              >
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-800 border border-white/20 group-hover:bg-primary group-hover:border-primary transition-colors" />
                
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-white flex items-center gap-2">
                      {entry.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {entry.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
