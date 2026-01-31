import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)

  stats.update()
}

animate()

/*
Frame Rate Independence. Making the code frame rate independent by considering clock delta time.

function animate() {
  requestAnimationFrame(animate)

  delta = clock.getDelta()

  cube.rotation.x += delta
  cube.rotation.y += delta

  renderer.render(scene, camera)

  stats.update()
}

animate()
*/

/*
On Demand Rendering. Making the code render only when the OrbitControls properties change or the screen is resized.

renderer.render(scene, camera) // render once when the scene has been setup
*/


////////////////////////////////////////////////////////////////////////////////////////////////////

/*
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
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

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

new OrbitControls(camera, renderer.domElement)

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

// Camera controls (works always because cube is always the same object)
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x', -10, 10)
cameraFolder.add(camera.position, 'y', -10, 10)
cameraFolder.add(camera.position, 'z', -10, 10)
cameraFolder.add(camera, 'fov', 0, 180, 0.01).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'aspect', 0.00001, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'near', 0.01, 10).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.add(camera, 'far', 0.01,10).onChange(() => {
  camera.updateProjectionMatrix()
})
cameraFolder.open()

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)

  stats.update()

}

animate()
*/