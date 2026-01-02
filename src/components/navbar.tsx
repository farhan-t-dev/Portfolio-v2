"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Code, Mail, Terminal, Menu, X, Command, Hexagon, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "@/components/theme-toggle";

/**
 * Magnetic component for interactive hover effects
 */
function Magnetic({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  // Scroll direction detection
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Scroll Spy Logic
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["about", "skills", "projects", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better triggering
      
      // Check for Home (Top)
      if (scrollPosition < 400) {
        setActiveSection("home");
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const links = [
    { href: "/", label: "Home", icon: Home, id: "home" },
    { href: "/about", label: "About", icon: User, id: "about" },
    { href: "/#skills", label: "Stack", icon: Terminal, id: "skills" },
    { href: "/projects", label: "Work", icon: Code, id: "projects" },
    { href: "/#contact", label: "Contact", icon: Mail, id: "contact" },
  ];

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 hidden md:flex justify-center pt-8 pointer-events-none"
      >
        <div 
          className="group pointer-events-auto relative flex items-center bg-background/80 backdrop-blur-xl border border-border rounded-full px-2 py-2 shadow-2xl overflow-hidden"
        >
          {/* Logo Section */}
          <div className="flex items-center gap-2 pl-4 pr-4 border-r border-border">
            <Magnetic>
              <Link href="/" className="flex items-center gap-2 group/logo">
                <div className="relative flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg border border-primary/20 group-hover/logo:bg-primary/20 transition-all duration-500">
                  <Hexagon className="w-4 h-4 text-primary group-hover/logo:rotate-[120deg] transition-transform duration-700" />
                </div>
                <span className="font-bold text-foreground text-xs tracking-widest uppercase">Farhan</span>
              </Link>
            </Magnetic>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-1 px-2">
            {links.map((link) => {
              const isActive = pathname === "/" 
                ? activeSection === link.id
                : pathname.startsWith(link.href) && link.href !== "/" || (pathname === "/" && link.href === "/");

              return (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-[11px] font-bold uppercase tracking-tighter transition-all flex items-center gap-2",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-active"
                        className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action Section */}
          <div className="flex items-center gap-2 pl-2 pr-2 border-l border-border">
            <Magnetic>
              <ThemeToggle />
            </Magnetic>

            <Magnetic className="flex items-center justify-center">
              <button 
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k', 'ctrlKey': true}))}
                className="p-2 text-muted-foreground hover:text-foreground rounded-full transition-colors"
                title="Command Palette"
              >
                <Command className="w-4 h-4" />
              </button>
            </Magnetic>
            
            <Magnetic className="flex items-center justify-center">
              <Link 
                href="/#contact"
                className="group/btn relative px-5 py-2.5 bg-foreground text-background text-[11px] font-black uppercase tracking-wider rounded-full hover:shadow-lg transition-all overflow-hidden flex items-center"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Hire <Sparkles className="w-3 h-3 fill-current" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-primary opacity-0 group-hover/btn:opacity-100 transition-opacity"
                  initial={false}
                />
              </Link>
            </Magnetic>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE HEADER */}
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border px-6 py-4 flex justify-between items-center"
      >
        <Link href="/" className="flex items-center gap-2">
           <Hexagon className="w-6 h-6 text-primary" />
           <span className="font-bold text-foreground text-sm tracking-widest uppercase">Farhan</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 text-muted-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-3xl flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-primary" />
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-muted rounded-full text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col group"
                  >
                    <span className="text-[10px] font-mono text-muted-foreground mb-1">0{i + 1}</span>
                    <span className="text-5xl font-bold text-foreground group-active:text-primary transition-colors">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-6">
              <Link 
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-5 bg-foreground text-background font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3"
              >
                Let&apos;s Build <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span>© 2026 Farhan Dev</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
}