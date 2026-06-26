import { Outlines } from "@react-three/drei";
import { ResponsiveCanvas, EffectText3D } from "./_shared";

export type ToonOptions = {
  color: string;
  outlineThickness: number;
};

export const ToonScene = ({
  text,
  options,
  isRender = false,
}: {
  text: string;
  options: ToonOptions;
  isRender?: boolean;
}) => {
  return (
    <ResponsiveCanvas background="#1b1b26" isRender={isRender}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 6]} intensity={2.5} />
      <directionalLight position={[-6, -2, -4]} intensity={0.6} />
      <EffectText3D text={text}>
        <meshToonMaterial color={options?.color ?? "#ff6090"} />
        <Outlines
          thickness={options?.outlineThickness ?? 0.025}
          color="black"
        />
      </EffectText3D>
    </ResponsiveCanvas>
  );
};
