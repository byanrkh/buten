import type { Metadata } from "next";
import LoginForm from "@/Components/Auth/LoginForm";

export const metadata: Metadata = { title: "Login · Buten" };

export default function Page() {
  return <LoginForm />;
}
