import React from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import './Three.scss';
import * as THREE from 'three';

function Three() {
  return <>
    <Canvas id="canvas">
      <OrbitControls autoRotate={true} />
      <mesh>
        <ambientLight intensity={1} />
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial attach={'material'} color={'blue'} />
      </mesh>
    </Canvas>
  </>;
}

export default Three;