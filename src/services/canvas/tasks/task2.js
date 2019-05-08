import * as THREE from "three";

const line = state => {
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(state.firstPositionX, state.firstPositionY, 0),
    new THREE.Vector3(state.secondPositionX, state.secondPositionY, 0),
    new THREE.Vector3(state.thirdPositionX, state.thirdPositionY, 0),
    new THREE.Vector3(state.fourthPositionX, state.fourthPositionY, 0),
    new THREE.Vector3(state.fifthPositionX, state.fifthPositionY, 0),
    new THREE.Vector3(state.sixthPositionX, state.sixthPositionY, 0)
  );

  const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
  const mesh = new THREE.Line(geometry, material);
  return mesh;
};

const curve = (
  firstPositionX,
  firstPositionY,
  secondPositionX,
  secondPositionY,
  thirdPositionX,
  thirdPositionY,
  fourthPositionX,
  fourthPositionY
) => {
  const bezier = new THREE.CubicBezierCurve3(
    new THREE.Vector3(firstPositionX, firstPositionY, 0),
    new THREE.Vector3(secondPositionX, secondPositionY, 0),
    new THREE.Vector3(thirdPositionX, thirdPositionY, 0),
    new THREE.Vector3(fourthPositionX, fourthPositionY, 0)
  );
  const geometry = new THREE.Geometry();
  geometry.vertices = bezier.getPoints(50);

  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Line(geometry, material);
  return mesh;
};

const task2 = (canvasRef, gui) => {
  const state = {
    firstPositionX: -500,
    firstPositionY: 0,
    secondPositionX: -300,
    secondPositionY: 100,
    thirdPositionX: -100,
    thirdPositionY: 0,
    fourthPositionX: 100,
    fourthPositionY: 200,
    fifthPositionX: 300,
    fifthPositionY: 0,
    sixthPositionX: 500,
    sixthPositionY: 300,
    mirrorX: false,
    mirrorY: false
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
    .min(-height / 2 + 100)
    .max(height / 2 - 100);

  const second = gui.addFolder("point 2");
  second
    .add(state, "secondPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200);
  second
    .add(state, "secondPositionY")
    .min(-height / 2 + 100)
    .max(height / 2 - 100);

  const third = gui.addFolder("point 3");
  third
    .add(state, "thirdPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200);
  third
    .add(state, "thirdPositionY")
    .min(-height / 2 + 100)
    .max(height / 2 - 100);

  const fourth = gui.addFolder("point 4");
  fourth
    .add(state, "fourthPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200);
  fourth
    .add(state, "fourthPositionY")
    .min(-height / 2 + 100)
    .max(height / 2 - 100);

  const fifth = gui.addFolder("point 5");
  fifth
    .add(state, "fifthPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200);
  fifth
    .add(state, "fifthPositionY")
    .min(-height / 2 + 100)
    .max(height / 2 - 100);

  const sixth = gui.addFolder("point 6");
  sixth
    .add(state, "sixthPositionX")
    .min(-width / 2 + 200)
    .max(width / 2 - 200);
  sixth
    .add(state, "sixthPositionY")
    .min(-height / 2 + 100)
    .max(height / 2 - 100);

  const mirror = gui.addFolder("mirror");
  mirror.add(state, "mirrorX");
  mirror.add(state, "mirrorY");
  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(5);

  const scene = new THREE.Scene();

  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  let camera;

  let lineMesh;
  let bezierMesh1;
  let bezierMesh2;

  const loop = () => {
    if (lineMesh !== undefined) scene.remove(lineMesh);
    if (bezierMesh1 !== undefined) scene.remove(bezierMesh1);
    if (bezierMesh2 !== undefined) scene.remove(bezierMesh2);
    if (camera !== undefined) scene.remove(camera);
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0, 1000);
    if (state.mirrorX && state.mirrorY) {
      camera.position.set(0, 0, 1000);
      camera.rotation.set((180 * Math.PI) / 180, (180 * Math.PI) / 180, 0);
    } else if (state.mirrorX) {
      camera.position.set(0, 0, -1000);
      camera.rotation.set((180 * Math.PI) / 180, 0, 0);
    } else if (state.mirrorY) {
      camera.position.set(0, 0, -1000);
      camera.rotation.set(0, (180 * Math.PI) / 180, 0);
    }
    // camera = new THREE.PerspectiveCamera(
    //   state.mirrorX && state.mirrorY ? -45 : 45,
    //   width / height,
    //   0.1,
    //   5000
    // );
    // camera.position.set(0, 0, -1000);
    // camera.rotation.set(0, (180 * Math.PI) / 180, 0);
    const dotPositionX = (state.fourthPositionX + state.thirdPositionX) / 2;
    const dotPositionY = (state.fourthPositionY + state.thirdPositionY) / 2;
    bezierMesh1 = curve(
      state.firstPositionX,
      state.firstPositionY,
      state.secondPositionX,
      state.secondPositionY,
      state.thirdPositionX,
      state.thirdPositionY,
      dotPositionX,
      dotPositionY
    );
    bezierMesh2 = curve(
      dotPositionX,
      dotPositionY,
      state.fourthPositionX,
      state.fourthPositionY,
      state.fifthPositionX,
      state.fifthPositionY,
      state.sixthPositionX,
      state.sixthPositionY
    );
    scene.add(bezierMesh1);
    scene.add(bezierMesh2);

    lineMesh = line(state);
    scene.add(lineMesh);
    renderer.render(scene, camera);
    requestAnimationFrame(() => loop());
  };

  loop();
};

export default task2;
