import { GLTFLoader } from "three";

// Instantiate a loader
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( "/examples/js/libs/draco/" );
loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load(
	// resource URL
	"models/gltf/duck/duck.gltf",
	// called when the resource is loaded
	function ( gltf ) {

		console.log(gltf.animations); // Array<THREE.AnimationClip>
		console.log(gltf.scene); // THREE.Group
		console.log(gltf.scenes); // Array<THREE.Group>
		console.log(gltf.cameras); // Array<THREE.Camera>
		console.log(gltf.asset); // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + "% loaded" );

	},
	// called when loading has errors
	function ( error ) {

		console.log( "An error happened" );

	}
);