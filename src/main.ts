import './style.css'
import * as THREE from 'three'
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'


const scene = new THREE.Scene()
scene.add(new THREE.GridHelper())

const backgroundA = new THREE.Color(0x123456)
const backgroundB = new THREE.TextureLoader().load('https://sbcode.net/img/grid.png')
const backgroundC = new THREE.CubeTextureLoader()
  .setPath('https://sbcode.net/img/')
  .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

scene.background = backgroundA

const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, -5, 10)
camera.position.set(1, 1, 1)
camera.lookAt(0, 0.5, 0)



const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  //camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

//new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
cube.position.y = 0.5
scene.add(cube)

const stats = new Stats()
document.body.appendChild(stats.dom)

const setBackground = {
  sceneA: () => (scene.background = backgroundA),
  sceneB: () => (scene.background = backgroundB),
  sceneC: () => (scene.background = backgroundC),
}

const gui = new GUI()

gui.add(setBackground, 'sceneA').name('Scene A')
gui.add(setBackground, 'sceneB').name('Scene B')
gui.add(setBackground, 'sceneC').name('Scene C')

// Cube controls (works always because cube is always the same object)
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01)
cubeFolder.open()

// Camera controls
const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(camera.position, 'x', -10, 10)
// cameraFolder.add(camera.position, 'y', -10, 10)
// cameraFolder.add(camera.position, 'z', -10, 10)
cameraFolder.add(camera, 'left', -10, 0).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'right', 0, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'top', 0, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'bottom', -10, 0).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'near', -5, 5).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'far', 0, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.open()

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)

  stats.update()

}

animate()
