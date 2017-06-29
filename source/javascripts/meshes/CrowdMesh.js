
import TWEEN from "../lib/Tween";
import "../lib/threejs/OBJLoader";

import MathUtil from "../utils/MathUtil";
import ObjectUtil from "../utils/ObjectUtil";

const LowpolyAnimation = {
    idleEnd: { type: "v2", value: new THREE.Vector2(5.6, 29) },
    idleAnimScale: { type: "v3", value: new THREE.Vector3(0.7469875, 1.96503, 0.874217) },
    idleAnimOffset: { type: "v3", value: new THREE.Vector3(-0.40479, -0.01306768, -0.3395334) },

    walkEnd: { type: "v2", value: new THREE.Vector2(1.6, 8) },
    walkAnimScale: { type: "v3", value: new THREE.Vector3(0.6830251, 1.937408, 1.168666) },
    walkAnimOffset: { type: "v3", value: new THREE.Vector3(-0.3224577, -0.05507544, -0.6959282) },

    runEnd: { type: "v2", value: new THREE.Vector2(1.2, 6) },
    runAnimScale: { type: "v3", value: new THREE.Vector3(0.6909093, 1.903564, 1.669754) },
    runAnimOffset: { type: "v3", value: new THREE.Vector3(-0.3355445, -0.04656972, -0.9657606) },
};

const MarineAnimation = {
    idleEnd: { type: "v2", value: new THREE.Vector2(4, 19.5) },
    idleAnimScale: { type: "v3", value: new THREE.Vector3(45.94874, 189.3317, 59.17) },
    idleAnimOffset: { type: "v3", value: new THREE.Vector3(-21.52636, -0.3575773, -32.31999) },

    walkEnd: { type: "v2", value: new THREE.Vector2(1, 5) },
    walkAnimScale: { type: "v3", value: new THREE.Vector3(97.86209, 189.1355, 69.99985) },
    walkAnimOffset: { type: "v3", value: new THREE.Vector3(-51.81821, -0.9133741, -38.39777) },

    runEnd: { type: "v2", value: new THREE.Vector2(0.7333334, 4) },
    runAnimScale: { type: "v3", value: new THREE.Vector3(122.8473, 190.9063, 85.10907) },
    runAnimOffset: { type: "v3", value: new THREE.Vector3(-70.50955, 0.5363531, -46.94572) },
};

export default class CrowdMesh extends THREE.Mesh {

    constructor(folder, instances, options) {
        options = options || {};

        let marine = options.marine || false;
        if(marine) {
            folder += "marine/";
        } else {
            folder += "lowpoly/";
        }

        let uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib.common,
            THREE.UniformsLib.lights,
            THREE.UniformsLib.fog,
            marine ? MarineAnimation : LowpolyAnimation,
            ,
            {
                animSpeed: { type: "f", value: 1.0 },

                textureIdle: { type: "t", value: null },
                idleTexelSize: { type: "v2", value: new THREE.Vector2(0, 0) },

                textureWalk: { type: "t", value: null },
                walkTexelSize: { type: "v2", value: new THREE.Vector2(0, 0) },

                textureRun: { type: "t", value: null },
                runTexelSize: { type: "v2", value: new THREE.Vector2(0, 0) },

                texturePosition: { type: "t", value: options.texturePosition },
                textureVelocity: { type: "t", value: options.textureVelocity },
                textureRotation: { type: "t", value: options.textureRotation },

                useSlit: { type: "f", value: 0.0 },
                useSlitNoise: { type: "i", value: true },
                slitScale: { type: "v4", value: new THREE.Vector4(5.0, 4.2, 0.1, 0.1) },
                slitSpeed: { type: "v4", value: new THREE.Vector4(0.6, 0.6, 1, 1) },
                slitOffset: { type: "f", value: 0.0 },
                slitSize: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
                // textureNoise: { type: "t", value: null },

                textureBoundaryDepth: { type: "t", value: null },
                useBoundary: { type: "f", value: 1.0 },
                boundaryMin: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
                boundaryMax: { type: "v3", value: new THREE.Vector3(1, 1, 1) },

                streetScale: { type: "v3", value: options.streetScale },
                streetOffset: { type: "v3", value: options.streetOffset },

                useEnv: { type: "f", value: 0.46 },
                textureEnv: { type: "t", value: null },

                center: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
                translation: { type: "v3", value: new THREE.Vector3(0, -1, 0) },
                threshold: { type: "v2", value: new THREE.Vector2(0.00001, 0.0003) },
                height: { type: "f", value: 0.0 },
                fps: { type: "f", value: 5.0 },
                time: { type: "f", value: 0.0 },

                // mesh physical
                diffuse: { type: "v3", value: new THREE.Color(0xfce9db) },
                emissive: { type: "v3", value: new THREE.Color(0x111111) },
                roughness: { type: "f", value: 1.0 },
                metalness: { type: "f", value: 0.0 },
                opacity: { type: "f", value: 1.0 },
                reflectivity: { type: "f", value: 0.4 },
                envMapIntensity: { type: "f", value: 0.5 },
                clearCoat: { type: "f", value: 1.0 },
                clearCoatRoughness: { type: "f", value: 1.0 },
            }
        ]);

        let defineMarine = marine ? 1.0 : 0.01;

        super(
            new THREE.Geometry(),
            new THREE.RawShaderMaterial({
                vertexShader: require("../../shaders/crowd/render/human.vert"),
                fragmentShader: require("../../shaders/crowd/render/human.frag"),
                uniforms: uniforms,
                // side: THREE.DoubleSide
                side: THREE.BackSide,
                lights: true,
                fog: true,
                defines: {
                    MARINE: defineMarine,
                    USE_FOG: true
                }
            })
        );

        this.customDepthMaterial = new THREE.RawShaderMaterial({
            vertexShader: this.material.vertexShader,
            fragmentShader: require("../../shaders/crowd/render/depth.frag"),
            defines: {
                MARINE: defineMarine,
                DEPTH: true
            },
            uniforms: uniforms
        });

        let alone = new THREE.Mesh(
            new THREE.Geometry(),
            new THREE.RawShaderMaterial({
                vertexShader: this.material.vertexShader,
                fragmentShader: this.material.fragmentShader,
                uniforms: this.material.uniforms,
                defines: {
                    MARINE: defineMarine,
                    ALONE: true,
                    USE_FOG: true
                },
                side: THREE.BackSide,
                lights: true,
                fog: true
            })
        );
        alone.customDepthMaterial = new THREE.RawShaderMaterial({
            vertexShader: this.customDepthMaterial.vertexShader,
            fragmentShader: this.customDepthMaterial.fragmentShader,
            defines: {
                MARINE: defineMarine,
                DEPTH: true,
                ALONE: true
            },
            uniforms: uniforms
        });
        alone.castShadow = true;
        alone.frustumCulled = false;
        this.add(alone);

        this.castShadow = true;
        // this.castShadow = this.receiveShadow = true;

        Promise.all([
            this.loadTexture(folder + "Idle.png"),
            this.loadTexture(folder + "Walk.png"),
            this.loadTexture(folder + "Run.png"),
            this.loadTexture("../dest/textures/env/shibuya.jpg"),
            this.loadTexture("../dest/textures/noise/perlin.jpg"),
        ]).then((textures) => {
            this.material.uniforms.textureIdle.value = textures[0];
            this.material.uniforms.idleTexelSize.value = new THREE.Vector2(1 / textures[0].image.width, 1 / textures[0].image.height);

            this.material.uniforms.textureWalk.value = textures[1];
            this.material.uniforms.walkTexelSize.value = new THREE.Vector2(1 / textures[1].image.width, 1 / textures[1].image.height);

            this.material.uniforms.textureRun.value = textures[2];
            this.material.uniforms.runTexelSize.value = new THREE.Vector2(1 / textures[2].image.width, 1 / textures[2].image.height);

            let cubemap = options.equiToCube.convert(textures[3], 1024);
            this.material.uniforms.textureEnv.value = cubemap;

            let textureNoise = textures[4];
            textureNoise.wrapS = textureNoise.wrapT = THREE.RepeatWrapping;
            // this.material.uniforms.textureNoise.value = textureNoise;

            let objLoader = new THREE.OBJLoader();
            objLoader.load(
                folder + "Human.obj",
                (model) => {
                    let mesh = model.children[0];

                    let bgeo = mesh.geometry;
                    bgeo.computeBoundingBox();
                    uniforms.height.value = bgeo.boundingBox.max.y;

                    alone.geometry = bgeo;

                    let igeo = new THREE.InstancedBufferGeometry();
                    // bgeo.computeVertexNormals();
                    // bgeo.computeFaceNormals();

                    igeo.addAttribute("position", bgeo.attributes.position.clone());
                    igeo.addAttribute("normal", bgeo.attributes.normal.clone());
                    igeo.addAttribute("uv", bgeo.attributes.uv.clone());

                    let scales = new THREE.InstancedBufferAttribute(new Float32Array(instances * 3), 3, 1);
                    for(let i = 0, n = scales.count; i < n; i++) {
                        let sy = Math.random() * 0.15 + 0.85;
                        scales.setXYZ(
                            i,
                            Math.random() * 0.1 + 0.9,
                            sy,
                            sy
                        );
                    }

                    let offsets = new THREE.InstancedBufferAttribute(new Float32Array(instances * 4), 4, 1);
                    for(let i = 0, n = offsets.count; i < n; i++) {
                        offsets.setXYZW(
                            i,
                            Math.random() * 0.5, // expansion
                            0, // unused
                            Math.random() * 30.0, // offset for animation
                            Math.random() * 0.2 + 0.8 // speed for animation
                        );
                    }

                    // uv for sampling
                    let uv2 = new THREE.InstancedBufferAttribute(new Float32Array(instances * 2), 2, 1);
                    let sideCount = Math.sqrt(instances);
                    let invSideCount = 1 / sideCount;
                    let uvOffset = 0.5 * invSideCount;
                    for(let i = 0, n = uv2.count; i < n; i++) {
                        uv2.setXY(
                            i,
                            (i % sideCount) * invSideCount + uvOffset,
                            Math.floor(i / sideCount) * invSideCount + uvOffset,
                        );
                    }

                    igeo.addAttribute("scale", scales);
                    igeo.addAttribute("fluctuation", offsets);
                    igeo.addAttribute("uv2", uv2);

                    this.geometry = igeo;
                }
            );
        });

        this.frustumCulled = false;

        ObjectUtil.defineUniformAccessor(this, uniforms, "useSlit");
        ObjectUtil.defineUniformAccessor(this, uniforms, "useSlitNoise");
        ObjectUtil.defineUniformAccessor(this, uniforms, "slitScale");
        ObjectUtil.defineUniformAccessor(this, uniforms, "slitSpeed");
        ObjectUtil.defineUniformAccessor(this, uniforms, "slitOffset");
        ObjectUtil.defineUniformAccessor(this, uniforms, "slitSize");
        ObjectUtil.defineUniformAccessor(this, uniforms, "translation");
        ObjectUtil.defineUniformAccessor(this, uniforms, "useEnv");
        ObjectUtil.defineUniformAccessor(this, uniforms, "textureEnv");

        ObjectUtil.defineUniformAccessor(this, uniforms, "useBoundary");

        ObjectUtil.defineUniformAccessor(this, uniforms, "diffuse");
        ObjectUtil.defineUniformAccessor(this, uniforms, "emissive");
        ObjectUtil.defineUniformAccessor(this, uniforms, "metalness");
        ObjectUtil.defineUniformAccessor(this, uniforms, "roughness");
        ObjectUtil.defineUniformAccessor(this, uniforms, "opacity");
        ObjectUtil.defineUniformAccessor(this, uniforms, "reflectivity");
        ObjectUtil.defineUniformAccessor(this, uniforms, "envMapIntensity");
        ObjectUtil.defineUniformAccessor(this, uniforms, "clearCoat");
        ObjectUtil.defineUniformAccessor(this, uniforms, "clearCoatRoughness");
    }

    merge(buffer) {
        let geometry = new THREE.Geometry();
        geometry.fromBufferGeometry(buffer)
        geometry.mergeVertices();
        return (new THREE.BufferGeometry()).fromGeometry(geometry);
    }

    loadTexture(path) {
        return new Promise((resolve, reject) => {
            let loader = new THREE.TextureLoader();
            loader.load(
                path,
                (texture) => {
                    resolve(texture);
                }
            );
        });
    }

    update(dt, t) {
        this.material.uniforms.time.value += dt;
    }

    animateScale(scale, duration = 3000) {
        let self = this;

        let from = self.scale.clone();
        TWEEN.remove(self.scaleTween);
        self.scaleTween = new TWEEN.Tween({
            t: 0
        }).to({
            t: 1
        }, duration)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            let s = from.clone().lerp(scale, this.t);
            self.scale.set(s.x, s.y, s.z);
        })
        .onComplete(() => {
            self.scale.set(scale.x, scale.y, scale.z);
        })
        .start();
    }

    animateSlitOffset(offset, duration = 400) {
        let self = this;

        let to = self.slitOffset + offset;

        TWEEN.remove(self.slitOffsetTween);
        self.slitOffsetTween = new TWEEN.Tween({
            slitOffset: self.slitOffset 
        }).to({
            slitOffset: to
        }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            self.slitOffset = this.slitOffset;
        })
        .onComplete(() => {
            self.slitOffset = to;
        })
        .start();
    }

    animateSlitScale(sx, sy, sz, sw, duration = 500) {
        let self = this;

        TWEEN.remove(self.slitScaleTween);

        let from = self.slitScale.clone();
        self.slitScaleTween = new TWEEN.Tween({
            t: 0
        }).to({
            t: 1
        }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            let s = from.clone();
            s.x = MathUtil.lerp(s.x, sx, this.t);
            s.y = MathUtil.lerp(s.y, sy, this.t);
            s.z = MathUtil.lerp(s.z, sz, this.t);
            s.w = MathUtil.lerp(s.w, sw, this.t);
            self.slitScale = s;
        })
        .onComplete(() => {})
        .start();
    }

    animateSlitSize(size, duration = 1000) {
        let self = this;

        let from = self.slitSize.clone();
        TWEEN.remove(self.slitSizeTween);
        self.slitSizeTween = new TWEEN.Tween({
            t: 0
        }).to({
            t: 1
        }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            let s = from.clone().lerp(size, this.t);
            self.slitSize.set(s.x, s.y, s.z);
        })
        .onComplete(() => {
            self.slitSize.set(size.x, size.y, size.z);
        })
        .start();
    }

    toggleUseSlit() {
        this.animateUseSlit((this.useSlit < 0.5) ? 1 : 0);
    }

    animateUseSlit(to, duration = 1000) {
        let self = this;

        TWEEN.remove(self.useSlitTween);
        self.useSlitTween = new TWEEN.Tween({
            useSlit: self.useSlit
        }).to({
            useSlit: to
        }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            self.useSlit = this.useSlit;
        })
        .onComplete(() => {
            self.useSlit = to;
        })
        .start();
    }

    updateSystem(system) {
        this.material.uniforms.texturePosition.value = system.position;
        this.material.uniforms.textureVelocity.value = system.velocity;
        this.material.uniforms.textureRotation.value = system.rotation;
    }

}
