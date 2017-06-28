precision mediump float;
precision mediump int;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vNormal = normal;
    vUv = uv;
    vUv.x *= 10.0;
    gl_Position = projectionMatrix * (modelViewMatrix * vec4(position, 1));
}

