import * as THREE from "three";

interface xyzPair {
  x: number;
  y: number;
  z: number;
}

interface xyPair {
  x: number;
  y: number;
}

interface upPair {
  ent: any;
  pos: xyzPair;
  tags: any;
}

export class ship {
  scene: THREE.Scene;
  position: any;
  camera: THREE.PerspectiveCamera;
  model: any;
  force: xyzPair;
  applyForce: number;
  pointer: xyPair;
  updateList: upPair[];
  constructor(scene: THREE.Scene, camera) {
    this.scene = scene;

    const geom = new THREE.ConeGeometry(20, 50, 3);
    const mat = new THREE.MeshPhongMaterial({ color: 0x000088 });

    this.model = new THREE.Mesh(geom, mat);
    scene.add(this.model);

    this.model.rotation.x = -33;

    this.model.position.y = -30;

    this.pointer = { x: 0, y: 0 };

    this.position = this.model.position;
    this.camera = camera;

    this.force = { x: 0, y: 0, z: 0 };
    this.applyForce = 0.1;

    this.updateList = [];

    window.addEventListener("keyup", this.keyup.bind(this));
    window.addEventListener("pointermove", this.onPointerMove.bind(this));
  }

  keyup(e) {
    switch (e.keyCode) {
      case 82:
        this.force = { x: 0, y: 0, z: 0 };
        break;
      case 87:
        this.force.z -= this.applyForce;
        break;
      case 83:
        this.force.z += this.applyForce;
        break;
      case 65:
        this.force.x -= this.applyForce;
        break;
      case 68:
        this.force.x += this.applyForce;
        break;
      case 38:
        this.force.y -= this.applyForce;
        break;
      case 40:
        this.force.y += this.applyForce;
        break;
      case 76:
        this.toggleLights();
        break;
    }
  }

  onPointerMove(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  add(ent, pos, tags?) {
    this.scene.add(ent);
    this.updateList.push({ ent: ent, pos: pos, tags: tags });
  }

  toggleLights() {
    for (let i = 0; i < this.updateList.length; i++) {
      if (this.updateList[i].tags.indexOf("lights") >= 0) {
        //toogle lights
        let ent = this.updateList[i].ent;
        ent.visible = ent.visible ? false : true;
      }
    }
  }

  update(d) {
    let pos = this.position;

    this.position.x += this.force.x;
    this.position.y += this.force.y;
    this.position.z += this.force.z;

    document.getElementById("pos").innerHTML = "{" + Math.round(pos.x) + ", " + Math.round(pos.x) + ", " + Math.round(pos.z) + "}";

    this.camera.position.x = pos.x;
    this.camera.position.y = pos.y + 40;
    this.camera.position.z = pos.z + 55;

    for (let i = 0; i < this.updateList.length; i++) {
      let ent = this.updateList[i].ent;
      let upd: xyzPair = this.updateList[i].pos;
      ent.position.x = pos.x + upd.x;
      ent.position.y = pos.y + upd.y;
      ent.position.z = pos.z + upd.z;
    }
  }
}
