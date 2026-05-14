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
import CourseChipNode from "./CourseChipNode";

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

  const courseNodes: Node[] = courses
    .filter((course) => openClusters.includes(course.primaryClusterId))
    .map((course) => {
      const parentCluster = clusters.find(
        (cluster) => cluster.id === course.primaryClusterId
      );

      if (!parentCluster) return null;

      const clusterCourses = courses.filter(
        (c) => c.primaryClusterId === parentCluster.id
      );

      const localIndex = clusterCourses.findIndex((c) => c.id === course.id);

      const columns = 2;
      const column = localIndex % columns;
      const row = Math.floor(localIndex / columns);

      return {
        id: course.id,
        position: {
          x:
            parentCluster.center.x -
            parentCluster.width / 2 +
            30 +
            column * 180,
          y:
            parentCluster.center.y -
            parentCluster.height / 2 +
            80 +
            row * 110,
        },
        data: {
          label: <CourseChipNode course={course} />,
        },
        type: "default",
        draggable: false,
        style: {
          background: "transparent",
          border: "none",
          padding: 0,
          width: 160,
        },
      };
    })
    .filter(Boolean) as Node[];

  const clusterNodes: Node[] = clusters.map((cluster) => {
    const isOpen = openClusters.includes(cluster.id);

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

            {!isOpen && (
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
        (prereq) =>
          visibleCourseIds.has(prereq) && visibleCourseIds.has(course.id)
      )
      .map((prereq) => ({
        id: `${prereq}-${course.id}`,
        source: prereq,
        target: course.id,
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

  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    const selectedCourse = courses.find((course) => course.id === node.id);

    if (selectedCourse) {
      onCourseSelect(selectedCourse);
    }
  };

  return (
    <div className="h-[75vh] overflow-hidden rounded-3xl border border-yellow-500/30 bg-neutral-950">
      <ReactFlow
        nodes={[...clusterNodes, ...courseNodes]}
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