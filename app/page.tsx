"use client";

import { useState } from "react";
import Header from "../components/Header";
import CourseGraph from "../components/CourseGraph";
import Legend from "../components/Legend";
import CourseSidebar from "../components/CourseSidebar";
// import { Course } from "../types/course";
import FocusFilter from "../components/FocusFilter";
import { Course, FocusArea } from "../types/course";

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedFocus, setSelectedFocus] = useState<FocusArea | null>(null); //added a new focusArea state 

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <section className="px-6 py-8">
        <div className="mb-5 flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
            Prototype View
          </p>

          <h2 className="text-2xl font-semibold">
            Waterloo ECE Curriculum Map
          </h2>

          <p className="max-w-2xl text-neutral-300">
            Drag, zoom, and explore the first version of the Waterloo ECE course
            graph. Click a course to view its details.
          </p>
        </div>

        <div className="mb-5">
          <Legend />
        </div>

        <div className="mb-5">
        <FocusFilter
          selectedFocus={selectedFocus}
          onFocusChange={setSelectedFocus}
        />
      </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <CourseGraph 
          selectedFocus={selectedFocus}
          onCourseSelect={setSelectedCourse} 
          onClearSelection={() => setSelectedCourse(null)} 
          />
          <CourseSidebar selectedCourse={selectedCourse} />
        </div>
      </section>
    </main>
  );
}