import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const Blob = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const { mouse } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            meshRef.current.rotation.x = time * 0.1 + mouse.y * 0.15;
            meshRef.current.rotation.y = time * 0.15 + mouse.x * 0.15;
            meshRef.current.rotation.z = Math.sin(time * 0.05) * 0.05;

            meshRef.current.position.x = 2 + Math.sin(time * 0.2) * 0.2 + mouse.x * 0.3;
            meshRef.current.position.y = Math.cos(time * 0.15) * 0.15 + mouse.y * 0.3;

            if (materialRef.current && materialRef.current.distort !== undefined) {
                materialRef.current.distort = 0.3 + Math.sin(time * 0.3) * 0.05;
            }
        }
    });

    return (
        <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.6}>
            <Sphere args={[1, 128, 128]} scale={2.8} ref={meshRef}>
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#e0e7ff"
                    attach="material"
                    distort={0.3}
                    speed={1}
                    roughness={0.1}
                    metalness={0.9}
                    envMapIntensity={1.5}
                />
            </Sphere>
        </Float>
    );
};

const GlassSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.x = time * 0.06;
            meshRef.current.rotation.y = time * 0.1;
            meshRef.current.position.x = -2.5 + Math.sin(time * 0.3) * 0.2;
            meshRef.current.position.y = -1 + Math.cos(time * 0.2) * 0.15;
        }
    });

    return (
        <Sphere args={[0.5, 64, 64]} ref={meshRef} position={[-2.5, -1, -1.5]}>
            <MeshTransmissionMaterial
                backside
                samples={16}
                resolution={512}
                transmission={0.9}
                roughness={0.05}
                thickness={0.5}
                ior={1.4}
                chromaticAberration={0.04}
                anisotropy={0.06}
                distortion={0.1}
                distortionScale={0.2}
                temporalDistortion={0.3}
            />
        </Sphere>
    );
};

const SmallSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.x = time * 0.12;
            meshRef.current.rotation.y = time * 0.15;
            meshRef.current.position.x = 3 + Math.sin(time * 0.4) * 0.25;
            meshRef.current.position.y = 2 + Math.cos(time * 0.35) * 0.2;
        }
    });

    return (
        <Sphere args={[0.3, 48, 48]} ref={meshRef} position={[3, 2, -2]}>
            <MeshDistortMaterial
                color="#c7d2fe"
                distort={0.2}
                speed={1.5}
                roughness={0.15}
                metalness={0.85}
            />
        </Sphere>
    );
};

const Scene = () => {
    return (
        <>
            <Environment preset="studio" />
            <ambientLight intensity={0.65} />
            <directionalLight position={[6, 6, 6]} intensity={0.9} color="#f8fafc" />
            <directionalLight position={[-6, -6, -6]} intensity={0.4} color="#e2e8f0" />
            <pointLight position={[10, 10, 10]} intensity={0.35} color="#93c5fd" />
            <pointLight position={[-10, -10, -10]} intensity={0.25} color="#c4b5fd" />
            <spotLight
                position={[0, 12, 0]}
                angle={0.25}
                penumbra={1}
                intensity={0.5}
                color="#f8fafc"
            />
            <Blob />
            <GlassSphere />
            <SmallSphere />
        </>
    );
};

export const Experience = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
            <Canvas
                camera={{ position: [0, 0, 9], fov: 40 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};
