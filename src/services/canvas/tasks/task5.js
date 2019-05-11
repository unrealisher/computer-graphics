import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

const cube = () => {
    const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
    const material = new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 50 })
    return new THREE.Mesh(geometry, material);
}

 const sphere = () => {
     const geometry = new THREE.SphereBufferGeometry(70, 32);
     const material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 50 });
     return new THREE.Mesh(geometry, material);
 }

 const ground = () => {
     const geometry = new THREE.PlaneBufferGeometry(2000, 2000, 32);
     const material = new THREE.MeshPhongMaterial({ color: 0x666666, shininess: 50 });
     return new THREE.Mesh(geometry, material);
 }

const task4 = (canvasRef, gui) => {
  const state = {
      x: 50,
      y: 100,
      z: 50
  };

  gui.add(state, 'x').min(-300).max(300);
  gui.add(state, 'y').min(-300).max(300);
  gui.add(state, 'z').min(-300).max(300);

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

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  const cubeMesh = cube();
  const sphereMesh = sphere();
  const groundMesh = ground();

  cubeMesh.position.z = -200;
  sphereMesh.position.z = 200;
  groundMesh.rotation.x = -0.5*Math.PI;
  groundMesh.position.y = -300;

  scene.add(cubeMesh);
  scene.add(sphereMesh);
  scene.add(groundMesh);

  const loop = () => {
    directionalLight.position.set(state.x, state.y, state.z);
    renderer.render(scene, camera);
    requestAnimationFrame(() => loop());
  };

  loop();
};

export default task4;
