import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

const point = () => {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  return new THREE.Mesh(geometry, material);
};

export const line = ( pos1X, pos1Y, pos1Z, pos2X, pos2Y, pos2Z, state) => {
  let color;
  if (state === undefined) {
    color = 0xffffff;
  } else {
    const width = state.width / 2;
    const height = state.height / 2;
    const depth = state.depth / 2;
    if (pos1X >= -width &&
      pos1X <= width && 
      pos1Y >= -height && 
      pos1Y <= height &&
      pos1Z >= -depth &&
      pos1Z <= depth ||
      pos2X >= -width &&
      pos2X <= width && 
      pos2Y >= -height && 
      pos2Y <= height &&
      pos2Z >= -depth &&
      pos2Z <= depth) {
        color = 0x00ff00;
      } else {
        color = 0xffffff;
      }
  }
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(pos1X, pos1Y, pos1Z),
    new THREE.Vector3(pos2X, pos2Y, pos2Z)
  );
  const material = new THREE.MeshBasicMaterial({ color: color });
  return new THREE.Line(geometry, material);
};

export const axis = a => {
  let geometry;
  let material;
  switch (a) {
    case "x":
      geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(-2000, 0, 0),
        new THREE.Vector3(2000, 0, 0)
      );
      material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      break;
    case "y":
      geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(0, -2000, 0),
        new THREE.Vector3(0, 2000, 0)
      );
      material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      break;
    case "z":
      geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(0, 0, -2000),
        new THREE.Vector3(0, 0, 2000)
      );
      material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      break;
    default:
      break;
  }
  return new THREE.Line(geometry, material);
};

const task1 = (canvasRef, gui) => {
  const state = {
    firstPositionX: 100,
    firstPositionY: 45,
    firstPositionZ: -12,
    secondPositionX: 320,
    secondPositionY: -60,
    secondPositionZ: 44,
    thirdPositionX: 116,
    thirdPositionY: 23,
    thirdPositionZ: 200,
    fourthPositionX: -212,
    fourthPositionY: -15,
    fourthPositionZ: 200
  };

  const width = window.innerWidth;
  const height = window.innerHeight;

  const first = gui.addFolder("point 1");
  first
    .add(state, "firstPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200);
  first
    .add(state, "firstPositionY")
    .min(-height / 2 + 50)
    .max(height / 2 - 50);
  first
    .add(state, "firstPositionZ")
    .min(-200)
    .max(200);

  const second = gui.addFolder("point 2");
  second
    .add(state, "secondPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200);
  second
    .add(state, "secondPositionY")
    .min(-height / 2 + 50)
    .max(height / 2 - 50);
  second
    .add(state, "secondPositionZ")
    .min(-200)
    .max(200);

  const third = gui.addFolder("point 3");
  third
    .add(state, "thirdPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200);
  third
    .add(state, "thirdPositionY")
    .min(-height / 2 + 50)
    .max(height / 2 - 50);
  third
    .add(state, "thirdPositionZ")
    .min(-200)
    .max(200);

  const fourth = gui.addFolder("point 4");
  fourth
    .add(state, "fourthPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200);
  fourth
    .add(state, "fourthPositionY")
    .min(-height / 2 + 50)
    .max(height / 2 - 50);
  fourth
    .add(state, "fourthPositionZ")
    .min(-200)
    .max(200);

  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(8);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.position.set(0, 0, 500);
  const controls = new OrbitControls(camera);
  controls.update();

  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  let point1 = point();
  let point2 = point();
  let point3 = point();
  let point4 = point();

  const loop = () => {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
    point1.position.x = state.firstPositionX;
    point1.position.y = state.firstPositionY;
    point1.position.z = state.firstPositionZ;

    point2.position.x = state.secondPositionX;
    point2.position.y = state.secondPositionY;
    point2.position.z = state.secondPositionZ;

    point3.position.x = state.thirdPositionX;
    point3.position.y = state.thirdPositionY;
    point3.position.z = state.thirdPositionZ;

    point4.position.x = state.fourthPositionX;
    point4.position.y = state.fourthPositionY;
    point4.position.z = state.fourthPositionZ;

    scene.add(point1);
    scene.add(point2);
    scene.add(point3);
    scene.add(point4);

    scene.add(axis("x"));
    scene.add(axis("y"));
    scene.add(axis("z"));

    const fr = 20;
    for (let i = 0; i <= fr; i++) {
      const pos1X =
        state.firstPositionX +
        ((state.secondPositionX - state.firstPositionX) * i) / fr;
      const pos1Y =
        state.firstPositionY +
        ((state.secondPositionY - state.firstPositionY) * i) / fr;
      const pos1Z =
        state.firstPositionZ +
        ((state.secondPositionZ - state.firstPositionZ) * i) / fr;

      const pos2X =
        state.fourthPositionX -
        ((state.fourthPositionX - state.thirdPositionX) * i) / fr;
      const pos2Y =
        state.fourthPositionY -
        ((state.fourthPositionY - state.thirdPositionY) * i) / fr;
      const pos2Z =
        state.fourthPositionZ -
        ((state.fourthPositionZ - state.thirdPositionZ) * i) / fr;
      scene.add(line(pos1X, pos1Y, pos1Z, pos2X, pos2Y, pos2Z));
    }

    for (let i = 0; i <= fr; i++) {
      const pos1X =
        state.firstPositionX +
        ((state.fourthPositionX - state.firstPositionX) * i) / fr;
      const pos1Y =
        state.firstPositionY +
        ((state.fourthPositionY - state.firstPositionY) * i) / fr;
      const pos1Z =
        state.firstPositionZ +
        ((state.fourthPositionZ - state.firstPositionZ) * i) / fr;

      const pos2X =
        state.secondPositionX +
        ((state.thirdPositionX - state.secondPositionX) * i) / fr;
      const pos2Y =
        state.secondPositionY +
        ((state.thirdPositionY - state.secondPositionY) * i) / fr;
      const pos2Z =
        state.secondPositionZ +
        ((state.thirdPositionZ - state.secondPositionZ) * i) / fr;
      scene.add(line(pos1X, pos1Y, pos1Z, pos2X, pos2Y, pos2Z));
    }

    renderer.render(scene, camera);
    requestAnimationFrame(() => loop());
  };

  loop();
};

export default task1;
