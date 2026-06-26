import { useResolutionStore } from "@/features/canvas/store";
import {
  Center,
  Environment,
  Lightformer,
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type ReactNode } from "react";

/**
 * Shared responsive Canvas wrapper used by the effect scenes.
 * Mirrors the boilerplate of the original effects: a fixed "maincanvas"
 * canvas for capture, wrapped in a resolution-aware container when not rendering.
 */
export function ResponsiveCanvas({
  children,
  background = "#000000",
  camera = { position: [0, 0, 7] },
  shadows = false,
  dpr,
  isRender = false,
}: {
  children: ReactNode;
  background?: string;
  camera?: object;
  shadows?: boolean;
  dpr?: number;
  isRender?: boolean;
}) {
  const { width, height } = useResolutionStore();

  const canvas = (
    <Canvas
      id="maincanvas"
      shadows={shadows}
      gl={{ preserveDrawingBuffer: true }}
      camera={camera}
      dpr={dpr}
      className="rounded-lg border-1 border-neutral-900"
    >
      <color attach="background" args={[background]} />
      {children}
      <OrbitControls enablePan={false} />
    </Canvas>
  );

  if (isRender) {
    return <>{canvas}</>;
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
      {canvas}
    </div>
  );
}

/**
 * Lightformer-based studio environment (no network HDRI). Provides the
 * reflections needed by metallic / iridescent materials.
 */
export function StudioEnvironment() {
  return (
    <Environment resolution={64}>
      <group rotation={[-Math.PI / 4, -0.3, 0]}>
        <Lightformer
          form="rect"
          intensity={3}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-10, 0, -1]}
          scale={[10, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[10, 1, 0]}
          scale={[20, 10, 1]}
        />
        <Lightformer
          form="ring"
          intensity={3}
          position={[0, 2, 8]}
          scale={4}
        />
      </group>
    </Environment>
  );
}

/**
 * Shared Text3D mesh. Children are the material element(s).
 */
export function EffectText3D({
  text,
  children,
  height = 0.5,
  bevelThickness = 0.05,
  bevelSize = 0.05,
}: {
  text: string;
  children: ReactNode;
  height?: number;
  bevelThickness?: number;
  bevelSize?: number;
}) {
  return (
    <Center key={text}>
      <Text3D
        size={1}
        font="/font/Pretendard_Bold.json"
        height={height}
        curveSegments={12}
        bevelEnabled
        bevelThickness={bevelThickness}
        bevelSize={bevelSize}
      >
        {text}
        {children}
      </Text3D>
    </Center>
  );
}
