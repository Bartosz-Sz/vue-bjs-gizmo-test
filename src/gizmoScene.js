/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as BABYLON from '@babylonjs/core'

function setupCanvas(canvas0, canvas1) {
    var canvasZone = document.getElementById('canvasZone')
    var mainCanvas = document.getElementById('renderCanvas')
    if (mainCanvas) mainCanvas.remove()
    var sibling = canvasZone.childElementCount
    if (!sibling) {
        canvas0 = document.createElement('canvas')
        canvas0.style.height = '50vh'
        canvas0.style.width = '100%'
        canvas0.id = 'renderCanvas0'
        canvasZone.appendChild(canvas0)
        canvas1 = document.createElement('canvas')
        canvas1.style.height = '50vh'
        canvas1.style.width = '100%'
        canvas1.id = 'renderCanvas1'
        canvasZone.appendChild(canvas1)
    } else {
        canvas0 = document.getElementById('renderCanvas0')
        canvas1 = document.getElementById('renderCanvas1')
    }
    return {
        canvas0, canvas1
    }
}

function initGizmoManager(scene, controlledCamera) {
  const utilLayer = new BABYLON.UtilityLayerRenderer(scene)
  utilLayer.setRenderCamera(controlledCamera)
  const gizmoManager = new BABYLON.GizmoManager(scene, 2, utilLayer)
  gizmoManager.attachableMeshes = null
  gizmoManager.positionGizmoEnabled = true
}

export default function createScene(engine) {
    var scene = new BABYLON.Scene(engine);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    var { canvas0, canvas1 } = setupCanvas()

    var camera0 = new BABYLON.FreeCamera("camera0", new BABYLON.Vector3(0, 5, -10), scene);
    camera0.setTarget(BABYLON.Vector3.Zero());

    var camera1 = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera1.setTarget(BABYLON.Vector3.Zero());

    camera0.attachControl(canvas0, true);

    initGizmoManager(scene, camera0)

    var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 2, segments: 32}, scene);
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 2, segments: 32}, scene);
    sphere1.position.y = 1; sphere2.position.y = 1;
    sphere1.position.x = -1; sphere2.position.x = 1;

    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    scene.detachControl()
    engine.inputElement = canvas0
    scene.attachControl()

    engine.registerView(canvas0, camera0);
    engine.registerView(canvas1, camera1);

    window.addEventListener('resize', () => {
        engine.resize();
    })

    return scene;
}
