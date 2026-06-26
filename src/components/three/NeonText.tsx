import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type MeshStandardMaterial } from "three";
import { ResponsiveCanvas, EffectText3D } from "./_shared";

export type NeonOptions = {
  glowIntensity: number;
  color: string;
};

function NeonMesh({ text, color }: { text: string; color: string }) {
  const matRef = useRef<MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!matRef.current) return;
    // Subtle flicker around a bright baseline.
    const t = state.clock.getElapsedTime();
    const flicker = 2.5 + Math.sin(t * 18) * 0.15 + Math.sin(t * 47) * 0.1;
    matRef.current.emissiveIntensity = flicker;
  });

  return (
    <EffectText3D text={text}>
      <meshStandardMaterial
        ref={matRef}
        color={color}
        emissive={color}
        emissiveIntensity={2.5}
        toneMapped={false}
      />
    </EffectText3D>
  );
}

export const NeonScene = ({
  text,
  options,
  isRender = false,
}: {
  text: string;
  options: NeonOptions;
  isRender?: boolean;
}) => {
  const color = options?.color ?? "#39ff14";

  return (
    <ResponsiveCanvas background="#04040a" isRender={isRender}>
      <ambientLight intensity={0.2} />
      <NeonMesh text={text} color={color} />
      <EffectComposer>
        <Bloom
          intensity={options?.glowIntensity ?? 2.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.04}
          mipmapBlur
        />
      </EffectComposer>
    </ResponsiveCanvas>
  );
};
