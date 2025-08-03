import { useResolutionStore } from "@/features/canvas/store";
import {
  Center,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
// import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  EquirectangularReflectionMapping,
  TextureLoader,
  type Mesh,
} from "three";

export type GlowOptions = {
  bloomIntensity: number;
  chromaticAberration: number;
};

export const GlowScene = ({
  text,
  size = 512,
  options,
  isRender = false,
}: {
  text: string;
  size: number;
  options: GlowOptions;
  isRender?: boolean;
}) => {
  const texture = useLoader(TextureLoader, "/image/texture.png");
  texture.mapping = EquirectangularReflectionMapping;

  const displaySize = 1024;
  const { width, height } = useResolutionStore();

  const render = () => {
    return (
      <Canvas
        id="maincanvas"
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 7] }}
        className="rounded-lg border-1 border-neutral-900"
        dpr={size / displaySize}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} color={"#ffffff"} />
        <directionalLight
          position={[0, 100, 60]}
          intensity={30}
          color={"#ffffff"}
        />
        <Environment>
          <Lightformer
            form="rect"
            intensity={4}
            position={[-5, 5, -5]}
            scale={4}
          />
          <Lightformer
            form="rect"
            intensity={4}
            position={[5, 10, 5]}
            scale={10}
            map={texture}
          />
          <Lightformer
            form="rect"
            intensity={4}
            position={[5, -5, 5]}
            scale={10}
            map={texture}
          />
          <Lightformer
            form="rect"
            intensity={4}
            position={[-5, 0, 15]}
            scale={30}
            map={texture}
          />
        </Environment>
        <GlowText text={text} />
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

export function GlowText({ text }: { text: string }) {
  const fontUrl = "/font/Pretendard_Bold.json";

  const textRef = useRef<Mesh>(null);

  // useFrame((state) => {
  //   if (textRef.current) {
  //     textRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
  //   }
  // });

  return (
    <group ref={textRef}>
      <Center key={text}>
        <Text3D
          size={1}
          font={fontUrl}
          height={0.5}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.05}
        >
          {text}
          <MeshTransmissionMaterial
            background={undefined}
            backside={true}
            anisotropicBlur={0.1}
            transmission={0.999}
            roughness={0.04}
            thickness={0.03}
            ior={10.5}
            chromaticAberration={0.1}
            anisotropy={0.1}
            emissive="#000000"
            emissiveIntensity={1}
          />
        </Text3D>
      </Center>
    </group>
  );
}
