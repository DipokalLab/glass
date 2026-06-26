import { MeshWobbleMaterial } from "@react-three/drei";
import { ResponsiveCanvas, StudioEnvironment, EffectText3D } from "./_shared";

export type WobbleOptions = {
  factor: number;
  speed: number;
};

export const WobbleScene = ({
  text,
  options,
  isRender = false,
}: {
  text: string;
  options: WobbleOptions;
  isRender?: boolean;
}) => {
  return (
    <ResponsiveCanvas background="#0d1117" isRender={isRender}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 6]} intensity={3} />
      <StudioEnvironment />
      <EffectText3D text={text}>
        <MeshWobbleMaterial
          factor={options?.factor ?? 0.6}
          speed={options?.speed ?? 1}
          color="#5eead4"
          metalness={0.3}
          roughness={0.2}
        />
      </EffectText3D>
    </ResponsiveCanvas>
  );
};
