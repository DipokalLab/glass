import { Center, MeshTransmissionMaterial, Text3D } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export default function GlassText({ text }: { text: string }) {
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
