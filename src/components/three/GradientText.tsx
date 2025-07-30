import {
  Center,
  OrbitControls,
  shaderMaterial,
  Text3D,
} from "@react-three/drei";
import { Canvas, extend, useLoader } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  SSAO,
} from "@react-three/postprocessing";
// import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  EquirectangularReflectionMapping,
  TextureLoader,
  type Mesh,
} from "three";
import * as THREE from "three";

export const GradientScene = ({ text }: { text: string }) => {
  const texture = useLoader(TextureLoader, "/image/texture.png");
  texture.mapping = EquirectangularReflectionMapping;

  return (
    <div style={{ width: "512px", height: "512px" }}>
      <Canvas
        id="maincanvas"
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 7] }}
        className="rounded-lg border-1 border-gray-900"
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} color={"#ffffff"} />
        <directionalLight
          position={[0, 100, 60]}
          intensity={30}
          color={"#ffffff"}
        />
        <GradientText text={text} />
        <EffectComposer>
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
};

declare module "@react-three/fiber" {
  interface ThreeElements {
    depthGradientMaterial: React.RefAttributes<THREE.ShaderMaterial> & {
      colorA?: THREE.Color | string | number;
      colorB?: THREE.Color | string | number;
      depth?: number;
    };
  }
}

// 깊이 기반 그라디언트 셰이더 재질
const DepthGradientMaterial = shaderMaterial(
  {
    colorA: new THREE.Color("#ffffff"), // 앞면 색 (흰색)
    colorB: new THREE.Color("#000000"), // 뒷면 색 (검은색)
    depth: 0.5,
  },
  // Vertex Shader
  `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  // Fragment Shader
  `
      varying vec3 vPosition;
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform float depth;
      void main() {
        // vPosition.z는 0(앞)에서 -depth(뒤)의 값을 가집니다.
        // 이 값을 0~1 범위로 정규화합니다.
        float mixValue = clamp(vPosition.z / -depth, 0.0, 1.0);
        
        // mix 함수로 색상을 섞습니다.
        gl_FragColor = vec4(mix(colorA, colorB, mixValue), 1.0);
      }
    `
);

// 컴포넌트로 사용하기 위해 extend
extend({ DepthGradientMaterial });

export function GradientText({ text }: { text: string }) {
  const fontUrl = "/font/Pretendard_Bold.json";

  const textRef = useRef<Mesh>(null);
  const textDepth = 0.5;

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
          <depthGradientMaterial
            colorA="#ffffff"
            colorB="#000000"
            depth={textDepth}
          />
        </Text3D>
      </Center>
    </group>
  );
}
