import Header from "../components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <section className="px-6 py-8">
        <div className="rounded-3xl border border-yellow-500/30 bg-neutral-900 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
            Prototype View
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Course map coming next
          </h2>

          <p className="mt-3 max-w-2xl text-neutral-300">
            The data layer is now set up. The next step is rendering Waterloo
            ECE courses as interactive nodes on a curriculum graph.
          </p>
        </div>
      </section>
    </main>
  );
}