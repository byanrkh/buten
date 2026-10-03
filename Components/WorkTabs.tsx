"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type Space = {
  id: string;
  name: string;
  kind: "personal" | "group";
  members?: number;
};

type WorkTabsProps = {
  name?: string;
  groups?: Space[];
  activeId?: string;
  onChange?: (id: string) => void;
  onAdd?: () => void;
  className?: string;
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

const iconProps = {
  viewBox: "0 0 16 16",
  className: "size-3.5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function UserIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M3 13.5c.6-2.3 2.5-3.5 5-3.5s4.4 1.2 5 3.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="6" cy="5.5" r="2.25" />
      <path d="M1.5 13c.5-2 2.1-3.1 4.5-3.1s4 1.1 4.5 3.1" />
      <path d="M10.5 3.5a2.25 2.25 0 010 4.2M12 9.9c1.4.4 2.3 1.4 2.5 3.1" />
    </svg>
  );
}

const DEFAULT_GROUPS: Space[] = [
  { id: "inten-2026", name: "INTEN 2026", kind: "group", members: 12 },
  { id: "physics-group", name: "Physics Group", kind: "group", members: 4 },
];

export default function WorkTabs({
  name = "Name",
  groups = DEFAULT_GROUPS,
  activeId,
  onChange,
  onAdd,
  className = "",
}: WorkTabsProps) {
  const uid = useId();
  const spaces: Space[] = [
    { id: "personal", name: `${name}'s Work`, kind: "personal" },
    ...groups,
  ];

  const [internal, setInternal] = useState(spaces[0].id);
  const active = activeId ?? internal;
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = useCallback(
    (id: string) => {
      setInternal(id);
      onChange?.(id);
    },
    [onChange],
  );

  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % spaces.length;
    else if (e.key === "ArrowLeft")
      next = (index - 1 + spaces.length) % spaces.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = spaces.length - 1;
    else return;

    e.preventDefault();
    select(spaces[next].id);
    tabRefs.current[spaces[next].id]?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center justify-between gap-3 rounded-xl border border-foreground/10 bg-background/60 p-1.5 backdrop-blur-sm ${className}`}
    >
      <div
        role="tablist"
        aria-label="Space"
        className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <AnimatePresence initial={false}>
          {spaces.map((s, i) => {
            const isActive = s.id === active;
            return (
              <motion.button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[s.id] = el;
                }}
                layout="position"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25 }}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(s.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative isolate inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm tracking-tight transition-colors duration-300 ${focusRing} ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={`${uid}-pill`}
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-lg bg-foreground/[0.07] ring-1 ring-inset ring-foreground/10"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}

                <span
                  className={`flex size-6 items-center justify-center rounded-md border transition-colors duration-300 ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/15"
                  }`}
                >
                  {s.kind === "personal" ? <UserIcon /> : <UsersIcon />}
                </span>

                <span className="whitespace-nowrap">{s.name}</span>

                {s.kind === "group" && s.members !== undefined && (
                  <span className="text-xs tabular-nums text-foreground/45">
                    {s.members}
                  </span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        onClick={onAdd}
        aria-label="Create new group"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-foreground/15 px-3 text-sm tracking-tight transition-colors duration-300 hover:bg-foreground/5 ${focusRing}`}
      >
        <motion.svg
          variants={{ hover: { rotate: 90 } }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          viewBox="0 0 16 16"
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M8 3v10M3 8h10" />
        </motion.svg>
        <span className="hidden sm:inline">New group</span>
      </motion.button>
    </motion.div>
  );
}
