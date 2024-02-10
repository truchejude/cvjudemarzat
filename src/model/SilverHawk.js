import React from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const myMesh = React.useRef()
  const { nodes, materials } = useGLTF("/silver-hawk_legend_burst.glb");

  useFrame(({ clock }) => {
    myMesh.current.rotation.z = clock.getElapsedTime()
  })
  
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, -7]} rotation={[-Math.PI / 2, 0, 0]} ref={myMesh}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials["02___Default"]}
          position={[-3.955, -5, -3.285]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/silver-hawk_legend_burst.glb");

export default function App() {
  return (
    <div id="canvas-container">
      <Canvas style={{ width: '200px', height: '200px' }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[5, 10, 0]} />
        <mesh>
          <Model />
        </mesh>
      </Canvas>

    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)