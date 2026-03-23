"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Edges } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

function HologramShape({ 
  position, 
  rotation, 
  geometry, 
  scale, 
  mouseRef 
}: { 
  position: [number, number, number]; 
  rotation: [number, number, number]; 
  geometry: React.ReactNode; 
  scale: number;
  mouseRef: React.MutableRefObject<{ x: number, y: number, scrollY: number }>;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const initialPos = useRef({ x: position[0], y: position[1], z: position[2] });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Restore previous smooth zero-gravity rotation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    const targetX = initialPos.current.x + mouseRef.current.x * 2;
    
    // Bind scroll parallax to a sine wave. Moving 5000 pixels down only translates them smoothly between -2 and +2 max.
    const scrollOffset = Math.sin(mouseRef.current.scrollY * 0.001) * 2.5;
    const targetY = initialPos.current.y - mouseRef.current.y * 2 + scrollOffset;
    
    meshRef.current.position.x = gsap.utils.interpolate(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = gsap.utils.interpolate(meshRef.current.position.y, targetY, 0.05);
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {geometry}
      </Float>
    </group>
  );
}

export default function SceneBackground() {
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, scrollY: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    
    const handleScroll = () => {
      mouseRef.current.scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        
        {/* Model 1: Torus Knot (Complex CAD-like core) */}
        <HologramShape 
          mouseRef={mouseRef}
          position={[-4.5, 2.5, -1]} 
          rotation={[0.5, 0.2, 0]} 
          scale={1.3}
          geometry={
            <mesh>
              <torusKnotGeometry args={[1, 0.3, 128, 32]} />
              <meshBasicMaterial color="#10B981" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
              <Edges scale={1} threshold={15} color="#10B981" />
              {/* Fake Glow Layer */}
              <mesh scale={1.05}>
                 <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                 <meshBasicMaterial color="#059669" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
              </mesh>
            </mesh>
          } 
        />

        {/* Model 2: Icosahedron (Geometric Shell) */}
        <HologramShape 
          mouseRef={mouseRef}
          position={[5, -1, -2]} 
          rotation={[-0.2, 0.4, 0]} 
          scale={1.5}
          geometry={
            <mesh>
              <icosahedronGeometry args={[1, 1]} />
              <meshBasicMaterial color="#10B981" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
              <Edges scale={1} threshold={15} color="#10B981" />
              <mesh scale={1.05}>
                 <icosahedronGeometry args={[1, 1]} />
                 <meshBasicMaterial color="#059669" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
              </mesh>
            </mesh>
          } 
        />

        {/* Model 3: Cylinder (Mechanical shaft) */}
        <HologramShape 
          mouseRef={mouseRef}
          position={[-2.5, -4, -1]} 
          rotation={[1, 0, 0.5]} 
          scale={1.6}
          geometry={
            <mesh>
              <cylinderGeometry args={[0.5, 0.5, 3, 32]} />
              <meshBasicMaterial color="#10B981" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
              <Edges scale={1} threshold={15} color="#10B981" />
              <mesh scale={1.05}>
                 <cylinderGeometry args={[0.5, 0.5, 3, 32]} />
                 <meshBasicMaterial color="#059669" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
              </mesh>
            </mesh>
          } 
        />
      </Canvas>
      
      {/* Scanline Overlay */}
      <div className="absolute inset-0 scanlines opacity-30 mix-blend-overlay pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0)_0%,rgba(5,5,5,1)_100%)] pointer-events-none" />
    </div>
  );
}
