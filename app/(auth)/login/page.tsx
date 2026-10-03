import type { Metadata } from "next";
import LoginForm from "@/Components/Auth/LoginForm";

export const metadata: Metadata = { title: "Masuk · Buten" };

export default function Page() {
  return <LoginForm />;
}
