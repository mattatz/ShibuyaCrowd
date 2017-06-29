
#pragma glslify: random = require(glsl-random)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float time;
uniform vec2 resolution;
uniform sampler2D tDiffuse;

uniform vec2 noiseOffset;

uniform float glitchIntensity;
uniform float glitchSpeed;
uniform vec2 glitchWave;
uniform vec2 glitchScale;
uniform float glitchShift;

uniform int mirror;
uniform float invert;
uniform float fade;

varying vec2 vUv;

void blockNoise(sampler2D texture, vec2 uv, float t, float rgbWave, float rgbDiff, vec2 scale, vec2 strength, inout float mask, inout vec3 color) {
    float m = step((snoise3(vec3(0.0, uv.x * scale.x, t)) + 1.0) * 0.5, strength.x) * step((snoise3(vec3(0.0, uv.y * scale.y, t)) + 1.0) * 0.5, strength.y);
    float x = uv.x + sin(t) * 0.2 + rgbWave;
    mask += m;
    color += vec3(
        texture2D(texture, vec2(x + rgbDiff, uv.y)).r * m,
        texture2D(texture, vec2(x, uv.y)).g * m,
        texture2D(texture, vec2(x - rgbDiff, uv.y)).b * m
    );
} 

vec4 glitch(sampler2D texture, vec2 uv, float strength, float speed, vec2 wave, float shift, vec2 scale) {
    float t = time * speed;

    float y = uv.y * resolution.y;
    float rgbWave = (
        snoise3(vec3(0.0, y * 0.01, t * 4.0)) * (2.0 + strength * 3.2 * wave.x)
        * snoise3(vec3(0.0, y * 0.02, t * 2.0)) * (1.0 + strength * 0.4 * wave.y)
        + step(0.9995, sin(y * 0.005 + t * 1.6)) * 1.2
        + step(0.9999, sin(y * 0.005 + t * 2.0)) * -1.8
        ) / resolution.x;
    float rgbDiff = ((shift + 1.0) + sin(t * 5.0 + uv.y * 4.0) * (2.0 * strength + 1.0)) / resolution.x;

    vec3 rgb = texture2D(texture, uv).rgb;

    float mask = 0.0;
    vec3 block = vec3(0.0);
    blockNoise(texture, uv, floor(t * 1.0), rgbWave, rgbDiff, scale, vec2(strength * 0.3), mask, block);
    blockNoise(texture, uv, floor(t * 2.5), rgbWave, rgbDiff, vec2(scale.x * 2.0, scale.y * 8.0), vec2(strength * 0.5, strength * 0.3), mask, block);
    return vec4(rgb, 1.0) * (1.0 - mask) + vec4(block, 1.0);
}

vec2 mirror_uv(vec2 uv) {
    if(mirror == 1) {
        uv.x = 0.5 - abs(0.5 - uv.x);
    } else if(mirror == 2) {
        uv.x = 1.0 - abs(0.5 - uv.x);
    } else if(mirror == 3) {
        uv.y = 0.5 - abs(0.5 - uv.y);
    } else if(mirror == 4) {
        uv.y = 1.0 - abs(0.5 - uv.y);
    }
    return uv;
}

void main() {
    vec2 uv = mirror_uv(vUv);
    vec4 color = glitch(tDiffuse, uv, glitchIntensity, glitchSpeed, glitchWave, glitchShift, glitchScale);

    float whiteNoise = random(vUv + noiseOffset);
    color.rgb *= vec3(1. - whiteNoise * 0.15);
    color.rgb = mix(color.rgb, vec3(1.0, 1.0, 1.0) - color.rgb, invert);
    color.rgb = mix(color.rgb, vec3(1.0, 1.0, 1.0), 1.0 - fade);

    gl_FragColor = color;
}
