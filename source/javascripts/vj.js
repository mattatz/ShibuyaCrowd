
import TWEEN from "./lib/Tween";

import AudioAnalyser from "./utils/AudioAnalyser";
import ShibuyaStage from "./stages/ShibuyaStage";
import Keyboard from "./Keyboard";

const resolution = {
    width: 1920,
    height: 1080
};

export default class VJ {

    constructor() {
        this.clock = new THREE.Clock()
        this.frames = 0;

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        let container = this.createContainer();
        this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        document.addEventListener("keydown", (e) => {
            this.input(e.keyCode);
        });

        window.addEventListener("resize", (e) => {
            this.resize();
        });

        this.stage = new ShibuyaStage(this, resolution);

        let loop = (time) => {
            this.loop(time);
            requestAnimationFrame(loop);
        };

        this.resize();
        requestAnimationFrame(loop);
    }

    input(keyCode) {
        if(this.stage) {
            this.stage.input(keyCode);
        }
    }

    setBackground(color, transparent) {
        this.renderer.setClearColor(color, transparent ? 0 : 1);
    }

    createContainer() {
        let container = document.createElement("div");
        container.id = "webvj--container";
        document.body.appendChild(container);
        return container;
    }

    loop(time) {
        let dt = this.clock.getDelta();
        if(this.stage) {
            this.stage.update(dt, this.clock.elapsedTime, this.frames);
            this.stage.render(this.renderer);
        }
        TWEEN.update(time);

        this.frames++;
    }

    resize () {
        let w = window.innerWidth, h = window.innerHeight;
        this.stage.resize(w, h);
        this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        this.renderer.setSize(w, h);
    }

}

new Keyboard(".virtual-keyboard");
new VJ();

