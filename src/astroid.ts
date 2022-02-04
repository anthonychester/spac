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
    this.model.name = "astroid";
    this.model.data = { vaule: 5 };

    var geo = new THREE.WireframeGeometry(new THREE.BoxGeometry(10, 10, 10)); // or WireframeGeometry( geometry )

    var mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });

    this.model.wireframe = new THREE.LineSegments(geo, mat);
    this.model.wireframe.visible = false;
    this.model.add(this.model.wireframe);
  }
}
