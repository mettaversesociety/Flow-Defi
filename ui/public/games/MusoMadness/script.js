parent.postMessage({name: "gameEvent", score: 0, resetTime:true}, "*")

console.clear();

var renderCalls = [];
var count = 0
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

/*////////////////////////////////////////*/

var scene, camera, renderer, orbit, light;

scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x222222, 20, 600);

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 10, 600 );
camera.position.z = 90;

let mousePos = { x: 0.5, y: 0.5, _x: 0.5, _y: 0.5 };
function ease(current,target,ease){ return current + (target - current) * ( ease || 0.2 ); }
function trackMouse(e){

  let pointer = e.touches ? e.touches[0] : e;

  mousePos._x = ( e.clientX / window.innerWidth );
  mousePos._y = ( e.clientY / window.innerHeight );

};

function updateCamera(){
  mousePos.x = ease(mousePos.x, mousePos._x, 0.1);
  mousePos.y = ease(mousePos.y, mousePos._y, 0.1);
  camera.position.x = -10 + (30 * mousePos.x);
  camera.position.y = 60 + (-10 * mousePos.y);
}
updateCamera();

camera.updateProjectionMatrix();

camera.lookAt(new THREE.Vector3(0,0,-20));

TweenLite.from(camera.position,3,{
  z: '+=150',
  y: '+=60',
  ease: Power3.easeInOut,
  onComplete: function(){
    window.addEventListener('mousemove', trackMouse);
    renderCalls.push(updateCamera);
  }
});

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000 );
renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow( 0.91, 5.0 );

if ( window.innerWidth > 500 ) {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.body.appendChild( renderer.domElement);

renderCalls.push(function(){ renderer.render( scene, camera ); });

/*////////////////////////////////////////*/

// orbit = new THREE.OrbitControls( camera, renderer.domElement );
// orbit.enabled = false;

/*////////////////////////////////////////*/

var ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

var hemiLight = new THREE.HemisphereLight( 0xFFF7EB, 0xEBF7FD, 0.3 );
//hemiLight.color.setRGB(0.75,0.8,0.95);
hemiLight.position.set( 0, 100, 0 );
scene.add( hemiLight );

/*////////////////////////////////////////*/

light = new THREE.SpotLight( 0xffffff );
light.position.y = 120;
light.position.x = 0;
light.position.z = 60; //110;
light.angle = Math.PI / 6;

light.castShadow = true;

light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

light.shadow.camera.near = 1;
light.shadow.camera.far = 800;
light.shadow.camera.fov = 40;

scene.add( light );
scene.position.x = -12;

/*////////////////////////////////////////*/

function ground(){

  let geometry = new THREE.PlaneGeometry( 600, 600, 1, 1 );
  let material = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    shininess: 300,
    shading: THREE.SmoothShading
  });

  let plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = Math.PI / -2;
  plane.receiveShadow = true;
  return plane;

}
scene.add( ground() );


/*////////////////////////////////////////*/

let keys = {};
function bindKey(key, fn){
  keys[key] = keys[key] || [];
  keys[key].push(fn);
}

function triggerKey(e) {
  console.log(e.key);
  if ( keys[e.key] ) {
    keys[e.key].forEach((fn)=>{ fn(); });
    e.preventDefault();
  }
}

document.body.addEventListener("keydown", triggerKey);
//document.body.focus();

/*////////////////////////////////////////*/

var drumSamples = {
  kick: 'http://brokensquare.com/Code/assets/drum-samples/kick.mp3',
  snare: 'http://brokensquare.com/Code/assets/drum-samples/snare.mp3',
  closedhat: 'http://brokensquare.com/Code/assets/drum-samples/closedhat.mp3',
  openhat: 'http://brokensquare.com/Code/assets/drum-samples/openhat.mp3',
  crash: 'http://brokensquare.com/Code/assets/drum-samples/crash.mp3',
}

function Drum(sample, geometry, material, keybind){

  THREE.Mesh.call(this, geometry, material);

  this.sound = new Howl({
    src: [sample],
    autoplay: false
  });

  this.castShadow = true;
  this.receiveShadow = true;

  if ( keybind ) { bindKey(keybind, ()=>{
      if ( this.visible ) { this.trigger(); }
    });
  }
}

Drum.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
  constructor: Drum,

  trigger: function(){
    if ( this.sound ) {
      this.sound.play();
      this.triggerAnimation();
    }
  },

  triggerAnimation: function(){

    TweenMax.to(this.scale, 0.06, {
      y: 0.2,
      x: 0.95,
      z: 0.95,
      repeat: 1,
      yoyo: true,
      ease: Power1.easeInOut, //Power3.easeInOut
    });

  }
});

/*////////////////////////////////////////*/

let drumMaterial = new THREE.MeshPhongMaterial({
  color: 0xFF0000,
  //specular: 0x009900,
  shininess: 550,
  emissive: 0xFF0000,
  emissiveIntensity: 0.5,
  transparent: true,
  opacity: 0.8,
});

let drumFrontMaterial = new THREE.MeshPhongMaterial({
  color: 0xFFFFFF,
  //specular: 0x009900,
  shininess: 550,
  emissive: 0xFFFFFF,
  emissiveIntensity: 0.5,
  transparent: true,
  opacity: 0.95,
});

/*////////////////////////////////////////*/

(function(){
  let geometry = new THREE.CylinderGeometry( 20, 20, 30, 50 );
  let kick = new Drum( drumSamples['kick'] , geometry, drumMaterial, 'b');

  let frontGeometry = new THREE.CylinderGeometry( 18, 18, 1, 50 );
  let front = new THREE.Mesh(frontGeometry, drumFrontMaterial);
  //front.position.z = 18;
  front.position.y = 15;
  kick.add(front);

  kick.position.x = 20;
  kick.position.y = 20;
  kick.rotation.x = Math.PI/2;


  scene.add(kick);
}());

/*////////////////////////////////////////*/

(function(){
  let geometry = new THREE.CylinderGeometry( 10, 10, 9, 50 );

  let snare = new Drum( drumSamples['snare'] , geometry, drumMaterial, 'g');

  let frontGeometry = new THREE.CylinderGeometry( 9, 9, 1, 50 );
  let front = new THREE.Mesh(frontGeometry, drumFrontMaterial);
  //front.position.z = 18;
  front.position.y = 4.5;
  snare.add(front);

  snare.position.x = -20;
  snare.position.z = 20;
  snare.position.y = 25;
  //kick.rotation.x = Math.PI/2;
  scene.add(snare);
}());


/*////////////////////////////////////////*/

let cymbalMaterial = new THREE.MeshPhongMaterial({
  color: 0xF5D061,
  //specular: 0x009900,
  shininess: 550,
  emissive: 0xE6AF2E,
  emissiveIntensity: 0.5,
  transparent: true,
  opacity: 0.8
});

let cymbalAnimation = function(){

  TweenMax.to(this.rotation, 0.05, {
    z: '-='+Math.PI/13,
    repeat: 1,
    yoyo: true,
  });
}

let closedhat = (function(){
  let geometry = new THREE.CylinderGeometry( 10, 10, 2, 50 );

  let hihat = new Drum( drumSamples['closedhat'] , geometry, cymbalMaterial, 'h');
  hihat.position.x = -4;
  hihat.position.z = 10;
  hihat.position.y = 40;
  hihat.triggerAnimation = cymbalAnimation;
  //hihat.rotation.x = Math.PI/6;
  scene.add(hihat);

  return hihat;
}());


/*////////////////////////////////////////*/
// Open Hihat

let openhat = (function(){
  let geometry = new THREE.CylinderGeometry( 10, 10, 1, 30 );

  let hihat = new Drum( drumSamples['openhat'] , geometry, cymbalMaterial, 'h');

  let bottomhat = new THREE.Mesh(geometry, cymbalMaterial);
  bottomhat.position.y = 2;
  hihat.add(bottomhat);

  hihat.position.x = -4;
  hihat.position.z = 10;
  hihat.position.y = 40;
  hihat.triggerAnimation = cymbalAnimation;
  //hihat.rotation.x = Math.PI/6;
  scene.add(hihat);

  return hihat;
}());


/*////////////////////////////////////////*/


let pedalGeometry = new THREE.BoxGeometry(8,5,20);
let pedalMaterial = new THREE.MeshPhongMaterial({
  color: 0x6C7A89,
  //specular: 0x009900,
  shininess: 100,
  emissive: 0x6C7A89,
  emissiveIntensity: 0.6,
});

let pedal = new THREE.Mesh(pedalGeometry, pedalMaterial);
pedal.castShadow = true;
pedal.receiveShadow = true;
pedal.position.x = -8;
pedal.position.z = 5;
pedal.rotation.y = Math.PI / 8;
pedal.trigger = toggleHat;
scene.add(pedal);


let hatopen = false;

function toggleHat(){

  hatopen = !hatopen;

  openhat.visible = true;
  closedhat.visible = false;

  var tl = new TimelineLite({
    onComplete: function(){
      openhat.visible = hatopen;
      closedhat.visible = !hatopen;
    }
  });

  //tl.timeScale(0.2);

  // tl.to(openhat.position,0.1,{
  //   y: ( hatopen ? 40 : 39 )
  // },0);

  tl.to(openhat.children[0].position,0.2,{
    y: ( hatopen ? 2 : 0 )
  },0);

  tl.to(openhat.children[0].scale,0.2,{
    y: ( hatopen ? 1 : 2 )
  },0);

  tl.to(pedal.scale, 0.2, {
    y: hatopen ? 1.6 : 1,
    ease: Power2.easeInOut
  },0);

}

toggleHat();

bindKey('j', toggleHat);
// document.body.addEventListener('keydown',function(e){
//   if ( e.key === 'j' ) { 
//     toggleHat();
//     e.preventDefault();
//   }
// });

/*////////////////////////////////////////*/

(function(){
  let geometry = new THREE.CylinderGeometry( 13, 13, 1, 50 );

  let crash = new Drum( drumSamples['crash'] , geometry, cymbalMaterial, 'k');
  crash.position.x = 43;
  crash.position.z = 15;
  crash.position.y = 40;
  crash.rotation.x = Math.PI/8;
  crash.triggerAnimation = cymbalAnimation;
  scene.add(crash);


}());


/*////////////////////////////////////////*/

let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();

document.body.addEventListener('mousedown',click);
document.body.addEventListener('touchstart',click);

function click(e){
    console.log(count);
    count += 1;
    if (count > 20) {
        parent.postMessage({name: "gameEvent", score: 1, nextRound: 6}, "*")
    }

  e.preventDefault();

  let pointer = e.touches ? e.touches : [e];

  for (let i = 0, len = pointer.length; i < len; i++){

    let event = pointer[i];

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    //alert(mouse.x +'  '+ mouse.y );
    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
      let drum = intersects[ 0 ].object;
      if ( drum.trigger ) { drum.trigger(); }
      else {
        drum.traverseAncestors((drum)=>{
          console.log(drum);
          if ( drum.trigger ) { drum.trigger(); return false; }
        });
      }
    }
  }
}

/*////////////////////////////////////////*/


// let geometry = new THREE.CylinderGeometry( 1, 1, 10, 15 );
// let stick = new THREE.Mesh(geometry, cymbalMaterial);
// stick.position.z = -10;
// stick.rotation.x = Math.PI / 1.5;
// scene.add(stick);

// document.body.addEventListener('mousemove',(event)=>{
//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//   mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
//   var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
//   vector.unproject( camera );
//   var dir = vector.sub( camera.position ).normalize();
//   var distance = -camera.position.z / dir.z;
//   stick.position.copy(camera.position.clone().add( dir.multiplyScalar( distance ) ));
// });
