// #extension GL_OES_standard_derivatives : enable

precision mediump float;
precision mediump int;

#pragma glslify: random = require(glsl-random)

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;

uniform float useEnv;
uniform samplerCube textureEnv;

varying vec3 vPosition;
varying vec3 vWorld;
varying vec3 vNormal;
varying float vThrottle;
varying vec3 vViewPosition;

// standard material
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

// envmap_pars_fragment
uniform float reflectivity;
uniform float envMapIntensity;

// meshphysical_frag
uniform float clearCoat;
uniform float clearCoatRoughness;

#include <common>
#include <bsdfs>
#include <lights_pars>
#include <lights_physical_pars_fragment>
#include <fog_pars_fragment>

void main() {
    if(vPosition.y > vThrottle) {
        discard;
    }

	vec4 diffuseColor = vec4(diffuse, opacity);
	ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
	vec3 totalEmissiveRadiance = emissive;

    float specularStrength = 1.0;
    float roughnessFactor = roughness;
    float metalnessFactor = metalness;

	#include <normal_flip>
    vec3 normal = vNormal * flipNormal;

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_template>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	vec4 color = vec4(outgoingLight, diffuseColor.a);

    vec3 eyeDir = normalize(vWorld.xyz - cameraPosition);
    vec4 envColor = color * textureCube(textureEnv, reflect(normalize(eyeDir), normalize(normal)));
    color = mix(color, envColor, useEnv);

    gl_FragColor = color;
    #include <fog_fragment>
}
