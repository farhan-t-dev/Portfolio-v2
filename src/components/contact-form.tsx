"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Terminal, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="flex items-center gap-3 mb-6 text-white">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Terminal className="w-5 h-5" />
        </div>
        <h3 className="font-bold font-mono">ENCRYPTED_TRANSMISSION</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-white/50 mb-1 uppercase tracking-wider">Identity</label>
          <input 
            required
            type="text" 
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:border-primary/50 focus:bg-black/40 outline-none transition-all font-mono text-sm"
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono text-white/50 mb-1 uppercase tracking-wider">Return Frequency (Email)</label>
          <input 
            required
            type="email" 
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:border-primary/50 focus:bg-black/40 outline-none transition-all font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-white/50 mb-1 uppercase tracking-wider">Data Packet</label>
          <textarea 
            required
            rows={4}
            placeholder="Initiating protocol..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:border-primary/50 focus:bg-black/40 outline-none transition-all font-mono text-sm resize-none"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === "loading"}
          className="w-full py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {status === "loading" ? (
            <span className="animate-pulse">TRANSMITTING...</span>
          ) : status === "success" ? (
            <>
              <CheckCircle className="w-5 h-5" /> SENT
            </>
          ) : status === "error" ? (
            <>
              <AlertCircle className="w-5 h-5" /> FAILED
            </>
          ) : (
            <>
              SEND_MESSAGE <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}