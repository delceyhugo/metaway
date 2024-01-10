import React, {useState, useEffect, useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import Metaway from '../Logo'


const Cube = ({position, size, color}) =>{
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
  })
  return(
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const Sphere = ({position, size, color}) =>{
  const ref = useRef()
  useFrame((state, delta) => {
    // ref.current.rotation.x += delta
    // ref.current.rotation.y += delta
  })
  return(
    <mesh position={position} ref={ref}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}



const Meta = ({position, size, rotation}) =>{
  const ref = useRef()
  // useFrame((state, delta) => {
  //   ref.current.rotation.y += (delta + 0.015)
  // })
  return(
    <mesh ref={ref}>
      <Metaway position={position} size={size} rotation={rotation} />
    </mesh>
  )
}




export default function Three() {


    return (
      <div className='Three' style={{height: '100vh'}}>
        <Canvas camera={{fov: 2,  near: 1, position: [0, 0, 300]}}>
            <ambientLight intensity={5} />
            <directionalLight intensity={2} position={[0, 0, 5]} color="white" />
            {/* <Cube position={[0,0,0]} size={[2,2,2]} color={"green"}/> */}
            {/* <Sphere position={[0,0,0]} size={[2,32,32]} color={"green"}/> */}
            <Meta position={[0,0,0]} rotation={[0,-0.25,0]} />
            <OrbitControls />
        </Canvas>
      </div>
    );
}