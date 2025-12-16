export interface Star {
  id: string;
  name: string;
  turkishName: string;
  constellation: string;
  coordinates: {
    ra: number; // Right Ascension (saat cinsinden)
    dec: number; // Declination (derece cinsinden)
    x?: number; // 3D sahne koordinatları
    y?: number;
    z?: number;
  };
  magnitude: number; // Yıldızın parlaklığı
  spectralClass: string; // O, B, A, F, G, K, M
  color: string; // Hex renk kodu
  logo?: string; // Logo URL'i (yıldız yerine logo göstermek için)
  myth: MythEntry;
  astronomy: AstronomicalInfo;
  media?: MediaContent;
}

export interface MythEntry {
  title: string;
  story: string;
  origin: string; // Hangi kültürden geldiği
  characters: string[]; // Mit karakterleri
  themes: string[]; // Ana temalar
  moralLesson?: string;
  relatedStars?: string[]; // İlişkili diğer yıldızlar
}

export interface AstronomicalInfo {
  distance: string; // Dünya'dan uzaklık
  temperature: string; // Yüzey sıcaklığı
  mass: string; // Güneş kütlesi cinsinden
  radius: string; // Güneş yarıçapı cinsinden
  age: string; // Yaş
  facts: string[]; // İlginç astronomik bilgiler
}

export interface MediaContent {
  images: ImageContent[];
  videos?: VideoContent[];
  artwork?: ArtworkContent[];
}

export interface ImageContent {
  url: string;
  alt: string;
  caption: string;
  type: 'astronomy' | 'artwork' | 'illustration' | 'video' | 'animation';
}

export interface VideoContent {
  url: string;
  title: string;
  duration: string;
  type: 'documentary' | 'animation' | 'explanation';
}

export interface ArtworkContent {
  artist: string;
  title: string;
  medium: string;
  year: string;
  description: string;
  imageUrl: string;
}

export interface Constellation {
  id: string;
  name: string;
  turkishName: string;
  abbreviation: string;
  stars: string[]; // Star ID'leri
  mythology: string;
  bestViewingTime: string;
  hemisphere: 'northern' | 'southern' | 'both';
}

export interface StoryEntry {
  id: string;
  title: string;
  summary: string;
  fullStory: string;
  characters: string[];
  origin: string;
  relatedStars: string[];
  readingTime: number; // dakika cinsinden
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  publishedAt: string;
}

export interface ArtEntry {
  id: string;
  title: string;
  artist: string;
  medium: string;
  year: string;
  description: string;
  interpretation: string;
  relatedStars: string[];
  imageUrl: string;
  dimensions?: string;
  exhibitions?: string[];
}

// Component props tipleri
export interface StarFieldProps {
  stars: Star[];
  onStarClick: (star: Star) => void;
  selectedStarId?: string;
}

export interface StarInfoPanelProps {
  star: Star | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
}

// Utility types
export type Theme = 'dark' | 'light';
export type ViewMode = 'map' | 'stories' | 'art' | 'about';
export type StarSize = 'small' | 'medium' | 'large';
export type PanelState = 'closed' | 'minimized' | 'open';