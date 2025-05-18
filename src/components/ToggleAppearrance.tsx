"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const APPEARANCE_STORAGE_KEY = "app-appearance";

function getInitialAppearance() {
  if (typeof window !== "undefined") {
    const storedPreference = localStorage.getItem(APPEARANCE_STORAGE_KEY);
    if (storedPreference) {
      return storedPreference;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
}

function applyAppearance(appearance: string) {
  const htmlEl = document.querySelector("html")!;
  if (appearance === "dark") {
    htmlEl.classList.add("dark");
  } else {
    htmlEl.classList.remove("dark");
  }
}

function toggleAppearance() {
  const htmlEl = document.querySelector("html")!;
  const currentAppearance = htmlEl.className.includes("dark")
    ? "dark"
    : "light";
  const newAppearance = currentAppearance === "dark" ? "light" : "dark";

  applyAppearance(newAppearance);
  if (typeof window !== "undefined") {
    localStorage.setItem(APPEARANCE_STORAGE_KEY, newAppearance);
  }
}

export default function ToggleAppearance() {
  useEffect(() => {
    const initialAppearance = getInitialAppearance();
    applyAppearance(initialAppearance);
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={toggleAppearance} variant="outline" size="icon">
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <SunIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
