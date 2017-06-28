precision mediump float;
precision mediump int;

#pragma glslify: random = require(glsl-random)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

#ifndef PI
#define PI 3.1415926
#endif

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

// position textures
uniform float animSpeed;

uniform sampler2D textureIdle;
uniform vec2 idleTexelSize;
uniform vec2 idleEnd;
uniform vec3 idleAnimScale;
uniform vec3 idleAnimOffset;

uniform sampler2D textureWalk;
uniform vec2 walkTexelSize;
uniform vec2 walkEnd;
uniform vec3 walkAnimScale;
uniform vec3 walkAnimOffset;

uniform sampler2D textureRun;
uniform vec2 runTexelSize;
uniform vec2 runEnd;
uniform vec3 runAnimScale;
uniform vec3 runAnimOffset;

uniform vec3 center;
uniform vec3 translation;
uniform vec2 threshold;
uniform float fps;
uniform float time;

uniform vec3 streetScale, streetOffset;

uniform sampler2D texturePosition, textureVelocity, textureRotation;

uniform float useSlit;
uniform int useSlitNoise;
uniform vec4 slitScale;
uniform vec4 slitSpeed;
uniform vec3 slitSize;
uniform float slitOffset;
uniform sampler2D textureNoise;

uniform sampler2D textureBoundaryDepth;
uniform float useBoundary;
uniform vec3 boundaryMin, boundaryMax;

uniform float height;

attribute vec3 position;

attribute vec3 normal;
attribute vec2 uv;
attribute vec2 uv2; // uv coordiate for simulation

attribute vec3 scale;
attribute vec4 fluctuation;

varying float vThrottle;
varying vec3 vPosition;

#ifndef DEPTH
varying vec3 vWorld;
varying vec3 vNormal;
varying vec3 vViewPosition;

#include <fog_pars_vertex>

#endif

const float COLOR_DEPTH = 255.0;
const float COLOR_DEPTH_INV = 1.0 / COLOR_DEPTH;

vec4 tex2Dlod(sampler2D tex, vec4 uv) {
    return texture2D(tex, uv.xy);
}

vec3 sample_animation(sampler2D tex, vec2 texelSize, vec2 end, vec3 animScale, vec3 animOffset, vec3 vertex, vec2 texcoord1, float t) {
	float frame = min(t * fps, end.y);

	#ifdef BILINEAR_OFF
	float frame1 = frame;
	#else
	float frame1 = floor(frame);
	float frame2 = min(frame1 + 1.0, end.y);
	float tFilter = frame - frame1;
	#endif

	vec4 uv = vec4(0, 0, 0, 0);
	uv.xy = texcoord1 + vec2(0.0, frame1 * texelSize.y);

	vec3 pos1 = tex2Dlod(tex, uv).rgb;

	uv.y += 0.5;
    vec3 pos2 = tex2Dlod(tex, uv).rgb;

	vec3 pos = (pos1 + pos2 / COLOR_DEPTH) * animScale.xyz + animOffset.xyz;

	#ifdef BILINEAR_OFF
	vertex.xyz = pos;
	#else
	uv.xy = texcoord1 + vec2(0.0, frame2 * texelSize.y);
	pos1 = tex2Dlod(tex, uv).rgb;

	uv.y += 0.5;
	pos2 = tex2Dlod(tex, uv).rgb;

	pos2 = (pos1 + pos2 / COLOR_DEPTH) * animScale.xyz + animOffset.xyz;

	vertex.xyz = mix(pos, pos2, tFilter);
	#endif

    // vec3 norm = normal * fluctuation.x;
    // return vertex + norm;
    return vertex;
}

// Quaternion multiplication
// http://mathworld.wolfram.com/Quaternion.html
vec4 qmul(vec4 q1, vec4 q2) {
	return vec4(
		q2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),
		q1.w * q2.w - dot(q1.xyz, q2.xyz)
	);
}

// Vector rotation with a quaternion
// http://mathworld.wolfram.com/Quaternion.html
vec3 rotate_vector(vec3 v, vec4 r) {
	vec4 r_c = r * vec4(-1, -1, -1, 1);
	return qmul(r, qmul(vec4(v, 0), r_c)).xyz;
}

vec3 rotate_vector_at(vec3 v, vec3 center, vec4 r) {
	vec3 dir = v - center;
	return center + rotate_vector(dir, r);
}

// A given angle of rotation about a given axis
vec4 rotate_angle_axis(float angle, vec3 axis) {
	float sn = sin(angle * 0.5);
	float cs = cos(angle * 0.5);
	return vec4(axis * sn, cs);
}

vec3 sample_idle_from(float start, float speed, vec3 vertex) {
    float t = mod(start + time * speed, idleEnd.x);
    return sample_animation(textureIdle, idleTexelSize, idleEnd, idleAnimScale, idleAnimOffset, vertex, uv, t);
}

vec3 sample_idle(float start, float speed) {
    float t = mod(start + time * speed, idleEnd.x);
    return sample_animation(textureIdle, idleTexelSize, idleEnd, idleAnimScale, idleAnimOffset, position, uv, t);
}

vec3 sample_rest() {
    return sample_animation(textureIdle, idleTexelSize, idleEnd, idleAnimScale, idleAnimOffset, position, uv, 0.0);
}

vec3 sample_walk(float start, float speed) {
    float t = mod(start + time * speed, walkEnd.x);
    return sample_animation(textureWalk, walkTexelSize, walkEnd, walkAnimScale, walkAnimOffset, position, uv, t);
}

vec3 sample_run(float start, float speed) {
    float t = mod(start + time * speed, runEnd.x);
    return sample_animation(textureRun, runTexelSize, runEnd, runAnimScale, runAnimOffset, position, uv, t);
}

vec3 slit_scan_position(vec3 pos, vec2 seed) {
    if(useSlitNoise == 1) {
        // noise
        float t = time * 0.1;
        float tt = t * 0.1;
        float offset = slitOffset * 0.15;
        vec2 uv0 = vec2(t * slitSpeed.x + offset + pos.y * slitScale.z * 0.1, seed.x + tt);
        vec2 uv1 = vec2(seed.y + tt, t * slitSpeed.y + offset + pos.y * slitScale.w * 0.1);
        pos.x += (texture2D(textureNoise, uv0).r - 0.5) * slitScale.x;
        pos.z += (texture2D(textureNoise, uv1).r - 0.5) * slitScale.y;

        // pos.x += snoise2(vec2(time * slitSpeed.x + slitOffset + pos.y * slitScale.z, seed.x) - 0.5) * slitScale.x;
        // pos.z += snoise2(vec2(seed.y, time * slitSpeed.y + slitOffset + pos.y * slitScale.w) - 0.5) * slitScale.y;
    } else {
        // edge
        pos.x += (random(vec2(floor(time * slitSpeed.x + slitOffset + pos.y * slitScale.z), seed.x)) - 0.5) * slitScale.x;
        pos.z += (random(vec2(seed.y, floor(time * slitSpeed.y + slitOffset + pos.y * slitScale.w))) - 0.5) * slitScale.y;
    }
    return pos;
}

vec3 slit_scan(vec3 pos, vec2 seed) {
    vec3 p0 = slit_scan_position(pos, seed);
    vec3 p1 = slit_scan_position(pos + vec3(0.0, 0.25, 0.0), seed);
    return mix(p0, p1, 0.5) * slitSize;
}

/*
void twist(inout vec3 vertex, inout vec3 normal, float intensity, float scale, float speed) {
    float theta = sin(time * speed + vertex.y * scale) * intensity;
    float c = cos(theta);
    float s = sin(theta);
    mat3 m = mat3(c, 0, s, 0, 1, 0, -s, 0, c);
    vertex = vertex * m;
    normal = normal * m;
}
*/

const float edge_min = 0.01;
const float edge_max = 1.0 - edge_min;
vec3 boundary_position(vec3 world, float t) {
    float x = (world.x - boundaryMin.x) / (boundaryMax.x - boundaryMin.x);
    float z = (world.z - boundaryMin.z) / (boundaryMax.z - boundaryMin.z);
    float depth;
    if(x < edge_min || x > edge_max || z < edge_min || z > edge_max) {
        depth = 1.0;
    } else {
        depth = texture2D(textureBoundaryDepth, vec2(x, 1.0 - z)).r;
    }
    world.y += ((1.0 - depth) * (boundaryMax.y - boundaryMin.y) + boundaryMin.y) * t;
    return world;
}

#ifndef DEPTH
void output_varying(vec3 norm, vec3 world) {
    vWorld = world;
    vNormal = normal;
    vViewPosition.xyz = -(viewMatrix * vec4(world, 1.0)).xyz;
}
#endif

void alone() {
    vec3 pos = sample_idle(0.0, 1.0);

    vec4 mPosition = modelMatrix * vec4(pos, 1.0);

    vec4 rot = rotate_angle_axis(-PI * 0.5 * float(MARINE), vec3(0, 1, 0));
    mPosition.xyz = rotate_vector(mPosition.xyz, rot);

    vec3 slitPosition = slit_scan(mPosition.xyz, uv2 * 10.0);
    mPosition.xyz = mix(mPosition.xyz, slitPosition, useSlit);
    mPosition.xyz += center;
    mPosition.xyz += translation;
    mPosition.xyz = boundary_position(mPosition.xyz, 1.0);
    // mPosition.xyz = vortex(mPosition.xyz);

    gl_Position = projectionMatrix * (viewMatrix * mPosition);

    vPosition = position;
    vThrottle = height;

    #ifndef DEPTH
    // vec3 n = normalize((normal + position.xyz) * 0.5);
    output_varying(normal, mPosition.xyz);
    #endif
}

const float walkThres = 0.01;
const float invWalkThres = 1.0 / walkThres;
const float runThres = 0.03;
const float invRunThres = 1.0 / (runThres - walkThres);

void crowd() {
    vec4 velocity = texture2D(textureVelocity, uv2);

    vec3 pos;
    float speed = length(velocity.xyz);
    if(speed > runThres) {
        pos = sample_run(fluctuation.z, fluctuation.w * animSpeed);
    } else if(speed > walkThres) {
        pos = sample_walk(fluctuation.z, fluctuation.w * animSpeed);
    } else {
        vec3 idle = sample_idle(fluctuation.z, fluctuation.w * animSpeed);
        vec3 walk = sample_walk(fluctuation.z, fluctuation.w * animSpeed);
        pos = mix(idle, walk, clamp(speed * invWalkThres, 0.0, 1.0));
    }
    pos.xyz *= scale;

    vec4 mPosition = modelMatrix * vec4(pos, 1.0);

    vec4 rot = texture2D(textureRotation, uv2);

    vec4 rotation = rotate_angle_axis(-PI * 0.5 * float(MARINE), vec3(0, 1, 0));
    rot = qmul(rot, rotation);

    mPosition.xyz = rotate_vector(mPosition.xyz, rot);

    vec3 slitPosition = slit_scan(mPosition.xyz, uv2 * 10.0);
    mPosition.xyz = mix(mPosition.xyz, slitPosition, useSlit);
    mPosition.xyz += translation;

    vec4 tr = texture2D(texturePosition, uv2);
    vec3 streetTr = tr.xyz * streetScale + streetOffset;
    mPosition.xyz += vec3(streetTr.x, tr.z, -streetTr.y);
    mPosition.xyz = boundary_position(mPosition.xyz, useBoundary);

    vec4 mvPosition = viewMatrix * mPosition;
    gl_Position = projectionMatrix * mvPosition;

    vPosition = position;
    vThrottle = velocity.w * height;

    #ifndef DEPTH
    vec3 norm = rotate_vector(normal, rot);
    output_varying(norm, mPosition.xyz);

	#include <fog_vertex>
    #endif
}

void main() {
    #ifdef ALONE
        alone();
    #else
        crowd();
    #endif
}
