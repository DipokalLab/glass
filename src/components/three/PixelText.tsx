import {
  EffectComposer,
  Pixelation,
  Scanline,
} from "@react-three/postprocessing";
import { ResponsiveCanvas, StudioEnvironment, EffectText3D } from "./_shared";

export type PixelOptions = {
  granularity: number;
};

export const PixelScene = ({
  text,
  options,
  isRender = false,
}: {
  text: string;
  options: PixelOptions;
  isRender?: boolean;
}) => {
  return (
    <ResponsiveCanvas background="#05060a" isRender={isRender}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 6]} intensity={3} />
      <StudioEnvironment />
      <EffectText3D text={text}>
        <meshStandardMaterial
          color="#36d1ff"
          metalness={0.4}
          roughness={0.25}
        />
      </EffectText3D>
      <EffectComposer>
        <Pixelation granularity={options?.granularity ?? 8} />
        <Scanline density={1.25} opacity={0.2} />
      </EffectComposer>
    </ResponsiveCanvas>
  );
};
