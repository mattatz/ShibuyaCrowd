
uniform sampler2D textureCEL;

uniform float wireframe;

varying vec2 vUv;
varying vec3 vBarycentric;

#include <common>
#include <packing>
#include <lights_pars>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <fog_pars_fragment>

const float gain = 0.9;

void main() {
    vec3 d = fwidth(vBarycentric);
    vec3 a3 = smoothstep(vec3(0.0), gain * d, vBarycentric);
    float t = (1.0 - min(min(a3.x, a3.y), a3.z));

    // far shadow be lighter
    float shadow = getShadowMask();
    float depth = gl_FragCoord.z;
    shadow *= depth;

    vec4 color = texture2D(textureCEL, vUv);
    color.rgb *= mix(0.5, 1.0, shadow);

    gl_FragColor = mix(color, color * t, wireframe);

    #include <fog_fragment>
}
