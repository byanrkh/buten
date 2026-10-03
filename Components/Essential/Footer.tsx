import Link from "next/link";
import Container from "@/Components/Container";

const COLUMNS = [
  {
    title: "Jelajahi",
    links: [
      { label: "Catatan", href: "/catatan" },
      { label: "Forum", href: "/forum" },
      { label: "Progres", href: "/progres" },
    ],
  },
  {
    title: "Akun",
    links: [
      { label: "Masuk", href: "/masuk" },
      { label: "Daftar", href: "/daftar" },
    ],
  },
];

const linkClass =
  "text-[0.9375rem] tracking-tight text-foreground/55 transition-colors duration-300 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto overflow-hidden border-t border-foreground/10 bg-background">
      <Container className="grid gap-12 pb-10 pt-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <p className="max-w-xs text-[0.9375rem] leading-relaxed tracking-tight text-foreground/55">
          Simpan foto papan tulis, catat ulang, dan diskusi bareng sesama
          pelajar INTEN, semuanya di satu tempat.
        </p>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-4 text-[0.9375rem] font-medium tracking-tight">
              {col.title}
            </h2>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      {/* Oversized wordmark, cropped by the bottom edge */}
      <div
        aria-hidden="true"
        className="select-none overflow-hidden px-5 pt-6 sm:px-8"
      >
        <div className="mx-auto max-w-5xl lg:px-12">
          <p className="text-[clamp(6rem,30vw,22rem)] font-semibold leading-none tracking-[-0.06em]">
            buten
          </p>
        </div>
      </div>

      <div className="border-t border-foreground/10">
        <Container className="flex items-center justify-between py-5 text-sm tracking-tight text-foreground/55">
          <span>&copy; {year} Buten</span>
          <a
            href="#"
            className={linkClass.replace("text-[0.9375rem]", "text-sm")}
          >
            Ke atas
          </a>
        </Container>
      </div>
    </footer>
  );
}
