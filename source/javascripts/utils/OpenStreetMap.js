
class LonLat {
    constructor(lon, lat) {
        this.lon = lon;
        this.lat = lat;
    }
}

class Tile {
    constructor(x, y, zoom) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;
    }
}

class Boundary {
    constructor(n, w, s, e) {
        this._n = n;
        this._w = w;
        this._s = s;
        this._e = e;
    }

    get n() {
        return this._n;
    }

    get north() {
        return this.n;
    }

    get w() {
        return this._w;
    }

    get west() {
        return this.w;
    }

    get s() {
        return this._s;
    }

    get south() {
        return this.s;
    }

    get e() {
        return this._e;
    }

    get east() {
        return this.e;
    }

}

class GSI {

    constructor(data, boundary) {
        this.data = data;
        this.boundary = boundary;

        this.lonDegreesPerSegment = (boundary.e - boundary.w) / this.xLength;
        this.latDegreesPerSegment = (boundary.n - boundary.s) / this.yLength;

        this.invertLonDegreesPerSegment = 1 / this.lonDegreesPerSegment;
        this.invertLatDegreesPerSegment = 1 / this.latDegreesPerSegment;

        let min = Number.MAX_VALUE, max = 0;
        data.forEach(function(row, yindex) {
            return row.forEach(function(height, xindex) {
                min = Math.min(min, height);
                max = Math.max(max, height);
            });
        });

        this.min = min;
        this.max = max;
        this.interval = 1 / (max - min);
    }

    get xLength() {
        return this.data[0].length;
    }

    get yLength() {
        return this.data.length;
    }

    getLonLat(x, y) {
        return new LonLat(
            this.boundary.w + this.lonDegreesPerSegment * x,
            this.boundary.n - this.latDegreesPerSegment * y
        );
    }

    normalize(height) {
        return (height - this.min) * this.interval;
    }

    getHeight(lon, lat) {
        let x = parseInt((lon - this.boundary.w) * this.invertLonDegreesPerSegment);
        let y = parseInt((lat - this.boundary.n) * -this.invertLatDegreesPerSegment);
        x = Math.max(0, Math.min(x, this.xLength - 1));
        y = Math.max(0, Math.min(y, this.yLength - 1));

        return this.data[y][x];
    }

    getNormalizedHeight(lon, lat) {
        return this.normalize(this.getHeight(lon, lat));
    }

}

export default class OpenStreetMap {

    constructor() {
    }

    lonlatToTile(lon, lat, zoom) {
        let numOfTiles = Math.pow(2, zoom);
        let lonDegreesPerTile = 360 / numOfTiles;
        let sinLat = Math.sin(lat * Math.PI / 180);
        let tx = (lon + 180) / lonDegreesPerTile;
        let ty = (0.5 + -0.5 * Math.log((1 + sinLat) / (1 - sinLat)) / (2 * Math.PI)) * numOfTiles;

        return new Tile(
            Math.floor(tx),
            Math.floor(ty),
            zoom
        );
    }

    tileToLonlat (tile) {
        let numOfTiles = Math.pow(2, tile.zoom);
        let x = tile.x / numOfTiles;
        let y = tile.y / numOfTiles;
        let lon = (x - (1 / 2)) / (1 / 360);
        let latRadians = (y - (1 / 2)) / -(1 / (2 * Math.PI));
        let lat = (2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2) / Math.PI * 180;
        return new LonLat(
            lon,
            lat
        );
    }

    tileToBoundary (tile, size = 1) {
        let p1 = this.tileToLonlat(tile);
        let p2 = this.tileToLonlat(new Tile(tile.x + size, tile.y + size, tile.zoom));

        return new Boundary(
            p1.lat,
            p1.lon,
            p2.lat,
            p2.lon
        );
    }

    midpoint(_arg, _arg1) {
        let x1 = _arg[0], y1 = _arg[1];
        let x2 = _arg1[0], y2 = _arg1[1];
        let x = x1 - (x1 - x2) / 2;
        let y = y1 - (y1 - y2) / 2;
        return [
            x, y
        ];
    }

    centroid(boundary) {
        let p1 = [
            boundary.w,
            boundary.n
        ];

        let p2 = [
            boundary.e,
            boundary.s
        ];

        return this.midpoint(p1, p2);
    }

    loadOSM(boundary) {
        let convertToAssoc = function(rawData) {
            let acc;
            acc = {
                node: {},
                way: {},
                relation: {}
            };
            rawData.elements.forEach(function(elem) {
                return acc[elem.type][elem.id] = elem;
            });
            return acc;
        };

        let baseUrl = "http://overpass-api.de/api/interpreter?data=[out:json];\n(\n  node({s},{w},{n},{e});\n  way(bn);\n);\n(\n  ._;\n  node(w);\n);\nout;";

        let url = baseUrl.replace(/\{([swne])\}/g, (match, key) => {
            return boundary[key];
        });

        return new Promise(
            (resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) { // DONE
                        let status = xhr.status;
                        if (status == 200) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(status);
                        }
                    }
                };
                xhr.send();
            }
        );
    }

    loadGSI(tile) {
        let parseDemCsv = function(text) {
            return text.substring(0, text.length - 1).split('\n').map(function(row) {
                return row.split(',').map(function(height) {
                    return parseFloat(height) || -1;
                });
            });
        };

        let url = "http://cyberjapandata.gsi.go.jp/xyz/dem/" + tile.zoom + "/" + tile.x + "/" + tile.y + ".txt";

        return new Promise(
            (resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) { // DONE
                        let status = xhr.status;
                        if (status == 200) {
                            resolve(parseDemCsv(xhr.responseText));
                        } else {
                            reject(status);
                        }
                    }
                };
                xhr.send();
            }
        );
    };

    loadGSITexture (tile) {
        let url = "http://cyberjapandata.gsi.go.jp/xyz/relief/" + tile.zoom + "/" + tile.x + "/" + tile.y + ".png";

        http.get(url, (response) => {
            let file = fs.createWriteStream("shibuya.png");
            response.pipe(file);
        });
    }

};

export {
    Tile,
    Boundary,
    GSI,
};
