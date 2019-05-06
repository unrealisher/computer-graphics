import * as THREE from "three";
import * as dat from "dat.gui";

const renderCanvas = canvasRef => {
  const gui = new dat.GUI();

  const ball = {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
  };

  gui
    .add(ball, "rotationX")
    .min(-Math.PI / 500)
    .max(Math.PI / 500);

  gui
    .add(ball, "rotationY")
    .min(-Math.PI / 500)
    .max(Math.PI / 500);

  gui
    .add(ball, "rotationZ")
    .min(-Math.PI / 500)
    .max(Math.PI / 500);

  gui
    .add(ball, "positionX")
    .min(-100)
    .max(100);

  gui
    .add(ball, "positionY")
    .min(-100)
    .max(100);

  gui
    .add(ball, "positionZ")
    .min(-100)
    .max(100);

  const width = window.innerWidth;
  const height = window.innerHeight;
  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(8);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.position.set(0, 0, 1000);

  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const geometry = new THREE.SphereGeometry(200, 12, 12);

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors
  });

  geometry.faces.forEach(item => {
    item.color.setRGB(Math.random(), Math.random(), Math.random());
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  const loop = () => {
    mesh.position.x = ball.positionX;
    mesh.position.y = ball.positionY;
    mesh.position.z = ball.positionZ;
    mesh.rotation.x += ball.rotationX;
    mesh.rotation.y += ball.rotationY;
    mesh.rotation.z += ball.rotationZ;
    renderer.render(scene, camera);
    requestAnimationFrame(() => loop());
  };

  loop();
};

export default renderCanvas;
