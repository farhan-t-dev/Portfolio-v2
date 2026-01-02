"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
  fiverrLink?: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, altText, fiverrLink }: ImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-5xl h-auto max-h-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Proof_of_Delivery.png
              </span>
              <div className="flex items-center gap-4">
                {fiverrLink && (
                  <a 
                    href={fiverrLink} 
                    target="_blank" 
                    className="text-xs font-bold text-primary hover:opacity-80 transition-opacity flex items-center gap-2"
                  >
                    Verify Source <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative w-full flex-1 min-h-[50vh] bg-background flex items-center justify-center overflow-auto p-4 md:p-8">
               <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center w-full">
                    <div className="w-full max-w-3xl aspect-video mx-auto bg-muted rounded-xl flex items-center justify-center border border-border shadow-inner group">
                        {/* Placeholder for the actual Image component */}
                        <div className="flex flex-col items-center gap-4 opacity-40">
                           <span className="text-muted-foreground font-mono text-xs">{imageSrc}</span>
                           <p className="text-[10px] uppercase font-bold tracking-widest">Preview Not Available</p>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
