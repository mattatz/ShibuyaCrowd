
#pragma glslify: random = require(glsl-random)

uniform int mode;
uniform float time, dt;
uniform float death;
uniform int recovery;

uniform sampler2D textureBoundaryDepth;
uniform vec3 boundaryMin, boundaryMax;
uniform float emitterHeight;

void init() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    const float seedScale = 100.0;
    vec3 seed = vec3(random(uv.xy * seedScale), random(uv.yx * seedScale), random(vec2(time, uv.x) * seedScale));

    vec3 interval = boundaryMax - boundaryMin;
    float depth = texture2D(textureBoundaryDepth, vec2(seed.x, 1.0 - seed.z)).r;
    float x = seed.x * interval.x + boundaryMin.x;
    float y = (1.0 - depth) * interval.y + boundaryMin.y;
    float z = seed.z * interval.z + boundaryMin.z;
    gl_FragColor = vec4(x, y + emitterHeight * seed.y, z, 1.0);
}

void update() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    float decay = random(vec2(uv.yx) * 100.0);
    pos.w -= dt * (0.1 + 0.1 * decay) * death;

    if(recovery == 1 && pos.w < 0.0)  {
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
