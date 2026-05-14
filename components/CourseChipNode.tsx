import { Course } from "@/types/course";

type CourseChipNodeProps = {
  course: Course;
};

export default function CourseChipNode({ course }: CourseChipNodeProps) {
  return (
    <div className="w-40 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-3 py-2 shadow-lg transition hover:border-yellow-300 hover:bg-yellow-400/20">
      <p className="text-xs font-bold text-white">{course.code}</p>
      <p className="mt-1 line-clamp-2 text-[10px] text-neutral-300">
        {course.title}
      </p>
      <p className="mt-2 text-[9px] font-semibold uppercase tracking-wider text-yellow-300">
        {course.term}
      </p>
    </div>
  );
}