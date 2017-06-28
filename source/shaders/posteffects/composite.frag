
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

    float bnTime = floor(t * 2.0);
    float noiseX = step((snoise3(vec3(0.0, uv.x * scale.x, bnTime)) + 1.0) * 0.5, strength * 0.3);
    float noiseY = step((snoise3(vec3(0.0, uv.y * scale.y, bnTime)) + 1.0) * 0.5, strength * 0.3);
    float bnMask = noiseX * noiseY;
    float bnUvX = uv.x + sin(bnTime) * 0.2 + rgbWave;
    float bnR = texture2D(texture, vec2(bnUvX + rgbDiff, uv.y)).r * bnMask;
    float bnG = texture2D(texture, vec2(bnUvX, uv.y)).g * bnMask;
    float bnB = texture2D(texture, vec2(bnUvX - rgbDiff, uv.y)).b * bnMask;
    vec4 blockNoise = vec4(bnR, bnG, bnB, 1.0);

    float bnTime2 = floor(t * 2.5);
    float noiseX2 = step((snoise3(vec3(0.0, uv.x * 2.0 * scale.x, bnTime2)) + 1.0) * 0.5, strength * 0.5);
    float noiseY2 = step((snoise3(vec3(0.0, uv.y * 8.0 * scale.y, bnTime2)) + 1.0) * 0.5, strength * 0.3);
    float bnMask2 = noiseX2 * noiseY2;
    float bnR2 = texture2D(texture, vec2(bnUvX + rgbDiff, uv.y)).r * bnMask2;
    float bnG2 = texture2D(texture, vec2(bnUvX, uv.y)).g * bnMask2;
    float bnB2 = texture2D(texture, vec2(bnUvX - rgbDiff, uv.y)).b * bnMask2;
    vec4 blockNoise2 = vec4(bnR2, bnG2, bnB2, 1.0);

    return vec4(rgb, 1.0) * (1.0 - bnMask - bnMask2) + (blockNoise + blockNoise2);
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

    color.rgb *= fade;

    gl_FragColor = color;
}
