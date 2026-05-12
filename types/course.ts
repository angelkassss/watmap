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

export type ClusterId =
    | "core"
    | "software"
    | "hardware-networks"
    | "signals-control"
    | "circuits-electronics"
    | "ai-theory-data"
    | "sci-math";

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

    primaryClusterId: ClusterId; // new field to indicate the primary cluster for the course
    categoryIds: FocusArea[]; // new field to indicate all the focus areas the course belongs to

};

export type Cluster = {
  id: ClusterId;
  label: string;
  shortLabel?: string;
  center: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  color: string;
  kind: "core" | "area" | "elective";
  defaultOpen?: boolean;
};

export type Category = {
  id: FocusArea;
  label: string;
  color: string;
};