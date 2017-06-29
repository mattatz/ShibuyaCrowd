
import TWEEN from "../lib/Tween";

import ObjectUtil from "../utils/ObjectUtil";

export default class CompositePass extends THREE.ShaderPass {

    constructor() {
        super({
            uniforms: {
                time: { type: "f", value: 0.0 },
                fade: { type: "f", value: 0.0 },
                resolution: { type: "v2", value: new THREE.Vector2(512, 512) },
                tDiffuse: { type: "t", value: null },

                noiseOffset: { type: "v2", value: new THREE.Vector2(0, 0) },

                glitchIntensity: { type: "f", value: 0.65 },
                glitchWave: { type: "v2", value: new THREE.Vector2(1, 1) },
                glitchSpeed: { type: "f", value: 0.4 },
                glitchScale: { type: "v2", value: new THREE.Vector2(1, 1) },
                glitchShift: { type: "f", value: 1.0 },

                mirror: { type: "i", value: 0 },
                invert: { type: "f", value: 0.0 }
            },
            vertexShader: require("../../shaders/posteffects/kernel.vert"),
            fragmentShader: require("../../shaders/posteffects/composite.frag")
        });

        this.speed = 0.1;

        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "fade");
        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "invert");
        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "mirror");
        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "glitchIntensity");
        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "glitchSpeed");
        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "glitchWave");
        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "glitchShift");
        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "glitchScale");
    }

    fadeIn(duration = 1000) {
        this.fadeAnimate(1, duration);
    }

    fadeOut(duration = 1000) {
        this.fadeAnimate(0, duration);
    }

    fadeAnimate(to, duration) {
        let self = this;
        new TWEEN.Tween({
            fade: self.fade
        }).to({
            fade: to
        }, duration)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            self.fade = this.fade;
        })
        .onComplete(() => {
            self.fade = 1;
        })
        .start();
    }

    animateInvert(to, duration = 1000) {
        let self = this;
        TWEEN.remove(self.invertTween);
        self.invertTween = new TWEEN.Tween({
            invert: self.invert
        }).to({
            invert: to
        }, duration)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function() {
            self.invert = this.invert;
        })
        .onComplete(() => {
            self.invert = to;
        })
        .start();
    }

	setSize(width, height) {
        super.setSize(width, height);
        this.material.uniforms.resolution.value = new THREE.Vector2(width, height);
    }

    update(dt, t, frame) {
        this.material.uniforms.time.value = t;
        if(frame % 2 == 0) {
            this.material.uniforms.noiseOffset.value.set(Math.random(), Math.random());
        }
    }

    dispose() {
        this.material.dispose();
    }

}
