import * as THREE from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ship } from "./ship";
import { astroid } from "./astroid";
//import { GUI } from "dat.gui";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let astroids: astroid[] = [];

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let mouseDown = false;
astroids.push(new astroid(scene, 80, 0, 80));
//create a blue LineBasicMaterial
const materialL = new THREE.LineBasicMaterial({
  color: 0x0000ff,
  linewidth: 50,
  linecap: "round"
});

window.addEventListener("mousedown", () => {
  mouseDown = true;
});

window.addEventListener("mouseup", () => {
  mouseDown = false;
});
window.addEventListener("mousemove", (event) => {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const points = [];
const geometryL = new THREE.BufferGeometry().setFromPoints(points);

let line = new THREE.Line(geometryL, materialL);
scene.add(line);

let player = new ship(scene, camera);
player.position.z = 200;
camera.position.set(0, 25, 20);
camera.rotation.x = -0.46;

const light = new THREE.PointLight(0xffffff, 1);
light.decay = 0.5;
light.distance = 40;
light.position.set(0, -25, 24);

let pa = { x: 0, y: 15, z: 30 };
console.log(light.position);
player.add(light, pa, ["lights"]);
const s = new THREE.Mesh(
  new THREE.SphereGeometry(1.3, 32, 16),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
s.position.set(0, -25, 24);
player.add(s, pa, ["lights"]);

const geome = new THREE.SphereGeometry(50, 32, 16);
const mater = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(geome, mater);
scene.add(sphere);
const light2 = new THREE.PointLight(0xffffff, 1);
light2.decay = 0.3;
light2.distance = 1200;
light.position.set(0, 0, 0);
sphere.add(light2);

//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
//controls.update();

/*
const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
//cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
//cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
//cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10);
cameraFolder.open();
*/

function animate() {
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
  //cone.rotation.x += 0.01;
  player.update(null);
  renderLine();
  updateRaycast();
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

function updateRaycast() {
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    //console.log(intersects[ i ].object);
    //document.getElementById("info").innerHTML = (intersects[ i ].object.position.x + " " + intersects[ i ].object.position.y + " " + intersects[ i ].object.position.z);
    if (mouseDown) {
      //console.log(intersects[i].object);
      document.getElementById("pick").innerHTML = intersects[i].object.type;
    }
  }
}
