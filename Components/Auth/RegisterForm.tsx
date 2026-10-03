"use client";

import { useState } from "react";
import { AuthCard, Divider, Field, GoogleButton, SubmitButton, TextLink, focusRing } from "./AuthParts";

type Errors = { name?: string; email?: string; password?: string; confirm?: string; terms?: string };

export default function RegisterForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");

    const next: Errors = {};
    if (name.length < 2) next.name = "Nama minimal 2 karakter.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Masukkan email yang valid.";
    if (password.length < 8) next.password = "Password minimal 8 karakter.";
    if (confirm !== password) next.confirm = "Konfirmasi password tidak sama.";
    if (!data.get("terms")) next.terms = "Kamu perlu menyetujui syarat & ketentuan.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    // TODO: panggil API registrasi di sini
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
  }

  function onGoogle() {
    // TODO: mulai alur OAuth Google di sini
  }

  return (
    <AuthCard
      title="Daftar"
      subtitle="Simpan papan tulis, catat ulang, dan diskusi bareng teman."
      footer={
        <>
          Sudah punya akun? <TextLink href="/masuk">Masuk</TextLink>
        </>
      }
    >
      <GoogleButton label="Daftar dengan Google" onClick={onGoogle} />
      <Divider />

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="Nama" name="name" autoComplete="name" placeholder="Nama lengkap" error={errors.name} />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="kamu@email.com" error={errors.email} />
        <Field label="Password" name="password" type="password" autoComplete="new-password" placeholder="Minimal 8 karakter" error={errors.password} />
        <Field label="Konfirmasi password" name="confirm" type="password" autoComplete="new-password" placeholder="Ulangi password" error={errors.confirm} />

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed tracking-tight text-foreground/70">
            <input
              type="checkbox"
              name="terms"
              className={`mt-0.5 size-4 shrink-0 accent-foreground ${focusRing}`}
            />
            <span>Aku setuju dengan syarat &amp; ketentuan dan kebijakan privasi Buten.</span>
          </label>
          {errors.terms && (
            <p role="alert" className="mt-1.5 text-sm tracking-tight text-red-600">
              {errors.terms}
            </p>
          )}
        </div>

        <div className="pt-1">
          <SubmitButton loading={loading}>Buat akun</SubmitButton>
        </div>
      </form>
    </AuthCard>
  );
}