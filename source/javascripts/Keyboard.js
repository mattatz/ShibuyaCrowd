
import Vue from "./lib/vue.min";

import KeyCode from "./utils/KeyCode";

export default class Keyboard {

    constructor(el) {
        new Vue({
            el: el,
            data: {
                characters: [
                    ["q", "w", "e", "r", "t", "y"],
                    ["a", "s", "d", "f", "g"],
                    ["z", "x", "c", "v", "b", "n"]
                ],
                keys: [],
                selected: null
            },
            mounted: function() {
                this.keys = this.characters.map((row) => {
                    return row.map((c) => {
                        return {
                            char: c,
                            code: KeyCode[c],
                            pressed: false
                        };
                    });
                });

                document.addEventListener("keydown", (e) => {
                    let key = this.find(e.keyCode);
                    this.select(key);
                });
                document.addEventListener("keyup", (e) => {
                    this.reset();
                });
            },
            methods: {
                reset: function() {
                    if(this.selected != null) {
                        this.selected.pressed = false;
                    }
                },
                select: function(key) {
                    this.reset();
                    if(key) {
                        key.pressed = true;
                    }
                    this.selected = key;
                },
                find: function(code) {
                    for(let idx in this.keys) {
                        let row = this.keys[idx];
                        for(let j = 0, n = row.length; j < n; j++) {
                            let key = row[j];
                            if(key.code == code) {
                                return key;
                            }
                        }
                    }
                    return null;
                },
                hover: function(key) {
                    this.select(key);
                }
            }
        });
    }

}

