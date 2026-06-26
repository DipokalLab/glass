import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { ResponsiveCanvas, StudioEnvironment, EffectText3D } from "./_shared";

export type GlitchOptions = Record<string, never>;

export const GlitchScene = ({
  text,
  isRender = false,
}: {
  text: string;
  options?: GlitchOptions;
  isRender?: boolean;
}) => {
  return (
    <ResponsiveCanvas background="#05060a" isRender={isRender}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 8, 6]} intensity={3} />
      <StudioEnvironment />
      <EffectText3D text={text}>
        <meshStandardMaterial
          color="#9b5cff"
          metalness={0.6}
          roughness={0.2}
          emissive="#1a0033"
        />
      </EffectText3D>
      <EffectComposer>
        <Glitch />
      </EffectComposer>
    </ResponsiveCanvas>
  );
};
