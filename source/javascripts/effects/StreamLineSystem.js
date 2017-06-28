
import GPUComputationRenderer from "../lib/GPUComputationRenderer"

export default class StreamLineSystem {

    constructor(renderer, count, length, options) {
        this._count = count;

        options = options || {};

        this.speed = options.speed || 1.0;

        this.gpuCompute = new GPUComputationRenderer(count, 1, renderer);

        this.lifetimeVar = this.gpuCompute.addVariable("textureLifetime", options.textureLifetime, null, options);

        /*
        this.lifetimeVar.material.uniforms.mode = { type: "i", value: 0 };
        this.lifetimeVar.material.uniforms.time = { type: "f", value: 0.0 };
        this.lifetimeVar.material.uniforms.dt = { type: "f", value: 0.0 };

        this.gpuCompute.setVariableDependencies(this.lifetimeVar, [this.lifetimeVar]);
        this.gpuCompute.init();
        */

        this.gpuCompute2 = new GPUComputationRenderer(count, length, renderer);
        this.velocityVar = this.gpuCompute.addVariable("textureVelocity", options.textureVelocity, null, options);
        this.positionVar = this.gpuCompute2.addVariable("texturePosition", options.texturePosition, null, options);
        this.positionVar.material.uniforms.mode = this.velocityVar.material.uniforms.mode = this.lifetimeVar.material.uniforms.mode = { type: "i", value: 0 };
        this.positionVar.material.uniforms.time = this.velocityVar.material.uniforms.time = this.lifetimeVar.material.uniforms.time = { type: "f", value: 0.0 };
        this.positionVar.material.uniforms.dt = this.velocityVar.material.uniforms.dt = this.lifetimeVar.material.uniforms.dt = { type: "f", value: 0.0 };

        this.positionVar.material.uniforms.textureSource = this.velocityVar.material.uniforms.textureSource = {
            type: "t", value: options.textureSource
        };

        let source = options.textureSource;
        let width = source.image.width;
        let height = source.image.height;
        this.positionVar.material.uniforms.size = this.velocityVar.material.uniforms.size = {
            type: "v4", value: new THREE.Vector4(1 / width, width, 1 / height, height)
        };

        this.gpuCompute.setVariableDependencies(this.lifetimeVar, [this.lifetimeVar]);
        this.gpuCompute.setVariableDependencies(this.velocityVar, [this.velocityVar, this.lifetimeVar]);

        this.gpuCompute2.setVariableDependencies(this.positionVar, [this.positionVar]);

        this.velocityVar.material.uniforms.texturePosition = { type: "t", value: null };
        this.velocityVar.material.uniforms.stretch = {
            type: "v4", value: new THREE.Vector4(0.001, 0.02, 0.5, 5.0)
        };

        this.positionVar.material.uniforms.textureLifetime = { type: "t", value: null };
        this.positionVar.material.uniforms.textureVelocity = { type: "t", value: null };
        this.positionVar.material.uniforms.texel = { type: "v2", value: new THREE.Vector2(1 / count, 1 / length) };

        this.gpuCompute.init();
        this.gpuCompute2.init();

        this.init();
    }

    init() {
        this.lifetimeVar.material.uniforms.mode.value = 0;
        this.render();
    }

    update(dt, t) {
        this.lifetimeVar.material.uniforms.mode.value = 1;
        this.lifetimeVar.material.uniforms.dt.value = dt * this.speed;
        this.lifetimeVar.material.uniforms.time.value = t;
        this.render();
    }

    render() {
        // this.gpuCompute.compute();

        this.velocityVar.material.uniforms.texturePosition.value = this.position;
        this.gpuCompute.compute();
        this.positionVar.material.uniforms.textureLifetime.value = this.lifetime;
        this.positionVar.material.uniforms.textureVelocity.value = this.velocity;
        this.gpuCompute2.compute();
    }

    get count() {
        return this._count;
    }

    get position() {
        return this.gpuCompute2.getCurrentRenderTarget(this.positionVar).texture;
    }

    get velocity() {
        return this.gpuCompute.getCurrentRenderTarget(this.velocityVar).texture;
    }

    get lifetime() {
        return this.gpuCompute.getCurrentRenderTarget(this.lifetimeVar).texture;
    }

    dispose() {
        this.lifetimeVar.renderTargets[0].dispose();
        this.lifetimeVar.renderTargets[1].dispose();
        this.lifetimeVar.material.dispose();
    }

}
