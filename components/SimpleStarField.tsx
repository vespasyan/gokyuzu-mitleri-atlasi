"use client";

import React from "react";

interface Props {
  stars?: any[];
  onStarClick?: (s: any) => void;
  selectedStarId?: string | number;
}

export default function SimpleStarField({ stars = [], onStarClick, selectedStarId }: Props) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-black relative overflow-hidden">
      {/* Simple CSS-based starfield */}
      <div className="absolute inset-0">
        {/* Background stars */}
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Interactive stars */}
      <div className="absolute inset-4">
        {stars.map((star, index) => (
          <button
            key={star.id || index}
            className={`absolute w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
              selectedStarId === star.id 
                ? 'bg-yellow-400 scale-150 shadow-lg shadow-yellow-400/50' 
                : 'bg-blue-400 hover:bg-blue-300'
            }`}
            style={{
              left: `${20 + (index * 15) % 60}%`,
              top: `${20 + (index * 10) % 60}%`,
            }}
            onClick={() => onStarClick?.(star)}
            title={star.turkishName || star.name}
          />
        ))}
      </div>

      {/* Center title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Gökyüzü Mitleri</h2>
          <p className="text-gray-300">Yıldızlara tıklayarak hikayelerini keşfedin</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}