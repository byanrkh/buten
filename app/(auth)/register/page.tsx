import type { Metadata } from "next";
import RegisterForm from "@/Components/Auth/RegisterForm";

export const metadata: Metadata = { title: "Register · Buten" };

export default function Page() {
  return <RegisterForm />;
}
