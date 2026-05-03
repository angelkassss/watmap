// what a course is allowed to look like

export type CourseCategory =
    | "core"
    | "technical-elective"
    | "complementary-studies"
    | "natural-science"
    | "pd"
    | "coop"
    | "milestone"
    | "capstone";

export type FocusArea =
    | "software"
    | "hardware"
    | "systems"
    | "embedded"
    | "ai-ml"
    | "data-science"
    | "cybersecurity"
    | "theory"
    | "circuits"
    | "communications"
    | "control-systems"
    | "signal-processing"
    | "computer-architecture"
    | "power-control";

export type Course = {
    id: string;
    code: string;
    title: string;
    term: string;
    category: CourseCategory;
    description?: string;
    prerequisites?: string[];
    focusAreas?: FocusArea[];
    units?: number;
};
