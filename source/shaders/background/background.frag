precision mediump float;
precision mediump int;

#define PI 3.14159265359

const float INV_PI = 1.0 / PI;

uniform sampler2D textureGradient;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    // float u = (atan(vNormal.x, vNormal.z) + PI) * INV_PI * 2.0;
    // float v = (vNormal.y + 1.0) * 0.5;
    // vec4 color = texture2D(textureGradient, vec2(u, v));
    vec4 color = texture2D(textureGradient, vUv);
    gl_FragColor = color;
}

