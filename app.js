var scene, camera, renderer;
var geometry, material, mesh, pointLight;
 
init();
animate();
 
function init() {
 
	scene = new THREE.Scene();
 
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 10000 );
	camera.position.set(0,0,500);
 
	geometry = new THREE.BoxGeometry( 200, 200, 200 );
	material = new THREE.MeshLambertMaterial( { color: 0xfefefe, wireframe: false, emissive: 0x0000ff } );
 
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
 
	renderer = new THREE.CanvasRenderer({alpha: false});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor(0x0aaaad);
	renderer.setSize( window.innerWidth, window.innerHeight );
 
	document.querySelector('#canvasRenderer').appendChild( renderer.domElement );

	pointLight = new THREE.PointLight( 0xff0040, 1);
	pointLight.position.set(0,200,200);
	scene.add( pointLight );

	var PI2 = Math.PI * 2;
	var program = function ( context ) {
		context.beginPath();
		context.arc( 0, 0, 0.5, 0, PI2, true );
		context.fill();
	};

	var sprite = new THREE.Sprite( new THREE.SpriteCanvasMaterial( { color: 0xff0040, program: program } ) );
	pointLight.add(sprite);

	var sphereSize = 10;
	var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
	scene.add( pointLightHelper );
 
}
 
function animate() {
 
	requestAnimationFrame( animate );
 
	// mesh.rotation.x = Math.sin( time * 0.1 ) * 10;
	mesh.rotation.y += 0.02;
	mesh.rotation.z += 0.02;

	var time = Date.now() * 0.0005;
	pointLight.position.x = Math.sin( time * 0.7 ) * 30;
	// pointLight.position.y = Math.cos( time * 0.5 ) * 40;
	// pointLight.position.z = Math.cos( time * 0.3 ) * 30;
 
	renderer.render( scene, camera );
 
}