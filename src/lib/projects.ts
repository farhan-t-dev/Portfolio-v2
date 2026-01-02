export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  category: "Full-Stack" | "Frontend" | "Backend";
  architecture_diagram?: string;
  technical_details?: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Eco-Stream SaaS Platform",
    description: "A comprehensive full-stack streaming solution with real-time analytics, subscription management, and edge-computing video processing.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
    link: "https://github.com",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop",
    category: "Full-Stack",
    // Fixed Mermaid link: Clean simple diagram
    architecture_diagram: "https://mermaid.ink/img/pako:eNo9isEKwjAMhl8l5OxBvIgePIueRE_S09pB29S1G6X03U28-f6Q70vInSrkSAn-NoMaSreY_mbeXTeatV_Z9Hof9XpZ6v201W9M6R6k_z6E6m6k6u4mKshE6k-I3U_O",
    technical_details: [
      "Implemented HLS video streaming using FFmpeg and AWS MediaConvert for adaptive bitrate streaming.",
      "Designed a multi-tenant database schema in PostgreSQL with Row Level Security (RLS) for data isolation.",
      "Used Redis for caching real-time analytics and reducing database load by 40%."
    ]
  },
  {
    id: "2",
    title: "Nebula CRM System",
    description: "Custom enterprise CRM featuring automated lead scoring, automated email sequencing, and deep integration with multiple sales APIs.",
    tags: ["React", "Node.js", "Docker", "MongoDB"],
    link: "https://github.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    category: "Backend",
    architecture_diagram: "https://mermaid.ink/img/pako:eNo9isEKwjAMhl8l5OxBvIgePIueRE_S09pB29S1G6X03U28-f6Q70vInSrkSAn-NoMaSreY_mbeXTeatV_Z9Hof9XpZ6v201W9M6R6k_z6E6m6k6u4mKshE6k-I3U_O",
    technical_details: [
      "Built a custom background job processing engine using BullMQ to handle thousands of concurrent email sequences.",
      "Optimized MongoDB aggregations to reduce report generation time from 12s to 0.8s.",
      "Containerized the entire microservices architecture using Docker Compose for consistent dev/prod parity."
    ]
  }
];
