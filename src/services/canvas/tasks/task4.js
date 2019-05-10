import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { axis, line } from './task3';

 const cube = ( w, h, d ) => {
    var geometry = new THREE.BoxBufferGeometry( w, h, d );
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.2 });
    return new THREE.Mesh(geometry, material);
 }

const task4 = (canvasRef, gui) => {
  const state = {
      posX: 0,
      posY: 0,
      posZ: 0,
      width: 400,
      height: 400,
      depth: 400
  };

  gui.add(state, 'posX').min(-200).max(200);
  gui.add(state, 'posY').min(-200).max(200);
  gui.add(state, 'posZ').min(-200).max(200);
  gui.add(state, 'width').min(100).max(500);
  gui.add(state, 'height').min(100).max(500);
  gui.add(state, 'depth').min(100).max(500);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(8);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.position.set(0, 0, 1000);
  const controls = new OrbitControls(camera);
  controls.update();

  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  let arr = []
  for (let i = 0; i < 10; i++) {
    const pos1X = Math.floor(Math.random() * 1000) - 500;
    const pos1Y = Math.floor(Math.random() * 1000) - 500;
    const pos1Z = Math.floor(Math.random() * 1000) - 500;
    const pos2X = Math.floor(Math.random() * pos1X);
    const pos2Y = Math.floor(Math.random() * pos1Y);
    const pos2Z = Math.floor(Math.random() * pos1Z);
    arr.push({
      pos1X,
      pos1Y,
      pos1Z,
      pos2X,
      pos2Y,
      pos2Z
    })
    scene.add(line(pos1X, pos1Y, pos1Z, pos2X, pos2Y, pos2Z, state))
  }

  let cubeMesh;

  const loop = () => {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
    for (let i = 0; i<arr.length; i++) {
      scene.add(line(arr[i].pos1X, arr[i].pos1Y, arr[i].pos1Z, arr[i].pos2X, arr[i].pos2Y, arr[i].pos2Z, state));
    }

    scene.add(axis("x"));
    scene.add(axis("y"));
    scene.add(axis("z"));

    cubeMesh = cube(state.width, state.height, state.depth);
    cubeMesh.position.x = state.posX;
    cubeMesh.position.y = state.posY;
    cubeMesh.position.z = state.posZ;
    scene.add(cubeMesh);
    renderer.render(scene, camera);
    requestAnimationFrame(() => loop());
  };

  loop();
};

export default task4;
