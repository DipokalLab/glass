import { useEffect, useRef, useState } from "react";
import { EffectThumb } from "@/components/effect-thumb";

export type CircularSelectItem = {
  id: string;
  title: string;
};

export function CircularSelect({
  items,
  value,
  onChange,
}: {
  items: CircularSelectItem[];
  value: number;
  onChange: (index: number) => void;
}) {
  // Fractional offset used only while dragging for a smooth scrub feel.
  const [drag, setDrag] = useState(0);
  const [height, setHeight] = useState(0);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = (n: number) => Math.max(0, Math.min(items.length - 1, n));
  const currentOffset = dragging.current ? value + drag : value;

  // The wheel sits on a circle whose diameter matches the container height,
  // and items are spread evenly across that full height (not bunched up).
  const spacing = height / (items.length + 1);
  const radius = height; // large radius => gentle, height-sized arc

  // Track the container height so the layout always fills it.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setHeight(el.clientHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Prevent the page from scrolling while the wheel handles the event.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      onChange(clamp(value + dir));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, items.length]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startY.current = e.clientY;
    startValue.current = value;
    setDrag(0);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dy = e.clientY - startY.current;
    // Drag down => move toward later items (offset decreases visually).
    setDrag(spacing ? -dy / spacing : 0);
  };

  const handlePointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const snapped = clamp(Math.round(startValue.current + drag));
    setDrag(0);
    onChange(snapped);
  };

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
        const delta = index - currentOffset;
        const translateY = delta * spacing;
        // x follows a true circular arc of the given radius for this y offset.
        const translateX = -(radius - Math.sqrt(Math.max(0, radius * radius - translateY * translateY)));
        const scale = Math.max(0.55, 1 - Math.abs(delta) * 0.18);
        const opacity = Math.max(0.25, 1 - Math.abs(delta) * 0.35);
        const isSelected = Math.round(currentOffset) === index;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(index)}
            style={{
              transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale})`,
              opacity,
              zIndex: items.length - Math.round(Math.abs(delta)),
              transition: dragging.current
                ? "none"
                : "transform 0.35s ease, opacity 0.35s ease",
            }}
            className="absolute left-1/2 top-1/2 flex flex-col items-center gap-1"
          >
            <div
              className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-neutral-100 dark:bg-neutral-900 ${
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
              <span className="whitespace-nowrap text-xs font-medium text-black dark:text-white">
                {item.title}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
