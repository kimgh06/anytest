import React, { useEffect, Suspense } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; //3D 모델 불러오기 위한 로더

function Elephant(props) {
  const gltf = useLoader(GLTFLoader, './3d/scene.gltf');
  useEffect(e => {
    const model = gltf.scene;
    model.position.y = -50;
    //eslint-disable-next-line
  }, []);
  return <Suspense fallback={null}>
    <primitive object={gltf.scene} />
  </Suspense>;
}

export default Elephant;