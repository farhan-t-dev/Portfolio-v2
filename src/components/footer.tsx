import { Github, Linkedin, Twitter, Terminal, Cpu, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black pt-16 pb-8 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold font-mono text-white mb-4">
              FARHAN<span className="text-primary">.DEV</span>
            </h2>
            <p className="text-white/60 max-w-sm mb-6 leading-relaxed">
              Crafting high-performance digital systems with precision and creativity. 
              Full-stack architecture meets aesthetic engineering.
            </p>
            <div className="flex gap-4">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-primary hover:border-primary/50 transition-all group">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-white font-bold mb-6">./NAVIGATION</h3>
            <ul className="space-y-3">
              {['Home', 'Projects', 'Certificates', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-white/50 hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-white font-bold mb-6">./SYSTEM_STATUS</h3>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between text-white/50">
                <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> NETWORK</span>
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span className="flex items-center gap-2"><Cpu className="w-3 h-3" /> CPU LOADS</span>
                <span className="text-primary animate-pulse">24%</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span className="flex items-center gap-2"><Terminal className="w-3 h-3" /> BUILD</span>
                <span className="text-white">v2.4.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30">
          <p>© 2026 FARHAN SYSTEM INTERFACE. ALL RIGHTS RESERVED.</p>
          <p>INITIATED AT {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </footer>
  );
}