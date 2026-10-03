"use client";

import { Plus } from "react-feather";

type WorkTabsProps = {
  name?: string;
  onAdd?: () => void;
  className?: string;
};

export default function WorkTabs({
  name = "Nama",
  onAdd,
  className = "",
}: WorkTabsProps) {
  const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-foreground/10 bg-background px-4 py-3 ${className}`}
    >
      {/* Tab */}
      <div role="tablist" aria-label="Work" className="flex items-center gap-5">
        <button
          type="button"
          role="tab"
          aria-selected="true"
          className={`text-sm font-medium tracking-tight text-foreground underline decoration-1 underline-offset-[6px] ${focusRing}`}
        >
          [ {name}&apos;s Space ]
        </button>
        <button
          type="button"
          role="tab"
          aria-selected="true"
          className="bg-gray-100 border border-gray-200 p-1 rounded"
        >
          <Plus size={10} />
        </button>
      </div>
    </div>
  );
}
