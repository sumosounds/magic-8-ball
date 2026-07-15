import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface Magic8BallSceneProps {
  isShaking: boolean;
}

export function Magic8BallScene({ isShaking }: Magic8BallSceneProps) {
  const ballRef = useRef<THREE.Group>(null);
  

  useFrame((state) => {
    if (ballRef.current) {
      if (isShaking) {
        // Strong shake while scanning
        ballRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 20) * 0.8;
        ballRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 18) * 0.7;
      } else {
        // Gentle idle rotation after shake
        ballRef.current.rotation.y = state.clock.elapsedTime * 0.12;
        ballRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
      }
    }
  });

  // Reset rotation when shaking stops
  useEffect(() => {
    if (!isShaking && ballRef.current) {
      // Smoothly return to normal position
      ballRef.current.rotation.x = 0.05;
    }
  }, [isShaking]);

  return (
    <group ref={ballRef}>
      {/* Main Ball */}
      <Sphere args={[3]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.5} 
          roughness={0.2} 
        />
      </Sphere>

      {/* Window Frame */}
      <Cylinder 
        args={[1.85, 1.85, 0.4, 64]} 
        position={[0, 0, 2.1]} 
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#1f1f1f" metalness={0.9} roughness={0.3} />
      </Cylinder>

      {/* White Ring */}
      <Sphere args={[1.65]} position={[0, 0, 2.3]}>
        <meshStandardMaterial color="#eeeeee" />
      </Sphere>

      {/* Blue Glow Window */}
      <Sphere args={[1.4]} position={[0, 0, 2.45]}>
        <meshStandardMaterial 
          color="#1e3a8a" 
          emissive="#3b82f6" 
          emissiveIntensity={0.9}
        />
      </Sphere>

      {/* Triangle Answer Area */}
      <group position={[0, 0, 2.7]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.85, 0.85, 0.08, 3]} />
          <meshStandardMaterial 
            color="#1e40af" 
            emissive="#60a5fa" 
            emissiveIntensity={1.4} 
          />
        </mesh>
      </group>
    </group>
  );
}