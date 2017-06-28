
const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;
const QUARTER_PI = Math.PI * 0.25;

class MathUtil {

    constructor() {
    }

    get TWO_PI() {
        return TWO_PI;
    }

    get HALF_PI() {
        return HALF_PI;
    }

    get QUARTER_PI() {
        return QUARTER_PI;
    }

    clamp(t) {
        return Math.min(1, Math.max(0, t));
    }

    lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    }

    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomCircle(min, max) {
        let r = Math.random() * MathUtil.TWO_PI;
        let len = MathUtil.randomRange(min, max);
        return {
            x: Math.cos(r) * len,
            y: Math.sin(r) * len
        };
    }

    lookAtQuaternion(eye, center, up = new THREE.Vector3(0, 1, 0)) {
        let mat = new THREE.Matrix4();
        mat.lookAt(eye, center, up);

        let quat = new THREE.Quaternion();
        quat.setFromRotationMatrix(mat);
        return quat;
    }

    lookAt(forward, up) {
        forward = forward.normalize();
        let right = (new THREE.Vector3()).crossVectors(up, forward);
        up = (new THREE.Vector3()).crossVectors(forward, right).normalize();

        let m00 = right.x;
        let m01 = right.y;
        let m02 = right.z;
        let m10 = up.x;
        let m11 = up.y;
        let m12 = up.z;
        let m20 = forward.x;
        let m21 = forward.y;
        let m22 = forward.z;

        let num8 = (m00 + m11) + m22;

        let q = new THREE.Quaternion();
        if (num8 > 0)
        {
            let num = Math.sqrt(num8 + 1);
            q.w = num * 0.5;
            num = 0.5 / num;
            q.x = (m12 - m21) * num;
            q.y = (m20 - m02) * num;
            q.z = (m01 - m10) * num;
            return q;
        }

        if ((m00 >= m11) && (m00 >= m22))
        {
            let num7 = Math.sqrt(((1 + m00) - m11) - m22);
            let num4 = 0.5 / num7;
            q.x = 0.5 * num7;
            q.y = (m01 + m10) * num4;
            q.z = (m02 + m20) * num4;
            q.w = (m12 - m21) * num4;
            return q;
        }

        if (m11 > m22)
        {
            let num6 = Math.sqrt(((1 + m11) - m00) - m22);
            let num3 = 0.5 / num6;
            q.x = (m10 + m01) * num3;
            q.y = 0.5 * num6;
            q.z = (m21 + m12) * num3;
            q.w = (m20 - m02) * num3;
            return q;
        }

        let num5 = Math.sqrt(((1 + m22) - m00) - m11);
        let num2 = 0.5 / num5;
        q.x = (m20 + m02) * num2;
        q.y = (m21 + m12) * num2;
        q.z = 0.5 * num5;
        q.w = (m01 - m10) * num2;
        return q;
    }

    getForwardDirection(target) {
        let v = new THREE.Vector3(0, 0, -1);
        v.applyQuaternion(target.quaternion);
        return v;
    }

};

export default new MathUtil();
