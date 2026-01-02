export interface Skill {
  name: string;
  icon: string; // We will use this for mapped icons if needed, or just text
  category: "Frontend" | "Backend" | "DevOps" | "Design" | "Tools";
  level: number; // 0-100
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", level: 98, icon: "atom" },
  { name: "Next.js", category: "Frontend", level: 95, icon: "layers" },
  { name: "TypeScript", category: "Frontend", level: 92, icon: "file-code" },
  { name: "Tailwind CSS", category: "Frontend", level: 98, icon: "wind" },
  { name: "Framer Motion", category: "Frontend", level: 90, icon: "move" },
  { name: "Redux / Zustand", category: "Frontend", level: 88, icon: "database" },
  { name: "Three.js", category: "Frontend", level: 75, icon: "box" },
  { name: "HTML5 / Semantic", category: "Frontend", level: 100, icon: "layout" },
  
  // Backend
  { name: "Node.js", category: "Backend", level: 90, icon: "server" },
  { name: "Express.js", category: "Backend", level: 92, icon: "train" },
  { name: "PostgreSQL", category: "Backend", level: 85, icon: "database" },
  { name: "MongoDB", category: "Backend", level: 88, icon: "leaf" },
  { name: "GraphQL", category: "Backend", level: 82, icon: "hexagon" },
  { name: "Prisma ORM", category: "Backend", level: 85, icon: "triangle" },
  { name: "Supabase", category: "Backend", level: 88, icon: "zap" },
  { name: "Python / Django", category: "Backend", level: 80, icon: "file-json" },
  
  // DevOps & SysAdmin (The Heavy Hitters)
  { name: "Linux / Bash", category: "DevOps", level: 95, icon: "terminal" },
  { name: "Docker", category: "DevOps", level: 88, icon: "container" },
  { name: "Kubernetes", category: "DevOps", level: 75, icon: "ship" },
  { name: "Nginx / Apache", category: "DevOps", level: 85, icon: "globe" },
  { name: "AWS (EC2/S3/Lambda)", category: "DevOps", level: 80, icon: "cloud" },
  { name: "CI/CD (Github Actions)", category: "DevOps", level: 90, icon: "git-merge" },
  { name: "Terraform", category: "DevOps", level: 70, icon: "hammer" },
  { name: "Grafana / Prometheus", category: "DevOps", level: 75, icon: "activity" },
  
  // Design & Tools
  { name: "Git / GitHub", category: "Tools", level: 98, icon: "git-branch" },
  { name: "Figma", category: "Design", level: 85, icon: "figma" },
  { name: "UI/UX Principles", category: "Design", level: 80, icon: "pen-tool" },
];

// Helper to get skills by category if needed
export const getSkillsByCategory = (cat: string) => skills.filter(s => s.category === cat);