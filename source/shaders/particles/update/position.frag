
#pragma glslify: random = require(glsl-random)

uniform int mode;
uniform float time;
uniform float dt;

uniform vec3 emitterMin;
uniform vec3 emitterMax;

void init() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    const float seedScale = 100.0;
    vec3 seed = vec3(random(uv.xy * seedScale), random(uv.yx * seedScale), random(vec2(time, uv.x) * seedScale));
    gl_FragColor = vec4(
        mix(emitterMin.x, emitterMax.x, seed.x),
        mix(emitterMin.y, emitterMax.y, seed.y),
        mix(emitterMin.z, emitterMax.z, seed.z),
        1.0
    );
}

void update() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    float decay = random(vec2(uv.yx) * 100.0);
    pos.w -= dt * (0.1 + 0.1 * decay);

    if(pos.w < 0.0)  {
        init();
    } else {
        pos.xyz += vel.xyz * dt;
        gl_FragColor = pos;
    }
}

void main() {
    if(mode == 0) {
        init();
    } else {
        update();
    }
}
