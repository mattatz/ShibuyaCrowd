
import GPUComputationRenderer from "../lib/GPUComputationRenderer"

const velocity = "textureVelocity";
const position = "positionVelocity";

export default class ParticleSystem {

    constructor(renderer, count, options) {
        options = options || {};

        let size = Math.ceil(Math.sqrt(count));
        this._sideCount = size;
        this._count = this._sideCount * this._sideCount;

        this.gpuCompute = new GPUComputationRenderer(size, size, renderer);
        let pos0 = this.gpuCompute.createTexture();
        let vel0 = this.gpuCompute.createTexture();
        let rot0 = this.gpuCompute.createTexture();

        this.posVar = this.gpuCompute.addVariable("texturePosition", options.position, vel0, options);
        this.velVar = this.gpuCompute.addVariable("textureVelocity", options.velocity, pos0, options);
        this.rotVar = this.gpuCompute.addVariable("textureRotation", options.rotation, rot0, options);

        // Add variable dependencies
        this.gpuCompute.setVariableDependencies(this.velVar, [this.velVar, this.posVar]);
        this.gpuCompute.setVariableDependencies(this.rotVar, [this.velVar, this.rotVar, this.posVar]);
        this.gpuCompute.setVariableDependencies(this.posVar, [this.velVar, this.posVar]);

        this.gpuCompute.init();

        this.velVar.material.uniforms.mode = this.posVar.material.uniforms.mode = this.rotVar.material.uniforms.mode = { type:"i", value: 0 };
        this.velVar.material.uniforms.time = this.posVar.material.uniforms.time = this.rotVar.material.uniforms.time = { type:"f", value: 0.0 };
        this.velVar.material.uniforms.dt = this.posVar.material.uniforms.dt = this.rotVar.material.uniforms.dt = { type:"f", value: 0.0 };
    }

    init() {
        this.velVar.material.uniforms.mode.value = 0;

        this.gpuCompute.compute();
    }

    update(dt, t) {
        this.velVar.material.uniforms.mode.value = 1;
        this.velVar.material.uniforms.dt.value = dt;
        this.velVar.material.uniforms.time.value = t;

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

}
