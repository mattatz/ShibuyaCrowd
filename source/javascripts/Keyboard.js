
import Vue from "./lib/vue.min";

import KeyCode from "./utils/KeyCode";

const KeyCodeState = {
    Default: 0,
    Pressed: 1,
    Selected: 2
};

const THRESHOLD_WIDTH = 640;

export default class Keyboard extends THREE.EventDispatcher {

    constructor(el) {
        super();

        let self = this;

        new Vue({
            el: el,
            data: {
                isMobile: false,
                isKeyDown: false,
                KeyCodeState: KeyCodeState,
                headers: [
                    "camera", "crowd", "city"
                ],
                holdables: [
                    KeyCode.q, 
                    KeyCode.w, 
                    KeyCode.e,
                    KeyCode.a, 
                    KeyCode.s, 
                    KeyCode.d, 
                    KeyCode.f
                ],
                toggles: [
                    KeyCode.r, 
                    KeyCode.y, 
                    KeyCode.g,
                    KeyCode.z,
                    KeyCode.x
                ],
                keys: [
                    [
                        { 
                            key: "q",
                            work: "bird",
                            // 同時に押せないキーを定義
                            uncooccurrence: [ KeyCode.w, KeyCode.e ]
                        },
                        {
                            key: "w",
                            work: "fixed",
                            uncooccurrence: [ KeyCode.q, KeyCode.e ]
                        },
                        {
                            key: "e",
                            work: "orbit",
                            uncooccurrence: [ KeyCode.q, KeyCode.w ]
                        },
                        {
                            key: "r",
                            work: "invert",
                        },
                        {
                            key: "t",
                            work: "mirror",
                        },
                        {
                            key: "y",
                            work: "glitch",
                        }
                    ],
                    [
                        { 
                            key: "a",
                            work: "street",
                            uncooccurrence: [ KeyCode.s, KeyCode.d, KeyCode.f ]
                        },
                        {
                            key: "s",
                            work: "march",
                            uncooccurrence: [ KeyCode.a, KeyCode.d, KeyCode.f ]
                        },
                        {
                            key: "d",
                            work: "gather",
                            uncooccurrence: [ KeyCode.a, KeyCode.s, KeyCode.f ]
                        },
                        {
                            key: "f",
                            work: "wait",
                            uncooccurrence: [ KeyCode.a, KeyCode.s, KeyCode.d ]
                        },
                        {
                            key: "g",
                            work: "noise",
                        },
                        {
                            key: "h",
                            work: "shake",
                            // 押すと同時に発火するキーを定義
                            cooccurrence: KeyCode.g
                        }
                    ],
                    [
                        { 
                            key: "z",
                            work: "noise"
                        },
                        {
                            key: "x",
                            work: "line"
                        }
                    ]
                ],
                selected: null
            },
            mounted: function() {
                this.keys = this.keys.map((row) => {
                    return row.map((elem) => {
                        return {
                            key: elem.key.toUpperCase(),
                            work: elem.work,
                            code: KeyCode[elem.key],
                            state: KeyCodeState.Default,
                            cooccurrence: elem.cooccurrence,
                            uncooccurrence: elem.uncooccurrence
                        };
                    });
                });

                document.addEventListener("keydown", (e) => {
                    let key = this.find(e.keyCode);
                    this.press(key);
                });
                document.addEventListener("keyup", (e) => {
                    let key = this.find(e.keyCode);
                    this.unpress(key);
                });

                // press default keys
                this.press(this.find(KeyCode.e));
                this.press(this.find(KeyCode.a));

                window.addEventListener("resize", () => {
                    this.resize();
                });
                this.resize();
            },
            methods: {
                resize: function() {
                    let w = window.innerWidth;
                    this.isMobile = (w < THRESHOLD_WIDTH);
                },
                press: function(key) {
                    if(key) {
                        switch(key.state) {
                            case KeyCodeState.Pressed:
                                // toggle key
                                if(this.isToggle(key)) {
                                    key.state = KeyCodeState.Default;
                                    if(this.selected == key) {
                                        key.state = KeyCodeState.Selected;
                                    }
                                }
                                break;
                            default:
                                key.state = KeyCodeState.Pressed;
                                if(key.cooccurrence) {
                                    let cooccurrence = this.find(key.cooccurrence);
                                    cooccurrence.state = KeyCodeState.Pressed;
                                }
                                if(key.uncooccurrence) {
                                    key.uncooccurrence.forEach((code) => {
                                        let other = this.find(code);
                                        if(other) {
                                            other.state = KeyCodeState.Default;
                                        }
                                    });
                                }
                                break;
                        }
                    }
                },
                unpress: function(key) {
                    if(key && !this.isHoldable(key) && !this.isToggle(key)) {
                        key.state = KeyCodeState.Default;
                        if(this.selected == key) {
                            key.state = KeyCodeState.Selected;
                        }
                    }
                },
                select: function(key) {
                    if(key && key.state != KeyCodeState.Pressed) {
                        key.state = KeyCodeState.Selected;
                    }
                    this.selected = key;
                },
                unselect: function() {
                    if(this.selected && this.selected.state == KeyCodeState.Selected) {
                        this.selected.state = KeyCodeState.Default;
                    }
                    this.selected = null;
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
                isHoldable: function(key) {
                    return this.holdables.find(function(code) {
                        return code == key.code;
                    });
                },
                isToggle: function(key) {
                    return this.toggles.find(function(code) {
                        return code == key.code;
                    });
                },
                mouseOver: function(key) {
                    this.select(key);
                },
                mouseOut: function(key) {
                    this.unselect();
                },
                mouseDown: function(key) {
                    if(this.isKeyDown) return;

                    self.dispatchEvent({
                        type: "keydown",
                        message: {
                            keyCode: key.code
                        }
                    });
                    this.press(key);

                    this.isKeyDown = true;
                },
                mouseUp: function(key) {
                    self.dispatchEvent({
                        type: "keyup",
                        message: {
                            keyCode: key.code
                        }
                    });
                    this.unpress(key);
                    this.isKeyDown = false;
                }
            }
        });
    }

}

