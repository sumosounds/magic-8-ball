import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface Magic8BallSceneProps {
  isShaking: boolean;
}

export function Magic8BallScene({ isShaking }: Magic8BallSceneProps) {
  const ballRef = useRef<THREE.Group>(null);
  const windowRef = useRef<THREE.Group>(null);
  const triangleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ballRef.current) {
      if (isShaking) {
        ballRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 15) * 0.6;
        ballRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 12) * 0.5;
      } else {
        ballRef.current.rotation.y = state.clock.elapsedTime * 0.15;
        ballRef.current.rotation.x = 0.05;
      }
    }

    // Gentle glow pulse on the window
    if (triangleRef.current && !isShaking) {
      triangleRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.03);
    }
  });

  return (
    <group ref={ballRef}>
      {/* Main Black Glossy Ball */}
      <Sphere args={[3]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.4} 
          roughness={0.2} 
          envMapIntensity={0.8}
        />
      </Sphere>

      {/* Raised Circular Window Frame */}
      <Cylinder 
        args={[1.85, 1.85, 0.4, 64]} 
        position={[0, 0, 2.1]} 
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {/* White Inner Circle */}
      <Sphere args={[1.65]} position={[0, 0, 2.3]}>
        <meshStandardMaterial color="#eeeeee" />
      </Sphere>

      {/* Blue Glowing Window */}
      <Sphere args={[1.4]} position={[0, 0, 2.45]}>
        <meshStandardMaterial 
          color="#1e3a8a" 
          emissive="#3b82f6" 
          emissiveIntensity={0.8}
          metalness={0.6}
        />
      </Sphere>

      {/* The Floating Triangle (Answer Window) */}
      <group ref={triangleRef} position={[0, 0, 2.7]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.9, 0.9, 0.05, 3]} />
          <meshStandardMaterial 
            color="#1e40af" 
            emissive="#60a5fa" 
            emissiveIntensity={1.2} 
          />
        </mesh>
      </group>
    </group>
  );
}