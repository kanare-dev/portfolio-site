"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { SectionProvider } from "@/contexts/SectionContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <SectionProvider>{children}</SectionProvider>
    </ThemeProvider>
  );
}
