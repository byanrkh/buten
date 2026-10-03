import Link from "next/link";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import Container from "../Container";

const USER = { name: "Abyan" };

const STATS = [
  {
    label: "Notes",
    href: "/notes",
    value: "24",
    hint: "3 added this week",
  },
  { label: "Discussions", href: "/forum", value: "7", hint: "2 unanswered" },
  {
    label: "Progress",
    href: "/progress",
    value: "68%",
    hint: "This semester's target",
    progress: 68,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger = (delay = 0, gap = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: gap } },
});

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const card: Variants = {
  ...rise,
  hover: { y: -3, transition: { duration: 0.25, ease: EASE } },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

function Arrow() {
  return (
    <motion.svg
      variants={{ hover: { x: 2, y: -2 } }}
      transition={{ duration: 0.25, ease: EASE }}
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 11l6-6M6 5h5v5" />
    </motion.svg>
  );
}

export default function Hero() {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <Container as="section" className="py-14 sm:py-20">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <motion.p
            variants={rise}
            className="mb-4 text-sm tracking-tight text-foreground/55"
          >
            {today}
          </motion.p>
          <motion.h1
            variants={rise}
            className="text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl"
          >
            Welcome back,
            <br />
            {USER.name}
          </motion.h1>
          <motion.p
            variants={rise}
            className="mt-5 max-w-md text-[0.9375rem] leading-relaxed tracking-tight text-foreground/55"
          >
            Pick up where you left off, upload a new whiteboard photo, or check
            out the busiest discussions.
          </motion.p>
        </div>

        <motion.div variants={rise} className="flex items-center gap-3">
          <motion.div whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/notes/new"
              className={`inline-flex h-10 items-center rounded-full bg-foreground px-5 text-[0.9375rem] tracking-tight text-background ${focusRing}`}
            >
              + Upload whiteboard
            </Link>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/forum"
              className={`inline-flex h-10 items-center rounded-full border border-foreground/15 px-5 text-[0.9375rem] tracking-tight transition-colors duration-300 hover:bg-foreground/5 ${focusRing}`}
            >
              Open forum
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.ul
        variants={stagger(0.4, 0.1)}
        initial="hidden"
        animate="show"
        className="mt-12 grid gap-3 sm:grid-cols-3"
      >
        {STATS.map((s) => (
          <motion.li key={s.label} variants={card} whileHover="hover">
            <Link
              href={s.href}
              className={`flex h-full flex-col justify-between rounded-xl border border-foreground/10 bg-background/60 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-foreground/25 ${focusRing}`}
            >
              <div className="flex items-center justify-between text-sm tracking-tight text-foreground/55">
                <span>{s.label}</span>
                <Arrow />
              </div>

              <div className="mt-8">
                <p className="text-4xl font-semibold leading-none tracking-[-0.04em]">
                  {s.value}
                </p>

                {s.progress !== undefined && (
                  <div
                    role="progressbar"
                    aria-valuenow={s.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={s.label}
                    className="mt-4 h-1 overflow-hidden rounded-full bg-foreground/10"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.progress}%` }}
                      transition={{ duration: 1, delay: 0.9, ease: EASE }}
                      className="h-full rounded-full bg-foreground"
                    />
                  </div>
                )}

                <p className="mt-3 text-sm tracking-tight text-foreground/55">
                  {s.hint}
                </p>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  );
}
