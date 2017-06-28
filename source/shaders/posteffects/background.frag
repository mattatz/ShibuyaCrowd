
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform vec2 resolution;
uniform sampler2D tDiffuse;

uniform float time;
uniform float invert;
uniform sampler2D tGradient;

varying vec2 vUv;

void main() {
    float n = (snoise3(vec3(vUv, time)) + 1.0) * 0.5;
    float v = (snoise2(vec2(time, 0.0)) + 1.0) * 0.5;
    vec4 grad = texture2D(tGradient, vec2(n, v));
    grad.rgb = mix(grad.rgb, vec3(1.0, 1.0, 1.0) - grad.rgb, invert);
    gl_FragColor = grad;
}
