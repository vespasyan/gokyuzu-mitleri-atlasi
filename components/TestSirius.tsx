"use client";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Fallback star component
function FallbackStar() {
  const starRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!starRef.current) return;
    starRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <mesh ref={starRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color="#9ecbff"
        emissive="#4488ff"
        emissiveIntensity={0.5}
        metalness={0.2}
        roughness={0.1}
      />
    </mesh>
  );
}

// GLB Model component (optimized single file)
function SiriusGLTFModel() {
  const gltf = useGLTF("/models/sirius/sirius.glb");
  const modelRef = useRef<THREE.Group>(null!);
  
  console.log("GLB Model loaded:", gltf);
  console.log("Scene exists:", !!gltf?.scene);
  
  useEffect(() => {
    if (!modelRef.current || !gltf?.scene) return;
    
    // Apply materials
    modelRef.current.traverse((child) => {
      if ((child as any).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.isMeshStandardMaterial) {
          mat.metalness = 0.2;
          mat.roughness = 0.25;
          mat.emissive = new THREE.Color("#9ecbff");
          mat.emissiveIntensity = 1.0;
          mat.needsUpdate = true;
        }
      }
    });
  }, [gltf]);

  useFrame((state) => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  if (!gltf?.scene) {
    return <FallbackStar />;
  }

  return (
    <group ref={modelRef}>
      <primitive object={gltf.scene} scale={0.1} />
    </group>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-b from-slate-900 to-black">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-sm">Sirius modeli yükleniyor...</p>
      </div>
    </div>
  );
}

export default function TestScene() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <color attach="background" args={["#050816"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 3]} intensity={0.8} />
        
        <Environment preset="studio" />
        
        <Suspense fallback={<FallbackStar />}>
          <SiriusGLTFModel />
        </Suspense>
        
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={1.0} />
        </EffectComposer>
        
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </Suspense>
  );
}