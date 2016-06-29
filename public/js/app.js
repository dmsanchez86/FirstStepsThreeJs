var scene, camera, renderer;
var geometry, material, mesh, pointLight, controls, plane;
 
init();
animate();
 
function init() {
 
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
 
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 10000 );
	camera.position.set(400,6,910);
 
	geometry = new THREE.BoxGeometry( 200, 200, 200 );
	material = new THREE.MeshLambertMaterial( { 
		color: 0x981414, 
		wireframe: false, 
		// emissive: 0x0000ff 
	} );
 
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.y = -230;
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	scene.add( mesh );
 
	renderer = new THREE.WebGLRenderer({
		// alpha: true,
		antialias: true
	});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor( scene.fog.color );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	// renderer.shadowMap.enabled = true;
 
	document.querySelector('#canvasRenderer').appendChild( renderer.domElement );

	pointLight = new THREE.PointLight( 0xff0040, 1);
	pointLight.position.set(0,200,200);
	// scene.add( pointLight );

	pointLight2 = new THREE.PointLight( 0xff0040, 1.5);
	pointLight2.position.set(-100,-550,100);
	// scene.add( pointLight2 );

	scene.add( new THREE.AmbientLight( 0x666666 )); // soft white light

	var sphereSize = 10;
	var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
	// scene.add( pointLightHelper );

	var light = new THREE.DirectionalLight( 0xdfebff, 1.7 );
	light.position.set( 50, 600, 300 );
	light.position.multiplyScalar( 1.3 );

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

	var dlh = new THREE.DirectionalLightHelper(light, 10);
	scene.add(dlh);


	var loader = new THREE.TextureLoader();
	var groundTexture = loader.load( 'textures/grasslight-big.jpg' );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 25, 25 );
	groundTexture.anisotropy = 16;

	var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: groundTexture } );
	plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 30000, 30000 ), groundMaterial );
	plane.position.y = - 350;
	plane.rotation.x = - Math.PI / 2;
	plane.receiveShadow = true;
	scene.add( plane );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxPolarAngle = Math.PI * 0.5;
	controls.minDistance = 1000;
	controls.maxDistance = 7500;
 
}
 
function animate() {
 
	requestAnimationFrame( animate );
 
	// mesh.rotation.x = Math.sin( time * 0.1 ) * 10;
	// mesh.rotation.x += 0.02;
	mesh.rotation.y += 0.01;
	// mesh.rotation.z += 0.02;

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