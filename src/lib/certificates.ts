export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
  tags: string[];
}

export const certificates: Certificate[] = [
  {
    id: "fcc-1",
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    date: "2024",
    link: "https://freecodecamp.org/certification/farhan/responsive-web-design",
    tags: ["HTML", "CSS", "Accessability"]
  },
  {
    id: "fcc-2",
    title: "JavaScript Algorithms and Data Structures",
    issuer: "FreeCodeCamp",
    date: "2024",
    link: "https://freecodecamp.org/certification/farhan/javascript-algorithms-and-data-structures",
    tags: ["ES6", "OOP", "Functional Programming"]
  },
  {
    id: "fcc-3",
    title: "Front End Development Libraries",
    issuer: "FreeCodeCamp",
    date: "2024",
    link: "https://freecodecamp.org/certification/farhan/front-end-development-libraries",
    tags: ["React", "Redux", "Bootstrap", "SASS"]
  },
  {
    id: "fcc-4",
    title: "Back End Development and APIs",
    issuer: "FreeCodeCamp",
    date: "2025",
    link: "https://freecodecamp.org/certification/farhan/back-end-development-and-apis",
    tags: ["Node.js", "Express", "MongoDB"]
  },
  {
    id: "aws-1",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2025",
    link: "#",
    tags: ["Cloud Computing", "Security", "Services"]
  }
];