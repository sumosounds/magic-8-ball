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

  // Hide the outer die
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        if (name.includes('die') || name.includes('cube') || name.includes('d20')) {
          child.visible = false;
        }
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