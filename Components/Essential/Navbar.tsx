"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "motion/react";
import Container from "@/Components/Container";

const LINKS = [{ href: "/forum", label: "Forum" }];

const EASE = [0.7, 0, 0.2, 1] as const;

const MotionLink = motion.create(Link);

const list: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.08, staggerChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const active = LINKS.find((l) => pathname.startsWith(l.href))?.href ?? null;
  const target = hovered ?? active;

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const last = scrollY.getPrevious() ?? 0;
    setHidden(y > last && y > 96);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md"
      >
        <Container className="grid h-16 grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
          <motion.div whileTap={{ scale: 0.97 }} className="w-fit">
            <Link
              href="/"
              aria-label="Buten, go to home"
              className={`flex w-fit items-center gap-2.5 ${focusRing}`}
            >
              <span className="text-[1.375rem] font-semibold leading-none tracking-[-0.04em]">
                Buten®
              </span>
            </Link>
          </motion.div>

          <nav
            aria-label="Main"
            className="relative hidden md:block"
            onMouseLeave={() => setHovered(null)}
          >
            <div className="relative flex items-center gap-9">
              {LINKS.map((l) => {
                const isActive = active === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={isActive ? "page" : undefined}
                    onMouseEnter={() => setHovered(l.href)}
                    onFocus={() => setHovered(l.href)}
                    onBlur={() => setHovered(null)}
                    className={`relative py-5 text-[0.9375rem] tracking-tight transition-colors duration-300 ${focusRing} ${
                      target === l.href
                        ? "text-foreground"
                        : "text-foreground/55"
                    }`}
                  >
                    {l.label}
                    <AnimatePresence>
                      {target === l.href && (
                        <motion.span
                          layoutId="nav-underline"
                          aria-hidden="true"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-foreground"
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="hidden items-center justify-end gap-6 md:flex">
            <Link
              href="/login"
              className={`text-[0.9375rem] tracking-tight text-foreground/55 transition-colors duration-300 hover:text-foreground ${focusRing}`}
            >
              Login
            </Link>
            <MotionLink
              href="/register"
              whileHover={{ opacity: 0.85 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex h-9 items-center rounded-full bg-foreground px-5 text-[0.9375rem] tracking-tight text-background ${focusRing}`}
            >
              Register
            </MotionLink>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className={`justify-self-end text-[0.9375rem] tracking-tight md:hidden ${focusRing}`}
          >
            {open ? "Close" : "Menu"}
          </motion.button>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden"
          >
            <nav
              aria-label="Main (mobile)"
              className="flex h-full flex-col justify-center px-8"
            >
              <motion.ul
                variants={list}
                initial="hidden"
                animate="show"
                className="space-y-6"
              >
                {LINKS.map((l) => (
                  <motion.li key={l.href} variants={item}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={active === l.href ? "page" : undefined}
                      className={`block text-3xl font-medium tracking-tight ${focusRing} ${
                        active === l.href
                          ? "text-foreground underline decoration-1 underline-offset-8"
                          : "text-foreground/50 hover:text-foreground"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}

                <motion.li
                  variants={item}
                  className="flex items-center gap-5 pt-2 text-sm"
                >
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className={`text-foreground/50 transition-colors hover:text-foreground ${focusRing}`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className={`text-foreground/50 transition-colors hover:text-foreground ${focusRing}`}
                  >
                    Register
                  </Link>
                </motion.li>
              </motion.ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
