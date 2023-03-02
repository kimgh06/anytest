import React, { useState, useRef, Suspense, useEffect } from "react";
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; //3D 모델 불러오기 위한 로더
import * as THREE from 'three'; //three.js 불러오기
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import './Three.scss';
// import { BufferAttribute, BufferGeometry } from "three";

function Three() {
  return <div className="Three">
    <Canvas id="canvas" shadows={true} camera={{ position: [4, 7, -4] }}>
      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <OrbitControls autoRotate={false} />
        <Box position={[0, 0, 3]} />
        <Box position={[3, 0, 0]} />
        <Platform position={[0, -1, 0]} />
        <Icosahedron />
        <Sun position={[-2, 5, -2]} />
        <axesHelper args={[5]} />
        <MovingOb position={[-2, 0, -2]} />
      </Suspense>
    </Canvas>
  </div>;
}

function MovingOb(props) {
  const mesh = useRef(null);
  function moveob(key) {
    const distance = 0.1;
    if (key === 'ArrowUp') {
      mesh.current.position.z -= distance;
    }
    else if (key === 'ArrowDown') {
      mesh.current.position.z += distance;
    }
    else if (key === 'ArrowLeft') {
      mesh.current.position.x -= distance;
    }
    else if (key === 'ArrowRight') {
      mesh.current.position.x += distance;
    }
  }
  useEffect(e => {
    window.addEventListener('keydown', e => { moveob(e.key) });
  }, []);
  // keyPress(e => moveob(e.key));
  return <mesh ref={mesh} {...props} >
    <boxBufferGeometry args={[0.5, 1, 0.5]} />
    <meshPhongMaterial color={props.color} />
  </mesh>;
}

function Platform(props) {
  const mesh = useRef(null);
  return <mesh
    ref={mesh}
    castShadow
    receiveShadow
    {...props}
  >
    <boxGeometry args={[15, 1, 15]} />
    <meshStandardMaterial color={'darkgreen'} />
  </mesh>;
}

function Icosahedron() {
  const mesh = useRef(null);
  useFrame(e => mesh.current.rotation.x = mesh.current.rotation.z += 0.01);
  const radius = 1;
  const detail = 1;
  const geometry = new THREE.IcosahedronGeometry(radius, detail);
  return (
    <mesh geometry={geometry}
      ref={mesh}
      position={[0, 2, 0]}
      castShadow
      receiveShadow>
      <meshPhysicalMaterial color={"blueviolet"} />
    </mesh>
  );
}

const Sun = props => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.3]} />
      <meshPhongMaterial emissive="darkyellow" />
    </mesh>
  );
};

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
    castShadow
    receiveShadow
  >
    <ambientLight intensity={1} />
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial attach={'material'} color={modo ? 'hotpink' : hovered ? 'orange' : 'gray'} />
  </mesh>;
}

export default Three;