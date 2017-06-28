
import MathUtil from "../utils/MathUtil";
import CameraControls from "./CameraControls";

const forward = new THREE.Vector3(0, 0, -1);

export default class BirdCameraControls extends CameraControls {

    constructor(camera, distance, left, top, right, bottom) {
        super(camera);

        this.left = this.top = this.right = this.bottom = 0;
        this.dx = this.dy = 0;

        this.setDistance(distance);
        this.setBoundary(left, top, right, bottom);

        this.point = new THREE.Vector3();
        this.setup();
    }

    setup() {
        this.randomize();
    }

    randomize(
        distanceMin = 400,
        distanceMax = 800,
        speedMin = 10,
        speedMax = 100
    ) {
        let d = Math.random();
        let distance = d * (distanceMax - distanceMin) + distanceMin;
        this.setDistance(distance);

        let x = Math.random();
        let y = Math.random();
        this.setPosition(x, y);

        let cur = this.camera.position;
        let signx = (cur.x < this.point.x) ? 1 : -1;
        let signy = (cur.z < this.point.z) ? 1 : -1;
        this.setDirection(
            d * signx * MathUtil.randomRange(speedMin, speedMax),
            d * signy * MathUtil.randomRange(speedMin, speedMax)
        );
    }

    // (x, y) = (0.0 ~ 1.0, 0.0 ~ 1.0)
    setPosition(x, y) {
        let px = (this.right - this.left) * x + this.left;
        let py = (this.top - this.bottom) * y + this.bottom;
        // this.camera.position.set(px, this.distance, py);
        this.point.set(px, this.distance, py);
    }

    moveLeft() {
        if(this.dx > 0) {
            this.dx *= 0;
        }
        this.setDirection(this.dx - 10, this.dy);
    }

    moveUp() {
        if(this.dy > 0) {
            this.dy *= 0;
        }
        this.setDirection(this.dx, this.dy - 10);
    }

    moveRight() {
        if(this.dx < 0) {
            this.dx *= 0;
        }
        this.setDirection(this.dx + 10, this.dy);
    }

    moveDown() {
        if(this.dy < 0) {
            this.dy *= 0;
        }
        this.setDirection(this.dx, this.dy + 10);
    }

    setDirection(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }

    setDistance(distance) {
        this.distance = distance;

        var vfov = this.camera.fov * Math.PI / 180;
        this.height = 2 * Math.tan(vfov / 2) * distance;
        this.width = this.height * this.camera.aspect;

        this.hwidth = this.width * 0.5;
        this.hheight = this.height * 0.5;
        // this.setBoundary(this.left, this.top, this.right, this.bottom);
    }

    setBoundary(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    update(dt) {
        this.point.y = this.distance;

        this.point.x += this.dx * dt;
        this.point.z += this.dy * dt;

        if(this.point.x < this.cornerLeft || this.point.x > this.cornerRight) {
            this.dx *= -1;
        }
        if(this.point.z > this.cornerTop || this.point.z < this.cornerBottom) {
            this.dy *= -1;
        }

        this.point.x = Math.max(this.cornerLeft, this.point.x); this.point.x = Math.min(this.cornerRight, this.point.x);
        this.point.z = Math.min(this.cornerTop, this.point.z); this.point.z = Math.max(this.cornerBottom, this.point.z);

        // this.camera.position.set(p.x, p.y, p.z);
        // this.camera.lookAt(new THREE.Vector3(p.x, 0, p.z));

        this.camera.position.lerp(this.point, dt);
        this.camera.quaternion.slerp(MathUtil.lookAtQuaternion(this.point, new THREE.Vector3(this.point.x, 0, this.point.z), forward), dt);
    }

    get cornerLeft() {
        return this.left + this.hwidth;
    }

    get cornerTop() {
        return this.top - this.hheight;
    }

    get cornerRight() {
        return this.right - this.hwidth;
    }

    get cornerBottom() {
        return this.bottom + this.hheight;
    }

}
