
import TWEEN from "../lib/Tween";

import MathUtil from "../utils/MathUtil";
import ObjectUtil from "../utils/ObjectUtil";
import ParticleSystem from "./ParticleSystem";

export default class SRParticleSystem extends ParticleSystem {

    constructor(renderer, count, options) {
        super(renderer, count, options);

        this.posVar.material.uniforms.death = { type: "f", value: 2.0 };
        this.posVar.material.uniforms.recovery = { type: "i", value: true };
        this.posVar.material.uniforms.textureBoundaryDepth = { type: "t", value: null };
        this.posVar.material.uniforms.boundaryMin = { type: "v3", value: new THREE.Vector3() };
        this.posVar.material.uniforms.boundaryMax = { type: "v3", value: new THREE.Vector3() };
        this.posVar.material.uniforms.emitterHeight = { type: "f", value: 30 };
        this.velVar.material.uniforms.force = { type: "v3", value: new THREE.Vector3(0, 0.5, 0) };
        this.velVar.material.uniforms.speed = { type: "f", value: options.speed || 1.5 };
        this.velVar.material.uniforms.vortexCenter = { type: "v3", value: new THREE.Vector3(0, 0, 0) };
        this.velVar.material.uniforms.vortexIntensity = { type: "f", value: 0.0 };

        ObjectUtil.defineUniformAccessor(this, this.velVar.material.uniforms, "mode");
        ObjectUtil.defineUniformAccessor(this, this.velVar.material.uniforms, "force");
        ObjectUtil.defineUniformAccessor(this, this.velVar.material.uniforms, "speed");
        ObjectUtil.defineUniformAccessor(this, this.velVar.material.uniforms, "vortexCenter");
        ObjectUtil.defineUniformAccessor(this, this.velVar.material.uniforms, "vortexIntensity");
        ObjectUtil.defineUniformAccessor(this, this.posVar.material.uniforms, "recovery");
        ObjectUtil.defineUniformAccessor(this, this.posVar.material.uniforms, "death");
        ObjectUtil.defineUniformAccessor(this, this.posVar.material.uniforms, "emitterHeight");
    }

    update(dt, t, frame) {
        super.update(dt, t, frame);
    }

    setupBoundary(texture, box) {
        this.posVar.material.uniforms.textureBoundaryDepth.value = texture;
        this.posVar.material.uniforms.boundaryMin.value = box.min;
        this.posVar.material.uniforms.boundaryMax.value = box.max;
    }

}
