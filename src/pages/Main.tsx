import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import My3DText from "@/components/three/Text";
import { EquirectangularReflectionMapping, TextureLoader } from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";

function GlassWithLocalReflection() {
  const texture = useLoader(TextureLoader, "/image/texture.png");

  texture.mapping = EquirectangularReflectionMapping;

  return <Environment map={texture} />;
}

export default function HomePage() {
  const texture = useLoader(TextureLoader, "/image/texture.png");

  texture.mapping = EquirectangularReflectionMapping;
  return (
    <main className="h-full w-full h-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} color={"#ffffff"} />
        <pointLight position={[10, 10, 10]} intensity={30} color={"#ffffff"} />
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

        {/* <GlassWithLocalReflection /> */}

        <My3DText />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.025}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>

        <OrbitControls />
      </Canvas>
    </main>
  );
}
