'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';

function StarModel({ position }: { position: [number, number, number] }) {
  // Placeholder for .glb model loading
  // Users can add their own .glb models to /public/models
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial 
        color="#d4af37" 
        emissive="#d4af37" 
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function ConstellationStars() {
  // Sample constellation points (can be expanded with actual Turkish mythological constellation data)
  const starPositions: [number, number, number][] = [
    [2, 1, -5],
    [3, 2, -5],
    [1, 3, -5],
    [4, 2.5, -5],
    [-2, 1.5, -5],
    [-3, 2, -5],
    [-1, 3, -5],
  ];

  return (
    <>
      {starPositions.map((pos, index) => (
        <StarModel key={index} position={pos} />
      ))}
    </>
  );
}

export default function StarScene() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={0.3} />
          
          {/* Point light for star illumination */}
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {/* Background stars */}
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1}
          />
          
          {/* Constellation stars */}
          <ConstellationStars />
          
          {/* Camera controls */}
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minDistance={3}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
