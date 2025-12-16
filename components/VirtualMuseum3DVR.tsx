'use client'

import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { VRButton, XR, createXRStore } from '@react-three/xr'
import * as THREE from 'three'
import Image from 'next/image'

interface VirtualMuseum3DVRProps {
  isVRMode?: boolean
}

// Artwork Frame Component
function ArtworkFrame({ 
  position, 
  imageUrl, 
  title, 
  scale = [2, 1.5, 0.1] 
}: { 
  position: [number, number, number]
  imageUrl: string
  title: string
  scale?: [number, number, number]
}) {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[scale[0] + 0.2, scale[1] + 0.2, 0.05]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Artwork plane */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[scale[0], scale[1]]} />
        <meshStandardMaterial>
          <primitive attach="map" object={new THREE.TextureLoader().load(imageUrl)} />
        </meshStandardMaterial>
      </mesh>
      
      {/* Label */}
      <Html
        position={[0, -(scale[1] / 2) - 0.3, 0.1]}
        center
        distanceFactor={5}
        style={{
          background: 'rgba(0,0,0,0.8)',
          padding: '8px 16px',
          borderRadius: '8px',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          userSelect: 'none'
        }}
      >
        {title}
      </Html>
    </group>
  )
}

// Museum Scene
function MuseumScene() {
  const artworks = [
    { imageUrl: '/images/Vr_images/sirius-light.png', title: "Çoban Yıldızı'nın Işığı" },
    { imageUrl: '/images/Vr_images/kayra-han-tahti.png', title: "Kayra Han'ın Tahtı" },
    { imageUrl: '/images/Vr_images/EAB.png', title: "Erlik ve Ay Burkancı" },
    { imageUrl: '/images/Vr_images/GDK.png', title: "Göktürk Damgası Kozmik" },
    { imageUrl: '/images/Vr_images/DS.png', title: "Devlet Simgesi" }
  ]

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <spotLight position={[0, 5, 0]} intensity={0.5} angle={0.6} penumbra={1} />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#404050"
          metalness={0.2} 
          roughness={0.8}
        >
          <primitive 
            attach="map" 
            object={(() => {
              const texture = new THREE.TextureLoader().load('/images/Marble_Pattern_v1.png')
              texture.wrapS = THREE.RepeatWrapping
              texture.wrapT = THREE.RepeatWrapping
              texture.repeat.set(3, 3)
              return texture
            })()} 
          />
        </meshStandardMaterial>
      </mesh>
      
      {/* Walls */}
      <mesh position={[0, 3, -8]} receiveShadow>
        <boxGeometry args={[30, 6, 0.2]} />
        <meshStandardMaterial color="#353545" roughness={0.9}>
          <primitive 
            attach="map" 
            object={(() => {
              const texture = new THREE.TextureLoader().load('/images/wallpaper_pattern_v2.png')
              texture.wrapS = THREE.RepeatWrapping
              texture.wrapT = THREE.RepeatWrapping
              texture.repeat.set(3, 1)
              return texture
            })()} 
          />
        </meshStandardMaterial>
      </mesh>
      
      <mesh position={[-8, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 6, 0.2]} />
        <meshStandardMaterial color="#353545" roughness={0.9}>
          <primitive 
            attach="map" 
            object={(() => {
              const texture = new THREE.TextureLoader().load('/images/wallpaper_pattern_v2.png')
              texture.wrapS = THREE.RepeatWrapping
              texture.wrapT = THREE.RepeatWrapping
              texture.repeat.set(2, 1)
              return texture
            })()} 
          />
        </meshStandardMaterial>
      </mesh>
      
      <mesh position={[8, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 6, 0.2]} />
        <meshStandardMaterial color="#353545" roughness={0.9}>
          <primitive 
            attach="map" 
            object={(() => {
              const texture = new THREE.TextureLoader().load('/images/wallpaper_pattern_v2.png')
              texture.wrapS = THREE.RepeatWrapping
              texture.wrapT = THREE.RepeatWrapping
              texture.repeat.set(2, 1)
              return texture
            })()} 
          />
        </meshStandardMaterial>
      </mesh>
      
      {/* Artworks on back wall */}
      <ArtworkFrame position={[-5, 2, -7.8]} imageUrl={artworks[0].imageUrl} title={artworks[0].title} />
      <ArtworkFrame position={[0, 2, -7.8]} imageUrl={artworks[1].imageUrl} title={artworks[1].title} />
      <ArtworkFrame position={[5, 2, -7.8]} imageUrl={artworks[2].imageUrl} title={artworks[2].title} />
      
      {/* Artworks on left wall */}
      <ArtworkFrame 
        position={[-7.8, 2, -3]} 
        imageUrl={artworks[3].imageUrl} 
        title={artworks[3].title}
      />
      <ArtworkFrame 
        position={[-7.8, 2, 3]} 
        imageUrl={artworks[4].imageUrl} 
        title={artworks[4].title}
      />
      
      {/* Artworks on right wall */}
      <ArtworkFrame 
        position={[7.8, 2, -3]} 
        imageUrl={artworks[0].imageUrl} 
        title={artworks[0].title}
      />
      <ArtworkFrame 
        position={[7.8, 2, 3]} 
        imageUrl={artworks[1].imageUrl} 
        title={artworks[1].title}
      />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  )
}

export default function VirtualMuseum3DVR({ isVRMode = false }: VirtualMuseum3DVRProps) {
  const store = useMemo(() => createXRStore(), [])
  
  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black z-[200]">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-dark-500">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-star-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white text-xl font-semibold">3D Müze Yükleniyor...</p>
          </div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 1.6, 8], fov: 50 }}
          gl={{ antialias: true }}
          shadows
        >
          {isVRMode ? (
            <XR store={store}>
              <MuseumScene />
            </XR>
          ) : (
            <>
              <MuseumScene />
              <OrbitControls 
                enableDamping 
                dampingFactor={0.05}
                maxPolarAngle={Math.PI / 2}
                minDistance={2}
                maxDistance={20}
                target={[0, 1.6, 0]}
              />
            </>
          )}
        </Canvas>
        
        {/* WebXR VR Button */}
        {isVRMode && <VRButton store={store} />}
      </Suspense>

      {/* Controls Info */}
      {!isVRMode && (
        <div className="fixed bottom-8 left-8 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-gray-700 z-[70] shadow-2xl">
          <h3 className="text-white font-bold mb-3 text-lg">🎮 Kontroller</h3>
          <div className="space-y-2 text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">🖱️</span>
              <span><strong>Sol Tık + Sürükle:</strong> Döndür</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🖱️</span>
              <span><strong>Sağ Tık + Sürükle:</strong> Kaydır</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🖱️</span>
              <span><strong>Tekerlek:</strong> Yakınlaş/Uzaklaş</span>
            </div>
          </div>
        </div>
      )}

      {/* Museum Title */}
      <div className="fixed top-8 left-8 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-sm rounded-lg p-5 border border-purple-500/50 z-[70] shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-1">🏛️ Sanal Müze</h2>
        <p className="text-purple-200 text-base font-medium">Türk Mitolojisi Sanat Galerisi</p>
        {isVRMode && <p className="text-green-300 text-sm mt-2">🥽 VR Modu Aktif</p>}
      </div>
    </div>
  )
}
