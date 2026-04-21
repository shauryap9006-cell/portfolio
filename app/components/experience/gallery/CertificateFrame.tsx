import { Image, Text, Float, Edges } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { withBase } from "@constants/pathConfig";

interface CertificateFrameProps {
  title: string;
  issuer: string;
  date: string;
  image: string;
  position: THREE.Vector3;
  rotation?: THREE.Euler;
  forceHover?: boolean;
  onClick?: () => void;
}

const Medal = () => {
  return (
    <group scale={0.4} position={[0, 1.2, 0.2]}>
      {/* Medal Body */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        <meshPhysicalMaterial
          color="#ffd700"
          metalness={1}
          roughness={0.1}
          clearcoat={1}
          emissive="#ffae00"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Ribbon */}
      <mesh position={[0, 0.2, -0.05]}>
        <boxGeometry args={[0.15, 0.5, 0.02]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
    </group>
  );
};

const CertificateFrame = ({
  title,
  issuer,
  date,
  image,
  description,
  position,
  rotation,
  forceHover,
  onClick
}: CertificateFrameProps & { description?: string }) => {
  const frameRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const isHighlighted = hovered || forceHover;

  useEffect(() => {
    if (!frameRef.current) return;
    const [,,, textGroup] = frameRef.current.children;

    gsap.to(frameRef.current.scale, {
      x: isHighlighted ? 1.15 : 1,
      y: isHighlighted ? 1.15 : 1,
      z: isHighlighted ? 1.15 : 1,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(textGroup.position, {
      y: isHighlighted ? -1.8 : -1.5,
      duration: 0.4,
    });
  }, [isHighlighted]);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    thickness: 0.4,
    roughness: 0.05,
    transmission: 1.0,
    ior: 1.45,
    dispersion: 8,
    transparent: true,
    opacity: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0,
    reflectivity: 0.5,
  }), []);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4} position={position as THREE.Vector3}>
      <group
        ref={frameRef}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        scale={[1, 1, 1]}
      >
        {/* Floating Medal */}
        <Medal />

        {/* The Frame / Glass */}
        <mesh scale={[4.2, 2.8, 0.15]}>
          <boxGeometry />
          <primitive object={glassMaterial} attach="material" />
          <Edges color="white" lineWidth={1} />
        </mesh>

        {/* The Certificate Image */}
        <Image
          url={withBase(image)}
          alt={title}
          scale={[4, 2.6]}
          position={[0, 0, 0.08]}
          transparent
          side={THREE.DoubleSide}
        />

        {/* Text Info (Small, floating below) */}
        <group position={[0, -1.5, 0.1]}>
          <Text
            font={withBase("soria-font.ttf")}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {title.toUpperCase()}
          </Text>
          <Text
            font={withBase("soria-font.ttf")}
            fontSize={0.15}
            color="#aaa"
            position={[0, -0.25, 0]}
            anchorX="center"
            anchorY="middle"
          >
            {issuer} • {date}
          </Text>

          {description && (
            <Text
              font={withBase("Vercetti-Regular.woff")}
              fontSize={0.12}
              color="#ccc"
              position={[0, -0.6, 0]}
              maxWidth={3.5}
              anchorX="center"
              anchorY="top"
              fillOpacity={isHighlighted ? 1 : 0}
            >
              {description}
            </Text>
          )}
        </group>

        {/* Subtle glow / border */}
        <mesh position={[0, 0, -0.05]} scale={[4.3, 2.9, 0.01]}>
          <boxGeometry />
          <meshBasicMaterial color="#ffffff" transparent opacity={isHighlighted ? 0.3 : 0.05} />
        </mesh>
      </group>
    </Float>
  );
};

export default CertificateFrame;

// modifed by shaurya
