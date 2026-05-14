"use client";

import { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Edge,
  MarkerType,
  Node,
  NodeMouseHandler,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { courses } from "@/data/courses";
import { clusters } from "@/data/clusters";
import { ClusterId, Course } from "@/types/course";

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

  const clusterNodes: Node[] = clusters.map((cluster) => {
    const isOpen = openClusters.includes(cluster.id);
    const clusterCourses = courses.filter(
      (course) => course.primaryClusterId === cluster.id
    );

    return {
      id: `cluster-${cluster.id}`,
      position: {
        x: cluster.center.x - cluster.width / 2,
        y: cluster.center.y - cluster.height / 2,
      },
      data: {
        label: (
          <div
            onClick={() => toggleCluster(cluster.id)}
            className={`h-full w-full rounded-3xl border bg-black/70 p-4 shadow-2xl ${
              cluster.kind === "core"
                ? "border-yellow-300/70"
                : "border-white/20"
            }`}
            style={{
              boxShadow: `0 0 28px ${cluster.color}55`,
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
        ),
      },
      type: "default",
      draggable: false,
      style: {
        width: cluster.width,
        height: cluster.height,
        background: "transparent",
        border: "none",
        padding: 0,
      },
    };
  });

  const visibleCourseIds = new Set(
    courses
      .filter((course) => openClusters.includes(course.primaryClusterId))
      .map((course) => course.id)
  );

  const edges: Edge[] = courses.flatMap((course) =>
    (course.prerequisites ?? [])
      .filter(
        (prereq) => visibleCourseIds.has(prereq) && visibleCourseIds.has(course.id)
      )
      .map((prereq) => ({
        id: `${prereq}-${course.id}`,
        source: `cluster-${courses.find((c) => c.id === prereq)?.primaryClusterId}`,
        target: `cluster-${course.primaryClusterId}`,
        type: "smoothstep",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#facc15",
        },
        style: {
          stroke: "#facc15",
          strokeWidth: 2,
        },
      }))
  );

  const handleNodeClick: NodeMouseHandler = () => {
    // cluster clicking is handled inside the label
  };

  return (
    <div className="h-[75vh] overflow-hidden rounded-3xl border border-yellow-500/30 bg-neutral-950">
      <ReactFlow
        nodes={clusterNodes}
        edges={edges}
        fitView
        fitViewOptions={{
          padding: 0.18,
        }}
        minZoom={0.35}
        maxZoom={1.5}
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        onNodeClick={handleNodeClick}
        onPaneClick={onClearSelection}
      >
        <Background color="#525252" gap={24} />
        <Controls />
      </ReactFlow>
    </div>
  );
}