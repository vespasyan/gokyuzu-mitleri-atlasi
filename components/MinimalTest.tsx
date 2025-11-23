"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function BasicSphere() {
  return (
    <mesh>
      <sphereGeometry />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

function SimpleGLB() {
  const gltf = useGLTF("/models/sirius/sirius.glb");
  
  if (!gltf?.scene) {
    return <BasicSphere />;
  }
  
  return <primitive object={gltf.scene} scale={0.1} />;
}

export default function MinimalTest() {
  return (
    <div className="h-screen w-screen bg-black">
      <Canvas>
        <Suspense fallback={<BasicSphere />}>
          <SimpleGLB />
        </Suspense>
      </Canvas>
    </div>
  );
}