"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

export default function KonamiCode() {
  const [active, setActive] = useState(false);
  const [input, setInput] = useState<string[]>([]);
  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key].slice(-10);
      setInput(newInput);

      if (newInput.join(",") === code.join(",")) {
        setActive(true);
        setTimeout(() => setActive(false), 5000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ y: "100vh", rotate: 0 }}
          animate={{ y: "-100vh", rotate: 360 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "linear" }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center">
            <Rocket className="w-32 h-32 text-primary animate-pulse" />
            <h2 className="text-6xl font-black text-white italic mt-8 shadow-2xl">CHEAT ACTIVATED</h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
