
class ObjectUtil {

    constructor() {}

    defineUniformAccessor(object, uniforms, name) {
        Object.defineProperty(object, name, {
            configurable: false,
            get: () => {
                return uniforms[name].value;
            },
            set: (v) => {
                uniforms[name].value = v;
            }
        });
    }

    defineArrayAccessor(object, array, name) {
        Object.defineProperty(object, name, {
            configurable: false,
            get: () => {
                return array[0][name];
            },
            set: (v) => {
                array.forEach((object) => {
                    object[name] = v;
                });
            }
        });
    }

}

export default new ObjectUtil();
