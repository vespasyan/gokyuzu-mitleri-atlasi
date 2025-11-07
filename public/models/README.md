# 3D Models Directory

This directory is for storing .glb (GLTF Binary) 3D models of stars and constellations.

## Adding Models

1. Place your .glb files in this directory
2. Update the StarScene component to load your models
3. Models should be optimized for web (keep file sizes small)

## Example Usage

```typescript
const { scene } = useGLTF('/models/star.glb');
```

## Recommended Tools

- Blender (free 3D modeling software)
- Sketchfab (download free 3D models)
- glTF Viewer (preview .glb files)
