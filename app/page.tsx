import Header from "../components/Header";
import CourseGraph from "../components/CourseGraph";


export default function Home() {
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
            graph. Prerequisite relationships are shown as animated links.
          </p>
        </div>

        <CourseGraph />

      </section>
    </main>
  );
}