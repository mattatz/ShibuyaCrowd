
import MathUtil from "../utils/MathUtil";

export default class LightControls {

    constructor(camera, light, height) {
        this.camera = camera;
        this.light = light;
        this.height = height;
        this.ray = new THREE.Ray();
        this.ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

        this.isActive = true;
    }

    update(dt) {
        if(!this.isActive) return;

        let cam = this.camera.position;
        let dir = MathUtil.getForwardDirection(this.camera);
        dir.setLength(10);
        let point = new THREE.Vector3(cam.x + dir.x, this.height, cam.z + dir.z);
        this.fix(point);
    }

    fix(point) {
        this.light.position.set(point.x, point.y, point.z);
        this.light.target.position.set(point.x, 0, point.z);
    }

    activate(flag) {
        this.isActive = flag;
    }

}
