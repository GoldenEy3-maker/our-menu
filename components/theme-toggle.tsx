"use client";

import { useTheme } from "next-themes";

import { Icons } from "./icons";
import { motion, Variants } from "framer-motion";
import { Skeleton } from "./ui/skeleton";
import { useIsMountedState } from "@/hook/use-is-mounted-state";

export function ThemeToggle() {
  const isMounted = useIsMountedState();
  const { setTheme, theme } = useTheme();

  const transitionConfig = {
    type: "spring",
    stiffness: 300,
    damping: 24,
  };

  const iconVariants: Variants = {
    rotate: {
      rotate: "45deg",
    },
    default: {
      rotate: "0deg",
    },
  };

  const thumbVariants: Variants = {
    light: {
      left: "2.5rem",
    },
    dark: {
      left: "0.25rem",
    },
  };

  if (!isMounted) return <Skeleton className="w-[4.5rem] h-9 rounded-full" />;

  return (
    <button
      onClick={() => setTheme(() => (theme === "dark" ? "light" : "dark"))}
      className="[--light-clr:37_89%_55%] relative overflow-hidden inline-flex p-[0.6rem] items-center justify-between w-[4.5rem] h-9 cursor-pointer text-lg rounded-full border-2 border-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-background">
      <motion.span
        variants={iconVariants}
        animate={theme === "light" ? "default" : "rotate"}
        transition={transitionConfig}>
        <Icons.SunHigh className="text-[hsl(var(--light-clr))]" />
      </motion.span>
      <motion.span
        variants={iconVariants}
        animate={theme === "dark" ? "default" : "rotate"}
        transition={transitionConfig}>
        <Icons.Moon />
      </motion.span>
      <motion.span
        variants={thumbVariants}
        initial={false}
        animate={theme}
        transition={transitionConfig}
        className="absolute top-1/2 left-1 w-6 h-6 rounded-full bg-[hsl(37_89%_90%)] dark:bg-background shadow-lg ring-0 pointer-events-none block -translate-y-1/2 border-[3px] border-[hsl(var(--light-clr))] dark:border-white"
      />
    </button>
  );
}
