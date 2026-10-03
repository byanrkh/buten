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
    if (name.length < 2) next.name = "Name must be at least 2 characters.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    if (confirm !== password) next.confirm = "Passwords do not match.";
    if (!data.get("terms")) next.terms = "You need to agree to the terms & conditions.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
  }

  function onGoogle() {
  }

  return (
    <AuthCard
      title="Register"
      subtitle="Save whiteboards, rewrite your notes, and discuss with friends."
      footer={
        <>
          Already have an account? <TextLink href="/login">Login</TextLink>
        </>
      }
    >
      <GoogleButton label="Register with Google" onClick={onGoogle} />
      <Divider />

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="Name" name="name" autoComplete="name" placeholder="Full name" error={errors.name} />
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@email.com" error={errors.email} />
        <Field label="Password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" error={errors.password} />
        <Field label="Confirm password" name="confirm" type="password" autoComplete="new-password" placeholder="Repeat password" error={errors.confirm} />

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed tracking-tight text-foreground/70">
            <input
              type="checkbox"
              name="terms"
              className={`mt-0.5 size-4 shrink-0 accent-foreground ${focusRing}`}
            />
            <span>I agree to Buten's terms &amp; conditions and privacy policy.</span>
          </label>
          {errors.terms && (
            <p role="alert" className="mt-1.5 text-sm tracking-tight text-red-600">
              {errors.terms}
            </p>
          )}
        </div>

        <div className="pt-1">
          <SubmitButton loading={loading}>Create account</SubmitButton>
        </div>
      </form>
    </AuthCard>
  );
}
