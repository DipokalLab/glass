import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Grid,
  Center,
  Text3D,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
} from "@react-three/drei";
import {
  EffectComposer,
  HueSaturation,
  TiltShift2,
} from "@react-three/postprocessing";
import { memo, type JSX } from "react";
import { RGBELoader } from "three-stdlib";
import { easing } from "maath";

type MaterialConfig = {
  backside: boolean;
  backsideThickness: number;
  thickness: number;
  samples: number;
  transmission: number;
  clearcoat: number;
  clearcoatRoughness: number;
  chromaticAberration: number;
  anisotropy: number;
  roughness: number;
  distortion: number;
  distortionScale: number;
  temporalDistortion: number;
  ior: number;
  color: string;
};

interface GlassTextProps
  extends Omit<JSX.IntrinsicElements["group"], "children"> {
  height?: number;
  text: string;
  config: MaterialConfig;
  environment: boolean;
  children: React.ReactNode;
}

function GlassText({
  height = 0.3,
  text,
  config,
  children,
  ...props
}: GlassTextProps) {
  const fontUrl = "/font/Pretendard_Bold.json";
  const fontThinUrl = "/font/Pretendard_Thin.json";
  const texture = useLoader(RGBELoader, "/image/fireplace_1k.hdr");

  return (
    <>
      <group {...props}>
        <Center scale={1} key={text} front top>
          <Text3D
            castShadow
            bevelEnabled
            font={fontUrl}
            scale={5}
            letterSpacing={-0.03}
            height={height}
            bevelSize={0.01}
            bevelSegments={3}
            curveSegments={64}
            bevelThickness={0.01}
          >
            {text}
            <MeshTransmissionMaterial
              backside={true}
              backsideThickness={0.13}
              anisotropicBlur={0.1}
              transmission={1}
              roughness={0.4}
              dispersion={0.1}
              distortionScale={0.09}
              thickness={0.15}
              ior={1.5}
              chromaticAberration={0.1}
              anisotropy={0.1}
              //   background={texture}
            />
          </Text3D>
        </Center>
        <group>
          <Center
            position={[0.1, 0.2, 0.75]}
            scale={[0.925, 0.875, 1]}
            key={text}
            front
            top
          >
            <Text3D
              bevelEnabled={true}
              font={fontThinUrl}
              scale={5}
              letterSpacing={0.1}
              height={0.01}
              bevelSize={0.01}
              bevelSegments={1}
              curveSegments={10}
              bevelThickness={0.01}
            >
              {text}
              <meshBasicMaterial />
            </Text3D>
          </Center>
        </group>
      </group>
    </>
  );
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        -12.5 + state.pointer.x,
        12.5 + state.pointer.y,
        15 + Math.atan(state.pointer.x * 2),
      ],
      0.5,
      delta
    );
    state.camera.lookAt(2, -1, 0);
  });

  return null;
}

const Shadows = memo(({ shadow }: { shadow: string }) => (
  <AccumulativeShadows
    frames={100}
    color={shadow}
    colorBlend={5}
    toneMapped={true}
    alphaTest={0.9}
    opacity={1.3}
    scale={30}
    position={[0, -1.01, 0]}
  >
    <RandomizedLight
      amount={4}
      radius={8}
      position={[0, 10, -10]}
      size={15}
      mapSize={256}
    />
  </AccumulativeShadows>
));

export const GlassScene = ({ text }: { text: string }) => {
  const controls = {
    saturation: -1,
    environment: true,
    backside: true,
    backsideThickness: 0.3,
    thickness: 0.15,
    samples: 6,
    transmission: 0.6,
    clearcoat: 1,
    clearcoatRoughness: 0.5,
    chromaticAberration: 1,
    anisotropy: 0.2,
    roughness: 0,
    distortion: 0,
    distortionScale: 0.09,
    temporalDistortion: 0.0,
    ior: 1.5,
    color: "#ff9cf5",
    stripes: "#444",
    shadow: "black",
  };

  const { stripes, environment, shadow, ...materialConfig } = controls;
  return (
    <div style={{ width: "512px", height: "512px" }}>
      <Canvas
        shadows
        orthographic
        id="maincanvas"
        gl={{ preserveDrawingBuffer: true, antialias: false }}
        className="rounded-lg border-1 border-gray-900"
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [-10, 10, 10], zoom: 75, near: 0.1, far: 1000 }}
      >
        <color attach="background" args={["#141420"]} />
        <group position={[0, 1, 0]}>
          <GlassText
            environment={environment}
            config={materialConfig}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1, 2.25]}
            text={text}
          >
            {text}
          </GlassText>
          <Shadows key={text} shadow={shadow} />
          <Grid
            position={[0, -1, 0]}
            cellSize={2.25}
            cellThickness={1}
            cellColor="#3a3a3a"
            sectionSize={5.5}
            sectionThickness={1.5}
            sectionColor={stripes}
            fadeDistance={40}
            fadeStrength={1}
            infiniteGrid
          />
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
        <EffectComposer enableNormalPass={false} multisampling={4}>
          <HueSaturation hue={6} saturation={controls.saturation} />
          <TiltShift2 blur={0.15} />
        </EffectComposer>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
};
