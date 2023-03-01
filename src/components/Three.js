import React from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; //3D 모델 불러오기 위한 로더
import * as THREE from 'three'; //three.js 불러오기
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import './Three.scss';

function Three() {
  return <div className="Three">
    <Canvas id="canvas">
      <OrbitControls autoRotate={true} />
      <mesh>
        <ambientLight intensity={1} />
        <boxGeometry args={[1, 1, 1]} /> //
        <meshStandardMaterial attach={'material'} color={'gray'} />
      </mesh>
    </Canvas>
  </div>;
}

export default Three;