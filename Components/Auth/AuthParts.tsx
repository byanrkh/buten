"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="w-full max-w-sm"
    >
      <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-[0.9375rem] leading-relaxed tracking-tight text-foreground/55">
        {subtitle}
      </p>

      <div className="mt-8 rounded-xl border border-foreground/10 bg-background/60 p-5 backdrop-blur-sm sm:p-6">
        {children}
      </div>

      <p className="mt-6 text-center text-[0.9375rem] tracking-tight text-foreground/55">
        {footer}
      </p>
    </motion.section>
  );
}

export function GoogleButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex h-11 w-full items-center justify-center gap-3 rounded-full border border-foreground/15 text-[0.9375rem] tracking-tight transition-colors duration-300 hover:bg-foreground/5 ${focusRing}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 01-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0012 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.4 14.3a7.2 7.2 0 010-4.6V6.6H1.4a12 12 0 000 10.8l4-3.1z"
        />
        <path
          fill="#EA4335"
          d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 001.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"
        />
      </svg>
      {label}
    </motion.button>
  );
}

export function Divider() {
  return (
    <div className="my-5 flex items-center gap-3 text-sm tracking-tight text-foreground/45">
      <span className="h-px flex-1 bg-foreground/10" />
      or
      <span className="h-px flex-1 bg-foreground/10" />
    </div>
  );
}

type FieldProps = Omit<ComponentProps<"input">, "id"> & {
  label: string;
  error?: string;
  aside?: ReactNode;
};

export function Field({
  label,
  error,
  aside,
  type,
  className = "",
  ...rest
}: FieldProps) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium tracking-tight">
          {label}
        </label>
        {aside}
      </div>
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`h-11 w-full rounded-lg border bg-background/60 px-3.5 text-[0.9375rem] tracking-tight outline-none transition-colors duration-300 placeholder:text-foreground/35 focus:border-foreground ${
            error ? "border-red-500" : "border-foreground/15"
          } ${isPassword ? "pr-16" : ""} ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm tracking-tight text-foreground/55 transition-colors hover:text-foreground ${focusRing}`}
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && (
        <p
          id={`${id}-err`}
          role="alert"
          className="mt-1.5 text-sm tracking-tight text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={{ opacity: 0.85 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground text-[0.9375rem] tracking-tight text-background disabled:opacity-60 ${focusRing}`}
    >
      {loading ? "Processing…" : children}
    </motion.button>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`font-medium text-foreground underline decoration-1 underline-offset-4 ${focusRing}`}
    >
      {children}
    </Link>
  );
}
