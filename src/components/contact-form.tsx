"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent</h3>
        <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you as soon as possible.</p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-8 text-primary font-bold hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Name</label>
          <input
            required
            type="text"
            placeholder="Enter your name"
            className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all shadow-inner"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
          <input
            required
            type="email"
            placeholder="email@example.com"
            className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all shadow-inner"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
        <textarea
          required
          rows={5}
          placeholder="How can I help you?"
          className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all resize-none shadow-inner"
        />
      </div>

      <button
        disabled={status === "loading"}
        className="w-full bg-foreground text-background font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all disabled:opacity-50 shadow-xl"
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Send Message <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
