
export default class OSM {

    constructor(data) {
        this.nodes = {};
        this.buildings = [];
        this.highways = [];

        data.elements.forEach((elem) => {
            switch(elem.type) {
                case "node":
                    this.nodes[elem.id] = elem;
                    break;

                case "way":
                    let tags = elem.tags;
                    if(!tags) return;

                    if(tags.building) {
                        this.buildings.push(elem);
                    } else if(tags.highway) {
                        this.highways.push(elem);
                    }

                    break;
            }
        });
    }

}

