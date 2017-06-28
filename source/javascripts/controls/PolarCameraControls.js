
import MathUtil from "../utils/MathUtil";
import PolarCoordinate from "../utils/PolarCoordinate";

import CameraControls from "./CameraControls";

const upVector = new THREE.Vector3(0, 1, 0);

export default class PolarCameraControls extends CameraControls {

    constructor(camera, center = new THREE.Vector3(0, 0, 0), t0 = Math.PI * 0.1, t1 = Math.PI * 0.5, radius = 150) {
        super(camera);

        this.center = center;
        this.polar = new PolarCoordinate(t0, t1, radius);
    }

    setup() {
    }

    randomize(radius = 300, tween = false, up = false) {
        let dt1 = (Math.random() - 0.5) * Math.PI * 2;

        if(
            (dt1 * this.polar.speed < 0)
        ) {
            this.polar.speed = - (this.polar.speed > 0 ? 1 : -1) * MathUtil.randomRange(0.1, 0.35);
        } else {
            this.polar.speed = (this.polar.speed > 0 ? 1 : -1) * MathUtil.randomRange(0.1, 0.35);
        }

        let t0 = up ? MathUtil.randomRange(MathUtil.HALF_PI * 0.75, MathUtil.HALF_PI) : MathUtil.randomRange(0, MathUtil.HALF_PI * 0.5);
        let t1 = this.polar.theta1 + dt1;

        if(tween) {
            this.polar.tween(t0, t1, radius, Math.random() * 500 + 500);
        } else {
            this.polar.theta0 = t0;
            this.polar.theta1 = t1;
            this.polar.radius = radius;
        }
    }

    overlook(tween = false) {
        let dt1 = (Math.random() - 0.5) * MathUtil.TWO_PI;

        if(
            (dt1 * this.polar.speed < 0)
        ) {
            this.polar.speed *= -1;
        }

        let t0 = MathUtil.HALF_PI;
        let t1 = this.polar.theta1 + dt1;
        let radius = 8000;

        if(tween) {
            this.polar.tween(t0, t1, radius, 800);
        } else {
            this.polar.theta0 = t0;
            this.polar.theta1 = t1;
            this.polar.radius = radius;
        }
    }

    turn(dt) {
        this.polar.forward(dt);
    }

    lerp(dt) {
        let v = this.polar.cartesian.add(this.center);
        this.camera.position.lerp(v, dt);
        this.camera.quaternion.slerp(MathUtil.lookAtQuaternion(v, this.center, upVector), dt);
    }

    apply() {
        let v = this.polar.cartesian.add(this.center);
        this.camera.position.set(v.x, v.y, v.z);
        this.camera.up.set(0, 1, 0);
        this.camera.lookAt(this.center);
    }

    update(dt) {
        this.turn(dt);
        // this.apply();
        this.lerp(dt);
    }

    get radius () {
        return this.polar.radius;
    }

    set radius (v) {
        return this.polar.radius = v;
    }

    get theta0 () {
        return this.polar.theta0;
    }

    set theta0 (v) {
        return this.polar.theta0 = v;
    }

    get theta1 () {
        return this.polar.theta1;
    }

    set theta1 (v) {
        return this.polar.theta1 = v;
    }

}
