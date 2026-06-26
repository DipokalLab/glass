import { ResponsiveCanvas, StudioEnvironment, EffectText3D } from "./_shared";

export type ChromeOptions = {
  roughness: number;
};

export const ChromeScene = ({
  text,
  options,
  isRender = false,
}: {
  text: string;
  options: ChromeOptions;
  isRender?: boolean;
}) => {
  return (
    <ResponsiveCanvas background="#0b0b0f" isRender={isRender}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 100, 60]} intensity={6} />
      <StudioEnvironment />
      <EffectText3D text={text}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={options?.roughness ?? 0.1}
          envMapIntensity={1.5}
        />
      </EffectText3D>
    </ResponsiveCanvas>
  );
};
