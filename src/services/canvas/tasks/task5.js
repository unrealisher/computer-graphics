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
     const material = new THREE.MeshPhongMaterial({ color: 0x666666, shininess: -100 });
     return new THREE.Mesh(geometry, material);
 }

const task4 = (canvasRef, gui) => {
  const state = {
      x: 0,
      y: 300,
      z: 0
  };

  gui.add(state, 'x').min(-300).max(300);
  gui.add(state, 'y').min(20).max(300);
  gui.add(state, 'z').min(-300).max(300);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  renderer.shadowMapEnabled = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearAlpha(0x000000, 1.0);
  renderer.setPixelRatio(8);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.position.set(0, 0, 1000);
  const controls = new OrbitControls(camera);
  controls.update();

  const directionalLight = new THREE.SpotLight(0xffffff, 1, 2000);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 512;  
  directionalLight.shadow.mapSize.height = 512;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500  
  scene.add(directionalLight);

  const cubeMesh = cube();
  cubeMesh.castShadow = true;
  cubeMesh.receiveShadow = false;
  const sphereMesh = sphere();
  sphereMesh.castShadow = true;
  sphereMesh.receiveShadow = false;
  const groundMesh = ground();
  groundMesh.receiveShadow = true;

  cubeMesh.position.z = -200;
  sphereMesh.position.z = 200;
  groundMesh.rotation.x = -0.5*Math.PI;
  groundMesh.position.y = -200;

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
