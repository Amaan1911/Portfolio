import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

/* -- Floating geometric shape -- */
function FloatingShape({ position, geometry, color, speed, distort, scale }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.4}
          metalness={0.8}
          distort={distort}
          speed={1.5}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/* -- Wireframe shape -- */
function WireShape({ position, geometry, color, speed, scale }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.15;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.1;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.08} />
      </mesh>
    </Float>
  );
}

/* -- Particle field -- */
function Particles({ count = 200 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#e07a3a"),
      new THREE.Color("#f0a060"),
      new THREE.Color("#e05577"),
      new THREE.Color("#40bfa0"),
      new THREE.Color("#a78bfa"),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -- Gradient orb -- */
function GradientOrb({ position, scale, color1, color2, speed }) {
  const ref = useRef();
  const mat = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        ref={mat}
        color={color1}
        emissive={color2}
        emissiveIntensity={0.3}
        transparent
        opacity={0.12}
        roughness={0.2}
        metalness={1}
        distort={0.4}
        speed={2}
      />
    </mesh>
  );
}

/* -- Mouse-reactive light -- */
function MouseLight() {
  const light = useRef();
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    if (!light.current) return;
    light.current.position.x = mouse.x * viewport.width * 0.5;
    light.current.position.y = mouse.y * viewport.height * 0.5;
  });

  return <pointLight ref={light} color="#e07a3a" intensity={2} distance={8} />;
}

/* -- Scene -- */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#e07a3a" intensity={0.5} />
      <pointLight position={[-5, -3, 3]} color="#e05577" intensity={0.3} />
      <pointLight position={[0, 3, -5]} color="#40bfa0" intensity={0.3} />
      <MouseLight />

      {/* Particles */}
      <Particles count={300} />
      <Stars radius={15} depth={50} count={800} factor={2} saturation={0.5} fade speed={0.5} />

      {/* Large shapes */}
      <FloatingShape
        position={[-3.5, 1, -3]}
        geometry={<icosahedronGeometry args={[1.5, 1]} />}
        color="#e07a3a"
        speed={0.3}
        distort={0.3}
        scale={1}
      />
      <FloatingShape
        position={[3, -1, -4]}
        geometry={<torusGeometry args={[1, 0.4, 16, 32]} />}
        color="#e05577"
        speed={0.25}
        distort={0.2}
        scale={1.2}
      />
      <FloatingShape
        position={[0, 2.5, -5]}
        geometry={<octahedronGeometry args={[1, 0]} />}
        color="#40bfa0"
        speed={0.35}
        distort={0.25}
        scale={0.9}
      />
      <FloatingShape
        position={[-2, -2, -3]}
        geometry={<dodecahedronGeometry args={[0.8, 0]} />}
        color="#a78bfa"
        speed={0.2}
        distort={0.35}
        scale={1}
      />
      <FloatingShape
        position={[4, 2, -6]}
        geometry={<sphereGeometry args={[1, 32, 32]} />}
        color="#f0a060"
        speed={0.15}
        distort={0.4}
        scale={1.3}
      />

      {/* Wireframes */}
      <WireShape
        position={[2, 0, -2]}
        geometry={<icosahedronGeometry args={[2, 1]} />}
        color="#e07a3a"
        speed={0.15}
        scale={0.8}
      />
      <WireShape
        position={[-4, 3, -5]}
        geometry={<torusKnotGeometry args={[0.8, 0.3, 64, 16]} />}
        color="#e05577"
        speed={0.1}
        scale={0.7}
      />

      {/* Gradient orbs */}
      <GradientOrb position={[5, -2, -8]} scale={2} color1="#e07a3a" color2="#e05577" speed={0.5} />
      <GradientOrb position={[-5, 3, -10]} scale={2.5} color1="#40bfa0" color2="#a78bfa" speed={0.3} />
    </>
  );
}

/* -- Export -- */
export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
