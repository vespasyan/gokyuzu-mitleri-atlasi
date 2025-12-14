# Gökyüzü Mitleri Atlası - AI Coding Assistant Instructions

## Project Overview
Interactive Turkish mythology stargazing experience combining 3D WebGL visualization, VR support, and educational content. Built with Next.js 14 (App Router), Three.js/React Three Fiber, and TypeScript.

## Architecture & Key Concepts

### Core Application Flow
- **Client-Side Only 3D**: All Three.js components use `"use client"` and dynamic imports with `ssr: false` to avoid SSR hydration issues
- **Data Source**: Star metadata lives in [`data/stars.json`](data/stars.json) following the `Star` interface from [`lib/types.ts`](lib/types.ts)
- **State Management**: Local React state for star selection and panel visibility - no external state library
- **Analytics**: Client-side tracking via [`components/AnalyticsTracker.tsx`](components/AnalyticsTracker.tsx) + backend Redis (Upstash) via [`lib/redis.ts`](lib/redis.ts)

### 3D/VR Architecture
- **Two VR Implementations**: 
  - **React Three Fiber**: [`components/StarFieldCanvas.tsx`](components/StarFieldCanvas.tsx) uses `@react-three/xr` with `createXRStore()` pattern
  - **Vanilla Three.js**: [`components/VirtualMuseum3D.tsx`](components/VirtualMuseum3D.tsx) uses native Three.js XR API with `VRButton.createButton()`
- **VR Mode Toggle**: Components accept `isVRMode` prop to conditionally enable XR rendering
- **Performance Pattern**: Use `useFrame()` for animations, `lerp()` for smooth transitions, limit geometry complexity

### Data Model (lib/types.ts)
```typescript
Star {
  coordinates: { x, y, z } // 3D scene positions, NOT astronomical RA/Dec
  myth: MythEntry          // Turkish mythology content
  astronomy: AstronomicalInfo
  media: MediaContent      // Images/videos/artwork
}
```

## Development Workflows

### Running Locally
```bash
npm run dev          # Start dev server on :3000
npm run build        # Production build
npm run start        # Run production build
```

### Adding New Stars
1. Add entry to [`data/stars.json`](data/stars.json) with complete `Star` interface
2. Ensure `coordinates.x/y/z` are set for 3D positioning (typically -20 to 20 range)
3. Images referenced in `media.images[]` must exist in [`public/images/`](public/images/)

### Working with 3D Components
- **Never** import Three.js components directly in pages - use `dynamic()` import
- **Loading States**: Always provide fallback UI in dynamic imports
- **Canvas Setup**: Wrap R3F Canvas with Suspense and error boundaries
- **Animation**: Use `useFrame()` hook, not `requestAnimationFrame()`

### VR Development
- Test with Meta Quest browser (Chromium-based WebXR)
- Check [`VR_GUIDE.md`](VR_GUIDE.md) for device compatibility
- VR button auto-hides when WebXR unavailable
- Use `renderer.xr.enabled = true` for native Three.js implementations

## Code Conventions

### Component Patterns
- **File Structure**: `app/` for pages/routes, `components/` for reusable UI
- **Naming**: PascalCase for components, camelCase for utilities
- **Client Components**: Mark with `"use client"` at top for hooks/Three.js/browser APIs
- **Dynamic Imports**: 
  ```tsx
  const StarField = dynamic(() => import('@/components/StarFieldCanvas'), { 
    ssr: false,
    loading: () => <LoadingSpinner />
  })
  ```

### Styling
- **TailwindCSS**: Utility-first with custom theme in [`tailwind.config.js`](tailwind.config.js)
- **Custom Colors**: `dark-*` (backgrounds), `star-*` (gold/yellow accents), `cosmic-*` (purple/blue)
- **Typography**: Inter font via Next.js font optimization
- **Responsive**: Mobile-first approach, test 3D performance on mobile

### TypeScript
- Strict mode enabled - no implicit any
- Import types from [`lib/types.ts`](lib/types.ts)
- Three.js types: Use `THREE.Mesh`, `THREE.Material`, etc. from `three`
- Ref types: `useRef<THREE.Mesh>(null!)` pattern for refs requiring initialization

## External Dependencies & Integration

### Analytics System
- **Client**: [`components/AnalyticsTracker.tsx`](components/AnalyticsTracker.tsx) runs on every page, stores `visitorId` in localStorage, `sessionId` in sessionStorage
- **API**: POST to [`/api/analytics/track`](app/api/analytics/track/route.ts) → Redis pipeline operations
- **Redis**: Upstash connection via `KV_URL` env variable, keys defined in [`lib/redis.ts`](lib/redis.ts)
- **Metrics**: Total visits, unique visitors, daily counts, page views, recent visits (last 100)

### Environment Variables
```bash
KV_URL=          # Upstash Redis connection string
NODE_ENV=        # development | production
```

### Key Dependencies
- `@react-three/fiber` `@react-three/drei` `@react-three/xr` - Three.js React bindings
- `three` - Core 3D library
- `ioredis` - Redis client for analytics
- `next` 14+ - App Router required

## Common Pitfalls

### Three.js Hydration Errors
**Problem**: `Text content does not match server-rendered HTML`  
**Solution**: Use `dynamic(() => import(...), { ssr: false })`

### VR Not Working
**Problem**: VR button shows but session won't start  
**Solution**: 
- Ensure HTTPS (localhost exempt)
- Check `renderer.xr.enabled = true`
- Verify WebXR browser support (not Safari)

### Canvas Not Rendering
**Problem**: Black screen, no errors  
**Solution**:
- Check canvas Z-index and positioning
- Verify `containerRef.current` exists before initialization
- Add `console.log()` in render function to confirm execution

### Star Coordinates Wrong
**Problem**: Stars positioned outside camera view  
**Solution**: 
- Camera default is `position.set(0, 0, 10)`, FOV 75°
- Keep star coordinates in -20 to 20 range for visibility
- Use OrbitControls to debug camera positioning

## Turkish Content Guidelines
- **Primary Language**: Turkish for UI, stories, and star names
- **Metadata**: Use `turkishName` field for local star names
- **Myth Content**: Write `myth.story` as narrative prose, include cultural context in `myth.origin`

## SEO & Performance
- Sitemap auto-generated at [`app/sitemap.ts`](app/sitemap.ts)
- Metadata in [`app/layout.tsx`](app/layout.tsx) with OpenGraph + Twitter cards
- Three.js lazy-loaded to reduce initial bundle
- Images optimized via Next.js Image component where possible

## Project-Specific Notes
- **No Testing Setup**: Tests not implemented - rely on TypeScript + manual testing
- **Redis Optional**: App runs without Redis, analytics just fail gracefully
- **Mobile VR**: Limited support - WebXR mobile requires specific browsers (Oculus Browser, Firefox Reality)
- **GLB Models**: 3D models in [`public/models/`](public/models/) loaded via `useGLTF` hook from drei
