
import Stage from "./Stage.js";

import "../lib/threejs/OBJLoader";
import "../lib/threejs/controls/OrbitControls";
import "../lib/EquirectangularToCubemap";

import MathUtil from "../utils/MathUtil";
import TextureUtil from "../utils/TextureUtil";
import KeyCode from "../utils/KeyCode";

import OpenStreetMap, { Tile, Boundary, GSI, kHeightScale } from "../utils/OpenStreetMap";
import CoordinateConverter from "../utils/CoordinateConverter";

import HandyCameraControls from "../controls/HandyCameraControls";
import PolarCameraControls from "../controls/PolarCameraControls";
import FixedCameraControls, { FixedCameraPoint } from "../controls/FixedCameraControls";
import BirdCameraControls from "../controls/BirdCameraControls";
import LightControls from "../controls/LightControls";

import BackgroundPass from "../effects/BackgroundPass";
import CompositePass from "../effects/CompositePass";

import SRParticleSystem from "../effects/SRParticleSystem";
import CrowdSystem, { CrowdMode } from "../effects/CrowdSystem";

import OSM from "../objects/OSM";

import HighwayGroup from "../objects/HighwayGroup";
import Highway from "../objects/Highway";
import CEL  from "../objects/CEL";

import SRParticleMesh from "../meshes/SRParticleMesh";
import CrowdMesh from "../meshes/CrowdMesh";

const scramble = {
    lon: 139.700772,
    lat: 35.659710
};

const scrambleCenter = {
    lon: scramble.lon - 0.00025,
    lat: scramble.lat - 0.00025
};

const womb = {
    lon: 139.695049,
    lat: 35.658394
};

const scale = 500000;

// const offsetX = -womb.lon * scale, offsetY = -womb.lat * scale;
const offsetX = -scramble.lon * scale, offsetY = -scramble.lat * scale;
const converter = new CoordinateConverter(scale, offsetX, offsetY);

const fixedCameraPointsPath = "/dest/camera/points.json";

let toggles = {
    useSlit: false,
    cityNoise: false,
    cityWireframe: false,
    posteffectInvert: false
};

export default class ShibuyaStage extends Stage {

    constructor(vj, resolution) {
        super(vj, resolution);

        this.updaters = [];
        this.init(vj);
    }

    init(vj) {
        // let visualizer = this.gui.add(this.analyser, "smoothedVolume").min(0).max(1).step(0.01).listen();
        // this.gui.add(this.analyser, "volumeScale").min(0).max(5).step(0.01);

        this.createScene(window.innerWidth, window.innerHeight);

        this.container = new THREE.Object3D();

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMap.soft = true;

        let shadowRange = 200;
        let light = new THREE.DirectionalLight(0xffffff, 0.2);
        light.position.set(0, 1000, 0);
        light.frustumCulled = false;
        light.shadow.darkness = 0.35;
        light.shadow.camera.near = 300; light.shadow.camera.far = 1200;

        light.shadow.camera.left = -shadowRange; light.shadow.camera.right = shadowRange;
        light.shadow.camera.bottom = -shadowRange; light.shadow.camera.top = shadowRange;
        light.shadow.mapSize.width = light.shadow.mapSize.height = 2 << 10;
        light.castShadow = true; light.shadow.castShadow = true;

        // this.scene.add(new THREE.CameraHelper(light.shadow.camera));
        // this.scene.add(new THREE.DirectionalLightHelper(light));

        this.scene.add(light);
        this.scene.add(light.target);

        let hemisphereLight = new THREE.HemisphereLight(0xfafaff, 0x080820, 1);
        this.scene.add(hemisphereLight);

        let fog = new THREE.Fog(new THREE.Color(0xffffff), 1000, 2500);
        this.scene.fog = fog;

        this.scene.add(this.container);

        this.cameraControls = {
            bird: new BirdCameraControls(this.camera, 1200, 0, 0, 0, 0),
            fixed: new FixedCameraControls(this.camera, {
                positionComponents: new THREE.Vector3(1, 0.25, 1),
                positionAmount: 1.0,
                rotationComponents: new THREE.Vector3(0.2, 1, 0.2),
                rotationAmount: 1.0
            }),
            polar: new PolarCameraControls(this.camera, new THREE.Vector3(0, 0, 0), 0, 0, 30),
            orbit: new THREE.OrbitControls(this.camera, this.renderer.domElement)
        };
        let orbit = this.cameraControls.orbit;
        orbit.enablePan = orbit.enableRotate = orbit.enableZoom = false;

        // this.selectedCameraControls = "bird";
        // this.selectedCameraControls = "fixed";
        this.selectedCameraControls = "polar";
        // this.selectedCameraControls = "orbit";

        this.load(".." + fixedCameraPointsPath).then((str) => {
            let controls = this.cameraControls.fixed;
            controls.points = JSON.parse(str).map((raw) => {
                return new FixedCameraPoint(raw.position, raw.quat);
            });
        });

        this.lightControls = new LightControls(this.camera, light, 1000);
        this.updaters.push(this.lightControls);

        // http://tools.geofabrik.de/calc/#type=geofabrik_standard&bbox=139.690427,35.648294,139.715343,35.667322&tab=1&proj=EPSG:4326&places=2
        let boundary = new Boundary(35.6615, 139.698, 35.6571, 139.703);
        let map = new OpenStreetMap();

        this.container.rotation.set(-Math.PI * 0.5, 0, 0);

        Promise.all([
            this.load("../dest/osm/shibuya.json")
        ]).then((data) => {
            let osm = new OSM(data[0]);

            let group = new HighwayGroup(osm, boundary, converter);
            let textureStreet = group.texture();

            let range = group.range;
            let streetScale = new THREE.Vector3(range.x * scale, range.y * scale, 0);

            let offset = converter.convert(group.min.x, group.min.y);
            let streetOffset = new THREE.Vector3(offset.x, offset.y, 0);

            let gather = group.getStreamPosition(
                scrambleCenter.lon,
                scrambleCenter.lat
            );

            let center = new THREE.Vector3(
                gather.x * streetScale.x + streetOffset.x,
                0,
                -(gather.y * streetScale.y + streetOffset.y)
            );

            let crowd = this.setupCrowd(textureStreet, streetScale, streetOffset);
            this.crowd = crowd;
            crowd.system.gatherPosition = gather;
            crowd.mesh.material.uniforms.center.value.set(center.x, center.y, center.z);

            this.cameraControls.polar.center.set(center.x, center.y + 20, center.z);

            this.setupCity().then((city) => {
                this.city = city;

                let box = city.boundingBox;
                let birdControls = this.cameraControls.bird;
                let offset = 10;
                birdControls.setBoundary(box.min.x - offset, box.max.z + offset, box.max.x + offset, box.min.z - offset);
                birdControls.randomize();

                crowd.mesh.material.uniforms.textureBoundaryDepth.value = city.depthBuffer.texture;
                crowd.mesh.material.uniforms.boundaryMin.value = city.boundingBox.min;
                crowd.mesh.material.uniforms.boundaryMax.value = city.boundingBox.max;

                let passes = this.composer.passes;
                let composite = passes.find((pass) => {
                    return pass instanceof CompositePass;
                });
                if(composite) {
                    composite.fadeIn();
                    this.hideIndicator();
                }

                this.setupParticle().then((system, mesh) => {
                    system.setupBoundary(city.depthBuffer.texture, city.boundingBox);
                    system.vortexCenter = center;
                    system.init();
                });
            });

        });

    }

    activate(mode) {
        super.activate(mode);
    }

    deactivate(mode) {
        super.deactivate(mode);
    }

    update(dt, t, frame) {
        super.update(dt, t, frame);

        if(this.cameraControls) {
            let controls = this.cameraControls[this.selectedCameraControls];
            controls.update(dt, t, frame);
        }
        this.updaters.forEach((updater) => {
            updater.update(dt, t, frame);
        });
    }

    input(keyCode) {
        switch(keyCode) {
            // crowd movement
            case KeyCode.a:
                this.crowd.system.movement = CrowdMode.Street;
                break;

            case KeyCode.s:
                this.crowd.system.movement = CrowdMode.Direction;
                this.crowd.system.randomizeDirection();
                break;

            case KeyCode.d:
                this.crowd.system.movement = CrowdMode.Gather;
                break;

            case KeyCode.f:
                this.crowd.system.movement = CrowdMode.Stop;
                break;

            case KeyCode.g:
                this.crowd.mesh.animateUseSlit(toggles.useSlit ? 0 : 1);
                toggles.useSlit = !toggles.useSlit;
                break;

            case KeyCode.h:
                toggles.useSlit = true;
                this.crowd.mesh.animateUseSlit(1);
                this.crowd.mesh.animateSlitOffset(MathUtil.randomRange(0.7, 1.2));
                break;

            // city 
            case KeyCode.z:
                this.city.animateNoiseIntensity(toggles.cityNoise ? 1 : 11.5);
                toggles.cityNoise = !toggles.cityNoise;
                break;

            case KeyCode.x:
                this.city.animateWireframe(toggles.cityWireframe ? 0.25 : 1.0);
                toggles.cityWireframe = !toggles.cityWireframe;
                break;

            // camera
            case KeyCode.q:
                this.selectedCameraControls = "bird";
                this.cameraControls[this.selectedCameraControls].randomize();
                break;

            case KeyCode.w:
                this.selectedCameraControls = "fixed";
                this.cameraControls[this.selectedCameraControls].next();
                break;

            case KeyCode.e:
                this.selectedCameraControls = "polar";
                this.cameraControls[this.selectedCameraControls].randomize();
                break;

            case KeyCode.leftArrow:
            case KeyCode.upArrow:
            case KeyCode.rightArrow:
            case KeyCode.downArrow:
                this.moveCamera(keyCode);
                break;

            case KeyCode.r:
                this.composite.animateInvert(toggles.posteffectInvert ? 0.0 : 1.0);
                toggles.posteffectInvert = !toggles.posteffectInvert;
                break;

            case KeyCode.t:
                this.composite.mirror = (this.composite.mirror + 1) % 5;
                break;

            case KeyCode.y:
                if(this.composite.glitchSpeed > 1.0) {
                    this.composite.glitchSpeed = 0.4;
                } else {
                    this.composite.glitchSpeed = 5.4;
                }
                break;

        }
    }

    moveCamera(keyCode) {
        switch(this.selectedCameraControls) {
            case "bird":
                this.moveBirdCamera(keyCode);
                break;
            case "fixed":
                this.moveFixedCamera(keyCode);
                break;
            case "polar":
                this.movePolarCamera(keyCode);
                break;
        }
    }

    moveBirdCamera(keyCode) {
        let controls = this.cameraControls["bird"];
        switch(keyCode) {
            case KeyCode.leftArrow:
                controls.moveLeft();
                break;
            case KeyCode.upArrow:
                controls.moveUp();
                break;
            case KeyCode.rightArrow:
                controls.moveRight();
                break;
            case KeyCode.downArrow:
                controls.moveDown();
                break;
        }
    }

    moveFixedCamera(keyCode) {
        let controls = this.cameraControls["fixed"];
        switch(keyCode) {
            case KeyCode.leftArrow:
                controls.prev();
                break;
            case KeyCode.upArrow:
                controls.next();
                break;
            case KeyCode.rightArrow:
                controls.next();
                break;
            case KeyCode.downArrow:
                controls.prev();
                break;
        }
    }

    movePolarCamera(keyCode) {
        let controls = this.cameraControls["polar"];
        switch(keyCode) {
            case KeyCode.leftArrow:
                controls.polar.radius -= 20;
                break;
            case KeyCode.upArrow:
                controls.polar.theta0 += 0.2;
                break;
            case KeyCode.rightArrow:
                controls.polar.radius += 20;
                break;
            case KeyCode.downArrow:
                controls.polar.theta0 -= 0.2;
                break;
        }

        controls.polar.radius = Math.max(10, controls.polar.radius);
        controls.polar.radius = Math.min(controls.polar.radius, 1000);
        controls.polar.theta0 = Math.max(0, controls.polar.theta0);
        controls.polar.theta0 = Math.min(Math.PI * 0.45, controls.polar.theta0);
    }

    osc(address, data) {
    }

    destroy() {
        super.destroy();

        if(this.composer) {
            this.composer.renderTarget1.dispose();
            this.composer.renderTarget2.dispose();
        }
    }

    bang(duration, beat = 0) {
    }

    render(renderer) {
        if(this.composer) {
            this.composer.render();
        }
    }

    createVideo() {
        let element = document.createElement("video");
        element.style["pointer-events"] = "none";
        element.style["display"] = "none";
        document.body.appendChild(element);
        return element;
    }

    createScene(w, h) {
        this.renderer.setClearColor(new THREE.Color("rgb(0, 0, 0)"));

        this.camera = new THREE.PerspectiveCamera(60, w / h, 1.0, 10000);
        this.camera.position.set(0, 50, 50);

        this.composer = new THREE.EffectComposer(this.renderer);

        let backgroundPass = new BackgroundPass();
        this.updaters.push(backgroundPass);

        let rpass = new THREE.RenderPass(this.scene, this.camera);
        rpass.clear = false; rpass.clearDepth = true;

        let composite = new CompositePass();
        this.composite = composite;

        this.updaters.push(composite);

        this.composer.addPass(backgroundPass);
        this.composer.addPass(rpass);
        this.composer.addPass(composite);

        let chromaticAberration = new THREE.ShaderPass({
            vertexShader: require("../../shaders/posteffects/kernel.vert"),
            fragmentShader: require("../../shaders/posteffects/chromatic_aberration.frag"),
            uniforms: {
                tDiffuse: { type: "t", value: null },
                distortion: { type: "f", value: 2.2 }
            }
        });
        this.composer.addPass(chromaticAberration);

        let passes = this.composer.passes;
        passes[passes.length - 1].renderToScreen = true;

        this.composer.setSize(w, h);
    }

    resize(w, h) {
        super.resize(w, h)

        if(this.camera) {
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        }

        if(this.composer) {
            this.composer.setSize(w, h);
        }
    }

    load(path) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", path, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) { // DONE
                    let status = xhr.status;
                    if (status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(status);
                    }
                }
            };
            xhr.send();
        });
    }

    save(data, path) {
        fs.writeFile(path, JSON.stringify(data));
    }

    loadTexture(path) {
        return new Promise((resolve, reject) => {
            let loader = new THREE.TextureLoader();
            loader.load(
                path,
                (texture) => {
                    resolve(texture);
                }
            )
        });
    }

    setupParticle() {
        return new Promise((resolve, reject) => {
            let system = new SRParticleSystem(
                this.renderer,
                // 2 << 10,
                // 2 << 11,
                2 << 10,
                // 4096,
                {
                    position: require("../../shaders/particles/update/mapPosition.frag"),
                    velocity: require("../../shaders/particles/update/mapVelocity.frag"),
                    rotation: require("../../shaders/particles/update/rotation.frag"),
                    speed: 1.5,
                    type: THREE.HalfFloatType
                }
            );

            let loader = new THREE.TextureLoader();
            loader.load("../dest/textures/particle.png", (tex) => {
                let particle = new SRParticleMesh(
                    system.sideCount,
                    4,
                    {
                        vertexShader: require("../../shaders/particles/render/map.vert"),
                        fragmentShader: require("../../shaders/particles/render/map.frag"),
                    }
                );

                particle.renderOrder = 1000;
                particle.size = 0.85;

                particle.material.uniforms.textureParticle.value = tex;
                particle.material.uniforms.texturePosition.value = system.position;
                particle.material.uniforms.textureVelocity.value = system.velocity;
                particle.material.uniforms.textureRotation.value = system.rotation;

                this.scene.add(particle);
                resolve(system, particle);
            });

            this.updaters.push(system);
        });
    }

    setupCity() {
        return new Promise((resolve, reject) => {
            let city = new CEL();
            city.setup().then(() => {
                city.wireframe = 0.25;
                city.speed = 0.4;

                let noise = city.noise;
                noise.x = 1.0;
                city.noise = noise;

                this.updaters.push(city);

                city.setupDepth(this.renderer);
                city.setMaterial("basic");
                this.scene.add(city);

                resolve(city);
            });
        });
    }

    setupCrowd(textureStreet, streetScale, streetOffset) {
        let system = new CrowdSystem(
            this.renderer,
            // 512,
            1024,
            // 2048,
            // 4096,
            {
                position: require("../../shaders/crowd/update/position.frag"),
                velocity: require("../../shaders/crowd/update/velocity.frag"),
                rotation: require("../../shaders/crowd/update/rotation.frag"),
                textureStreet: textureStreet,
                type: THREE.FloatType
            }
        );

        let equiToCube = new THREE.EquirectangularToCubemap(this.renderer);
        let mesh = new CrowdMesh(
            // "../dest/models/crowd/",
            "../dest/models/crowd/",
            system.count,
            {
                texturePosition: system.position,
                textureVelocity: system.velocity,
                textureRotation: system.rotation,
                textureStreet: textureStreet,
                streetScale: streetScale,
                streetOffset: streetOffset,
                equiToCube: equiToCube
            }
        );

        mesh.scale.set(10, 10, 10);
        mesh.position.set(0, 1, 0);
        this.scene.add(mesh);

        system.throttle = 1.0;

        this.updaters.push(system);
        this.updaters.push(mesh);

        mesh.updateSystem(system);

        return {
            system: system,
            mesh: mesh
        };
    }

    saveBoundaryOSM(n, w, s, e, path) {
        let map = new OpenStreetMap();
        let boundary = new Boundary(n, w, s, e);
        map.loadOSM(boundary).then((data) => {
            fs.writeFile(path, JSON.stringify(data));
        });
    }

    saveOSM(lon, lat, zoom, size, path) {
        let map = new OpenStreetMap();
        let tile = map.lonlatToTile(lon, lat, zoom);
        let boundary = map.tileToBoundary(tile, size);
        map.loadOSM(boundary).then((data) => {
            fs.writeFile(path, JSON.stringify(data));
        });
    }

    saveGSI(tile, path) {
        let map = new OpenStreetMap();
        map.loadGSI(tile).then((gsi) => {
            fs.writeFile(path, JSON.stringify(gsi));
        });
    }

    debugTexture(texture, width = 1000, height = 1000) {
        let plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1, 1, 1),
            new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
                fog: false
            })
        );
        plane.scale.set(width, height, 1);
        this.scene.add(plane);

        return plane;
    }

}
