import { useMemo } from "react";
import { CanvasTexture } from "three";
import { ResponsiveCanvas, EffectText3D } from "./_shared";

export type MatcapOptions = Record<string, never>;

// Build a soft "clay/metal" matcap procedurally so no external asset is needed.
function useProceduralMatcap() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Base sphere shading: light upper-left, dark lower-right.
    const grad = ctx.createRadialGradient(
      size * 0.35,
      size * 0.3,
      size * 0.05,
      size * 0.5,
      size * 0.5,
      size * 0.6
    );
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.45, "#8a93b8");
    grad.addColorStop(1, "#1a1d2b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Specular highlight.
    const spec = ctx.createRadialGradient(
      size * 0.32,
      size * 0.28,
      0,
      size * 0.32,
      size * 0.28,
      size * 0.22
    );
    spec.addColorStop(0, "rgba(255,255,255,0.9)");
    spec.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = spec;
    ctx.fillRect(0, 0, size, size);

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function MatcapMesh({ text }: { text: string }) {
  const matcap = useProceduralMatcap();
  return (
    <EffectText3D text={text}>
      <meshMatcapMaterial matcap={matcap} />
    </EffectText3D>
  );
}

export const MatcapScene = ({
  text,
  isRender = false,
}: {
  text: string;
  options?: MatcapOptions;
  isRender?: boolean;
}) => {
  return (
    <ResponsiveCanvas background="#101018" isRender={isRender}>
      <MatcapMesh text={text} />
    </ResponsiveCanvas>
  );
};
