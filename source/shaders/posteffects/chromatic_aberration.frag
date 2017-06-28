
#pragma glslify: chromatic_aberration = require(./chromatic-aberration)

uniform sampler2D tDiffuse;
uniform float distortion;

varying vec2 vUv;

void main() {
    gl_FragColor = chromatic_aberration(tDiffuse, vUv, distortion);
}
