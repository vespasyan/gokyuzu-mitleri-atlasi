"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

// Simple fallback star
function FallbackStar() {
  return (
    <mesh>
      <sphereGeometry />
      <meshBasicMaterial color="#4488ff" />
    </mesh>
  );
}

// Simple GLB loader
function SiriusGLBModel() {
  const gltf = useGLTF("/models/sirius/sirius.glb");
  
  console.log("Sirius GLB loaded:", !!gltf?.scene);
  
  if (!gltf?.scene) {
    console.warn("No scene found in GLB, using fallback");
    return <FallbackStar />;
  }

  return <primitive object={gltf.scene} scale={0.1} />;
}

export default function SiriusScene() {
  return (
    <div className="h-screen w-screen bg-black">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        onError={(error) => console.error("Canvas error:", error)}
      >
        <color attach="background" args={["#050816"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        
        <Suspense fallback={<FallbackStar />}>
          <SiriusGLBModel />
        </Suspense>
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}
