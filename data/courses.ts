import { Course } from "@/types/course";

export const courses: Course[] = [
  {
    //starter dataset - NOT COMPLETE - just a few courses to get the ball rolling
    id: "ece105",
    code: "ECE 105",
    title: "Classical Mechanics",
    term: "1A",
    category: "core",
    description: "Foundational mechanics course for first-year ECE students.",
    focusAreas: ["hardware", "control-systems"],
    units: 0.5,
  },

  {
    id: "ece150",
    code: "ECE 150",
    title: "Fundamentals of Programming",
    term: "1A",
    category: "core",
    description: "Introductory programming course for ECE students.",
    focusAreas: ["software", "systems"],
    units: 0.5,
  },

  {
    id: "ece124",
    code: "ECE 124",
    title: "Digital Circuits and Systems",
    term: "1B",
    category: "core",
    description: "Introduction to digital logic and digital system design.",
    focusAreas: ["hardware", "embedded", "computer-architecture"],
    units: 0.5,
  },

  {
    id: "ece140",
    code: "ECE 140",
    title: "Linear Circuits",
    term: "1B",
    category: "core",
    description: "Foundational circuit analysis course.",
    focusAreas: ["circuits", "hardware"],
    units: 0.5,
  },

  {
    id: "ece250",
    code: "ECE 250",
    title: "Algorithms and Data Structures",
    term: "2A",
    category: "core",
    description: "Data structures, algorithms, and algorithmic thinking.",
    prerequisites: ["ece150"],
    focusAreas: ["software", "systems", "theory"],
    units: 0.5,
  },

  {
    id: "ece252",
    code: "ECE 252",
    title: "Systems Programming and Concurrency",
    term: "2B",
    category: "core",
    description: "Systems programming, processes, threads, synchronization, and concurrency.",
    prerequisites: ["ece250"],
    focusAreas: ["software", "systems"],
    units: 0.5,
  },

  {
    id: "ece350",
    code: "ECE 350",
    title: "Real-Time Operating Systems",
    term: "3A",
    category: "core",
    description: "Operating systems concepts with real-time systems focus.",
    prerequisites: ["ece252"],
    focusAreas: ["systems", "embedded"],
    units: 0.5,
  },
];