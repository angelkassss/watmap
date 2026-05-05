import { Course } from "../types/course";

type CourseSidebarProps = {
  selectedCourse: Course | null;
};

export default function CourseSidebar({ selectedCourse }: CourseSidebarProps) {
  if (!selectedCourse) {
    return (
      <aside className="rounded-3xl border border-yellow-500/20 bg-black/40 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
          Course Details
        </p>

        <h3 className="mt-3 text-xl font-semibold text-white">
          Select a course
        </h3>

        <p className="mt-2 text-sm text-neutral-300">
          Click any course node in the graph to view its term, category,
          prerequisites, focus areas, and description.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-3xl border border-yellow-500/20 bg-black/40 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
        Course Details
      </p>

      <h3 className="mt-3 text-2xl font-bold text-white">
        {selectedCourse.code}
      </h3>

      <p className="mt-1 text-sm text-neutral-300">
        {selectedCourse.title}
      </p>

      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Term
          </p>
          <p className="text-neutral-100">{selectedCourse.term}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Category
          </p>
          <p className="text-neutral-100">{selectedCourse.category}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Units
          </p>
          <p className="text-neutral-100">
            {selectedCourse.units ?? "Not listed"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Prerequisites
          </p>
          <p className="text-neutral-100">
            {selectedCourse.prerequisites?.length
              ? selectedCourse.prerequisites.join(", ")
              : "None listed"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Focus Areas
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedCourse.focusAreas?.length ? (
              selectedCourse.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-200"
                >
                  {area}
                </span>
              ))
            ) : (
              <p className="text-neutral-100">None listed</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Description
          </p>
          <p className="mt-1 leading-relaxed text-neutral-200">
            {selectedCourse.description ?? "No description added yet."}
          </p>
        </div>
      </div>
    </aside>
  );
}