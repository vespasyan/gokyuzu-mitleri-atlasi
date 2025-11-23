"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

// Enhanced GLB loader with proper hooks order
function DiagnosticGLBModel() {
  const hasLogged = useRef(false);
  const hasFileChecked = useRef(false);

  // Always call useGLTF at the top level - no conditional logic before hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const gltf = useGLTF("/models/sirius/sirius.glb");

  // File accessibility test - always run useEffect
  useEffect(() => {
    if (!hasFileChecked.current) {
      hasFileChecked.current = true;
      
      console.log("=== TESTING GLB FILE ACCESS ===");
      fetch("/models/sirius/sirius.glb")
        .then(response => {
          console.log("Fetch status:", response.status);
          console.log("Content-Type:", response.headers.get('content-type'));
          console.log("Content-Length:", response.headers.get('content-length'));
          
          if (!response.ok) {
            console.error("File not accessible:", response.statusText);
            return null;
          }
          
          return response.arrayBuffer();
        })
        .then(buffer => {
          if (buffer) {
            console.log("GLB file size:", buffer.byteLength, "bytes");
            console.log("File is accessible via HTTP");
          }
        })
        .catch(error => {
          console.error("File fetch error:", error);
        });
    }
  }, []);

  // GLB analysis - always run useEffect
  useEffect(() => {
    if (!hasLogged.current) {
      hasLogged.current = true;
      
      console.log("=== GLB LOADER ANALYSIS ===");
      
      if (gltf) {
        console.log("useGLTF returned:", typeof gltf);
        console.log("GLB object keys:", Object.keys(gltf || {}));
        console.log("Has scene:", !!gltf?.scene);
        console.log("Scene type:", gltf?.scene?.type);
        console.log("Scene children count:", gltf?.scene?.children?.length || 0);
        
        if (gltf?.materials) {
          console.log("Materials:", Object.keys(gltf.materials));
        }
        if (gltf?.animations) {
          console.log("Animations count:", gltf.animations.length);
        }
      } else {
        console.warn("useGLTF returned null/undefined");
      }
      console.log("===============================");
    }
  }, [gltf]);

  // Handle missing scene
  if (!gltf?.scene) {
    return (
      <mesh>
        <sphereGeometry />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
    );
  }

  // Success case
  console.log("Rendering GLB scene");
  return <primitive object={gltf.scene} scale={0.1} />;
}

export default function GLBDiagnostic() {
  return (
    <div className="h-screen w-screen bg-black">
      <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg text-sm z-10">
        <h3 className="font-bold mb-2">GLB Diagnostic</h3>
        <p>Check browser console (F12) for detailed GLB information</p>
        <p>File: /models/sirius/sirius.glb</p>
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
          <DiagnosticGLBModel />
        </Suspense>
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}