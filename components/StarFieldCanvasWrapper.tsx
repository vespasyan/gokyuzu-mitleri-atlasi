"use client";

import React, { Suspense } from "react";
import SimpleStarField from './SimpleStarField';
import { ErrorBoundary } from './ErrorBoundary';
import { Star } from '@/lib/types';

// Lazy import with fallback to SimpleStarField
const StarFieldCanvasImpl = React.lazy(() => 
  import('./StarFieldCanvas').catch(() => ({
    default: SimpleStarField
  }))
);

interface Props {
  stars?: Star[];
  onStarClick?: (s: Star) => void;
  selectedStarId?: string | number;
}

export default function StarFieldCanvasWrapper({ stars = [], onStarClick, selectedStarId }: Props) {
  // Debug what's happening
  React.useEffect(() => {
    console.log('🎬 StarFieldCanvasWrapper mounted');
    
    // Check after 3 seconds if we have a canvas or fallback
    setTimeout(() => {
      const hasCanvas = document.querySelector('canvas');
      const hasFallback = document.querySelector('[class*="gradient-to-b"]'); // SimpleStarField has this class
      
      console.log('🔍 Component analysis:');
      console.log('  - Canvas element:', !!hasCanvas);
      console.log('  - CSS fallback active:', !!hasFallback);
      console.log('  - Stars count:', stars.length);
      
      if (!hasCanvas && hasFallback) {
        console.log('❌ RUNNING IN CSS FALLBACK MODE!');
        console.log('   StarFieldCanvas failed to load - using SimpleStarField');
        
        // Add fake zoom functions for CSS mode
        type WindowWithZoom = Window & typeof globalThis & { zoomIn?: () => void; zoomOut?: () => void };
        const w = window as WindowWithZoom;
        w.zoomIn = () => {
          console.log('📏 CSS Fallback: Zoom in attempt');
          alert('3D scene failed to load - zoom not available');
        };
        w.zoomOut = () => {
          console.log('📏 CSS Fallback: Zoom out attempt');  
          alert('3D scene failed to load - zoom not available');
        };
      } else if (hasCanvas) {
        console.log('✅ 3D CANVAS ACTIVE - StarFieldCanvas loaded successfully');
      } else {
        console.log('⏳ Still loading...');
      }
    }, 3000);
    
  }, [stars.length]);

  return (
    <ErrorBoundary 
      fallback={
        <div>
          <SimpleStarField 
            stars={stars} 
            onStarClick={onStarClick} 
            selectedStarId={selectedStarId} 
          />
          <div className="absolute top-4 left-4 text-red-400 text-sm bg-black/50 p-2 rounded z-50">
            ❌ 3D scene failed - CSS fallback active
          </div>
        </div>
      }
    >
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-slate-900">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-sm">3D sahne yükleniyor...</p>
          </div>
        </div>
      }>
        <StarFieldCanvasImpl 
          stars={stars} 
          onStarClick={onStarClick} 
          selectedStarId={selectedStarId} 
        />
      </Suspense>
    </ErrorBoundary>
  );
}