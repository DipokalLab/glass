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

export const DistortScene = ({ text }: { text: string }) => {
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
        <DistortText text={text} />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.025}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
};

export function DistortText({ text }: { text: string }) {
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
          <MeshDistortMaterial ref={ref} speed={5}>
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
