import * as THREE from "three";

export class astroid {
  model: THREE.Mesh;
  scene: THREE.Scene;
  constructor(scene, x, y, z) {
    const geome = new THREE.SphereGeometry(5, 32, 16);
    const mater = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    this.model = new THREE.Mesh(geome, mater);
    this.model.position.set(x, y, z);
    scene.add(this.model);
    this.model.data = { vaule: 5 };
  }
}
