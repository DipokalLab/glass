import { useState } from "react";

/**
 * Thumbnail for an effect. Tries /imglist/{id}.png and, if it is missing
 * (new effects without a captured thumbnail), falls back to a neutral box
 * showing the effect's first letter.
 */
export function EffectThumb({
  id,
  title,
  className = "",
  draggable,
}: {
  id: string;
  title: string;
  className?: string;
  draggable?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 ${className}`}
      >
        <span className="text-base font-semibold uppercase">
          {title.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={`/imglist/${id}.png`}
      alt={title}
      draggable={draggable}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
