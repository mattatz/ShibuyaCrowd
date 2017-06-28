precision mediump float;
precision mediump int;

#include <packing>

varying vec3 vPosition;
varying float vThrottle;

void main() {
    if(vPosition.y > vThrottle) {
        discard;
    }

    gl_FragColor = packDepthToRGBA(gl_FragCoord.z);
}
