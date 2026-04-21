'use client';

import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProjectAssetProps {
  index: number;
  hovered: boolean;
}

/**
 * 3D Book — Two covers that open/close on hover.
 */
const BookAsset = ({ hovered }: { hovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftCoverRef = useRef<THREE.Group>(null);
  const pagesRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      groupRef.current.rotation.y += 0.015;
    }
  });

  useEffect(() => {
    if (leftCoverRef.current) {
      gsap.to(leftCoverRef.current.rotation, {
        y: hovered ? -Math.PI / 3 : 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
    if (pagesRef.current) {
      gsap.to(pagesRef.current.scale, {
        x: hovered ? 1 : 0.01,
        duration: 0.5,
      });
    }
  }, [hovered]);

  return (
    <group ref={groupRef}>
      {/* Right cover (back) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.04]} />
        <meshPhysicalMaterial
          color="#4a90d9"
          metalness={0.3}
          roughness={0.4}
          clearcoat={0.8}
        />
      </mesh>
      {/* Left cover — pivots open */}
      <group ref={leftCoverRef} position={[-0.3, 0, 0.02]}>
        <mesh position={[0.3, 0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.04]} />
          <meshPhysicalMaterial
            color="#5ba0e8"
            metalness={0.3}
            roughness={0.4}
            clearcoat={0.8}
          />
        </mesh>
      </group>
      {/* Pages inside */}
      <mesh ref={pagesRef} position={[0, 0, 0.01]} scale={[0.01, 1, 1]}>
        <boxGeometry args={[0.5, 0.72, 0.03]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
    </group>
  );
};

/**
 * 💰 Gold Coin — spins faster on hover, pulses gently.
 */
const CoinAsset = ({ hovered }: { hovered: boolean }) => {
  const coinRef = useRef<THREE.Mesh>(null);
  const speedRef = useRef(0.01);

  useEffect(() => {
    gsap.to(speedRef, { current: hovered ? 0.08 : 0.015, duration: 0.5 });
  }, [hovered]);

  useFrame((state) => {
    if (coinRef.current) {
      coinRef.current.rotation.z += speedRef.current;
      coinRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.06;
      const s = hovered ? 1.2 : 1;
      coinRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.05);
    }
  });

  return (
    <group ref={coinRef} rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.35, 0.35, 0.06, 32]} />
        <meshPhysicalMaterial
          color="#ffd700"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          emissive="#ff8c00"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
};

/**
 * 💿 Vinyl Record — continuous spin, speeds up on hover.
 */
const VinylAsset = ({ hovered }: { hovered: boolean }) => {
  const discRef = useRef<THREE.Group>(null);
  const speedRef = useRef(0.015);

  useEffect(() => {
    gsap.to(speedRef, { current: hovered ? 0.06 : 0.015, duration: 0.8 });
  }, [hovered]);

  useFrame((state) => {
    if (discRef.current) {
      discRef.current.rotation.y += speedRef.current;
      discRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    }
  });

  return (
    <group ref={discRef} rotation={[Math.PI / 6, 0, 0]}>
      {/* Outer disc */}
      <mesh>
        <cylinderGeometry args={[0.45, 0.45, 0.03, 32]} />
        <meshPhysicalMaterial
          color="#111111"
          metalness={0.7}
          roughness={0.3}
          clearcoat={0.5}
        />
      </mesh>
      {/* Center label */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} />
        <meshPhysicalMaterial
          color="#e74c3c"
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>
      {/* Spindle hole */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
};

/**
 * 🛍️ Shopping Bag — gentle sway, bounces on hover.
 */
const ShoppingBagAsset = ({ hovered }: { hovered: boolean }) => {
  const bagRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (bagRef.current) {
      bagRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 0.06;
      bagRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * (hovered ? 0.15 : 0.05);
      bagRef.current.rotation.y += 0.015;
    }
  });

  useEffect(() => {
    if (bagRef.current) {
      gsap.to(bagRef.current.scale, {
        x: hovered ? 1.2 : 1,
        y: hovered ? 1.2 : 1,
        z: hovered ? 1.2 : 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  }, [hovered]);

  return (
    <group ref={bagRef}>
      {/* Bag body */}
      <mesh>
        <boxGeometry args={[0.5, 0.6, 0.3]} />
        <meshPhysicalMaterial
          color="#9b59b6"
          metalness={0.2}
          roughness={0.5}
          clearcoat={0.6}
        />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.15, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#7d3c98" />
      </mesh>
    </group>
  );
};

/**
 * 🎬 Movie Reel — spins with "film holes" effect.
 */
const MovieReelAsset = ({ hovered }: { hovered: boolean }) => {
  const reelRef = useRef<THREE.Group>(null);
  const speedRef = useRef(0.015);

  useEffect(() => {
    gsap.to(speedRef, { current: hovered ? 0.07 : 0.015, duration: 0.6 });
  }, [hovered]);

  useFrame((state) => {
    if (reelRef.current) {
      reelRef.current.rotation.z += speedRef.current;
      reelRef.current.rotation.y += 0.015;
      reelRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group ref={reelRef}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[0.35, 0.08, 16, 32]} />
        <meshPhysicalMaterial
          color="#2c3e50"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.7}
        />
      </mesh>
      {/* Inner hub */}
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 6]} />
        <meshPhysicalMaterial
          color="#34495e"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Center dot */}
      <mesh position={[0, 0, 0.06]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#e74c3c" emissive="#e74c3c" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

/**
 * 🤖 Robot head — floats, "blinks" on hover.
 */
const RobotAsset = ({ hovered }: { hovered: boolean }) => {
  const robotRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (robotRef.current) {
      robotRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.6) * 0.07;
      robotRef.current.rotation.y += 0.015;
    }
  });

  useEffect(() => {
    const eyeEmissive = hovered ? 1 : 0.3;
    if (leftEyeRef.current) {
      gsap.to((leftEyeRef.current.material as THREE.MeshStandardMaterial), {
        emissiveIntensity: eyeEmissive,
        duration: 0.3,
      });
    }
    if (rightEyeRef.current) {
      gsap.to((rightEyeRef.current.material as THREE.MeshStandardMaterial), {
        emissiveIntensity: eyeEmissive,
        duration: 0.3,
      });
    }
  }, [hovered]);

  return (
    <group ref={robotRef}>
      {/* Head */}
      <mesh>
        <boxGeometry args={[0.5, 0.45, 0.4]} />
        <meshPhysicalMaterial
          color="#95a5a6"
          metalness={0.7}
          roughness={0.2}
          clearcoat={0.5}
        />
      </mesh>
      {/* Left eye */}
      <mesh ref={leftEyeRef} position={[-0.12, 0.05, 0.21]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.3} />
      </mesh>
      {/* Right eye */}
      <mesh ref={rightEyeRef} position={[0.12, 0.05, 0.21]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.3} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#e74c3c" emissive="#e74c3c" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

/**
 * ⏳ Hourglass — slow rotation, speeds up on hover.
 */
const HourglassAsset = ({ hovered }: { hovered: boolean }) => {
  const glassRef = useRef<THREE.Group>(null);
  const speedRef = useRef(0.005);

  useEffect(() => {
    gsap.to(speedRef, { current: hovered ? 0.04 : 0.015, duration: 0.5 });
  }, [hovered]);

  useFrame((state) => {
    if (glassRef.current) {
      glassRef.current.rotation.y += 0.015;
      glassRef.current.rotation.z += speedRef.current;
      glassRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.3) * 0.06;
    }
  });

  return (
    <group ref={glassRef}>
      {/* Top bulb */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#e8d5b7"
          transparent
          opacity={0.6}
          metalness={0.1}
          roughness={0.1}
          transmission={0.5}
        />
      </mesh>
      {/* Bottom bulb */}
      <mesh position={[0, -0.25, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#e8d5b7"
          transparent
          opacity={0.6}
          metalness={0.1}
          roughness={0.1}
          transmission={0.5}
        />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 12]} />
        <meshPhysicalMaterial color="#daa520" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Sand */}
      <mesh position={[0, -0.18, 0]}>
        <sphereGeometry args={[0.12, 12, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#f4a460" />
      </mesh>
      {/* Top ring */}
      <mesh position={[0, 0.25, 0]}>
        <torusGeometry args={[0.2, 0.02, 8, 24]} />
        <meshPhysicalMaterial color="#daa520" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Bottom ring */}
      <mesh position={[0, -0.25, 0]}>
        <torusGeometry args={[0.2, 0.02, 8, 24]} />
        <meshPhysicalMaterial color="#daa520" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

/**
 * Main factory component — renders the correct 3D asset based on project index.
 *
 * Index mapping (matches projects.ts order):
 * 0 = AI Book Reader   → Book
 * 1 = FinTrack AI       → Coin
 * 2 = Music Player      → Vinyl
 * 3 = E-commerce        → Shopping Bag
 * 4 = MoodFlick AI      → Movie Reel
 * 5 = AI Chatbot        → Robot
 * 6 = Focus Clock       → Hourglass
 */
const ProjectAsset = ({ index, hovered }: ProjectAssetProps) => {
  const assets = [
    <BookAsset key={0} hovered={hovered} />,
    <CoinAsset key={1} hovered={hovered} />,
    <VinylAsset key={2} hovered={hovered} />,
    <ShoppingBagAsset key={3} hovered={hovered} />,
    <MovieReelAsset key={4} hovered={hovered} />,
    <RobotAsset key={5} hovered={hovered} />,
    <HourglassAsset key={6} hovered={hovered} />,
  ];

  return (
    <group position={[0, 2.8, 0.2]} scale={[1.3, 1.3, 1.3]}>
      <pointLight position={[0, 0.5, 1]} intensity={2} distance={3} color="#ffffff" />
      {assets[index] || null}
    </group>
  );
};

export default ProjectAsset;
