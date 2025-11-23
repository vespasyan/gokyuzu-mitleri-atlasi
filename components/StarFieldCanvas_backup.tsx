'use client'

import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'
import { Star } from '@/lib/types'

interface StarPointProps {
  star: Star
  isSelected: boolean
  onClick: (star: Star) => void
}

function StarPoint({ star, isSelected, onClick }: StarPointProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const outerGlowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Debug için
  useEffect(() => {
    console.log(`${star.turkishName} hover state:`, hovered)
  }, [hovered, star.turkishName])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Yıldızların hafif titreşimi ve döndürme
      const time = state.clock.elapsedTime
      const xCoord = star.coordinates.x || 0
      meshRef.current.position.y += Math.sin(time * 2 + xCoord) * 0.001
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.005
      
      // Seçili yıldızın büyümesi
      const targetScale = isSelected ? 2.2 : hovered ? 1.6 : 1.0
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
    
    // Işık efektlerinin animasyonu
    if (glowRef.current) {
      const time = state.clock.elapsedTime
      glowRef.current.rotation.z += 0.02
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      if (material && material.opacity !== undefined) {
        material.opacity = 0.3 + Math.sin(time * 3) * 0.1
      }
    }
    
    if (outerGlowRef.current) {
      const time = state.clock.elapsedTime
      outerGlowRef.current.rotation.z -= 0.01
      outerGlowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    onClick(star)
  }

  // Parlaklığa göre boyut hesaplama (magnitude ne kadar düşükse o kadar parlak)
  const baseSize = Math.max(0.25, 1.0 - star.magnitude * 0.12)
  
  return (
    <group position={[star.coordinates.x || 0, star.coordinates.y || 0, star.coordinates.z || 0]}>
      {/* Ana yıldız - 3D kristal görünümü */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          console.log('Hover IN:', star.turkishName)
          setHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          console.log('Hover OUT:', star.turkishName)
          setHovered(false)
        }}
        castShadow
        receiveShadow
      >
        {/* Ana yıldız geometrisi - daha detaylı */}
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshPhysicalMaterial 
          color={star.color}
          emissive={star.color}
          emissiveIntensity={isSelected ? 2.0 : hovered ? 1.5 : 1.0}
          metalness={0.1}
          roughness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          transparent={true}
          opacity={0.95}
          transmission={0.3}
          thickness={0.8}
          ior={1.5}
          reflectivity={0.9}
        />
      </mesh>
      
      {/* İç ışık efekti - dönen halo */}
      <mesh ref={glowRef}>
        <torusGeometry args={[baseSize * 1.8, baseSize * 0.4, 16, 64]} />
        <meshBasicMaterial 
          color={star.color} 
          transparent 
          opacity={isSelected ? 0.6 : hovered ? 0.4 : 0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Orta katman parıltı */}
      <mesh>
        <sphereGeometry args={[baseSize * 2.5, 24, 24]} />
        <meshBasicMaterial 
          color={star.color} 
          transparent 
          opacity={isSelected ? 0.3 : hovered ? 0.2 : 0.12}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Dış parıltı efekti */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[baseSize * 4, 32, 32]} />
        <meshBasicMaterial 
          color={star.color} 
          transparent 
          opacity={isSelected ? 0.2 : hovered ? 0.15 : 0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Çoklu Lens Flare Efektleri */}
      {/* Ana horizontal flare */}
      <mesh>
        <planeGeometry args={[baseSize * 6, baseSize * 0.15]} />
        <meshBasicMaterial 
          color={star.color}
          transparent
          opacity={isSelected ? 0.9 : hovered ? 0.7 : 0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Ana vertical flare */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[baseSize * 6, baseSize * 0.15]} />
        <meshBasicMaterial 
          color={star.color}
          transparent
          opacity={isSelected ? 0.9 : hovered ? 0.7 : 0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Diagonal flare 1 */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[baseSize * 4, baseSize * 0.1]} />
        <meshBasicMaterial 
          color={star.color}
          transparent
          opacity={isSelected ? 0.6 : hovered ? 0.4 : 0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Diagonal flare 2 */}
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <planeGeometry args={[baseSize * 4, baseSize * 0.1]} />
        <meshBasicMaterial 
          color={star.color}
          transparent
          opacity={isSelected ? 0.6 : hovered ? 0.4 : 0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Çekirdek parlaklık */}
      <mesh>
        <sphereGeometry args={[baseSize * 0.8, 16, 16]} />
        <meshBasicMaterial 
          color="white"
          transparent
          opacity={isSelected ? 0.8 : hovered ? 0.6 : 0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Yıldız adı (büyük ve belirgin) */}
      <Text
        position={[0, baseSize + (isSelected ? 0.8 : 0.6), 0]}
        fontSize={isSelected ? 0.35 : 0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="#000000"
        strokeWidth={0.02}
        strokeColor="#000000"
      >
        {star.turkishName}
      </Text>
    </group>
  )
}

function StarField({ stars, onStarClick, selectedStarId }: {
  stars: Star[]
  onStarClick: (star: Star) => void
  selectedStarId?: string
}) {
  const { camera } = useThree()
  
  useEffect(() => {
    // Kamera pozisyonunu ayarla - daha uzak başlangıç
    camera.position.set(0, 0, 35)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <>
      {/* 3D Aydınlatma Sistemi */}
      <ambientLight intensity={0.2} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.4} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.15} color="#4169e1" />
      <spotLight
        position={[0, 20, 10]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.25}
        color="#ffffff"
        castShadow
      />
      
      {/* Arka plan yıldızları */}
      <Stars radius={50} depth={50} count={800} factor={2} saturation={0} fade speed={0.3} />
      
      {/* Interaktif yıldızlar */}
      {stars.map((star) => (
        <StarPoint
          key={star.id}
          star={star}
          isSelected={selectedStarId === star.id}
          onClick={onStarClick}
        />
      ))}
      
      {/* Orbit kontrolü */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={15}
        maxDistance={60}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
    </>
  )
}

interface StarFieldCanvasProps {
  stars: Star[]
  onStarClick: (star: Star) => void
  selectedStarId?: string
  className?: string
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-star-400/20 border-t-star-400 animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-cosmic-400 animate-spin" style={{ animationDelay: '0.1s' }}></div>
      </div>
    </div>
  )
}

export default function StarFieldCanvas({ stars, onStarClick, selectedStarId, className }: StarFieldCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 35], fov: 75, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        shadows="soft"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['#030315']} />
        <fog attach="fog" args={['#030315', 30, 100]} />
        <Suspense fallback={null}>
          <StarField 
            stars={stars} 
            onStarClick={onStarClick} 
            selectedStarId={selectedStarId} 
          />
        </Suspense>
      </Canvas>
      
      {/* Yükleme durumu için overlay */}
      <Suspense fallback={<LoadingSpinner />}>
        <div style={{ display: 'none' }} />
      </Suspense>
    </div>
  )
}