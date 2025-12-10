'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

console.log('VirtualMuseum3D component loaded')

export default function VirtualMuseum3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  console.log('VirtualMuseum3D component rendering')

  useEffect(() => {
    console.log('useEffect started, containerRef.current:', containerRef.current)
    if (!containerRef.current) return

    console.log('Initializing 3D Museum...')

    // Store container ref at start to use in cleanup
    const container = containerRef.current

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0f)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 1.6, 3)
    camera.lookAt(0, 1.6, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    
    // Set canvas styles for visibility
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.zIndex = '1'
    
    container.appendChild(renderer.domElement)
    console.log('Renderer created, size:', window.innerWidth, window.innerHeight)
    console.log('Canvas element:', renderer.domElement)

    container.appendChild(renderer.domElement)
    console.log('Renderer created, size:', window.innerWidth, window.innerHeight)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = true
    controls.rotateSpeed = 0.5
    controls.panSpeed = 0.5
    controls.target.set(0, 1.6, 0)
    controls.maxPolarAngle = Math.PI / 1.8
    controls.minDistance = 0.5
    controls.maxDistance = 25
    controls.update()
    console.log('Controls initialized')

    // Lighting - Much brighter
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 2)
    mainLight.position.set(10, 15, 10)
    mainLight.castShadow = true
    mainLight.shadow.mapSize.width = 2048
    mainLight.shadow.mapSize.height = 2048
    scene.add(mainLight)

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.5)
    frontLight.position.set(0, 5, 15)
    scene.add(frontLight)

    const backLight = new THREE.DirectionalLight(0xffffff, 1)
    backLight.position.set(0, 5, -15)
    scene.add(backLight)

    console.log('Lights added')

    // Floor - Marble style
    const floorGeometry = new THREE.PlaneGeometry(40, 40)
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2d2d3a,
      roughness: 0.6,
      metalness: 0.2
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    // Ceiling
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ 
        color: 0x1a1a24,
        roughness: 0.8
      })
    )
    ceiling.rotation.x = Math.PI / 2
    ceiling.position.y = 6
    scene.add(ceiling)

    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1f1f2e,
      roughness: 0.9
    })

    // Back wall
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 8),
      wallMaterial
    )
    backWall.position.set(0, 3, -15)
    scene.add(backWall)

    // Left wall
    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 8),
      wallMaterial
    )
    leftWall.rotation.y = Math.PI / 2
    leftWall.position.set(-15, 3, 0)
    scene.add(leftWall)

    // Right wall
    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 8),
      wallMaterial
    )
    rightWall.rotation.y = -Math.PI / 2
    rightWall.position.set(15, 3, 0)
    scene.add(rightWall)

    // Front wall
    const frontWall = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 8),
      wallMaterial
    )
    frontWall.rotation.y = Math.PI
    frontWall.position.set(0, 3, 15)
    scene.add(frontWall)

    console.log('Museum structure created')

    // Load artworks with proper error handling
    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = 'anonymous'
    
    const artworks = [
      {
        name: 'Sirius - Çoban Yıldızı',
        images: [
          '/images/Vr_images/sirius-light.png',
          '/images/Vr_images/sirius_light_2.png',
          '/images/Vr_images/sirius_light_3.png',
          '/images/Vr_images/sirius_light_4.png'
        ]
      },
      {
        name: 'Kayra Han\'ın Tahtı',
        images: [
          '/images/Vr_images/kayra-han-tahti.png',
          '/images/Vr_images/kayra-han-tahti_2.png',
          '/images/Vr_images/kayra-han-tahti_3.png',
          '/images/Vr_images/kayra-han-tahti_4.png'
        ]
      },
      {
        name: 'Gök Demir Kazık',
        images: [
          '/images/Vr_images/GDK.png',
          '/images/Vr_images/GDK_2.png',
          '/images/Vr_images/GDK_3.png',
          '/images/Vr_images/GDK_4.png'
        ]
      },
      {
        name: 'Ebe Ana Burçağı',
        images: [
          '/images/Vr_images/EAB.png',
          '/images/Vr_images/EAB_2.png',
          '/images/Vr_images/EAB_3.png',
          '/images/Vr_images/EAB_4.png'
        ]
      },
      {
        name: 'Kartal Yıldızı',
        images: [
          '/images/Vr_images/DS.png',
          '/images/Vr_images/DS_2.png',
          '/images/Vr_images/DS_3.png',
          '/images/Vr_images/DS_4.png'
        ]
      }
    ]

    let loadedImages = 0
    const totalImages = artworks.reduce((sum, art) => sum + art.images.length, 0)

    // Distribute artworks on all 4 walls
    let imageIndex = 0
    
    artworks.forEach((artwork) => {
      artwork.images.forEach((imagePath) => {
        console.log(`Loading image ${imageIndex + 1}/${totalImages}: ${imagePath}`)
        
        // Calculate position based on image index (distribute across all walls)
        let posX = 0
        const posY = 2.5
        let posZ = 0
        let rotationY = 0
        
        // Back wall - 5 images
        if (imageIndex < 5) {
          posX = -8 + (imageIndex * 4)
          posZ = -14.9
          rotationY = 0
        }
        // Right wall - 5 images
        else if (imageIndex < 10) {
          const idx = imageIndex - 5
          posX = 14.9
          posZ = -8 + (idx * 4)
          rotationY = -Math.PI / 2
        }
        // Front wall - 5 images
        else if (imageIndex < 15) {
          const idx = imageIndex - 10
          posX = 8 - (idx * 4)
          posZ = 14.9
          rotationY = Math.PI
        }
        // Left wall - 5 images
        else {
          const idx = imageIndex - 15
          posX = -14.9
          posZ = 8 - (idx * 4)
          rotationY = Math.PI / 2
        }
        
        textureLoader.load(
          imagePath,
          (texture) => {
            loadedImages++
            console.log(`✓ Loaded ${loadedImages}/${totalImages}: ${artwork.name} - Size: ${texture.image.width}x${texture.image.height}`)

            // Ensure texture is ready
            texture.needsUpdate = true
            texture.colorSpace = THREE.SRGBColorSpace

            // Frame
            const frameGeometry = new THREE.BoxGeometry(2.6, 3.2, 0.15)
            const frameMaterial = new THREE.MeshStandardMaterial({ 
              color: 0x3d2817,
              roughness: 0.7,
              metalness: 0.1
            })
            const frame = new THREE.Mesh(frameGeometry, frameMaterial)
            frame.position.set(posX, posY, posZ)
            frame.rotation.y = rotationY
            frame.castShadow = true
            scene.add(frame)

            // Artwork
            const artGeometry = new THREE.PlaneGeometry(2.4, 3.0)
            const artMaterial = new THREE.MeshBasicMaterial({ 
              map: texture,
              side: THREE.DoubleSide
            })
            const artPlane = new THREE.Mesh(artGeometry, artMaterial)
            
            // Position artwork IN FRONT of the wall based on wall direction
            let artX = posX
            let artZ = posZ
            
            // Back wall (facing +Z)
            if (rotationY === 0) {
              artZ = posZ + 0.1
            }
            // Right wall (facing -X)
            else if (rotationY === -Math.PI / 2) {
              artX = posX - 0.1
            }
            // Front wall (facing -Z)
            else if (rotationY === Math.PI || rotationY === -Math.PI) {
              artZ = posZ - 0.1
            }
            // Left wall (facing +X)
            else if (rotationY === Math.PI / 2) {
              artX = posX + 0.1
            }
            
            artPlane.position.set(artX, posY, artZ)
            artPlane.rotation.y = rotationY
            scene.add(artPlane)
            
            console.log(`Artwork ${loadedImages} at (${artX.toFixed(1)}, ${posY}, ${artZ.toFixed(1)}) rotation: ${rotationY.toFixed(2)}`)

            // Label
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (ctx) {
              canvas.width = 512
              canvas.height = 128
              ctx.fillStyle = '#1a1a1a'
              ctx.fillRect(0, 0, canvas.width, canvas.height)
              ctx.font = 'bold 28px Arial'
              ctx.fillStyle = '#ffffff'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillText(artwork.name, canvas.width / 2, canvas.height / 2)

              const labelTexture = new THREE.CanvasTexture(canvas)
              const labelGeometry = new THREE.PlaneGeometry(2.2, 0.5)
              const labelMaterial = new THREE.MeshBasicMaterial({ 
                map: labelTexture,
                transparent: true
              })
              const label = new THREE.Mesh(labelGeometry, labelMaterial)
              
              // Position label at same X/Z as artwork, just below it
              label.position.set(artX, posY - 1.8, artZ)
              label.rotation.y = rotationY
              scene.add(label)
            }
          },
          (progress) => {
            if (progress.lengthComputable) {
              const percent = (progress.loaded / progress.total * 100).toFixed(0)
              console.log(`Loading ${imagePath}: ${percent}%`)
            }
          },
          (error) => {
            console.error(`✗ Failed to load ${imagePath}:`, error)
            loadedImages++
          }
        )
        
        imageIndex++
      })
    })

    console.log(`Started loading ${totalImages} images`)

    // Animation loop
    let frameCount = 0
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      frameCount++
      if (frameCount % 60 === 0) {
        console.log('Animation running, frame:', frameCount)
      }
      
      controls.update()
      renderer.render(scene, camera)
    }
    
    console.log('Starting animation loop NOW')
    animate()
    console.log('Animation loop started')

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      console.log('Resized:', window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      console.log('Cleaning up 3D Museum')
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      
      if (renderer) {
        renderer.dispose()
      }
      
      if (container && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black z-[200]">
      <div ref={containerRef} className="relative w-full h-full" />
      
      {/* Controls Info */}
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

      {/* Museum Title */}
      <div className="fixed top-8 left-8 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-sm rounded-lg p-5 border border-purple-500/50 z-[70] shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-1">🏛️ Sanal Müze</h2>
        <p className="text-purple-200 text-base font-medium">Türk Mitolojisi Sanat Galerisi</p>
        <p className="text-purple-300 text-sm mt-2">20 Dijital Eser</p>
      </div>
    </div>
  )
}
