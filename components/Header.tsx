export default function Header() {
  return (
    <header className="border-b border-yellow-500/30 bg-black px-6 py-5">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
          University of Waterloo Engineering
        </p>

        <h1 className="text-4xl font-bold text-white">WatMap</h1>

        <p className="max-w-2xl text-neutral-300">
          An interactive degree map for Waterloo ECE students. Explore courses,
          prerequisites, electives, co-op terms, options, and focus paths.
        </p>
      </div>
    </header>
  );
}