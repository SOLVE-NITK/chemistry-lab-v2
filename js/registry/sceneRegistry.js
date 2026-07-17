export const sceneRegistry = {};

// NEW
let scene = null;
let camera = null;
let renderer = null;
let controls = null;

/**
 * Register scene components
 */
export function registerScene({
    scene: sceneRef,
    camera: cameraRef,
    renderer: rendererRef,
    controls: controlsRef
}){

    scene = sceneRef;
    camera = cameraRef;
    renderer = rendererRef;
    controls = controlsRef;

}

export function getScene() {
    return scene;
}

export function getCamera() {
    return camera;
}

export function getRenderer() {
    return renderer;
}

export function getControls() {
    return controls;
}

/**
 * Register an object after adding it to the scene.
 */
export function registerSceneObject(id, object) {

    object.userData.id = id;
    sceneRegistry[id] = object;

}

/**
 * Get an object already present in the scene.
 */
export function getSceneObject(id) {

    return sceneRegistry[id];

}

/**
 * Get all registered objects.
 */
export function getAllSceneObjects() {

    return Object.values(sceneRegistry);

}

/**
 * Remove all references.
 */
export function clearSceneRegistry() {

    Object.keys(sceneRegistry).forEach(key => delete sceneRegistry[key]);

}

export function hasSceneObject(id){

    return !!sceneRegistry[id];

}

export function removeSceneObject(id){

    if(sceneRegistry[id]){

        delete sceneRegistry[id];

    }

}