import Navbar from "@/Components/Essential/Navbar";
import Footer from "@/Components/Essential/Footer";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
