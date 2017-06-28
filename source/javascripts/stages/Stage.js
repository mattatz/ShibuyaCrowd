
import "../lib/threejs/postprocessing/EffectComposer";
import "../lib/threejs/shaders/CopyShader";
import "../lib/threejs/postprocessing/RenderPass";
import "../lib/threejs/postprocessing/ShaderPass";
import "../lib/threejs/postprocessing/MaskPass";
import "../lib/threejs/postprocessing/BloomBlendPass";
import "../lib/threejs/postprocessing/SMAAPass";
import "../lib/threejs/shaders/SMAAShader";
import "../lib/threejs/postprocessing/FilmPass";
import "../lib/threejs/shaders/FilmShader";
import "../lib/threejs/controls/TrackballControls";

import TWEEN from "../lib/Tween";
import noise from "../lib/perlin";
import Stats from "../lib/stats.min";

export default class Stage extends THREE.EventDispatcher {

    constructor(vj, resolution) {
        super();

        this.scene = new THREE.Scene();
        this.renderer = vj.renderer;
        this.analyser = vj.analyser;
        this.resolution = resolution;

        this.indicator = document.getElementById("webvj--indicator");
    }

    init() {
    }

    update(dt, t, frame) {
    }

    destroy() {
    }

    bang(duration, beat) {
    }

    input(keyCode) {
    }

    osc(address, data) {
        this.dispatchEvent({
            type: "osc",
            message: {
                address: address,
                data: data
            }
        });
    }

    activate(mode) {
    }

    deactivate(mode) {
    }

    render(renderer) {
    }

    resize(w, h) {
    }

    loadJSON(path) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", path, true);
            xhr.onreadystatechange = function() {
                let status;
                let data;
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
                        data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } else {
                        reject(status);
                    }
                }
            };
            xhr.send();

        });
    }

    hideIndicator() {
        this.indicator.style.display = "none";
    }

}
