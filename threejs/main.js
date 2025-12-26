import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';

// scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const geometry = new THREE.TorusKnotGeometry(1, 0.3, 96, 8, 2, 3)
const material = new THREE.MeshNormalMaterial({ wireframe: false })

const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

camera.position.z = 5
scene.add(camera)

const animate = () => {
    torus.rotation.x += 0.01
    torus.rotation.z += 0.01
}

// renderer
const renderer = new THREE.WebGLRenderer()
const composer = new EffectComposer(renderer)

composer.addPass(new RenderPixelatedPass(1, scene, camera, { depthEdgeStrength: 0 }));

renderer.setAnimationLoop(() => {
    animate()
    composer.render()
})

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)