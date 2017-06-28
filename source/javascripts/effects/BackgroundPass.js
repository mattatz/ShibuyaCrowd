
import ObjectUtil from "../utils/ObjectUtil";

export default class BackgroundPass extends THREE.ShaderPass {

    constructor() {

        super({
            uniforms: {
                resolution: { type: "v2", value: new THREE.Vector2(512, 512) },
                tDiffuse: { type: "t", value: null },
                time: { type: "f", value: 0 },
                invert: { type: "f", value: 0 },
                tGradient: { type: "t", value: null },
            },
            vertexShader: require("../../shaders/posteffects/kernel.vert"),
            fragmentShader: require("../../shaders/posteffects/background.frag")
        });

        this.speed = 0.4;

        this.invertFlash = false;
        ObjectUtil.defineUniformAccessor(this, this.material.uniforms, "invert");

        this.loadGradient();
    }

    setInvertFlash(flag) {
        this.invertFlash = flag;
        if(!this.invertFlash) {
            this.invert = 0.0;
        }
    }

	setSize(width, height) {
        super.setSize(width, height);
        this.material.uniforms.resolution.value = new THREE.Vector2(width, height);
    }

    update(dt, t, frame) {
        if(frame % 2 == 0) {
            if(this.invertFlash) {
                this.invert = 1.0 - this.invert;
            }
        }
    }

    loadGradient() {
        let loader = new THREE.TextureLoader()
        loader.load("../dest/textures/posteffects/gradient5.png", (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping
            this.material.uniforms.tGradient.value = texture
        })
    }

    dispose() {
        this.material.dispose();
        this.cBuffer.dispose();
        this.bBuffer.dispose();
    }

}
