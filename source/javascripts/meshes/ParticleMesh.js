
const build = (sideCount = 16, size = 1) => {
    let geometry = new THREE.BufferGeometry();

    let indices = [];
    let vertices = [];
    let centers = [];
    let uv = [];
    let uv2 = [];

    let inv = 1 / sideCount;
    let hsize = size * 0.5;
    for(let y = 0; y < sideCount; y++) {
        for(let x = 0; x < sideCount; x++) {
            let px = x;
            let py = y;

            let u = x * inv;
            let v = y * inv;

            vertices.push(x, y, 0); // lt
            uv2.push(0, 0);

            vertices.push(x + size, y, 0); // rt
            uv2.push(1, 0);

            vertices.push(x + size, y + size, 0); // rb
            uv2.push(1, 1);

            vertices.push(x, y + size, 0); // lb
            uv2.push(0, 1);

            let centerX = x + hsize;
            let centerY = y + hsize;
            for(let i = 0; i < 4; i++) {
                centers.push(centerX, centerY, 0);
                uv.push(u, v);
            }
        }
    }

    let len = vertices.length / 3;
    for(let i = 0; i < len; i += 4) {
        let a = i, b = i + 1, c = i + 2, d = i + 3;
        indices.push(a, c, b);
        indices.push(d, c, a);
    }

	// build geometry
	geometry.setIndex(indices);
	geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.addAttribute('center', new THREE.Float32BufferAttribute(centers, 3));
	geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
	geometry.addAttribute('uv2', new THREE.Float32BufferAttribute(uv2, 2));

    return geometry;

};

export default class ParticleMesh extends THREE.Mesh {

    constructor(sideCount, size, options) {
        let geometry = build(sideCount, size);

        options = options || {};

        super(
            geometry,
            new THREE.RawShaderMaterial({
                vertexShader : options.vertexShader,
                fragmentShader : options.fragmentShader,
                uniforms : THREE.UniformsUtils.merge([
                    {
                        time: { type : "f", value : 0.0 },
                        size: { type: "f", value: 1.0 },
                        texturePosition: { type : "t", value : null },
                        textureRotation: { type : "t", value : null },
                        textureVelocity: { type : "t", value : null }
                    },
                    options.uniforms
                ]),
                transparent: true,
                side: THREE.DoubleSide
            })
        );

        this.frustumCulled = false;
    }

    get size() {
        return this.material.uniforms.size.value;
    }

    set size(v) {
        return this.material.uniforms.size.value = v;
    }

}
