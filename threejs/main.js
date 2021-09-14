import * as THREE from "https://cdn.skypack.dev/pin/three@v0.132.2-1edwuDlviJO0abBvWgKd/mode=imports/optimized/three.js";
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

// Initialize camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -2;
camera.position.y = 2.5;
camera.position.z = 5;
camera.rotation.y = -0.5;

// Initialize renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup a render function
let previousTimestamp = Date.now();
let mixer;

const render = (timestamp) => {
	const ellapsed = timestamp - previousTimestamp;
	previousTimestamp = timestamp;

	requestAnimationFrame(render);
	mixer?.update(ellapsed / 1000);
	renderer.render(scene, camera);
};

// Adapt render on resize
window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

// Build scene
const scene = new THREE.Scene();

/*/ Create a mesh
const geometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);*/

// Create a light
const light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	"animated_arm.glb",
	// called when the resource is loaded
	(gltf) => {
		// Get the blender skeleton from the scene which includes the bones and skinned mesh
		const bonesAndSkinnedMesh = gltf.scene.children[2];
		const mesh = bonesAndSkinnedMesh.children[1];
		mesh.material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
		mesh.animations = gltf.animations;
		mesh.add(mesh.skeleton.bones[0]);
		scene.add(mesh);
		console.log(mesh);

		mixer = new THREE.AnimationMixer(mesh);
		mixer.clipAction(mesh.animations[0]).play();
	},
	// called while loading is progressing
	(xhr) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + "% loaded" );
	},
	// called when loading has errors
	(error) => {
		console.log("An error happened");
		console.log(error);
	}
);

render();