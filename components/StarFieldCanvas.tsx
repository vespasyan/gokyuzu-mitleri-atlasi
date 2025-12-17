"use client";

import React, { useRef, useEffect, Suspense, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Text, useTexture } from "@react-three/drei";
import { VRButton, XR, createXRStore } from "@react-three/xr";
import * as THREE from "three";
import { Star } from '@/lib/types';

type Props = {
  stars?: Star[];
  onStarClick?: (s: Star) => void;
  selectedStarId?: string | number;
  isVRMode?: boolean;
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
  
  // Logo texture yükleme
  const logoTexture = star.logo ? useTexture(star.logo) : null;
  
  // Debug: Yıldız koordinatlarını console'a yazdır
  useEffect(() => {
    console.log(`⭐ ${star.turkishName || star.name} pozisyonu:`, {
      x: star.coordinates?.x,
      y: star.coordinates?.y,
      z: star.coordinates?.z,
      logo: star.logo
    });
  }, [star]);
  
  return (
    <group position={[star.coordinates?.x || 0, star.coordinates?.y || 0, star.coordinates?.z || 0]}>
      {star.logo ? (
        // Logo görüntüleme
        <>
          <mesh
            ref={meshRef}
            onClick={(e) => { e.stopPropagation(); onStarClick(star); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
          >
            <planeGeometry args={[baseSize * 4, baseSize * 4]} />
            <meshBasicMaterial 
              map={logoTexture} 
              transparent 
              opacity={isSelected ? 1.0 : hovered ? 0.9 : 0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Logo için hafif parlama efekti */}
          <pointLight 
            position={[0, 0, 0]} 
            color="#ffffff" 
            intensity={isSelected ? 1.5 : hovered ? 1.0 : 0.5} 
            distance={5}
          />
        </>
      ) : (
        // Normal yıldız görüntüleme
        <>
          {/* Outer glow - larger, transparent sphere */}
          <mesh>
            <sphereGeometry args={[baseSize * 2.5, 16, 16]} />
            <meshBasicMaterial
              color={star.color || "#9bb0ff"}
              transparent
              opacity={isSelected ? 0.25 : hovered ? 0.15 : 0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          
          {/* Inner glow */}
          <mesh>
            <sphereGeometry args={[baseSize * 1.5, 16, 16]} />
            <meshBasicMaterial
              color={star.color || "#9bb0ff"}
              transparent
              opacity={isSelected ? 0.4 : hovered ? 0.3 : 0.15}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          
          {/* Main star */}
          <mesh
            ref={meshRef}
            onClick={(e) => { e.stopPropagation(); onStarClick(star); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
          >
            <sphereGeometry args={[baseSize, 24, 24]} />
            <meshPhysicalMaterial
              color={star.color || "#9bb0ff"}
              emissive={star.color || "#9bb0ff"}
              emissiveIntensity={isSelected ? 2.5 : hovered ? 1.8 : 1.2}
              metalness={0.1}
              roughness={0.2}
              transparent
              opacity={0.95}
              clearcoat={0.5}
              clearcoatRoughness={0.1}
            />
          </mesh>
        </>
      )}
      
      {/* Point light for star illumination */}
      <pointLight 
        position={[0, 0, 0]} 
        color={star.color || "#9bb0ff"} 
        intensity={isSelected ? 2.0 : hovered ? 1.2 : 0.8} 
        distance={5}
      />
      
      {/* Yıldız adı */}
      <Text
        position={[0, baseSize + 0.3, 0]}
        fontSize={isSelected ? 0.25 : 0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
        outlineOpacity={0.8}
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
      target={[0, 2, 0]} // Kameranın baktığı nokta - y=2 seviyesi
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
      {/* Background - Deep space */}
      <color attach="background" args={["#000814"]} />
      <fog attach="fog" args={["#000814", 50, 200]} />
      
      {/* Enhanced lighting for better star visibility */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#a8d5ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffd4a8" />
      
      {/* Enhanced background stars - more dense and varied */}
      <Stars radius={100} depth={80} count={5000} factor={4} saturation={0.2} fade speed={0.5} />
      
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

export default function StarFieldCanvas({ stars = [], onStarClick, selectedStarId, isVRMode = false }: Props) {
  // Canvas için kapsayıcı div (event kaynağı)
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [controlsRef, setControlsRef] = useState<any>(null);
  const store = useMemo(() => createXRStore(), []);

  // window/document gibi erişimleri modül üstünde değil, effect içinde yap
  useEffect(() => {
    // Error handling
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // İlk yüklemede otomatik zoom out yap
  useEffect(() => {
    if (controlsRef) {
      // 500ms bekle ve zoom out yap
      const timer = setTimeout(() => {
        const camera = controlsRef.object;
        const target = controlsRef.target;
        const direction = new THREE.Vector3().subVectors(camera.position, target).normalize();
        const newPosition = target.clone().add(direction.multiplyScalar(camera.position.distanceTo(target) * 1.25));
        camera.position.copy(newPosition);
        controlsRef.update();
        console.log('✓ Başlangıç zoom out uygulandı');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [controlsRef]);

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
          camera={{ position: [0, 2, 60], fov: 50 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            outputColorSpace: THREE.SRGBColorSpace,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true,
          }}
          onCreated={({ gl }) => {
            if (isVRMode) {
              gl.xr.enabled = true;
              console.log('✓ WebXR enabled for StarField');
            }
          }}
          onError={() => setHasError(true)}
        >
          {isVRMode ? (
            <XR store={store}>
              <Scene 
                stars={stars} 
                onStarClick={onStarClick} 
                selectedStarId={selectedStarId}
                onControlsReady={setControlsRef}
              />
            </XR>
          ) : (
            <Scene 
              stars={stars} 
              onStarClick={onStarClick} 
              selectedStarId={selectedStarId}
              onControlsReady={setControlsRef}
            />
          )}
        </Canvas>
      </Suspense>
      
      {/* WebXR VR Button */}
      {isVRMode && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
          <VRButton 
            store={store}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s',
            }}
          />
        </div>
      )}
    </div>
  );
}