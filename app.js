var scene, camera, renderer;
var geometry, material, mesh, pointLight;
 
init();
animate();
 
function init() {
 
	scene = new THREE.Scene();
 
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 10000 );
	camera.position.set(0,0,500);
 
	geometry = new THREE.BoxGeometry( 200, 200, 200 );
	material = new THREE.MeshLambertMaterial( { 
		color: 0x008000, 
		wireframe: false, 
		// emissive: 0x0000ff 
	} );
 
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
 
	renderer = new THREE.WebGLRenderer({
		alpha: true
	});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor(0x0aaaad);
	renderer.setSize( window.innerWidth, window.innerHeight );
 
	document.querySelector('#canvasRenderer').appendChild( renderer.domElement );

	pointLight = new THREE.PointLight( 0xff0040, 1);
	pointLight.position.set(0,200,200);
	// scene.add( pointLight );

	pointLight2 = new THREE.PointLight( 0xff0040, 1.5);
	pointLight2.position.set(-100,-550,100);
	// scene.add( pointLight2 );

	scene.add( new THREE.AmbientLight( 0x323232 )); // soft white light

	var sphereSize = 10;
	var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
	scene.add( pointLightHelper );

	var light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
	light.position.set( 50, 200, 100 );
	light.position.multiplyScalar( 1 );

	light.castShadow = true;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;
	var d = 300;
	light.shadow.camera.left = - d;
	light.shadow.camera.right = d;
	light.shadow.camera.top = d;
	light.shadow.camera.bottom = - d;
	light.shadow.camera.far = 1000;
	scene.add( light );


	var loader = new THREE.TextureLoader();
	var groundTexture = loader.load( 'textures/grasslight-big.jpg' );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 25, 25 );
	groundTexture.anisotropy = 16;
	var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: groundTexture } );
	var plane = new THREE.plane( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
	plane.position.y = - 250;
	plane.rotation.x = - Math.PI / 2;
	plane.receiveShadow = true;
	scene.add( plane );
 
}
 
function animate() {
 
	requestAnimationFrame( animate );
 
	// mesh.rotation.x = Math.sin( time * 0.1 ) * 10;
	mesh.rotation.x += 0.02;
	mesh.rotation.y += 0.01;
	mesh.rotation.z += 0.02;

	var time = Date.now() * 0.0005;
	pointLight.position.x = Math.sin( time * 0.7 ) * 30;
	// pointLight.position.y = Math.cos( time * 0.5 ) * 40;
	// pointLight.position.z = Math.cos( time * 0.3 ) * 30;

	camera.lookAt( scene.position );
 
	renderer.render( scene, camera );
 
}

window.addEventListener( 'resize', onWindowResize, false );

var lastScrollTop = 0;

function onWindowResize(e){
	// console.log(e);

    camera.aspect = window.innerWidth / window.innerHeight;

    var st = $(this).innerWidth();

    if (st > lastScrollTop){
       // downscroll code
        console.log('down');
        camera.zoom += 0.04;
    } else {
      // upscroll code
        console.log('up');
        camera.zoom -= 0.03;
    }
    lastScrollTop = st;


    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}