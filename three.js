// Canvas
const canvas = document.querySelector(".webgl");

// debug ui
const gui = new dat.GUI({ closed: false });

//scene
const scene = new THREE.Scene();

// const OrbitControls = THREE.OrbitControls;

// Texture
const textureLoader = new THREE.TextureLoader();

// Fonts
const fontLoader = new THREE.FontLoader();

// My galaxies
const galaxies = {
  milkyWay: {
    count: 46800,
    size: 0.02,
    radius: 5.17,
    branches: 4,
    spin: 1.2, // per distorsione dei branches della galassia
    randomness: 0.4,
    randomnessPower: 3.9,
    insideColor: "#657808",
    outsideColor: "#1b50d7",
  },
  andromeda: {
    count: 34500,
    size: 0.02,
    radius: 6.69,
    branches: 4,
    spin: 1.2,
    randomness: 0.45,
    randomnessPower: 4.2,
    insideColor: "#f04b1a",
    outsideColor: "#985616",
  },
  backward: {
    count: 40500,
    size: 0.024,
    radius: 5.82,
    branches: 5,
    spin: -2.2,
    randomness: 0.73,
    randomnessPower: 4.6,
    insideColor: "#d7d261",
    outsideColor: "#785113",
  },
  yourOwn: {
    count: 40500,
    size: 0.024,
    radius: 5.82,
    branches: 5,
    spin: -2.2,
    randomness: 0.73,
    randomnessPower: 4.6,
    insideColor: "#d7d261",
    outsideColor: "#785113",
  },
};
const galBtn = document.querySelector("#next-galaxy");

/*
 * Galaxy
 */
const parameters = {
  count: 34800,
  size: 0.02,
  radius: 5,
  branches: 3, // how many branches we want?
  spin: 1, // per distorsione dei branches della galassia
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};

let geometry = null;
let material = null;
let points = null;

// Core function to generate galaxy
const generateGalaxy = (galaxy) => {
  if (points !== null) {
    // destroy old galaxy
    geometry.dispose();
    material.dispose();
    scene.remove(points); // of course you cant dispose (liberare la memoria) di meshes e points
  }

  // Geometry
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(galaxy.count * 3);
  const colors = new Float32Array(galaxy.count * 3);

  const colorInside = new THREE.Color(galaxy.insideColor);
  const colorOutside = new THREE.Color(galaxy.outsideColor);
  // Now we need to mix inside and outside depending on how far they are from the center -> we use color.lept() di three js

  for (let i = 0; i < galaxy.count; i++) {
    const i3 = i * 3;
    //positioning
    const radius = Math.random() * galaxy.radius;
    const spinAngle = radius * galaxy.spin;
    const brancheModule = i % galaxy.branches; // modulo matematico
    const formattedBranch = brancheModule / galaxy.branches; // semplicemente dividiamo per 3 per avere una formattazione più leggibile (invece di avere 0,1,2,0,1,2etc.. avremo 0,0.33,0.66)
    const branchAngle = formattedBranch * Math.PI * 2; // per avere i valori degli angoli dei rispettivi branches delle nostre galassie. 2PI è uguale al valore del cerchio. Un PI è un semicerchio

    // randomness
    const randomX =
      Math.pow(Math.random(), galaxy.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), galaxy.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), galaxy.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX; // posizioniamo lungo i due assi
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / galaxy.radius);
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Material
  material = new THREE.PointsMaterial({
    size: galaxy.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true, // to use the colors we provided -> we need a Float32Array for colors
  });

  // Points
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

gui
  .add(galaxies.yourOwn, "count")
  .min(100)
  .max(100000)
  .step(100)
  .onFinishChange(() => {
    generateGalaxy(galaxies.yourOwn);
  });
gui
  .add(galaxies.yourOwn, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(() => {
    generateGalaxy(galaxies.yourOwn);
  });

gui
  .add(galaxies.yourOwn, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(() => {
    generateGalaxy(galaxies.yourOwn);
  });

gui
  .add(galaxies.yourOwn, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    generateGalaxy(galaxies.yourOwn);
  });

gui
  .add(galaxies.yourOwn, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(() => {
    generateGalaxy(galaxies.yourOwn);
  });

gui
  .add(galaxies.yourOwn, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(() => {
    generateGalaxy(galaxies.yourOwn);
  });

gui
  .add(galaxies.yourOwn, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(() => {
    generateGalaxy(galaxies.yourOwn);
  });

gui.addColor(galaxies.yourOwn, "insideColor").onFinishChange(() => {
  generateGalaxy(galaxies.yourOwn);
});
gui.addColor(galaxies.yourOwn, "outsideColor").onFinishChange(() => {
  generateGalaxy(galaxies.yourOwn);
});

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  //when changing properties like aspect, we need to call camera.updateProjectionMatrix()
  camera.updateProjectionMatrix();
  //update renderer
  renderer.setSize(sizes.width, sizes.height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  80,
  sizes.width / sizes.height,
  0.1,
  230
);

camera.position.set(7, 5.7, 2.25);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
  canvas,
});

// axes
// scene.add(new THREE.AxesHelper(20));
const cameraVector = new THREE.Vector3();
cameraVector.set(0.7, -1.37, 4.2);

generateGalaxy(galaxies.milkyWay);

// galaxy controls
galBtn.addEventListener("click", () => {
  gsap.timeline({ duration: 1.4, ease: "power4.out" }).from(".webgl", {
    opacity: 0,
    onComplete: () => {
      const header = document
        .querySelector(".galaxy-description h1")
        .innerHTML.toLowerCase();
      if (header === "via lattea") {
        generateGalaxy(galaxies.andromeda);
      } else if (header === "gal. di andromeda") {
        generateGalaxy(galaxies.backward);
      } else {
        generateGalaxy(galaxies.yourOwn);
      }
    },
  });
});

/* gui.add(camera.position, "z").min(0).max(10).step(0.001);
gui.add(camera.position, "y").min(0).max(10).step(0.001);
gui.add(camera.position, "x").min(-10).max(10).step(0.001);
console.log(cameraVector);
gui.add(cameraVector, "y").min(-10).max(10).step(0.001);
gui.add(cameraVector, "x").min(-10).max(10).step(0.001);
gui.add(cameraVector, "z").min(-10).max(10).step(0.001); */

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
  camera.lookAt(cameraVector);
  const elapsedTime = clock.getElapsedTime();

  // camera.position.x = Math.sin(elapsedTime) * 5;
  // camera.position.x = Math.cos(elapsedTime) * 10;
  // controls.update();
  scene.children.filter((el) => el.type === "Points")[0].rotation.y += 0.005;
  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
