"use client";

import React, { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import { Star } from '@/lib/types';

type Props = {
  stars?: Star[];
  onStarClick?: (s: Star) => void;
  selectedStarId?: string | number;
};

// Loading fallback component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin"></div>
    </div>
  );
}

// Star Point component
function StarPoint({ star, isSelected, onStarClick }: { star: Star; isSelected: boolean; onStarClick: (s: Star) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current && state?.clock) {
      const time = state.clock.elapsedTime;
      // Daha yumuşak animasyon
      meshRef.current.position.y += Math.sin(time * 1.5 + (star.coordinates?.x || 0)) * 0.0005;
      meshRef.current.rotation.y += 0.003;
      
      const targetScale = isSelected ? 1.8 : hovered ? 1.4 : 1.0;
      const targetVector = new THREE.Vector3(targetScale, targetScale, targetScale);
      meshRef.current.scale.lerp(targetVector, 0.08);
    }
  });
  
  const baseSize = Math.max(0.15, 0.8 - (star.magnitude || 0) * 0.1);
  
  return (
    <group position={[star.coordinates?.x || 0, star.coordinates?.y || 0, star.coordinates?.z || 0]}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onStarClick(star); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      >
        <sphereGeometry args={[baseSize, 16, 16]} />
        <meshPhysicalMaterial
          color={star.color || "#9bb0ff"}
          emissive={star.color || "#9bb0ff"}
          emissiveIntensity={isSelected ? 1.5 : hovered ? 1.0 : 0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Yıldız adı */}
      <Text
        position={[0, baseSize + 0.3, 0]}
        fontSize={isSelected ? 0.2 : 0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {star.turkishName || star.name}
      </Text>
    </group>
  );
}

// Camera Controller with enhanced zoom effects
function CameraController({ selectedStar, onControlsReady }: { selectedStar?: Star; onControlsReady?: (controls: unknown) => void }) {
  const { camera } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>();
  const lastDistance = useRef(15);
  const zoomEffect = useRef(0);
  
  useEffect(() => {
    if (!controlsRef.current) return;
    
    // Pass controls reference to parent component
    if (onControlsReady) {
      onControlsReady(controlsRef.current);
    }
    
    if (selectedStar) {
      // Move camera to selected star
      const starPos = new THREE.Vector3(
        selectedStar.coordinates?.x || 0,
        selectedStar.coordinates?.y || 0,
        selectedStar.coordinates?.z || 0
      );
      
      const targetPosition = starPos.clone().add(new THREE.Vector3(0, 0, 3));
      
      // Simple smooth transition
      let progress = 0;
      const startPos = camera.position.clone();
      const startTarget = controlsRef.current.target.clone();
      
      const animate = () => {
        progress += 0.03;
        if (progress >= 1) progress = 1;
        
        camera.position.lerpVectors(startPos, targetPosition, progress);
        controlsRef.current.target.lerpVectors(startTarget, starPos, progress);
        controlsRef.current.update();
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [selectedStar, camera, onControlsReady]);
  
  // Add zoom effect tracking
  useFrame(() => {
    if (!controlsRef.current) return;
    
    const currentDistance = camera.position.distanceTo(controlsRef.current.target);
    const distanceChange = Math.abs(currentDistance - lastDistance.current);
    
    // Detect zoom changes
    if (distanceChange > 0.1) {
      zoomEffect.current = Math.min(distanceChange * 0.5, 2.0);
      lastDistance.current = currentDistance;
    } else {
      // Gradually reduce zoom effect
      zoomEffect.current *= 0.95;
    }
    
    // Apply zoom effect to camera FOV for visual feedback
    if (camera instanceof THREE.PerspectiveCamera && zoomEffect.current > 0.01) {
      const baseFOV = 50;
      const effectFOV = baseFOV + zoomEffect.current * 5;
      camera.fov = THREE.MathUtils.lerp(camera.fov, effectFOV, 0.1);
      camera.updateProjectionMatrix();
    }
  });
  
  return (
    <OrbitControls 
      ref={controlsRef}
      enableDamping 
      dampingFactor={0.1} // Increased for smoother zoom
      rotateSpeed={1.2}
      zoomSpeed={2.0} // Increased zoom speed for more responsiveness
      panSpeed={1.0}
      minDistance={1} // Allow closer zoom
      maxDistance={150} // Allow farther zoom
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      makeDefault
      // Add zoom event handlers for better feedback
      onStart={() => {
        // User started interacting
      }}
      onEnd={() => {
        // User finished interacting - reset FOV
        if (camera instanceof THREE.PerspectiveCamera) {
          const resetFOV = () => {
            camera.fov = THREE.MathUtils.lerp(camera.fov, 50, 0.1);
            camera.updateProjectionMatrix();
            if (Math.abs(camera.fov - 50) > 0.1) {
              requestAnimationFrame(resetFOV);
            }
          };
          requestAnimationFrame(resetFOV);
        }
      }}
    />
  );
}

// Simple working scene
function Scene({ stars, onStarClick, selectedStarId, onControlsReady }: { 
  stars: Star[]; 
  onStarClick?: (s: Star) => void; 
  selectedStarId?: string | number;
  onControlsReady?: (controls: unknown) => void;
}) {
  const selectedStar = stars.find(s => s.id === selectedStarId);
  
  return (
    <>
      {/* Background */}
      <color attach="background" args={["#020617"]} />
      
      {/* Basic lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} />
      
      {/* Background stars */}
      <Stars radius={30} depth={50} count={1000} factor={2} saturation={0} fade speed={0.2} />
      
      {/* Main stars */}
      {stars.map((star) => (
        <StarPoint
          key={star.id}
          star={star}
          isSelected={selectedStarId === star.id}
          onStarClick={onStarClick || (() => {})}
        />
      ))}

      <CameraController selectedStar={selectedStar} onControlsReady={onControlsReady} />
    </>
  );
}

export default function StarFieldCanvas({ stars = [], onStarClick, selectedStarId }: Props) {
  // Canvas için kapsayıcı div (event kaynağı)
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [controlsRef, setControlsRef] = useState<any>(null);

  // window/document gibi erişimleri modül üstünde değil, effect içinde yap
  useEffect(() => {
    // Error handling
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Listen for zoom events from parent component
  useEffect(() => {
    const handleZoomIn = () => {
      if (controlsRef) {
        const camera = controlsRef.object;
        const target = controlsRef.target;
        const direction = new THREE.Vector3().subVectors(camera.position, target).normalize();
        const newPosition = target.clone().add(direction.multiplyScalar(Math.max(1, camera.position.distanceTo(target) * 0.8)));
        camera.position.copy(newPosition);
        controlsRef.update();
      }
    };

    const handleZoomOut = () => {
      if (controlsRef) {
        const camera = controlsRef.object;
        const target = controlsRef.target;
        const direction = new THREE.Vector3().subVectors(camera.position, target).normalize();
        const newPosition = target.clone().add(direction.multiplyScalar(Math.min(150, camera.position.distanceTo(target) * 1.25)));
        camera.position.copy(newPosition);
        controlsRef.update();
      }
    };

    // Listen for custom zoom events
    window.addEventListener('zoom-in', handleZoomIn);
    window.addEventListener('zoom-out', handleZoomOut);

    return () => {
      window.removeEventListener('zoom-in', handleZoomIn);
      window.removeEventListener('zoom-out', handleZoomOut);
    };
  }, [controlsRef]);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900">
        <div className="text-center text-white">
          <p>3D sahne yüklenirken hata oluştu</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Sayfayı Yenile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative">


      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            outputColorSpace: THREE.SRGBColorSpace,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
            powerPreference: "high-performance",
          }}
          onError={() => setHasError(true)}
        >
          <Scene 
            stars={stars} 
            onStarClick={onStarClick} 
            selectedStarId={selectedStarId}
            onControlsReady={setControlsRef}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}