import React from 'react';

interface ArtworkProps {
  className?: string;
  animate?: boolean;
}

// Çoban Yıldızı (Sirius) - Shepherd's Star with flock
export const SiriusPainting: React.FC<ArtworkProps> = ({ className = "", animate = false }) => {
  return (
    <svg viewBox="0 0 800 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="30%" r="30%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="1"/>
          <stop offset="50%" stopColor="#FFA500" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.3"/>
        </radialGradient>
        
        <radialGradient id="skyGradient" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#1a1a2e"/>
          <stop offset="70%" stopColor="#16213e"/>
          <stop offset="100%" stopColor="#0f172a"/>
        </radialGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Sky Background */}
      <rect width="800" height="600" fill="url(#skyGradient)"/>
      
      {/* Mountains silhouette */}
      <path d="M0 400 L200 350 L300 380 L500 320 L650 360 L800 340 L800 600 L0 600 Z" 
            fill="#0a0a1a" opacity="0.8"/>
      
      {/* Sirius - The Shepherd's Star */}
      <circle cx="400" cy="120" r="20" fill="url(#starGlow)" filter="url(#glow)">
        {animate && (
          <animate attributeName="r" values="18;22;18" dur="3s" repeatCount="indefinite"/>
        )}
      </circle>
      
      {/* Star rays */}
      <g stroke="#FFD700" strokeWidth="2" opacity="0.8">
        <line x1="400" y1="80" x2="400" y2="160"/>
        <line x1="360" y1="120" x2="440" y2="120"/>
        <line x1="375" y1="95" x2="425" y2="145"/>
        <line x1="425" y1="95" x2="375" y2="145"/>
      </g>
      
      {/* Light beam from star to shepherd */}
      <path d="M400 140 L350 400 L450 400 Z" fill="url(#starGlow)" opacity="0.3">
        {animate && (
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite"/>
        )}
      </path>
      
      {/* Shepherd figure */}
      <g transform="translate(380, 350)">
        {/* Body */}
        <ellipse cx="20" cy="35" rx="12" ry="20" fill="#8B4513"/>
        {/* Head */}
        <circle cx="20" cy="10" r="8" fill="#DEB887"/>
        {/* Staff */}
        <line x1="35" y1="15" x2="35" y2="55" stroke="#654321" strokeWidth="3"/>
        <path d="M35 15 Q40 10 35 5" stroke="#654321" strokeWidth="2" fill="none"/>
        {/* Arms */}
        <line x1="20" y1="25" x2="30" y2="20" stroke="#8B4513" strokeWidth="4"/>
      </g>
      
      {/* Sheep flock */}
      <g opacity="0.9">
        {/* Sheep 1 */}
        <ellipse cx="200" cy="420" rx="15" ry="10" fill="#F5F5DC"/>
        <circle cx="190" cy="415" r="5" fill="#F5F5DC"/>
        <circle cx="188" cy="412" r="2" fill="#000"/>
        
        {/* Sheep 2 */}
        <ellipse cx="250" cy="430" rx="12" ry="8" fill="#F0F0F0"/>
        <circle cx="242" cy="427" r="4" fill="#F0F0F0"/>
        <circle cx="240" cy="425" r="1.5" fill="#000"/>
        
        {/* Sheep 3 */}
        <ellipse cx="300" cy="425" rx="18" ry="12" fill="#FFFAF0"/>
        <circle cx="288" cy="418" r="6" fill="#FFFAF0"/>
        <circle cx="285" cy="415" r="2" fill="#000"/>
        
        {/* Sheep 4 */}
        <ellipse cx="180" cy="450" rx="14" ry="9" fill="#F8F8FF"/>
        <circle cx="170" cy="446" r="5" fill="#F8F8FF"/>
        <circle cx="168" cy="444" r="1.5" fill="#000"/>
      </g>
      
      {/* Distant stars */}
      <circle cx="150" cy="80" r="2" fill="#FFF" opacity="0.8"/>
      <circle cx="650" cy="100" r="1.5" fill="#FFF" opacity="0.6"/>
      <circle cx="300" cy="60" r="1" fill="#FFF" opacity="0.7"/>
      <circle cx="600" cy="70" r="2.5" fill="#FFF" opacity="0.5"/>
      
      {/* Traditional Turkish pattern border */}
      <rect x="0" y="0" width="800" height="20" fill="#8B0000" opacity="0.8"/>
      <rect x="0" y="580" width="800" height="20" fill="#8B0000" opacity="0.8"/>
      
      {/* Geometric patterns */}
      <g fill="#FFD700" opacity="0.6">
        <polygon points="50,10 60,10 55,5" />
        <polygon points="100,10 110,10 105,5" />
        <polygon points="150,10 160,10 155,5" />
        <polygon points="650,10 660,10 655,5" />
        <polygon points="700,10 710,10 705,5" />
        <polygon points="750,10 760,10 755,5" />
      </g>
    </svg>
  );
};

// Kayra Han Yıldızı (Vega) - Throne of Creation
export const KayraHanSculpture: React.FC<ArtworkProps> = ({ className = "", animate = false }) => {
  return (
    <svg viewBox="0 0 800 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="throneGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#9BB0FF" stopOpacity="1"/>
          <stop offset="50%" stopColor="#4A90E2" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.4"/>
        </radialGradient>
        
        <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CD7F32"/>
          <stop offset="50%" stopColor="#B8860B"/>
          <stop offset="100%" stopColor="#8B4513"/>
        </linearGradient>
        
        <filter id="metallic">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="2" result="offset"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/>
          </feComponentTransfer>
          <feMerge> 
            <feMergeNode in="offset"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Cosmic background */}
      <rect width="800" height="600" fill="url(#throneGlow)"/>
      
      {/* Nebula effects */}
      <circle cx="200" cy="150" r="80" fill="#4A90E2" opacity="0.3"/>
      <circle cx="600" cy="200" r="100" fill="#9BB0FF" opacity="0.2"/>
      
      {/* Kayra Han's Throne Base */}
      <path d="M300 500 L500 500 L480 450 L320 450 Z" fill="url(#bronzeGradient)" filter="url(#metallic)"/>
      
      {/* Throne Back */}
      <path d="M320 450 L480 450 L460 200 L340 200 Z" fill="url(#bronzeGradient)" filter="url(#metallic)"/>
      
      {/* Throne Arms */}
      <path d="M320 400 L280 380 L285 350 L325 370 Z" fill="url(#bronzeGradient)" filter="url(#metallic)"/>
      <path d="M480 400 L520 380 L515 350 L475 370 Z" fill="url(#bronzeGradient)" filter="url(#metallic)"/>
      
      {/* Vega - The Crown Star */}
      <circle cx="400" cy="120" r="25" fill="#9BB0FF" opacity="0.9">
        {animate && (
          <animate attributeName="r" values="22;28;22" dur="4s" repeatCount="indefinite"/>
        )}
      </circle>
      
      {/* Crown rays */}
      <g stroke="#9BB0FF" strokeWidth="3" opacity="0.8">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const x1 = 400 + Math.cos(angle * Math.PI / 180) * 30;
          const y1 = 120 + Math.sin(angle * Math.PI / 180) * 30;
          const x2 = 400 + Math.cos(angle * Math.PI / 180) * 50;
          const y2 = 120 + Math.sin(angle * Math.PI / 180) * 50;
          return (
            <line key={index} x1={x1} y1={y1} x2={x2} y2={y2}>
              {animate && (
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin={`${index * 0.2}s`} repeatCount="indefinite"/>
              )}
            </line>
          );
        })}
      </g>
      
      {/* Cosmic energy flowing down */}
      <path d="M400 145 Q380 250 400 350 Q420 250 400 145" fill="none" stroke="#9BB0FF" strokeWidth="2" opacity="0.6">
        {animate && (
          <animate attributeName="stroke-width" values="1;4;1" dur="3s" repeatCount="indefinite"/>
        )}
      </path>
      
      {/* Shamanic symbols */}
      <g transform="translate(350, 300)" fill="#FFD700" opacity="0.8">
        <circle cx="0" cy="0" r="3"/>
        <path d="M0 -8 L8 8 L-8 8 Z"/>
      </g>
      
      <g transform="translate(450, 320)" fill="#FFD700" opacity="0.8">
        <circle cx="0" cy="0" r="3"/>
        <path d="M-8 -8 L8 -8 L0 8 Z"/>
      </g>
      
      {/* Ancient Turkic runes */}
      <g stroke="#CD7F32" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M360 380 L360 390 M360 385 L370 385"/>
        <path d="M430 390 L440 380 L440 390"/>
      </g>
      
      {/* Background stars */}
      <circle cx="100" cy="100" r="2" fill="#FFF" opacity="0.7"/>
      <circle cx="700" cy="80" r="1.5" fill="#FFF" opacity="0.8"/>
      <circle cx="150" cy="250" r="1" fill="#FFF" opacity="0.6"/>
      <circle cx="650" cy="180" r="2" fill="#FFF" opacity="0.5"/>
    </svg>
  );
};

// Kartal Yıldızı (Altair) - Digital Simurg
export const SimurgDigital: React.FC<ArtworkProps> = ({ className = "", animate = false }) => {
  return (
    <svg viewBox="0 0 800 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="digitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FFFF"/>
          <stop offset="50%" stopColor="#FF6B35"/>
          <stop offset="100%" stopColor="#FFD700"/>
        </linearGradient>
        
        <filter id="digitalGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <pattern id="circuitPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="none"/>
          <path d="M10 10 L30 10 L30 30 L10 30 Z" stroke="#00FFFF" strokeWidth="1" fill="none" opacity="0.3"/>
          <circle cx="20" cy="20" r="2" fill="#00FFFF" opacity="0.5"/>
        </pattern>
      </defs>
      
      {/* Digital space background */}
      <rect width="800" height="600" fill="#000514"/>
      <rect width="800" height="600" fill="url(#circuitPattern)" opacity="0.3"/>
      
      {/* Altair star - digital representation */}
      <circle cx="400" cy="150" r="15" fill="url(#digitalGradient)" filter="url(#digitalGlow)">
        {animate && (
          <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite"/>
        )}
      </circle>
      
      {/* Digital Simurg - geometric bird form */}
      <g transform="translate(400, 300)">
        {/* Body - hexagonal */}
        <polygon points="-30,0 -15,-25 15,-25 30,0 15,25 -15,25" 
                 fill="url(#digitalGradient)" opacity="0.8" filter="url(#digitalGlow)"/>
        
        {/* Head - triangular */}
        <polygon points="-40,-30 -20,-50 0,-30" 
                 fill="url(#digitalGradient)" opacity="0.9"/>
        
        {/* Wings - geometric patterns */}
        <g>
          {/* Left wing */}
          <polygon points="-30,-10 -80,-20 -90,10 -60,20 -30,10" 
                   fill="none" stroke="url(#digitalGradient)" strokeWidth="2">
            {animate && (
              <animate attributeName="stroke-width" values="1;3;1" dur="1.5s" repeatCount="indefinite"/>
            )}
          </polygon>
          
          <polygon points="-50,-15 -70,-10 -70,5 -50,0" 
                   fill="url(#digitalGradient)" opacity="0.6"/>
          
          {/* Right wing */}
          <polygon points="30,-10 80,-20 90,10 60,20 30,10" 
                   fill="none" stroke="url(#digitalGradient)" strokeWidth="2">
            {animate && (
              <animate attributeName="stroke-width" values="1;3;1" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
            )}
          </polygon>
          
          <polygon points="50,-15 70,-10 70,5 50,0" 
                   fill="url(#digitalGradient)" opacity="0.6"/>
        </g>
        
        {/* Tail feathers - digital lines */}
        <g stroke="url(#digitalGradient)" strokeWidth="2" opacity="0.7">
          <line x1="0" y1="25" x2="0" y2="60"/>
          <line x1="-10" y1="30" x2="-10" y2="55"/>
          <line x1="10" y1="30" x2="10" y2="55"/>
          <line x1="-20" y1="35" x2="-20" y2="50"/>
          <line x1="20" y1="35" x2="20" y2="50"/>
        </g>
      </g>
      
      {/* Digital connections from star to Simurg */}
      <g stroke="#00FFFF" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M400 165 Q350 200 370 270">
          {animate && (
            <animate attributeName="stroke-dasharray" values="0,100;20,80;0,100" dur="3s" repeatCount="indefinite"/>
          )}
        </path>
        <path d="M400 165 Q450 200 430 270">
          {animate && (
            <animate attributeName="stroke-dasharray" values="0,100;20,80;0,100" dur="3s" begin="0.5s" repeatCount="indefinite"/>
          )}
        </path>
      </g>
      
      {/* Data streams */}
      <g opacity="0.4">
        {[100, 200, 300, 500, 600, 700].map((x, index) => (
          <g key={index}>
            <rect x={x} y="50" width="2" height="500" fill="url(#digitalGradient)">
              {animate && (
                <animate attributeName="height" values="0;500;0" dur="4s" begin={`${index * 0.3}s`} repeatCount="indefinite"/>
              )}
            </rect>
          </g>
        ))}
      </g>
      
      {/* Floating digital elements */}
      <g fill="#00FFFF" opacity="0.5">
        <circle cx="150" cy="200" r="3">
          {animate && (
            <animateTransform attributeName="transform" type="translate" values="0,0;20,-10;0,0" dur="3s" repeatCount="indefinite"/>
          )}
        </circle>
        <circle cx="650" cy="250" r="2">
          {animate && (
            <animateTransform attributeName="transform" type="translate" values="0,0;-15,15;0,0" dur="4s" repeatCount="indefinite"/>
          )}
        </circle>
        <rect x="100" y="400" width="4" height="4" transform="rotate(45 102 402)">
          {animate && (
            <animateTransform attributeName="transform" type="rotate" values="0 102 402;360 102 402" dur="5s" repeatCount="indefinite"/>
          )}
        </rect>
      </g>
      
      {/* Digital frame */}
      <rect x="0" y="0" width="800" height="600" fill="none" stroke="url(#digitalGradient)" strokeWidth="4" opacity="0.8"/>
    </svg>
  );
};

// Demir Kazık (Polaris) - Tent Installation
export const DemirKazikInstallation: React.FC<ArtworkProps> = ({ className = "", animate = false }) => {
  return (
    <svg viewBox="0 0 800 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="polarisGlow" cx="50%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#F8F7FF"/>
          <stop offset="50%" stopColor="#E6E6FA"/>
          <stop offset="100%" stopColor="#9370DB" stopOpacity="0.3"/>
        </radialGradient>
        
        <linearGradient id="tentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B4513"/>
          <stop offset="50%" stopColor="#A0522D"/>
          <stop offset="100%" stopColor="#CD853F"/>
        </linearGradient>
        
        <filter id="tentShadow">
          <feDropShadow dx="3" dy="3" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Night sky */}
      <rect width="800" height="600" fill="#0B1426"/>
      
      {/* Polaris - The unchanging star */}
      <circle cx="400" cy="80" r="12" fill="url(#polarisGlow)">
        {animate && (
          <animate attributeName="opacity" values="0.8;1;0.8" dur="5s" repeatCount="indefinite"/>
        )}
      </circle>
      
      {/* Star rays */}
      <g stroke="#F8F7FF" strokeWidth="2" opacity="0.7">
        <line x1="400" y1="50" x2="400" y2="110"/>
        <line x1="370" y1="80" x2="430" y2="80"/>
        <line x1="380" y1="60" x2="420" y2="100"/>
        <line x1="420" y1="60" x2="380" y2="100"/>
      </g>
      
      {/* Iron stake - the cosmic anchor */}
      <rect x="395" y="80" width="10" height="300" fill="#2F4F4F" filter="url(#tentShadow)"/>
      <polygon points="390,80 410,80 405,70 395,70" fill="#708090"/>
      
      {/* Tent structure radiating from the stake */}
      <g>
        {/* Main tent */}
        <polygon points="400,380 200,500 600,500" fill="url(#tentGradient)" filter="url(#tentShadow)" opacity="0.8"/>
        
        {/* Tent panels */}
        <polygon points="400,380 300,500 500,500" fill="url(#tentGradient)" opacity="0.6"/>
        
        {/* Tent ropes */}
        <g stroke="#654321" strokeWidth="2" opacity="0.8">
          <line x1="400" y1="100" x2="200" y2="500"/>
          <line x1="400" y1="100" x2="600" y2="500"/>
          <line x1="400" y1="100" x2="100" y2="480"/>
          <line x1="400" y1="100" x2="700" y2="480"/>
          <line x1="400" y1="100" x2="150" y2="520"/>
          <line x1="400" y1="100" x2="650" y2="520"/>
        </g>
        
        {/* Tent stakes at ground level */}
        <g fill="#2F4F4F">
          <rect x="195" y="495" width="4" height="15"/>
          <rect x="595" y="495" width="4" height="15"/>
          <rect x="95" y="475" width="4" height="15"/>
          <rect x="695" y="475" width="4" height="15"/>
          <rect x="145" y="515" width="4" height="15"/>
          <rect x="645" y="515" width="4" height="15"/>
        </g>
      </g>
      
      {/* Stars rotating around Polaris */}
      <g opacity="0.7">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const distance = 100 + (index % 3) * 30;
          return (
            <g key={index}>
              <circle cx="400" cy="80" r={distance} fill="none" stroke="#9370DB" strokeWidth="1" opacity="0.2" strokeDasharray="2,2"/>
              <circle 
                cx={400 + Math.cos(angle * Math.PI / 180) * distance} 
                cy={80 + Math.sin(angle * Math.PI / 180) * distance} 
                r="2" 
                fill="#F8F7FF"
              >
                {animate && (
                  <animateTransform 
                    attributeName="transform" 
                    type="rotate" 
                    values={`0 400 80;360 400 80`}
                    dur={`${10 + index}s`} 
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            </g>
          );
        })}
      </g>
      
      {/* Nomadic figures around the tent */}
      <g opacity="0.8">
        {/* Figure 1 */}
        <g transform="translate(250, 470)">
          <ellipse cx="0" cy="10" rx="8" ry="15" fill="#8B4513"/>
          <circle cx="0" cy="-5" r="5" fill="#DEB887"/>
        </g>
        
        {/* Figure 2 */}
        <g transform="translate(550, 470)">
          <ellipse cx="0" cy="10" rx="8" ry="15" fill="#A0522D"/>
          <circle cx="0" cy="-5" r="5" fill="#DEB887"/>
        </g>
      </g>
      
      {/* Traditional patterns on tent */}
      <g stroke="#FFD700" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M350 450 Q400 440 450 450"/>
        <path d="M320 470 Q400 460 480 470"/>
        <circle cx="400" cy="430" r="10"/>
        <polygon points="395,425 405,425 400,435" fill="#FFD700" opacity="0.8"/>
      </g>
      
      {/* Ground texture */}
      <ellipse cx="400" cy="550" rx="300" ry="30" fill="#2F4F4F" opacity="0.4"/>
    </svg>
  );
};

// Ebe Ana Yıldızı (Capella) - Birth and Fertility
export const EbeAnaArtwork: React.FC<ArtworkProps> = ({ className = "", animate = false }) => {
  return (
    <svg viewBox="0 0 800 600" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="capellaGlow" cx="50%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#FFF4EA"/>
          <stop offset="50%" stopColor="#FFE4B5"/>
          <stop offset="100%" stopColor="#DEB887" stopOpacity="0.4"/>
        </radialGradient>
        
        <linearGradient id="earthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8FBC8F"/>
          <stop offset="50%" stopColor="#9ACD32"/>
          <stop offset="100%" stopColor="#6B8E23"/>
        </linearGradient>
        
        <filter id="warmGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Dawn sky */}
      <rect width="800" height="600" fill="url(#capellaGlow)"/>
      
      {/* Capella - The nurturing star */}
      <circle cx="400" cy="100" r="18" fill="#FFF4EA" filter="url(#warmGlow)">
        {animate && (
          <animate attributeName="r" values="16;20;16" dur="4s" repeatCount="indefinite"/>
        )}
      </circle>
      
      {/* Warm rays */}
      <g stroke="#FFE4B5" strokeWidth="3" opacity="0.8">
        <line x1="400" y1="60" x2="400" y2="140"/>
        <line x1="360" y1="100" x2="440" y2="100"/>
        <line x1="375" y1="75" x2="425" y2="125"/>
        <line x1="425" y1="75" x2="375" y2="125"/>
        <line x1="385" y1="65" x2="415" y2="135"/>
        <line x1="415" y1="65" x2="385" y2="135"/>
      </g>
      
      {/* Life-giving light beam */}
      <path d="M400 120 Q350 300 300 500 Q400 480 500 500 Q450 300 400 120" 
            fill="url(#capellaGlow)" opacity="0.4">
        {animate && (
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite"/>
        )}
      </path>
      
      {/* Ebe Ana figure - traditional midwife */}
      <g transform="translate(380, 350)">
        {/* Traditional dress */}
        <path d="M0 30 Q-20 50 -15 80 Q0 85 40 85 Q55 80 35 50 Q40 30 20 15 Q0 10 0 30" 
              fill="#8B4513" opacity="0.9"/>
        {/* Head with traditional headscarf */}
        <circle cx="20" cy="5" r="8" fill="#DEB887"/>
        <path d="M10 -3 Q20 -8 30 -3 Q35 5 25 10 Q15 10 10 5 Z" fill="#654321"/>
        {/* Arms in blessing gesture */}
        <path d="M5 25 Q0 20 5 15" stroke="#DEB887" strokeWidth="3" fill="none"/>
        <path d="M35 25 Q40 20 35 15" stroke="#DEB887" strokeWidth="3" fill="none"/>
        {/* Traditional bag/herbs */}
        <ellipse cx="45" cy="40" rx="8" ry="12" fill="#228B22"/>
      </g>
      
      {/* New life symbols - growing plants and baby animals */}
      <g opacity="0.8">
        {/* Young plants */}
        <g fill="url(#earthGradient)">
          <path d="M200 480 Q190 470 200 460 Q210 470 200 480" />
          <line x1="200" y1="480" x2="200" y2="500" stroke="url(#earthGradient)" strokeWidth="2"/>
          
          <path d="M300 490 Q290 480 300 470 Q310 480 300 490" />
          <line x1="300" y1="490" x2="300" y2="510" stroke="url(#earthGradient)" strokeWidth="2"/>
          
          <path d="M500 485 Q490 475 500 465 Q510 475 500 485" />
          <line x1="500" y1="485" x2="500" y2="505" stroke="url(#earthGradient)" strokeWidth="2"/>
        </g>
        
        {/* Baby lamb */}
        <g transform="translate(180, 450)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#F5F5DC"/>
          <circle cx="-8" cy="-3" r="4" fill="#F5F5DC"/>
          <circle cx="-10" cy="-5" r="1.5" fill="#000"/>
          <path d="M-12 -8 Q-15 -10 -12 -12" stroke="#000" strokeWidth="1" fill="none"/>
        </g>
        
        {/* Chicks */}
        <circle cx="520" cy="470" r="4" fill="#FFD700"/>
        <circle cx="515" cy="465" r="2" fill="#FFD700"/>
        <circle cx="530" cy="472" r="3" fill="#FFD700"/>
      </g>
      
      {/* Fertility symbols - traditional Turkish motifs */}
      <g fill="#CD853F" opacity="0.7">
        {/* Tree of life */}
        <g transform="translate(600, 300)">
          <line x1="0" y1="0" x2="0" y2="80" stroke="#8B4513" strokeWidth="4"/>
          <circle cx="0" cy="-10" r="15" fill="none" stroke="#228B22" strokeWidth="2"/>
          <circle cx="-15" cy="0" r="8" fill="#228B22"/>
          <circle cx="15" cy="0" r="8" fill="#228B22"/>
          <circle cx="0" cy="15" r="10" fill="#228B22"/>
        </g>
        
        {/* Abundance symbols */}
        <g transform="translate(150, 250)">
          <circle cx="0" cy="0" r="8" fill="none" stroke="#CD853F" strokeWidth="2"/>
          <circle cx="0" cy="0" r="4" fill="#CD853F"/>
          <circle cx="-12" cy="0" r="3" fill="#CD853F"/>
          <circle cx="12" cy="0" r="3" fill="#CD853F"/>
          <circle cx="0" cy="-12" r="3" fill="#CD853F"/>
          <circle cx="0" cy="12" r="3" fill="#CD853F"/>
        </g>
      </g>
      
      {/* Traditional birthing blessing */}
      <g transform="translate(400, 250)" opacity="0.6">
        <circle cx="0" cy="0" r="30" fill="none" stroke="#DEB887" strokeWidth="2" strokeDasharray="5,5">
          {animate && (
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="10s" repeatCount="indefinite"/>
          )}
        </circle>
        <text x="0" y="5" textAnchor="middle" fill="#8B4513" fontSize="12" fontFamily="serif">
          بركة
        </text>
      </g>
      
      {/* Ground with fertile soil */}
      <path d="M0 520 Q200 510 400 515 Q600 510 800 520 L800 600 L0 600 Z" 
            fill="url(#earthGradient)" opacity="0.8"/>
      
      {/* Small flowers in the fertile ground */}
      <g fill="#FF69B4" opacity="0.6">
        <circle cx="250" cy="540" r="2"/>
        <circle cx="350" cy="535" r="1.5"/>
        <circle cx="450" cy="542" r="2"/>
        <circle cx="550" cy="538" r="1.5"/>
      </g>
    </svg>
  );
};

export default {
  SiriusPainting,
  KayraHanSculpture,
  SimurgDigital,
  DemirKazikInstallation,
  EbeAnaArtwork
};