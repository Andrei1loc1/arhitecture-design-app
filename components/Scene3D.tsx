"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  PresentationControls
} from "@react-three/drei";

function InteriorComposition() {
  return (
    <group position={[0.8, -0.7, 0]} rotation={[0, -0.35, 0]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[8, 7]} />
        <meshStandardMaterial color="#b9ad9f" roughness={0.86} metalness={0.08} />
      </mesh>

      <mesh receiveShadow position={[0, 1.48, -2.4]}>
        <boxGeometry args={[8, 3, 0.16]} />
        <meshStandardMaterial color="#d6d0c6" roughness={0.78} />
      </mesh>

      <mesh receiveShadow position={[-3.1, 1.48, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5, 3, 0.16]} />
        <meshStandardMaterial color="#aaa195" roughness={0.8} />
      </mesh>

      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.12}>
        <mesh castShadow position={[0.45, 0.48, -0.72]}>
          <boxGeometry args={[1.4, 0.94, 1.15]} />
          <meshStandardMaterial color="#26231e" roughness={0.55} metalness={0.14} />
        </mesh>
      </Float>

      <mesh castShadow position={[-1.55, 0.38, -0.3]}>
        <boxGeometry args={[0.78, 0.76, 1.9]} />
        <meshStandardMaterial color="#8e765f" roughness={0.7} />
      </mesh>

      <mesh castShadow position={[1.8, 0.7, -1.15]}>
        <boxGeometry args={[0.32, 1.4, 0.32]} />
        <meshStandardMaterial color="#b99163" roughness={0.48} metalness={0.22} />
      </mesh>

      <mesh castShadow position={[2.05, 1.48, -1.15]}>
        <sphereGeometry args={[0.28, 32, 24]} />
        <meshStandardMaterial
          color="#f4efe6"
          emissive="#b99163"
          emissiveIntensity={0.25}
          roughness={0.35}
        />
      </mesh>

      <mesh castShadow position={[0.9, 0.05, 1.25]}>
        <boxGeometry args={[2.3, 0.1, 0.72]} />
        <meshStandardMaterial color="#191714" roughness={0.62} metalness={0.18} />
      </mesh>

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.45}
        scale={7}
        blur={2.2}
        far={2.8}
      />
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [4.4, 2.35, 4.9], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#080807"]} />
      <ambientLight intensity={0.58} />
      <directionalLight
        castShadow
        position={[3.5, 5.2, 2.6]}
        intensity={2.1}
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        castShadow
        position={[-2.5, 4.2, 3]}
        angle={0.42}
        penumbra={0.7}
        intensity={1.8}
        color="#f0c08c"
      />
      <PresentationControls
        global
        cursor
        speed={1.15}
        zoom={0.94}
        rotation={[0.02, -0.32, 0]}
        polar={[-0.18, 0.18]}
        azimuth={[-0.38, 0.38]}
      >
        <InteriorComposition />
      </PresentationControls>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.08}
      />
      <Environment preset="apartment" />
    </Canvas>
  );
}
