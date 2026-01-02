"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ExternalLink, ImageIcon, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageModal from "./image-modal";

const reviews = [
  {
    id: 1,
    client: "E-commerce Founder",
    role: "Fiverr Client",
    text: "Farhan delivered the project way ahead of schedule. The backend structure he built handled our traffic spike perfectly. Highly recommended!",
    rating: 5,
    type: "Backend Optimization",
    date: "2 days ago",
    image: "/reviews/fiverr-1.png",
    fiverrLink: "https://www.fiverr.com/farhan" 
  },
  {
    id: 2,
    client: "Tech Startup CTO",
    role: "Fiverr Client",
    text: "Exceptional work on the React components. The animations are smooth and the code is very clean. A true professional.",
    rating: 5,
    type: "Frontend Architecture",
    date: "1 week ago",
    image: "/reviews/fiverr-2.png",
    fiverrLink: "https://www.fiverr.com/farhan"
  },
  {
    id: 3,
    client: "SaaS Product Manager",
    role: "Fiverr Client",
    text: "Fixed a critical bug that three other developers couldn't solve. He understands the full stack inside out.",
    rating: 5,
    type: "Bug Fix / Debugging",
    date: "2 weeks ago",
    image: "/reviews/fiverr-3.png",
    fiverrLink: "https://www.fiverr.com/farhan"
  },
  {
    id: 4,
    client: "Marketing Lead",
    role: "Fiverr Client",
    text: "The landing page he built converted 20% higher than our previous version. His eye for detail is unmatched.",
    rating: 5,
    type: "Landing Page",
    date: "1 month ago",
    image: "/reviews/fiverr-4.png",
    fiverrLink: "https://www.fiverr.com/farhan"
  },
  {
    id: 5,
    client: "App Developer",
    role: "Fiverr Client",
    text: "Great communication and top-tier code. Farhan is my go-to for complex Supabase integrations now.",
    rating: 5,
    type: "Backend Integration",
    date: "1 month ago",
    image: "/reviews/fiverr-5.png",
    fiverrLink: "https://www.fiverr.com/farhan"
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full">
      <ImageModal 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.image || ""}
        altText={selectedImage?.client || "Review"}
        fiverrLink={selectedImage?.fiverrLink}
      />
      
      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={cn(
          "flex gap-6 overflow-x-auto pb-12 pt-4 px-6 snap-x snap-mandatory no-scrollbar",
          isDragging ? "cursor-grabbing snap-none" : "cursor-grab"
        )}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {reviews.map((review, i) => (
          <ReviewCard 
            key={review.id} 
            review={review} 
            index={i} 
            onImageClick={() => setSelectedImage(review)}
          />
        ))}
        
        {/* Spacer for right padding */}
        <div className="w-6 shrink-0" />
      </div>

      {/* Decorative Blur Edges */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}

function ReviewCard({ review, index, onImageClick }: { review: any, index: number, onImageClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="snap-center shrink-0 w-[350px] md:w-[450px] bg-card/40 backdrop-blur-xl border border-border rounded-3xl overflow-hidden hover:border-primary/20 transition-colors group flex flex-col select-none"
    >
      {/* Screenshot Section */}
      <div 
        onClick={(e) => { e.stopPropagation(); onImageClick(); }}
        className="relative aspect-[16/9] w-full bg-muted/20 overflow-hidden border-b border-border cursor-zoom-in group/image"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
           <ImageIcon className="w-8 h-8 opacity-20 mb-2" />
           <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">Proof_of_work_{review.id}.jpg</span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60" />
        
        {/* Zoom Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity bg-background/30 backdrop-blur-[1px]">
           <div className="w-10 h-10 rounded-full bg-background/10 border border-white/20 flex items-center justify-center text-foreground backdrop-blur-md shadow-xl">
             <Maximize2 className="w-5 h-5" />
           </div>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none">
           <div className="px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border text-[10px] font-bold text-foreground flex items-center gap-2">
             <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> 5.0
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="font-bold text-foreground text-lg">{review.client}</h3>
            <span className="text-[10px] text-muted-foreground font-mono uppercase">{review.date}</span>
          </div>
          <p className="text-xs font-medium text-primary mb-4">{review.type}</p>
          
          <div className="relative">
            <Quote className="absolute -top-3 -left-1 w-4 h-4 text-foreground/10 rotate-180" />
            <p className="text-muted-foreground text-sm leading-relaxed pl-4 border-l-2 border-border italic">
              {review.text}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
