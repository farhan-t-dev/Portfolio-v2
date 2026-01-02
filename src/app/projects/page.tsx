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
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 transition-colors duration-500 bg-background text-foreground">
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Cpu className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Project Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">Mission Archive</h1>
          <p className="text-muted-foreground max-w-lg leading-relaxed">
            A comprehensive record of deployed systems, open-source contributions, and technical experiments.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none transition-all shadow-sm"
            />
          </div>

          {/* Filter */}
          <div className="flex bg-card border border-border rounded-xl p-1 shadow-sm">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                  filter === cat 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:text-foreground"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
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
        <div className="text-center py-32 border border-dashed border-border rounded-[2rem] bg-muted/10">
          <Filter className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-foreground mb-2">No matching records</h3>
          <p className="text-muted-foreground text-sm">Reset filters to view all entries.</p>
          <button 
            onClick={() => { setFilter("All"); setSearch(""); }}
            className="mt-8 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

