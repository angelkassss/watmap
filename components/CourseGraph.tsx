"use client"; // runs on client side aka on browser -  Mouse dragging + zomming in n out + clicking on nodes to see details + panning around the graph

//imports graph lib, course data that were built

import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  Background, //dotted background grid
  Controls, //lil zoom in/out buttons
  Node,
  Edge,
  MarkerType,
  NodeMouseHandler,
} from "@xyflow/react";

import { courses } from "../data/courses";
import { Course, FocusArea } from "../types/course";

// "temrX" is a mapping of term names to x-coordinates for graph layout
const termX: Record<string, number> = {
  //Object Record used stings as keys and number as values
  "1A": 0, //key(string) : value(number)
  "1B": 320,
  "2A": 640,
  "2B": 960,
  "3A": 1280,
  "3B": 1600,
  "4A": 1920,
  "4B": 2240,
};

//Graph construction logic: Left to right
//1a -> 1b -> 2a -> 2b -> 3a -> 3b -> 4a -> 4b

//every course -> converted unto a visual node w/ corresponding colours
//core = yellow
// technical elective = blue
// complementary studies = pink
// natural science = green
// pd = emerald
// coop = purple
// capstone = orange
function getCategoryClass(category: string) {
  switch (category) {
    case "core":
      return "border-yellow-400 bg-yellow-400/15";
    case "technical-elective":
      return "border-blue-400 bg-blue-400/15";
    case "complementary-studies":
      return "border-pink-400 bg-pink-400/15";
    case "natural-science":
      return "border-green-400 bg-green-400/15";
    case "pd":
      return "border-emerald-400 bg-emerald-400/15";
    case "coop":
      return "border-purple-400 bg-purple-400/15";
    case "capstone":
      return "border-orange-400 bg-orange-400/15";
    default:
      return "border-neutral-500 bg-neutral-800";
  }
}

//Graph Theory
// directed graph - one directsion from prereq to course
//
//Course = > Node, and prereq relationships = Edges

type CourseGraphProps = {
  onCourseSelect: (course: Course) => void;
  onClearSelection: () => void;
  selectedFocus: FocusArea | null;
};

// const termCounts: Record<string, number> = {};

// const nodes: Node[] = courses.map((course) => {
//   const countInTerm = termCounts[course.term] ?? 0;
//   termCounts[course.term] = countInTerm + 1;

//   return {
//     id: course.id,
//     position: {
//       x: termX[course.term] ?? 0,
//       y: countInTerm * 150,
//     },
//     data: {
//       label: (
//         <div
//           className={`w-52 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur ${getCategoryClass(
//             course.category
//           )}`}
//         >
//           <p className="text-sm font-bold text-white">{course.code}</p>

//           <p className="mt-1 text-xs leading-snug text-neutral-200">
//             {course.title}
//           </p>

//           <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-yellow-300">
//             {course.term}
//           </p>
//         </div>
//       ),
//     },
//     type: "default",
//     style: {
//       background: "transparent",
//       border: "none",
//       padding: 0,
//       width: 208,
//     },
//   };
// });
// // prerequisite relationships -> edges, animated for visual effect
// const edges: Edge[] = courses.flatMap((course) =>
//   (course.prerequisites ?? []).map((prereq) => ({
//     id: `${prereq}-${course.id}`,
//     source: prereq,
//     target: course.id,
//     type: "smoothstep",
//     animated: true,
//     markerEnd: {
//       type: MarkerType.ArrowClosed,
//       color: "#facc15",
//     },
//     style: {
//       stroke: "#facc15",
//       strokeWidth: 2,
//     },
//   }))
// );

export default function CourseGraph({
  onCourseSelect,
  onClearSelection,
  selectedFocus,
}: CourseGraphProps) {
  const termCounts: Record<string, number> = {};

  const nodes: Node[] = courses.map((course) => {
    const countInTerm = termCounts[course.term] ?? 0;
    termCounts[course.term] = countInTerm + 1;

    const matchesSelectedFocus =
      !selectedFocus || course.focusAreas?.includes(selectedFocus);

    return {
      id: course.id,
      position: {
        x: termX[course.term] ?? 0,
        y: countInTerm * 150,
      },
      data: {
        label: (
          <div
            className={`w-52 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur transition ${getCategoryClass(
              course.category
            )} ${
              matchesSelectedFocus ? "opacity-100" : "opacity-25 grayscale"
            }`}
          >
            <p className="text-sm font-bold text-white">{course.code}</p>

            <p className="mt-1 text-xs leading-snug text-neutral-200">
              {course.title}
            </p>

            <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-yellow-300">
              {course.term}
            </p>
          </div>
        ),
      },
      type: "default",
      style: {
        background: "transparent",
        border: "none",
        padding: 0,
        width: 208,
      },
    };
  });

  // prerequisite relationships -> edges, animated for visual effect
  const edges: Edge[] = courses.flatMap((course) =>
    (course.prerequisites ?? []).map((prereq) => {
      const sourceCourse = courses.find((c) => c.id === prereq);

      const edgeMatchesFocus =
        !selectedFocus ||
        course.focusAreas?.includes(selectedFocus) ||
        sourceCourse?.focusAreas?.includes(selectedFocus);

      return {
        id: `${prereq}-${course.id}`,
        source: prereq,
        target: course.id,
        type: "smoothstep",
        animated: edgeMatchesFocus,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeMatchesFocus ? "#facc15" : "#525252",
        },
        style: {
          stroke: edgeMatchesFocus ? "#facc15" : "#525252",
          strokeWidth: edgeMatchesFocus ? 2.5 : 1,
          opacity: edgeMatchesFocus ? 1 : 0.25,
        },
      };
    })
  );

  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    const selectedCourse = courses.find((course) => course.id === node.id);

    if (selectedCourse) {
      onCourseSelect(selectedCourse);
    }
  };

  return (
    <div className="h-[75vh] overflow-hidden rounded-3xl border border-yellow-500/30 bg-neutral-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={handleNodeClick}
        onPaneClick={onClearSelection}
      >
        <Background color="#525252" gap={18} />
        <Controls />
      </ReactFlow>
    </div>
  );
}