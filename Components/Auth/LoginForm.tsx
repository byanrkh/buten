"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AuthCard,
  Divider,
  Field,
  GoogleButton,
  SubmitButton,
  TextLink,
  focusRing,
} from "./AuthParts";

type Errors = { email?: string; password?: string };

export default function LoginForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    const next: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Masukkan email yang valid.";
    if (!password) next.password = "Password wajib diisi.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    // TODO: panggil API login di sini
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
  }

  function onGoogle() {
    // TODO: mulai alur OAuth Google di sini
  }

  return (
    <AuthCard
      title="Masuk"
      subtitle="Lanjutin catatan dan diskusi kamu di Buten."
      footer={
        <>
          Belum punya akun? <TextLink href="/daftar">Daftar</TextLink>
        </>
      }
    >
      <GoogleButton label="Masuk dengan Google" onClick={onGoogle} />
      <Divider />

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="kamu@email.com"
          error={errors.email}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password kamu"
          error={errors.password}
          aside={
            <Link
              href="/lupa-password"
              className={`text-sm tracking-tight text-foreground/55 transition-colors hover:text-foreground ${focusRing}`}
            >
              Lupa password?
            </Link>
          }
        />
        <div className="pt-1">
          <SubmitButton loading={loading}>Masuk</SubmitButton>
        </div>
      </form>
    </AuthCard>
  );
}
