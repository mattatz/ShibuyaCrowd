
import "../lib/threejs/OBJLoader";

import ObjectUtil from "../utils/ObjectUtil";

class CELMeshLoader extends THREE.OBJLoader {

    constructor() {
        super();
    }

    load(path) {
        return new Promise((resolve, reject) => {
            super.load(
                path + ".obj",
                (model) => {
                    let mesh = new CELMesh(model, path);
                    resolve(mesh);
                }
            );
        });
    }

}

export default class CELMesh extends THREE.Mesh {

    constructor(model, path) {
        let mesh = model.children[0];
        let geometry = mesh.geometry;
        geometry.computeBoundingBox();

        let count = geometry.attributes.position.count;
        let barycentric = [];
        for(let i = 0; i < count; i += 3) {
            barycentric.push(1, 0, 0);
            barycentric.push(0, 1, 0);
            barycentric.push(0, 0, 1);
        }
	    geometry.addAttribute("barycentric", new THREE.Float32BufferAttribute(barycentric, 3));

        let texture = (new THREE.TextureLoader()).load(path + "_0.jpg");
        super(
            geometry,
            null
        );

        let frag = require("../../shaders/cel/cel.frag");

        let uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib.common,
            THREE.UniformsLib.lights,
            THREE.UniformsLib.fog,
            {
                textureCEL: { type: "t", value: null },
            }
        ]);

        this.materials = {
            basic: new THREE.ShaderMaterial({
        		uniforms: THREE.UniformsUtils.merge([
                    uniforms,
                    {
                        wireframe: { type: "f", value: 0.0 },
                        noise: { type: "v3", value: new THREE.Vector3(0, 0, 0.01) }
                    }
                ]),
                vertexShader: require("../../shaders/cel/cel.vert"),
                fragmentShader: frag,
                transparent: true,
                lights: true,
                fog: true
            }),
            depth: new THREE.MeshDepthMaterial({})
        };

        this.materials.basic.extensions = {
            derivatives: true
        };

        this.material = this.materials.basic;

        for(let key in this.materials) {
            let mat = this.materials[key];
            if(mat.uniforms && mat.uniforms["textureCEL"]) {
                mat.uniforms["textureCEL"].value = texture;
            }
        }

        this.frustumCulled = false;
        this.castShadow = false;
        this.receiveShadow = true;

        ObjectUtil.defineUniformAccessor(this, this.materials.basic.uniforms, "wireframe");

        ObjectUtil.defineUniformAccessor(this, this.materials.basic.uniforms, "noise");

        ObjectUtil.defineUniformAccessor(this, this.materials.basic.uniforms, "voxelIntensity");
        ObjectUtil.defineUniformAccessor(this, this.materials.basic.uniforms, "voxel0");
        ObjectUtil.defineUniformAccessor(this, this.materials.basic.uniforms, "voxel1");
        ObjectUtil.defineUniformAccessor(this, this.materials.basic.uniforms, "voxelT");
    }

    setMaterial(key) {
        switch (key) {
            case "depth":
                this.material = this.materials.depth;
                break;
            default:
                this.material = this.materials.basic;
                this.material.depthWrite = (key == "basic");
                break;
        }
    }

    update(dt, t) {
    }

    get width() {
        let box = this.box;
        return (box.max.x - box.min.x) * shibuyaScale;
    }

    get height() {
        let box = this.box;
        return (box.max.y - box.min.y) * shibuyaScale;
    }

    get box() {
        return this.geometry.boundingBox;
    }

}

export {
    CELMeshLoader
};
