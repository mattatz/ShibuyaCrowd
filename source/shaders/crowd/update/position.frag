
#pragma glslify: random = require(glsl-random)

uniform int mode, movement;
uniform float throttle;
uniform float speed, time, dt;

uniform float limit;

uniform highp sampler2D textureStreet;
uniform vec4 streetTexelSize;

uniform vec2 gatherPosition;

vec3 sample_street(float t, float p) {
    float y = (mod(floor(p * streetTexelSize.w), streetTexelSize.w) + 0.5) * streetTexelSize.z;
    return texture2D(textureStreet, vec2(t, y)).xyz;
}

void init() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float seed = (random(uv.xy) - 0.5) * 0.1;
    float seed2 = (random(uv.yx) - 0.5) * 0.1;
    float seed3 = random(uv.yx + vec2(3.17, 17.3));
    vec3 to = vec3(gatherPosition.x + seed, gatherPosition.y + seed2, 0.0);
    gl_FragColor = vec4(to, seed3);
}

void update() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    vec3 v = vel.xyz * dt;

    if(movement == 6) {
        pos.xyz += v;
        gl_FragColor = pos;
        return;
    }

    float m = length(v);
    const float threshold = 0.000001;
    if(m > threshold) {
        v.xy = normalize(v.xy) * clamp(m, 0.0, limit);
        pos.xy += v.xy;
        pos.z += v.z;
    }
    gl_FragColor = pos;
}

void main() {
    if(mode == 0) {
        init();
    } else {
        update();
    }
}
