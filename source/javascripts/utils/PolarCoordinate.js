
import TWEEN from "../lib/Tween";

export default class PolarCoordinate {

    constructor(theta0, theta1, radius, speed = 0.1) {
        this.theta0 = theta0;
        this.theta1 = theta1;
        this.radius = radius;
        this.speed = speed;

        this.offset = 0;
    }

    tween(theta0, theta1, radius, duration, easing = TWEEN.Easing.Quadratic.Out) {
        let polar = this;
        this.offset = 0;

        return new Promise((resolve, reject) => {
            TWEEN.remove(polar.tweener);
            polar.tweener = new TWEEN.Tween({
                theta0: polar.theta0,
                theta1: polar.theta1,
                radius: polar.radius
            })
            .to({
                theta0: theta0,
                theta1: theta1,
                radius: radius
            }, duration)
            .easing(easing)
            .onUpdate(function() {
                polar.theta0 = this.theta0;
                polar.theta1 = this.theta1 + polar.offset;
                polar.radius = this.radius;
            })
            .onComplete(function() {
                polar.theta0 = theta0;
                polar.theta1 = theta1 + polar.offset;
                polar.radius = radius;

                resolve();
            })
            .start();
        });
    }

    get cartesian() {
        return new THREE.Vector3(
            - this.radius * Math.cos(this.theta0) * Math.cos(this.theta1),
            this.radius * Math.sin(this.theta0),
            this.radius * Math.cos(this.theta0) * Math.sin(this.theta1),
        );
    }

    forward(dt) {
        // this.theta0 += dt * this.speed;
        this.theta1 += dt * this.speed;
        this.offset += dt * this.speed;
    }

}
