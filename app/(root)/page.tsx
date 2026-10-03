import React from "react";
import Container from "@/Components/Container";
import Hero from "@/Components/Dashboard/Hero";
import WorkTabs from "@/Components/WorkTabs";

export default function page() {
  return (
    <main>
      <Hero />
      <Container className="pb-20">
        <WorkTabs name="Abyan" />
      </Container>
    </main>
  );
}
