import * as THREE from "three";

import {
    getSceneObject
} from "../registry/sceneRegistry.js";

const snapRegistry = {};

let helperMeshes = {};


/*
--------------------------------------------------
Register
--------------------------------------------------
*/

export function registerSnapPoint(id, object){

    snapRegistry[id] = object;

}


/*
--------------------------------------------------
Get
--------------------------------------------------
*/

export function getSnapPoint(id){

    return snapRegistry[id];

}


/*
--------------------------------------------------
World Position
--------------------------------------------------
*/

export function getSnapPosition(id){

    const snap = snapRegistry[id];

    if(!snap) return null;

    return snap.getWorldPosition(

        new THREE.Vector3()

    );

}


/*
--------------------------------------------------
World Rotation
--------------------------------------------------
*/

export function getSnapQuaternion(id){

    const snap = snapRegistry[id];

    if(!snap) return null;

    return snap.getWorldQuaternion(

        new THREE.Quaternion()

    );

}


/*
--------------------------------------------------
Show Indicator
--------------------------------------------------
*/

export function showSnapIndicator(id){

    const snap = snapRegistry[id];

    if(!snap) return;

    if(helperMeshes[id]){

        helperMeshes[id].visible = true;

        return;

    }

    const ring = new THREE.Mesh(

       new THREE.RingGeometry(
0.55,
0.7,
64
),

        new THREE.MeshBasicMaterial({

            color:0x00ff00,

            transparent:true,

            opacity:0.7,

            side:THREE.DoubleSide

        })

    );

    ring.rotation.x = -Math.PI/2;

    ring.position.y = 0.01;
    snap.add(ring);

    helperMeshes[id]=ring;

}


/*
--------------------------------------------------
Hide Indicator
--------------------------------------------------
*/

export function hideSnapIndicator(id){

    if(helperMeshes[id]){

        helperMeshes[id].visible=false;

    }

}


/*
--------------------------------------------------
Hide All
--------------------------------------------------
*/

export function hideAllSnapIndicators(){

    Object.values(helperMeshes)

    .forEach(mesh=>{

        mesh.visible=false;

    });

}