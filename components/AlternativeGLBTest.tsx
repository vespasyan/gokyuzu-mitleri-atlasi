"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Alternative GLB loader using Three.js directly
function AlternativeGLBModel() {
  const [gltf, setGltf] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = new GLTFLoader();
    
    console.log("=== ALTERNATIVE GLB LOADER ===");
    console.log("Loading GLB with Three.js GLTFLoader directly...");
    
    loader.load(
      "/models/sirius/sirius.glb",
      (loadedGltf) => {
        console.log("✅ GLB loaded successfully with GLTFLoader!");
        console.log("Loaded GLTF:", loadedGltf);
        console.log("Scene:", loadedGltf.scene);
        console.log("Scene children:", loadedGltf.scene.children.length);
        
        setGltf(loadedGltf);
        setLoading(false);
      },
      (progress) => {
        console.log("Loading progress:", (progress.loaded / progress.total * 100) + '%');
      },
      (err) => {
        console.error("❌ GLTFLoader failed:", err);
        const errorMessage = err instanceof Error ? err.message : "GLTFLoader failed";
        setError(errorMessage);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <mesh>
        <sphereGeometry />
        <meshBasicMaterial color="#00ff00" />
      </mesh>
    );
  }

  if (error) {
    return (
      <mesh>
        <sphereGeometry />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
    );
  }

  if (!gltf?.scene) {
    return (
      <mesh>
        <sphereGeometry />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
    );
  }

  return <primitive object={gltf.scene} scale={0.1} />;
}

export default function AlternativeGLBTest() {
  return (
    <div className="h-screen w-screen bg-black">
      <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg text-sm z-10">
        <h3 className="font-bold mb-2">Alternative GLB Test</h3>
        <p>Using Three.js GLTFLoader directly instead of useGLTF</p>
        <p>Green = Loading, Red = Error, Yellow = No Scene, Model = Success</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#050816"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        
        <Suspense fallback={
          <mesh>
            <sphereGeometry />
            <meshBasicMaterial color="#4488ff" />
          </mesh>
        }>
          <AlternativeGLBModel />
        </Suspense>
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}