
/*
Three.js has many classes for creating common geometries.
BoxGeometry
CircleGeometry
CylinderGeometry
ConeGeometry
EdgesGeometry
ExtrudeGeometry
ShapeGeometry
LatheGeometry
PlaneGeometry
RingGeometry
SphereGeometry
TextGeometry
TorusGeometry
TorusKnotGeometry
TubeGeometry
PolyhedronGeometry
DodecahedronGeometry
IcosahedronGeometry
OctahedronGeometry
TetrahedronGeometry
ParametricGeometry
WireframeGeometry

https://sbcode.net/threejs/three-buffergeometry/
*/

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-2, 4, 5)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const boxGeometry = new THREE.BoxGeometry()
//const sphereGeometry = new THREE.SphereGeometry()
//const icosahedronGeometry = new THREE.IcosahedronGeometry()

console.log(boxGeometry)

const material = new THREE.MeshNormalMaterial({
  wireframe: true,
})

const cube = new THREE.Mesh(boxGeometry, material)
//cube.position.x = -4
scene.add(cube)

// const sphere = new THREE.Mesh(sphereGeometry, material)
// sphere.position.x = 0
// scene.add(sphere)

// const icosahedron = new THREE.Mesh(icosahedronGeometry, material)
// scene.add(icosahedron)
// sphere.position.x = 4

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()

// const cubeData = {
//   width: 1,
//   height: 1,
//   depth: 1,
//   widthSegments: 1,
//   heightSegments: 1,
//   depthSegments: 1
// }

const cubeFolder = gui.addFolder('Cube')
const cubeRotationFolder = cubeFolder.addFolder('Rotation')
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01)
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10)
cubePositionFolder.add(cube.position, 'y', -10, 10)
cubePositionFolder.add(cube.position, 'z', -10, 10)
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', -5, 5, 0.1) // .onFinishChange(function() { console.log(cube.geometry) })
cubeScaleFolder.add(cube.scale, 'y', -5, 5, 0.1)
cubeScaleFolder.add(cube.scale, 'z', -5, 5, 0.1)
// cubeFolder
//   .add(cubeData, 'width', 1, 30)
//   .onChange(regenerateBoxGeometry)
//   .onFinishChange(function() { console.log(cube.geometry) })
// cubeFolder.add(cubeData, 'height', 1, 30).onChange(regenerateBoxGeometry)
// cubeFolder.add(cubeData, 'depth', 1, 30).onChange(regenerateBoxGeometry)
// cubeFolder.add(cubeData, 'widthSegments', 1, 30).onChange(regenerateBoxGeometry)
// cubeFolder.add(cubeData, 'heightSegments', 1, 30).onChange(regenerateBoxGeometry)
// cubeFolder.add(cubeData, 'depthSegments', 1, 30).onChange(regenerateBoxGeometry)
cubeFolder.open()

// function regenerateBoxGeometry() {
//   const newGeometry = new THREE.BoxGeometry(
//     cubeData.width,
//     cubeData.height,
//     cubeData.depth,
//     cubeData.widthSegments,
//     cubeData.heightSegments,
//     cubeData.depthSegments
//   )
//   cube.geometry.dispose()
//   cube.geometry = newGeometry
// }

// const sphereData = {
//   radius: 1,
//   widthSegments: 8,
//   heightSegments: 6,
//   phiStart: 0,
//   phiLength: Math.PI * 2,
//   thetaStart: 0,
//   thetaLength: Math.PI
// }
// const sphereFolder = gui.addFolder('Sphere')
// sphereFolder.add(sphereData, 'radius', 0.1, 30).onChange(regenerateSphereGeometry)
// sphereFolder.add(sphereData, 'widthSegments', 1, 32).onChange(regenerateSphereGeometry)
// sphereFolder.add(sphereData, 'heightSegments', 1, 16).onChange(regenerateSphereGeometry)
// sphereFolder.add(sphereData, 'phiStart', 0, Math.PI * 2).onChange(regenerateSphereGeometry)
// sphereFolder.add(sphereData, 'phiLength', 0, Math.PI * 2).onChange(regenerateSphereGeometry)
// sphereFolder.add(sphereData, 'thetaStart', 0, Math.PI).onChange(regenerateSphereGeometry)
// sphereFolder.add(sphereData, 'thetaLength', 0, Math.PI).onChange(regenerateSphereGeometry)
// sphereFolder.open()

// function regenerateSphereGeometry() {
//   const newGeometry = new THREE.SphereGeometry(
//     sphereData.radius,
//     sphereData.widthSegments,
//     sphereData.heightSegments,
//     sphereData.phiStart,
//     sphereData.phiLength,
//     sphereData.thetaStart,
//     sphereData.thetaLength
//   )
//   sphere.geometry.dispose()
//   sphere.geometry = newGeometry
// }

// const icosahedronData = {
//   radius: 1,
//   detail: 0
// }
// const icosahedronFolder = gui.addFolder('Icosahedron')
// icosahedronFolder.add(icosahedronData, 'radius', 0.1, 10).onChange(regenerateIcosahedronGeometry)
// icosahedronFolder.add(icosahedronData, 'detail', 0, 5).step(1).onChange(regenerateIcosahedronGeometry)
// icosahedronFolder.open()

// function regenerateIcosahedronGeometry() {
//   const newGeometry = new THREE.IcosahedronGeometry(icosahedronData.radius, icosahedronData.detail)
//   icosahedron.geometry.dispose()
//   icosahedron.geometry = newGeometry
// }

const debug = document.getElementById('debug') as HTMLDivElement

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)

  debug.innerText = 'Matrix\n' + cube.matrix.elements.toString().replace(/,/g, '\n')

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