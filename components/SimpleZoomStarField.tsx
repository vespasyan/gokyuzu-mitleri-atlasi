"use client";

import React, { useState, useRef, useEffect } from "react";
import { Star } from '@/lib/types';

interface Props {
  stars?: Star[];
  onStarClick?: (s: Star) => void;
  selectedStarId?: string | number;
  isVRMode?: boolean;
}

export default function SimpleZoomStarField({ stars = [], onStarClick, selectedStarId, isVRMode = false }: Props) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 }); // 3D rotation angles
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastRotation, setLastRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // VR mode not implemented in SimpleZoomStarField (2D canvas based)
  // isVRMode parameter added for compatibility but ignored
  
  // Initialize component
  useEffect(() => {
    console.log('🎯 SimpleZoomStarField: Initializing...');
    
    // Wait for component to be fully mounted
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
      console.log('✅ SimpleZoomStarField: Initialized');
    }, 100);
    
    return () => clearTimeout(initTimer);
  }, []);

  // Register zoom functions globally for buttons
  useEffect(() => {
    if (!isInitialized) return;
    
    console.log('🎯 SimpleZoomStarField: Registering zoom functions');
    
    (window as Window & { zoomIn?: () => void; zoomOut?: () => void }).zoomIn = () => {
      console.log('🔍 Zoom In: Current zoom:', zoom);
      setZoom(prev => {
        const newZoom = Math.min(prev * 1.5, 5);
        console.log('🔍 New zoom:', newZoom);
        return newZoom;
      });
    };
    
    (window as Window & { zoomIn?: () => void; zoomOut?: () => void }).zoomOut = () => {
      console.log('🔍 Zoom Out: Current zoom:', zoom);
      setZoom(prev => {
        const newZoom = Math.max(prev * 0.7, 0.3);
        console.log('🔍 New zoom:', newZoom);
        return newZoom;
      });
    };
    
    console.log('✅ Zoom and pan functions registered successfully!');
    return () => {
      const w = window as Window & { zoomIn?: () => void; zoomOut?: () => void };
      delete w.zoomIn;
      delete w.zoomOut;
    };
  }, [zoom, isInitialized]);

  // Mouse wheel zoom - DISABLED (zoom only with buttons)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    // Mouse wheel zoom disabled - use buttons only
  };

  // Mouse drag for 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button only
      // Don't start dragging if clicking on a button or interactive element
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        console.log('🚫 Ignoring drag start - clicked on button');
        return;
      }
      
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setLastRotation(rotation);
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      // Convert mouse movement to 3D rotation
      const sensitivity = 0.3; // Rotation sensitivity
      
      setRotation({
        x: lastRotation.x + deltaY * sensitivity, // Mouse Y controls X rotation (up/down)
        y: lastRotation.y + deltaX * sensitivity, // Mouse X controls Y rotation (left/right)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch support for mobile 3D rotation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX, y: touch.clientY });
      setLastRotation(rotation);
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;
      
      const sensitivity = 0.3;
      
      setRotation({
        x: lastRotation.x + deltaY * sensitivity,
        y: lastRotation.y + deltaX * sensitivity,
      });
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Calculate star size based on actual stellar radius
  const getStarSize = (star: Star) => {
    // Star radius data (in solar radii) from the JSON
    const starRadii = {
      'sirius': 1.71,     // Çoban Yıldızı
      'vega': 2.36,       // Kayra Han Yıldızı  
      'altair': 1.63,     // Kartal Yıldızı
      'polaris': 37.5,    // Demir Kazık (giant star!)
      'capella': 11.9     // Ebe Ana Yıldızı
    };
    
    const radius = starRadii[star.id as keyof typeof starRadii] || 2.0;
    
    // Scale factor to make sizes visible but not too extreme
    // Base size 12px, with logarithmic scaling for large stars
    const baseSize = 12;
    const scaleFactor = Math.log(radius + 1) * 8;
    
    return Math.max(baseSize, Math.min(baseSize + scaleFactor, 50)); // Cap at 50px
  };

  // Show loading if not initialized or no stars
  if (!isInitialized || stars.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-dark-500">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-star-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Yıldızlar hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 25%, #0f172a 50%, #020617 100%)',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Starfield with rotation and zoom */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `
            perspective(2000px) 
            rotateX(${rotation.x}deg) 
            rotateY(${rotation.y}deg) 
            scale3d(${zoom}, ${zoom}, ${zoom})
          `,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {/* Dense background stars - distributed in 3D sphere with extended coverage */}
        {Array.from({ length: 800 }).map((_, i) => {
          // Generate random spherical coordinates for true 3D distribution with much larger radius
          const radius = 600 + Math.random() * 800; // Much larger outer sphere radius (600-1400px)
          const theta = Math.random() * Math.PI * 2; // Full horizontal rotation (0 to 2π)
          const phi = Math.random() * Math.PI; // Full vertical rotation (0 to π)
          
          // Convert spherical to Cartesian coordinates
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{
                  width: `${0.5 + Math.random() * 1.5}px`,
                  height: `${0.5 + Math.random() * 1.5}px`,
                  opacity: 0.4 + Math.random() * 0.4,
                  transform: `rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                }}
              />
            </div>
          );
        })}

        {/* Medium brightness stars - distributed in 3D sphere with extended coverage */}
        {Array.from({ length: 600 }).map((_, i) => {
          // Generate random spherical coordinates for medium distance sphere with larger radius
          const radius = 350 + Math.random() * 400; // Larger medium sphere radius (350-750px)
          const theta = Math.random() * Math.PI * 2; // Full horizontal rotation
          const phi = Math.random() * Math.PI; // Full vertical rotation
          
          // Convert spherical to Cartesian coordinates
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);
          
          return (
            <div
              key={`med-${i}`}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="rounded-full bg-blue-200"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  opacity: 0.6 + Math.random() * 0.3,
                  transform: `rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                }}
              />
            </div>
          );
        })}

        {/* Far distant stars - for extreme zoom out coverage */}
        {Array.from({ length: 400 }).map((_, i) => {
          // Generate stars at very far distances for complete coverage
          const radius = 1000 + Math.random() * 1000; // Very far sphere radius (1000-2000px)
          const theta = Math.random() * Math.PI * 2; // Full horizontal rotation
          const phi = Math.random() * Math.PI; // Full vertical rotation
          
          // Convert spherical to Cartesian coordinates
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);
          
          return (
            <div
              key={`far-${i}`}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{
                  width: `${0.3 + Math.random() * 0.8}px`, // Smaller distant stars
                  height: `${0.3 + Math.random() * 0.8}px`,
                  opacity: 0.2 + Math.random() * 0.3, // Dimmer distant stars
                  transform: `rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                }}
              />
            </div>
          );
        })}

        {/* Interactive main stars - positioned in 3D space */}
        {stars.map((star) => {
          // Position the 5 mythology stars in true 3D space on a sphere surface with varied depths
          const starIndex = stars.indexOf(star);
          const radius = 200 + starIndex * 35; // Even more varied depths for maximum separation
          
          // Spread stars far apart with front-facing positions for better visibility
          const sphericalPositions = [
            { theta: 0, phi: Math.PI * 0.25 },              // Center top - Sirius (Çoban Yıldızı)
            { theta: Math.PI * 0.7, phi: Math.PI * 0.4 },   // Right - Vega (Kayra Han Yıldızı)
            { theta: -Math.PI * 0.7, phi: Math.PI * 0.4 },  // Left - Altair (Kartal Yıldızı)
            { theta: Math.PI * 0.3, phi: Math.PI * 0.5 },   // Front right - Polaris (Demir Kazık)
            { theta: -Math.PI * 0.3, phi: Math.PI * 0.5 }   // Front left - Capella (Ebe Ana Yıldızı)
          ];
          
          const pos = sphericalPositions[starIndex] || { theta: starIndex * 0.3, phi: Math.PI * 0.4 };
          
          // Convert spherical coordinates to 3D Cartesian
          const x = radius * Math.sin(pos.phi) * Math.cos(pos.theta);
          const y = radius * Math.sin(pos.phi) * Math.sin(pos.theta);
          const z = radius * Math.cos(pos.phi);
          
          return (
            <div
              key={star.id || starIndex}
              className="absolute star-sphere-container"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Extra large clickable area with debug visibility */}
              <button
                className="absolute rounded-full transition-all duration-200"
                style={{
                  width: '80px',
                  height: '80px',
                  background: selectedStarId === star.id 
                    ? 'rgba(255, 215, 0, 0.3)' 
                    : 'transparent',
                  border: selectedStarId === star.id 
                    ? '2px solid rgba(255, 215, 0, 0.8)' 
                    : 'none',
                  cursor: 'pointer',
                  zIndex: 10000 + starIndex,
                  transform: `rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg) translate(-50%, -50%)`,
                  left: '50%',
                  top: '50%',
                  position: 'absolute',
                  pointerEvents: 'auto',
                  boxShadow: selectedStarId === star.id 
                    ? '0 0 15px rgba(255, 215, 0, 0.5)' 
                    : 'none',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🌟 Star clicked:', star.turkishName || star.name, star);
                  onStarClick?.(star);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('🖱️ Mouse down on star:', star.turkishName || star.name);
                }}
                onMouseUp={(e) => {
                  e.stopPropagation();
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.border = '2px solid rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
                  console.log('Hovering star:', star.turkishName || star.name);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = selectedStarId === star.id 
                    ? 'rgba(255, 215, 0, 0.3)' 
                    : 'transparent';
                  e.currentTarget.style.border = selectedStarId === star.id 
                    ? '2px solid rgba(255, 215, 0, 0.8)' 
                    : 'none';
                  e.currentTarget.style.boxShadow = selectedStarId === star.id 
                    ? '0 0 15px rgba(255, 215, 0, 0.5)' 
                    : 'none';
                }}
                title={`${star.turkishName || star.name} - Hikayesini görmek için tıklayın`}
              />
              
              {/* Visual star sphere */}
              <div
                className="star-sphere transition-all duration-300 pointer-events-none"
                style={{
                  width: `${getStarSize(star)}px`,
                  height: `${getStarSize(star)}px`,
                  background: selectedStarId === star.id 
                    ? 'radial-gradient(circle at 30% 30%, #ffd700, #ffed4e, #d4af37, #b8860b)'
                    : 'radial-gradient(circle at 30% 30%, #ffffff, #e6f3ff, #4a90ff, #1e40af)',
                  boxShadow: selectedStarId === star.id
                    ? '0 0 20px #ffd700, 0 0 40px #ffd700, inset -2px -2px 4px rgba(0,0,0,0.3)'
                    : '0 0 15px #4a90ff, 0 0 30px #4a90ff, inset -2px -2px 4px rgba(0,0,0,0.3)',
                  border: 'none',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg) translate(-50%, -50%)`,
                  transformStyle: 'preserve-3d',
                  zIndex: 1000,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Zoom and Rotation indicators */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm space-y-1">
        <div>Zoom: {Math.round(zoom * 100)}%</div>
        <div>Rotation X: {Math.round(rotation.x)}°</div>
        <div>Rotation Y: {Math.round(rotation.y)}°</div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm max-w-xs">
        <div>🔍 Mouse wheel/buttons: Yakınlaştır</div>
        <div>🖱️ Sürükle: 3D görünümü döndür</div>
        <div>⭐ Yıldızlara tıkla: Hikayeleri gör</div>
        <div className="text-yellow-300 mt-1">💡 Yıldızların etrafındaki alana tıklayın</div>
      </div>

      {/* Dragging indicator - only show when actually dragging, not on star hover */}
      {isDragging && (
        <div className="absolute top-4 right-4 bg-blue-500/20 text-white px-3 py-1 rounded-lg text-sm border border-blue-400/50 pointer-events-none">
          🖱️ Rotating...
        </div>
      )}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        @keyframes sphereGlow {
          0%, 100% { 
            box-shadow: 0 0 15px currentColor, 0 0 30px currentColor, inset -2px -2px 4px rgba(0,0,0,0.3);
          }
          50% { 
            box-shadow: 0 0 25px currentColor, 0 0 50px currentColor, inset -2px -2px 4px rgba(0,0,0,0.3);
          }
        }
        .star-sphere-container {
          transform-style: preserve-3d;
          will-change: transform;
          cursor: pointer;
        }
        .star-sphere {
          position: relative;
          animation: sphereGlow 3s ease-in-out infinite;
          transform-style: preserve-3d;
          backface-visibility: visible;
          will-change: transform;
          cursor: pointer !important;
        }
        .star-sphere:hover {
          cursor: pointer !important;
        }
        .star-sphere::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 25%;
          width: 30%;
          height: 30%;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          filter: blur(1px);
          z-index: 1;
          pointer-events: none;
        }
        .star-sphere:hover {
          animation: sphereGlow 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}