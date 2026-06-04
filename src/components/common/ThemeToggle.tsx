"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button aria-label="Theme" className="w-10 px-0" variant="secondary" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      aria-label="Theme"
      className="w-10 px-0"
      type="button"
      variant="secondary"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </Button>
  );
}
