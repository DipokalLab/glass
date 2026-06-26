import { useEffect, useRef, useState } from "react";
import { EffectThumb } from "@/components/effect-thumb";

export type CircularSelectItem = {
  id: string;
  title: string;
};

const SPACING = 92; // vertical distance between items (px) — > thumb size, no overlap
const ANGLE_STEP = 0.42; // radians of arc per item step
const CURVE_RADIUS = 78; // how far the arc bows horizontally (px)
const EASE = 0.2; // animation easing factor per frame (0..1)
const WHEEL_THRESHOLD = 28; // accumulated deltaY before stepping

export function CircularSelect({
  items,
  value,
  onChange,
}: {
  items: CircularSelectItem[];
  value: number;
  onChange: (index: number) => void;
}) {
  // `offset` is the animated, fractional position of the wheel. The selected
  // index is the integer target it eases toward.
  const [offset, setOffset] = useState(value);
  const offsetRef = useRef(value);
  const targetRef = useRef(value);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const dragStartY = useRef(0);
  const dragStartOffset = useRef(value);
  const wheelAccum = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = (n: number) => Math.max(0, Math.min(items.length - 1, n));

  const setOffsetImmediate = (next: number) => {
    offsetRef.current = next;
    setOffset(next);
  };

  // rAF loop: ease offset -> target, then stop.
  const tick = () => {
    const diff = targetRef.current - offsetRef.current;
    if (Math.abs(diff) < 0.0008) {
      setOffsetImmediate(targetRef.current);
      rafRef.current = null;
      return;
    }
    setOffsetImmediate(offsetRef.current + diff * EASE);
    rafRef.current = requestAnimationFrame(tick);
  };

  const startAnimation = () => {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  };

  const stopAnimation = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Animate toward externally-driven value changes (e.g. mobile sidebar).
  useEffect(() => {
    if (draggingRef.current) return;
    if (Math.round(targetRef.current) === value) return;
    targetRef.current = value;
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => () => stopAnimation(), []);

  // Wheel: accumulate delta then step one item at a time.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccum.current += e.deltaY;
      if (Math.abs(wheelAccum.current) < WHEEL_THRESHOLD) return;

      const dir = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      const next = clamp(Math.round(targetRef.current) + dir);
      if (next === Math.round(targetRef.current)) return;
      targetRef.current = next;
      startAnimation();
      onChange(next);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    dragStartY.current = e.clientY;
    dragStartOffset.current = offsetRef.current;
    stopAnimation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dy = e.clientY - dragStartY.current;
    // Direct 1:1 follow while dragging (drag down => earlier items).
    const next = clamp(dragStartOffset.current - dy / SPACING);
    targetRef.current = next;
    setOffsetImmediate(next);
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const snapped = clamp(Math.round(offsetRef.current));
    targetRef.current = snapped;
    startAnimation();
    onChange(snapped);
  };

  const selectedIndex = Math.round(offset);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative h-full w-full select-none touch-none overflow-hidden cursor-grab active:cursor-grabbing"
    >
      {items.map((item, index) => {
        const delta = index - offset;
        const absDelta = Math.abs(delta);

        const translateY = delta * SPACING;
        // Convex arc: center item bows toward the editor, others curve back.
        const angle = delta * ANGLE_STEP;
        const translateX = -(1 - Math.cos(angle)) * CURVE_RADIUS;

        const scale = Math.max(0.55, 1 - absDelta * 0.13);
        const opacity = Math.max(0, 1 - absDelta * 0.32);
        const isSelected = index === selectedIndex;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              targetRef.current = index;
              startAnimation();
              onChange(index);
            }}
            style={{
              transform: `translateY(-50%) translate(${translateX}px, ${translateY}px) scale(${scale})`,
              opacity,
              zIndex: items.length - Math.round(absDelta),
            }}
            className="absolute left-4 top-1/2 flex items-center"
          >
            <div
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-neutral-100 dark:bg-neutral-900 ${
                isSelected
                  ? "border-black ring-4 ring-black/10 dark:border-white dark:ring-white/15"
                  : "border-neutral-300 dark:border-neutral-700"
              }`}
            >
              <EffectThumb
                id={item.id}
                title={item.title}
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
            {isSelected && (
              <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap text-sm font-semibold text-black dark:text-white">
                {item.title}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
