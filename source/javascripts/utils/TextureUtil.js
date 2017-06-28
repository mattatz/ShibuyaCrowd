
class TextureUtil {

    constructor() {
    }

    // https://github.com/mrdoob/three.js/issues/386
    // http://miffysora.wikidot.com/threejs-data-texture
    create(width, height, data, options) {
        options = options || {};

        // https://threejs.org/docs/#api/textures/DataTexture
        // DataTexture( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy )
        let texture = new THREE.DataTexture(
            data, 
            width, 
            height, 
            options.format || THREE.RGBAFormat, 
            options.type || THREE.FloatType,
            options.mapping || THREE.UVMapping,
            options.wrapS || THREE.ClampToEdgeWrapping,
            options.wrapT || THREE.ClampToEdgeWrapping,
            options.magFilter || THREE.NearestFilter,
            options.minFilter || THREE.NearestFilter
        );
        texture.needsUpdate = true;
        return texture;
    }

    save(renderer, texture, options) {
        let scene = new THREE.Scene();
        let mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2, 1, 1),
            new THREE.ShaderMaterial({
                vertexShader: options.vertexShader,
                fragmentShader: options.fragmentShader,
                uniforms: {
                    texture: { type: 't', value: texture } 
                }
            })
        );
        scene.add(mesh);

        // render
        let camera = new THREE.OrthographicCamera();
        renderer.render(scene, camera);

        let canvas = renderer.domElement;

        let width = texture.image.width, height = texture.image.height;

        let resized = document.createElement("canvas");
        resized.width = width; 
        resized.height = height;
        resized.getContext("2d").drawImage(canvas, 0, 0, width, height);

        let type = "image/png";
        let base64 = resized.toDataURL(type);

        /*
        const decoded = dataUriToBuffer(base64)
        fs.writeFile(options.path, decoded, (err) => {
            console.log(err);
        });
        */

        let bin = atob(base64.replace(/^.*,/, ""));
        let len = bin.length;
        let buffer = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            buffer[i] = bin.charCodeAt(i);
        }

        let blob = new Blob([buffer.buffer], {
            type: type
        });

        let url = (window.URL || window.webkitURL).createObjectURL(blob);
        this.download(url, options.path || "texture.png");
    }

    download(url, name) {
        let a = document.createElement("a");
        let e = document.createEvent("MouseEvent");

        a.download = name;
        a.href = url;

        e.initEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }

    getImageData(texture) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let img = texture.image;
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        return context.getImageData(0, 0, img.width, img.height);
    }

}

export default new TextureUtil();

