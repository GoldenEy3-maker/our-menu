"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <main className="container-grid py-4">
      <h1>Home page</h1>
      <div className="flex items-center">
        <Button
          type="button"
          onClick={() => setIsSubmitting((prev) => !prev)}
          isSubmitting={isSubmitting}>
          Submit
        </Button>
      </div>
    </main>
  );
}
