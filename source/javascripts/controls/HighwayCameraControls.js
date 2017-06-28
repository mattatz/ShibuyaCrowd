
import MathUtil from "../utils/MathUtil";

import Highway from "../objects/Highway";

import CameraControls from "./CameraControls";

export default class HighwayCameraControls extends CameraControls {

    constructor(camera, highway) {
        super(camera);

        this.setup(highway);
    }

    setup (highway, start = 0) {
        this.highway = highway;
        this.start = start;

        this.t = 0;
        if(this.start > 0) {
            this.t = this.start / this.count;
        }

        this.speed = 500.0 / this.highway.distance;
    }

    get samples() {
        return this.highway.samples;
    }

    get count() {
        return this.samples.length;
    }

    update(dt) {
        this.t = MathUtil.clamp(this.t + (dt * 0.1 * this.speed));
        if(this.t < 1) {
            this.move(this.t, dt);
        }

        let index = this.getIndex(this.t);
        let cur = parseInt(Math.floor(index));
        if(cur != this.start) {
            let branches = this.highway.branch(cur);
            if(branches) {
                let joint = branches[parseInt(MathUtil.randomRange(0, branches.length))];
                this.setup(joint.highway, joint.index);
            }
        }

    }

    getIndex(t) {
        return Math.min(this.count - 1, t * this.count);
    }

    move(t, dt) {
        let idx = this.getIndex(t);

        let cur = parseInt(Math.floor(idx));
        let frac = idx - cur;
        let next = parseInt(Math.ceil(idx));

        let v0 = this.samples[cur];
        let v1 = this.samples[next];

        let p = (new THREE.Vector3()).lerpVectors(v0, v1, frac);
        this.camera.position.set(p.x, p.y + 10, p.z);

        // gradient
        let p2 = (new THREE.Vector3()).lerpVectors(v0, v1, frac + 0.025);
        let dir = (new THREE.Vector3()).subVectors(p, p2);

        if(dir.length() < Number.EPSILON) {
            return;
        }
        dir.normalize();

        // dir.lerp(new THREE.Vector3(0, 1, 0), 0.25);
        let to = MathUtil.lookAt(dir, new THREE.Vector3(0, 1, 0));

        // getWorldDirection returns back vector
        // let dot = this.camera.getWorldDirection().dot(dir);
        // this.camera.quaternion.slerp(to, dot < -0.5 ? dt : dt * 10.0);
        this.camera.quaternion.slerp(to, dt);
    }

    isFinish() {
        return this.t >= 1;
    }

}
