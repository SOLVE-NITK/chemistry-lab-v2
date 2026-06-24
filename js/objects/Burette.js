import * as THREE from "three";
import { addEdges } from "./Edges.js";
import { createBuretteTexture } from "../textures/buretteTexture.js";

export function createBurette(scene) {
  const stand = new THREE.Group();
  const texture = createBuretteTexture();
  texture.offset.x = 0.5;
  texture.offset.y = 0.1;
// Base
const base1 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.2, 2),
  new THREE.MeshStandardMaterial({ color: 0x444444 })
);
base1.position.y = 0;
// Base
const base2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.1, 2),
  new THREE.MeshStandardMaterial({ color: 0x444454 })
);
base2.position.x = -1.2;

// Rod
const rod = new THREE.Mesh(
  new THREE.CylinderGeometry(0.05, 0.05, 4),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);

rod.position.y = 2;
rod.position.x = -1.2;

stand.add(base1, base2, rod);

const burette = new THREE.Mesh(
  new THREE.CylinderGeometry(0.12, 0.12, 5, 64),
  new THREE.MeshPhysicalMaterial({
    transmission: 1,
    roughness: 0.05,
    thickness: 0.5,
    color: 0xdff6ff
  })
);

const clamp = new THREE.Group();

const body = new THREE.Mesh(
  new THREE.BoxGeometry(0.4, 0.3, 0.3),
  new THREE.MeshStandardMaterial({ color: 0x666666 })
);

const arm = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.1, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x777777 })
);

arm.position.x = -1.2;

clamp.add(body, arm);
clamp.position.set(0, 3, 0);

stand.add(clamp);


  const points = [];
  const materialProperties = new THREE.MeshPhysicalMaterial({
      transmission: 1,
      roughness: 0.05,
      thickness: 0.01,
      transparent: true,
      opacity: 0.95,
      // color: 0xdff6ff,
      color: 0xffffff,
      envMapIntensity: 1.5,
      side: THREE.DoubleSide
    });

  const material = materialProperties;
  const upperGlassRodGeometry = new THREE.CylinderGeometry(0.08, 0.08,2, 64 );
  upperGlassRodGeometry.computeVertexNormals();
  const upperGlassRod = new THREE.Mesh(upperGlassRodGeometry, material);

    const labelMesh = new THREE.Mesh(
      upperGlassRodGeometry.clone(),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      })
    );
    
    labelMesh.scale.set(1.01, 1.01, 1.01);
    upperGlassRod.add(labelMesh)


  const lowerGlassRodGeometry = new THREE.CylinderGeometry(0.08, 0.025, 1, 64);
  lowerGlassRodGeometry.computeVertexNormals();
  const lowerGlassRod = new THREE.Mesh(lowerGlassRodGeometry, material);
  lowerGlassRod.position.y = -1.3;
  upperGlassRod.add(lowerGlassRod);


  const blueCapGeometryStart = new THREE.TorusGeometry(0.06, 0.05, 20, 20 );
  blueCapGeometryStart.computeVertexNormals();
  const blueCap = new THREE.Mesh(blueCapGeometryStart, new THREE.MeshStandardMaterial({ color: 0x0000ff }));
  blueCap.position.x= -0.25;
  blueCap.position.y= -1.2;
  blueCap.rotation.y = Math.PI / 2;
  upperGlassRod.add(blueCap);

  const blueCapGeometryEnd = new THREE.CylinderGeometry(0.04, 0.04,0.5, 64 );
  blueCapGeometryEnd.computeVertexNormals();
  const blueCapEnd = new THREE.Mesh(blueCapGeometryEnd, new THREE.MeshStandardMaterial({ color: 0x0000ff }));
  blueCapEnd.position.x= 0.23;
  blueCapEnd.position.y= -1.2;
  blueCapEnd.rotation.y = Math.PI / 2;
  upperGlassRod.add(blueCapEnd);

  const whiteRod = new THREE.CylinderGeometry(0.06, 0.06,0.5, 64 );
  whiteRod.computeVertexNormals();
  const whiteCap = new THREE.Mesh(whiteRod, new THREE.MeshStandardMaterial({ color: 0xffffff }));
  whiteCap.position.x= 0.05;
  whiteCap.position.y= -1.2;
  whiteCap.rotation.z = Math.PI / 2;
  upperGlassRod.add(whiteCap);

  const glassCover = new THREE.CylinderGeometry(0.08, 0.08,0.5, 64 );
  glassCover.computeVertexNormals();
  const glassCap = new THREE.Mesh(glassCover, material);
  glassCap.position.x= 0.05;
  glassCap.position.y= -1.2;
  glassCap.rotation.z = Math.PI / 2;
  upperGlassRod.add(glassCap);

  // flask.position.set(0, 1, 0);
  upperGlassRod.name = "upperGlassRod";
  clamp.add(upperGlassRod);

// stand.add(burette);
stand.position.y = 1; // lift above table
stand.name = "burette";
stand.position.x = -2.3; // shift left

stand.name = "burette";
return stand;
}