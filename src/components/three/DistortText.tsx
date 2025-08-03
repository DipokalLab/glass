import { useResolutionStore } from "@/features/canvas/store";
import {
  Center,
  GradientTexture,
  MeshDistortMaterial,
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { useRef } from "react";
import {
  EquirectangularReflectionMapping,
  TextureLoader,
  type Mesh,
} from "three";

export type DistortOptions = {
  bloomIntensity: number;
  chromaticAberration: number;
  distortSpeed: number;
};

export const DistortScene = ({
  text,
  options,
  isRender = false,
}: {
  text: string;
  options: DistortOptions;
  isRender?: boolean;
}) => {
  const texture = useLoader(TextureLoader, "/image/texture.png");
  texture.mapping = EquirectangularReflectionMapping;
  const { width, height } = useResolutionStore();

  const render = () => {
    return (
      <Canvas
        id="maincanvas"
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 7] }}
        className="rounded-lg border-1 border-neutral-900"
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} color={"#ffffff"} />
        <directionalLight
          position={[0, 100, 60]}
          intensity={30}
          color={"#ffffff"}
        />
        <DistortText text={text} distortSpeed={options.distortSpeed} />

        <EffectComposer>
          <Bloom
            intensity={options.bloomIntensity}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.025}
            mipmapBlur
          />
          <ChromaticAberration
            offset={[options.chromaticAberration, options.chromaticAberration]}
          />
        </EffectComposer>
        <OrbitControls enablePan={false} />
      </Canvas>
    );
  };

  if (isRender) {
    return <>{render()}</>;
  }

  return (
    <div
      className="bg-gray-900 rounded-lg shadow-inner overflow-hidden"
      style={{
        width: `${width}px`,
        aspectRatio: `${width} / ${height}`,
        maxWidth: "100%",
        transition: "width 0.3s ease",
      }}
    >
      {render()}
    </div>
  );
};

export function DistortText({
  text,
  distortSpeed = 5,
}: {
  text: string;
  distortSpeed: number;
}) {
  const fontUrl = "/font/Pretendard_Bold.json";

  const textRef = useRef<Mesh>(null);
  const ref = useRef(null);

  return (
    <group ref={textRef}>
      <Center key={text}>
        <Text3D
          size={1}
          font={fontUrl}
          height={0.5}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0}
          bevelSize={0}
        >
          {text}
          <MeshDistortMaterial ref={ref} speed={distortSpeed}>
            <GradientTexture
              stops={[0, 0.8, 1]}
              colors={["#e63946", "#f1faee", "#a8dadc"]}
              size={100}
            />
          </MeshDistortMaterial>
        </Text3D>
      </Center>
    </group>
  );
}
