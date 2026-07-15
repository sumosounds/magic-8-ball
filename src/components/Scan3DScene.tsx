import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface Scan3DSceneProps {
  isScanning: boolean;
  result: 'nice' | 'naughty' | null;
}

export function Scan3DScene({ isScanning, result }: Scan3DSceneProps) {
  const scannerRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (scannerRef.current) {
      scannerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (beamRef.current && isScanning) {
      beamRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.2;
    }
  });

  return (
    <group>
      <group ref={scannerRef} position={[0, 0.5, 0]}>
        {/* Scanner Body */}
        <Box args={[3.5, 1.2, 2.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.3} />
        </Box>

        {/* Red Top */}
        <Box args={[3.6, 0.3, 2.9]} position={[0, 0.8, 0]}>
          <meshStandardMaterial color="#ff0033" emissive="#ff0033" emissiveIntensity={0.6} />
        </Box>

        {/* Glass Dome */}
        <Sphere args={[1.6]} position={[0, 1.8, 0]}>
          <meshStandardMaterial color="#88ccff" transparent opacity={0.35} metalness={0.9} />
        </Sphere>

        {/* Scanning Beam */}
        <group ref={beamRef} visible={isScanning || !!result}>
          <Cylinder args={[0.08, 0.08, 12]} position={[0, 6, 0]} rotation={[Math.PI, 0, 0]}>
            <meshBasicMaterial color="#ffcc00" transparent opacity={0.75} />
          </Cylinder>
        </group>
      </group>
    </group>
  );
}