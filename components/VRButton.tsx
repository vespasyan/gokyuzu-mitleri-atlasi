'use client'

import { useState, useEffect } from 'react'

interface VRButtonProps {
  onVRModeChange?: (isVRMode: boolean) => void
}

export default function VRButton({ onVRModeChange }: VRButtonProps) {
  const [isVRSupported, setIsVRSupported] = useState(false)
  const [isVRActive, setIsVRActive] = useState(false)

  useEffect(() => {
    // WebXR desteğini kontrol et
    if (typeof navigator !== 'undefined' && 'xr' in navigator) {
      (navigator as any).xr?.isSessionSupported('immersive-vr').then((supported: boolean) => {
        setIsVRSupported(supported)
      }).catch(() => {
        setIsVRSupported(false)
      })
    }
  }, [])

  const handleVRToggle = () => {
    const newState = !isVRActive
    setIsVRActive(newState)
    onVRModeChange?.(newState)
  }

  // Always show button - VR device not required for 3D mode

  return (
    <div className="fixed bottom-6 right-6 z-[200] group">
      <button
        onClick={handleVRToggle}
        className={`px-6 py-3 rounded-lg shadow-xl backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isVRActive
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
        }`}
        title={isVRActive ? 'VR Modundan Çık' : 'VR Moduna Gir'}
      >
        <div className="flex items-center gap-2">
          {isVRActive ? (
            <>
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="font-semibold">VR Aktif</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">{isVRSupported ? 'VR Modu' : '3D Modu'}</span>
            </>
          )}
        </div>
      </button>
      {!isVRSupported && !isVRActive && (
        <div className="absolute top-full mt-2 right-0 px-2 py-1 bg-yellow-600/90 text-white text-xs rounded">
          VR cihazı yok
        </div>
      )}
      <div className="absolute bottom-full mb-2 right-0 w-72 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <p className="font-semibold mb-1">
          {isVRActive ? '🥽 VR Aktif' : (isVRSupported ? '🥽 VR Hazır' : '🎮 3D Modu')}
        </p>
        <p className="text-gray-300 text-xs">
          {isVRActive 
            ? 'VR deneyimi aktif. Çıkmak için tekrar tıklayın.'
            : isVRSupported
              ? '3D sahneye geçer. VR başlığınız varsa, VR deneyimi başlar.'
              : '3D sahneye geçer. VR cihazı bağlı değil, normal 3D görünümü gösterilir.'}
        </p>
      </div>
    </div>
  )
}
