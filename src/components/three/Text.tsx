import { Center, MeshTransmissionMaterial, Text3D } from "@react-three/drei";

export default function My3DText() {
  const fontUrl = "/font/Pretendard_Bold.json";

  return (
    <Center>
      <Text3D
        size={1}
        font={fontUrl}
        height={0.5}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.05}
      >
        3D TEXT
        {/* <meshPhysicalMaterial
          transmission={1.0}
          roughness={0.0}
          metalness={0.0}
          ior={1.5}
          thickness={0.5}
          dispersion={0.5}
          specularIntensity={1.0}
          color="white"
        /> */}
        {/* <meshMatcapMaterial map={textureMat} /> */}
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
  );
}
