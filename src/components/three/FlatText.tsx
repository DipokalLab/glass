import { Canvas } from "@react-three/fiber";
import {
  Center,
  Text3D,
  Environment,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import { type JSX } from "react";
import { useResolutionStore } from "@/features/canvas/store";

interface FlatTextProps
  extends Omit<JSX.IntrinsicElements["group"], "children"> {
  height?: number;
  text: string;
  children: React.ReactNode;
}

function FlatText({ height = 0.3, text }: FlatTextProps) {
  const fontUrl = "/font/Pretendard_Bold.json";

  return (
    <>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 2.25]}>
        <Center scale={1} key={text} front top>
          <Text3D
            castShadow
            receiveShadow
            bevelEnabled
            font={fontUrl}
            scale={5}
            letterSpacing={0.08}
            height={height}
            bevelSize={0.02}
            bevelSegments={30}
            curveSegments={128}
            bevelThickness={0.01}
          >
            {text}
            <meshStandardMaterial color={"#ffffff"} />
          </Text3D>
        </Center>
      </group>
    </>
  );
}

export const FlatScene = ({
  text,
  isRender = false,
}: {
  text: string;
  isRender?: boolean;
}) => {
  const { width, height } = useResolutionStore();

  const render = () => {
    return (
      <Canvas
        shadows
        id="maincanvas"
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        className="rounded-lg border-1 border-neutral-900"
        camera={{ position: [0, 50, 0], fov: 45 }}
      >
        <color attach="background" args={["#d7d7de"]} />
        <ambientLight intensity={2} color={"#c1c1c9"} />
        <directionalLight
          castShadow
          position={[-90, 100, -150]}
          intensity={3}
          color={"#ffffff"}
          shadow-mapSize-width={4192}
          shadow-mapSize-height={4192}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
        />

        <group position={[0, 1, 0]}>
          <FlatText text={text}>{text}</FlatText>
          <mesh
            receiveShadow
            castShadow
            position={[0, -1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#ededf2" />
          </mesh>
        </group>

        <Environment resolution={32}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer
              intensity={2}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            <Lightformer
              intensity={1}
              rotation-y={Math.PI / 2}
              position={[-10, 0, -1]}
              scale={[10, 2, 1]}
            />
            <Lightformer
              intensity={0.5}
              rotation-y={-Math.PI / 2}
              position={[10, 1, 0]}
              scale={[20, 10, 1]}
            />
          </group>
        </Environment>

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
