import { ResponsiveCanvas, StudioEnvironment, EffectText3D } from "./_shared";

export type HolographicOptions = {
  iridescenceIOR: number;
  roughness: number;
};

export const HolographicScene = ({
  text,
  options,
  isRender = false,
}: {
  text: string;
  options: HolographicOptions;
  isRender?: boolean;
}) => {
  return (
    <ResponsiveCanvas background="#08080d" isRender={isRender}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 100, 60]} intensity={5} />
      <StudioEnvironment />
      <EffectText3D text={text}>
        <meshPhysicalMaterial
          color="#dfe7ff"
          metalness={0.9}
          roughness={options?.roughness ?? 0.2}
          iridescence={1}
          iridescenceIOR={options?.iridescenceIOR ?? 1.8}
          iridescenceThicknessRange={[100, 800]}
          envMapIntensity={1.4}
        />
      </EffectText3D>
    </ResponsiveCanvas>
  );
};
