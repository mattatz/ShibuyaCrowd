
import GPUComputationRenderer from "../lib/GPUComputationRenderer";

import MathUtil from "../utils/MathUtil";
import ObjectUtil from "../utils/ObjectUtil";

const CrowdMode = {
    Street: 0,
    Gather: 1,
    Matrix: 2,
    Direction: 3,
    // Boids: 4,
    Stop: 5,
};

const directionVel = 0.01;
const directions = [
    new THREE.Vector2(-directionVel, 0.0),
    new THREE.Vector2(-directionVel, directionVel),
    new THREE.Vector2(0.0, directionVel),
    new THREE.Vector2(directionVel, directionVel),
    new THREE.Vector2(directionVel, 0.0),
    new THREE.Vector2(directionVel, -directionVel),
    new THREE.Vector2(0.0, -directionVel),
    new THREE.Vector2(-directionVel, -directionVel),
];

export default class CrowdSystem {

    constructor(renderer, count, options) {
        this._sideCount = Math.ceil(Math.sqrt(count));
        this._count = this._sideCount * this._sideCount;

        options = options || {};

        this.speed = options.speed || 1.0;

        this.gpuCompute = new GPUComputationRenderer(this.sideCount, this.sideCount, renderer);

        this.posVar = this.gpuCompute.addVariable("texturePosition", options.position, null, options);
        this.velVar = this.gpuCompute.addVariable("textureVelocity", options.velocity, null, options);

        let textureStreet = options.textureStreet.image;
        this.posVar.material.uniforms.textureStreet = this.velVar.material.uniforms.textureStreet = { type: "t", value: options.textureStreet };
        this.posVar.material.uniforms.streetTexelSize = this.velVar.material.uniforms.streetTexelSize = { type: "v4", value: new THREE.Vector4(1 / textureStreet.width, textureStreet.width, 1 / textureStreet.height, textureStreet.height) };

        this.posVar.material.uniforms.limit = { type: "f", value: 0.000095 };
        this.velVar.material.uniforms.throttle = { type: "f", value: 0.0 };
        this.posVar.material.uniforms.gatherPosition = this.velVar.material.uniforms.gatherPosition = { type: "v2", value: new THREE.Vector2(0, 0) };
        this.velVar.material.uniforms.direction = { type: "v2", value: new THREE.Vector2(directionVel, directionVel) };

        let texel = (1 / this.sideCount);
        this.velVar.material.defines.resolutionTexelSize = "vec2(" + texel + "," + texel + ")";

        this.rotVar = this.gpuCompute.addVariable("textureRotation", options.rotation, null, options);

        this.posVar.material.uniforms.movement = this.velVar.material.uniforms.movement = this.rotVar.material.uniforms.movement = { type:"i", value: CrowdMode.Street };

        // Add variable dependencies
        this.gpuCompute.setVariableDependencies(this.velVar, [this.velVar, this.posVar]);
        this.gpuCompute.setVariableDependencies(this.rotVar, [this.velVar, this.rotVar, this.posVar]);
        this.gpuCompute.setVariableDependencies(this.posVar, [this.velVar, this.posVar]);

        this.gpuCompute.init();

        ObjectUtil.defineUniformAccessor(this, this.posVar.material.uniforms, "movement");
        ObjectUtil.defineUniformAccessor(this, this.posVar.material.uniforms, "limit");
        ObjectUtil.defineUniformAccessor(this, this.velVar.material.uniforms, "throttle");
        ObjectUtil.defineUniformAccessor(this, this.velVar.material.uniforms, "gatherPosition");
        ObjectUtil.defineUniformAccessor(this, this.velVar.material.uniforms, "direction");
    }

    init() {
        this.velVar.material.uniforms.mode = this.posVar.material.uniforms.mode = this.rotVar.material.uniforms.mode = { type:"i", value: 0 };
        this.velVar.material.uniforms.speed = this.posVar.material.uniforms.speed = this.rotVar.material.uniforms.speed = { type:"f", value: 1.0 };
        this.velVar.material.uniforms.time = this.posVar.material.uniforms.time = this.rotVar.material.uniforms.time = { type:"f", value: 0.0 };
        this.velVar.material.uniforms.dt = this.posVar.material.uniforms.dt = this.rotVar.material.uniforms.dt = { type:"f", value: 0.0 };

        this.gpuCompute.compute();
    }

    update(dt, t) {
        this.velVar.material.uniforms.mode.value = 1;
        this.velVar.material.uniforms.dt.value = dt;
        this.velVar.material.uniforms.time.value = t;
        this.velVar.material.uniforms.speed.value = this.speed;
        this.gpuCompute.compute();
    }

    get sideCount() {
        return this._sideCount;
    }

    get count() {
        return this._count;
    }

    get position() {
        return this.gpuCompute.getCurrentRenderTarget(this.posVar).texture;
    }

    get velocity() {
        return this.gpuCompute.getCurrentRenderTarget(this.velVar).texture;
    }

    get rotation() {
        return this.gpuCompute.getCurrentRenderTarget(this.rotVar).texture;
    }

    randomizeDirection() {
        let v = Math.random();
        if(v < 0.33) {
            this.direction.x *= -1;
        } else if(v < 0.66) {
            this.direction.y *= -1;
        } else {
            this.direction.x *= -1;
            this.direction.y *= -1;
        }
    }

    dispose() {
    }

}

export {
    CrowdMode
};
