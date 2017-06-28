
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: random = require(glsl-random)

uniform int mode;
uniform float time, speed;
uniform vec3 force;
uniform vec3 vortexCenter;
uniform float vortexIntensity;

const float seedScale = 100.0;

void init() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float r = random(uv * seedScale) * 0.02 + 0.92;
    gl_FragColor = vec4(0.0, 0.0, 0.0, r);
}

void update() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec4 pos = texture2D(texturePosition, uv);
    if(pos.a < 0.0) {
        init();
    } else {
        vec4 vel = texture2D(textureVelocity, uv);
        vel.xyz *= vel.w;

        float t = time * 0.5;
        vec2 seed = uv * seedScale;

        vec3 v = vec3(
            (snoise3(vec3(seed.x, seed.y, t) - 0.5)),
            (snoise3(vec3(seed.x, t, seed.y) - 0.5)),
            (snoise3(vec3(t, seed.y, seed.x) - 0.5))
        ) * speed + force;

        vec3 dir = vortexCenter - pos.xyz;
        vec3 right = cross(normalize(dir), vec3(0, 1, 0));
        v += right * vortexIntensity;

        vel.xyz += v;

        gl_FragColor = vel;
    }
}

void main() {
    if(mode == 0) {
        init();
    } else {
        update();
    }
}
