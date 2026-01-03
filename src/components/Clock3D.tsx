'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

function LCDScreen() {
  const [time, setTime] = useState(() => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  })
  const groupRef = useRef<THREE.Group>(null)
  const isDragging = useRef(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })
  const rotation = useRef({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })
  const { gl } = useThree()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      setTime(`${hours}:${minutes}:${seconds}`)
    }
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = gl.domElement

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      previousMousePosition.current = { x: e.clientX, y: e.clientY }
      canvas.style.cursor = 'grabbing'
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return

      const deltaX = e.clientX - previousMousePosition.current.x
      const deltaY = e.clientY - previousMousePosition.current.y

      targetRotation.current.y += deltaX * 0.01
      targetRotation.current.x += deltaY * 0.01

      // Clamp rotation
      targetRotation.current.x = Math.max(-0.5, Math.min(0.5, targetRotation.current.x))
      targetRotation.current.y = Math.max(-0.8, Math.min(0.8, targetRotation.current.y))

      previousMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDragging.current = false
      canvas.style.cursor = 'grab'
    }

    const handleMouseLeave = () => {
      isDragging.current = false
      canvas.style.cursor = 'grab'
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    canvas.style.cursor = 'grab'

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [gl])

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth interpolation to target rotation
      rotation.current.x += (targetRotation.current.x - rotation.current.x) * 0.1
      rotation.current.y += (targetRotation.current.y - rotation.current.y) * 0.1

      groupRef.current.rotation.x = rotation.current.x
      groupRef.current.rotation.y = rotation.current.y

      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.015
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main LCD body - rounded rectangle */}
      <RoundedBox args={[2.4, 0.9, 0.15]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.3} />
      </RoundedBox>

      {/* LCD bezel */}
      <RoundedBox args={[2.3, 0.8, 0.05]} radius={0.06} smoothness={4} position={[0, 0, 0.06]}>
        <meshStandardMaterial color="#f4f4f5" metalness={0.1} roughness={0.4} />
      </RoundedBox>

      {/* LCD screen background */}
      <RoundedBox args={[2.1, 0.6, 0.02]} radius={0.04} smoothness={4} position={[0, 0, 0.09]}>
        <meshStandardMaterial color="#e4e4e7" metalness={0.05} roughness={0.5} />
      </RoundedBox>

      {/* Time display */}
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.32}
        color="#18181b"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {time}
      </Text>

      {/* Small indicator dot */}
      <mesh position={[0.9, 0.22, 0.11]}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

export default function Clock3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-[180px] h-[80px] bg-zinc-900 rounded-lg" />
  }

  return (
    <div className="w-[180px] h-[80px]">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <pointLight position={[-3, -3, 3]} intensity={0.2} color="#6366f1" />

        <LCDScreen />
      </Canvas>
    </div>
  )
}
