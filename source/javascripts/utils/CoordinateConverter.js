
export default class CoordinateConverter {

    constructor(scale, offsetX, offsetY) {
        this.scale = scale;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    convert(lon, lat) {
        return {
            x: lon * this.scale + this.offsetX,
            y: lat * this.scale + this.offsetY
        };
    }

}
