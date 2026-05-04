const legendItems = [
  {
    label: "Core Course",
    className: "border-yellow-400 bg-yellow-400/15",
  },
  {
    label: "Technical Elective",
    className: "border-blue-400 bg-blue-400/15",
  },
  {
    label: "Complementary Studies",
    className: "border-pink-400 bg-pink-400/15",
  },
  {
    label: "Natural Science",
    className: "border-green-400 bg-green-400/15",
  },
  {
    label: "PD",
    className: "border-emerald-400 bg-emerald-400/15",
  },
  {
    label: "Co-op",
    className: "border-purple-400 bg-purple-400/15",
  },
  {
    label: "Capstone",
    className: "border-orange-400 bg-orange-400/15",
  },
];

export default function Legend() {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-black/40 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
        Legend
      </p>

      <div className="flex flex-wrap gap-3">
        {legendItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs text-neutral-200 ${item.className}`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-current" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}