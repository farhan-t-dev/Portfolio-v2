import { Github, Linkedin, Twitter, Terminal, Cpu, Globe } from "lucide-react";

export default function Footer() {

  return (

        <footer className="relative bg-[#0C0C0C] pt-24 pb-12 overflow-hidden border-t border-white/[0.03] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.5)]">

          {/* Aesthetic Background Elements */}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="absolute -top-px left-0 right-0 h-[100px] bg-gradient-to-b from-primary/[0.05] to-transparent" />

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />

    

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-soft-light" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />

      </div>

      

      <div className="container relative z-10 px-6 mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 mb-20">

          {/* Identity Column */}

          <div className="space-y-8">

            <h2 className="text-3xl font-bold tracking-tighter text-white">

              FARHAN<span className="text-primary">.</span>

            </h2>

            <p className="text-slate-400 max-w-sm leading-relaxed text-sm font-medium">

              A specialized focus on building high-performance digital products. 

              Bridging complex technical architecture with refined user experience.

            </p>

            <div className="flex gap-4">

              {[Github, Linkedin, Twitter].map((Icon, i) => (

                <a key={i} href="#" className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all duration-300">

                  <Icon className="w-4.5 h-4.5" />

                </a>

              ))}

            </div>

          </div>



          {/* Quick Links Column */}

          <div className="grid grid-cols-2 gap-8">

            <div className="space-y-6">

              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Directory</h3>

              <ul className="space-y-4">

                {['Home', 'Projects', 'About', 'Contact'].map((item) => (

                  <li key={item}>

                    <a href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-sm text-slate-400 hover:text-primary transition-all duration-300 flex items-center gap-3 group">

                       <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />

                       {item}

                    </a>

                  </li>

                ))}

              </ul>

            </div>

            <div className="space-y-6">

              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Social</h3>

              <ul className="space-y-4">

                {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((item) => (

                  <li key={item}>

                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-all duration-300">

                       {item}

                    </a>

                  </li>

                ))}

              </ul>

            </div>

          </div>



          {/* Details Column */}

          <div className="space-y-8">

            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Overview</h3>

            <div className="grid gap-4 font-mono text-[10px] font-bold">

              <div className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">

                <span className="text-slate-500 flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> Availability</span>

                <span className="text-emerald-500 flex items-center gap-2">

                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />

                   Available

                </span>

              </div>

              <div className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">

                <span className="text-slate-500 flex items-center gap-2"><Cpu className="w-3.5 h-3.5" /> Core Focus</span>

                <span className="text-primary">Software Architecture</span>

              </div>

            </div>

          </div>

        </div>



        <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">

          <p>© 2026 FARHAN. DEVELOPED WITH PRECISION.</p>

          <div className="flex items-center gap-8">

            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>

            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>

            <span className="text-white/[0.03]">/</span>

            <p className="text-slate-700">VERSION 2.1.0</p>

          </div>

        </div>

      </div>

    </footer>

  );

}








