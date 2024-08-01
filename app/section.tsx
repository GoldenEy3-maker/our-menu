import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "usehooks-ts";

type SectionProps = {
  refCallback?: (node: HTMLElement | null) => void;
  onIntersectionChange?: (
    isIntersecting: boolean,
    entry: IntersectionObserverEntry
  ) => void;
} & React.ComponentProps<"section">;

export function Section({
  className,
  refCallback,
  onIntersectionChange,
  ...props
}: SectionProps) {
  const { ref } = useIntersectionObserver({
    threshold: 0.2,
    onChange: onIntersectionChange,
  });

  return (
    <section
      className={cn("min-h-[100vh]", className)}
      ref={(node) => {
        refCallback?.(node);
        ref(node);
      }}
      {...props}
    />
  );
}
