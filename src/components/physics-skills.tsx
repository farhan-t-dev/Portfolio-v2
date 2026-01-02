"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Power, Activity, Move3d } from "lucide-react";
import { skills } from "@/lib/skills";

export default function PhysicsSkills() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [isActive, setIsActive] = useState(false);

  const startPhysics = () => {
    if (!sceneRef.current) return;
    setIsActive(true);

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create();
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = 600;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: 1
      }
    });

    // Boundaries - thicker and clearly defined
    const ground = Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
    const ceiling = Bodies.rectangle(width / 2, -100, width, 50, { isStatic: true, render: { visible: false } });

    // Creating Skill Pills
    const skillBodies = skills.map((skill) => {
      const x = Math.random() * (width - 160) + 80;
      const y = Math.random() * -1000 - 50;
      const color = ['#06b6d4', '#3b82f6', '#10b981', '#f43f5e'][Math.floor(Math.random() * 4)];

      return Bodies.rectangle(x, y, 140, 40, {
        chamfer: { radius: 15 },
        restitution: 0.5,
        render: {
          fillStyle: '#0f172a',
          strokeStyle: color,
          lineWidth: 2
        },
        label: skill.name
      });
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });

    // Custom text rendering
    Events.on(render, 'afterRender', () => {
      const context = render.context;
      context.font = "bold 12px Inter, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#fff";

      skillBodies.forEach(body => {
        context.save();
        context.translate(body.position.x, body.position.y);
        context.rotate(body.angle);
        context.fillText(body.label, 0, 0);
        context.restore();
      });
    });

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling, ...skillBodies, mouseConstraint]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Store for cleanup
    (window as any).matterCleanup = () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  };

  useEffect(() => {
    return () => {
      if ((window as any).matterCleanup) (window as any).matterCleanup();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-3xl bg-slate-950/50 border border-white/5 overflow-hidden">
      <AnimatePresence>
        {!isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/80 backdrop-blur-md"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30">
                <Move3d className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Initialize Gravity</h3>
              <p className="text-slate-400 mb-8 max-w-xs mx-auto text-sm">Test the structural integrity of the tech stack by breaking the grid.</p>
              <button 
                onClick={startPhysics}
                className="px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-primary hover:text-white transition-all transform active:scale-95"
              >
                Start Simulation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={sceneRef} className="w-full h-full" />
      
      {isActive && (
        <button 
          onClick={() => { if ((window as any).matterCleanup) (window as any).matterCleanup(); setIsActive(false); }}
          className="absolute top-6 right-6 z-30 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-full hover:bg-red-500/20"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}