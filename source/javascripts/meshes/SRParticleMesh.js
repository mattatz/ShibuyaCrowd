
import TWEEN from "../lib/Tween";

import MathUtil from "../utils/MathUtil";
import ObjectUtil from "../utils/ObjectUtil";
import ParticleMesh from "./ParticleMesh";

export default class SRParticleMesh extends ParticleMesh {

    constructor(sideCount, size, options) {
        options = options || {};
        options.uniforms = THREE.UniformsUtils.merge([
            options.uniforms || {},
            {
                textureParticle: { type: "f", value: null },
                alpha: { type: "f", value: 0.75 },
                threshold: { type: "f", value: 5.0 }
            }
        ]);

        super(sideCount, size, options);

        this.material.blending = THREE.CustomBlending;
        this.material.blendEquation = THREE.AddEquation;
        this.material.blendSrc = THREE.SrcAlphaFactor;
        this.material.blendDst = THREE.OneFactor;
        this.material.depthWrite = false;

        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "size");
    }

}
