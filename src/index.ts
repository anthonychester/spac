import * as THREE from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ship } from "./ship";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// To create a cube, we need a BoxGeometry. This is an object that contains all the points (vertices) and fill (faces) of the cube. We'll explore this more in the future.
const geometry = new THREE.BoxGeometry(10, 10, 10);

// In addition to the geometry, we need a material to color it.
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

// A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshPhongMaterial({ color: 0x00ffff })
);
scene.add(cube2);
cube2.position.y = 10;
cube2.position.z = 10;

//create a blue LineBasicMaterial
const materialL = new THREE.LineBasicMaterial({
  color: 0x0000ff,
  linewidth: 50,
  linecap: "round"
});

const points = [];
const geometryL = new THREE.BufferGeometry().setFromPoints(points);

let line = new THREE.Line(geometryL, materialL);
scene.add(line);

let player = new ship(scene, camera);

camera.position.set(0, 25, 20);
camera.rotation.x = -0.46;

const light = new THREE.PointLight(0xffffff, 5);
light.decay = 0.5;
light.distance = 40;
light.position.set(0, -25, 24);

let pa = { x: 0, y: 30, z: 0 };
console.log(light.position);
player.add(light, pa);
const s = new THREE.Mesh(
  new THREE.SphereGeometry(1.3, 32, 16),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
s.position.set(0, -25, 24);
player.add(s, pa);

const geome = new THREE.SphereGeometry(5, 32, 16);
const mater = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(geome, mater);
sphere.position.x = 150;
scene.add(sphere);
const light2 = new THREE.PointLight(0xffffff, 10);
light.position.set(0, 0, 0);
sphere.add(light2);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
//controls.update();

function animate() {
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
  //cone.rotation.x += 0.01;
  player.update(null);
  renderLine();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

//if (WEBGL.isWebGLAvailable()) {
// Initiate function or other initializations here
animate();
/*} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
*/

function renderLine() {
  let pos = player.position;
  scene.remove(line);
  line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(pos.x, pos.y - 2, pos.z),
      new THREE.Vector3(0, 0, 0)
    ]),
    materialL
  );
  scene.add(line);
}
