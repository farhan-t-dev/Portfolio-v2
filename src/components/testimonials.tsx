"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    id: 1,
    client: "Fiverr Client",
    role: "E-commerce Founder",
    text: "Farhan delivered the project way ahead of schedule. The backend structure he built handled our traffic spike perfectly. Highly recommended!",
    rating: 5,
    type: "Backend Optimization",
    date: "2 days ago"
  },
  {
    id: 2,
    client: "Tech Startup",
    role: "CTO",
    text: "Exceptional work on the React components. The animations are smooth and the code is very clean. A true professional.",
    rating: 5,
    type: "Frontend Architecture",
    date: "1 week ago"
  },
  {
    id: 3,
    client: "SaaS Owner",
    role: "Product Manager",
    text: "Fixed a critical bug that three other developers couldn't solve. He understands the full stack inside out.",
    rating: 5,
    type: "Bug Fix / Debugging",
    date: "2 weeks ago"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [index, isPlaying]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[index];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Controls Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className="text-slate-400 hover:text-white transition-colors"
           >
             {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
           </button>
           <div className="h-4 w-[1px] bg-white/10" />
           <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
             Review {index + 1} / {reviews.length}
           </span>
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={prevSlide}
             className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors"
           >
             <ChevronLeft className="w-4 h-4" />
           </button>
           <button 
             onClick={nextSlide}
             className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors"
           >
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative h-[300px] md:h-[250px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, x: 50, filter: "blur(5px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -50, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute inset-0"
          >
            <div className="h-full group relative bg-slate-950/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all shadow-xl flex flex-col md:flex-row">
              
              {/* Left Side: Metadata */}
              <div className="bg-white/5 md:w-64 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
                 <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                      {currentReview.client.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{currentReview.client}</div>
                      <div className="text-slate-400 text-sm">{currentReview.role}</div>
                    </div>
                 </div>
              </div>

              {/* Right Side: Content */}
              <div className="flex-1 p-8 relative flex flex-col justify-center">
                 <div className="absolute top-6 right-6 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={cn("w-4 h-4", j < currentReview.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-800")} />
                    ))}
                 </div>

                 <blockquote className="relative">
                    <Quote className="absolute -top-4 -left-4 w-6 h-6 text-white/5 rotate-180" />
                    <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed relative z-10">
                      "{currentReview.text}"
                    </p>
                 </blockquote>
                 
                 <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                       Project: <span className="text-slate-300">{currentReview.type}</span>
                    </div>
                    <div className="text-xs text-slate-600">
                       {currentReview.date}
                    </div>
                 </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}