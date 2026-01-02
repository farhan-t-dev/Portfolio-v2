"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Cpu } from "lucide-react";
import ProjectCard from "@/components/project-card";
import ProjectModal from "@/components/project-modal";
import { projects, Project } from "@/lib/projects";

const categories = ["All", "Full-Stack", "Frontend", "Backend"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === "All" || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                          project.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-6">
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <Cpu className="w-5 h-5 animate-pulse" />
            <span className="font-mono text-sm tracking-widest uppercase">Database Access</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-rajdhani text-white">Project Archive</h1>
          <p className="text-white/50 mt-2 max-w-lg">
            Complete log of all deployed systems, experimental prototypes, and client solutions.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search protocols..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-primary/50 focus:bg-white/10 outline-none transition-all font-mono"
            />
          </div>

          {/* Filter */}
          <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === cat 
                    ? "bg-primary text-black shadow-lg" 
                    : "text-white/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={setSelectedProject}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
          <Filter className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Matches Found</h3>
          <p className="text-white/40">Adjust your search parameters to locate target.</p>
          <button 
            onClick={() => { setFilter("All"); setSearch(""); }}
            className="mt-6 text-primary hover:underline font-mono text-sm"
          >
            RESET_FILTERS
          </button>
        </div>
      )}
    </div>
  );
}
