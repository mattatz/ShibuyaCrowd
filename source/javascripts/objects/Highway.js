
class HighwayJoint {

    constructor(highway, index) {
        this.highway = highway;
        this.index = index;
    }

    contains(highway) {
        return this.highway == highway;
    }

}

class HighwayConnection {

    constructor(j0, j1) {
        this.j0 = j0;
        this.j1 = j1;
    }

    getJoint(highway) {
        if(this.j0.contains(highway)) {
            return this.j0;
        }
        return this.j1;
    }

    getOther(highway) {
        if(this.j0.contains(highway)) {
            return this.j1;
        }
        return this.j0;
    }

}

export default class Highway {

    constructor(coordinates) {
        this.coordinates = coordinates;

        let length = 0;
        for(let i = 0, n = coordinates.length - 1; i < n; i++) {
            let p0 = coordinates[i];
            let p1 = coordinates[i + 1];
            let dlon = p0.lon - p1.lon;
            let dlat = p0.lat - p1.lat;
            length += Math.sqrt((dlon * dlon) + (dlat * dlat));
        }
        this.length = length;

        this.connections = {};
    }

    split(points, count = 20) {
        let distance = 0;

        for(let i = 0, n = points.length; i < n - 1; i++) {
            let from = points[i];
            let to = points[i + 1];
            let d = from.distanceTo(to);
            distance += d;
        }

        this.distance = distance;

        let interval = distance / count;
        let prev = points[0];
        let samples = [ prev ];

        let remain = count - 1;
        let cur = 1;

        while(true) {
            let to = points[cur];
            let d = prev.distanceTo(to);

            if(d >= interval || cur >= points.length - 1) {
                // let sub = (new THREE.Vector3()).subVectors(to, prev);
                let sub = (new THREE.Vector2()).subVectors(to, prev);
                sub.setLength(interval);

                // let next = (new THREE.Vector3()).addVectors(prev, sub);
                let next = (new THREE.Vector2()).addVectors(prev, sub);
                samples.push(next);

                prev = next;

                remain--;
            } else {
                cur++;
            }

            if(remain <= 0 || cur >= points.length) {
                break;
            }
        }

        this.samples = samples;
    }

    branch(index) {
        return this.connections[index];
    }

    connect(con) {
        let joint = con.getJoint(this);
        if(!this.connections[joint.index]) {
            this.connections[joint.index] = [];
        }
        this.connections[joint.index].push(con.getOther(this));

        return joint;
    }

    intersects(other) {
        for(let i = 0, n = this.segments.length; i < n; i++) {
            let s0 = this.segments[i];
            for(let j = 0, m = other.segments.length; j < m; j++) {
                let s1 = other.segments[j];
                if(s0.intersects(s1)) {
                    return new HighwayConnection(
                        new HighwayJoint(this, i),
                        new HighwayJoint(other, j)
                    );
                }
            }
        }

        return false;
    }

}
