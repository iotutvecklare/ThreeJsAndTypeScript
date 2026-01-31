/*
Object3D Hierarchy

The scene is an Object3D. You can add other Object3Ds to the scene and they become children of the scene. The scene itself is derived from the Object3D base class.
If you rotate the scene, or scale the scene, or translate its position, it will affect all if its child objects.

You make an Object3D a child of another Object3D by using the parents add method.
scene.add(cube)

You can also add Object3Ds to other Object3Ds that are already part of the scene. Any changes to the Object3D such as position, scale, rotation will affect all the children under the same parent equally.
It is possible to create a Hierarchy of Object3Ds by continually adding new objects to any existing objects.


scene
    |--object1 (Red Ball)
             |--object2 (Green Ball)
                       |--object3 (Blue Ball)

In this example, the blue ball is a child of the green ball, which is a child of the red ball.
Any changes to the red ball will affect the green and blue balls,
Any changes to the green ball, will affect the blue ball, but not its parent, the red ball.
Any changes to the blue ball, have no effect on its parent, or grandparent balls.
 */

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(4, 4, 4)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(8, 0, 0)
controls.update()

const light = new THREE.PointLight(0xffffff, 400)
light.position.set(10, 10, 10)
scene.add(light)

const object1 = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshPhongMaterial({ color: 0xff0000 }))
object1.position.set(4, 0, 0)
scene.add(object1)
object1.add(new THREE.AxesHelper(5))

const object2 = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshPhongMaterial({ color: 0x00ff00 }))
object2.position.set(4, 0, 0)
object1.add(object2)
object2.add(new THREE.AxesHelper(5))

const object3 = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshPhongMaterial({ color: 0x0000ff }))
object3.position.set(4, 0, 0)
object2.add(object3)
object3.add(new THREE.AxesHelper(5))

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const gui = new GUI()
const object1Folder = gui.addFolder('Object1 (Red Ball)')
object1Folder.add(object1.position, 'x', 0, 10, 0.01).name('X Position')
object1Folder.add(object1.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
object1Folder.add(object1.scale, 'x', 0, 2, 0.01).name('X Scale')
object1Folder.add(object1, 'visible', 0, 2, 0.01).name('Visible')
object1Folder.open()
const object2Folder = gui.addFolder('Object2 (Green Ball)')
object2Folder.add(object2.position, 'x', 0, 10, 0.01).name('X Position')
object2Folder.add(object2.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
object2Folder.add(object2.scale, 'x', 0, 2, 0.01).name('X Scale')
object2Folder.add(object2, 'visible', 0, 2, 0.01).name('Visible')
object2Folder.open()
const object3Folder = gui.addFolder('Object3 (Blue Ball)')
object3Folder.add(object3.position, 'x', 0, 10, 0.01).name('X Position')
object3Folder.add(object3.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
object3Folder.add(object3.scale, 'x', 0, 2, 0.01).name('X Scale')
object3Folder.add(object3, 'visible', 0, 2, 0.01).name('Visible')
object3Folder.open()

const stats = new Stats()
document.body.appendChild(stats.dom)

const debug = document.getElementById('debug') as HTMLDivElement

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)

  const object1WorldPosition = new THREE.Vector3()
  object1.getWorldPosition(object1WorldPosition)
  const object2WorldPosition = new THREE.Vector3()
  object2.getWorldPosition(object2WorldPosition)
  const object3WorldPosition = new THREE.Vector3()
  object3.getWorldPosition(object3WorldPosition)

  debug.innerText =
    'Red\n' +
    'Local Pos X : ' +
    object1.position.x.toFixed(2) +
    '\n' +
    'World Pos X : ' +
    object1WorldPosition.x.toFixed(2) +
    '\n' +
    '\nGreen\n' +
    'Local Pos X : ' +
    object2.position.x.toFixed(2) +
    '\n' +
    'World Pos X : ' +
    object2WorldPosition.x.toFixed(2) +
    '\n' +
    '\nBlue\n' +
    'Local Pos X : ' +
    object3.position.x.toFixed(2) +
    '\n' +
    'World Pos X : ' +
    object3WorldPosition.x.toFixed(2) +
    '\n'

  stats.update()
}

animate()


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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