
import MathUtil from "../utils/MathUtil";
import noise from "../lib/perlin";

import CameraControls from "./CameraControls";

export default class HandyCameraControls extends CameraControls {

    constructor(camera, options) {
        super(camera);

        options = options || {};

        this.positionFrequency = options.positionFrequency || 0.5;
        this.rotationFrequency = options.rotationFrequency || 0.3;

        this.positionAmount = options.positionAmount || 0.5;
        this.rotationAmount = options.rotationAmount || 0.1;

        this.positionComponents = options.positionComponents || new THREE.Vector3(0.25, 0.01, 1);
        // this.rotationComponents = options.rotationComponents || new THREE.Vector3(0, 0.5, 0.1);
        this.rotationComponents = options.rotationComponents || new THREE.Vector3(-0.01, 0.2, 0.02);

        this.positionOctave = options.positionOctave || 3;
        this.rotationOctave = options.rotationOctave || 4;

        this.timePosition = Math.random() * 10;
        this.timeRotation = Math.random() * 10;

        this.setup();
    }

    setup() {
        this.initialPosition = this.camera.position;
        this.initialRotation = this.camera.quaternion;

        this.noiseVectors = [];
        for (var i = 0; i < 6; i++)
        {
            var theta = Math.random() * Math.PI * 2;
            this.noiseVectors[i] = new THREE.Vector2(Math.cos(theta), Math.sin(theta));
        }
    }

    update(dt, t) {
        let p = this.wobblePosition(dt);
        p.add(this.initialPosition);
        this.camera.position.set(p.x, p.y, p.z);

        let q = this.wobbleRotation(dt);
        this.camera.setRotationFromQuaternion(q.multiply(this.initialRotation));
    }

    wobblePosition(dt) {
        this.timePosition += dt * this.positionFrequency;

        let p = new THREE.Vector3(
            this.Fbm(this.noiseVectors[0].clone().multiplyScalar(this.timePosition), this.positionOctave),
            this.Fbm(this.noiseVectors[1].clone().multiplyScalar(this.timePosition), this.positionOctave),
            this.Fbm(this.noiseVectors[2].clone().multiplyScalar(this.timePosition), this.positionOctave)
        );
        p = p.multiply(this.positionComponents).multiplyScalar(this.positionAmount * 2);

        return p;
    }

    wobbleRotation(dt) {
        this.timeRotation += dt * this.rotationFrequency;

        let r = new THREE.Vector3(
            this.Fbm(this.noiseVectors[3].clone().multiplyScalar(this.timeRotation), this.rotationOctave),
            this.Fbm(this.noiseVectors[4].clone().multiplyScalar(this.timeRotation), this.rotationOctave),
            this.Fbm(this.noiseVectors[5].clone().multiplyScalar(this.timeRotation), this.rotationOctave)
        );
        r = r.multiply(this.rotationComponents).multiplyScalar(this.rotationAmount * 2);

        let euler = new THREE.Euler(r.x, r.y, r.z, "XYZ");
        let q = (new THREE.Quaternion()).setFromEuler(euler);
        return q;
    }

    Fbm(coord, octave)
    {
        let f = 0.0;
        let w = 1.0;
        for (let i = 0; i < octave; i++) {
            f += w * noise.perlin2(coord.x, coord.y) * 0.5;
            coord.x *= 2;
            coord.y *= 2;
            w *= 0.5;
        }
        return f;
    }

}
