"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";

interface GlitchTextProps {
  text: string;
  className?: string;
  hover?: boolean; // If true, only glitches on parent hover (requires group-hover logic or external trigger, simpler here is just onMouseOver)
  speed?: number;
}

export default function GlitchText({ text, className = "", hover = false, speed = 30 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    let iteration = 0;
    
    clearInterval(intervalRef.current!);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }

      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    if (!hover) {
      // If not hover-triggered, maybe run once on mount?
      // Or just stay static. For this specific component, let's just respect hover or run on mount if desired.
      // Current usage: mostly for headers that we want to "decode" on view.
    }
  }, []);

  const handleMouseEnter = () => {
    if (hover) {
      setIsHovered(true);
      startScramble();
    }
  };

  return (
    <span 
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
}
