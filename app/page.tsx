"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, ValueOf } from "@/lib/utils";
import { useQueryState, parseAsStringEnum } from "nuqs";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useEventListener, useResizeObserver } from "usehooks-ts";
import { Section } from "./section";

const TabsMap = {
  Hot: "Hot",
  Cold: "Cold",
  Sweet: "Sweet",
  Salty: "Salty",
  Snacks: "Snacks",
  Salads: "Salads",
  Drinkables: "Drinkables",
} as const;

type TabsMap = ValueOf<typeof TabsMap>;

const TabsContentMap: Record<TabsMap, string> = {
  Hot: "Горячее",
  Cold: "Холодное",
  Sweet: "Сладкое",
  Salty: "Соленое",
  Snacks: "Закуски",
  Salads: "Салаты",
  Drinkables: "Напитки",
} as const;

export default function Home() {
  const [tabs, setTabs] = useQueryState(
    "tabs",
    parseAsStringEnum<TabsMap>(Object.values(TabsMap)).withDefault("Hot")
  );

  const [left, setLeft] = useState(4);
  const [width, setWidth] = useState(0);

  const isPreventScrollEventRef = useRef(false);
  const preventTimeoutRef = useRef<NodeJS.Timeout>();
  const containerTabRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef(new Map<TabsMap, HTMLButtonElement | null>());
  const sectionRefs = useRef(new Map<TabsMap, HTMLElement | null>());

  function scrollToSection(value: number, behavior: ScrollBehavior) {
    const threshold = 60;

    scroll({
      top: value + window.scrollY - threshold,
      behavior,
    });
  }

  function updateActiveTriggerPosition(left: number, width: number) {
    setLeft(left);
    setWidth(width);
  }

  function onTabChange(key: TabsMap) {
    const trigger = triggerRefs.current.get(key);
    const section = sectionRefs.current.get(key);

    isPreventScrollEventRef.current = true;

    setTabs(key);

    if (trigger)
      updateActiveTriggerPosition(trigger.offsetLeft, trigger.offsetWidth);
    if (section) scrollToSection(section.getBoundingClientRect().top, "smooth");
  }

  function onScroll(event: Event) {
    if (isPreventScrollEventRef.current) {
      if (preventTimeoutRef.current) {
        clearTimeout(preventTimeoutRef.current);
        preventTimeoutRef.current = undefined;
      }

      preventTimeoutRef.current = setTimeout(
        () => (isPreventScrollEventRef.current = false),
        100
      );
      return;
    }

    sectionRefs.current.forEach((el, key) => {
      const trigger = triggerRefs.current.get(key);
      if (!el || !trigger) return;
      if (window.scrollY > el.offsetTop - 70) {
        setTabs(key);
        updateActiveTriggerPosition(trigger.offsetLeft, trigger.offsetWidth);
      }
    });
  }

  useEffect(() => {
    if (tabs === "Hot") return;
    const section = sectionRefs.current.get(tabs);
    if (!section) return;
    scrollToSection(section.getBoundingClientRect().top, "instant");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useResizeObserver({
    ref: containerTabRef,
    box: "border-box",
    onResize() {
      const trigger = triggerRefs.current.get(tabs);

      if (!trigger) return;

      setLeft(trigger.offsetLeft);
      setWidth(trigger.offsetWidth);
    },
  });

  useEventListener("scroll", onScroll);

  return (
    <main className="container-grid py-6">
      <h1 className="text-3xl font-medium mb-4">Все блюда</h1>
      <Tabs
        value={tabs}
        onValueChange={(v) => onTabChange(v as TabsMap)}
        ref={containerTabRef}
        className="sticky top-0 z-20">
        <TabsList className="relative flex justify-normal hidden-scrollbar rounded-full h-auto max-w-full overflow-auto">
          {width !== 0 ? (
            <motion.span
              initial={false}
              style={{ left: left, width }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-full left-1 h-10 bg-primary pointer-events-none duration-300"
              )}
            />
          ) : null}
          {Object.entries(TabsContentMap).map(([key, value]) => (
            <TabsTrigger
              key={key}
              value={key}
              ref={(node) => {
                triggerRefs.current.set(key as TabsMap, node);
              }}
              className={cn(
                "flex-1 rounded-full z-10 py-2 text-base data-[state=active]:bg-transparent duration-300 data-[state=active]:text-primary-foreground",
                {
                  "data-[state=active]:bg-primary": width === 0,
                }
              )}>
              {value}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-[20rem_1fr] gap-4 mt-4">
        <aside className="sticky top-14 left-0 max-h-svh">
          <h3 className="font-medium text-xl">Фильтры</h3>
        </aside>
        <div>
          {Object.entries(TabsContentMap).map(([key, value]) => (
            <section
              key={key}
              className="h-[100vh]"
              id={key}
              ref={(node) => {
                sectionRefs.current.set(key as TabsMap, node);
              }}>
              <h3 className="font-medium text-xl">{value}</h3>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
