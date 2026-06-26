import {
  DistortScene,
  type DistortOptions,
} from "@/components/three/DistortText";
import { FlatScene } from "@/components/three/FlatText";
import { GlassScene } from "@/components/three/GlassText";
import { GlowScene, type GlowOptions } from "@/components/three/GlowText";
import { ChromeScene, type ChromeOptions } from "@/components/three/ChromeText";
import { GoldScene, type GoldOptions } from "@/components/three/GoldText";
import {
  HolographicScene,
  type HolographicOptions,
} from "@/components/three/HolographicText";
import { NeonScene, type NeonOptions } from "@/components/three/NeonText";
import { ToonScene, type ToonOptions } from "@/components/three/ToonText";
import { MatcapScene } from "@/components/three/MatcapText";
import { WobbleScene, type WobbleOptions } from "@/components/three/WobbleText";
import { GlitchScene } from "@/components/three/GlitchText";
import { PixelScene, type PixelOptions } from "@/components/three/PixelText";

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
        <GlowScene
          text={text}
          size={size}
          options={options as GlowOptions}
          isRender={isRender}
        />
      )}
      {textId == "glass" && <GlassScene text={text} isRender={isRender} />}
      {textId == "distort" && (
        <DistortScene
          text={text}
          options={options as DistortOptions}
          isRender={isRender}
        />
      )}
      {textId == "flat" && <FlatScene text={text} isRender={isRender} />}
      {textId == "chrome" && (
        <ChromeScene
          text={text}
          options={options as ChromeOptions}
          isRender={isRender}
        />
      )}
      {textId == "gold" && (
        <GoldScene
          text={text}
          options={options as GoldOptions}
          isRender={isRender}
        />
      )}
      {textId == "holographic" && (
        <HolographicScene
          text={text}
          options={options as HolographicOptions}
          isRender={isRender}
        />
      )}
      {textId == "neon" && (
        <NeonScene
          text={text}
          options={options as NeonOptions}
          isRender={isRender}
        />
      )}
      {textId == "toon" && (
        <ToonScene
          text={text}
          options={options as ToonOptions}
          isRender={isRender}
        />
      )}
      {textId == "matcap" && <MatcapScene text={text} isRender={isRender} />}
      {textId == "wobble" && (
        <WobbleScene
          text={text}
          options={options as WobbleOptions}
          isRender={isRender}
        />
      )}
      {textId == "glitch" && <GlitchScene text={text} isRender={isRender} />}
      {textId == "pixel" && (
        <PixelScene
          text={text}
          options={options as PixelOptions}
          isRender={isRender}
        />
      )}
    </>
  );
}
