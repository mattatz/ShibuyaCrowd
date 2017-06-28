
import TWEEN from "../lib/Tween";

import MathUtil from "../utils/MathUtil";
import ObjectUtil from "../utils/ObjectUtil";

import CELMesh, { CELModes, CELMeshLoader } from "../meshes/CELMesh";

export default class CEL extends THREE.Object3D {

    constructor() {
        super();

        this.boundingBox = null
        this.depthBuffer = null;
        this.meshes = [];

        this.speed = 0.25;
    }

    setup(lowpoly = false) {
        let promise = new Promise((resolve, reject) => {
            let celLoader = new CELMeshLoader();
            let pathes = [
                "Tile_173078_LD_012_017_",
                "Tile_173078_LD_011_017_",
                "Tile_173078_LD_012_018_",
                "Tile_173078_LD_011_018_",
            ];

            let prefix = (lowpoly ? "../dest/models/SizeS/" : "../dest/models/SizeM/");
            let suffix = (lowpoly ? "L15" : "L18");
            let loaders = pathes.map((path) => {
                return celLoader.load(prefix + path + suffix);
            });
            Promise.all(loaders).then((meshes) => {
                let city = new THREE.Object3D();

                this.meshes = meshes;
                this.meshes.forEach((mesh, i) => {
                    city.add(mesh);
                });

                const cityScale = 4.625;

                let scramble = meshes[2];
                // let scramble = meshes[3];
                let box = scramble.box;
                city.position.set(-box.max.x, -box.max.y, -box.max.z);

                this.add(city);
                this.rotation.set(-Math.PI * 0.5, 0, 0);
                let height = (box.max.z - box.min.z);
                this.position.set(0, height * cityScale, 0);
                this.scale.set(cityScale, cityScale, cityScale);

                ObjectUtil.defineArrayAccessor(this, this.meshes, "wireframe");
                ObjectUtil.defineArrayAccessor(this, this.meshes, "noise");

                resolve(this);
            });
        });

        return promise;
    }

    setupDepth(renderer, width = 1024, height = 1024) {
        let depthScene = new THREE.Scene();
        this.depthBuffer = new THREE.WebGLRenderTarget(width, height, {
            format: THREE.RGBAFormat,
            stencilBuffer: false,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping
        });

        this.setMaterial("depth");
        depthScene.add(this);

        this.updateMatrixWorld(true);
        let boundary = this.computeBoundingBox();

        // left, right, top, bottom, near, far
        let depth = boundary.max.y - boundary.min.y;
        let center = (new THREE.Vector3()).addVectors(boundary.min, boundary.max).multiplyScalar(0.5);
        let bw = (boundary.max.x - boundary.min.x);
        let bh = (boundary.max.z - boundary.min.z);

        let depthCamera = new THREE.OrthographicCamera(- bw * 0.5, bw * 0.5, bh * 0.5, - bh * 0.5, 0.001, depth);
        depthCamera.position.set(center.x, boundary.max.y, center.z);
        depthCamera.up.set(0, 0, -1);
        depthCamera.lookAt(new THREE.Vector3(center.x, 0, center.z));

        renderer.render(depthScene, depthCamera, this.depthBuffer, true);
        depthScene.remove(this);
    }

    setMaterial(key) {
        this.meshes.forEach((mesh) => {
            mesh.setMaterial(key);
        });
    }

    update(dt, t) {
        this.noise.y += dt * this.speed;
        this.meshes.forEach((mesh) => {
            mesh.update(dt, t);
        });
    }

    computeBoundingBox() {
        if(this.boundingBox != null) {
            return this.boundingBox;
        }

        let min = new THREE.Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        let max = new THREE.Vector3(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);

        this.meshes.forEach((mesh) => {
            let b = mesh.geometry.boundingBox;
            let x0 = b.min.x, y0 = b.min.y, z0 = b.min.z;
            let x1 = b.max.x, y1 = b.max.y, z1 = b.max.z;

            let c0 = new THREE.Vector3(x0, y0, z0), c1 = new THREE.Vector3(x1, y0, z0), c2 = new THREE.Vector3(x1, y0, z1), c3 = new THREE.Vector3(x0, y0, z1);
            let c4 = new THREE.Vector3(x0, y1, z0), c5 = new THREE.Vector3(x1, y1, z0), c6 = new THREE.Vector3(x1, y1, z1), c7 = new THREE.Vector3(x0, y1, z1);
            [c0, c1, c2, c3, c4, c5, c6, c7].forEach((c) => {
                let position = mesh.localToWorld(c);
                min.min(position);
                max.max(position);
            });
        });

        this.boundingBox = new THREE.Box3(min, max);
        return this.boundingBox;
    }

    animateNoiseIntensity(to, duration = 1000) {
        let self = this;
        TWEEN.remove(self.noiseIntensityTween);
        let cur = self.noise.clone();
        self.noiseIntensityTween = new TWEEN.Tween({
            intensity: cur.x
        }).to({
            intensity: to
        }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            cur.x = this.intensity;
            self.noise = cur;
        })
        .start();
    }

    animateWireframe(to = 1.0, duration = 500) {
        let self = this;
        TWEEN.remove(self.wireframeTween);
        let cur = self.wireframe;
        self.wireframeTween = new TWEEN.Tween({
            wireframe: self.wireframe
        }).to({
            wireframe: to
        }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            self.wireframe = this.wireframe;
        })
        .onComplete(() => {
            self.wireframe = to;
        })
        .start();
    }

}

export {
    CELModes
};
