"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Container from "@/Components/Container";

const LINKS = [{ href: "/forum", label: "Forum" }];

const EASE = "ease-[cubic-bezier(0.7,0,0.2,1)]";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [bar, setBar] = useState({ left: 0, width: 0, ready: false });

  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const active = LINKS.find((l) => pathname.startsWith(l.href))?.href ?? null;
  const target = hovered ?? active;

  // Slide the underline to the hovered / active link
  const measure = useCallback(() => {
    const el = target ? itemRefs.current[target] : null;
    if (!el) return setBar((b) => ({ ...b, ready: false }));
    setBar({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [target]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Hide on scroll down, return on scroll up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 96);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation, Escape, and lock body scroll while open
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

  const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md transition-transform duration-500 motion-reduce:transition-none ${EASE} ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <Container className="grid h-16 grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="Buten, ke beranda"
            className={`group flex w-fit items-center gap-2.5 ${focusRing}`}
          >
            <span className="text-[1.375rem] font-semibold leading-none tracking-[-0.04em]">
              Buten®
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            aria-label="Utama"
            className="relative hidden md:block"
            onMouseLeave={() => setHovered(null)}
          >
            <div ref={navRef} className="relative flex items-center gap-9">
              {LINKS.map((l) => {
                const isActive = active === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    ref={(el) => {
                      itemRefs.current[l.href] = el;
                    }}
                    aria-current={isActive ? "page" : undefined}
                    onMouseEnter={() => setHovered(l.href)}
                    onFocus={() => setHovered(l.href)}
                    onBlur={() => setHovered(null)}
                    className={`py-5 text-[0.9375rem] tracking-tight transition-colors duration-300 ${focusRing} ${
                      target === l.href
                        ? "text-foreground"
                        : "text-foreground/55"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -bottom-px h-0.5 bg-foreground transition-[left,width,opacity] duration-500 motion-reduce:transition-none ${EASE}`}
                style={{
                  left: bar.left,
                  width: bar.width,
                  opacity: bar.ready ? 1 : 0,
                }}
              />
            </div>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center justify-end gap-6 md:flex">
            <Link
              href="/masuk"
              className={`text-[0.9375rem] tracking-tight text-foreground/55 transition-colors duration-300 hover:text-foreground ${focusRing}`}
            >
              Login
            </Link>
            <Link
              href="/daftar"
              className={`inline-flex h-9 items-center rounded-full bg-foreground px-5 text-[0.9375rem] tracking-tight text-background transition-[transform,opacity] duration-300 hover:opacity-85 active:scale-95 ${focusRing}`}
            >
              Register
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className={`justify-self-end text-[0.9375rem] tracking-tight md:hidden ${focusRing}`}
          >
            {open ? "Tutup" : "Menu"}
          </button>
        </Container>
      </header>

      {/* Mobile menu */}
      <div
        id="menu-mobile"
        inert={!open}
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          aria-label="Utama (mobile)"
          className="flex h-full flex-col justify-center px-8"
        >
          <ul className="space-y-6">
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
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
              </li>
            ))}

            <li
              className={`flex items-center gap-5 pt-2 text-sm transition-all duration-300 ease-out motion-reduce:transition-none ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{
                transitionDelay: open ? `${80 + LINKS.length * 60}ms` : "0ms",
              }}
            >
              <Link
                href="/masuk"
                onClick={() => setOpen(false)}
                className={`text-foreground/50 transition-colors hover:text-foreground ${focusRing}`}
              >
                Masuk
              </Link>
              <Link
                href="/daftar"
                onClick={() => setOpen(false)}
                className={`text-foreground/50 transition-colors hover:text-foreground ${focusRing}`}
              >
                Daftar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
