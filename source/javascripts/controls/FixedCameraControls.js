
import MathUtil from "../utils/MathUtil";
import HandyCameraControls from "./HandyCameraControls";

class FixedCameraPoint {

    constructor(position, quat) {
        if(!(position instanceof THREE.Vector3)) {
            position = new THREE.Vector3(position.x, position.y, position.z);
        }
        this.position = position;

        /*
        if(!(forward instanceof THREE.Vector3)) {
            forward = new THREE.Vector3(forward.x, forward.y, forward.z);
            forward.normalize();
        }

        if(!(up instanceof THREE.Vector3)) {
            up = new THREE.Vector3(up.x, up.y, up.z);
            up.normalize();
        }

        var mat = new THREE.Matrix4();
        mat.lookAt(this.position, this.position.clone().add(forward), up);
        var quat = new THREE.Quaternion();
        quat.setFromRotationMatrix(mat);
        this.quat = quat;
        */

        this.quat = new THREE.Quaternion(quat._x, quat._y, quat._z, quat._w);
    }

    lerp(camera, dt) {
        camera.position.lerp(this.position, dt);
        camera.quaternion.slerp(this.quat, dt);
    }

    apply(camera) {
        camera.position.set(this.position.x, this.position.y, this.position.z);
        camera.setRotationFromQuaternion(this.quat);
    }

}

export default class FixedCameraControls extends HandyCameraControls {

    constructor(camera, options) {
        super(camera, options);

        options = options || [];

        this.points = options.points || [];

        this.current = 0;
        this.t = 0;
    }

    setup() {
        super.setup();
    }

    init() {
        this.t = 0;
        this.initialPosition = this.camera.position;
        this.initialRotation = this.camera.quaternion;
    }

    next() {
        let next = (this.current + 1) % this.points.length;
        this.current = next;
        this.init();
    }

    prev() {
        let prev = (this.current - 1);
        if(prev < 0) {
            prev = this.points.length - 1;
        }
        this.current = prev;
        this.init();
    }

    randomize() {
        let indices = this.points.map((p, i) => { return i; }).filter((p, i) => {
            return i != this.current;
        });
        if(indices.length > 0) {
            let index = indices[parseInt(MathUtil.randomRange(0, indices.length))];
            this.current = index;
            this.init();
        }
    }

    update(dt) {
        if(this.current < 0 || this.current >= this.points.length) return;

        let point = this.points[this.current];
        // point.apply(this.camera);
        // point.lerp(this.camera, dt);
        this.lerp(this.camera, point, dt);
    }

    lerp(camera, point, dt) {
        let p = this.wobblePosition(dt);
        let q = this.wobbleRotation(dt);

        p.add(point.position);
        q.multiply(point.quat);

        camera.position.lerp(p, dt);
        camera.quaternion.slerp(q, dt);
    }

}

export {
    FixedCameraPoint
};
