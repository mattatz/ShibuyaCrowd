precision mediump float;
precision mediump int;

#pragma glslify: random = require(glsl-random)

#define PI 3.1415926
#define QUATERNION_IDENTITY vec4(0, 0, 0, 1)

vec3 random_point_on_sphere(vec2 uv) {
    float u = random(uv) * 2.0 - 1.0;
    float theta = random(uv + 0.333) * PI * 2.0;
    float u2 = sqrt(1.0 - u * u);
    return vec3(u2 * cos(theta), u2 * sin(theta), u);
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

vec4 q_conj(vec4 q) {
	return vec4(-q.x, -q.y, -q.z, q.w);
}

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

uniform sampler2D textureVelocity;
uniform sampler2D textureRotation;
uniform sampler2D texturePosition;

uniform float threshold;
uniform float size;

attribute vec3 position;
attribute vec3 center;
attribute vec2 uv;
attribute vec2 uv2;

varying vec2 vUv;
varying vec2 vUv2;

vec4 billboard(vec3 pos, vec2 uv, float scale) {
    mat4 billboardMatrix = viewMatrix;
    // billboardMatrix[0][3] = billboardMatrix[1][3] = billboardMatrix[2][3] = billboardMatrix[3][3] = 0.0;
    billboardMatrix[3][0] = billboardMatrix[3][1] = billboardMatrix[3][2] = billboardMatrix[3][3] = 0.0;

    vec4 p = vec4(vec4(pos, 1.0) + vec4((uv * 2.0 - vec2(1.0, 1.0)) * scale, 0, 1) * billboardMatrix);
    return projectionMatrix * (viewMatrix * p);
}

void main() {
    vec4 pos = texture2D(texturePosition, uv);
    float s = size * smoothstep(0.0, 0.25, pos.w) * smoothstep(1.0, 0.7, pos.w);
    s *= smoothstep(threshold, threshold + 3.5, pos.y);
    gl_Position = billboard(pos.xyz, uv2, s);
    vUv = uv;
    vUv2 = uv2;
}
