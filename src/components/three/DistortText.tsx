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
}: {
  text: string;
  options: DistortOptions;
}) => {
  const texture = useLoader(TextureLoader, "/image/texture.png");
  texture.mapping = EquirectangularReflectionMapping;

  return (
    <div style={{ width: "512px", height: "512px" }}>
      <Canvas
        id="maincanvas"
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 7] }}
        className="rounded-lg border-1 border-neutral-900"
        style={{ width: "100%", height: "100%" }}
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
