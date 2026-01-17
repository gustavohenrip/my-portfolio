import { useRef, useMemo, useState, memo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const GravityParticles = memo(function GravityParticles({ count = 20 }) {
  const mesh = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const frameCount = useRef(0)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 12
        ),
        basePosition: new THREE.Vector3(
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 12
        ),
        size: 0.03 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3
      })
    }
    return temp
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    frameCount.current++
    if (frameCount.current % 3 !== 0) return

    const time = clock.getElapsedTime()

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      particle.position.x = particle.basePosition.x + Math.sin(time * particle.speed + particle.phase) * 2
      particle.position.y = particle.basePosition.y + Math.cos(time * particle.speed * 0.7 + particle.phase) * 2
      particle.position.z = particle.basePosition.z + Math.sin(time * particle.speed * 0.5 + particle.phase) * 1

      dummy.position.copy(particle.position)
      dummy.scale.setScalar(particle.size)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled>
      <sphereGeometry args={[0.12, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
    </instancedMesh>
  )
})

const InteractiveBlob = memo(function InteractiveBlob() {
  const groupRef = useRef(null)
  const mesh = useRef(null)
  const materialRef = useRef(null)
  const frameCount = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const viewport = useRef({ w: 1920, h: 1080 })
  const moveRaf = useRef(null)
  const pendingMove = useRef(false)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updateViewport = () => {
      viewport.current = {
        w: window.innerWidth || 1920,
        h: window.innerHeight || 1080
      }
    }
    updateViewport()
    window.addEventListener('resize', updateViewport, { passive: true })

    const onPointerMove = (e) => {
      if (pendingMove.current) return
      pendingMove.current = true
      const x = e.clientX
      const y = e.clientY
      moveRaf.current = requestAnimationFrame(() => {
        pendingMove.current = false
        mouseRef.current = { x, y }
      })
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('pointermove', onPointerMove)
      if (moveRaf.current) cancelAnimationFrame(moveRaf.current)
    }
  }, [])

  useFrame(({ clock }) => {
    frameCount.current++
    if (frameCount.current % 2 !== 0) return

    const time = clock.getElapsedTime()
    const mxTarget = (mouseRef.current.x / viewport.current.w - 0.5) * 2
    const myTarget = (mouseRef.current.y / viewport.current.h - 0.5) * 2
    mouseTarget.current.x = mxTarget
    mouseTarget.current.y = myTarget
    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.04
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.04
    const mx = mouseCurrent.current.x
    const my = mouseCurrent.current.y
    
    const wave1 = Math.sin(time * 1.2 + mx * 0.5) * 0.12
    const wave2 = Math.sin(time * 0.8 - my * 0.3) * 0.09
    const wave3 = Math.cos(time * 1.5 + mx * 0.2 + my * 0.2) * 0.07

    if (groupRef.current) {
      groupRef.current.position.x = mx * 1.2 + Math.sin(time * 0.2) * 0.3
      groupRef.current.position.y = -my * 0.9 + Math.cos(time * 0.15) * 0.2
    }

    if (mesh.current) {
      mesh.current.rotation.x = time * 0.04 + my * 0.12 + wave1 * 0.3
      mesh.current.rotation.y = time * 0.05 + mx * 0.15 + wave2 * 0.3
      mesh.current.rotation.z = wave3 * 0.15
    }
    
    if (materialRef.current) {
      const baseDistort = 0.18
      const waveDistort = wave1 + wave2 + wave3
      materialRef.current.distort = baseDistort + waveDistort * 0.9
      materialRef.current.speed = 0.4 + Math.abs(wave1) * 2.6
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.15}>
        <Sphere ref={mesh} args={[2.4, 32, 32]} scale={2.0}>
          <MeshDistortMaterial
            ref={materialRef}
            color="#0a0318"
            roughness={0.15}
            metalness={0.9}
            distort={0.12}
            speed={0.5}
            envMapIntensity={0.7}
          />
        </Sphere>
      </Float>
    </group>
  )
})

const OrbitingRings = memo(function OrbitingRings() {
  const groupRef = useRef(null)
  const frameCount = useRef(0)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    frameCount.current++
    if (frameCount.current % 3 !== 0) return

    const time = clock.getElapsedTime()
    groupRef.current.rotation.x = time * 0.06
    groupRef.current.rotation.y = time * 0.08
  })

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5, 0.006, 6, 36]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[4.3, 0.006, 6, 36]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.03} />
      </mesh>
    </group>
  )
})

const FloatingGrid = memo(function FloatingGrid() {
  const gridRef = useRef(null)
  const frameCount = useRef(0)

  useFrame(({ clock }) => {
    if (!gridRef.current) return
    frameCount.current++
    if (frameCount.current % 4 !== 0) return

    const time = clock.getElapsedTime()
    gridRef.current.position.y = -8 + Math.sin(time * 0.1) * 0.15
  })

  return (
    <group ref={gridRef} position={[0, -8, -5]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <gridHelper args={[40, 20, '#1a1a2e', '#0d0d15']} />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#030308" transparent opacity={0.95} />
      </mesh>
    </group>
  )
})

const Scene = memo(function Scene() {
  return (
    <>
      <fog attach="fog" args={['#050508', 12, 50]} />
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.12} penumbra={1} intensity={0.3} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} color="#7b2ff7" intensity={0.12} />
      <pointLight position={[10, 10, -10]} color="#00d4ff" intensity={0.1} />
      
      <InteractiveBlob />
      <OrbitingRings />
      <GravityParticles count={20} />
      <FloatingGrid />
      
      <Environment preset="night" />
    </>
  )
})

export function HeroBackground() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-10 pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        dpr={isMobile ? 0.5 : 0.75}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        frameloop="always"
        style={{ pointerEvents: 'none' }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  )
}
