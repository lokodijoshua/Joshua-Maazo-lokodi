import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Pre-allocate scratch math helpers at module scope to ensure zero GC in animation loop
const _targetRotation = new THREE.Vector2(0, 0);
const _currentRotation = new THREE.Vector2(0, 0);

interface ThreeModelSceneProps {
  className?: string;
  isInteractive?: boolean;
}

export const ThreeModelScene: React.FC<ThreeModelSceneProps> = ({
  className = "w-full h-full min-h-[380px]",
  isInteractive = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  // Store mutable refs for interactive adjustments without restarting WebGL
  const explodedRef = useRef(0);
  const wireframeRef = useRef(false);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    explodedRef.current = isExploded ? 1 : 0;
  }, [isExploded]);

  useEffect(() => {
    wireframeRef.current = wireframe;
  }, [wireframe]);

  useEffect(() => {
    autoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene & Renderer setup
    const scene = new THREE.Scene();
    scene.background = null; // transparent to inherit warm grid canvas

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Camera setup - Isometric perspective
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    camera.position.set(5.5, 4.2, 5.5);
    camera.lookAt(0, 0.2, 0);

    // 3. Studio PBR Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xe0e7ff, 0xfaf5ff, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3d6, 2.4);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -3.5;
    keyLight.shadow.camera.right = 3.5;
    keyLight.shadow.camera.top = 3.5;
    keyLight.shadow.camera.bottom = -3.5;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.2);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // 5. Procedural Textures via HTML5 Canvas (Zero external 404 dependencies)
    const createCodeTexture = (text: string, bgColor: string, fgColor: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 512, 512);

      // Border frame
      ctx.strokeStyle = fgColor;
      ctx.lineWidth = 16;
      ctx.strokeRect(20, 20, 472, 472);

      // Grid circuit lines
      ctx.strokeStyle = fgColor;
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 4;
      for (let i = 64; i < 512; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 20);
        ctx.lineTo(i, 492);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20, i);
        ctx.lineTo(492, i);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Symbol
      ctx.fillStyle = fgColor;
      ctx.font = 'bold 130px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 256, 256);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return texture;
    };

    const codeTex = createCodeTexture('</>', '#1e1b4b', '#a78bfa');
    const aiTex = createCodeTexture('AI', '#0f172a', '#38bdf8');
    const curlyTex = createCodeTexture('{ }', '#2e1065', '#c084fc');

    // 6. Root Model Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials list for wireframe toggling
    const trackedMaterials: THREE.MeshStandardMaterial[] = [];

    // Materials with varied roughness & metalness
    const matPrimaryBeige = new THREE.MeshStandardMaterial({
      color: 0xf3eee3,
      roughness: 0.35,
      metalness: 0.1,
    });
    const matIndigo = new THREE.MeshStandardMaterial({
      color: 0x4338ca,
      roughness: 0.22,
      metalness: 0.45,
    });
    const matLilac = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.25,
      metalness: 0.3,
    });
    const matLime = new THREE.MeshStandardMaterial({
      color: 0x84cc16,
      roughness: 0.2,
      metalness: 0.2,
    });
    const matCodeFace = new THREE.MeshStandardMaterial({
      map: codeTex,
      roughness: 0.25,
      metalness: 0.2,
    });
    const matGearGold = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.18,
      metalness: 0.85,
    });
    const matCyberCyan = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.15,
      metalness: 0.6,
    });

    trackedMaterials.push(
      matPrimaryBeige, matIndigo, matLilac, matLime, 
      matCodeFace, matGearGold, matCyberCyan
    );

    // 7. Composite 3-12 Part Procedural Model:
    // (A) Tech Puzzle Modular Cube Group
    const cubeGroup = new THREE.Group();
    rootGroup.add(cubeGroup);

    interface PartInfo {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      explodedOffset: THREE.Vector3;
    }
    const puzzleParts: PartInfo[] = [];

    // 4 Modular Block Quadrants
    const blockGeom = new THREE.BoxGeometry(0.85, 0.85, 0.85);

    // Block 1: Front-Left (Main Code block)
    const block1Materials = [
      matPrimaryBeige, matPrimaryBeige, matPrimaryBeige, 
      matPrimaryBeige, matCodeFace, matPrimaryBeige
    ];
    const mesh1 = new THREE.Mesh(blockGeom, block1Materials);
    mesh1.castShadow = true;
    mesh1.receiveShadow = true;
    const base1 = new THREE.Vector3(-0.46, 0.46, 0.46);
    mesh1.position.copy(base1);
    cubeGroup.add(mesh1);
    puzzleParts.push({ mesh: mesh1, basePos: base1, explodedOffset: new THREE.Vector3(-0.6, 0.4, 0.6) });

    // Block 2: Front-Right (Indigo Tech block)
    const mesh2 = new THREE.Mesh(blockGeom, matIndigo);
    mesh2.castShadow = true;
    mesh2.receiveShadow = true;
    const base2 = new THREE.Vector3(0.46, 0.46, 0.46);
    mesh2.position.copy(base2);
    cubeGroup.add(mesh2);
    puzzleParts.push({ mesh: mesh2, basePos: base2, explodedOffset: new THREE.Vector3(0.6, 0.4, 0.6) });

    // Block 3: Top-Rear (Lilac AI block)
    const mesh3 = new THREE.Mesh(blockGeom, matLilac);
    mesh3.castShadow = true;
    mesh3.receiveShadow = true;
    const base3 = new THREE.Vector3(-0.46, 0.46, -0.46);
    mesh3.position.copy(base3);
    cubeGroup.add(mesh3);
    puzzleParts.push({ mesh: mesh3, basePos: base3, explodedOffset: new THREE.Vector3(-0.6, 0.4, -0.6) });

    // Block 4: Bottom Base (Beige foundation)
    const baseBlockGeom = new THREE.BoxGeometry(1.82, 0.5, 1.82);
    const mesh4 = new THREE.Mesh(baseBlockGeom, matPrimaryBeige);
    mesh4.castShadow = true;
    mesh4.receiveShadow = true;
    const base4 = new THREE.Vector3(0, -0.25, 0);
    mesh4.position.copy(base4);
    cubeGroup.add(mesh4);
    puzzleParts.push({ mesh: mesh4, basePos: base4, explodedOffset: new THREE.Vector3(0, -0.5, 0) });

    // (B) Procedural Mechanical Gears
    const createGear = (teeth: number, radius: number, depth: number, material: THREE.Material) => {
      const gearGroup = new THREE.Group();
      const core = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 24), material);
      core.castShadow = true;
      gearGroup.add(core);

      const toothGeom = new THREE.BoxGeometry(radius * 0.35, depth * 0.98, radius * 0.4);
      for (let i = 0; i < teeth; i++) {
        const tooth = new THREE.Mesh(toothGeom, material);
        const angle = (i / teeth) * Math.PI * 2;
        tooth.position.set(Math.cos(angle) * radius * 0.95, 0, Math.sin(angle) * radius * 0.95);
        tooth.rotation.y = -angle;
        tooth.castShadow = true;
        gearGroup.add(tooth);
      }
      return gearGroup;
    };

    // Gear 1: Left floating gear (AI / Automations)
    const gear1 = createGear(8, 0.65, 0.16, matGearGold);
    gear1.position.set(-1.6, 1.1, 0.2);
    gear1.rotation.x = Math.PI * 0.35;
    gear1.rotation.z = Math.PI * 0.15;
    rootGroup.add(gear1);

    // AI Badge disc inside gear 1
    const badgeGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.18, 20);
    const badge1 = new THREE.Mesh(badgeGeom, new THREE.MeshStandardMaterial({ map: aiTex, roughness: 0.3 }));
    badge1.position.set(-1.6, 1.12, 0.2);
    badge1.rotation.copy(gear1.rotation);
    rootGroup.add(badge1);

    // Gear 2: Small interlocking gear (Full Stack / Logic)
    const gear2 = createGear(6, 0.42, 0.14, matCyberCyan);
    gear2.position.set(-1.95, 0.45, 0.5);
    gear2.rotation.copy(gear1.rotation);
    rootGroup.add(gear2);

    // Gear 3: Right side curly bracket disc
    const gear3 = createGear(10, 0.72, 0.16, matLime);
    gear3.position.set(1.5, 1.25, -0.4);
    gear3.rotation.x = Math.PI * 0.3;
    gear3.rotation.z = -Math.PI * 0.2;
    rootGroup.add(gear3);

    const badge3 = new THREE.Mesh(badgeGeom, new THREE.MeshStandardMaterial({ map: curlyTex, roughness: 0.3 }));
    badge3.position.set(1.5, 1.27, -0.4);
    badge3.rotation.copy(gear3.rotation);
    rootGroup.add(badge3);

    // (C) Isometric Tech Circuit Nodes (Pillars)
    const pillarGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.9, 12);
    const sphereGeom = new THREE.SphereGeometry(0.14, 16, 16);

    const pillar1 = new THREE.Group();
    pillar1.position.set(1.3, 0.2, 1.1);
    const p1Stem = new THREE.Mesh(pillarGeom, matIndigo);
    p1Stem.castShadow = true;
    const p1Head = new THREE.Mesh(sphereGeom, matCyberCyan);
    p1Head.position.y = 0.5;
    pillar1.add(p1Stem, p1Head);
    rootGroup.add(pillar1);

    const pillar2 = new THREE.Group();
    pillar2.position.set(0.6, -0.1, 1.6);
    const p2Stem = new THREE.Mesh(pillarGeom, matLilac);
    p2Stem.castShadow = true;
    const p2Head = new THREE.Mesh(sphereGeom, matLime);
    p2Head.position.y = 0.5;
    pillar2.add(p2Stem, p2Head);
    rootGroup.add(pillar2);

    // (D) Soft Radial Contact Shadow Grounding Plane (flush with ground)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const groundShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 5.2),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.65
      })
    );
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -0.52;
    scene.add(groundShadow);

    // 8. Interactive Pointer Hover & Rotation Tracking
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _targetRotation.set(x * 0.45, y * 0.35);
    };

    const handlePointerLeave = () => {
      _targetRotation.set(0, 0);
    };

    if (isInteractive) {
      container.addEventListener('mousemove', handlePointerMove);
      container.addEventListener('mouseleave', handlePointerLeave);
    }

    // 9. Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    renderer.compile(scene, camera);

    // 10. Lossless 60fps Animation Loop with Exponential Damping
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      _currentRotation.x = THREE.MathUtils.damp(_currentRotation.x, _targetRotation.x, 5, delta);
      _currentRotation.y = THREE.MathUtils.damp(_currentRotation.y, _targetRotation.y, 5, delta);

      if (autoRotateRef.current) {
        rootGroup.rotation.y += delta * 0.35;
      }
      rootGroup.rotation.x = _currentRotation.y * 0.4;
      rootGroup.rotation.z = -_currentRotation.x * 0.3;

      rootGroup.position.y = Math.sin(time * 1.5) * 0.08;

      gear1.rotation.y += delta * 0.8;
      badge1.rotation.y += delta * 0.8;
      gear2.rotation.y -= delta * 1.2;
      gear3.rotation.y += delta * 0.6;
      badge3.rotation.y += delta * 0.6;

      pillar1.position.y = 0.2 + Math.sin(time * 2 + 1) * 0.05;
      pillar2.position.y = -0.1 + Math.sin(time * 2 + 2.5) * 0.05;

      const targetExp = explodedRef.current;
      puzzleParts.forEach(part => {
        const targetX = part.basePos.x + part.explodedOffset.x * targetExp;
        const targetY = part.basePos.y + part.explodedOffset.y * targetExp;
        const targetZ = part.basePos.z + part.explodedOffset.z * targetExp;
        part.mesh.position.x = THREE.MathUtils.damp(part.mesh.position.x, targetX, 7, delta);
        part.mesh.position.y = THREE.MathUtils.damp(part.mesh.position.y, targetY, 7, delta);
        part.mesh.position.z = THREE.MathUtils.damp(part.mesh.position.z, targetZ, 7, delta);
      });

      const isWf = wireframeRef.current;
      trackedMaterials.forEach(m => {
        if (m.wireframe !== isWf) m.wireframe = isWf;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (isInteractive) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('mouseleave', handlePointerLeave);
      }
      renderer.dispose();
      codeTex.dispose();
      aiTex.dispose();
      curlyTex.dispose();
      shadowTex.dispose();
      trackedMaterials.forEach(m => m.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isInteractive]);

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl border-neo bg-[#f4efe4] ${className}`}>
      <div 
        ref={mountRef} 
        className="w-full h-full min-h-[360px] cursor-grab active:cursor-grabbing"
        title="Interactive 3D Procedural Tech Asset: Drag or hover to rotate"
      />

      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold bg-white border-neo shadow-neo-sm">
        <span className="text-purple-600 font-bold">&lt;/&gt;</span>
        <span>THREE.JS 3D PROCEDURAL ENGINE</span>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 bg-white/95 border-neo shadow-neo rounded-lg text-xs font-mono shrink-0">
        <button
          onClick={() => setIsExploded(prev => !prev)}
          className={`px-2.5 py-1 font-semibold rounded border-neo-sm transition-colors ${
            isExploded ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          title="Toggle Exploded Architecture Blueprint"
        >
          {isExploded ? '✦ ASSEMBLED' : '☵ EXPLODE'}
        </button>

        <button
          onClick={() => setIsAutoRotate(prev => !prev)}
          className={`px-2.5 py-1 font-semibold rounded border-neo-sm transition-colors ${
            isAutoRotate ? 'bg-lime-400 text-black' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          title="Toggle Auto Rotation"
        >
          {isAutoRotate ? '↻ ROTATING' : '⏸ PAUSED'}
        </button>

        <button
          onClick={() => setWireframe(prev => !prev)}
          className={`px-2.5 py-1 font-semibold rounded border-neo-sm transition-colors ${
            wireframe ? 'bg-amber-400 text-black' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          title="Toggle Wireframe Shading"
        >
          {wireframe ? 'WIRE: ON' : 'WIRE: OFF'}
        </button>
      </div>
    </div>
  );
};
