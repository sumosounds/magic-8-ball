import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  isShaking: boolean;
}

export function Magic8BallScene({ isShaking }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/magic_8_ball.glb');

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        // The window is baked into the ball shell's own base color texture as
        // hard alpha (opaque frame / transparent window), but the glTF file
        // marks it as alphaMode "BLEND", which three.js renders with
        // depthWrite disabled — so the "opaque" areas never actually occlude
        // the die behind them. Switching to an alpha-tested cutout restores
        // proper depth occlusion so only the window's transparent area shows
        // the die, and everywhere else the shell hides it correctly.
        child.material.transparent = false;
        child.material.alphaTest = 0.5;
        child.material.depthWrite = true;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      if (isShaking) {
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 25) * 0.6;
        groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 22) * 0.6;
      } else {
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      }
    }
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={6.5}
      position={[0, -0.5, 0]}
    />
  );
}
