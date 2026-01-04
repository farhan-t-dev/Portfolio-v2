"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

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
      }
    } catch (error) {
      console.error("Failed to sign", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="bg-card/50 backdrop-blur-xl p-6 rounded-3xl border border-border mb-8 shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          Sign the Guestbook
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Leave a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors h-24 resize-none shadow-inner"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background font-bold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Post Message
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Messages</h4>
        
        {fetching ? (
           <div className="text-center py-10 text-muted-foreground">
             <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
             Loading messages...
           </div>
        ) : entries.length === 0 ? (
           <div className="text-center py-10 text-muted-foreground italic text-sm">No messages yet.</div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative pl-8 pb-8 border-l border-border last:pb-0 last:border-0"
              >
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-muted border border-border group-hover:bg-primary group-hover:border-primary transition-colors" />
                
                <div className="bg-card p-5 rounded-2xl border border-border group-hover:border-primary/20 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-foreground flex items-center gap-2">
                      {entry.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {entry.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}