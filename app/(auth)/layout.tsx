import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/Components/Container";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            aria-label="Buten, ke beranda"
            className="text-[1.375rem] font-semibold leading-none tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            Buten®
          </Link>
          <Link
            href="/"
            className="text-[0.9375rem] tracking-tight text-foreground/55 transition-colors duration-300 hover:text-foreground"
          >
            Kembali
          </Link>
        </Container>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-10 sm:py-16">
        {children}
      </main>
    </>
  );
}
