import { ResponsiveCanvas, StudioEnvironment, EffectText3D } from "./_shared";

export type GoldOptions = {
  roughness: number;
};

export const GoldScene = ({
  text,
  options,
  isRender = false,
}: {
  text: string;
  options: GoldOptions;
  isRender?: boolean;
}) => {
  return (
    <ResponsiveCanvas background="#161009" isRender={isRender}>
      <ambientLight intensity={0.5} color="#fff1cc" />
      <directionalLight position={[0, 100, 60]} intensity={6} color="#fff3d6" />
      <StudioEnvironment />
      <EffectText3D text={text}>
        <meshStandardMaterial
          color="#ffd35a"
          metalness={1}
          roughness={options?.roughness ?? 0.25}
          envMapIntensity={1.4}
        />
      </EffectText3D>
    </ResponsiveCanvas>
  );
};
