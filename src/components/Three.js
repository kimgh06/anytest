import React, { useState, useRef, Suspense, useEffect } from "react";
import * as THREE from 'three'; //three.js 불러오기
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import './Three.scss';

function Three() {
  return <div className="Three">
    <Canvas id="canvas" shadows={true} camera={{ position: [2, 8, 6] }}>
      <Suspense fallback={null}>
        <OrbitControls autoRotate={false} />
        {/* <World /> */}
        {/* <Capybara /> */}
        <Instances position={[0, 0, 0]} count={10} />
      </Suspense>
    </Canvas>
  </div>;
}

function Instances({ position, count }) {
  const ref = useRef(null);
  useFrame(e => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
  });
  const meshArray = [];
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      for (let k = 0; k < count; k++) {
        meshArray.push(
          <mesh key={i} position={[position[0] + j * 2, position[1] + i * 2, position[2] + k * 2]}>
            <Box />
            <meshStandardMaterial attach="material" />
          </mesh>
        );
      }
    }
  }
  return <mesh ref={ref}>{meshArray}</mesh>;
}

function TextBox(props) {
  const [is, setIs] = useState(false);
  const [posi, setPosi] = useState([]);
  const ref = useRef(null);
  useEffect(e => {
    setPosi([0, 4, 1.5]);
  }, []);
  return <mesh ref={ref}>
    <Html position={[posi[0] - 0.1, posi[1] + 0.2, posi[2] - 0.1]} className="html" style={{ display: is ? 'block' : 'none' }}>
      <div className="textbox1"
        onMouseLeave={e => setIs(false)}
      >
        hello, I'm Capybara
      </div>
    </Html>
    <mesh visible={!is} position={posi}
      onPointerOver={e => setIs(true)}
    >
      <sphereBufferGeometry args={[0.08]} />
    </mesh>
  </mesh >
}

//eslint-disable-next-line
function Capybara(props) {
  const mesh = useRef(null);
  const gltf = useLoader(GLTFLoader, './babara/scene.gltf');
  let mixer;
  useFrame((s, d) => {
    mixer?.update(d);
  });
  useEffect(e => {
    if (gltf.animations.length) {
      //eslint-disable-next-line
      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach(clip => {
        const action = mixer.clipAction(clip)
        action.play();
      });
    }
    //eslint-disable-next-line
  }, []);
  return <mesh>
    <ambientLight />
    <directionalLight />
    <axesHelper args={[5]} />
    <TextBox />
    <Suspense fallback={null}>
      <mesh ref={mesh}>
        <primitive object={gltf.scene} scale={5} />
      </mesh>
    </Suspense>
  </mesh>;
}

//eslint-disable-next-line
function World() {
  const ref = useRef(null);
  // function movecam(key) {
  //   const position = ref.current.position;
  //   const distance = 0.1;
  //   if (key === 'ArrowUp') {
  //     position.z += distance;
  //   }
  //   if (key === 'ArrowDown') {
  //     position.z -= distance;
  //   }
  //   if (key === 'ArrowLeft') {
  //     position.x += distance;
  //   }
  //   if (key === 'ArrowRight') {
  //     position.x -= distance;
  //   }
  // }
  useEffect(e => {
    window.addEventListener('keydown', e => {
      // moveob(e.key);
    });
  }, []);
  return <mesh ref={ref}>
    <Box position={[0, 0, 3]} />
    <Box position={[3, 0, 0]} />
    <Platform position={[0, -1, 0]} />
    <Icosahedron />
    <Sun position={[-2, 5, -2]} />
    <axesHelper args={[5]} />
    <Tree position={[-5, 0, 5]} />
    <MovingOb />
  </mesh>;
}

function MovingOb(props) {
  const mesh = useRef(null);
  let keyp = new Set();
  const [jump, setJump] = useState(0);
  const [isjump, setIsjump] = useState(false);
  const [x, setX] = useState(0);
  const [z, setZ] = useState(0);
  useFrame(e => {
    if (isjump) {
      setJump(e => Math.sin(mesh.current.position.y - 30));
    }
    else {
      setJump(e => Math.sin(0));
      setJump(e => Math.sin(mesh.current.position.y + 0));
    }
  });
  function moveob() {
    const distance = 0.1;
    if (keyp.has('ArrowUp')) {
      setZ(e => e - distance);
    }
    if (keyp.has('ArrowDown')) {
      setZ(e => e + distance);
    }
    if (keyp.has('ArrowLeft')) {
      setX(e => e - distance);
    }
    if (keyp.has('ArrowRight')) {
      setX(e => e + distance);
    }
    if (keyp.has(' ')) {
      setIsjump(true);
      setTimeout(() => {
        setIsjump(false);
      }, 100); // 6프레임
    }
    if (keyp.has('0')) {
      mesh.current.rotation.y += 0.5;
    }
  }
  useEffect(e => {
    window.addEventListener('keydown', e => {
      keyp.add(e.key);
      moveob();
    });
    window.addEventListener('keyup', e => {
      keyp.delete(e.key);
      moveob();
    });
    //eslint-disable-next-line
  }, []);
  return <mesh ref={mesh}
    position={[-2 + x, 0 + jump, -2 + z]}
    castShadow receiveShadow >
    <boxBufferGeometry args={[0.5, 1, 0.5]} />
    <mesh ref={mesh} position={[0, 0.2, -0.15]}>
      <boxBufferGeometry args={[0.3, 0.3, 0.3]} />
    </mesh>
    <meshStandardMaterial color={'blue'} />
  </mesh>;
}

function Tree(props) {
  const mesh = useRef(null);
  const woodTexture = useLoader(THREE.TextureLoader, "./download.jpg");
  const leafTexture = useLoader(THREE.TextureLoader, './leaf.jpg')
  const x = props.position[0];
  const y = props.position[1];
  const z = props.position[2];
  return <mesh
    ref={mesh}
    castShadow
    receiveShadow
  >
    <ambientLight intensity={1} />
    <NoBox position={[x, y, z]} color={'brown'} map={woodTexture} />
    <NoBox position={[x, y + 1, z]} color={'brown'} map={woodTexture} />
    <NoBox position={[x, y + 2, z]} color={'brown'} map={woodTexture} />
    <NoBox position={[x, y + 3, z]} color={'brown'} map={woodTexture} />
    <NoBox position={[x, y + 5, z]} opacity={0.7} map={leafTexture} />
    <NoBox position={[x + 1, y + 3, z]} opacity={0.7} map={leafTexture} />
    <NoBox position={[x + 1, y + 4, z]} opacity={0.7} map={leafTexture} />
    <NoBox position={[x - 1, y + 3, z]} opacity={0.7} map={leafTexture} />
    <NoBox position={[x - 1, y + 4, z]} opacity={0.7} map={leafTexture} />
    <NoBox position={[x, y + 3, z + 1]} opacity={0.7} map={leafTexture} />
    <NoBox position={[x, y + 4, z + 1]} opacity={0.7} map={leafTexture} />
    <NoBox position={[x, y + 3, z - 1]} opacity={0.7} map={leafTexture} />
    <NoBox position={[x, y + 4, z - 1]} opacity={0.7} map={leafTexture} />
  </mesh>;
}

function NoBox(props) {
  return <mesh
    position={props.position}
    castShadow
    receiveShadow
  >
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial opacity={props.opacity} transparent color={props.color} map={props.map} />
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
      <meshStandardMaterial wireframe color={"blueviolet"} />
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