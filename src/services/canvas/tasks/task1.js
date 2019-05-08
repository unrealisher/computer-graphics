import * as THREE from "three";

const dot = () => {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const sphere = radius => {
  const geometry = new THREE.CircleGeometry(radius, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const line = ({ dot, sphere }) => {
  const { dotPositionX, dotPositionY } = dot;
  const { radius, spherePositionX, spherePositionY } = sphere;

  const a = Math.abs(dotPositionX - spherePositionX);
  const b = Math.abs(dotPositionY - spherePositionY);

  const angle = Math.atan(b / a);

  let newPositionX;
  let newPositionY;

  if (dotPositionX > spherePositionX) {
    newPositionX = spherePositionX + radius * Math.cos(angle);
  } else {
    newPositionX = spherePositionX - radius * Math.cos(angle);
  }

  if (dotPositionY > spherePositionY) {
    newPositionY = spherePositionY + radius * Math.sin(angle);
  } else {
    newPositionY = spherePositionY - radius * Math.sin(angle);
  }

  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(dotPositionX, dotPositionY, 0),
    new THREE.Vector3(newPositionX, newPositionY, 0)
  );
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const mesh = new THREE.Line(geometry, material);
  return mesh;
};

const task1 = (canvasRef, gui) => {
  const state = {
    dot: {
      dotPositionX: 100,
      dotPositionY: 0
    },
    sphere: {
      radius: 50,
      spherePositionX: -100,
      spherePositionY: 0
    }
  };

  const width = window.innerWidth;
  const height = window.innerHeight;

  //Точка
  const folder = gui.addFolder("task1");
  folder
    .add(state.dot, "dotPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200)
    .listen();
  folder
    .add(state.dot, "dotPositionY")
    .min(-height / 2 + 100)
    .max(height / 2 - 100);

  //Окружность
  folder
    .add(state.sphere, "radius")
    .min(30)
    .max(150);
  folder
    .add(state.sphere, "spherePositionX")
    .min(-width / 2 + 250 + state.sphere.radius)
    .max(width / 2 - 250 - state.sphere.radius);
  folder
    .add(state.sphere, "spherePositionY")
    .min(-height / 2 + 160 + state.sphere.radius)
    .max(height / 2 - 160 - state.sphere.radius);
  folder.open();
  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(8);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.position.set(0, 0, 1000);

  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const dotMesh = dot();
  let circleMesh;
  let lineMesh;

  scene.add(dotMesh);

  const loop = () => {
    if (circleMesh !== undefined) scene.remove(circleMesh);
    if (lineMesh !== undefined) scene.remove(lineMesh);
    dotMesh.position.x = state.dot.dotPositionX;
    dotMesh.position.y = state.dot.dotPositionY;

    circleMesh = sphere(state.sphere.radius);
    scene.add(circleMesh);

    lineMesh = line(state);
    scene.add(lineMesh);

    circleMesh.position.x = state.sphere.spherePositionX;
    circleMesh.position.y = state.sphere.spherePositionY;

    renderer.render(scene, camera);
    requestAnimationFrame(() => loop());
  };

  loop();
};

export default task1;
