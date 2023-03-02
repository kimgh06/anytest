import React, { useState, useRef, Suspense } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; //3D 모델 불러오기 위한 로더
import * as THREE from 'three'; //three.js 불러오기
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import './Three.scss';
import { BufferAttribute, BufferGeometry } from "three";

function Three() {
  return <div className="Three">
    <Canvas id="canvas" camera={{ position: [3, 3, 3] }}>
      <Suspense fallback={null}>
        <OrbitControls autoRotate={false} />
        <Box position={[0, 0, 3]} />
        <Box position={[3, 0, 0]} />
        <Platform />
        <EquilateralTriangle />
        <axesHelper args={[5]} />
      </Suspense>
    </Canvas>
  </div>;
}

function Platform() {
  const mesh = useRef(null);
  return <mesh
    ref={mesh}
    scale={1}
    position={[0, -1, 0]}>
    <boxGeometry args={[15, 1, 10]} />
    <meshBasicMaterial color={'green'} />
  </mesh>;
}

function EquilateralTriangle() {
  const mesh = useRef(null);
  useFrame(e => mesh.current.rotation.x = mesh.current.rotation.z += 0.01);

  const radius = 1;
  const detail = 1;

  const geometry = new THREE.IcosahedronBufferGeometry(radius, detail);

  return (
    <mesh geometry={geometry}
      ref={mesh}
      position={[0, 2, 0]}>
      <meshBasicMaterial color={"blueviolet"} />
    </mesh>
  );
}

function Box(props) {
  const mesh = useRef(null);
  useFrame(e => mesh.current.rotation.y = mesh.current.rotation.z += 0.01);
  const [modo, setModo] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [act, setAct] = useState(false);
  return <mesh
    ref={mesh}
    scale={act ? 1.5 : 1}
    {...props}
    onPointerOver={e => setHovered(true)}
    onPointerOut={e => setHovered(false)}
    onClick={e => setAct(e => !e)}
    onPointerDown={e => setModo(true)}
    onPointerUp={e => setModo(false)}
  >
    <ambientLight intensity={1} />
    <boxGeometry args={[1, 1, 1]} />
    <meshPhysicalMaterial attach={'material'} color={modo ? 'hotpink' : hovered ? 'orange' : 'gray'} />
  </mesh>;
}

export default Three;