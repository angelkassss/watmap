"use client";

import { useState } from "react";
import { courses } from "@/data/courses";
import { clusters } from "../data/clusters";
import { Course, ClusterId } from "@/types/course";

type ClusterMapProps = {
  onCourseSelect: (course: Course) => void;
  onClearSelection: () => void;
};

export default function ClusterMap({
  onCourseSelect,
  onClearSelection,
}: ClusterMapProps) {
  const defaultOpenClusters = clusters
    .filter((cluster) => cluster.defaultOpen)
    .map((cluster) => cluster.id);

  const [openClusters, setOpenClusters] =
    useState<ClusterId[]>(defaultOpenClusters);

  function toggleCluster(clusterId: ClusterId) {
    setOpenClusters((prev) =>
      prev.includes(clusterId)
        ? prev.filter((id) => id !== clusterId)
        : [...prev, clusterId]
    );
  }

  return (
    <div
      onClick={onClearSelection}
      className="relative h-[75vh] overflow-hidden rounded-3xl border border-yellow-500/30 bg-neutral-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.08),_transparent_45%)]" />

      <div className="relative h-full w-full">
        {clusters.map((cluster) => {
          const isOpen = openClusters.includes(cluster.id);
          const clusterCourses = courses.filter(
            (course) => course.primaryClusterId === cluster.id
          );

          return (
            <div
              key={cluster.id}
              onClick={(event) => {
                event.stopPropagation();
                toggleCluster(cluster.id);
              }}
              className={`absolute rounded-3xl border bg-black/60 p-4 shadow-2xl transition hover:scale-[1.01] ${
                cluster.kind === "core"
                  ? "border-yellow-300/70"
                  : "border-white/20"
              }`}
              style={{
                left: cluster.center.x - cluster.width / 2,
                top: cluster.center.y - cluster.height / 2,
                width: cluster.width,
                height: cluster.height,
                boxShadow: `0 0 28px ${cluster.color}33`,
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    {cluster.kind === "core" ? "CPU Cluster" : "Course Cluster"}
                  </p>

                  <h3 className="text-sm font-bold text-white">
                    {cluster.label}
                  </h3>
                </div>

                <span className="rounded-full border border-white/20 px-2 py-1 text-[10px] text-neutral-300">
                  {isOpen ? "Open" : "Closed"}
                </span>
              </div>

              {isOpen ? (
                <div className="grid grid-cols-2 gap-2">
                  {clusterCourses.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onCourseSelect(course);
                      }}
                      className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-3 py-2 text-left transition hover:border-yellow-300 hover:bg-yellow-400/20"
                    >
                      <p className="text-xs font-bold text-white">
                        {course.code}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[10px] text-neutral-300">
                        {course.title}
                      </p>
                    </button>
                  ))}

                  {clusterCourses.length === 0 && (
                    <p className="col-span-2 text-xs text-neutral-500">
                      No courses added yet.
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-8 text-xs text-neutral-400">
                  Click to expand this cluster.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}