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
      next.email = "Enter a valid email.";
    if (!password) next.password = "Password is required.";
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
      title="Login"
      subtitle="Continue your notes and discussions on Buten."
      footer={
        <>
          Don't have an account? <TextLink href="/register">Register</TextLink>
        </>
      }
    >
      <GoogleButton label="Login with Google" onClick={onGoogle} />
      <Divider />

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          error={errors.email}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          error={errors.password}
          aside={
            <Link
              href="/forgot-password"
              className={`text-sm tracking-tight text-foreground/55 transition-colors hover:text-foreground ${focusRing}`}
            >
              Forgot password?
            </Link>
          }
        />
        <div className="pt-1">
          <SubmitButton loading={loading}>Login</SubmitButton>
        </div>
      </form>
    </AuthCard>
  );
}
