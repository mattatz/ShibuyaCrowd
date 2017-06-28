
import TextureUtil from "../utils/TextureUtil";

import Highway from "../objects/Highway";

const kCoordinateThreshold = 8;

export default class HighwayGroup extends THREE.Object3D {

    constructor(osm, boundary, converter) {
        super();

        let min = {
            x: Number.MAX_VALUE,
            y: Number.MAX_VALUE
        };

        let max = {
            x: Number.MIN_VALUE,
            y: Number.MIN_VALUE
        };

        /*
            if(coordinates.length < kCoordinateThreshold) {
                return;
            }
        */

        let group = osm.highways.map((elem) => {
            let coordinates = elem.nodes.map((idx) => {
                return osm.nodes[idx];
            });
            return coordinates.filter((coord) => {
                return (boundary.n >= coord.lat && boundary.w <= coord.lon && coord.lat >= boundary.s && coord.lon <= boundary.e);
            });
        });

        this.highways = [];

        group.forEach((coordinates) => {

            if(coordinates.length <= 2) return;

            let distance = 0;
            for(let i = 0, n = coordinates.length - 1; i < n; i++) {
                let p = coordinates[i];
                let n = coordinates[i + 1];
                let dx = (p.lon - n.lon);
                let dy = (p.lat - n.lat);
                distance += dx * dx + dy * dy;
            }
            if(distance * 10000000 < 0.05) return;

            let h = new Highway(coordinates);

            let points = coordinates.map((coord) => {
                min.x = Math.min(coord.lon, min.x);
                min.y = Math.min(coord.lat, min.y);
                max.x = Math.max(coord.lon, max.x);
                max.y = Math.max(coord.lat, max.y);

                return new THREE.Vector2(coord.lon, coord.lat);
            });
            h.split(points, 32);

            this.highways.push(h);
        });

        this.min = min;
        this.max = max;
    }

    get range() {
        return {
            x: (this.max.x - this.min.x),
            y: (this.max.y - this.min.y)
        };
    }

    getStreamPosition(lon, lat) {
        let range = this.range;
        return {
            x: (lon - this.min.x) / range.x,
            y: (lat - this.min.y) / range.y
        };
    }

    texture(gsi) {
        let range = this.range;
        let w = 1 / range.x;
        let h = 1 / range.y;

        let column = 0;
        let maxLength = 0;
        this.highways.forEach((highway, i) => {
            maxLength = Math.max(maxLength, highway.distance);
        });

        let colors = [
            [1, 0, 0, 1],
            [0, 1, 0, 1],
            [0, 0, 1, 1],
            [1, 0, 1, 1]
        ];
        
        let rows = this.highways.map((highway, i) => {
            let ratio = highway.distance / maxLength;
            let row = highway.samples.map((coord, i) => {
                let x = (coord.x - this.min.x) * w;
                let y = (coord.y - this.min.y) * h;
                return [x, y, 0, ratio];
                // return colors[i % colors.length];
            });
            column = Math.max(row.length, column);
            return row;
        });

        let data = rows.map((row) => {
            let pixels = [];

            const n = row.length;
            const length = n - 1;

            let k = 0;
            let next = 1;
            let indices = [];
            // let ratio = length / column;

            // columnは最大長さ
            for(let i = 0; i < column; i++) {
                indices.push(k);
                let pixel = row[k];
                k += next;
                if(k > length) {
                    k = length - 1;
                    next = - next;
                } else if(k < 0) {
                    k = 1;
                    next = - next;
                }

                // pixels = pixels.concat([ pixel[0], pixel[1], pixel[2], (last ? 1 : 0) ]);

                /*
                let j = i % n;
                let pixel;
                let idx = parseInt(Math.floor(i / n));
                if(idx % 2 == 0) {
                    pixel = row[j];
                } else {
                    let k = length - j;
                    pixel = row[k];
                }
                */

                pixels = pixels.concat(pixel);
            }

            return pixels;
        });

        let array = new Float32Array(Array.prototype.concat.apply([], data));
        return TextureUtil.create(column, rows.length, array, {
        });
    }

    connect() {
        for(let i = 0, n = this.highways.length; i < n; i++) {
            let h0 = this.highways[i];
            for(let j = 0; j < n; j++) {
                if(i == j) {
                    continue;
                }
                let h1 = this.highways[j];
                let con = h0.intersects(h1);
                if(con) {
                    let j0 = h0.connect(con);
                    let j1 = h1.connect(con);
                }
            }
        }
    }

}
