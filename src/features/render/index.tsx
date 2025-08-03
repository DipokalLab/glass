import {
  DistortScene,
  type DistortOptions,
} from "@/components/three/DistortText";
import { FlatScene } from "@/components/three/FlatText";
import { GlassScene } from "@/components/three/GlassText";
import { GlowScene, type GlowOptions } from "@/components/three/GlowText";

export function Render({
  textId,
  text,
  size,
  options,
  isRender = false,
}: {
  textId: string;
  text: string;
  size: number;
  options: object;
  isRender: boolean;
}) {
  return (
    <>
      {textId == "glow" && (
        <GlowScene text={text} size={size} options={options as GlowOptions} />
      )}
      {textId == "glass" && <GlassScene text={text} />}
      {textId == "distort" && (
        <DistortScene
          text={text}
          options={options as DistortOptions}
          isRender={isRender}
        />
      )}
      {textId == "flat" && <FlatScene text={text} isRender={isRender} />}
    </>
  );
}
