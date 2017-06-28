precision mediump float;
precision mediump int;

uniform sampler2D textureParticle;
uniform float alpha;

varying vec2 vUv2;

void main() {
    vec4 color = texture2D(textureParticle, vUv2);
    color.a *= alpha;
    gl_FragColor = color;
}
