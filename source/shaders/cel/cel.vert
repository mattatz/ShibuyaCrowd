
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

attribute vec3 barycentric;

uniform vec3 noise;

#include <shadowmap_pars_vertex>
#include <fog_pars_vertex>

varying vec3 vBarycentric;
varying vec2 vUv;

void main() {
    vUv = uv;
    vBarycentric = barycentric;

	#include <begin_vertex>

    vec3 seed = position * noise.z + vec3(0, noise.y, 0);
    vec3 displacement = (vec3(
        snoise3(seed.xyz),
        snoise3(seed.yzx),
        snoise3(seed.zxy)
    ) - 0.5) * noise.x;
    transformed.xyz = transformed.xyz + displacement;

    vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
    vec4 mvPosition = viewMatrix * vec4(worldPosition.xyz, 1.0);

	#include <shadowmap_vertex>
	#include <fog_vertex>

    gl_Position = projectionMatrix * mvPosition;
}
