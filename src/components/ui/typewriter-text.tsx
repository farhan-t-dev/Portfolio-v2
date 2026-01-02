"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
}

export default function TypewriterText({ 
  texts, 
  className = "", 
  speed = 100,
  deleteSpeed = 50,
  pause = 2000
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setDisplayedText(prev => prev.substring(0, prev.length - 1));
        
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        
        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), pause);
          return; // Return to avoid immediate re-render loop
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  );
}