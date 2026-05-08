import { FocusArea } from "../types/course";

//type aliasing in typescript to describe the propsitions that the focus filter component will receive from its parent component (app/page.tsx)
type FocusFilterProps = {
  selectedFocus: FocusArea | null; //either no focus area or a speciffic focus area
  onFocusChange: (focus: FocusArea | null) => void; //function: update state of the selected focus area
};

//Current focus options
const focusOptions: { label: string; value: FocusArea }[] = [
  { label: "Software", value: "software" },
  { label: "Hardware", value: "hardware" },
  { label: "Systems", value: "systems" },
  { label: "Embedded", value: "embedded" },
  { label: "AI / ML", value: "ai-ml" },
  { label: "Data Science", value: "data-science" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Theory", value: "theory" },
  { label: "Circuits", value: "circuits" },
  { label: "Communications", value: "communications" },
  { label: "Control Systems", value: "control-systems" },
  { label: "Signal Processing", value: "signal-processing" },
  { label: "Computer Architecture", value: "computer-architecture" },
  { label: "Power / Control", value: "power-control" },
];

export default function FocusFilter({
  selectedFocus,
  onFocusChange,
}: FocusFilterProps) {
  //def react component "Focus Filter" that takes in the props defined by the "FocusFilterProps" type alias
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-black/40 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
          Focus Paths
        </p>

        <button
          type="button"
          onClick={() => onFocusChange(null)}
          className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300 hover:border-yellow-400 hover:text-yellow-300"
        >
          Show all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {focusOptions.map((option) => {
          const isSelected = selectedFocus === option.value;

          return (
            <button
              key={option.value}
              type="button"
              // UI fix -> if the user clicks the selected filter again, the filter gets cleared aka show all courses
              onClick={() => onFocusChange(isSelected ? null : option.value)}
              className={`rounded-full border px-3 py-2 text-xs transition ${
                isSelected
                  ? "border-yellow-300 bg-yellow-400/20 text-yellow-100"
                  : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-yellow-400 hover:text-yellow-300"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}