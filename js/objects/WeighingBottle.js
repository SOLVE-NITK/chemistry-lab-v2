import * as THREE from "three";
import { createBottleLabel } from "../textures/labelTexture.js";
import { registerSceneObject } from "../registry/sceneRegistry.js";

export function createWeighingBottle() {

    const bottle = new THREE.Group();

    //---------------------------------------------------------
    // Glass Material
    //---------------------------------------------------------

    const glassMaterial = new THREE.MeshPhysicalMaterial({

        transmission: 1,
        transparent: true,
        opacity: 0.95,
        roughness: 0.05,
        thickness: 0.4,
        ior: 1.45,
        color: 0xe8f7ff,
        envMapIntensity: 1.5,
        side: THREE.DoubleSide

    });

    //---------------------------------------------------------
    // BODY
    //---------------------------------------------------------

    const body = new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.4,
            0.4,
            1,
            128,
            1,
            true
        ),

        glassMaterial

    );

    // Bottom of cylinder starts at y = 0
    body.position.y = 0.5;

    bottle.add(body);

    //---------------------------------------------------------
    // Bottom Disc
    //---------------------------------------------------------

    const bottom = new THREE.Mesh(

        new THREE.CircleGeometry(0.4,128),

        glassMaterial

    );

    bottom.rotation.x = -Math.PI/2;

    bottom.position.y = 0.001;

    bottle.add(bottom);

    //---------------------------------------------------------
    // Top Rim
    //---------------------------------------------------------

    const rim = new THREE.Mesh(

        new THREE.TorusGeometry(
            0.42,
            0.03,
            32,
            100
        ),

        glassMaterial

    );

    rim.rotation.x = Math.PI/2;

    rim.position.y = 1.0;

    bottle.add(rim);

    //---------------------------------------------------------
    // Stopper
    //---------------------------------------------------------

    const stopper = new THREE.Group();

    const stopperBase = new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.35,
            0.35,
            0.18,
            64
        ),

        glassMaterial

    );

    stopperBase.position.y = 1.12;

    stopper.add(stopperBase);

    const stopperKnob = new THREE.Mesh(

        new THREE.SphereGeometry(
            0.28,
            64,
            64
        ),

        glassMaterial

    );

    stopperKnob.scale.y = 1.1;

    stopperKnob.position.y = 1.48;

    stopper.add(stopperKnob);

    bottle.add(stopper);

    //---------------------------------------------------------
    // Label
    //---------------------------------------------------------

    const texture = createBottleLabel();

    const label = new THREE.Mesh(

        new THREE.PlaneGeometry(
            0.5,
            0.25
        ),

        new THREE.MeshBasicMaterial({

            map:texture,
            transparent:true

        })

    );

    label.position.set(

        0,
        0.45,
        0.41

    );

    bottle.add(label);

    //---------------------------------------------------------
    // Shadows
    //---------------------------------------------------------

    bottle.traverse(child=>{

        if(child.isMesh){

            child.castShadow=true;
            child.receiveShadow=true;

        }

    });

    //---------------------------------------------------------
    // Scale
    //---------------------------------------------------------

    bottle.scale.set(

        0.5,
        0.5,
        0.5

    );

    //---------------------------------------------------------
    // Metadata
    //---------------------------------------------------------

    bottle.name="weighingBottle";

    bottle.userData.id="weighingBottle";

    //---------------------------------------------------------
    // Debug
    //---------------------------------------------------------

    const box = new THREE.Box3().setFromObject(bottle);

    console.log(
        "Bottle Bounds",
        box.min,
        box.max
    );

    registerSceneObject(

        "weighingBottle",
        bottle

    );

    return bottle;

}