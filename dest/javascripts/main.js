/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tween = __webpack_require__(1);

	var _Tween2 = _interopRequireDefault(_Tween);

	var _AudioAnalyser = __webpack_require__(3);

	var _AudioAnalyser2 = _interopRequireDefault(_AudioAnalyser);

	var _ShibuyaStage = __webpack_require__(4);

	var _ShibuyaStage2 = _interopRequireDefault(_ShibuyaStage);

	var _Keyboard = __webpack_require__(67);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	var _KeyCode = __webpack_require__(25);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var resolution = {
	    width: 1920,
	    height: 1080
	};

	var VJ = function () {
	    function VJ() {
	        var _this = this;

	        _classCallCheck(this, VJ);

	        this.clock = new THREE.Clock();
	        this.frames = 0;

	        this.renderer = new THREE.WebGLRenderer({
	            alpha: true,
	            antialias: true
	        });
	        var container = this.createContainer();
	        this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
	        this.renderer.setSize(window.innerWidth, window.innerHeight);
	        container.appendChild(this.renderer.domElement);

	        var isKeyDown = false;
	        document.addEventListener("keydown", function (e) {
	            if (_KeyCode.KeyCodeDetector.isArrowKey(e.keyCode) || !isKeyDown) {
	                _this.input(e.keyCode);
	            }
	            isKeyDown = true;
	        });
	        document.addEventListener("keyup", function (e) {
	            isKeyDown = false;
	        });

	        window.addEventListener("resize", function (e) {
	            _this.resize();
	        });

	        this.stage = new _ShibuyaStage2.default(this, resolution);

	        var loop = function loop(time) {
	            _this.loop(time);
	            requestAnimationFrame(loop);
	        };

	        this.resize();
	        requestAnimationFrame(loop);
	    }

	    _createClass(VJ, [{
	        key: "input",
	        value: function input(keyCode) {
	            if (this.stage) {
	                this.stage.input(keyCode);
	            }
	        }
	    }, {
	        key: "setBackground",
	        value: function setBackground(color, transparent) {
	            this.renderer.setClearColor(color, transparent ? 0 : 1);
	        }
	    }, {
	        key: "createContainer",
	        value: function createContainer() {
	            var container = document.createElement("div");
	            container.id = "webvj--container";
	            document.body.appendChild(container);
	            return container;
	        }
	    }, {
	        key: "loop",
	        value: function loop(time) {
	            var dt = this.clock.getDelta();
	            if (this.stage) {
	                this.stage.update(dt, this.clock.elapsedTime, this.frames);
	                this.stage.render(this.renderer);
	            }
	            _Tween2.default.update(time);

	            this.frames++;
	        }
	    }, {
	        key: "resize",
	        value: function resize() {
	            var w = window.innerWidth,
	                h = window.innerHeight;
	            this.stage.resize(w, h);
	            this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
	            this.renderer.setSize(w, h);
	        }
	    }]);

	    return VJ;
	}();

	exports.default = VJ;


	var vj = new VJ();
	var keyboard = new _Keyboard2.default(".virtual-keyboard");
	keyboard.addEventListener("keydown", function (e) {
	    vj.input(e.message.keyCode);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/tweenjs/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */

	var TWEEN = TWEEN || function () {

		var _tweens = [];

		return {

			getAll: function getAll() {

				return _tweens;
			},

			removeAll: function removeAll() {

				_tweens = [];
			},

			add: function add(tween) {

				_tweens.push(tween);
			},

			remove: function remove(tween) {

				var i = _tweens.indexOf(tween);

				if (i !== -1) {
					_tweens.splice(i, 1);
				}
			},

			update: function update(time, preserve) {

				if (_tweens.length === 0) {
					return false;
				}

				var i = 0;

				time = time !== undefined ? time : TWEEN.now();

				while (i < _tweens.length) {

					if (_tweens[i].update(time) || preserve) {
						i++;
					} else {
						_tweens.splice(i, 1);
					}
				}

				return true;
			}
		};
	}();

	// Include a performance.now polyfill.
	// In node.js, use process.hrtime.
	if (typeof window === 'undefined' && typeof process !== 'undefined') {
		TWEEN.now = function () {
			var time = process.hrtime();

			// Convert [seconds, nanoseconds] to milliseconds.
			return time[0] * 1000 + time[1] / 1000000;
		};
	}
	// In a browser, use window.performance.now if it is available.
	else if (typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined) {
			// This must be bound, because directly assigning this function
			// leads to an invocation exception in Chrome.
			TWEEN.now = window.performance.now.bind(window.performance);
		}
		// Use Date.now if it is available.
		else if (Date.now !== undefined) {
				TWEEN.now = Date.now;
			}
			// Otherwise, use 'new Date().getTime()'.
			else {
					TWEEN.now = function () {
						return new Date().getTime();
					};
				}

	TWEEN.Tween = function (object) {

		var _object = object;
		var _valuesStart = {};
		var _valuesEnd = {};
		var _valuesStartRepeat = {};
		var _duration = 1000;
		var _repeat = 0;
		var _repeatDelayTime;
		var _yoyo = false;
		var _isPlaying = false;
		var _reversed = false;
		var _delayTime = 0;
		var _startTime = null;
		var _easingFunction = TWEEN.Easing.Linear.None;
		var _interpolationFunction = TWEEN.Interpolation.Linear;
		var _chainedTweens = [];
		var _onStartCallback = null;
		var _onStartCallbackFired = false;
		var _onUpdateCallback = null;
		var _onCompleteCallback = null;
		var _onStopCallback = null;

		this.to = function (properties, duration) {

			_valuesEnd = properties;

			if (duration !== undefined) {
				_duration = duration;
			}

			return this;
		};

		this.start = function (time) {

			TWEEN.add(this);

			_isPlaying = true;

			_onStartCallbackFired = false;

			_startTime = time !== undefined ? time : TWEEN.now();
			_startTime += _delayTime;

			for (var property in _valuesEnd) {

				// Check if an Array was provided as property value
				if (_valuesEnd[property] instanceof Array) {

					if (_valuesEnd[property].length === 0) {
						continue;
					}

					// Create a local copy of the Array with the start value at the front
					_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);
				}

				// If `to()` specifies a property that doesn't exist in the source object,
				// we should not set that property in the object
				if (_object[property] === undefined) {
					continue;
				}

				// Save the starting value.
				_valuesStart[property] = _object[property];

				if (_valuesStart[property] instanceof Array === false) {
					_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
				}

				_valuesStartRepeat[property] = _valuesStart[property] || 0;
			}

			return this;
		};

		this.stop = function () {

			if (!_isPlaying) {
				return this;
			}

			TWEEN.remove(this);
			_isPlaying = false;

			if (_onStopCallback !== null) {
				_onStopCallback.call(_object, _object);
			}

			this.stopChainedTweens();
			return this;
		};

		this.end = function () {

			this.update(_startTime + _duration);
			return this;
		};

		this.stopChainedTweens = function () {

			for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
				_chainedTweens[i].stop();
			}
		};

		this.delay = function (amount) {

			_delayTime = amount;
			return this;
		};

		this.repeat = function (times) {

			_repeat = times;
			return this;
		};

		this.repeatDelay = function (amount) {

			_repeatDelayTime = amount;
			return this;
		};

		this.yoyo = function (yoyo) {

			_yoyo = yoyo;
			return this;
		};

		this.easing = function (easing) {

			_easingFunction = easing;
			return this;
		};

		this.interpolation = function (interpolation) {

			_interpolationFunction = interpolation;
			return this;
		};

		this.chain = function () {

			_chainedTweens = arguments;
			return this;
		};

		this.onStart = function (callback) {

			_onStartCallback = callback;
			return this;
		};

		this.onUpdate = function (callback) {

			_onUpdateCallback = callback;
			return this;
		};

		this.onComplete = function (callback) {

			_onCompleteCallback = callback;
			return this;
		};

		this.onStop = function (callback) {

			_onStopCallback = callback;
			return this;
		};

		this.update = function (time) {

			var property;
			var elapsed;
			var value;

			if (time < _startTime) {
				return true;
			}

			if (_onStartCallbackFired === false) {

				if (_onStartCallback !== null) {
					_onStartCallback.call(_object, _object);
				}

				_onStartCallbackFired = true;
			}

			elapsed = (time - _startTime) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;

			value = _easingFunction(elapsed);

			for (property in _valuesEnd) {

				// Don't update properties that do not exist in the source object
				if (_valuesStart[property] === undefined) {
					continue;
				}

				var start = _valuesStart[property] || 0;
				var end = _valuesEnd[property];

				if (end instanceof Array) {

					_object[property] = _interpolationFunction(end, value);
				} else {

					// Parses relative end values with start as base (e.g.: +10, -3)
					if (typeof end === 'string') {

						if (end.charAt(0) === '+' || end.charAt(0) === '-') {
							end = start + parseFloat(end);
						} else {
							end = parseFloat(end);
						}
					}

					// Protect against non numeric properties.
					if (typeof end === 'number') {
						_object[property] = start + (end - start) * value;
					}
				}
			}

			if (_onUpdateCallback !== null) {
				_onUpdateCallback.call(_object, value);
			}

			if (elapsed === 1) {

				if (_repeat > 0) {

					if (isFinite(_repeat)) {
						_repeat--;
					}

					// Reassign starting values, restart by making startTime = now
					for (property in _valuesStartRepeat) {

						if (typeof _valuesEnd[property] === 'string') {
							_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property]);
						}

						if (_yoyo) {
							var tmp = _valuesStartRepeat[property];

							_valuesStartRepeat[property] = _valuesEnd[property];
							_valuesEnd[property] = tmp;
						}

						_valuesStart[property] = _valuesStartRepeat[property];
					}

					if (_yoyo) {
						_reversed = !_reversed;
					}

					if (_repeatDelayTime !== undefined) {
						_startTime = time + _repeatDelayTime;
					} else {
						_startTime = time + _delayTime;
					}

					return true;
				} else {

					if (_onCompleteCallback !== null) {

						_onCompleteCallback.call(_object, _object);
					}

					for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
						// Make the chained tweens start exactly at the time they should,
						// even if the `update()` method was called way past the duration of the tween
						_chainedTweens[i].start(_startTime + _duration);
					}

					return false;
				}
			}

			return true;
		};
	};

	TWEEN.Easing = {

		Linear: {

			None: function None(k) {

				return k;
			}

		},

		Quadratic: {

			In: function In(k) {

				return k * k;
			},

			Out: function Out(k) {

				return k * (2 - k);
			},

			InOut: function InOut(k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k;
				}

				return -0.5 * (--k * (k - 2) - 1);
			}

		},

		Cubic: {

			In: function In(k) {

				return k * k * k;
			},

			Out: function Out(k) {

				return --k * k * k + 1;
			},

			InOut: function InOut(k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k + 2);
			}

		},

		Quartic: {

			In: function In(k) {

				return k * k * k * k;
			},

			Out: function Out(k) {

				return 1 - --k * k * k * k;
			},

			InOut: function InOut(k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k;
				}

				return -0.5 * ((k -= 2) * k * k * k - 2);
			}

		},

		Quintic: {

			In: function In(k) {

				return k * k * k * k * k;
			},

			Out: function Out(k) {

				return --k * k * k * k * k + 1;
			},

			InOut: function InOut(k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k * k * k + 2);
			}

		},

		Sinusoidal: {

			In: function In(k) {

				return 1 - Math.cos(k * Math.PI / 2);
			},

			Out: function Out(k) {

				return Math.sin(k * Math.PI / 2);
			},

			InOut: function InOut(k) {

				return 0.5 * (1 - Math.cos(Math.PI * k));
			}

		},

		Exponential: {

			In: function In(k) {

				return k === 0 ? 0 : Math.pow(1024, k - 1);
			},

			Out: function Out(k) {

				return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
			},

			InOut: function InOut(k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				if ((k *= 2) < 1) {
					return 0.5 * Math.pow(1024, k - 1);
				}

				return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
			}

		},

		Circular: {

			In: function In(k) {

				return 1 - Math.sqrt(1 - k * k);
			},

			Out: function Out(k) {

				return Math.sqrt(1 - --k * k);
			},

			InOut: function InOut(k) {

				if ((k *= 2) < 1) {
					return -0.5 * (Math.sqrt(1 - k * k) - 1);
				}

				return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
			}

		},

		Elastic: {

			In: function In(k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			},

			Out: function Out(k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
			},

			InOut: function InOut(k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				k *= 2;

				if (k < 1) {
					return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
				}

				return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
			}

		},

		Back: {

			In: function In(k) {

				var s = 1.70158;

				return k * k * ((s + 1) * k - s);
			},

			Out: function Out(k) {

				var s = 1.70158;

				return --k * k * ((s + 1) * k + s) + 1;
			},

			InOut: function InOut(k) {

				var s = 1.70158 * 1.525;

				if ((k *= 2) < 1) {
					return 0.5 * (k * k * ((s + 1) * k - s));
				}

				return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
			}

		},

		Bounce: {

			In: function In(k) {

				return 1 - TWEEN.Easing.Bounce.Out(1 - k);
			},

			Out: function Out(k) {

				if (k < 1 / 2.75) {
					return 7.5625 * k * k;
				} else if (k < 2 / 2.75) {
					return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
				} else if (k < 2.5 / 2.75) {
					return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
				} else {
					return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
				}
			},

			InOut: function InOut(k) {

				if (k < 0.5) {
					return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
				}

				return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
			}

		}

	};

	TWEEN.Interpolation = {

		Linear: function Linear(v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.Linear;

			if (k < 0) {
				return fn(v[0], v[1], f);
			}

			if (k > 1) {
				return fn(v[m], v[m - 1], m - f);
			}

			return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
		},

		Bezier: function Bezier(v, k) {

			var b = 0;
			var n = v.length - 1;
			var pw = Math.pow;
			var bn = TWEEN.Interpolation.Utils.Bernstein;

			for (var i = 0; i <= n; i++) {
				b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
			}

			return b;
		},

		CatmullRom: function CatmullRom(v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.CatmullRom;

			if (v[0] === v[m]) {

				if (k < 0) {
					i = Math.floor(f = m * (1 + k));
				}

				return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
			} else {

				if (k < 0) {
					return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
				}

				if (k > 1) {
					return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
				}

				return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
			}
		},

		Utils: {

			Linear: function Linear(p0, p1, t) {

				return (p1 - p0) * t + p0;
			},

			Bernstein: function Bernstein(n, i) {

				var fc = TWEEN.Interpolation.Utils.Factorial;

				return fc(n) / fc(i) / fc(n - i);
			},

			Factorial: function () {

				var a = [1];

				return function (n) {

					var s = 1;

					if (a[n]) {
						return a[n];
					}

					for (var i = n; i > 1; i--) {
						s *= i;
					}

					a[n] = s;
					return s;
				};
			}(),

			CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {

				var v0 = (p2 - p0) * 0.5;
				var v1 = (p3 - p1) * 0.5;
				var t2 = t * t;
				var t3 = t * t2;

				return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
			}

		}

	};

	// UMD (Universal Module Definition)
	(function (root) {

		if (true) {

			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return TWEEN;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {

			// Node.js
			module.exports = TWEEN;
		} else if (root !== undefined) {

			// Global variable
			root.TWEEN = TWEEN;
		}
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Peak = function (_THREE$EventDispatche) {
	    _inherits(Peak, _THREE$EventDispatche);

	    // threshold: 0.0 ~ 1.0
	    function Peak(threshold) {
	        _classCallCheck(this, Peak);

	        var _this = _possibleConstructorReturn(this, (Peak.__proto__ || Object.getPrototypeOf(Peak)).call(this));

	        _this.threshold = threshold;
	        _this.flag = false;
	        return _this;
	    }

	    _createClass(Peak, [{
	        key: "bang",
	        value: function bang(isOver) {
	            if (this.flag != isOver) {
	                if (isOver) {
	                    this.dispatchEvent({
	                        type: "bang"
	                    });
	                }
	                this.flag = isOver;
	            }
	        }
	    }]);

	    return Peak;
	}(THREE.EventDispatcher);

	var AudioAnalyser = function (_THREE$EventDispatche2) {
	    _inherits(AudioAnalyser, _THREE$EventDispatche2);

	    function AudioAnalyser(options) {
	        _classCallCheck(this, AudioAnalyser);

	        var _this2 = _possibleConstructorReturn(this, (AudioAnalyser.__proto__ || Object.getPrototypeOf(AudioAnalyser)).call(this));

	        _this2.ready = false;

	        options = options || {};

	        _this2.fftSize = options.fftSize || 512;
	        _this2.fps = options.fps || 30;
	        _this2.smooth = options.smooth || 0.75;
	        _this2.volumeScale = options.volumeScale || 1.0;

	        _this2.volume = 0;

	        _this2.peaks = [];
	        _this2.data = [];

	        var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
	        _this2.context = new AudioContext();
	        return _this2;
	    }

	    _createClass(AudioAnalyser, [{
	        key: "setup",
	        value: function setup() {
	            var _this3 = this;

	            return new Promise(function (resolve, reject) {
	                if (_this3.context) {
	                    _this3.getUserMedia({
	                        audio: true,
	                        video: false
	                    }, function (stream) {
	                        _this3.dispatchEvent({ type: "complete" });

	                        _this3.success(stream);
	                        resolve();
	                    }, function (err) {
	                        _this3.error(err);
	                        reject();
	                    });
	                }
	            });
	        }
	    }, {
	        key: "peak",
	        value: function peak(threshold) {
	            var peak = new Peak(threshold);
	            this.peaks.push(peak);
	            return peak;
	        }
	    }, {
	        key: "getUserMedia",
	        value: function getUserMedia(setting, success, error) {
	            var gum = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	            if (!!gum) {
	                // localhost or httpsだと動く　他は、chromeに引数が必要 --unsafely-treat-insecure-origin-as-secure="example.com"
	                // https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins
	                gum.call(navigator, setting, success, error);
	            }
	        }
	    }, {
	        key: "error",
	        value: function error(err) {
	            console.log(err);
	        }
	    }, {
	        key: "success",
	        value: function success(stream) {
	            this.source = this.context.createMediaStreamSource(stream);

	            this.analyser = this.context.createAnalyser();
	            this.analyser.fftSize = this.fftSize;

	            this.data = new Uint8Array(this.analyser.frequencyBinCount);

	            /*
	            // 低い声をカットするフィルターを用意する
	            let highpassFilter;
	            highpassFilter = this.context.createBiquadFilter();
	            highpassFilter.type = "highpass";
	            highpassFilter.frequency.value = 200;
	             // passFilterをAudioAnalyserノードの入力に繋ぐ
	            highpassFilter.connect(this.analyser);
	             // audioSourceをpassFilterノードの入力に繋ぐ
	            this.source.connect(highpassFilter);
	            */

	            this.source.connect(this.analyser);

	            this.ready = true;
	        }
	    }, {
	        key: "analyse",
	        value: function analyse() {
	            this.analyser.getByteFrequencyData(this.data);

	            this.calculateVolume();

	            var v = this.smoothedVolume;
	            this.peaks.forEach(function (peak) {
	                var isOver = v > peak.threshold;
	                peak.bang(isOver);
	            });

	            this.dispatchEvent({ type: "analyse" });
	        }
	    }, {
	        key: "calculateVolume",
	        value: function calculateVolume() {
	            var vol = 0;
	            var len = this.data.length;
	            for (var i = 0; i < len; i++) {
	                var input = this.data[i];
	                var hinput = input * 0.5;
	                vol += hinput * hinput;
	            }
	            vol /= len;
	            vol = Math.sqrt(vol);

	            this.volume *= this.smooth;
	            this.volume += (1.0 - this.smooth) * vol;
	        }
	    }, {
	        key: "start",
	        value: function start() {
	            this.interval = this.loop();
	        }
	    }, {
	        key: "stop",
	        value: function stop() {
	            clearInterval(this.interval);
	        }
	    }, {
	        key: "loop",
	        value: function loop() {
	            var _this4 = this;

	            return setInterval(function () {
	                _this4.analyse();
	            }, 1000 / this.fps);
	        }
	    }, {
	        key: "frequencyBinCount",
	        get: function get() {
	            return Math.floor(this.fftSize * 0.5);
	        }
	    }, {
	        key: "smoothedVolume",
	        get: function get() {
	            return this.volume / 255 * this.volumeScale;
	        }
	    }]);

	    return AudioAnalyser;
	}(THREE.EventDispatcher);

	exports.default = AudioAnalyser;
	;

	exports.Peak = Peak;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Stage2 = __webpack_require__(5);

	var _Stage3 = _interopRequireDefault(_Stage2);

	__webpack_require__(20);

	__webpack_require__(21);

	__webpack_require__(22);

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _TextureUtil = __webpack_require__(24);

	var _TextureUtil2 = _interopRequireDefault(_TextureUtil);

	var _KeyCode = __webpack_require__(25);

	var _KeyCode2 = _interopRequireDefault(_KeyCode);

	var _OpenStreetMap = __webpack_require__(26);

	var _OpenStreetMap2 = _interopRequireDefault(_OpenStreetMap);

	var _CoordinateConverter = __webpack_require__(27);

	var _CoordinateConverter2 = _interopRequireDefault(_CoordinateConverter);

	var _HandyCameraControls = __webpack_require__(28);

	var _HandyCameraControls2 = _interopRequireDefault(_HandyCameraControls);

	var _PolarCameraControls = __webpack_require__(30);

	var _PolarCameraControls2 = _interopRequireDefault(_PolarCameraControls);

	var _FixedCameraControls = __webpack_require__(32);

	var _FixedCameraControls2 = _interopRequireDefault(_FixedCameraControls);

	var _BirdCameraControls = __webpack_require__(33);

	var _BirdCameraControls2 = _interopRequireDefault(_BirdCameraControls);

	var _LightControls = __webpack_require__(34);

	var _LightControls2 = _interopRequireDefault(_LightControls);

	var _BackgroundPass = __webpack_require__(35);

	var _BackgroundPass2 = _interopRequireDefault(_BackgroundPass);

	var _CompositePass = __webpack_require__(39);

	var _CompositePass2 = _interopRequireDefault(_CompositePass);

	var _SRParticleSystem = __webpack_require__(41);

	var _SRParticleSystem2 = _interopRequireDefault(_SRParticleSystem);

	var _CrowdSystem = __webpack_require__(44);

	var _CrowdSystem2 = _interopRequireDefault(_CrowdSystem);

	var _OSM = __webpack_require__(45);

	var _OSM2 = _interopRequireDefault(_OSM);

	var _HighwayGroup = __webpack_require__(46);

	var _HighwayGroup2 = _interopRequireDefault(_HighwayGroup);

	var _Highway = __webpack_require__(47);

	var _Highway2 = _interopRequireDefault(_Highway);

	var _CEL = __webpack_require__(48);

	var _CEL2 = _interopRequireDefault(_CEL);

	var _SRParticleMesh = __webpack_require__(52);

	var _SRParticleMesh2 = _interopRequireDefault(_SRParticleMesh);

	var _CrowdMesh = __webpack_require__(54);

	var _CrowdMesh2 = _interopRequireDefault(_CrowdMesh);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var scramble = {
	    lon: 139.700772,
	    lat: 35.659710
	};

	var scrambleCenter = {
	    lon: scramble.lon - 0.00025,
	    lat: scramble.lat - 0.00025
	};

	var womb = {
	    lon: 139.695049,
	    lat: 35.658394
	};

	var scale = 500000;

	// const offsetX = -womb.lon * scale, offsetY = -womb.lat * scale;
	var offsetX = -scramble.lon * scale,
	    offsetY = -scramble.lat * scale;
	var converter = new _CoordinateConverter2.default(scale, offsetX, offsetY);

	var fixedCameraPointsPath = "/dest/camera/points.json";

	var toggles = {
	    useSlit: false,
	    cityNoise: false,
	    cityWireframe: false,
	    posteffectInvert: false
	};

	var ShibuyaStage = function (_Stage) {
	    _inherits(ShibuyaStage, _Stage);

	    function ShibuyaStage(vj, resolution) {
	        _classCallCheck(this, ShibuyaStage);

	        var _this = _possibleConstructorReturn(this, (ShibuyaStage.__proto__ || Object.getPrototypeOf(ShibuyaStage)).call(this, vj, resolution));

	        _this.updaters = [];
	        _this.init(vj);
	        return _this;
	    }

	    _createClass(ShibuyaStage, [{
	        key: "init",
	        value: function init(vj) {
	            var _this2 = this;

	            // let visualizer = this.gui.add(this.analyser, "smoothedVolume").min(0).max(1).step(0.01).listen();
	            // this.gui.add(this.analyser, "volumeScale").min(0).max(5).step(0.01);

	            this.createScene(window.innerWidth, window.innerHeight);

	            this.container = new THREE.Object3D();

	            this.renderer.shadowMap.enabled = true;
	            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	            this.renderer.shadowMap.soft = true;

	            var shadowRange = 200;
	            var light = new THREE.DirectionalLight(0xffffff, 0.2);
	            light.position.set(0, 1000, 0);
	            light.frustumCulled = false;
	            light.shadow.darkness = 0.35;
	            light.shadow.camera.near = 300;light.shadow.camera.far = 1200;

	            light.shadow.camera.left = -shadowRange;light.shadow.camera.right = shadowRange;
	            light.shadow.camera.bottom = -shadowRange;light.shadow.camera.top = shadowRange;
	            light.shadow.mapSize.width = light.shadow.mapSize.height = 2 << 10;
	            light.castShadow = true;light.shadow.castShadow = true;

	            // this.scene.add(new THREE.CameraHelper(light.shadow.camera));
	            // this.scene.add(new THREE.DirectionalLightHelper(light));

	            this.scene.add(light);
	            this.scene.add(light.target);

	            var hemisphereLight = new THREE.HemisphereLight(0xfafaff, 0x080820, 1);
	            this.scene.add(hemisphereLight);

	            var fog = new THREE.Fog(new THREE.Color(0xffffff), 1000, 2500);
	            this.scene.fog = fog;

	            this.scene.add(this.container);

	            this.cameraControls = {
	                bird: new _BirdCameraControls2.default(this.camera, 1200, 0, 0, 0, 0),
	                fixed: new _FixedCameraControls2.default(this.camera, {
	                    positionComponents: new THREE.Vector3(1, 0.25, 1),
	                    positionAmount: 1.0,
	                    rotationComponents: new THREE.Vector3(0.2, 1, 0.2),
	                    rotationAmount: 1.0
	                }),
	                polar: new _PolarCameraControls2.default(this.camera, new THREE.Vector3(0, 0, 0), 0, 0, 30),
	                orbit: new THREE.OrbitControls(this.camera, this.renderer.domElement)
	            };
	            var orbit = this.cameraControls.orbit;
	            orbit.enablePan = orbit.enableRotate = orbit.enableZoom = false;

	            // this.selectedCameraControls = "bird";
	            // this.selectedCameraControls = "fixed";
	            this.selectedCameraControls = "polar";
	            // this.selectedCameraControls = "orbit";

	            this.load(".." + fixedCameraPointsPath).then(function (str) {
	                var controls = _this2.cameraControls.fixed;
	                controls.points = JSON.parse(str).map(function (raw) {
	                    return new _FixedCameraControls.FixedCameraPoint(raw.position, raw.quat);
	                });
	            });

	            this.lightControls = new _LightControls2.default(this.camera, light, 1000);
	            this.updaters.push(this.lightControls);

	            // http://tools.geofabrik.de/calc/#type=geofabrik_standard&bbox=139.690427,35.648294,139.715343,35.667322&tab=1&proj=EPSG:4326&places=2
	            var boundary = new _OpenStreetMap.Boundary(35.6615, 139.698, 35.6571, 139.703);
	            var map = new _OpenStreetMap2.default();

	            this.container.rotation.set(-Math.PI * 0.5, 0, 0);

	            Promise.all([this.load("../dest/osm/shibuya.json")]).then(function (data) {
	                var osm = new _OSM2.default(data[0]);

	                var group = new _HighwayGroup2.default(osm, boundary, converter);
	                var textureStreet = group.texture();

	                var range = group.range;
	                var streetScale = new THREE.Vector3(range.x * scale, range.y * scale, 0);

	                var offset = converter.convert(group.min.x, group.min.y);
	                var streetOffset = new THREE.Vector3(offset.x, offset.y, 0);

	                var gather = group.getStreamPosition(scrambleCenter.lon, scrambleCenter.lat);

	                var center = new THREE.Vector3(gather.x * streetScale.x + streetOffset.x, 0, -(gather.y * streetScale.y + streetOffset.y));

	                var crowd = _this2.setupCrowd(textureStreet, streetScale, streetOffset);
	                _this2.crowd = crowd;
	                crowd.mesh.material.uniforms.center.value.set(center.x, center.y, center.z);
	                crowd.system.gatherPosition = gather;
	                crowd.system.init();

	                _this2.cameraControls.polar.center.set(center.x, center.y + 20, center.z);

	                _this2.setupCity().then(function (city) {
	                    _this2.city = city;

	                    var box = city.boundingBox;
	                    var birdControls = _this2.cameraControls.bird;
	                    var offset = 10;
	                    birdControls.setBoundary(box.min.x - offset, box.max.z + offset, box.max.x + offset, box.min.z - offset);
	                    birdControls.randomize();

	                    crowd.mesh.material.uniforms.textureBoundaryDepth.value = city.depthBuffer.texture;
	                    crowd.mesh.material.uniforms.boundaryMin.value = city.boundingBox.min;
	                    crowd.mesh.material.uniforms.boundaryMax.value = city.boundingBox.max;

	                    var passes = _this2.composer.passes;
	                    var composite = passes.find(function (pass) {
	                        return pass instanceof _CompositePass2.default;
	                    });
	                    if (composite) {
	                        composite.fadeIn();
	                        _this2.hideIndicator();
	                    }

	                    _this2.setupParticle().then(function (system, mesh) {
	                        system.setupBoundary(city.depthBuffer.texture, city.boundingBox);
	                        system.vortexCenter = center;
	                        system.init();
	                    });
	                });
	            });
	        }
	    }, {
	        key: "activate",
	        value: function activate(mode) {
	            _get(ShibuyaStage.prototype.__proto__ || Object.getPrototypeOf(ShibuyaStage.prototype), "activate", this).call(this, mode);
	        }
	    }, {
	        key: "deactivate",
	        value: function deactivate(mode) {
	            _get(ShibuyaStage.prototype.__proto__ || Object.getPrototypeOf(ShibuyaStage.prototype), "deactivate", this).call(this, mode);
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t, frame) {
	            _get(ShibuyaStage.prototype.__proto__ || Object.getPrototypeOf(ShibuyaStage.prototype), "update", this).call(this, dt, t, frame);

	            if (this.cameraControls) {
	                var controls = this.cameraControls[this.selectedCameraControls];
	                controls.update(dt, t, frame);
	            }
	            this.updaters.forEach(function (updater) {
	                updater.update(dt, t, frame);
	            });
	        }
	    }, {
	        key: "input",
	        value: function input(keyCode) {
	            switch (keyCode) {
	                // crowd movement
	                case _KeyCode2.default.a:
	                    this.crowd.system.movement = _CrowdSystem.CrowdMode.Street;
	                    break;

	                case _KeyCode2.default.s:
	                    this.crowd.system.movement = _CrowdSystem.CrowdMode.Direction;
	                    this.crowd.system.randomizeDirection();
	                    break;

	                case _KeyCode2.default.d:
	                    this.crowd.system.movement = _CrowdSystem.CrowdMode.Gather;
	                    break;

	                case _KeyCode2.default.f:
	                    this.crowd.system.movement = _CrowdSystem.CrowdMode.Stop;
	                    break;

	                case _KeyCode2.default.g:
	                    this.crowd.mesh.animateUseSlit(toggles.useSlit ? 0 : 1);
	                    toggles.useSlit = !toggles.useSlit;
	                    break;

	                case _KeyCode2.default.h:
	                    toggles.useSlit = true;
	                    this.crowd.mesh.animateUseSlit(1);
	                    this.crowd.mesh.animateSlitOffset(_MathUtil2.default.randomRange(0.7, 1.2));
	                    break;

	                // city 
	                case _KeyCode2.default.z:
	                    this.city.animateNoiseIntensity(toggles.cityNoise ? 1 : 11.5);
	                    toggles.cityNoise = !toggles.cityNoise;
	                    break;

	                case _KeyCode2.default.x:
	                    this.city.animateWireframe(toggles.cityWireframe ? 0.25 : 1.0);
	                    toggles.cityWireframe = !toggles.cityWireframe;
	                    break;

	                // camera
	                case _KeyCode2.default.q:
	                    this.selectedCameraControls = "bird";
	                    this.cameraControls[this.selectedCameraControls].randomize();
	                    break;

	                case _KeyCode2.default.w:
	                    this.selectedCameraControls = "fixed";
	                    this.cameraControls[this.selectedCameraControls].next();
	                    break;

	                case _KeyCode2.default.e:
	                    this.selectedCameraControls = "polar";
	                    this.cameraControls[this.selectedCameraControls].randomize();
	                    break;

	                case _KeyCode2.default.leftArrow:
	                case _KeyCode2.default.upArrow:
	                case _KeyCode2.default.rightArrow:
	                case _KeyCode2.default.downArrow:
	                    this.moveCamera(keyCode);
	                    break;

	                case _KeyCode2.default.r:
	                    this.composite.animateInvert(toggles.posteffectInvert ? 0.0 : 1.0);
	                    toggles.posteffectInvert = !toggles.posteffectInvert;
	                    break;

	                case _KeyCode2.default.t:
	                    this.composite.mirror = (this.composite.mirror + 1) % 5;
	                    break;

	                case _KeyCode2.default.y:
	                    if (this.composite.glitchSpeed > 1.0) {
	                        this.composite.glitchSpeed = 0.4;
	                    } else {
	                        this.composite.glitchSpeed = 5.4;
	                    }
	                    break;

	            }
	        }
	    }, {
	        key: "moveCamera",
	        value: function moveCamera(keyCode) {
	            switch (this.selectedCameraControls) {
	                case "bird":
	                    this.moveBirdCamera(keyCode);
	                    break;
	                case "fixed":
	                    this.moveFixedCamera(keyCode);
	                    break;
	                case "polar":
	                    this.movePolarCamera(keyCode);
	                    break;
	            }
	        }
	    }, {
	        key: "moveBirdCamera",
	        value: function moveBirdCamera(keyCode) {
	            var controls = this.cameraControls["bird"];
	            switch (keyCode) {
	                case _KeyCode2.default.leftArrow:
	                    controls.moveLeft();
	                    break;
	                case _KeyCode2.default.upArrow:
	                    controls.moveUp();
	                    break;
	                case _KeyCode2.default.rightArrow:
	                    controls.moveRight();
	                    break;
	                case _KeyCode2.default.downArrow:
	                    controls.moveDown();
	                    break;
	            }
	        }
	    }, {
	        key: "moveFixedCamera",
	        value: function moveFixedCamera(keyCode) {
	            var controls = this.cameraControls["fixed"];
	            switch (keyCode) {
	                case _KeyCode2.default.leftArrow:
	                    controls.prev();
	                    break;
	                case _KeyCode2.default.upArrow:
	                    controls.next();
	                    break;
	                case _KeyCode2.default.rightArrow:
	                    controls.next();
	                    break;
	                case _KeyCode2.default.downArrow:
	                    controls.prev();
	                    break;
	            }
	        }
	    }, {
	        key: "movePolarCamera",
	        value: function movePolarCamera(keyCode) {
	            var controls = this.cameraControls["polar"];
	            switch (keyCode) {
	                case _KeyCode2.default.leftArrow:
	                    controls.polar.radius -= 20;
	                    break;
	                case _KeyCode2.default.upArrow:
	                    controls.polar.theta0 += 0.2;
	                    break;
	                case _KeyCode2.default.rightArrow:
	                    controls.polar.radius += 20;
	                    break;
	                case _KeyCode2.default.downArrow:
	                    controls.polar.theta0 -= 0.2;
	                    break;
	            }

	            controls.polar.radius = Math.max(10, controls.polar.radius);
	            controls.polar.radius = Math.min(controls.polar.radius, 1000);
	            controls.polar.theta0 = Math.max(0, controls.polar.theta0);
	            controls.polar.theta0 = Math.min(Math.PI * 0.45, controls.polar.theta0);
	        }
	    }, {
	        key: "osc",
	        value: function osc(address, data) {}
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            _get(ShibuyaStage.prototype.__proto__ || Object.getPrototypeOf(ShibuyaStage.prototype), "destroy", this).call(this);

	            if (this.composer) {
	                this.composer.renderTarget1.dispose();
	                this.composer.renderTarget2.dispose();
	            }
	        }
	    }, {
	        key: "bang",
	        value: function bang(duration) {
	            var beat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	        }
	    }, {
	        key: "render",
	        value: function render(renderer) {
	            if (this.composer) {
	                this.composer.render();
	            }
	        }
	    }, {
	        key: "createVideo",
	        value: function createVideo() {
	            var element = document.createElement("video");
	            element.style["pointer-events"] = "none";
	            element.style["display"] = "none";
	            document.body.appendChild(element);
	            return element;
	        }
	    }, {
	        key: "createScene",
	        value: function createScene(w, h) {
	            this.renderer.setClearColor(new THREE.Color("rgb(0, 0, 0)"));

	            this.camera = new THREE.PerspectiveCamera(60, w / h, 1.0, 10000);
	            this.camera.position.set(0, 50, 50);

	            this.composer = new THREE.EffectComposer(this.renderer);

	            var backgroundPass = new _BackgroundPass2.default();
	            this.updaters.push(backgroundPass);

	            var rpass = new THREE.RenderPass(this.scene, this.camera);
	            rpass.clear = false;rpass.clearDepth = true;

	            var composite = new _CompositePass2.default();
	            this.composite = composite;

	            this.updaters.push(composite);

	            this.composer.addPass(backgroundPass);
	            this.composer.addPass(rpass);
	            this.composer.addPass(composite);

	            var chromaticAberration = new THREE.ShaderPass({
	                vertexShader: __webpack_require__(37),
	                fragmentShader: __webpack_require__(58),
	                uniforms: {
	                    tDiffuse: { type: "t", value: null },
	                    distortion: { type: "f", value: 2.2 }
	                }
	            });
	            this.composer.addPass(chromaticAberration);

	            var passes = this.composer.passes;
	            passes[passes.length - 1].renderToScreen = true;

	            this.composer.setSize(w, h);
	        }
	    }, {
	        key: "resize",
	        value: function resize(w, h) {
	            _get(ShibuyaStage.prototype.__proto__ || Object.getPrototypeOf(ShibuyaStage.prototype), "resize", this).call(this, w, h);

	            if (this.camera) {
	                this.camera.aspect = w / h;
	                this.camera.updateProjectionMatrix();
	            }

	            if (this.composer) {
	                this.composer.setSize(w, h);
	            }
	        }
	    }, {
	        key: "load",
	        value: function load(path) {
	            return new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open("GET", path, true);
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState == 4) {
	                        // DONE
	                        var status = xhr.status;
	                        if (status == 200) {
	                            resolve(JSON.parse(xhr.responseText));
	                        } else {
	                            reject(status);
	                        }
	                    }
	                };
	                xhr.send();
	            });
	        }
	    }, {
	        key: "save",
	        value: function save(data, path) {
	            fs.writeFile(path, JSON.stringify(data));
	        }
	    }, {
	        key: "loadTexture",
	        value: function loadTexture(path) {
	            return new Promise(function (resolve, reject) {
	                var loader = new THREE.TextureLoader();
	                loader.load(path, function (texture) {
	                    resolve(texture);
	                });
	            });
	        }
	    }, {
	        key: "setupParticle",
	        value: function setupParticle() {
	            var _this3 = this;

	            return new Promise(function (resolve, reject) {
	                var system = new _SRParticleSystem2.default(_this3.renderer,
	                // 2 << 10,
	                // 2 << 11,
	                2 << 10,
	                // 4096,
	                {
	                    position: __webpack_require__(59),
	                    velocity: __webpack_require__(60),
	                    rotation: __webpack_require__(61),
	                    speed: 1.5,
	                    type: THREE.HalfFloatType
	                });

	                var loader = new THREE.TextureLoader();
	                loader.load("../dest/textures/particle.png", function (tex) {
	                    var particle = new _SRParticleMesh2.default(system.sideCount, 4, {
	                        vertexShader: __webpack_require__(62),
	                        fragmentShader: __webpack_require__(63)
	                    });

	                    particle.renderOrder = 1000;
	                    particle.size = 0.85;

	                    particle.material.uniforms.textureParticle.value = tex;
	                    particle.material.uniforms.texturePosition.value = system.position;
	                    particle.material.uniforms.textureVelocity.value = system.velocity;
	                    particle.material.uniforms.textureRotation.value = system.rotation;

	                    _this3.scene.add(particle);
	                    resolve(system, particle);
	                });

	                _this3.updaters.push(system);
	            });
	        }
	    }, {
	        key: "setupCity",
	        value: function setupCity() {
	            var _this4 = this;

	            return new Promise(function (resolve, reject) {
	                var city = new _CEL2.default();
	                city.setup().then(function () {
	                    city.wireframe = 0.25;
	                    city.speed = 0.4;

	                    var noise = city.noise;
	                    noise.x = 1.0;
	                    city.noise = noise;

	                    _this4.updaters.push(city);

	                    city.setupDepth(_this4.renderer);
	                    city.setMaterial("basic");
	                    _this4.scene.add(city);

	                    resolve(city);
	                });
	            });
	        }
	    }, {
	        key: "setupCrowd",
	        value: function setupCrowd(textureStreet, streetScale, streetOffset) {
	            var system = new _CrowdSystem2.default(this.renderer,
	            // 512,
	            1024,
	            // 2048,
	            // 4096,
	            {
	                position: __webpack_require__(64),
	                velocity: __webpack_require__(65),
	                rotation: __webpack_require__(66),
	                textureStreet: textureStreet,
	                type: THREE.FloatType
	            });

	            var equiToCube = new THREE.EquirectangularToCubemap(this.renderer);
	            var mesh = new _CrowdMesh2.default(
	            // "../dest/models/crowd/",
	            "../dest/models/crowd/", system.count, {
	                texturePosition: system.position,
	                textureVelocity: system.velocity,
	                textureRotation: system.rotation,
	                textureStreet: textureStreet,
	                streetScale: streetScale,
	                streetOffset: streetOffset,
	                equiToCube: equiToCube
	            });

	            mesh.scale.set(10, 10, 10);
	            mesh.position.set(0, 1, 0);
	            this.scene.add(mesh);

	            system.throttle = 1.0;

	            this.updaters.push(system);
	            this.updaters.push(mesh);

	            mesh.updateSystem(system);

	            return {
	                system: system,
	                mesh: mesh
	            };
	        }
	    }, {
	        key: "saveBoundaryOSM",
	        value: function saveBoundaryOSM(n, w, s, e, path) {
	            var map = new _OpenStreetMap2.default();
	            var boundary = new _OpenStreetMap.Boundary(n, w, s, e);
	            map.loadOSM(boundary).then(function (data) {
	                fs.writeFile(path, JSON.stringify(data));
	            });
	        }
	    }, {
	        key: "saveOSM",
	        value: function saveOSM(lon, lat, zoom, size, path) {
	            var map = new _OpenStreetMap2.default();
	            var tile = map.lonlatToTile(lon, lat, zoom);
	            var boundary = map.tileToBoundary(tile, size);
	            map.loadOSM(boundary).then(function (data) {
	                fs.writeFile(path, JSON.stringify(data));
	            });
	        }
	    }, {
	        key: "saveGSI",
	        value: function saveGSI(tile, path) {
	            var map = new _OpenStreetMap2.default();
	            map.loadGSI(tile).then(function (gsi) {
	                fs.writeFile(path, JSON.stringify(gsi));
	            });
	        }
	    }, {
	        key: "debugTexture",
	        value: function debugTexture(texture) {
	            var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
	            var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

	            var plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), new THREE.MeshBasicMaterial({
	                map: texture,
	                side: THREE.DoubleSide,
	                fog: false
	            }));
	            plane.scale.set(width, height, 1);
	            this.scene.add(plane);

	            return plane;
	        }
	    }]);

	    return ShibuyaStage;
	}(_Stage3.default);

	exports.default = ShibuyaStage;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(6);

	__webpack_require__(7);

	__webpack_require__(8);

	__webpack_require__(9);

	__webpack_require__(10);

	__webpack_require__(11);

	__webpack_require__(12);

	__webpack_require__(13);

	__webpack_require__(14);

	__webpack_require__(15);

	__webpack_require__(16);

	var _Tween = __webpack_require__(1);

	var _Tween2 = _interopRequireDefault(_Tween);

	var _perlin = __webpack_require__(17);

	var _perlin2 = _interopRequireDefault(_perlin);

	var _stats = __webpack_require__(18);

	var _stats2 = _interopRequireDefault(_stats);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Stage = function (_THREE$EventDispatche) {
	    _inherits(Stage, _THREE$EventDispatche);

	    function Stage(vj, resolution) {
	        _classCallCheck(this, Stage);

	        var _this = _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).call(this));

	        _this.scene = new THREE.Scene();
	        _this.renderer = vj.renderer;
	        _this.analyser = vj.analyser;
	        _this.resolution = resolution;

	        _this.indicator = document.getElementById("webvj--indicator");
	        return _this;
	    }

	    _createClass(Stage, [{
	        key: "init",
	        value: function init() {}
	    }, {
	        key: "update",
	        value: function update(dt, t, frame) {}
	    }, {
	        key: "destroy",
	        value: function destroy() {}
	    }, {
	        key: "bang",
	        value: function bang(duration, beat) {}
	    }, {
	        key: "input",
	        value: function input(keyCode) {}
	    }, {
	        key: "osc",
	        value: function osc(address, data) {
	            this.dispatchEvent({
	                type: "osc",
	                message: {
	                    address: address,
	                    data: data
	                }
	            });
	        }
	    }, {
	        key: "activate",
	        value: function activate(mode) {}
	    }, {
	        key: "deactivate",
	        value: function deactivate(mode) {}
	    }, {
	        key: "render",
	        value: function render(renderer) {}
	    }, {
	        key: "resize",
	        value: function resize(w, h) {}
	    }, {
	        key: "loadJSON",
	        value: function loadJSON(path) {
	            return new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open("GET", path, true);
	                xhr.onreadystatechange = function () {
	                    var status = void 0;
	                    var data = void 0;
	                    // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
	                    if (xhr.readyState == 4) {
	                        // `DONE`
	                        status = xhr.status;
	                        if (status == 200) {
	                            data = JSON.parse(xhr.responseText);
	                            resolve(data);
	                        } else {
	                            reject(status);
	                        }
	                    }
	                };
	                xhr.send();
	            });
	        }
	    }, {
	        key: "hideIndicator",
	        value: function hideIndicator() {
	            this.indicator.style.display = "none";
	        }
	    }]);

	    return Stage;
	}(THREE.EventDispatcher);

	exports.default = Stage;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */

	THREE.EffectComposer = function (renderer, renderTarget) {

		this.renderer = renderer;

		if (renderTarget === undefined) {

			var parameters = {
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBAFormat,
				stencilBuffer: false
			};
			var size = renderer.getSize();
			renderTarget = new THREE.WebGLRenderTarget(size.width, size.height, parameters);
			renderTarget.texture.name = "EffectComposer.rt1";
		}

		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();
		this.renderTarget2.texture.name = "EffectComposer.rt2";

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

		this.passes = [];

		if (THREE.CopyShader === undefined) console.error("THREE.EffectComposer relies on THREE.CopyShader");

		this.copyPass = new THREE.ShaderPass(THREE.CopyShader);
	};

	Object.assign(THREE.EffectComposer.prototype, {

		swapBuffers: function swapBuffers() {

			var tmp = this.readBuffer;
			this.readBuffer = this.writeBuffer;
			this.writeBuffer = tmp;
		},

		addPass: function addPass(pass) {

			this.passes.push(pass);

			var size = this.renderer.getSize();
			pass.setSize(size.width, size.height);
		},

		insertPass: function insertPass(pass, index) {

			this.passes.splice(index, 0, pass);
		},

		render: function render(delta) {

			var maskActive = false;

			var pass,
			    i,
			    il = this.passes.length;

			for (i = 0; i < il; i++) {

				pass = this.passes[i];

				if (pass.enabled === false) continue;

				pass.render(this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive);

				if (pass.needsSwap) {

					if (maskActive) {

						var context = this.renderer.context;

						context.stencilFunc(context.NOTEQUAL, 1, 0xffffffff);

						this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, delta);

						context.stencilFunc(context.EQUAL, 1, 0xffffffff);
					}

					this.swapBuffers();
				}

				if (THREE.MaskPass !== undefined) {

					if (pass instanceof THREE.MaskPass) {

						maskActive = true;
					} else if (pass instanceof THREE.ClearMaskPass) {

						maskActive = false;
					}
				}
			}
		},

		reset: function reset(renderTarget) {

			if (renderTarget === undefined) {

				var size = this.renderer.getSize();

				renderTarget = this.renderTarget1.clone();
				renderTarget.setSize(size.width, size.height);
			}

			this.renderTarget1.dispose();
			this.renderTarget2.dispose();
			this.renderTarget1 = renderTarget;
			this.renderTarget2 = renderTarget.clone();

			this.writeBuffer = this.renderTarget1;
			this.readBuffer = this.renderTarget2;
		},

		setSize: function setSize(width, height) {

			this.renderTarget1.setSize(width, height);
			this.renderTarget2.setSize(width, height);

			for (var i = 0; i < this.passes.length; i++) {

				this.passes[i].setSize(width, height);
			}
		}

	});

	THREE.Pass = function () {

		// if set to true, the pass is processed by the composer
		this.enabled = true;

		// if set to true, the pass indicates to swap read and write buffer after rendering
		this.needsSwap = true;

		// if set to true, the pass clears its buffer before rendering
		this.clear = false;

		// if set to true, the result of the pass is rendered to screen
		this.renderToScreen = false;
	};

	Object.assign(THREE.Pass.prototype, {

		setSize: function setSize(width, height) {},

		render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

			console.error("THREE.Pass: .render() must be implemented in derived pass.");
		}

	});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Full-screen textured quad shader
	 */

	THREE.CopyShader = {

		uniforms: {

			"tDiffuse": { value: null },
			"opacity": { value: 1.0 }

		},

		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

		fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "gl_FragColor = opacity * texel;", "}"].join("\n")

	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */

	THREE.RenderPass = function (scene, camera, overrideMaterial, clearColor, clearAlpha) {

		THREE.Pass.call(this);

		this.scene = scene;
		this.camera = camera;

		this.overrideMaterial = overrideMaterial;

		this.clearColor = clearColor;
		this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;

		this.clear = true;
		this.clearDepth = false;
		this.needsSwap = false;
	};

	THREE.RenderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

		constructor: THREE.RenderPass,

		render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

			var oldAutoClear = renderer.autoClear;
			renderer.autoClear = false;

			this.scene.overrideMaterial = this.overrideMaterial;

			var oldClearColor, oldClearAlpha;

			if (this.clearColor) {

				oldClearColor = renderer.getClearColor().getHex();
				oldClearAlpha = renderer.getClearAlpha();

				renderer.setClearColor(this.clearColor, this.clearAlpha);
			}

			if (this.clearDepth) {

				renderer.clearDepth();
			}

			renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer, this.clear);

			if (this.clearColor) {

				renderer.setClearColor(oldClearColor, oldClearAlpha);
			}

			this.scene.overrideMaterial = null;
			renderer.autoClear = oldAutoClear;
		}

	});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */

	THREE.ShaderPass = function (shader, textureID) {

		THREE.Pass.call(this);

		this.textureID = textureID !== undefined ? textureID : "tDiffuse";

		if (shader instanceof THREE.ShaderMaterial) {

			this.uniforms = shader.uniforms;

			this.material = shader;
		} else if (shader) {

			this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

			this.material = new THREE.ShaderMaterial({

				defines: shader.defines || {},
				uniforms: this.uniforms,
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader

			});
		}

		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		this.scene = new THREE.Scene();

		this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
		this.quad.frustumCulled = false; // Avoid getting clipped
		this.scene.add(this.quad);
	};

	THREE.ShaderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

		constructor: THREE.ShaderPass,

		render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

			if (this.uniforms[this.textureID]) {

				this.uniforms[this.textureID].value = readBuffer.texture;
			}

			this.quad.material = this.material;

			if (this.renderToScreen) {

				renderer.render(this.scene, this.camera);
			} else {

				renderer.render(this.scene, this.camera, writeBuffer, this.clear);
			}
		}

	});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */

	THREE.MaskPass = function (scene, camera) {

		THREE.Pass.call(this);

		this.scene = scene;
		this.camera = camera;

		this.clear = true;
		this.needsSwap = false;

		this.inverse = false;
	};

	THREE.MaskPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

		constructor: THREE.MaskPass,

		render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

			var context = renderer.context;
			var state = renderer.state;

			// don't update color or depth

			state.buffers.color.setMask(false);
			state.buffers.depth.setMask(false);

			// lock buffers

			state.buffers.color.setLocked(true);
			state.buffers.depth.setLocked(true);

			// set up stencil

			var writeValue, clearValue;

			if (this.inverse) {

				writeValue = 0;
				clearValue = 1;
			} else {

				writeValue = 1;
				clearValue = 0;
			}

			state.buffers.stencil.setTest(true);
			state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
			state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
			state.buffers.stencil.setClear(clearValue);

			// draw into the stencil buffer

			renderer.render(this.scene, this.camera, readBuffer, this.clear);
			renderer.render(this.scene, this.camera, writeBuffer, this.clear);

			// unlock color and depth buffer for subsequent rendering

			state.buffers.color.setLocked(false);
			state.buffers.depth.setLocked(false);

			// only render where stencil is set to 1

			state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff); // draw if == 1
			state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
		}

	});

	THREE.ClearMaskPass = function () {

		THREE.Pass.call(this);

		this.needsSwap = false;
	};

	THREE.ClearMaskPass.prototype = Object.create(THREE.Pass.prototype);

	Object.assign(THREE.ClearMaskPass.prototype, {

		render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

			renderer.state.buffers.stencil.setTest(false);
		}

	});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author mattatz / http://mattatz.github.io/
	 */

	THREE.BloomBlendPass = function (amount, opacity, resolution) {
	    THREE.Pass.call(this);

	    this.amount = amount !== undefined ? amount : 1.0;
	    this.opacity = opacity !== undefined ? opacity : 1.0;
	    this.resolution = resolution !== undefined ? resolution : new THREE.Vector2(512, 512);

	    // render targets

	    var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };

	    this.renderTargetX = new THREE.WebGLRenderTarget(this.resolution.x, this.resolution.y, pars);
	    this.renderTargetY = new THREE.WebGLRenderTarget(this.resolution.x, this.resolution.y, pars);

	    var kernel = ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n");

	    this.blurMaterial = new THREE.ShaderMaterial({
	        uniforms: {
	            "tDiffuse": { type: "t", value: null },
	            "increment": { type: "v2", value: new THREE.Vector2() }
	        },
	        vertexShader: kernel,
	        fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec2 increment;", "varying vec2 vUv;", "void main() {", "vec4 color = vec4(0.0);", "color += texture2D(tDiffuse, (vUv - increment * 4.0)) * 0.051;", "color += texture2D(tDiffuse, (vUv - increment * 3.0)) * 0.0918;", "color += texture2D(tDiffuse, (vUv - increment * 2.0)) * 0.12245;", "color += texture2D(tDiffuse, (vUv - increment * 1.0)) * 0.1531;", "color += texture2D(tDiffuse, (vUv + increment * 0.0)) * 0.1633;", "color += texture2D(tDiffuse, (vUv + increment * 1.0)) * 0.1531;", "color += texture2D(tDiffuse, (vUv + increment * 2.0)) * 0.12245;", "color += texture2D(tDiffuse, (vUv + increment * 3.0)) * 0.0918;", "color += texture2D(tDiffuse, (vUv + increment * 4.0)) * 0.051;", "gl_FragColor = color;", "}"].join("\n")
	    });

	    this.blendMaterial = new THREE.ShaderMaterial({
	        uniforms: {
	            "tDiffuse": { type: "t", value: null },
	            "tBlend": { type: "t", value: null },
	            "opacity": { type: "f", value: this.opacity }
	        },
	        vertexShader: kernel,
	        fragmentShader: ["uniform sampler2D tDiffuse;", "uniform sampler2D tBlend;", "uniform float opacity;", "varying vec2 vUv;", "void main() {", "vec4 base = texture2D(tDiffuse, vUv);", "vec4 blend = texture2D(tBlend, vUv);",

	        // screen blending
	        "vec4 color = (1.0 - ((1.0 - base) * (1.0 - blend)));", "gl_FragColor = color * opacity + base * ( 1. - opacity );", "}"].join("\n")
	    });

	    this.enabled = true;
	    this.needsSwap = true;
	    this.clear = false;

	    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	    this.scene = new THREE.Scene();

	    this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
	    this.scene.add(this.quad);
	};

	THREE.BloomBlendPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

	    constructor: THREE.BloomBlendPass,

	    render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

	        if (maskActive) renderer.context.disable(renderer.context.STENCIL_TEST);

	        this.quad.material = this.blurMaterial;

	        // horizontal blur
	        this.blurMaterial.uniforms["tDiffuse"].value = readBuffer;
	        this.blurMaterial.uniforms["increment"].value.set(this.amount / readBuffer.width, 0.0);

	        renderer.render(this.scene, this.camera, this.renderTargetX, false);

	        // vertical blur
	        this.blurMaterial.uniforms["tDiffuse"].value = this.renderTargetX;
	        this.blurMaterial.uniforms["increment"].value.set(0.0, this.amount / this.renderTargetX.height);

	        renderer.render(this.scene, this.camera, this.renderTargetY, false);

	        // screen blending original buffer and blurred buffer

	        this.quad.material = this.blendMaterial;

	        this.blendMaterial.uniforms["tDiffuse"].value = readBuffer;
	        this.blendMaterial.uniforms["tBlend"].value = this.renderTargetY;
	        this.blendMaterial.uniforms["opacity"].value = this.opacity;

	        if (maskActive) renderer.context.enable(renderer.context.STENCIL_TEST);

	        if (this.renderToScreen) {
	            renderer.render(this.scene, this.camera);
	        } else {
	            renderer.render(this.scene, this.camera, writeBuffer, this.clear);
	        }
	    }

	});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author mpk / http://polko.me/
	 */

	THREE.SMAAPass = function (width, height) {

		THREE.Pass.call(this);

		// render targets

		this.edgesRT = new THREE.WebGLRenderTarget(width, height, {
			depthBuffer: false,
			stencilBuffer: false,
			generateMipmaps: false,
			minFilter: THREE.LinearFilter,
			format: THREE.RGBFormat
		});
		this.edgesRT.texture.name = "SMAAPass.edges";

		this.weightsRT = new THREE.WebGLRenderTarget(width, height, {
			depthBuffer: false,
			stencilBuffer: false,
			generateMipmaps: false,
			minFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat
		});
		this.weightsRT.texture.name = "SMAAPass.weights";

		// textures

		var areaTextureImage = new Image();
		areaTextureImage.src = this.getAreaTexture();

		this.areaTexture = new THREE.Texture();
		this.areaTexture.name = "SMAAPass.area";
		this.areaTexture.image = areaTextureImage;
		this.areaTexture.format = THREE.RGBFormat;
		this.areaTexture.minFilter = THREE.LinearFilter;
		this.areaTexture.generateMipmaps = false;
		this.areaTexture.needsUpdate = true;
		this.areaTexture.flipY = false;

		var searchTextureImage = new Image();
		searchTextureImage.src = this.getSearchTexture();

		this.searchTexture = new THREE.Texture();
		this.searchTexture.name = "SMAAPass.search";
		this.searchTexture.image = searchTextureImage;
		this.searchTexture.magFilter = THREE.NearestFilter;
		this.searchTexture.minFilter = THREE.NearestFilter;
		this.searchTexture.generateMipmaps = false;
		this.searchTexture.needsUpdate = true;
		this.searchTexture.flipY = false;

		// materials - pass 1

		if (THREE.SMAAShader === undefined) {
			console.error("THREE.SMAAPass relies on THREE.SMAAShader");
		}

		this.uniformsEdges = THREE.UniformsUtils.clone(THREE.SMAAShader[0].uniforms);

		this.uniformsEdges["resolution"].value.set(1 / width, 1 / height);

		this.materialEdges = new THREE.ShaderMaterial({
			defines: THREE.SMAAShader[0].defines,
			uniforms: this.uniformsEdges,
			vertexShader: THREE.SMAAShader[0].vertexShader,
			fragmentShader: THREE.SMAAShader[0].fragmentShader
		});

		// materials - pass 2

		this.uniformsWeights = THREE.UniformsUtils.clone(THREE.SMAAShader[1].uniforms);

		this.uniformsWeights["resolution"].value.set(1 / width, 1 / height);
		this.uniformsWeights["tDiffuse"].value = this.edgesRT.texture;
		this.uniformsWeights["tArea"].value = this.areaTexture;
		this.uniformsWeights["tSearch"].value = this.searchTexture;

		this.materialWeights = new THREE.ShaderMaterial({
			defines: THREE.SMAAShader[1].defines,
			uniforms: this.uniformsWeights,
			vertexShader: THREE.SMAAShader[1].vertexShader,
			fragmentShader: THREE.SMAAShader[1].fragmentShader
		});

		// materials - pass 3

		this.uniformsBlend = THREE.UniformsUtils.clone(THREE.SMAAShader[2].uniforms);

		this.uniformsBlend["resolution"].value.set(1 / width, 1 / height);
		this.uniformsBlend["tDiffuse"].value = this.weightsRT.texture;

		this.materialBlend = new THREE.ShaderMaterial({
			uniforms: this.uniformsBlend,
			vertexShader: THREE.SMAAShader[2].vertexShader,
			fragmentShader: THREE.SMAAShader[2].fragmentShader
		});

		this.needsSwap = false;

		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		this.scene = new THREE.Scene();

		this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
		this.quad.frustumCulled = false; // Avoid getting clipped
		this.scene.add(this.quad);
	};

	THREE.SMAAPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

		constructor: THREE.SMAAPass,

		render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

			// pass 1

			this.uniformsEdges["tDiffuse"].value = readBuffer.texture;

			this.quad.material = this.materialEdges;

			renderer.render(this.scene, this.camera, this.edgesRT, this.clear);

			// pass 2

			this.quad.material = this.materialWeights;

			renderer.render(this.scene, this.camera, this.weightsRT, this.clear);

			// pass 3

			this.uniformsBlend["tColor"].value = readBuffer.texture;

			this.quad.material = this.materialBlend;

			if (this.renderToScreen) {

				renderer.render(this.scene, this.camera);
			} else {

				renderer.render(this.scene, this.camera, writeBuffer, this.clear);
			}
		},

		setSize: function setSize(width, height) {

			this.edgesRT.setSize(width, height);
			this.weightsRT.setSize(width, height);

			this.materialEdges.uniforms['resolution'].value.set(1 / width, 1 / height);
			this.materialWeights.uniforms['resolution'].value.set(1 / width, 1 / height);
			this.materialBlend.uniforms['resolution'].value.set(1 / width, 1 / height);
		},

		getAreaTexture: function getAreaTexture() {
			return 'data:image/png;base64,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';
		},

		getSearchTexture: function getSearchTexture() {
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII=';
		}

	});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author mpk / http://polko.me/
	 *
	 * WebGL port of Subpixel Morphological Antialiasing (SMAA) v2.8
	 * Preset: SMAA 1x Medium (with color edge detection)
	 * https://github.com/iryoku/smaa/releases/tag/v2.8
	 */

	THREE.SMAAShader = [{

				defines: {

							"SMAA_THRESHOLD": "0.1"

				},

				uniforms: {

							"tDiffuse": { value: null },
							"resolution": { value: new THREE.Vector2(1 / 1024, 1 / 512) }

				},

				vertexShader: ["uniform vec2 resolution;", "varying vec2 vUv;", "varying vec4 vOffset[ 3 ];", "void SMAAEdgeDetectionVS( vec2 texcoord ) {", "vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 );", // WebGL port note: Changed sign in W component
				"vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 );", // WebGL port note: Changed sign in W component
				"vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 );", // WebGL port note: Changed sign in W component
				"}", "void main() {", "vUv = uv;", "SMAAEdgeDetectionVS( vUv );", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

				fragmentShader: ["uniform sampler2D tDiffuse;", "varying vec2 vUv;", "varying vec4 vOffset[ 3 ];", "vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {", "vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );",

				// Calculate color deltas:
				"vec4 delta;", "vec3 C = texture2D( colorTex, texcoord ).rgb;", "vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;", "vec3 t = abs( C - Cleft );", "delta.x = max( max( t.r, t.g ), t.b );", "vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;", "t = abs( C - Ctop );", "delta.y = max( max( t.r, t.g ), t.b );",

				// We do the usual threshold:
				"vec2 edges = step( threshold, delta.xy );",

				// Then discard if there is no edge:
				"if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )", "discard;",

				// Calculate right and bottom deltas:
				"vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;", "t = abs( C - Cright );", "delta.z = max( max( t.r, t.g ), t.b );", "vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;", "t = abs( C - Cbottom );", "delta.w = max( max( t.r, t.g ), t.b );",

				// Calculate the maximum delta in the direct neighborhood:
				"float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );",

				// Calculate left-left and top-top deltas:
				"vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;", "t = abs( C - Cleftleft );", "delta.z = max( max( t.r, t.g ), t.b );", "vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;", "t = abs( C - Ctoptop );", "delta.w = max( max( t.r, t.g ), t.b );",

				// Calculate the final maximum delta:
				"maxDelta = max( max( maxDelta, delta.z ), delta.w );",

				// Local contrast adaptation in action:
				"edges.xy *= step( 0.5 * maxDelta, delta.xy );", "return vec4( edges, 0.0, 0.0 );", "}", "void main() {", "gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );", "}"].join("\n")

	}, {

				defines: {

							"SMAA_MAX_SEARCH_STEPS": "8",
							"SMAA_AREATEX_MAX_DISTANCE": "16",
							"SMAA_AREATEX_PIXEL_SIZE": "( 1.0 / vec2( 160.0, 560.0 ) )",
							"SMAA_AREATEX_SUBTEX_SIZE": "( 1.0 / 7.0 )"

				},

				uniforms: {

							"tDiffuse": { value: null },
							"tArea": { value: null },
							"tSearch": { value: null },
							"resolution": { value: new THREE.Vector2(1 / 1024, 1 / 512) }

				},

				vertexShader: ["uniform vec2 resolution;", "varying vec2 vUv;", "varying vec4 vOffset[ 3 ];", "varying vec2 vPixcoord;", "void SMAABlendingWeightCalculationVS( vec2 texcoord ) {", "vPixcoord = texcoord / resolution;",

				// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
				"vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 );", // WebGL port note: Changed sign in Y and W components
				"vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 );", // WebGL port note: Changed sign in Y and W components

				// And these for the searches, they indicate the ends of the loops:
				"vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );", "}", "void main() {", "vUv = uv;", "SMAABlendingWeightCalculationVS( vUv );", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

				fragmentShader: ["#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )", "uniform sampler2D tDiffuse;", "uniform sampler2D tArea;", "uniform sampler2D tSearch;", "uniform vec2 resolution;", "varying vec2 vUv;", "varying vec4 vOffset[3];", "varying vec2 vPixcoord;", "vec2 round( vec2 x ) {", "return sign( x ) * floor( abs( x ) + 0.5 );", "}", "float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {",
				// Not required if searchTex accesses are set to point:
				// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
				// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
				//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
				"e.r = bias + e.r * scale;", "return 255.0 * texture2D( searchTex, e, 0.0 ).r;", "}", "float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {",
				/**
	   * @PSEUDO_GATHER4
	   * This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
	   * sample between edge, thus fetching four edges in a row.
	   * Sampling with different offsets in each direction allows to disambiguate
	   * which edges are active from the four fetched ones.
	   */
				"vec2 e = vec2( 0.0, 1.0 );", "for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) {", // WebGL port note: Changed while to for
				"e = texture2D( edgesTex, texcoord, 0.0 ).rg;", "texcoord -= vec2( 2.0, 0.0 ) * resolution;", "if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;", "}",

				// We correct the previous (-0.25, -0.125) offset we applied:
				"texcoord.x += 0.25 * resolution.x;",

				// The searches are bias by 1, so adjust the coords accordingly:
				"texcoord.x += resolution.x;",

				// Disambiguate the length added by the last step:
				"texcoord.x += 2.0 * resolution.x;", // Undo last step
				"texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);", "return texcoord.x;", "}", "float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {", "vec2 e = vec2( 0.0, 1.0 );", "for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) {", // WebGL port note: Changed while to for
				"e = texture2D( edgesTex, texcoord, 0.0 ).rg;", "texcoord += vec2( 2.0, 0.0 ) * resolution;", "if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;", "}", "texcoord.x -= 0.25 * resolution.x;", "texcoord.x -= resolution.x;", "texcoord.x -= 2.0 * resolution.x;", "texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );", "return texcoord.x;", "}", "float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {", "vec2 e = vec2( 1.0, 0.0 );", "for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) {", // WebGL port note: Changed while to for
				"e = texture2D( edgesTex, texcoord, 0.0 ).rg;", "texcoord += vec2( 0.0, 2.0 ) * resolution;", // WebGL port note: Changed sign
				"if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;", "}", "texcoord.y -= 0.25 * resolution.y;", // WebGL port note: Changed sign
				"texcoord.y -= resolution.y;", // WebGL port note: Changed sign
				"texcoord.y -= 2.0 * resolution.y;", // WebGL port note: Changed sign
				"texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 );", // WebGL port note: Changed sign

				"return texcoord.y;", "}", "float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {", "vec2 e = vec2( 1.0, 0.0 );", "for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) {", // WebGL port note: Changed while to for
				"e = texture2D( edgesTex, texcoord, 0.0 ).rg;", "texcoord -= vec2( 0.0, 2.0 ) * resolution;", // WebGL port note: Changed sign
				"if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;", "}", "texcoord.y += 0.25 * resolution.y;", // WebGL port note: Changed sign
				"texcoord.y += resolution.y;", // WebGL port note: Changed sign
				"texcoord.y += 2.0 * resolution.y;", // WebGL port note: Changed sign
				"texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 );", // WebGL port note: Changed sign

				"return texcoord.y;", "}", "vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {",
				// Rounding prevents precision errors of bilinear filtering:
				"vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;",

				// We do a scale and bias for mapping to texel space:
				"texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );",

				// Move to proper place, according to the subpixel offset:
				"texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;", "return texture2D( areaTex, texcoord, 0.0 ).rg;", "}", "vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {", "vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );", "vec2 e = texture2D( edgesTex, texcoord ).rg;", "if ( e.g > 0.0 ) {", // Edge at north
				"vec2 d;",

				// Find the distance to the left:
				"vec2 coords;", "coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );", "coords.y = offset[ 1 ].y;", // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				"d.x = coords.x;",

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				"float e1 = texture2D( edgesTex, coords, 0.0 ).r;",

				// Find the distance to the right:
				"coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );", "d.y = coords.x;",

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				"d = d / resolution.x - pixcoord.x;",

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				"vec2 sqrt_d = sqrt( abs( d ) );",

				// Fetch the right crossing edges:
				"coords.y -= 1.0 * resolution.y;", // WebGL port note: Added
				"float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;",

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				"weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );", "}", "if ( e.r > 0.0 ) {", // Edge at west
				"vec2 d;",

				// Find the distance to the top:
				"vec2 coords;", "coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );", "coords.x = offset[ 0 ].x;", // offset[1].x = texcoord.x - 0.25 * resolution.x;
				"d.x = coords.y;",

				// Fetch the top crossing edges:
				"float e1 = texture2D( edgesTex, coords, 0.0 ).g;",

				// Find the distance to the bottom:
				"coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );", "d.y = coords.y;",

				// We want the distances to be in pixel units:
				"d = d / resolution.y - pixcoord.y;",

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				"vec2 sqrt_d = sqrt( abs( d ) );",

				// Fetch the bottom crossing edges:
				"coords.y -= 1.0 * resolution.y;", // WebGL port note: Added
				"float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;",

				// Get the area for this direction:
				"weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );", "}", "return weights;", "}", "void main() {", "gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );", "}"].join("\n")

	}, {

				uniforms: {

							"tDiffuse": { value: null },
							"tColor": { value: null },
							"resolution": { value: new THREE.Vector2(1 / 1024, 1 / 512) }

				},

				vertexShader: ["uniform vec2 resolution;", "varying vec2 vUv;", "varying vec4 vOffset[ 2 ];", "void SMAANeighborhoodBlendingVS( vec2 texcoord ) {", "vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 );", // WebGL port note: Changed sign in W component
				"vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 );", // WebGL port note: Changed sign in W component
				"}", "void main() {", "vUv = uv;", "SMAANeighborhoodBlendingVS( vUv );", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

				fragmentShader: ["uniform sampler2D tDiffuse;", "uniform sampler2D tColor;", "uniform vec2 resolution;", "varying vec2 vUv;", "varying vec4 vOffset[ 2 ];", "vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {",
				// Fetch the blending weights for current pixel:
				"vec4 a;", "a.xz = texture2D( blendTex, texcoord ).xz;", "a.y = texture2D( blendTex, offset[ 1 ].zw ).g;", "a.w = texture2D( blendTex, offset[ 1 ].xy ).a;",

				// Is there any blending weight with a value greater than 0.0?
				"if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {", "return texture2D( colorTex, texcoord, 0.0 );", "} else {",
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				"vec2 offset;", "offset.x = a.a > a.b ? a.a : -a.b;", // left vs. right
				"offset.y = a.g > a.r ? -a.g : a.r;", // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				"if ( abs( offset.x ) > abs( offset.y )) {", // horizontal vs. vertical
				"offset.y = 0.0;", "} else {", "offset.x = 0.0;", "}",

				// Fetch the opposite color and lerp by hand:
				"vec4 C = texture2D( colorTex, texcoord, 0.0 );", "texcoord += sign( offset ) * resolution;", "vec4 Cop = texture2D( colorTex, texcoord, 0.0 );", "float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );",

				// WebGL port note: Added gamma correction
				"C.xyz = pow(C.xyz, vec3(2.2));", "Cop.xyz = pow(Cop.xyz, vec3(2.2));", "vec4 mixed = mix(C, Cop, s);", "mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));", "return mixed;", "}", "}", "void main() {", "gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );", "}"].join("\n")

	}];

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author alteredq / http://alteredqualia.com/
	 */

	THREE.FilmPass = function (noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale) {

		THREE.Pass.call(this);

		if (THREE.FilmShader === undefined) console.error("THREE.FilmPass relies on THREE.FilmShader");

		var shader = THREE.FilmShader;

		this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);

		this.material = new THREE.ShaderMaterial({

			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		});

		if (grayscale !== undefined) this.uniforms.grayscale.value = grayscale;
		if (noiseIntensity !== undefined) this.uniforms.nIntensity.value = noiseIntensity;
		if (scanlinesIntensity !== undefined) this.uniforms.sIntensity.value = scanlinesIntensity;
		if (scanlinesCount !== undefined) this.uniforms.sCount.value = scanlinesCount;

		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		this.scene = new THREE.Scene();

		this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
		this.quad.frustumCulled = false; // Avoid getting clipped
		this.scene.add(this.quad);
	};

	THREE.FilmPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {

		constructor: THREE.FilmPass,

		render: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {

			this.uniforms["tDiffuse"].value = readBuffer.texture;
			this.uniforms["time"].value += delta;

			this.quad.material = this.material;

			if (this.renderToScreen) {

				renderer.render(this.scene, this.camera);
			} else {

				renderer.render(this.scene, this.camera, writeBuffer, this.clear);
			}
		}

	});

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @author alteredq / http://alteredqualia.com/
	 *
	 * Film grain & scanlines shader
	 *
	 * - ported from HLSL to WebGL / GLSL
	 * http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
	 *
	 * Screen Space Static Postprocessor
	 *
	 * Produces an analogue noise overlay similar to a film grain / TV static
	 *
	 * Original implementation and noise algorithm
	 * Pat 'Hawthorne' Shearon
	 *
	 * Optimized scanlines + noise version with intensity scaling
	 * Georg 'Leviathan' Steinrohder
	 *
	 * This version is provided under a Creative Commons Attribution 3.0 License
	 * http://creativecommons.org/licenses/by/3.0/
	 */

	THREE.FilmShader = {

		uniforms: {

			"tDiffuse": { value: null },
			"time": { value: 0.0 },
			"nIntensity": { value: 0.5 },
			"sIntensity": { value: 0.05 },
			"sCount": { value: 4096 },
			"grayscale": { value: 1 }

		},

		vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),

		fragmentShader: ["#include <common>",

		// control parameter
		"uniform float time;", "uniform bool grayscale;",

		// noise effect intensity value (0 = no effect, 1 = full effect)
		"uniform float nIntensity;",

		// scanlines effect intensity value (0 = no effect, 1 = full effect)
		"uniform float sIntensity;",

		// scanlines effect count value (0 = no effect, 4096 = full effect)
		"uniform float sCount;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {",

		// sample the source
		"vec4 cTextureScreen = texture2D( tDiffuse, vUv );",

		// make some noise
		"float dx = rand( vUv + time );",

		// add noise
		"vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );",

		// get us a sine and cosine
		"vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );",

		// add scanlines
		"cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;",

		// interpolate between source and result by intensity
		"cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );",

		// convert to grayscale if desired
		"if( grayscale ) {", "cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );", "}", "gl_FragColor =  vec4( cResult, cTextureScreen.a );", "}"].join("\n")

	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * @author Eberhard Graether / http://egraether.com/
	 * @author Mark Lundin 	/ http://mark-lundin.com
	 * @author Simone Manini / http://daron1337.github.io
	 * @author Luca Antiga 	/ http://lantiga.github.io
	 */

	THREE.TrackballControls = function (object, domElement) {

		var _this = this;
		var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

		this.object = object;
		this.domElement = domElement !== undefined ? domElement : document;

		// API

		this.enabled = true;

		this.screen = { left: 0, top: 0, width: 0, height: 0 };

		this.rotateSpeed = 1.0;
		this.zoomSpeed = 1.2;
		this.panSpeed = 0.3;

		this.noRotate = false;
		this.noZoom = false;
		this.noPan = false;

		this.staticMoving = false;
		this.dynamicDampingFactor = 0.2;

		this.minDistance = 0;
		this.maxDistance = Infinity;

		this.keys = [65 /*A*/, 83 /*S*/, 68 /*D*/];

		// internals

		this.target = new THREE.Vector3();

		var EPS = 0.000001;

		var lastPosition = new THREE.Vector3();

		var _state = STATE.NONE,
		    _prevState = STATE.NONE,
		    _eye = new THREE.Vector3(),
		    _movePrev = new THREE.Vector2(),
		    _moveCurr = new THREE.Vector2(),
		    _lastAxis = new THREE.Vector3(),
		    _lastAngle = 0,
		    _zoomStart = new THREE.Vector2(),
		    _zoomEnd = new THREE.Vector2(),
		    _touchZoomDistanceStart = 0,
		    _touchZoomDistanceEnd = 0,
		    _panStart = new THREE.Vector2(),
		    _panEnd = new THREE.Vector2();

		// for reset

		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.up0 = this.object.up.clone();

		// events

		var changeEvent = { type: 'change' };
		var startEvent = { type: 'start' };
		var endEvent = { type: 'end' };

		// methods

		this.handleResize = function () {

			if (this.domElement === document) {

				this.screen.left = 0;
				this.screen.top = 0;
				this.screen.width = window.innerWidth;
				this.screen.height = window.innerHeight;
			} else {

				var box = this.domElement.getBoundingClientRect();
				// adjustments come from similar code in the jquery offset() function
				var d = this.domElement.ownerDocument.documentElement;
				this.screen.left = box.left + window.pageXOffset - d.clientLeft;
				this.screen.top = box.top + window.pageYOffset - d.clientTop;
				this.screen.width = box.width;
				this.screen.height = box.height;
			}
		};

		this.handleEvent = function (event) {

			if (typeof this[event.type] == 'function') {

				this[event.type](event);
			}
		};

		var getMouseOnScreen = function () {

			var vector = new THREE.Vector2();

			return function getMouseOnScreen(pageX, pageY) {

				vector.set((pageX - _this.screen.left) / _this.screen.width, (pageY - _this.screen.top) / _this.screen.height);

				return vector;
			};
		}();

		var getMouseOnCircle = function () {

			var vector = new THREE.Vector2();

			return function getMouseOnCircle(pageX, pageY) {

				vector.set((pageX - _this.screen.width * 0.5 - _this.screen.left) / (_this.screen.width * 0.5), (_this.screen.height + 2 * (_this.screen.top - pageY)) / _this.screen.width // screen.width intentional
				);

				return vector;
			};
		}();

		this.rotateCamera = function () {

			var axis = new THREE.Vector3(),
			    quaternion = new THREE.Quaternion(),
			    eyeDirection = new THREE.Vector3(),
			    objectUpDirection = new THREE.Vector3(),
			    objectSidewaysDirection = new THREE.Vector3(),
			    moveDirection = new THREE.Vector3(),
			    angle;

			return function rotateCamera() {

				moveDirection.set(_moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0);
				angle = moveDirection.length();

				if (angle) {

					_eye.copy(_this.object.position).sub(_this.target);

					eyeDirection.copy(_eye).normalize();
					objectUpDirection.copy(_this.object.up).normalize();
					objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();

					objectUpDirection.setLength(_moveCurr.y - _movePrev.y);
					objectSidewaysDirection.setLength(_moveCurr.x - _movePrev.x);

					moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));

					axis.crossVectors(moveDirection, _eye).normalize();

					angle *= _this.rotateSpeed;
					quaternion.setFromAxisAngle(axis, angle);

					_eye.applyQuaternion(quaternion);
					_this.object.up.applyQuaternion(quaternion);

					_lastAxis.copy(axis);
					_lastAngle = angle;
				} else if (!_this.staticMoving && _lastAngle) {

					_lastAngle *= Math.sqrt(1.0 - _this.dynamicDampingFactor);
					_eye.copy(_this.object.position).sub(_this.target);
					quaternion.setFromAxisAngle(_lastAxis, _lastAngle);
					_eye.applyQuaternion(quaternion);
					_this.object.up.applyQuaternion(quaternion);
				}

				_movePrev.copy(_moveCurr);
			};
		}();

		this.zoomCamera = function () {

			var factor;

			if (_state === STATE.TOUCH_ZOOM_PAN) {

				factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
				_touchZoomDistanceStart = _touchZoomDistanceEnd;
				_eye.multiplyScalar(factor);
			} else {

				factor = 1.0 + (_zoomEnd.y - _zoomStart.y) * _this.zoomSpeed;

				if (factor !== 1.0 && factor > 0.0) {

					_eye.multiplyScalar(factor);
				}

				if (_this.staticMoving) {

					_zoomStart.copy(_zoomEnd);
				} else {

					_zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;
				}
			}
		};

		this.panCamera = function () {

			var mouseChange = new THREE.Vector2(),
			    objectUp = new THREE.Vector3(),
			    pan = new THREE.Vector3();

			return function panCamera() {

				mouseChange.copy(_panEnd).sub(_panStart);

				if (mouseChange.lengthSq()) {

					mouseChange.multiplyScalar(_eye.length() * _this.panSpeed);

					pan.copy(_eye).cross(_this.object.up).setLength(mouseChange.x);
					pan.add(objectUp.copy(_this.object.up).setLength(mouseChange.y));

					_this.object.position.add(pan);
					_this.target.add(pan);

					if (_this.staticMoving) {

						_panStart.copy(_panEnd);
					} else {

						_panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
					}
				}
			};
		}();

		this.checkDistances = function () {

			if (!_this.noZoom || !_this.noPan) {

				if (_eye.lengthSq() > _this.maxDistance * _this.maxDistance) {

					_this.object.position.addVectors(_this.target, _eye.setLength(_this.maxDistance));
					_zoomStart.copy(_zoomEnd);
				}

				if (_eye.lengthSq() < _this.minDistance * _this.minDistance) {

					_this.object.position.addVectors(_this.target, _eye.setLength(_this.minDistance));
					_zoomStart.copy(_zoomEnd);
				}
			}
		};

		this.update = function () {

			_eye.subVectors(_this.object.position, _this.target);

			if (!_this.noRotate) {

				_this.rotateCamera();
			}

			if (!_this.noZoom) {

				_this.zoomCamera();
			}

			if (!_this.noPan) {

				_this.panCamera();
			}

			_this.object.position.addVectors(_this.target, _eye);

			_this.checkDistances();

			_this.object.lookAt(_this.target);

			if (lastPosition.distanceToSquared(_this.object.position) > EPS) {

				_this.dispatchEvent(changeEvent);

				lastPosition.copy(_this.object.position);
			}
		};

		this.reset = function () {

			_state = STATE.NONE;
			_prevState = STATE.NONE;

			_this.target.copy(_this.target0);
			_this.object.position.copy(_this.position0);
			_this.object.up.copy(_this.up0);

			_eye.subVectors(_this.object.position, _this.target);

			_this.object.lookAt(_this.target);

			_this.dispatchEvent(changeEvent);

			lastPosition.copy(_this.object.position);
		};

		// listeners

		function keydown(event) {

			if (_this.enabled === false) return;

			window.removeEventListener('keydown', keydown);

			_prevState = _state;

			if (_state !== STATE.NONE) {

				return;
			} else if (event.keyCode === _this.keys[STATE.ROTATE] && !_this.noRotate) {

				_state = STATE.ROTATE;
			} else if (event.keyCode === _this.keys[STATE.ZOOM] && !_this.noZoom) {

				_state = STATE.ZOOM;
			} else if (event.keyCode === _this.keys[STATE.PAN] && !_this.noPan) {

				_state = STATE.PAN;
			}
		}

		function keyup(event) {

			if (_this.enabled === false) return;

			_state = _prevState;

			window.addEventListener('keydown', keydown, false);
		}

		function mousedown(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			if (_state === STATE.NONE) {

				_state = event.button;
			}

			if (_state === STATE.ROTATE && !_this.noRotate) {

				_moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
				_movePrev.copy(_moveCurr);
			} else if (_state === STATE.ZOOM && !_this.noZoom) {

				_zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));
				_zoomEnd.copy(_zoomStart);
			} else if (_state === STATE.PAN && !_this.noPan) {

				_panStart.copy(getMouseOnScreen(event.pageX, event.pageY));
				_panEnd.copy(_panStart);
			}

			document.addEventListener('mousemove', mousemove, false);
			document.addEventListener('mouseup', mouseup, false);

			_this.dispatchEvent(startEvent);
		}

		function mousemove(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			if (_state === STATE.ROTATE && !_this.noRotate) {

				_movePrev.copy(_moveCurr);
				_moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
			} else if (_state === STATE.ZOOM && !_this.noZoom) {

				_zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
			} else if (_state === STATE.PAN && !_this.noPan) {

				_panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
			}
		}

		function mouseup(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			_state = STATE.NONE;

			document.removeEventListener('mousemove', mousemove);
			document.removeEventListener('mouseup', mouseup);
			_this.dispatchEvent(endEvent);
		}

		function mousewheel(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			switch (event.deltaMode) {

				case 2:
					// Zoom in pages
					_zoomStart.y -= event.deltaY * 0.025;
					break;

				case 1:
					// Zoom in lines
					_zoomStart.y -= event.deltaY * 0.01;
					break;

				default:
					// undefined, 0, assume pixels
					_zoomStart.y -= event.deltaY * 0.00025;
					break;

			}

			_this.dispatchEvent(startEvent);
			_this.dispatchEvent(endEvent);
		}

		function touchstart(event) {

			if (_this.enabled === false) return;

			switch (event.touches.length) {

				case 1:
					_state = STATE.TOUCH_ROTATE;
					_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
					_movePrev.copy(_moveCurr);
					break;

				default:
					// 2 or more
					_state = STATE.TOUCH_ZOOM_PAN;
					var dx = event.touches[0].pageX - event.touches[1].pageX;
					var dy = event.touches[0].pageY - event.touches[1].pageY;
					_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

					var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
					var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
					_panStart.copy(getMouseOnScreen(x, y));
					_panEnd.copy(_panStart);
					break;

			}

			_this.dispatchEvent(startEvent);
		}

		function touchmove(event) {

			if (_this.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			switch (event.touches.length) {

				case 1:
					_movePrev.copy(_moveCurr);
					_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
					break;

				default:
					// 2 or more
					var dx = event.touches[0].pageX - event.touches[1].pageX;
					var dy = event.touches[0].pageY - event.touches[1].pageY;
					_touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

					var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
					var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
					_panEnd.copy(getMouseOnScreen(x, y));
					break;

			}
		}

		function touchend(event) {

			if (_this.enabled === false) return;

			switch (event.touches.length) {

				case 0:
					_state = STATE.NONE;
					break;

				case 1:
					_state = STATE.TOUCH_ROTATE;
					_moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
					_movePrev.copy(_moveCurr);
					break;

			}

			_this.dispatchEvent(endEvent);
		}

		function contextmenu(event) {

			event.preventDefault();
		}

		this.dispose = function () {

			this.domElement.removeEventListener('contextmenu', contextmenu, false);
			this.domElement.removeEventListener('mousedown', mousedown, false);
			this.domElement.removeEventListener('wheel', mousewheel, false);

			this.domElement.removeEventListener('touchstart', touchstart, false);
			this.domElement.removeEventListener('touchend', touchend, false);
			this.domElement.removeEventListener('touchmove', touchmove, false);

			document.removeEventListener('mousemove', mousemove, false);
			document.removeEventListener('mouseup', mouseup, false);

			window.removeEventListener('keydown', keydown, false);
			window.removeEventListener('keyup', keyup, false);
		};

		this.domElement.addEventListener('contextmenu', contextmenu, false);
		this.domElement.addEventListener('mousedown', mousedown, false);
		this.domElement.addEventListener('wheel', mousewheel, false);

		this.domElement.addEventListener('touchstart', touchstart, false);
		this.domElement.addEventListener('touchend', touchend, false);
		this.domElement.addEventListener('touchmove', touchmove, false);

		window.addEventListener('keydown', keydown, false);
		window.addEventListener('keyup', keyup, false);

		this.handleResize();

		// force an update at start
		this.update();
	};

	THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
	THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	 * A speed-improved perlin and simplex noise algorithms for 2D.
	 *
	 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
	 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
	 * Better rank ordering method by Stefan Gustavson in 2012.
	 * Converted to Javascript by Joseph Gentle.
	 *
	 * Version 2012-03-09
	 *
	 * This code was placed in the public domain by its original author,
	 * Stefan Gustavson. You may use it as you see fit, but
	 * attribution is appreciated.
	 *
	 */

	var _module = {};

	function Grad(x, y, z) {
	    this.x = x;this.y = y;this.z = z;
	}

	Grad.prototype.dot2 = function (x, y) {
	    return this.x * x + this.y * y;
	};

	Grad.prototype.dot3 = function (x, y, z) {
	    return this.x * x + this.y * y + this.z * z;
	};

	var grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];

	var p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
	// To remove the need for index wrapping, double the permutation table length
	var perm = new Array(512);
	var gradP = new Array(512);

	// This isn't a very good seeding function, but it works ok. It supports 2^16
	// different seed values. Write something better if you need more seeds.
	_module.seed = function (seed) {
	    if (seed > 0 && seed < 1) {
	        // Scale the seed out
	        seed *= 65536;
	    }

	    seed = Math.floor(seed);
	    if (seed < 256) {
	        seed |= seed << 8;
	    }

	    for (var i = 0; i < 256; i++) {
	        var v;
	        if (i & 1) {
	            v = p[i] ^ seed & 255;
	        } else {
	            v = p[i] ^ seed >> 8 & 255;
	        }

	        perm[i] = perm[i + 256] = v;
	        gradP[i] = gradP[i + 256] = grad3[v % 12];
	    }
	};

	_module.seed(0);

	/*
	  for(var i=0; i<256; i++) {
	    perm[i] = perm[i + 256] = p[i];
	    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
	  }*/

	// Skewing and unskewing factors for 2, 3, and 4 dimensions
	var F2 = 0.5 * (Math.sqrt(3) - 1);
	var G2 = (3 - Math.sqrt(3)) / 6;

	var F3 = 1 / 3;
	var G3 = 1 / 6;

	// 2D simplex noise
	_module.simplex2 = function (xin, yin) {
	    var n0, n1, n2; // Noise contributions from the three corners
	    // Skew the input space to determine which simplex cell we're in
	    var s = (xin + yin) * F2; // Hairy factor for 2D
	    var i = Math.floor(xin + s);
	    var j = Math.floor(yin + s);
	    var t = (i + j) * G2;
	    var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
	    var y0 = yin - j + t;
	    // For the 2D case, the simplex shape is an equilateral triangle.
	    // Determine which simplex we are in.
	    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
	    if (x0 > y0) {
	        // lower triangle, XY order: (0,0)->(1,0)->(1,1)
	        i1 = 1;j1 = 0;
	    } else {
	        // upper triangle, YX order: (0,0)->(0,1)->(1,1)
	        i1 = 0;j1 = 1;
	    }
	    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
	    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
	    // c = (3-sqrt(3))/6
	    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
	    var y1 = y0 - j1 + G2;
	    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
	    var y2 = y0 - 1 + 2 * G2;
	    // Work out the hashed gradient indices of the three simplex corners
	    i &= 255;
	    j &= 255;
	    var gi0 = gradP[i + perm[j]];
	    var gi1 = gradP[i + i1 + perm[j + j1]];
	    var gi2 = gradP[i + 1 + perm[j + 1]];
	    // Calculate the contribution from the three corners
	    var t0 = 0.5 - x0 * x0 - y0 * y0;
	    if (t0 < 0) {
	        n0 = 0;
	    } else {
	        t0 *= t0;
	        n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
	    }
	    var t1 = 0.5 - x1 * x1 - y1 * y1;
	    if (t1 < 0) {
	        n1 = 0;
	    } else {
	        t1 *= t1;
	        n1 = t1 * t1 * gi1.dot2(x1, y1);
	    }
	    var t2 = 0.5 - x2 * x2 - y2 * y2;
	    if (t2 < 0) {
	        n2 = 0;
	    } else {
	        t2 *= t2;
	        n2 = t2 * t2 * gi2.dot2(x2, y2);
	    }
	    // Add contributions from each corner to get the final noise value.
	    // The result is scaled to return values in the interval [-1,1].
	    return 70 * (n0 + n1 + n2);
	};

	// 3D simplex noise
	_module.simplex3 = function (xin, yin, zin) {
	    var n0, n1, n2, n3; // Noise contributions from the four corners

	    // Skew the input space to determine which simplex cell we're in
	    var s = (xin + yin + zin) * F3; // Hairy factor for 2D
	    var i = Math.floor(xin + s);
	    var j = Math.floor(yin + s);
	    var k = Math.floor(zin + s);

	    var t = (i + j + k) * G3;
	    var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
	    var y0 = yin - j + t;
	    var z0 = zin - k + t;

	    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
	    // Determine which simplex we are in.
	    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
	    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
	    if (x0 >= y0) {
	        if (y0 >= z0) {
	            i1 = 1;j1 = 0;k1 = 0;i2 = 1;j2 = 1;k2 = 0;
	        } else if (x0 >= z0) {
	            i1 = 1;j1 = 0;k1 = 0;i2 = 1;j2 = 0;k2 = 1;
	        } else {
	            i1 = 0;j1 = 0;k1 = 1;i2 = 1;j2 = 0;k2 = 1;
	        }
	    } else {
	        if (y0 < z0) {
	            i1 = 0;j1 = 0;k1 = 1;i2 = 0;j2 = 1;k2 = 1;
	        } else if (x0 < z0) {
	            i1 = 0;j1 = 1;k1 = 0;i2 = 0;j2 = 1;k2 = 1;
	        } else {
	            i1 = 0;j1 = 1;k1 = 0;i2 = 1;j2 = 1;k2 = 0;
	        }
	    }
	    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
	    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
	    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
	    // c = 1/6.
	    var x1 = x0 - i1 + G3; // Offsets for second corner
	    var y1 = y0 - j1 + G3;
	    var z1 = z0 - k1 + G3;

	    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
	    var y2 = y0 - j2 + 2 * G3;
	    var z2 = z0 - k2 + 2 * G3;

	    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
	    var y3 = y0 - 1 + 3 * G3;
	    var z3 = z0 - 1 + 3 * G3;

	    // Work out the hashed gradient indices of the four simplex corners
	    i &= 255;
	    j &= 255;
	    k &= 255;
	    var gi0 = gradP[i + perm[j + perm[k]]];
	    var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
	    var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
	    var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];

	    // Calculate the contribution from the four corners
	    var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
	    if (t0 < 0) {
	        n0 = 0;
	    } else {
	        t0 *= t0;
	        n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
	    }
	    var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
	    if (t1 < 0) {
	        n1 = 0;
	    } else {
	        t1 *= t1;
	        n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
	    }
	    var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
	    if (t2 < 0) {
	        n2 = 0;
	    } else {
	        t2 *= t2;
	        n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
	    }
	    var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
	    if (t3 < 0) {
	        n3 = 0;
	    } else {
	        t3 *= t3;
	        n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
	    }
	    // Add contributions from each corner to get the final noise value.
	    // The result is scaled to return values in the interval [-1,1].
	    return 32 * (n0 + n1 + n2 + n3);
	};

	// ##### Perlin noise stuff

	function fade(t) {
	    return t * t * t * (t * (t * 6 - 15) + 10);
	}

	function lerp(a, b, t) {
	    return (1 - t) * a + t * b;
	}

	// 2D Perlin Noise
	_module.perlin2 = function (x, y) {
	    // Find unit grid cell containing point
	    var X = Math.floor(x),
	        Y = Math.floor(y);
	    // Get relative xy coordinates of point within that cell
	    x = x - X;y = y - Y;
	    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
	    X = X & 255;Y = Y & 255;

	    // Calculate noise contributions from each of the four corners
	    var n00 = gradP[X + perm[Y]].dot2(x, y);
	    var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
	    var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
	    var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);

	    // Compute the fade curve value for x
	    var u = fade(x);

	    // Interpolate the four results
	    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
	};

	// 3D Perlin Noise
	_module.perlin3 = function (x, y, z) {
	    // Find unit grid cell containing point
	    var X = Math.floor(x),
	        Y = Math.floor(y),
	        Z = Math.floor(z);
	    // Get relative xyz coordinates of point within that cell
	    x = x - X;y = y - Y;z = z - Z;
	    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
	    X = X & 255;Y = Y & 255;Z = Z & 255;

	    // Calculate noise contributions from each of the eight corners
	    var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
	    var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
	    var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
	    var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
	    var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
	    var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
	    var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
	    var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1);

	    // Compute the fade curve value for x, y, z
	    var u = fade(x);
	    var v = fade(y);
	    var w = fade(z);

	    // Interpolate
	    return lerp(lerp(lerp(n000, n100, u), lerp(n001, n101, u), w), lerp(lerp(n010, n110, u), lerp(n011, n111, u), w), v);
	};

	exports.default = _module;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// stats.js - http://github.com/mrdoob/stats.js
	var Stats = function Stats() {
	  function h(a) {
	    c.appendChild(a.dom);return a;
	  }function k(a) {
	    for (var d = 0; d < c.children.length; d++) {
	      c.children[d].style.display = d === a ? "block" : "none";
	    }l = a;
	  }var l = 0,
	      c = document.createElement("div");c.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click", function (a) {
	    a.preventDefault();k(++l % c.children.length);
	  }, !1);var g = (performance || Date).now(),
	      e = g,
	      a = 0,
	      r = h(new Stats.Panel("FPS", "#0ff", "#002")),
	      f = h(new Stats.Panel("MS", "#0f0", "#020"));
	  if (self.performance && self.performance.memory) var t = h(new Stats.Panel("MB", "#f08", "#201"));k(0);return { REVISION: 16, dom: c, addPanel: h, showPanel: k, begin: function begin() {
	      g = (performance || Date).now();
	    }, end: function end() {
	      a++;var c = (performance || Date).now();f.update(c - g, 200);if (c > e + 1E3 && (r.update(1E3 * a / (c - e), 100), e = c, a = 0, t)) {
	        var d = performance.memory;t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576);
	      }return c;
	    }, update: function update() {
	      g = this.end();
	    }, domElement: c, setMode: k };
	};
	Stats.Panel = function (h, k, l) {
	  var c = Infinity,
	      g = 0,
	      e = Math.round,
	      a = e(window.devicePixelRatio || 1),
	      r = 80 * a,
	      f = 48 * a,
	      t = 3 * a,
	      u = 2 * a,
	      d = 3 * a,
	      m = 15 * a,
	      n = 74 * a,
	      p = 30 * a,
	      q = document.createElement("canvas");q.width = r;q.height = f;q.style.cssText = "width:80px;height:48px";var b = q.getContext("2d");b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";b.textBaseline = "top";b.fillStyle = l;b.fillRect(0, 0, r, f);b.fillStyle = k;b.fillText(h, t, u);b.fillRect(d, m, n, p);b.fillStyle = l;b.globalAlpha = .9;b.fillRect(d, m, n, p);return { dom: q, update: function update(f, v) {
	      c = Math.min(c, f);g = Math.max(g, f);b.fillStyle = l;b.globalAlpha = 1;b.fillRect(0, 0, r, m);b.fillStyle = k;b.fillText(e(f) + " " + h + " (" + e(c) + "-" + e(g) + ")", t, u);b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);b.fillRect(d + n - a, m, a, p);b.fillStyle = l;b.globalAlpha = .9;b.fillRect(d + n - a, m, a, e((1 - f / v) * p));
	    } };
	};"object" === ( false ? "undefined" : _typeof(module)) && (module.exports = Stats);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)(module)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	THREE.OBJLoader = function (manager) {

		this.manager = manager !== undefined ? manager : THREE.DefaultLoadingManager;

		this.materials = null;

		this.regexp = {
			// v float float float
			vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
			// vn float float float
			normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
			// vt float float
			uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
			// f vertex vertex vertex
			face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
			// f vertex/uv vertex/uv vertex/uv
			face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
			// f vertex/uv/normal vertex/uv/normal vertex/uv/normal
			face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
			// f vertex//normal vertex//normal vertex//normal
			face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
			// o object_name | g group_name
			object_pattern: /^[og]\s*(.+)?/,
			// s boolean
			smoothing_pattern: /^s\s+(\d+|on|off)/,
			// mtllib file_reference
			material_library_pattern: /^mtllib /,
			// usemtl material_name
			material_use_pattern: /^usemtl /
		};
	};

	THREE.OBJLoader.prototype = {

		constructor: THREE.OBJLoader,

		load: function load(url, onLoad, onProgress, onError) {

			var scope = this;

			var loader = new THREE.FileLoader(scope.manager);
			loader.setPath(this.path);
			loader.load(url, function (text) {

				onLoad(scope.parse(text));
			}, onProgress, onError);
		},

		setPath: function setPath(value) {

			this.path = value;
		},

		setMaterials: function setMaterials(materials) {

			this.materials = materials;
		},

		_createParserState: function _createParserState() {

			var state = {
				objects: [],
				object: {},

				vertices: [],
				normals: [],
				uvs: [],

				materialLibraries: [],

				startObject: function startObject(name, fromDeclaration) {

					// If the current object (initial from reset) is not from a g/o declaration in the parsed
					// file. We need to use it for the first parsed g/o to keep things in sync.
					if (this.object && this.object.fromDeclaration === false) {

						this.object.name = name;
						this.object.fromDeclaration = fromDeclaration !== false;
						return;
					}

					var previousMaterial = this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined;

					if (this.object && typeof this.object._finalize === 'function') {

						this.object._finalize(true);
					}

					this.object = {
						name: name || '',
						fromDeclaration: fromDeclaration !== false,

						geometry: {
							vertices: [],
							normals: [],
							uvs: []
						},
						materials: [],
						smooth: true,

						startMaterial: function startMaterial(name, libraries) {

							var previous = this._finalize(false);

							// New usemtl declaration overwrites an inherited material, except if faces were declared
							// after the material, then it must be preserved for proper MultiMaterial continuation.
							if (previous && (previous.inherited || previous.groupCount <= 0)) {

								this.materials.splice(previous.index, 1);
							}

							var material = {
								index: this.materials.length,
								name: name || '',
								mtllib: Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : '',
								smooth: previous !== undefined ? previous.smooth : this.smooth,
								groupStart: previous !== undefined ? previous.groupEnd : 0,
								groupEnd: -1,
								groupCount: -1,
								inherited: false,

								clone: function clone(index) {
									var cloned = {
										index: typeof index === 'number' ? index : this.index,
										name: this.name,
										mtllib: this.mtllib,
										smooth: this.smooth,
										groupStart: 0,
										groupEnd: -1,
										groupCount: -1,
										inherited: false
									};
									cloned.clone = this.clone.bind(cloned);
									return cloned;
								}
							};

							this.materials.push(material);

							return material;
						},

						currentMaterial: function currentMaterial() {

							if (this.materials.length > 0) {
								return this.materials[this.materials.length - 1];
							}

							return undefined;
						},

						_finalize: function _finalize(end) {

							var lastMultiMaterial = this.currentMaterial();
							if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {

								lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
								lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
								lastMultiMaterial.inherited = false;
							}

							// Ignore objects tail materials if no face declarations followed them before a new o/g started.
							if (end && this.materials.length > 1) {

								for (var mi = this.materials.length - 1; mi >= 0; mi--) {
									if (this.materials[mi].groupCount <= 0) {
										this.materials.splice(mi, 1);
									}
								}
							}

							// Guarantee at least one empty material, this makes the creation later more straight forward.
							if (end && this.materials.length === 0) {

								this.materials.push({
									name: '',
									smooth: this.smooth
								});
							}

							return lastMultiMaterial;
						}
					};

					// Inherit previous objects material.
					// Spec tells us that a declared material must be set to all objects until a new material is declared.
					// If a usemtl declaration is encountered while this new object is being parsed, it will
					// overwrite the inherited material. Exception being that there was already face declarations
					// to the inherited material, then it will be preserved for proper MultiMaterial continuation.

					if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === "function") {

						var declared = previousMaterial.clone(0);
						declared.inherited = true;
						this.object.materials.push(declared);
					}

					this.objects.push(this.object);
				},

				finalize: function finalize() {

					if (this.object && typeof this.object._finalize === 'function') {

						this.object._finalize(true);
					}
				},

				parseVertexIndex: function parseVertexIndex(value, len) {

					var index = parseInt(value, 10);
					return (index >= 0 ? index - 1 : index + len / 3) * 3;
				},

				parseNormalIndex: function parseNormalIndex(value, len) {

					var index = parseInt(value, 10);
					return (index >= 0 ? index - 1 : index + len / 3) * 3;
				},

				parseUVIndex: function parseUVIndex(value, len) {

					var index = parseInt(value, 10);
					return (index >= 0 ? index - 1 : index + len / 2) * 2;
				},

				addVertex: function addVertex(a, b, c) {
					var src = this.vertices;
					var dst = this.object.geometry.vertices;

					dst.push(src[a + 0]);
					dst.push(src[a + 1]);
					dst.push(src[a + 2]);
					dst.push(src[b + 0]);
					dst.push(src[b + 1]);
					dst.push(src[b + 2]);
					dst.push(src[c + 0]);
					dst.push(src[c + 1]);
					dst.push(src[c + 2]);
				},

				addVertexLine: function addVertexLine(a) {

					var src = this.vertices;
					var dst = this.object.geometry.vertices;

					dst.push(src[a + 0]);
					dst.push(src[a + 1]);
					dst.push(src[a + 2]);
				},

				addNormal: function addNormal(a, b, c) {

					var src = this.normals;
					var dst = this.object.geometry.normals;

					dst.push(src[a + 0]);
					dst.push(src[a + 1]);
					dst.push(src[a + 2]);
					dst.push(src[b + 0]);
					dst.push(src[b + 1]);
					dst.push(src[b + 2]);
					dst.push(src[c + 0]);
					dst.push(src[c + 1]);
					dst.push(src[c + 2]);
				},

				addUV: function addUV(a, b, c) {

					var src = this.uvs;
					var dst = this.object.geometry.uvs;

					dst.push(src[a + 0]);
					dst.push(src[a + 1]);
					dst.push(src[b + 0]);
					dst.push(src[b + 1]);
					dst.push(src[c + 0]);
					dst.push(src[c + 1]);
				},

				addUVLine: function addUVLine(a) {

					var src = this.uvs;
					var dst = this.object.geometry.uvs;

					dst.push(src[a + 0]);
					dst.push(src[a + 1]);
				},

				addFace: function addFace(a, b, c, d, ua, ub, uc, ud, na, nb, nc, nd) {

					var vLen = this.vertices.length;

					var ia = this.parseVertexIndex(a, vLen);
					var ib = this.parseVertexIndex(b, vLen);
					var ic = this.parseVertexIndex(c, vLen);
					var id;

					if (d === undefined) {

						this.addVertex(ia, ib, ic);
					} else {

						id = this.parseVertexIndex(d, vLen);

						this.addVertex(ia, ib, id);
						this.addVertex(ib, ic, id);
					}

					if (ua !== undefined) {

						var uvLen = this.uvs.length;

						ia = this.parseUVIndex(ua, uvLen);
						ib = this.parseUVIndex(ub, uvLen);
						ic = this.parseUVIndex(uc, uvLen);

						if (d === undefined) {

							this.addUV(ia, ib, ic);
						} else {

							id = this.parseUVIndex(ud, uvLen);

							this.addUV(ia, ib, id);
							this.addUV(ib, ic, id);
						}
					}

					if (na !== undefined) {

						// Normals are many times the same. If so, skip function call and parseInt.
						var nLen = this.normals.length;
						ia = this.parseNormalIndex(na, nLen);

						ib = na === nb ? ia : this.parseNormalIndex(nb, nLen);
						ic = na === nc ? ia : this.parseNormalIndex(nc, nLen);

						if (d === undefined) {

							this.addNormal(ia, ib, ic);
						} else {

							id = this.parseNormalIndex(nd, nLen);

							this.addNormal(ia, ib, id);
							this.addNormal(ib, ic, id);
						}
					}
				},

				addLineGeometry: function addLineGeometry(vertices, uvs) {

					this.object.geometry.type = 'Line';

					var vLen = this.vertices.length;
					var uvLen = this.uvs.length;

					for (var vi = 0, l = vertices.length; vi < l; vi++) {

						this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));
					}

					for (var uvi = 0, l = uvs.length; uvi < l; uvi++) {

						this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));
					}
				}

			};

			state.startObject('', false);

			return state;
		},

		parse: function parse(text) {

			console.time('OBJLoader');

			var state = this._createParserState();

			if (text.indexOf('\r\n') !== -1) {

				// This is faster than String.split with regex that splits on both
				text = text.replace(/\r\n/g, '\n');
			}

			if (text.indexOf('\\\n') !== -1) {

				// join lines separated by a line continuation character (\)
				text = text.replace(/\\\n/g, '');
			}

			var lines = text.split('\n');
			var line = '',
			    lineFirstChar = '',
			    lineSecondChar = '';
			var lineLength = 0;
			var result = [];

			// Faster to just trim left side of the line. Use if available.
			var trimLeft = typeof ''.trimLeft === 'function';

			for (var i = 0, l = lines.length; i < l; i++) {

				line = lines[i];

				line = trimLeft ? line.trimLeft() : line.trim();

				lineLength = line.length;

				if (lineLength === 0) continue;

				lineFirstChar = line.charAt(0);

				// @todo invoke passed in handler if any
				if (lineFirstChar === '#') continue;

				if (lineFirstChar === 'v') {

					lineSecondChar = line.charAt(1);

					if (lineSecondChar === ' ' && (result = this.regexp.vertex_pattern.exec(line)) !== null) {

						// 0                  1      2      3
						// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

						state.vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
					} else if (lineSecondChar === 'n' && (result = this.regexp.normal_pattern.exec(line)) !== null) {

						// 0                   1      2      3
						// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

						state.normals.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
					} else if (lineSecondChar === 't' && (result = this.regexp.uv_pattern.exec(line)) !== null) {

						// 0               1      2
						// ["vt 0.1 0.2", "0.1", "0.2"]

						state.uvs.push(parseFloat(result[1]), parseFloat(result[2]));
					} else {

						throw new Error("Unexpected vertex/normal/uv line: '" + line + "'");
					}
				} else if (lineFirstChar === "f") {

					if ((result = this.regexp.face_vertex_uv_normal.exec(line)) !== null) {

						// f vertex/uv/normal vertex/uv/normal vertex/uv/normal
						// 0                        1    2    3    4    5    6    7    8    9   10         11         12
						// ["f 1/1/1 2/2/2 3/3/3", "1", "1", "1", "2", "2", "2", "3", "3", "3", undefined, undefined, undefined]

						state.addFace(result[1], result[4], result[7], result[10], result[2], result[5], result[8], result[11], result[3], result[6], result[9], result[12]);
					} else if ((result = this.regexp.face_vertex_uv.exec(line)) !== null) {

						// f vertex/uv vertex/uv vertex/uv
						// 0                  1    2    3    4    5    6   7          8
						// ["f 1/1 2/2 3/3", "1", "1", "2", "2", "3", "3", undefined, undefined]

						state.addFace(result[1], result[3], result[5], result[7], result[2], result[4], result[6], result[8]);
					} else if ((result = this.regexp.face_vertex_normal.exec(line)) !== null) {

						// f vertex//normal vertex//normal vertex//normal
						// 0                     1    2    3    4    5    6   7          8
						// ["f 1//1 2//2 3//3", "1", "1", "2", "2", "3", "3", undefined, undefined]

						state.addFace(result[1], result[3], result[5], result[7], undefined, undefined, undefined, undefined, result[2], result[4], result[6], result[8]);
					} else if ((result = this.regexp.face_vertex.exec(line)) !== null) {

						// f vertex vertex vertex
						// 0            1    2    3   4
						// ["f 1 2 3", "1", "2", "3", undefined]

						state.addFace(result[1], result[2], result[3], result[4]);
					} else {

						throw new Error("Unexpected face line: '" + line + "'");
					}
				} else if (lineFirstChar === "l") {

					var lineParts = line.substring(1).trim().split(" ");
					var lineVertices = [],
					    lineUVs = [];

					if (line.indexOf("/") === -1) {

						lineVertices = lineParts;
					} else {

						for (var li = 0, llen = lineParts.length; li < llen; li++) {

							var parts = lineParts[li].split("/");

							if (parts[0] !== "") lineVertices.push(parts[0]);
							if (parts[1] !== "") lineUVs.push(parts[1]);
						}
					}
					state.addLineGeometry(lineVertices, lineUVs);
				} else if ((result = this.regexp.object_pattern.exec(line)) !== null) {

					// o object_name
					// or
					// g group_name

					// WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
					// var name = result[ 0 ].substr( 1 ).trim();
					var name = (" " + result[0].substr(1).trim()).substr(1);

					state.startObject(name);
				} else if (this.regexp.material_use_pattern.test(line)) {

					// material

					state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);
				} else if (this.regexp.material_library_pattern.test(line)) {

					// mtl file

					state.materialLibraries.push(line.substring(7).trim());
				} else if ((result = this.regexp.smoothing_pattern.exec(line)) !== null) {

					// smooth shading

					// @todo Handle files that have varying smooth values for a set of faces inside one geometry,
					// but does not define a usemtl for each face set.
					// This should be detected and a dummy material created (later MultiMaterial and geometry groups).
					// This requires some care to not create extra material on each smooth value for "normal" obj files.
					// where explicit usemtl defines geometry groups.
					// Example asset: examples/models/obj/cerberus/Cerberus.obj

					var value = result[1].trim().toLowerCase();
					state.object.smooth = value === '1' || value === 'on';

					var material = state.object.currentMaterial();
					if (material) {

						material.smooth = state.object.smooth;
					}
				} else {

					// Handle null terminated files without exception
					if (line === '\0') continue;

					throw new Error("Unexpected line: '" + line + "'");
				}
			}

			state.finalize();

			var container = new THREE.Group();
			container.materialLibraries = [].concat(state.materialLibraries);

			for (var i = 0, l = state.objects.length; i < l; i++) {

				var object = state.objects[i];
				var geometry = object.geometry;
				var materials = object.materials;
				var isLine = geometry.type === 'Line';

				// Skip o/g line declarations that did not follow with any faces
				if (geometry.vertices.length === 0) continue;

				var buffergeometry = new THREE.BufferGeometry();

				buffergeometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(geometry.vertices), 3));

				if (geometry.normals.length > 0) {

					buffergeometry.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(geometry.normals), 3));
				} else {

					buffergeometry.computeVertexNormals();
				}

				if (geometry.uvs.length > 0) {

					buffergeometry.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(geometry.uvs), 2));
				}

				// Create materials

				var createdMaterials = [];

				for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {

					var sourceMaterial = materials[mi];
					var material = undefined;

					if (this.materials !== null) {

						material = this.materials.create(sourceMaterial.name);

						// mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.
						if (isLine && material && !(material instanceof THREE.LineBasicMaterial)) {

							var materialLine = new THREE.LineBasicMaterial();
							materialLine.copy(material);
							material = materialLine;
						}
					}

					if (!material) {

						material = !isLine ? new THREE.MeshPhongMaterial() : new THREE.LineBasicMaterial();
						material.name = sourceMaterial.name;
					}

					material.shading = sourceMaterial.smooth ? THREE.SmoothShading : THREE.FlatShading;

					createdMaterials.push(material);
				}

				// Create mesh

				var mesh;

				if (createdMaterials.length > 1) {

					for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {

						var sourceMaterial = materials[mi];
						buffergeometry.addGroup(sourceMaterial.groupStart, sourceMaterial.groupCount, mi);
					}

					mesh = !isLine ? new THREE.Mesh(buffergeometry, createdMaterials) : new THREE.LineSegments(buffergeometry, createdMaterials);
				} else {

					mesh = !isLine ? new THREE.Mesh(buffergeometry, createdMaterials[0]) : new THREE.LineSegments(buffergeometry, createdMaterials[0]);
				}

				mesh.name = object.name;

				container.add(mesh);
			}

			console.timeEnd('OBJLoader');

			return container;
		}

	};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */

	// This set of controls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - left mouse / touch: one finger move
	//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
	//    Pan - right mouse, or arrow keys / touch: three finger swipe

	THREE.OrbitControls = function (object, domElement) {

		this.object = object;

		this.domElement = domElement !== undefined ? domElement : document;

		// Set to false to disable this control
		this.enabled = true;

		// "target" sets the location of focus, where the object orbits around
		this.target = new THREE.Vector3();

		// How far you can dolly in and out ( PerspectiveCamera only )
		this.minDistance = 0;
		this.maxDistance = Infinity;

		// How far you can zoom in and out ( OrthographicCamera only )
		this.minZoom = 0;
		this.maxZoom = Infinity;

		// How far you can orbit vertically, upper and lower limits.
		// Range is 0 to Math.PI radians.
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians

		// How far you can orbit horizontally, upper and lower limits.
		// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
		this.minAzimuthAngle = -Infinity; // radians
		this.maxAzimuthAngle = Infinity; // radians

		// Set to true to enable damping (inertia)
		// If damping is enabled, you must call controls.update() in your animation loop
		this.enableDamping = false;
		this.dampingFactor = 0.25;

		// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
		// Set to false to disable zooming
		this.enableZoom = true;
		this.zoomSpeed = 1.0;

		// Set to false to disable rotating
		this.enableRotate = true;
		this.rotateSpeed = 1.0;

		// Set to false to disable panning
		this.enablePan = true;
		this.keyPanSpeed = 7.0; // pixels moved per arrow key push

		// Set to true to automatically rotate around the target
		// If auto-rotate is enabled, you must call controls.update() in your animation loop
		this.autoRotate = false;
		this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

		// Set to false to disable use of the keys
		this.enableKeys = true;

		// The four arrow keys
		this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

		// Mouse buttons
		this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

		// for reset
		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.zoom0 = this.object.zoom;

		//
		// public methods
		//

		this.getPolarAngle = function () {

			return spherical.phi;
		};

		this.getAzimuthalAngle = function () {

			return spherical.theta;
		};

		this.saveState = function () {

			scope.target0.copy(scope.target);
			scope.position0.copy(scope.object.position);
			scope.zoom0 = scope.object.zoom;
		};

		this.reset = function () {

			scope.target.copy(scope.target0);
			scope.object.position.copy(scope.position0);
			scope.object.zoom = scope.zoom0;

			scope.object.updateProjectionMatrix();
			scope.dispatchEvent(changeEvent);

			scope.update();

			state = STATE.NONE;
		};

		// this method is exposed, but perhaps it would be better if we can make it private...
		this.update = function () {

			var offset = new THREE.Vector3();

			// so camera.up is the orbit axis
			var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
			var quatInverse = quat.clone().inverse();

			var lastPosition = new THREE.Vector3();
			var lastQuaternion = new THREE.Quaternion();

			return function update() {

				var position = scope.object.position;

				offset.copy(position).sub(scope.target);

				// rotate offset to "y-axis-is-up" space
				offset.applyQuaternion(quat);

				// angle from z-axis around y-axis
				spherical.setFromVector3(offset);

				if (scope.autoRotate && state === STATE.NONE) {

					rotateLeft(getAutoRotationAngle());
				}

				spherical.theta += sphericalDelta.theta;
				spherical.phi += sphericalDelta.phi;

				// restrict theta to be between desired limits
				spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta));

				// restrict phi to be between desired limits
				spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));

				spherical.makeSafe();

				spherical.radius *= scale;

				// restrict radius to be between desired limits
				spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius));

				// move target to panned location
				scope.target.add(panOffset);

				offset.setFromSpherical(spherical);

				// rotate offset back to "camera-up-vector-is-up" space
				offset.applyQuaternion(quatInverse);

				position.copy(scope.target).add(offset);

				scope.object.lookAt(scope.target);

				if (scope.enableDamping === true) {

					sphericalDelta.theta *= 1 - scope.dampingFactor;
					sphericalDelta.phi *= 1 - scope.dampingFactor;
				} else {

					sphericalDelta.set(0, 0, 0);
				}

				scale = 1;
				panOffset.set(0, 0, 0);

				// update condition is:
				// min(camera displacement, camera rotation in radians)^2 > EPS
				// using small-angle approximation cos(x/2) = 1 - x^2 / 8

				if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {

					scope.dispatchEvent(changeEvent);

					lastPosition.copy(scope.object.position);
					lastQuaternion.copy(scope.object.quaternion);
					zoomChanged = false;

					return true;
				}

				return false;
			};
		}();

		this.dispose = function () {

			scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
			scope.domElement.removeEventListener('mousedown', onMouseDown, false);
			scope.domElement.removeEventListener('wheel', onMouseWheel, false);

			scope.domElement.removeEventListener('touchstart', onTouchStart, false);
			scope.domElement.removeEventListener('touchend', onTouchEnd, false);
			scope.domElement.removeEventListener('touchmove', onTouchMove, false);

			document.removeEventListener('mousemove', onMouseMove, false);
			document.removeEventListener('mouseup', onMouseUp, false);

			window.removeEventListener('keydown', onKeyDown, false);

			//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
		};

		//
		// internals
		//

		var scope = this;

		var changeEvent = { type: 'change' };
		var startEvent = { type: 'start' };
		var endEvent = { type: 'end' };

		var STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

		var state = STATE.NONE;

		var EPS = 0.000001;

		// current position in spherical coordinates
		var spherical = new THREE.Spherical();
		var sphericalDelta = new THREE.Spherical();

		var scale = 1;
		var panOffset = new THREE.Vector3();
		var zoomChanged = false;

		var rotateStart = new THREE.Vector2();
		var rotateEnd = new THREE.Vector2();
		var rotateDelta = new THREE.Vector2();

		var panStart = new THREE.Vector2();
		var panEnd = new THREE.Vector2();
		var panDelta = new THREE.Vector2();

		var dollyStart = new THREE.Vector2();
		var dollyEnd = new THREE.Vector2();
		var dollyDelta = new THREE.Vector2();

		function getAutoRotationAngle() {

			return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
		}

		function getZoomScale() {

			return Math.pow(0.95, scope.zoomSpeed);
		}

		function rotateLeft(angle) {

			sphericalDelta.theta -= angle;
		}

		function rotateUp(angle) {

			sphericalDelta.phi -= angle;
		}

		var panLeft = function () {

			var v = new THREE.Vector3();

			return function panLeft(distance, objectMatrix) {

				v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
				v.multiplyScalar(-distance);

				panOffset.add(v);
			};
		}();

		var panUp = function () {

			var v = new THREE.Vector3();

			return function panUp(distance, objectMatrix) {

				v.setFromMatrixColumn(objectMatrix, 1); // get Y column of objectMatrix
				v.multiplyScalar(distance);

				panOffset.add(v);
			};
		}();

		// deltaX and deltaY are in pixels; right and down are positive
		var pan = function () {

			var offset = new THREE.Vector3();

			return function pan(deltaX, deltaY) {

				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

				if (scope.object instanceof THREE.PerspectiveCamera) {

					// perspective
					var position = scope.object.position;
					offset.copy(position).sub(scope.target);
					var targetDistance = offset.length();

					// half of the fov is center to top of screen
					targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0);

					// we actually don't use screenWidth, since perspective camera is fixed to screen height
					panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
					panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
				} else if (scope.object instanceof THREE.OrthographicCamera) {

					// orthographic
					panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
					panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
				} else {

					// camera neither orthographic nor perspective
					console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
					scope.enablePan = false;
				}
			};
		}();

		function dollyIn(dollyScale) {

			if (scope.object instanceof THREE.PerspectiveCamera) {

				scale /= dollyScale;
			} else if (scope.object instanceof THREE.OrthographicCamera) {

				scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
				scope.object.updateProjectionMatrix();
				zoomChanged = true;
			} else {

				console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
				scope.enableZoom = false;
			}
		}

		function dollyOut(dollyScale) {

			if (scope.object instanceof THREE.PerspectiveCamera) {

				scale *= dollyScale;
			} else if (scope.object instanceof THREE.OrthographicCamera) {

				scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
				scope.object.updateProjectionMatrix();
				zoomChanged = true;
			} else {

				console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
				scope.enableZoom = false;
			}
		}

		//
		// event callbacks - update the object state
		//

		function handleMouseDownRotate(event) {

			//console.log( 'handleMouseDownRotate' );

			rotateStart.set(event.clientX, event.clientY);
		}

		function handleMouseDownDolly(event) {

			//console.log( 'handleMouseDownDolly' );

			dollyStart.set(event.clientX, event.clientY);
		}

		function handleMouseDownPan(event) {

			//console.log( 'handleMouseDownPan' );

			panStart.set(event.clientX, event.clientY);
		}

		function handleMouseMoveRotate(event) {

			//console.log( 'handleMouseMoveRotate' );

			rotateEnd.set(event.clientX, event.clientY);
			rotateDelta.subVectors(rotateEnd, rotateStart);

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			// rotating across whole screen goes 360 degrees around
			rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);

			// rotating up and down along whole screen attempts to go 360, but limited to 180
			rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

			rotateStart.copy(rotateEnd);

			scope.update();
		}

		function handleMouseMoveDolly(event) {

			//console.log( 'handleMouseMoveDolly' );

			dollyEnd.set(event.clientX, event.clientY);

			dollyDelta.subVectors(dollyEnd, dollyStart);

			if (dollyDelta.y > 0) {

				dollyIn(getZoomScale());
			} else if (dollyDelta.y < 0) {

				dollyOut(getZoomScale());
			}

			dollyStart.copy(dollyEnd);

			scope.update();
		}

		function handleMouseMovePan(event) {

			//console.log( 'handleMouseMovePan' );

			panEnd.set(event.clientX, event.clientY);

			panDelta.subVectors(panEnd, panStart);

			pan(panDelta.x, panDelta.y);

			panStart.copy(panEnd);

			scope.update();
		}

		function handleMouseUp(event) {

			// console.log( 'handleMouseUp' );

		}

		function handleMouseWheel(event) {

			// console.log( 'handleMouseWheel' );

			if (event.deltaY < 0) {

				dollyOut(getZoomScale());
			} else if (event.deltaY > 0) {

				dollyIn(getZoomScale());
			}

			scope.update();
		}

		function handleKeyDown(event) {

			//console.log( 'handleKeyDown' );

			switch (event.keyCode) {

				case scope.keys.UP:
					pan(0, scope.keyPanSpeed);
					scope.update();
					break;

				case scope.keys.BOTTOM:
					pan(0, -scope.keyPanSpeed);
					scope.update();
					break;

				case scope.keys.LEFT:
					pan(scope.keyPanSpeed, 0);
					scope.update();
					break;

				case scope.keys.RIGHT:
					pan(-scope.keyPanSpeed, 0);
					scope.update();
					break;

			}
		}

		function handleTouchStartRotate(event) {

			//console.log( 'handleTouchStartRotate' );

			rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
		}

		function handleTouchStartDolly(event) {

			//console.log( 'handleTouchStartDolly' );

			var dx = event.touches[0].pageX - event.touches[1].pageX;
			var dy = event.touches[0].pageY - event.touches[1].pageY;

			var distance = Math.sqrt(dx * dx + dy * dy);

			dollyStart.set(0, distance);
		}

		function handleTouchStartPan(event) {

			//console.log( 'handleTouchStartPan' );

			panStart.set(event.touches[0].pageX, event.touches[0].pageY);
		}

		function handleTouchMoveRotate(event) {

			//console.log( 'handleTouchMoveRotate' );

			rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
			rotateDelta.subVectors(rotateEnd, rotateStart);

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			// rotating across whole screen goes 360 degrees around
			rotateLeft(2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed);

			// rotating up and down along whole screen attempts to go 360, but limited to 180
			rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed);

			rotateStart.copy(rotateEnd);

			scope.update();
		}

		function handleTouchMoveDolly(event) {

			//console.log( 'handleTouchMoveDolly' );

			var dx = event.touches[0].pageX - event.touches[1].pageX;
			var dy = event.touches[0].pageY - event.touches[1].pageY;

			var distance = Math.sqrt(dx * dx + dy * dy);

			dollyEnd.set(0, distance);

			dollyDelta.subVectors(dollyEnd, dollyStart);

			if (dollyDelta.y > 0) {

				dollyOut(getZoomScale());
			} else if (dollyDelta.y < 0) {

				dollyIn(getZoomScale());
			}

			dollyStart.copy(dollyEnd);

			scope.update();
		}

		function handleTouchMovePan(event) {

			//console.log( 'handleTouchMovePan' );

			panEnd.set(event.touches[0].pageX, event.touches[0].pageY);

			panDelta.subVectors(panEnd, panStart);

			pan(panDelta.x, panDelta.y);

			panStart.copy(panEnd);

			scope.update();
		}

		function handleTouchEnd(event) {}

		//console.log( 'handleTouchEnd' );

		//
		// event handlers - FSM: listen for events and reset state
		//

		function onMouseDown(event) {

			if (scope.enabled === false) return;

			event.preventDefault();

			switch (event.button) {

				case scope.mouseButtons.ORBIT:

					if (scope.enableRotate === false) return;

					handleMouseDownRotate(event);

					state = STATE.ROTATE;

					break;

				case scope.mouseButtons.ZOOM:

					if (scope.enableZoom === false) return;

					handleMouseDownDolly(event);

					state = STATE.DOLLY;

					break;

				case scope.mouseButtons.PAN:

					if (scope.enablePan === false) return;

					handleMouseDownPan(event);

					state = STATE.PAN;

					break;

			}

			if (state !== STATE.NONE) {

				document.addEventListener('mousemove', onMouseMove, false);
				document.addEventListener('mouseup', onMouseUp, false);

				scope.dispatchEvent(startEvent);
			}
		}

		function onMouseMove(event) {

			if (scope.enabled === false) return;

			event.preventDefault();

			switch (state) {

				case STATE.ROTATE:

					if (scope.enableRotate === false) return;

					handleMouseMoveRotate(event);

					break;

				case STATE.DOLLY:

					if (scope.enableZoom === false) return;

					handleMouseMoveDolly(event);

					break;

				case STATE.PAN:

					if (scope.enablePan === false) return;

					handleMouseMovePan(event);

					break;

			}
		}

		function onMouseUp(event) {

			if (scope.enabled === false) return;

			handleMouseUp(event);

			document.removeEventListener('mousemove', onMouseMove, false);
			document.removeEventListener('mouseup', onMouseUp, false);

			scope.dispatchEvent(endEvent);

			state = STATE.NONE;
		}

		function onMouseWheel(event) {

			if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;

			event.preventDefault();
			event.stopPropagation();

			handleMouseWheel(event);

			scope.dispatchEvent(startEvent); // not sure why these are here...
			scope.dispatchEvent(endEvent);
		}

		function onKeyDown(event) {

			if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;

			handleKeyDown(event);
		}

		function onTouchStart(event) {

			if (scope.enabled === false) return;

			switch (event.touches.length) {

				case 1:
					// one-fingered touch: rotate

					if (scope.enableRotate === false) return;

					handleTouchStartRotate(event);

					state = STATE.TOUCH_ROTATE;

					break;

				case 2:
					// two-fingered touch: dolly

					if (scope.enableZoom === false) return;

					handleTouchStartDolly(event);

					state = STATE.TOUCH_DOLLY;

					break;

				case 3:
					// three-fingered touch: pan

					if (scope.enablePan === false) return;

					handleTouchStartPan(event);

					state = STATE.TOUCH_PAN;

					break;

				default:

					state = STATE.NONE;

			}

			if (state !== STATE.NONE) {

				scope.dispatchEvent(startEvent);
			}
		}

		function onTouchMove(event) {

			if (scope.enabled === false) return;

			event.preventDefault();
			event.stopPropagation();

			switch (event.touches.length) {

				case 1:
					// one-fingered touch: rotate

					if (scope.enableRotate === false) return;
					if (state !== STATE.TOUCH_ROTATE) return; // is this needed?...

					handleTouchMoveRotate(event);

					break;

				case 2:
					// two-fingered touch: dolly

					if (scope.enableZoom === false) return;
					if (state !== STATE.TOUCH_DOLLY) return; // is this needed?...

					handleTouchMoveDolly(event);

					break;

				case 3:
					// three-fingered touch: pan

					if (scope.enablePan === false) return;
					if (state !== STATE.TOUCH_PAN) return; // is this needed?...

					handleTouchMovePan(event);

					break;

				default:

					state = STATE.NONE;

			}
		}

		function onTouchEnd(event) {

			if (scope.enabled === false) return;

			handleTouchEnd(event);

			scope.dispatchEvent(endEvent);

			state = STATE.NONE;
		}

		function onContextMenu(event) {

			event.preventDefault();
		}

		//

		scope.domElement.addEventListener('contextmenu', onContextMenu, false);

		scope.domElement.addEventListener('mousedown', onMouseDown, false);
		scope.domElement.addEventListener('wheel', onMouseWheel, false);

		scope.domElement.addEventListener('touchstart', onTouchStart, false);
		scope.domElement.addEventListener('touchend', onTouchEnd, false);
		scope.domElement.addEventListener('touchmove', onTouchMove, false);

		window.addEventListener('keydown', onKeyDown, false);

		// force an update at start

		this.update();
	};

	THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
	THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

	Object.defineProperties(THREE.OrbitControls.prototype, {

		center: {

			get: function get() {

				console.warn('THREE.OrbitControls: .center has been renamed to .target');
				return this.target;
			}

		},

		// backward compatibility

		noZoom: {

			get: function get() {

				console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
				return !this.enableZoom;
			},

			set: function set(value) {

				console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
				this.enableZoom = !value;
			}

		},

		noRotate: {

			get: function get() {

				console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
				return !this.enableRotate;
			},

			set: function set(value) {

				console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
				this.enableRotate = !value;
			}

		},

		noPan: {

			get: function get() {

				console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
				return !this.enablePan;
			},

			set: function set(value) {

				console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
				this.enablePan = !value;
			}

		},

		noKeys: {

			get: function get() {

				console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
				return !this.enableKeys;
			},

			set: function set(value) {

				console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
				this.enableKeys = !value;
			}

		},

		staticMoving: {

			get: function get() {

				console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
				return !this.enableDamping;
			},

			set: function set(value) {

				console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
				this.enableDamping = !value;
			}

		},

		dynamicDampingFactor: {

			get: function get() {

				console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
				return this.dampingFactor;
			},

			set: function set(value) {

				console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
				this.dampingFactor = value;
			}

		}

	});

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	"use strict";

	function EquirectangularToCubemap(renderer) {

		this.renderer = renderer;
		this.scene = new THREE.Scene();

		var gl = this.renderer.getContext();
		this.maxSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

		this.camera = new THREE.CubeCamera(1, 100000, 1);

		this.material = new THREE.MeshBasicMaterial({
			map: null,
			side: THREE.BackSide
		});

		this.mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(100, 4), this.material);
		this.scene.add(this.mesh);
	}

	EquirectangularToCubemap.prototype.update = function () {
		this.camera.updateCubeMap(this.renderer, this.scene);
	};

	EquirectangularToCubemap.prototype.convert = function (source, size) {

		var mapSize = Math.min(size, this.maxSize);
		this.camera = new THREE.CubeCamera(1, 100000, mapSize);
		this.material.map = source;

		this.camera.updateCubeMap(this.renderer, this.scene);

		return this.camera.renderTarget.texture;
	};

	THREE.EquirectangularToCubemap = EquirectangularToCubemap;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TWO_PI = Math.PI * 2;
	var HALF_PI = Math.PI * 0.5;
	var QUARTER_PI = Math.PI * 0.25;

	var MathUtil = function () {
	    function MathUtil() {
	        _classCallCheck(this, MathUtil);
	    }

	    _createClass(MathUtil, [{
	        key: "clamp",
	        value: function clamp(t) {
	            return Math.min(1, Math.max(0, t));
	        }
	    }, {
	        key: "lerp",
	        value: function lerp(value1, value2, amount) {
	            amount = amount < 0 ? 0 : amount;
	            amount = amount > 1 ? 1 : amount;
	            return value1 + (value2 - value1) * amount;
	        }
	    }, {
	        key: "randomRange",
	        value: function randomRange(min, max) {
	            return Math.random() * (max - min) + min;
	        }
	    }, {
	        key: "randomCircle",
	        value: function randomCircle(min, max) {
	            var r = Math.random() * MathUtil.TWO_PI;
	            var len = MathUtil.randomRange(min, max);
	            return {
	                x: Math.cos(r) * len,
	                y: Math.sin(r) * len
	            };
	        }
	    }, {
	        key: "lookAtQuaternion",
	        value: function lookAtQuaternion(eye, center) {
	            var up = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new THREE.Vector3(0, 1, 0);

	            var mat = new THREE.Matrix4();
	            mat.lookAt(eye, center, up);

	            var quat = new THREE.Quaternion();
	            quat.setFromRotationMatrix(mat);
	            return quat;
	        }
	    }, {
	        key: "lookAt",
	        value: function lookAt(forward, up) {
	            forward = forward.normalize();
	            var right = new THREE.Vector3().crossVectors(up, forward);
	            up = new THREE.Vector3().crossVectors(forward, right).normalize();

	            var m00 = right.x;
	            var m01 = right.y;
	            var m02 = right.z;
	            var m10 = up.x;
	            var m11 = up.y;
	            var m12 = up.z;
	            var m20 = forward.x;
	            var m21 = forward.y;
	            var m22 = forward.z;

	            var num8 = m00 + m11 + m22;

	            var q = new THREE.Quaternion();
	            if (num8 > 0) {
	                var num = Math.sqrt(num8 + 1);
	                q.w = num * 0.5;
	                num = 0.5 / num;
	                q.x = (m12 - m21) * num;
	                q.y = (m20 - m02) * num;
	                q.z = (m01 - m10) * num;
	                return q;
	            }

	            if (m00 >= m11 && m00 >= m22) {
	                var num7 = Math.sqrt(1 + m00 - m11 - m22);
	                var num4 = 0.5 / num7;
	                q.x = 0.5 * num7;
	                q.y = (m01 + m10) * num4;
	                q.z = (m02 + m20) * num4;
	                q.w = (m12 - m21) * num4;
	                return q;
	            }

	            if (m11 > m22) {
	                var num6 = Math.sqrt(1 + m11 - m00 - m22);
	                var num3 = 0.5 / num6;
	                q.x = (m10 + m01) * num3;
	                q.y = 0.5 * num6;
	                q.z = (m21 + m12) * num3;
	                q.w = (m20 - m02) * num3;
	                return q;
	            }

	            var num5 = Math.sqrt(1 + m22 - m00 - m11);
	            var num2 = 0.5 / num5;
	            q.x = (m20 + m02) * num2;
	            q.y = (m21 + m12) * num2;
	            q.z = 0.5 * num5;
	            q.w = (m01 - m10) * num2;
	            return q;
	        }
	    }, {
	        key: "getForwardDirection",
	        value: function getForwardDirection(target) {
	            var v = new THREE.Vector3(0, 0, -1);
	            v.applyQuaternion(target.quaternion);
	            return v;
	        }
	    }, {
	        key: "TWO_PI",
	        get: function get() {
	            return TWO_PI;
	        }
	    }, {
	        key: "HALF_PI",
	        get: function get() {
	            return HALF_PI;
	        }
	    }, {
	        key: "QUARTER_PI",
	        get: function get() {
	            return QUARTER_PI;
	        }
	    }]);

	    return MathUtil;
	}();

	;

	exports.default = new MathUtil();

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextureUtil = function () {
	    function TextureUtil() {
	        _classCallCheck(this, TextureUtil);
	    }

	    // https://github.com/mrdoob/three.js/issues/386
	    // http://miffysora.wikidot.com/threejs-data-texture


	    _createClass(TextureUtil, [{
	        key: "create",
	        value: function create(width, height, data, options) {
	            options = options || {};

	            // https://threejs.org/docs/#api/textures/DataTexture
	            // DataTexture( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy )
	            var texture = new THREE.DataTexture(data, width, height, options.format || THREE.RGBAFormat, options.type || THREE.FloatType, options.mapping || THREE.UVMapping, options.wrapS || THREE.ClampToEdgeWrapping, options.wrapT || THREE.ClampToEdgeWrapping, options.magFilter || THREE.NearestFilter, options.minFilter || THREE.NearestFilter);
	            texture.needsUpdate = true;
	            return texture;
	        }
	    }, {
	        key: "save",
	        value: function save(renderer, texture, options) {
	            var scene = new THREE.Scene();
	            var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2, 1, 1), new THREE.ShaderMaterial({
	                vertexShader: options.vertexShader,
	                fragmentShader: options.fragmentShader,
	                uniforms: {
	                    texture: { type: 't', value: texture }
	                }
	            }));
	            scene.add(mesh);

	            // render
	            var camera = new THREE.OrthographicCamera();
	            renderer.render(scene, camera);

	            var canvas = renderer.domElement;

	            var width = texture.image.width,
	                height = texture.image.height;

	            var resized = document.createElement("canvas");
	            resized.width = width;
	            resized.height = height;
	            resized.getContext("2d").drawImage(canvas, 0, 0, width, height);

	            var type = "image/png";
	            var base64 = resized.toDataURL(type);

	            /*
	            const decoded = dataUriToBuffer(base64)
	            fs.writeFile(options.path, decoded, (err) => {
	                console.log(err);
	            });
	            */

	            var bin = atob(base64.replace(/^.*,/, ""));
	            var len = bin.length;
	            var buffer = new Uint8Array(len);
	            for (var i = 0; i < len; i++) {
	                buffer[i] = bin.charCodeAt(i);
	            }

	            var blob = new Blob([buffer.buffer], {
	                type: type
	            });

	            var url = (window.URL || window.webkitURL).createObjectURL(blob);
	            this.download(url, options.path || "texture.png");
	        }
	    }, {
	        key: "download",
	        value: function download(url, name) {
	            var a = document.createElement("a");
	            var e = document.createEvent("MouseEvent");

	            a.download = name;
	            a.href = url;

	            e.initEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	            a.dispatchEvent(e);
	        }
	    }, {
	        key: "getImageData",
	        value: function getImageData(texture) {
	            var canvas = document.createElement("canvas");
	            var context = canvas.getContext("2d");
	            var img = texture.image;
	            canvas.width = img.width;
	            canvas.height = img.height;
	            context.drawImage(img, 0, 0);
	            return context.getImageData(0, 0, img.width, img.height);
	        }
	    }]);

	    return TextureUtil;
	}();

	exports.default = new TextureUtil();

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});


	var KeyCode = {
	    space: 32,
	    leftArrow: 37,
	    upArrow: 38,
	    rightArrow: 39,
	    downArrow: 40,
	    a: 65,
	    b: 66,
	    c: 67,
	    d: 68,
	    e: 69,
	    f: 70,
	    g: 71,
	    h: 72,
	    i: 73,
	    j: 74,
	    k: 75,
	    l: 76,
	    m: 77,
	    n: 78,
	    o: 79,
	    p: 80,
	    q: 81,
	    r: 82,
	    s: 83,
	    t: 84,
	    u: 85,
	    v: 86,
	    w: 87,
	    x: 88,
	    y: 89,
	    z: 90
	};

	var KeyCodeDetector = {

	    isArrowKey: function isArrowKey(keyCode) {
	        return keyCode == KeyCode.leftArrow || keyCode == KeyCode.upArrow || keyCode == KeyCode.rightArrow || keyCode == KeyCode.downArrow;
	    }

	};

	exports.default = KeyCode;
	exports.KeyCodeDetector = KeyCodeDetector;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LonLat = function LonLat(lon, lat) {
	    _classCallCheck(this, LonLat);

	    this.lon = lon;
	    this.lat = lat;
	};

	var Tile = function Tile(x, y, zoom) {
	    _classCallCheck(this, Tile);

	    this.x = x;
	    this.y = y;
	    this.zoom = zoom;
	};

	var Boundary = function () {
	    function Boundary(n, w, s, e) {
	        _classCallCheck(this, Boundary);

	        this._n = n;
	        this._w = w;
	        this._s = s;
	        this._e = e;
	    }

	    _createClass(Boundary, [{
	        key: "n",
	        get: function get() {
	            return this._n;
	        }
	    }, {
	        key: "north",
	        get: function get() {
	            return this.n;
	        }
	    }, {
	        key: "w",
	        get: function get() {
	            return this._w;
	        }
	    }, {
	        key: "west",
	        get: function get() {
	            return this.w;
	        }
	    }, {
	        key: "s",
	        get: function get() {
	            return this._s;
	        }
	    }, {
	        key: "south",
	        get: function get() {
	            return this.s;
	        }
	    }, {
	        key: "e",
	        get: function get() {
	            return this._e;
	        }
	    }, {
	        key: "east",
	        get: function get() {
	            return this.e;
	        }
	    }]);

	    return Boundary;
	}();

	var GSI = function () {
	    function GSI(data, boundary) {
	        _classCallCheck(this, GSI);

	        this.data = data;
	        this.boundary = boundary;

	        this.lonDegreesPerSegment = (boundary.e - boundary.w) / this.xLength;
	        this.latDegreesPerSegment = (boundary.n - boundary.s) / this.yLength;

	        this.invertLonDegreesPerSegment = 1 / this.lonDegreesPerSegment;
	        this.invertLatDegreesPerSegment = 1 / this.latDegreesPerSegment;

	        var min = Number.MAX_VALUE,
	            max = 0;
	        data.forEach(function (row, yindex) {
	            return row.forEach(function (height, xindex) {
	                min = Math.min(min, height);
	                max = Math.max(max, height);
	            });
	        });

	        this.min = min;
	        this.max = max;
	        this.interval = 1 / (max - min);
	    }

	    _createClass(GSI, [{
	        key: "getLonLat",
	        value: function getLonLat(x, y) {
	            return new LonLat(this.boundary.w + this.lonDegreesPerSegment * x, this.boundary.n - this.latDegreesPerSegment * y);
	        }
	    }, {
	        key: "normalize",
	        value: function normalize(height) {
	            return (height - this.min) * this.interval;
	        }
	    }, {
	        key: "getHeight",
	        value: function getHeight(lon, lat) {
	            var x = parseInt((lon - this.boundary.w) * this.invertLonDegreesPerSegment);
	            var y = parseInt((lat - this.boundary.n) * -this.invertLatDegreesPerSegment);
	            x = Math.max(0, Math.min(x, this.xLength - 1));
	            y = Math.max(0, Math.min(y, this.yLength - 1));

	            return this.data[y][x];
	        }
	    }, {
	        key: "getNormalizedHeight",
	        value: function getNormalizedHeight(lon, lat) {
	            return this.normalize(this.getHeight(lon, lat));
	        }
	    }, {
	        key: "xLength",
	        get: function get() {
	            return this.data[0].length;
	        }
	    }, {
	        key: "yLength",
	        get: function get() {
	            return this.data.length;
	        }
	    }]);

	    return GSI;
	}();

	var OpenStreetMap = function () {
	    function OpenStreetMap() {
	        _classCallCheck(this, OpenStreetMap);
	    }

	    _createClass(OpenStreetMap, [{
	        key: "lonlatToTile",
	        value: function lonlatToTile(lon, lat, zoom) {
	            var numOfTiles = Math.pow(2, zoom);
	            var lonDegreesPerTile = 360 / numOfTiles;
	            var sinLat = Math.sin(lat * Math.PI / 180);
	            var tx = (lon + 180) / lonDegreesPerTile;
	            var ty = (0.5 + -0.5 * Math.log((1 + sinLat) / (1 - sinLat)) / (2 * Math.PI)) * numOfTiles;

	            return new Tile(Math.floor(tx), Math.floor(ty), zoom);
	        }
	    }, {
	        key: "tileToLonlat",
	        value: function tileToLonlat(tile) {
	            var numOfTiles = Math.pow(2, tile.zoom);
	            var x = tile.x / numOfTiles;
	            var y = tile.y / numOfTiles;
	            var lon = (x - 1 / 2) / (1 / 360);
	            var latRadians = (y - 1 / 2) / -(1 / (2 * Math.PI));
	            var lat = (2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2) / Math.PI * 180;
	            return new LonLat(lon, lat);
	        }
	    }, {
	        key: "tileToBoundary",
	        value: function tileToBoundary(tile) {
	            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	            var p1 = this.tileToLonlat(tile);
	            var p2 = this.tileToLonlat(new Tile(tile.x + size, tile.y + size, tile.zoom));

	            return new Boundary(p1.lat, p1.lon, p2.lat, p2.lon);
	        }
	    }, {
	        key: "midpoint",
	        value: function midpoint(_arg, _arg1) {
	            var x1 = _arg[0],
	                y1 = _arg[1];
	            var x2 = _arg1[0],
	                y2 = _arg1[1];
	            var x = x1 - (x1 - x2) / 2;
	            var y = y1 - (y1 - y2) / 2;
	            return [x, y];
	        }
	    }, {
	        key: "centroid",
	        value: function centroid(boundary) {
	            var p1 = [boundary.w, boundary.n];

	            var p2 = [boundary.e, boundary.s];

	            return this.midpoint(p1, p2);
	        }
	    }, {
	        key: "loadOSM",
	        value: function loadOSM(boundary) {
	            var convertToAssoc = function convertToAssoc(rawData) {
	                var acc = void 0;
	                acc = {
	                    node: {},
	                    way: {},
	                    relation: {}
	                };
	                rawData.elements.forEach(function (elem) {
	                    return acc[elem.type][elem.id] = elem;
	                });
	                return acc;
	            };

	            var baseUrl = "http://overpass-api.de/api/interpreter?data=[out:json];\n(\n  node({s},{w},{n},{e});\n  way(bn);\n);\n(\n  ._;\n  node(w);\n);\nout;";

	            var url = baseUrl.replace(/\{([swne])\}/g, function (match, key) {
	                return boundary[key];
	            });

	            return new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open("GET", url, true);
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState == 4) {
	                        // DONE
	                        var status = xhr.status;
	                        if (status == 200) {
	                            resolve(JSON.parse(xhr.responseText));
	                        } else {
	                            reject(status);
	                        }
	                    }
	                };
	                xhr.send();
	            });
	        }
	    }, {
	        key: "loadGSI",
	        value: function loadGSI(tile) {
	            var parseDemCsv = function parseDemCsv(text) {
	                return text.substring(0, text.length - 1).split('\n').map(function (row) {
	                    return row.split(',').map(function (height) {
	                        return parseFloat(height) || -1;
	                    });
	                });
	            };

	            var url = "http://cyberjapandata.gsi.go.jp/xyz/dem/" + tile.zoom + "/" + tile.x + "/" + tile.y + ".txt";

	            return new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open("GET", url, true);
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState == 4) {
	                        // DONE
	                        var status = xhr.status;
	                        if (status == 200) {
	                            resolve(parseDemCsv(xhr.responseText));
	                        } else {
	                            reject(status);
	                        }
	                    }
	                };
	                xhr.send();
	            });
	        }
	    }, {
	        key: "loadGSITexture",
	        value: function loadGSITexture(tile) {
	            var url = "http://cyberjapandata.gsi.go.jp/xyz/relief/" + tile.zoom + "/" + tile.x + "/" + tile.y + ".png";

	            http.get(url, function (response) {
	                var file = fs.createWriteStream("shibuya.png");
	                response.pipe(file);
	            });
	        }
	    }]);

	    return OpenStreetMap;
	}();

	exports.default = OpenStreetMap;
	;

	exports.Tile = Tile;
	exports.Boundary = Boundary;
	exports.GSI = GSI;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CoordinateConverter = function () {
	    function CoordinateConverter(scale, offsetX, offsetY) {
	        _classCallCheck(this, CoordinateConverter);

	        this.scale = scale;
	        this.offsetX = offsetX;
	        this.offsetY = offsetY;
	    }

	    _createClass(CoordinateConverter, [{
	        key: "convert",
	        value: function convert(lon, lat) {
	            return {
	                x: lon * this.scale + this.offsetX,
	                y: lat * this.scale + this.offsetY
	            };
	        }
	    }]);

	    return CoordinateConverter;
	}();

	exports.default = CoordinateConverter;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _perlin = __webpack_require__(17);

	var _perlin2 = _interopRequireDefault(_perlin);

	var _CameraControls2 = __webpack_require__(29);

	var _CameraControls3 = _interopRequireDefault(_CameraControls2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HandyCameraControls = function (_CameraControls) {
	    _inherits(HandyCameraControls, _CameraControls);

	    function HandyCameraControls(camera, options) {
	        _classCallCheck(this, HandyCameraControls);

	        var _this = _possibleConstructorReturn(this, (HandyCameraControls.__proto__ || Object.getPrototypeOf(HandyCameraControls)).call(this, camera));

	        options = options || {};

	        _this.positionFrequency = options.positionFrequency || 0.5;
	        _this.rotationFrequency = options.rotationFrequency || 0.3;

	        _this.positionAmount = options.positionAmount || 0.5;
	        _this.rotationAmount = options.rotationAmount || 0.1;

	        _this.positionComponents = options.positionComponents || new THREE.Vector3(0.25, 0.01, 1);
	        // this.rotationComponents = options.rotationComponents || new THREE.Vector3(0, 0.5, 0.1);
	        _this.rotationComponents = options.rotationComponents || new THREE.Vector3(-0.01, 0.2, 0.02);

	        _this.positionOctave = options.positionOctave || 3;
	        _this.rotationOctave = options.rotationOctave || 4;

	        _this.timePosition = Math.random() * 10;
	        _this.timeRotation = Math.random() * 10;

	        _this.setup();
	        return _this;
	    }

	    _createClass(HandyCameraControls, [{
	        key: "setup",
	        value: function setup() {
	            this.initialPosition = this.camera.position;
	            this.initialRotation = this.camera.quaternion;

	            this.noiseVectors = [];
	            for (var i = 0; i < 6; i++) {
	                var theta = Math.random() * Math.PI * 2;
	                this.noiseVectors[i] = new THREE.Vector2(Math.cos(theta), Math.sin(theta));
	            }
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            var p = this.wobblePosition(dt);
	            p.add(this.initialPosition);
	            this.camera.position.set(p.x, p.y, p.z);

	            var q = this.wobbleRotation(dt);
	            this.camera.setRotationFromQuaternion(q.multiply(this.initialRotation));
	        }
	    }, {
	        key: "wobblePosition",
	        value: function wobblePosition(dt) {
	            this.timePosition += dt * this.positionFrequency;

	            var p = new THREE.Vector3(this.Fbm(this.noiseVectors[0].clone().multiplyScalar(this.timePosition), this.positionOctave), this.Fbm(this.noiseVectors[1].clone().multiplyScalar(this.timePosition), this.positionOctave), this.Fbm(this.noiseVectors[2].clone().multiplyScalar(this.timePosition), this.positionOctave));
	            p = p.multiply(this.positionComponents).multiplyScalar(this.positionAmount * 2);

	            return p;
	        }
	    }, {
	        key: "wobbleRotation",
	        value: function wobbleRotation(dt) {
	            this.timeRotation += dt * this.rotationFrequency;

	            var r = new THREE.Vector3(this.Fbm(this.noiseVectors[3].clone().multiplyScalar(this.timeRotation), this.rotationOctave), this.Fbm(this.noiseVectors[4].clone().multiplyScalar(this.timeRotation), this.rotationOctave), this.Fbm(this.noiseVectors[5].clone().multiplyScalar(this.timeRotation), this.rotationOctave));
	            r = r.multiply(this.rotationComponents).multiplyScalar(this.rotationAmount * 2);

	            var euler = new THREE.Euler(r.x, r.y, r.z, "XYZ");
	            var q = new THREE.Quaternion().setFromEuler(euler);
	            return q;
	        }
	    }, {
	        key: "Fbm",
	        value: function Fbm(coord, octave) {
	            var f = 0.0;
	            var w = 1.0;
	            for (var i = 0; i < octave; i++) {
	                f += w * _perlin2.default.perlin2(coord.x, coord.y) * 0.5;
	                coord.x *= 2;
	                coord.y *= 2;
	                w *= 0.5;
	            }
	            return f;
	        }
	    }]);

	    return HandyCameraControls;
	}(_CameraControls3.default);

	exports.default = HandyCameraControls;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CameraControls = function () {
	    function CameraControls(camera) {
	        _classCallCheck(this, CameraControls);

	        this.camera = camera;
	        this.reactive = false;
	    }

	    _createClass(CameraControls, [{
	        key: "setup",
	        value: function setup() {}
	    }, {
	        key: "update",
	        value: function update(dt, t) {}
	    }]);

	    return CameraControls;
	}();

	exports.default = CameraControls;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _PolarCoordinate = __webpack_require__(31);

	var _PolarCoordinate2 = _interopRequireDefault(_PolarCoordinate);

	var _CameraControls2 = __webpack_require__(29);

	var _CameraControls3 = _interopRequireDefault(_CameraControls2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var upVector = new THREE.Vector3(0, 1, 0);

	var PolarCameraControls = function (_CameraControls) {
	    _inherits(PolarCameraControls, _CameraControls);

	    function PolarCameraControls(camera) {
	        var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new THREE.Vector3(0, 0, 0);
	        var t0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.PI * 0.1;
	        var t1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Math.PI * 0.5;
	        var radius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 150;

	        _classCallCheck(this, PolarCameraControls);

	        var _this = _possibleConstructorReturn(this, (PolarCameraControls.__proto__ || Object.getPrototypeOf(PolarCameraControls)).call(this, camera));

	        _this.center = center;
	        _this.polar = new _PolarCoordinate2.default(t0, t1, radius);
	        return _this;
	    }

	    _createClass(PolarCameraControls, [{
	        key: "setup",
	        value: function setup() {}
	    }, {
	        key: "randomize",
	        value: function randomize() {
	            var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
	            var tween = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	            var up = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	            var dt1 = (Math.random() - 0.5) * Math.PI * 2;

	            if (dt1 * this.polar.speed < 0) {
	                this.polar.speed = -(this.polar.speed > 0 ? 1 : -1) * _MathUtil2.default.randomRange(0.1, 0.35);
	            } else {
	                this.polar.speed = (this.polar.speed > 0 ? 1 : -1) * _MathUtil2.default.randomRange(0.1, 0.35);
	            }

	            var t0 = up ? _MathUtil2.default.randomRange(_MathUtil2.default.HALF_PI * 0.75, _MathUtil2.default.HALF_PI) : _MathUtil2.default.randomRange(0, _MathUtil2.default.HALF_PI * 0.5);
	            var t1 = this.polar.theta1 + dt1;

	            if (tween) {
	                this.polar.tween(t0, t1, radius, Math.random() * 500 + 500);
	            } else {
	                this.polar.theta0 = t0;
	                this.polar.theta1 = t1;
	                this.polar.radius = radius;
	            }
	        }
	    }, {
	        key: "overlook",
	        value: function overlook() {
	            var tween = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	            var dt1 = (Math.random() - 0.5) * _MathUtil2.default.TWO_PI;

	            if (dt1 * this.polar.speed < 0) {
	                this.polar.speed *= -1;
	            }

	            var t0 = _MathUtil2.default.HALF_PI;
	            var t1 = this.polar.theta1 + dt1;
	            var radius = 8000;

	            if (tween) {
	                this.polar.tween(t0, t1, radius, 800);
	            } else {
	                this.polar.theta0 = t0;
	                this.polar.theta1 = t1;
	                this.polar.radius = radius;
	            }
	        }
	    }, {
	        key: "turn",
	        value: function turn(dt) {
	            this.polar.forward(dt);
	        }
	    }, {
	        key: "lerp",
	        value: function lerp(dt) {
	            var v = this.polar.cartesian.add(this.center);
	            this.camera.position.lerp(v, dt);
	            this.camera.quaternion.slerp(_MathUtil2.default.lookAtQuaternion(v, this.center, upVector), dt);
	        }
	    }, {
	        key: "apply",
	        value: function apply() {
	            var v = this.polar.cartesian.add(this.center);
	            this.camera.position.set(v.x, v.y, v.z);
	            this.camera.up.set(0, 1, 0);
	            this.camera.lookAt(this.center);
	        }
	    }, {
	        key: "update",
	        value: function update(dt) {
	            this.turn(dt);
	            // this.apply();
	            this.lerp(dt);
	        }
	    }, {
	        key: "radius",
	        get: function get() {
	            return this.polar.radius;
	        },
	        set: function set(v) {
	            return this.polar.radius = v;
	        }
	    }, {
	        key: "theta0",
	        get: function get() {
	            return this.polar.theta0;
	        },
	        set: function set(v) {
	            return this.polar.theta0 = v;
	        }
	    }, {
	        key: "theta1",
	        get: function get() {
	            return this.polar.theta1;
	        },
	        set: function set(v) {
	            return this.polar.theta1 = v;
	        }
	    }]);

	    return PolarCameraControls;
	}(_CameraControls3.default);

	exports.default = PolarCameraControls;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tween = __webpack_require__(1);

	var _Tween2 = _interopRequireDefault(_Tween);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PolarCoordinate = function () {
	    function PolarCoordinate(theta0, theta1, radius) {
	        var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.1;

	        _classCallCheck(this, PolarCoordinate);

	        this.theta0 = theta0;
	        this.theta1 = theta1;
	        this.radius = radius;
	        this.speed = speed;

	        this.offset = 0;
	    }

	    _createClass(PolarCoordinate, [{
	        key: "tween",
	        value: function tween(theta0, theta1, radius, duration) {
	            var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Tween2.default.Easing.Quadratic.Out;

	            var polar = this;
	            this.offset = 0;

	            return new Promise(function (resolve, reject) {
	                _Tween2.default.remove(polar.tweener);
	                polar.tweener = new _Tween2.default.Tween({
	                    theta0: polar.theta0,
	                    theta1: polar.theta1,
	                    radius: polar.radius
	                }).to({
	                    theta0: theta0,
	                    theta1: theta1,
	                    radius: radius
	                }, duration).easing(easing).onUpdate(function () {
	                    polar.theta0 = this.theta0;
	                    polar.theta1 = this.theta1 + polar.offset;
	                    polar.radius = this.radius;
	                }).onComplete(function () {
	                    polar.theta0 = theta0;
	                    polar.theta1 = theta1 + polar.offset;
	                    polar.radius = radius;

	                    resolve();
	                }).start();
	            });
	        }
	    }, {
	        key: "forward",
	        value: function forward(dt) {
	            // this.theta0 += dt * this.speed;
	            this.theta1 += dt * this.speed;
	            this.offset += dt * this.speed;
	        }
	    }, {
	        key: "cartesian",
	        get: function get() {
	            return new THREE.Vector3(-this.radius * Math.cos(this.theta0) * Math.cos(this.theta1), this.radius * Math.sin(this.theta0), this.radius * Math.cos(this.theta0) * Math.sin(this.theta1));
	        }
	    }]);

	    return PolarCoordinate;
	}();

	exports.default = PolarCoordinate;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FixedCameraPoint = undefined;

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _HandyCameraControls2 = __webpack_require__(28);

	var _HandyCameraControls3 = _interopRequireDefault(_HandyCameraControls2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FixedCameraPoint = function () {
	    function FixedCameraPoint(position, quat) {
	        _classCallCheck(this, FixedCameraPoint);

	        if (!(position instanceof THREE.Vector3)) {
	            position = new THREE.Vector3(position.x, position.y, position.z);
	        }
	        this.position = position;

	        /*
	        if(!(forward instanceof THREE.Vector3)) {
	            forward = new THREE.Vector3(forward.x, forward.y, forward.z);
	            forward.normalize();
	        }
	         if(!(up instanceof THREE.Vector3)) {
	            up = new THREE.Vector3(up.x, up.y, up.z);
	            up.normalize();
	        }
	         var mat = new THREE.Matrix4();
	        mat.lookAt(this.position, this.position.clone().add(forward), up);
	        var quat = new THREE.Quaternion();
	        quat.setFromRotationMatrix(mat);
	        this.quat = quat;
	        */

	        this.quat = new THREE.Quaternion(quat._x, quat._y, quat._z, quat._w);
	    }

	    _createClass(FixedCameraPoint, [{
	        key: "lerp",
	        value: function lerp(camera, dt) {
	            camera.position.lerp(this.position, dt);
	            camera.quaternion.slerp(this.quat, dt);
	        }
	    }, {
	        key: "apply",
	        value: function apply(camera) {
	            camera.position.set(this.position.x, this.position.y, this.position.z);
	            camera.setRotationFromQuaternion(this.quat);
	        }
	    }]);

	    return FixedCameraPoint;
	}();

	var FixedCameraControls = function (_HandyCameraControls) {
	    _inherits(FixedCameraControls, _HandyCameraControls);

	    function FixedCameraControls(camera, options) {
	        _classCallCheck(this, FixedCameraControls);

	        var _this = _possibleConstructorReturn(this, (FixedCameraControls.__proto__ || Object.getPrototypeOf(FixedCameraControls)).call(this, camera, options));

	        options = options || [];

	        _this.points = options.points || [];

	        _this.current = 0;
	        _this.t = 0;
	        return _this;
	    }

	    _createClass(FixedCameraControls, [{
	        key: "setup",
	        value: function setup() {
	            _get(FixedCameraControls.prototype.__proto__ || Object.getPrototypeOf(FixedCameraControls.prototype), "setup", this).call(this);
	        }
	    }, {
	        key: "init",
	        value: function init() {
	            this.t = 0;
	            this.initialPosition = this.camera.position;
	            this.initialRotation = this.camera.quaternion;
	        }
	    }, {
	        key: "next",
	        value: function next() {
	            var next = (this.current + 1) % this.points.length;
	            this.current = next;
	            this.init();
	        }
	    }, {
	        key: "prev",
	        value: function prev() {
	            var prev = this.current - 1;
	            if (prev < 0) {
	                prev = this.points.length - 1;
	            }
	            this.current = prev;
	            this.init();
	        }
	    }, {
	        key: "randomize",
	        value: function randomize() {
	            var _this2 = this;

	            var indices = this.points.map(function (p, i) {
	                return i;
	            }).filter(function (p, i) {
	                return i != _this2.current;
	            });
	            if (indices.length > 0) {
	                var index = indices[parseInt(_MathUtil2.default.randomRange(0, indices.length))];
	                this.current = index;
	                this.init();
	            }
	        }
	    }, {
	        key: "update",
	        value: function update(dt) {
	            if (this.current < 0 || this.current >= this.points.length) return;

	            var point = this.points[this.current];
	            // point.apply(this.camera);
	            // point.lerp(this.camera, dt);
	            this.lerp(this.camera, point, dt);
	        }
	    }, {
	        key: "lerp",
	        value: function lerp(camera, point, dt) {
	            var p = this.wobblePosition(dt);
	            var q = this.wobbleRotation(dt);

	            p.add(point.position);
	            q.multiply(point.quat);

	            camera.position.lerp(p, dt);
	            camera.quaternion.slerp(q, dt);
	        }
	    }]);

	    return FixedCameraControls;
	}(_HandyCameraControls3.default);

	exports.default = FixedCameraControls;
	exports.FixedCameraPoint = FixedCameraPoint;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _CameraControls2 = __webpack_require__(29);

	var _CameraControls3 = _interopRequireDefault(_CameraControls2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var forward = new THREE.Vector3(0, 0, -1);

	var BirdCameraControls = function (_CameraControls) {
	    _inherits(BirdCameraControls, _CameraControls);

	    function BirdCameraControls(camera, distance, left, top, right, bottom) {
	        _classCallCheck(this, BirdCameraControls);

	        var _this = _possibleConstructorReturn(this, (BirdCameraControls.__proto__ || Object.getPrototypeOf(BirdCameraControls)).call(this, camera));

	        _this.left = _this.top = _this.right = _this.bottom = 0;
	        _this.dx = _this.dy = 0;

	        _this.setDistance(distance);
	        _this.setBoundary(left, top, right, bottom);

	        _this.point = new THREE.Vector3();
	        _this.setup();
	        return _this;
	    }

	    _createClass(BirdCameraControls, [{
	        key: "setup",
	        value: function setup() {
	            this.randomize();
	        }
	    }, {
	        key: "randomize",
	        value: function randomize() {
	            var distanceMin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
	            var distanceMax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
	            var speedMin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	            var speedMax = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

	            var d = Math.random();
	            var distance = d * (distanceMax - distanceMin) + distanceMin;
	            this.setDistance(distance);

	            var x = Math.random();
	            var y = Math.random();
	            this.setPosition(x, y);

	            var cur = this.camera.position;
	            var signx = cur.x < this.point.x ? 1 : -1;
	            var signy = cur.z < this.point.z ? 1 : -1;
	            this.setDirection(d * signx * _MathUtil2.default.randomRange(speedMin, speedMax), d * signy * _MathUtil2.default.randomRange(speedMin, speedMax));
	        }

	        // (x, y) = (0.0 ~ 1.0, 0.0 ~ 1.0)

	    }, {
	        key: "setPosition",
	        value: function setPosition(x, y) {
	            var px = (this.right - this.left) * x + this.left;
	            var py = (this.top - this.bottom) * y + this.bottom;
	            // this.camera.position.set(px, this.distance, py);
	            this.point.set(px, this.distance, py);
	        }
	    }, {
	        key: "moveLeft",
	        value: function moveLeft() {
	            if (this.dx > 0) {
	                this.dx *= 0;
	            }
	            this.setDirection(this.dx - 10, this.dy);
	        }
	    }, {
	        key: "moveUp",
	        value: function moveUp() {
	            if (this.dy > 0) {
	                this.dy *= 0;
	            }
	            this.setDirection(this.dx, this.dy - 10);
	        }
	    }, {
	        key: "moveRight",
	        value: function moveRight() {
	            if (this.dx < 0) {
	                this.dx *= 0;
	            }
	            this.setDirection(this.dx + 10, this.dy);
	        }
	    }, {
	        key: "moveDown",
	        value: function moveDown() {
	            if (this.dy < 0) {
	                this.dy *= 0;
	            }
	            this.setDirection(this.dx, this.dy + 10);
	        }
	    }, {
	        key: "setDirection",
	        value: function setDirection(dx, dy) {
	            this.dx = dx;
	            this.dy = dy;
	        }
	    }, {
	        key: "setDistance",
	        value: function setDistance(distance) {
	            this.distance = distance;

	            var vfov = this.camera.fov * Math.PI / 180;
	            this.height = 2 * Math.tan(vfov / 2) * distance;
	            this.width = this.height * this.camera.aspect;

	            this.hwidth = this.width * 0.5;
	            this.hheight = this.height * 0.5;
	            // this.setBoundary(this.left, this.top, this.right, this.bottom);
	        }
	    }, {
	        key: "setBoundary",
	        value: function setBoundary(left, top, right, bottom) {
	            this.left = left;
	            this.top = top;
	            this.right = right;
	            this.bottom = bottom;
	        }
	    }, {
	        key: "update",
	        value: function update(dt) {
	            this.point.y = this.distance;

	            this.point.x += this.dx * dt;
	            this.point.z += this.dy * dt;

	            if (this.point.x < this.cornerLeft || this.point.x > this.cornerRight) {
	                this.dx *= -1;
	            }
	            if (this.point.z > this.cornerTop || this.point.z < this.cornerBottom) {
	                this.dy *= -1;
	            }

	            this.point.x = Math.max(this.cornerLeft, this.point.x);this.point.x = Math.min(this.cornerRight, this.point.x);
	            this.point.z = Math.min(this.cornerTop, this.point.z);this.point.z = Math.max(this.cornerBottom, this.point.z);

	            // this.camera.position.set(p.x, p.y, p.z);
	            // this.camera.lookAt(new THREE.Vector3(p.x, 0, p.z));

	            this.camera.position.lerp(this.point, dt);
	            this.camera.quaternion.slerp(_MathUtil2.default.lookAtQuaternion(this.point, new THREE.Vector3(this.point.x, 0, this.point.z), forward), dt);
	        }
	    }, {
	        key: "cornerLeft",
	        get: function get() {
	            return this.left + this.hwidth;
	        }
	    }, {
	        key: "cornerTop",
	        get: function get() {
	            return this.top - this.hheight;
	        }
	    }, {
	        key: "cornerRight",
	        get: function get() {
	            return this.right - this.hwidth;
	        }
	    }, {
	        key: "cornerBottom",
	        get: function get() {
	            return this.bottom + this.hheight;
	        }
	    }]);

	    return BirdCameraControls;
	}(_CameraControls3.default);

	exports.default = BirdCameraControls;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LightControls = function () {
	    function LightControls(camera, light, height) {
	        _classCallCheck(this, LightControls);

	        this.camera = camera;
	        this.light = light;
	        this.height = height;
	        this.ray = new THREE.Ray();
	        this.ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

	        this.isActive = true;
	    }

	    _createClass(LightControls, [{
	        key: "update",
	        value: function update(dt) {
	            if (!this.isActive) return;

	            var cam = this.camera.position;
	            var dir = _MathUtil2.default.getForwardDirection(this.camera);
	            dir.setLength(10);
	            var point = new THREE.Vector3(cam.x + dir.x, this.height, cam.z + dir.z);
	            this.fix(point);
	        }
	    }, {
	        key: "fix",
	        value: function fix(point) {
	            this.light.position.set(point.x, point.y, point.z);
	            this.light.target.position.set(point.x, 0, point.z);
	        }
	    }, {
	        key: "activate",
	        value: function activate(flag) {
	            this.isActive = flag;
	        }
	    }]);

	    return LightControls;
	}();

	exports.default = LightControls;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _ObjectUtil = __webpack_require__(36);

	var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BackgroundPass = function (_THREE$ShaderPass) {
	    _inherits(BackgroundPass, _THREE$ShaderPass);

	    function BackgroundPass() {
	        _classCallCheck(this, BackgroundPass);

	        var _this = _possibleConstructorReturn(this, (BackgroundPass.__proto__ || Object.getPrototypeOf(BackgroundPass)).call(this, {
	            uniforms: {
	                resolution: { type: "v2", value: new THREE.Vector2(512, 512) },
	                tDiffuse: { type: "t", value: null },
	                time: { type: "f", value: 0 },
	                invert: { type: "f", value: 0 },
	                tGradient: { type: "t", value: null }
	            },
	            vertexShader: __webpack_require__(37),
	            fragmentShader: __webpack_require__(38)
	        }));

	        _this.speed = 0.4;

	        _this.invertFlash = false;
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "invert");

	        _this.loadGradient();
	        return _this;
	    }

	    _createClass(BackgroundPass, [{
	        key: "setInvertFlash",
	        value: function setInvertFlash(flag) {
	            this.invertFlash = flag;
	            if (!this.invertFlash) {
	                this.invert = 0.0;
	            }
	        }
	    }, {
	        key: "setSize",
	        value: function setSize(width, height) {
	            _get(BackgroundPass.prototype.__proto__ || Object.getPrototypeOf(BackgroundPass.prototype), "setSize", this).call(this, width, height);
	            this.material.uniforms.resolution.value = new THREE.Vector2(width, height);
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t, frame) {
	            if (frame % 2 == 0) {
	                if (this.invertFlash) {
	                    this.invert = 1.0 - this.invert;
	                }
	            }
	        }
	    }, {
	        key: "loadGradient",
	        value: function loadGradient() {
	            var _this2 = this;

	            var loader = new THREE.TextureLoader();
	            loader.load("../dest/textures/posteffects/gradient5.png", function (texture) {
	                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	                _this2.material.uniforms.tGradient.value = texture;
	            });
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.material.dispose();
	            this.cBuffer.dispose();
	            this.bBuffer.dispose();
	        }
	    }]);

	    return BackgroundPass;
	}(THREE.ShaderPass);

	exports.default = BackgroundPass;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ObjectUtil = function () {
	    function ObjectUtil() {
	        _classCallCheck(this, ObjectUtil);
	    }

	    _createClass(ObjectUtil, [{
	        key: "defineUniformAccessor",
	        value: function defineUniformAccessor(object, uniforms, name) {
	            Object.defineProperty(object, name, {
	                configurable: false,
	                get: function get() {
	                    return uniforms[name].value;
	                },
	                set: function set(v) {
	                    uniforms[name].value = v;
	                }
	            });
	        }
	    }, {
	        key: "defineArrayAccessor",
	        value: function defineArrayAccessor(object, array, name) {
	            Object.defineProperty(object, name, {
	                configurable: false,
	                get: function get() {
	                    return array[0][name];
	                },
	                set: function set(v) {
	                    array.forEach(function (object) {
	                        object[name] = v;
	                    });
	                }
	            });
	        }
	    }]);

	    return ObjectUtil;
	}();

	exports.default = new ObjectUtil();

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4(position, 1.0);\n}\n\n"

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_2_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_2_0(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_2_1(vec3 x) {\n  return mod289_2_0(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_2_2(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_2_0(i); // Avoid truncation effects in permutation\n  vec3 p = permute_2_1( permute_2_1( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_3(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_3(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_4(vec4 x) {\n     return mod289_1_3(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_5(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_6(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_7 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_8 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_8;\n  vec3 i1 = min( g_1_8.xyz, l.zxy );\n  vec3 i2 = max( g_1_8.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_7.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_3(i);\n  vec4 p = permute_1_4( permute_1_4( permute_1_4(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_7.wyz - D_1_7.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_9 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_10 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_9.xy,h.z);\n  vec3 p3 = vec3(a1_1_9.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_5(vec4(dot(p0_1_10,p0_1_10), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_10 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_10,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nuniform vec2 resolution;\nuniform sampler2D tDiffuse;\n\nuniform float time;\nuniform float invert;\nuniform sampler2D tGradient;\n\nvarying vec2 vUv;\n\nvoid main() {\n    float n = (snoise_1_6(vec3(vUv, time)) + 1.0) * 0.5;\n    float v = (snoise_2_2(vec2(time, 0.0)) + 1.0) * 0.5;\n    vec4 grad = texture2D(tGradient, vec2(n, v));\n    grad.rgb = mix(grad.rgb, vec3(1.0, 1.0, 1.0) - grad.rgb, invert);\n    gl_FragColor = grad;\n}\n"

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tween = __webpack_require__(1);

	var _Tween2 = _interopRequireDefault(_Tween);

	var _ObjectUtil = __webpack_require__(36);

	var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CompositePass = function (_THREE$ShaderPass) {
	    _inherits(CompositePass, _THREE$ShaderPass);

	    function CompositePass() {
	        _classCallCheck(this, CompositePass);

	        var _this = _possibleConstructorReturn(this, (CompositePass.__proto__ || Object.getPrototypeOf(CompositePass)).call(this, {
	            uniforms: {
	                time: { type: "f", value: 0.0 },
	                fade: { type: "f", value: 0.0 },
	                resolution: { type: "v2", value: new THREE.Vector2(512, 512) },
	                tDiffuse: { type: "t", value: null },

	                noiseOffset: { type: "v2", value: new THREE.Vector2(0, 0) },

	                glitchIntensity: { type: "f", value: 0.65 },
	                glitchWave: { type: "v2", value: new THREE.Vector2(1, 1) },
	                glitchSpeed: { type: "f", value: 0.4 },
	                glitchScale: { type: "v2", value: new THREE.Vector2(1, 1) },
	                glitchShift: { type: "f", value: 1.0 },

	                mirror: { type: "i", value: 0 },
	                invert: { type: "f", value: 0.0 }
	            },
	            vertexShader: __webpack_require__(37),
	            fragmentShader: __webpack_require__(40)
	        }));

	        _this.speed = 0.1;

	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "fade");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "invert");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "mirror");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "glitchIntensity");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "glitchSpeed");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "glitchWave");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "glitchShift");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "glitchScale");
	        return _this;
	    }

	    _createClass(CompositePass, [{
	        key: "fadeIn",
	        value: function fadeIn() {
	            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

	            this.fadeAnimate(1, duration);
	        }
	    }, {
	        key: "fadeOut",
	        value: function fadeOut() {
	            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

	            this.fadeAnimate(0, duration);
	        }
	    }, {
	        key: "fadeAnimate",
	        value: function fadeAnimate(to, duration) {
	            var self = this;
	            new _Tween2.default.Tween({
	                fade: self.fade
	            }).to({
	                fade: to
	            }, duration).easing(_Tween2.default.Easing.Linear.None).onUpdate(function () {
	                self.fade = this.fade;
	            }).onComplete(function () {
	                self.fade = 1;
	            }).start();
	        }
	    }, {
	        key: "animateInvert",
	        value: function animateInvert(to) {
	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

	            var self = this;
	            _Tween2.default.remove(self.invertTween);
	            self.invertTween = new _Tween2.default.Tween({
	                invert: self.invert
	            }).to({
	                invert: to
	            }, duration).easing(_Tween2.default.Easing.Linear.None).onUpdate(function () {
	                self.invert = this.invert;
	            }).onComplete(function () {
	                self.invert = to;
	            }).start();
	        }
	    }, {
	        key: "setSize",
	        value: function setSize(width, height) {
	            _get(CompositePass.prototype.__proto__ || Object.getPrototypeOf(CompositePass.prototype), "setSize", this).call(this, width, height);
	            this.material.uniforms.resolution.value = new THREE.Vector2(width, height);
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t, frame) {
	            this.material.uniforms.time.value = t;
	            if (frame % 2 == 0) {
	                this.material.uniforms.noiseOffset.value.set(Math.random(), Math.random());
	            }
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.material.dispose();
	        }
	    }]);

	    return CompositePass;
	}(THREE.ShaderPass);

	exports.default = CompositePass;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_2_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_1(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_2(vec4 x) {\n     return mod289_1_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_3(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_4(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_5 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_6 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_6;\n  vec3 i1 = min( g_1_6.xyz, l.zxy );\n  vec3 i2 = max( g_1_6.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_5.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_1(i);\n  vec4 p = permute_1_2( permute_1_2( permute_1_2(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_5.wyz - D_1_5.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_7 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_8 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_7.xy,h.z);\n  vec3 p3 = vec3(a1_1_7.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_3(vec4(dot(p0_1_8,p0_1_8), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_8 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_8,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nuniform float time;\nuniform vec2 resolution;\nuniform sampler2D tDiffuse;\n\nuniform vec2 noiseOffset;\n\nuniform float glitchIntensity;\nuniform float glitchSpeed;\nuniform vec2 glitchWave;\nuniform vec2 glitchScale;\nuniform float glitchShift;\n\nuniform int mirror;\nuniform float invert;\nuniform float fade;\n\nvarying vec2 vUv;\n\nvoid blockNoise(sampler2D texture, vec2 uv, float t, float rgbWave, float rgbDiff, vec2 scale, vec2 strength, inout float mask, inout vec3 color) {\n    float m = step((snoise_1_4(vec3(0.0, uv.x * scale.x, t)) + 1.0) * 0.5, strength.x) * step((snoise_1_4(vec3(0.0, uv.y * scale.y, t)) + 1.0) * 0.5, strength.y);\n    float x = uv.x + sin(t) * 0.2 + rgbWave;\n    mask += m;\n    color += vec3(\n        texture2D(texture, vec2(x + rgbDiff, uv.y)).r * m,\n        texture2D(texture, vec2(x, uv.y)).g * m,\n        texture2D(texture, vec2(x - rgbDiff, uv.y)).b * m\n    );\n} \n\nvec4 glitch(sampler2D texture, vec2 uv, float strength, float speed, vec2 wave, float shift, vec2 scale) {\n    float t = time * speed;\n\n    float y = uv.y * resolution.y;\n    float rgbWave = (\n        snoise_1_4(vec3(0.0, y * 0.01, t * 4.0)) * (2.0 + strength * 3.2 * wave.x)\n        * snoise_1_4(vec3(0.0, y * 0.02, t * 2.0)) * (1.0 + strength * 0.4 * wave.y)\n        + step(0.9995, sin(y * 0.005 + t * 1.6)) * 1.2\n        + step(0.9999, sin(y * 0.005 + t * 2.0)) * -1.8\n        ) / resolution.x;\n    float rgbDiff = ((shift + 1.0) + sin(t * 5.0 + uv.y * 4.0) * (2.0 * strength + 1.0)) / resolution.x;\n\n    vec3 rgb = texture2D(texture, uv).rgb;\n\n    float mask = 0.0;\n    vec3 block = vec3(0.0);\n    blockNoise(texture, uv, floor(t * 1.0), rgbWave, rgbDiff, scale, vec2(strength * 0.3), mask, block);\n    blockNoise(texture, uv, floor(t * 2.5), rgbWave, rgbDiff, vec2(scale.x * 2.0, scale.y * 8.0), vec2(strength * 0.5, strength * 0.3), mask, block);\n    return vec4(rgb, 1.0) * (1.0 - mask) + vec4(block, 1.0);\n}\n\nvec2 mirror_uv(vec2 uv) {\n    if(mirror == 1) {\n        uv.x = 0.5 - abs(0.5 - uv.x);\n    } else if(mirror == 2) {\n        uv.x = 1.0 - abs(0.5 - uv.x);\n    } else if(mirror == 3) {\n        uv.y = 0.5 - abs(0.5 - uv.y);\n    } else if(mirror == 4) {\n        uv.y = 1.0 - abs(0.5 - uv.y);\n    }\n    return uv;\n}\n\nvoid main() {\n    vec2 uv = mirror_uv(vUv);\n    vec4 color = glitch(tDiffuse, uv, glitchIntensity, glitchSpeed, glitchWave, glitchShift, glitchScale);\n\n    float whiteNoise = random_2_0(vUv + noiseOffset);\n    color.rgb *= vec3(1. - whiteNoise * 0.15);\n    color.rgb = mix(color.rgb, vec3(1.0, 1.0, 1.0) - color.rgb, invert);\n    color.rgb = mix(color.rgb, vec3(1.0, 1.0, 1.0), 1.0 - fade);\n\n    gl_FragColor = color;\n}\n"

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Tween = __webpack_require__(1);

	var _Tween2 = _interopRequireDefault(_Tween);

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _ObjectUtil = __webpack_require__(36);

	var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

	var _ParticleSystem2 = __webpack_require__(42);

	var _ParticleSystem3 = _interopRequireDefault(_ParticleSystem2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SRParticleSystem = function (_ParticleSystem) {
	    _inherits(SRParticleSystem, _ParticleSystem);

	    function SRParticleSystem(renderer, count, options) {
	        _classCallCheck(this, SRParticleSystem);

	        var _this = _possibleConstructorReturn(this, (SRParticleSystem.__proto__ || Object.getPrototypeOf(SRParticleSystem)).call(this, renderer, count, options));

	        _this.posVar.material.uniforms.death = { type: "f", value: 2.0 };
	        _this.posVar.material.uniforms.recovery = { type: "i", value: true };
	        _this.posVar.material.uniforms.textureBoundaryDepth = { type: "t", value: null };
	        _this.posVar.material.uniforms.boundaryMin = { type: "v3", value: new THREE.Vector3() };
	        _this.posVar.material.uniforms.boundaryMax = { type: "v3", value: new THREE.Vector3() };
	        _this.posVar.material.uniforms.emitterHeight = { type: "f", value: 30 };
	        _this.velVar.material.uniforms.force = { type: "v3", value: new THREE.Vector3(0, 0.5, 0) };
	        _this.velVar.material.uniforms.speed = { type: "f", value: options.speed || 1.5 };
	        _this.velVar.material.uniforms.vortexCenter = { type: "v3", value: new THREE.Vector3(0, 0, 0) };
	        _this.velVar.material.uniforms.vortexIntensity = { type: "f", value: 0.0 };

	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.velVar.material.uniforms, "mode");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.velVar.material.uniforms, "force");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.velVar.material.uniforms, "speed");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.velVar.material.uniforms, "vortexCenter");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.velVar.material.uniforms, "vortexIntensity");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.posVar.material.uniforms, "recovery");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.posVar.material.uniforms, "death");
	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.posVar.material.uniforms, "emitterHeight");
	        return _this;
	    }

	    _createClass(SRParticleSystem, [{
	        key: "update",
	        value: function update(dt, t, frame) {
	            _get(SRParticleSystem.prototype.__proto__ || Object.getPrototypeOf(SRParticleSystem.prototype), "update", this).call(this, dt, t, frame);
	        }
	    }, {
	        key: "setupBoundary",
	        value: function setupBoundary(texture, box) {
	            this.posVar.material.uniforms.textureBoundaryDepth.value = texture;
	            this.posVar.material.uniforms.boundaryMin.value = box.min;
	            this.posVar.material.uniforms.boundaryMax.value = box.max;
	        }
	    }]);

	    return SRParticleSystem;
	}(_ParticleSystem3.default);

	exports.default = SRParticleSystem;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GPUComputationRenderer = __webpack_require__(43);

	var _GPUComputationRenderer2 = _interopRequireDefault(_GPUComputationRenderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var velocity = "textureVelocity";
	var position = "positionVelocity";

	var ParticleSystem = function () {
	    function ParticleSystem(renderer, count, options) {
	        _classCallCheck(this, ParticleSystem);

	        options = options || {};

	        var size = Math.ceil(Math.sqrt(count));
	        this._sideCount = size;
	        this._count = this._sideCount * this._sideCount;

	        this.gpuCompute = new _GPUComputationRenderer2.default(size, size, renderer);
	        var pos0 = this.gpuCompute.createTexture();
	        var vel0 = this.gpuCompute.createTexture();
	        var rot0 = this.gpuCompute.createTexture();

	        this.posVar = this.gpuCompute.addVariable("texturePosition", options.position, vel0, options);
	        this.velVar = this.gpuCompute.addVariable("textureVelocity", options.velocity, pos0, options);
	        this.rotVar = this.gpuCompute.addVariable("textureRotation", options.rotation, rot0, options);

	        // Add variable dependencies
	        this.gpuCompute.setVariableDependencies(this.velVar, [this.velVar, this.posVar]);
	        this.gpuCompute.setVariableDependencies(this.rotVar, [this.velVar, this.rotVar, this.posVar]);
	        this.gpuCompute.setVariableDependencies(this.posVar, [this.velVar, this.posVar]);

	        this.gpuCompute.init();

	        this.velVar.material.uniforms.mode = this.posVar.material.uniforms.mode = this.rotVar.material.uniforms.mode = { type: "i", value: 0 };
	        this.velVar.material.uniforms.time = this.posVar.material.uniforms.time = this.rotVar.material.uniforms.time = { type: "f", value: 0.0 };
	        this.velVar.material.uniforms.dt = this.posVar.material.uniforms.dt = this.rotVar.material.uniforms.dt = { type: "f", value: 0.0 };
	    }

	    _createClass(ParticleSystem, [{
	        key: "init",
	        value: function init() {
	            this.velVar.material.uniforms.mode.value = 0;

	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.velVar.material.uniforms.mode.value = 1;
	            this.velVar.material.uniforms.dt.value = dt;
	            this.velVar.material.uniforms.time.value = t;

	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "sideCount",
	        get: function get() {
	            return this._sideCount;
	        }
	    }, {
	        key: "count",
	        get: function get() {
	            return this._count;
	        }
	    }, {
	        key: "position",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.posVar).texture;
	        }
	    }, {
	        key: "velocity",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.velVar).texture;
	        }
	    }, {
	        key: "rotation",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.rotVar).texture;
	        }
	    }]);

	    return ParticleSystem;
	}();

	exports.default = ParticleSystem;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * @author yomboprime https://github.com/yomboprime
	 *
	 * GPUComputationRenderer, based on SimulationRenderer by zz85
	 *
	 * The GPUComputationRenderer uses the concept of variables. These variables are RGBA float textures that hold 4 floats
	 * for each compute element (texel)
	 *
	 * Each variable has a fragment shader that defines the computation made to obtain the variable in question.
	 * You can use as many variables you need, and make dependencies so you can use textures of other variables in the shader
	 * (the sampler uniforms are added automatically) Most of the variables will need themselves as dependency.
	 *
	 * The renderer has actually two render targets per variable, to make ping-pong. Textures from the current frame are used
	 * as inputs to render the textures of the next frame.
	 *
	 * The render targets of the variables can be used as input textures for your visualization shaders.
	 *
	 * Variable names should be valid identifiers and should not collide with THREE GLSL used identifiers.
	 * a common approach could be to use 'texture' prefixing the variable name; i.e texturePosition, textureVelocity...
	 *
	 * The size of the computation (sizeX * sizeY) is defined as 'resolution' automatically in the shader. For example:
	 * #DEFINE resolution vec2( 1024.0, 1024.0 )
	 *
	 * -------------
	 *
	 * Basic use:
	 *
	 * // Initialization...
	 *
	 * // Create computation renderer
	 * var gpuCompute = new GPUComputationRenderer( 1024, 1024, renderer );
	 *
	 * // Create initial state float textures
	 * var pos0 = gpuCompute.createTexture();
	 * var vel0 = gpuCompute.createTexture();
	 * // and fill in here the texture data...
	 *
	 * // Add texture variables
	 * var velVar = gpuCompute.addVariable( "textureVelocity", fragmentShaderVel, pos0 );
	 * var posVar = gpuCompute.addVariable( "texturePosition", fragmentShaderPos, vel0 );
	 *
	 * // Add variable dependencies
	 * gpuCompute.setVariableDependencies( velVar, [ velVar, posVar ] );
	 * gpuCompute.setVariableDependencies( posVar, [ velVar, posVar ] );
	 *
	 * // Add custom uniforms
	 * velVar.material.uniforms.time = { value: 0.0 };
	 *
	 * // Check for completeness
	 * var error = gpuCompute.init();
	 * if ( error !== null ) {
	 *		console.error( error );
	  * }
	 *
	 *
	 * // In each frame...
	 *
	 * // Compute!
	 * gpuCompute.compute();
	 *
	 * // Update texture uniforms in your visualization materials with the gpu renderer output
	 * myMaterial.uniforms.myTexture.value = gpuCompute.getCurrentRenderTarget( posVar ).texture;
	 *
	 * // Do your rendering
	 * renderer.render( myScene, myCamera );
	 *
	 * -------------
	 *
	 * Also, you can use utility functions to create ShaderMaterial and perform computations (rendering between textures)
	 * Note that the shaders can have multiple input textures.
	 *
	 * var myFilter1 = gpuCompute.createShaderMaterial( myFilterFragmentShader1, { theTexture: { value: null } } );
	 * var myFilter2 = gpuCompute.createShaderMaterial( myFilterFragmentShader2, { theTexture: { value: null } } );
	 *
	 * var inputTexture = gpuCompute.createTexture();
	 *
	 * // Fill in here inputTexture...
	 *
	 * myFilter1.uniforms.theTexture.value = inputTexture;
	 *
	 * var myRenderTarget = gpuCompute.createRenderTarget();
	 * myFilter2.uniforms.theTexture.value = myRenderTarget.texture;
	 *
	 * var outputRenderTarget = gpuCompute.createRenderTarget();
	 *
	 * // Now use the output texture where you want:
	 * myMaterial.uniforms.map.value = outputRenderTarget.texture;
	 *
	 * // And compute each frame, before rendering to screen:
	 * gpuCompute.doRenderTarget( myFilter1, myRenderTarget );
	 * gpuCompute.doRenderTarget( myFilter2, outputRenderTarget );
	 *
	 *
	 *
	 * @param {int} sizeX Computation problem size is always 2d: sizeX * sizeY elements.
	 * @param {int} sizeY Computation problem size is always 2d: sizeX * sizeY elements.
	 * @param {WebGLRenderer} renderer The renderer
	  */

	function GPUComputationRenderer(sizeX, sizeY, renderer) {

		this.variables = [];

		this.currentTextureIndex = 0;

		var scene = new THREE.Scene();

		var camera = new THREE.Camera();
		camera.position.z = 1;

		var passThruUniforms = {
			texture: { value: null }
		};

		var passThruShader = createShaderMaterial(getPassThroughFragmentShader(), passThruUniforms);

		var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), passThruShader);
		scene.add(mesh);

		this.addVariable = function (variableName, computeFragmentShader, initialValueTexture, options) {

			options = options || {};

			var material = this.createShaderMaterial(computeFragmentShader);

			var variable = {
				name: variableName,
				initialValueTexture: initialValueTexture,
				material: material,
				dependencies: null,
				renderTargets: [],
				wrapS: options.wrapS || null,
				wrapT: options.wrapT || null,
				minFilter: options.minFilter || THREE.NearestFilter,
				magFilter: options.magFilter || THREE.NearestFilter,
				type: options.type || THREE.FloatType
			};

			this.variables.push(variable);

			return variable;
		};

		this.setVariableDependencies = function (variable, dependencies) {

			variable.dependencies = dependencies;
		};

		this.init = function () {

			if (!renderer.extensions.get("OES_texture_float")) {

				return "No OES_texture_float support for float textures.";
			}

			if (renderer.capabilities.maxVertexTextures === 0) {

				return "No support for vertex shader textures.";
			}

			for (var i = 0; i < this.variables.length; i++) {

				var variable = this.variables[i];

				// Creates rendertargets and initialize them with input texture
				variable.renderTargets[0] = this.createRenderTarget(sizeX, sizeY, variable.wrapS, variable.wrapT, variable.minFilter, variable.magFilter, variable.type);
				variable.renderTargets[1] = this.createRenderTarget(sizeX, sizeY, variable.wrapS, variable.wrapT, variable.minFilter, variable.magFilter, variable.type);
				this.renderTexture(variable.initialValueTexture, variable.renderTargets[0]);
				this.renderTexture(variable.initialValueTexture, variable.renderTargets[1]);

				// Adds dependencies uniforms to the ShaderMaterial
				var material = variable.material;
				var uniforms = material.uniforms;
				if (variable.dependencies !== null) {

					for (var d = 0; d < variable.dependencies.length; d++) {

						var depVar = variable.dependencies[d];

						if (depVar.name !== variable.name) {

							// Checks if variable exists
							var found = false;
							for (var j = 0; j < this.variables.length; j++) {

								if (depVar.name === this.variables[j].name) {
									found = true;
									break;
								}
							}
							if (!found) {
								return "Variable dependency not found. Variable=" + variable.name + ", dependency=" + depVar.name;
							}
						}

						uniforms[depVar.name] = { value: null };

						material.fragmentShader = "\nuniform highp sampler2D " + depVar.name + ";\n" + material.fragmentShader;
					}
				}
			}

			this.currentTextureIndex = 0;

			return null;
		};

		this.compute = function () {

			var currentTextureIndex = this.currentTextureIndex;
			var nextTextureIndex = this.currentTextureIndex === 0 ? 1 : 0;

			for (var i = 0, il = this.variables.length; i < il; i++) {

				var variable = this.variables[i];

				// Sets texture dependencies uniforms
				if (variable.dependencies !== null) {

					var uniforms = variable.material.uniforms;
					for (var d = 0, dl = variable.dependencies.length; d < dl; d++) {

						var depVar = variable.dependencies[d];

						uniforms[depVar.name].value = depVar.renderTargets[currentTextureIndex].texture;
					}
				}

				// Performs the computation for this variable
				this.doRenderTarget(variable.material, variable.renderTargets[nextTextureIndex]);
			}

			this.currentTextureIndex = nextTextureIndex;
		};

		this.getCurrentRenderTarget = function (variable) {

			return variable.renderTargets[this.currentTextureIndex];
		};

		this.getAlternateRenderTarget = function (variable) {

			return variable.renderTargets[this.currentTextureIndex === 0 ? 1 : 0];
		};

		function addResolutionDefine(materialShader) {

			materialShader.defines.resolution = 'vec2( ' + sizeX.toFixed(1) + ', ' + sizeY.toFixed(1) + " )";
		};
		this.addResolutionDefine = addResolutionDefine;

		// The following functions can be used to compute things manually

		function createShaderMaterial(computeFragmentShader, uniforms) {

			uniforms = uniforms || {};

			var material = new THREE.ShaderMaterial({
				uniforms: uniforms,
				vertexShader: getPassThroughVertexShader(),
				fragmentShader: computeFragmentShader
			});

			addResolutionDefine(material);

			return material;
		};
		this.createShaderMaterial = createShaderMaterial;

		this.createRenderTarget = function (sizeXTexture, sizeYTexture, wrapS, wrapT, minFilter, magFilter, type) {

			sizeXTexture = sizeXTexture || sizeX;
			sizeYTexture = sizeYTexture || sizeY;

			wrapS = wrapS || THREE.ClampToEdgeWrapping;
			wrapT = wrapT || THREE.ClampToEdgeWrapping;

			minFilter = minFilter || THREE.NearestFilter;
			magFilter = magFilter || THREE.NearestFilter;

			type = type || THREE.FloatType;

			var renderTarget = new THREE.WebGLRenderTarget(sizeXTexture, sizeYTexture, {
				wrapS: wrapS,
				wrapT: wrapT,
				minFilter: minFilter,
				magFilter: magFilter,
				format: THREE.RGBAFormat,
				type: type,
				stencilBuffer: false
			});

			return renderTarget;
		};

		this.createTexture = function (sizeXTexture, sizeYTexture) {

			sizeXTexture = sizeXTexture || sizeX;
			sizeYTexture = sizeYTexture || sizeY;

			var a = new Float32Array(sizeXTexture * sizeYTexture * 4);
			var texture = new THREE.DataTexture(a, sizeX, sizeY, THREE.RGBAFormat, THREE.FloatType);
			texture.needsUpdate = true;

			return texture;
		};

		this.renderTexture = function (input, output) {

			// Takes a texture, and render out in rendertarget
			// input = Texture
			// output = RenderTarget

			passThruUniforms.texture.value = input;

			this.doRenderTarget(passThruShader, output);

			passThruUniforms.texture.value = null;
		};

		this.doRenderTarget = function (material, output) {

			mesh.material = material;
			renderer.render(scene, camera, output);
			mesh.material = passThruShader;
		};

		this.debug = function (variable) {

			mesh.material = variable.material;
			renderer.render(scene, camera);
		};

		// Shaders

		function getPassThroughVertexShader() {

			return "void main()	{\n" + "\n" + "	gl_Position = vec4( position, 1.0 );\n" + "\n" + "}\n";
		}

		function getPassThroughFragmentShader() {

			return "uniform highp sampler2D texture;\n" + "\n" + "void main() {\n" + "\n" + "	vec2 uv = gl_FragCoord.xy / resolution.xy;\n" + "\n" + "	gl_FragColor = texture2D( texture, uv );\n" + "\n" + "}\n";
		}
	}

	exports.default = GPUComputationRenderer;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CrowdMode = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GPUComputationRenderer = __webpack_require__(43);

	var _GPUComputationRenderer2 = _interopRequireDefault(_GPUComputationRenderer);

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _ObjectUtil = __webpack_require__(36);

	var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CrowdMode = {
	    Street: 0,
	    Gather: 1,
	    Matrix: 2,
	    Direction: 3,
	    // Boids: 4,
	    Stop: 5
	};

	var directionVel = 0.01;
	var directions = [new THREE.Vector2(-directionVel, 0.0), new THREE.Vector2(-directionVel, directionVel), new THREE.Vector2(0.0, directionVel), new THREE.Vector2(directionVel, directionVel), new THREE.Vector2(directionVel, 0.0), new THREE.Vector2(directionVel, -directionVel), new THREE.Vector2(0.0, -directionVel), new THREE.Vector2(-directionVel, -directionVel)];

	var CrowdSystem = function () {
	    function CrowdSystem(renderer, count, options) {
	        _classCallCheck(this, CrowdSystem);

	        this._sideCount = Math.ceil(Math.sqrt(count));
	        this._count = this._sideCount * this._sideCount;

	        options = options || {};

	        this.speed = options.speed || 1.0;

	        this.gpuCompute = new _GPUComputationRenderer2.default(this.sideCount, this.sideCount, renderer);

	        this.posVar = this.gpuCompute.addVariable("texturePosition", options.position, null, options);
	        this.velVar = this.gpuCompute.addVariable("textureVelocity", options.velocity, null, options);

	        var textureStreet = options.textureStreet.image;
	        this.posVar.material.uniforms.textureStreet = this.velVar.material.uniforms.textureStreet = { type: "t", value: options.textureStreet };
	        this.posVar.material.uniforms.streetTexelSize = this.velVar.material.uniforms.streetTexelSize = { type: "v4", value: new THREE.Vector4(1 / textureStreet.width, textureStreet.width, 1 / textureStreet.height, textureStreet.height) };

	        this.posVar.material.uniforms.limit = { type: "f", value: 0.000095 };
	        this.velVar.material.uniforms.throttle = { type: "f", value: 0.0 };
	        this.posVar.material.uniforms.gatherPosition = this.velVar.material.uniforms.gatherPosition = { type: "v2", value: new THREE.Vector2(0, 0) };
	        this.velVar.material.uniforms.direction = { type: "v2", value: new THREE.Vector2(directionVel, directionVel) };

	        var texel = 1 / this.sideCount;
	        this.velVar.material.defines.resolutionTexelSize = "vec2(" + texel + "," + texel + ")";

	        this.rotVar = this.gpuCompute.addVariable("textureRotation", options.rotation, null, options);

	        this.posVar.material.uniforms.movement = this.velVar.material.uniforms.movement = this.rotVar.material.uniforms.movement = { type: "i", value: CrowdMode.Street };

	        // Add variable dependencies
	        this.gpuCompute.setVariableDependencies(this.velVar, [this.velVar, this.posVar]);
	        this.gpuCompute.setVariableDependencies(this.rotVar, [this.velVar, this.rotVar, this.posVar]);
	        this.gpuCompute.setVariableDependencies(this.posVar, [this.velVar, this.posVar]);

	        this.gpuCompute.init();

	        _ObjectUtil2.default.defineUniformAccessor(this, this.posVar.material.uniforms, "movement");
	        _ObjectUtil2.default.defineUniformAccessor(this, this.posVar.material.uniforms, "limit");
	        _ObjectUtil2.default.defineUniformAccessor(this, this.velVar.material.uniforms, "throttle");
	        _ObjectUtil2.default.defineUniformAccessor(this, this.velVar.material.uniforms, "gatherPosition");
	        _ObjectUtil2.default.defineUniformAccessor(this, this.velVar.material.uniforms, "direction");
	    }

	    _createClass(CrowdSystem, [{
	        key: "init",
	        value: function init() {
	            this.velVar.material.uniforms.mode = this.posVar.material.uniforms.mode = this.rotVar.material.uniforms.mode = { type: "i", value: 0 };
	            this.velVar.material.uniforms.speed = this.posVar.material.uniforms.speed = this.rotVar.material.uniforms.speed = { type: "f", value: 1.0 };
	            this.velVar.material.uniforms.time = this.posVar.material.uniforms.time = this.rotVar.material.uniforms.time = { type: "f", value: 0.0 };
	            this.velVar.material.uniforms.dt = this.posVar.material.uniforms.dt = this.rotVar.material.uniforms.dt = { type: "f", value: 0.0 };

	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.velVar.material.uniforms.mode.value = 1;
	            this.velVar.material.uniforms.dt.value = dt;
	            this.velVar.material.uniforms.time.value = t;
	            this.velVar.material.uniforms.speed.value = this.speed;
	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "randomizeDirection",
	        value: function randomizeDirection() {
	            var v = Math.random();
	            if (v < 0.33) {
	                this.direction.x *= -1;
	            } else if (v < 0.66) {
	                this.direction.y *= -1;
	            } else {
	                this.direction.x *= -1;
	                this.direction.y *= -1;
	            }
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {}
	    }, {
	        key: "sideCount",
	        get: function get() {
	            return this._sideCount;
	        }
	    }, {
	        key: "count",
	        get: function get() {
	            return this._count;
	        }
	    }, {
	        key: "position",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.posVar).texture;
	        }
	    }, {
	        key: "velocity",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.velVar).texture;
	        }
	    }, {
	        key: "rotation",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.rotVar).texture;
	        }
	    }]);

	    return CrowdSystem;
	}();

	exports.default = CrowdSystem;
	exports.CrowdMode = CrowdMode;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var OSM = function OSM(data) {
	    var _this = this;

	    _classCallCheck(this, OSM);

	    this.nodes = {};
	    this.buildings = [];
	    this.highways = [];

	    data.elements.forEach(function (elem) {
	        switch (elem.type) {
	            case "node":
	                _this.nodes[elem.id] = elem;
	                break;

	            case "way":
	                var tags = elem.tags;
	                if (!tags) return;

	                if (tags.building) {
	                    _this.buildings.push(elem);
	                } else if (tags.highway) {
	                    _this.highways.push(elem);
	                }

	                break;
	        }
	    });
	};

	exports.default = OSM;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _TextureUtil = __webpack_require__(24);

	var _TextureUtil2 = _interopRequireDefault(_TextureUtil);

	var _Highway = __webpack_require__(47);

	var _Highway2 = _interopRequireDefault(_Highway);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var kCoordinateThreshold = 8;

	var HighwayGroup = function (_THREE$Object3D) {
	    _inherits(HighwayGroup, _THREE$Object3D);

	    function HighwayGroup(osm, boundary, converter) {
	        _classCallCheck(this, HighwayGroup);

	        var _this = _possibleConstructorReturn(this, (HighwayGroup.__proto__ || Object.getPrototypeOf(HighwayGroup)).call(this));

	        var min = {
	            x: Number.MAX_VALUE,
	            y: Number.MAX_VALUE
	        };

	        var max = {
	            x: Number.MIN_VALUE,
	            y: Number.MIN_VALUE
	        };

	        /*
	            if(coordinates.length < kCoordinateThreshold) {
	                return;
	            }
	        */

	        var group = osm.highways.map(function (elem) {
	            var coordinates = elem.nodes.map(function (idx) {
	                return osm.nodes[idx];
	            });
	            return coordinates.filter(function (coord) {
	                return boundary.n >= coord.lat && boundary.w <= coord.lon && coord.lat >= boundary.s && coord.lon <= boundary.e;
	            });
	        });

	        _this.highways = [];

	        group.forEach(function (coordinates) {

	            if (coordinates.length <= 2) return;

	            var distance = 0;
	            for (var i = 0, n = coordinates.length - 1; i < n; i++) {
	                var p = coordinates[i];
	                var n = coordinates[i + 1];
	                var dx = p.lon - n.lon;
	                var dy = p.lat - n.lat;
	                distance += dx * dx + dy * dy;
	            }
	            if (distance * 10000000 < 0.05) return;

	            var h = new _Highway2.default(coordinates);

	            var points = coordinates.map(function (coord) {
	                min.x = Math.min(coord.lon, min.x);
	                min.y = Math.min(coord.lat, min.y);
	                max.x = Math.max(coord.lon, max.x);
	                max.y = Math.max(coord.lat, max.y);

	                return new THREE.Vector2(coord.lon, coord.lat);
	            });
	            h.split(points, 32);

	            _this.highways.push(h);
	        });

	        _this.min = min;
	        _this.max = max;
	        return _this;
	    }

	    _createClass(HighwayGroup, [{
	        key: "getStreamPosition",
	        value: function getStreamPosition(lon, lat) {
	            var range = this.range;
	            return {
	                x: (lon - this.min.x) / range.x,
	                y: (lat - this.min.y) / range.y
	            };
	        }
	    }, {
	        key: "texture",
	        value: function texture(gsi) {
	            var _this2 = this;

	            var range = this.range;
	            var w = 1 / range.x;
	            var h = 1 / range.y;

	            var column = 0;
	            var maxLength = 0;
	            this.highways.forEach(function (highway, i) {
	                maxLength = Math.max(maxLength, highway.distance);
	            });

	            var colors = [[1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1], [1, 0, 1, 1]];

	            var rows = this.highways.map(function (highway, i) {
	                var ratio = highway.distance / maxLength;
	                var row = highway.samples.map(function (coord, i) {
	                    var x = (coord.x - _this2.min.x) * w;
	                    var y = (coord.y - _this2.min.y) * h;
	                    return [x, y, 0, ratio];
	                    // return colors[i % colors.length];
	                });
	                column = Math.max(row.length, column);
	                return row;
	            });

	            var data = rows.map(function (row) {
	                var pixels = [];

	                var n = row.length;
	                var length = n - 1;

	                var k = 0;
	                var next = 1;
	                var indices = [];
	                // let ratio = length / column;

	                // columnは最大長さ
	                for (var i = 0; i < column; i++) {
	                    indices.push(k);
	                    var pixel = row[k];
	                    k += next;
	                    if (k > length) {
	                        k = length - 1;
	                        next = -next;
	                    } else if (k < 0) {
	                        k = 1;
	                        next = -next;
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

	            var array = new Float32Array(Array.prototype.concat.apply([], data));
	            return _TextureUtil2.default.create(column, rows.length, array, {});
	        }
	    }, {
	        key: "connect",
	        value: function connect() {
	            for (var i = 0, n = this.highways.length; i < n; i++) {
	                var h0 = this.highways[i];
	                for (var j = 0; j < n; j++) {
	                    if (i == j) {
	                        continue;
	                    }
	                    var h1 = this.highways[j];
	                    var con = h0.intersects(h1);
	                    if (con) {
	                        var j0 = h0.connect(con);
	                        var j1 = h1.connect(con);
	                    }
	                }
	            }
	        }
	    }, {
	        key: "range",
	        get: function get() {
	            return {
	                x: this.max.x - this.min.x,
	                y: this.max.y - this.min.y
	            };
	        }
	    }]);

	    return HighwayGroup;
	}(THREE.Object3D);

	exports.default = HighwayGroup;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HighwayJoint = function () {
	    function HighwayJoint(highway, index) {
	        _classCallCheck(this, HighwayJoint);

	        this.highway = highway;
	        this.index = index;
	    }

	    _createClass(HighwayJoint, [{
	        key: "contains",
	        value: function contains(highway) {
	            return this.highway == highway;
	        }
	    }]);

	    return HighwayJoint;
	}();

	var HighwayConnection = function () {
	    function HighwayConnection(j0, j1) {
	        _classCallCheck(this, HighwayConnection);

	        this.j0 = j0;
	        this.j1 = j1;
	    }

	    _createClass(HighwayConnection, [{
	        key: "getJoint",
	        value: function getJoint(highway) {
	            if (this.j0.contains(highway)) {
	                return this.j0;
	            }
	            return this.j1;
	        }
	    }, {
	        key: "getOther",
	        value: function getOther(highway) {
	            if (this.j0.contains(highway)) {
	                return this.j1;
	            }
	            return this.j0;
	        }
	    }]);

	    return HighwayConnection;
	}();

	var Highway = function () {
	    function Highway(coordinates) {
	        _classCallCheck(this, Highway);

	        this.coordinates = coordinates;

	        var length = 0;
	        for (var i = 0, n = coordinates.length - 1; i < n; i++) {
	            var p0 = coordinates[i];
	            var p1 = coordinates[i + 1];
	            var dlon = p0.lon - p1.lon;
	            var dlat = p0.lat - p1.lat;
	            length += Math.sqrt(dlon * dlon + dlat * dlat);
	        }
	        this.length = length;

	        this.connections = {};
	    }

	    _createClass(Highway, [{
	        key: "split",
	        value: function split(points) {
	            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

	            var distance = 0;

	            for (var i = 0, n = points.length; i < n - 1; i++) {
	                var from = points[i];
	                var to = points[i + 1];
	                var d = from.distanceTo(to);
	                distance += d;
	            }

	            this.distance = distance;

	            var interval = distance / count;
	            var prev = points[0];
	            var samples = [prev];

	            var remain = count - 1;
	            var cur = 1;

	            while (true) {
	                var _to = points[cur];
	                var _d = prev.distanceTo(_to);

	                if (_d >= interval || cur >= points.length - 1) {
	                    // let sub = (new THREE.Vector3()).subVectors(to, prev);
	                    var sub = new THREE.Vector2().subVectors(_to, prev);
	                    sub.setLength(interval);

	                    // let next = (new THREE.Vector3()).addVectors(prev, sub);
	                    var next = new THREE.Vector2().addVectors(prev, sub);
	                    samples.push(next);

	                    prev = next;

	                    remain--;
	                } else {
	                    cur++;
	                }

	                if (remain <= 0 || cur >= points.length) {
	                    break;
	                }
	            }

	            this.samples = samples;
	        }
	    }, {
	        key: "branch",
	        value: function branch(index) {
	            return this.connections[index];
	        }
	    }, {
	        key: "connect",
	        value: function connect(con) {
	            var joint = con.getJoint(this);
	            if (!this.connections[joint.index]) {
	                this.connections[joint.index] = [];
	            }
	            this.connections[joint.index].push(con.getOther(this));

	            return joint;
	        }
	    }, {
	        key: "intersects",
	        value: function intersects(other) {
	            for (var i = 0, n = this.segments.length; i < n; i++) {
	                var s0 = this.segments[i];
	                for (var j = 0, m = other.segments.length; j < m; j++) {
	                    var s1 = other.segments[j];
	                    if (s0.intersects(s1)) {
	                        return new HighwayConnection(new HighwayJoint(this, i), new HighwayJoint(other, j));
	                    }
	                }
	            }

	            return false;
	        }
	    }]);

	    return Highway;
	}();

	exports.default = Highway;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CELModes = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tween = __webpack_require__(1);

	var _Tween2 = _interopRequireDefault(_Tween);

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _ObjectUtil = __webpack_require__(36);

	var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

	var _CELMesh = __webpack_require__(49);

	var _CELMesh2 = _interopRequireDefault(_CELMesh);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CEL = function (_THREE$Object3D) {
	    _inherits(CEL, _THREE$Object3D);

	    function CEL() {
	        _classCallCheck(this, CEL);

	        var _this = _possibleConstructorReturn(this, (CEL.__proto__ || Object.getPrototypeOf(CEL)).call(this));

	        _this.boundingBox = null;
	        _this.depthBuffer = null;
	        _this.meshes = [];

	        _this.speed = 0.25;
	        return _this;
	    }

	    _createClass(CEL, [{
	        key: "setup",
	        value: function setup() {
	            var _this2 = this;

	            var lowpoly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	            var promise = new Promise(function (resolve, reject) {
	                var celLoader = new _CELMesh.CELMeshLoader();
	                var pathes = ["Tile_173078_LD_012_017_", "Tile_173078_LD_011_017_", "Tile_173078_LD_012_018_", "Tile_173078_LD_011_018_"];

	                var prefix = lowpoly ? "../dest/models/SizeS/" : "../dest/models/SizeM/";
	                var suffix = lowpoly ? "L15" : "L18";
	                var loaders = pathes.map(function (path) {
	                    return celLoader.load(prefix + path + suffix);
	                });
	                Promise.all(loaders).then(function (meshes) {
	                    var city = new THREE.Object3D();

	                    _this2.meshes = meshes;
	                    _this2.meshes.forEach(function (mesh, i) {
	                        city.add(mesh);
	                    });

	                    var cityScale = 4.625;

	                    var scramble = meshes[2];
	                    // let scramble = meshes[3];
	                    var box = scramble.box;
	                    city.position.set(-box.max.x, -box.max.y, -box.max.z);

	                    _this2.add(city);
	                    _this2.rotation.set(-Math.PI * 0.5, 0, 0);
	                    var height = box.max.z - box.min.z;
	                    _this2.position.set(0, height * cityScale, 0);
	                    _this2.scale.set(cityScale, cityScale, cityScale);

	                    _ObjectUtil2.default.defineArrayAccessor(_this2, _this2.meshes, "wireframe");
	                    _ObjectUtil2.default.defineArrayAccessor(_this2, _this2.meshes, "noise");

	                    resolve(_this2);
	                });
	            });

	            return promise;
	        }
	    }, {
	        key: "setupDepth",
	        value: function setupDepth(renderer) {
	            var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1024;
	            var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1024;

	            var depthScene = new THREE.Scene();
	            this.depthBuffer = new THREE.WebGLRenderTarget(width, height, {
	                format: THREE.RGBAFormat,
	                stencilBuffer: false,
	                wrapS: THREE.ClampToEdgeWrapping,
	                wrapT: THREE.ClampToEdgeWrapping
	            });

	            this.setMaterial("depth");
	            depthScene.add(this);

	            this.updateMatrixWorld(true);
	            var boundary = this.computeBoundingBox();

	            // left, right, top, bottom, near, far
	            var depth = boundary.max.y - boundary.min.y;
	            var center = new THREE.Vector3().addVectors(boundary.min, boundary.max).multiplyScalar(0.5);
	            var bw = boundary.max.x - boundary.min.x;
	            var bh = boundary.max.z - boundary.min.z;

	            var depthCamera = new THREE.OrthographicCamera(-bw * 0.5, bw * 0.5, bh * 0.5, -bh * 0.5, 0.001, depth);
	            depthCamera.position.set(center.x, boundary.max.y, center.z);
	            depthCamera.up.set(0, 0, -1);
	            depthCamera.lookAt(new THREE.Vector3(center.x, 0, center.z));

	            renderer.render(depthScene, depthCamera, this.depthBuffer, true);
	            depthScene.remove(this);
	        }
	    }, {
	        key: "setMaterial",
	        value: function setMaterial(key) {
	            this.meshes.forEach(function (mesh) {
	                mesh.setMaterial(key);
	            });
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.noise.y += dt * this.speed;
	            this.meshes.forEach(function (mesh) {
	                mesh.update(dt, t);
	            });
	        }
	    }, {
	        key: "computeBoundingBox",
	        value: function computeBoundingBox() {
	            if (this.boundingBox != null) {
	                return this.boundingBox;
	            }

	            var min = new THREE.Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	            var max = new THREE.Vector3(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);

	            this.meshes.forEach(function (mesh) {
	                var b = mesh.geometry.boundingBox;
	                var x0 = b.min.x,
	                    y0 = b.min.y,
	                    z0 = b.min.z;
	                var x1 = b.max.x,
	                    y1 = b.max.y,
	                    z1 = b.max.z;

	                var c0 = new THREE.Vector3(x0, y0, z0),
	                    c1 = new THREE.Vector3(x1, y0, z0),
	                    c2 = new THREE.Vector3(x1, y0, z1),
	                    c3 = new THREE.Vector3(x0, y0, z1);
	                var c4 = new THREE.Vector3(x0, y1, z0),
	                    c5 = new THREE.Vector3(x1, y1, z0),
	                    c6 = new THREE.Vector3(x1, y1, z1),
	                    c7 = new THREE.Vector3(x0, y1, z1);
	                [c0, c1, c2, c3, c4, c5, c6, c7].forEach(function (c) {
	                    var position = mesh.localToWorld(c);
	                    min.min(position);
	                    max.max(position);
	                });
	            });

	            this.boundingBox = new THREE.Box3(min, max);
	            return this.boundingBox;
	        }
	    }, {
	        key: "animateNoiseIntensity",
	        value: function animateNoiseIntensity(to) {
	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

	            var self = this;
	            _Tween2.default.remove(self.noiseIntensityTween);
	            var cur = self.noise.clone();
	            self.noiseIntensityTween = new _Tween2.default.Tween({
	                intensity: cur.x
	            }).to({
	                intensity: to
	            }, duration).easing(_Tween2.default.Easing.Quadratic.Out).onUpdate(function () {
	                cur.x = this.intensity;
	                self.noise = cur;
	            }).start();
	        }
	    }, {
	        key: "animateWireframe",
	        value: function animateWireframe() {
	            var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

	            var self = this;
	            _Tween2.default.remove(self.wireframeTween);
	            var cur = self.wireframe;
	            self.wireframeTween = new _Tween2.default.Tween({
	                wireframe: self.wireframe
	            }).to({
	                wireframe: to
	            }, duration).easing(_Tween2.default.Easing.Quadratic.Out).onUpdate(function () {
	                self.wireframe = this.wireframe;
	            }).onComplete(function () {
	                self.wireframe = to;
	            }).start();
	        }
	    }]);

	    return CEL;
	}(THREE.Object3D);

	exports.default = CEL;
	exports.CELModes = _CELMesh.CELModes;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CELMeshLoader = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	__webpack_require__(20);

	var _ObjectUtil = __webpack_require__(36);

	var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CELMeshLoader = function (_THREE$OBJLoader) {
	    _inherits(CELMeshLoader, _THREE$OBJLoader);

	    function CELMeshLoader() {
	        _classCallCheck(this, CELMeshLoader);

	        return _possibleConstructorReturn(this, (CELMeshLoader.__proto__ || Object.getPrototypeOf(CELMeshLoader)).call(this));
	    }

	    _createClass(CELMeshLoader, [{
	        key: "load",
	        value: function load(path) {
	            var _this2 = this;

	            return new Promise(function (resolve, reject) {
	                _get(CELMeshLoader.prototype.__proto__ || Object.getPrototypeOf(CELMeshLoader.prototype), "load", _this2).call(_this2, path + ".obj", function (model) {
	                    var mesh = new CELMesh(model, path);
	                    resolve(mesh);
	                });
	            });
	        }
	    }]);

	    return CELMeshLoader;
	}(THREE.OBJLoader);

	var CELMesh = function (_THREE$Mesh) {
	    _inherits(CELMesh, _THREE$Mesh);

	    function CELMesh(model, path) {
	        _classCallCheck(this, CELMesh);

	        var mesh = model.children[0];
	        var geometry = mesh.geometry;
	        geometry.computeBoundingBox();

	        var count = geometry.attributes.position.count;
	        var barycentric = [];
	        for (var i = 0; i < count; i += 3) {
	            barycentric.push(1, 0, 0);
	            barycentric.push(0, 1, 0);
	            barycentric.push(0, 0, 1);
	        }
	        geometry.addAttribute("barycentric", new THREE.Float32BufferAttribute(barycentric, 3));

	        var texture = new THREE.TextureLoader().load(path + "_0.jpg");

	        var _this3 = _possibleConstructorReturn(this, (CELMesh.__proto__ || Object.getPrototypeOf(CELMesh)).call(this, geometry, null));

	        var frag = __webpack_require__(50);

	        var uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, THREE.UniformsLib.fog, {
	            textureCEL: { type: "t", value: null }
	        }]);

	        _this3.materials = {
	            basic: new THREE.ShaderMaterial({
	                uniforms: THREE.UniformsUtils.merge([uniforms, {
	                    wireframe: { type: "f", value: 0.0 },
	                    noise: { type: "v3", value: new THREE.Vector3(0, 0, 0.01) }
	                }]),
	                vertexShader: __webpack_require__(51),
	                fragmentShader: frag,
	                transparent: true,
	                lights: true,
	                fog: true
	            }),
	            depth: new THREE.MeshDepthMaterial({})
	        };

	        _this3.materials.basic.extensions = {
	            derivatives: true
	        };

	        _this3.material = _this3.materials.basic;

	        for (var key in _this3.materials) {
	            var mat = _this3.materials[key];
	            if (mat.uniforms && mat.uniforms["textureCEL"]) {
	                mat.uniforms["textureCEL"].value = texture;
	            }
	        }

	        _this3.frustumCulled = false;
	        _this3.castShadow = false;
	        _this3.receiveShadow = true;

	        _ObjectUtil2.default.defineUniformAccessor(_this3, _this3.materials.basic.uniforms, "wireframe");

	        _ObjectUtil2.default.defineUniformAccessor(_this3, _this3.materials.basic.uniforms, "noise");

	        _ObjectUtil2.default.defineUniformAccessor(_this3, _this3.materials.basic.uniforms, "voxelIntensity");
	        _ObjectUtil2.default.defineUniformAccessor(_this3, _this3.materials.basic.uniforms, "voxel0");
	        _ObjectUtil2.default.defineUniformAccessor(_this3, _this3.materials.basic.uniforms, "voxel1");
	        _ObjectUtil2.default.defineUniformAccessor(_this3, _this3.materials.basic.uniforms, "voxelT");
	        return _this3;
	    }

	    _createClass(CELMesh, [{
	        key: "setMaterial",
	        value: function setMaterial(key) {
	            switch (key) {
	                case "depth":
	                    this.material = this.materials.depth;
	                    break;
	                default:
	                    this.material = this.materials.basic;
	                    this.material.depthWrite = key == "basic";
	                    break;
	            }
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {}
	    }, {
	        key: "width",
	        get: function get() {
	            var box = this.box;
	            return (box.max.x - box.min.x) * shibuyaScale;
	        }
	    }, {
	        key: "height",
	        get: function get() {
	            var box = this.box;
	            return (box.max.y - box.min.y) * shibuyaScale;
	        }
	    }, {
	        key: "box",
	        get: function get() {
	            return this.geometry.boundingBox;
	        }
	    }]);

	    return CELMesh;
	}(THREE.Mesh);

	exports.default = CELMesh;
	exports.CELMeshLoader = CELMeshLoader;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform sampler2D textureCEL;\n\nuniform float wireframe;\n\nvarying vec2 vUv;\nvarying vec3 vBarycentric;\n\n#include <common>\n#include <packing>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <fog_pars_fragment>\n\nconst float gain = 0.9;\n\nvoid main() {\n    vec3 d = fwidth(vBarycentric);\n    vec3 a3 = smoothstep(vec3(0.0), gain * d, vBarycentric);\n    float t = (1.0 - min(min(a3.x, a3.y), a3.z));\n\n    // far shadow be lighter\n    float shadow = getShadowMask();\n    float depth = gl_FragCoord.z;\n    shadow *= depth;\n\n    vec4 color = texture2D(textureCEL, vUv);\n    color.rgb *= mix(0.5, 1.0, shadow);\n\n    gl_FragColor = mix(color, color * t, wireframe);\n\n    #include <fog_fragment>\n}\n"

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x) {\n     return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_4 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_5 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_5;\n  vec3 i1 = min( g_1_5.xyz, l.zxy );\n  vec3 i2 = max( g_1_5.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_4.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_0(i);\n  vec4 p = permute_1_1( permute_1_1( permute_1_1(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_4.wyz - D_1_4.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_6 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_7 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_6.xy,h.z);\n  vec3 p3 = vec3(a1_1_6.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_2(vec4(dot(p0_1_7,p0_1_7), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_7 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_7,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nattribute vec3 barycentric;\n\nuniform vec3 noise;\n\n#include <shadowmap_pars_vertex>\n#include <fog_pars_vertex>\n\nvarying vec3 vBarycentric;\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    vBarycentric = barycentric;\n\n\t#include <begin_vertex>\n\n    vec3 seed = position * noise.z + vec3(0, noise.y, 0);\n    vec3 displacement = (vec3(\n        snoise_1_3(seed.xyz),\n        snoise_1_3(seed.yzx),\n        snoise_1_3(seed.zxy)\n    ) - 0.5) * noise.x;\n    transformed.xyz = transformed.xyz + displacement;\n\n    vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);\n    vec4 mvPosition = viewMatrix * vec4(worldPosition.xyz, 1.0);\n\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n    gl_Position = projectionMatrix * mvPosition;\n}\n"

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Tween = __webpack_require__(1);

	var _Tween2 = _interopRequireDefault(_Tween);

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _ObjectUtil = __webpack_require__(36);

	var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

	var _ParticleMesh2 = __webpack_require__(53);

	var _ParticleMesh3 = _interopRequireDefault(_ParticleMesh2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SRParticleMesh = function (_ParticleMesh) {
	    _inherits(SRParticleMesh, _ParticleMesh);

	    function SRParticleMesh(sideCount, size, options) {
	        _classCallCheck(this, SRParticleMesh);

	        options = options || {};
	        options.uniforms = THREE.UniformsUtils.merge([options.uniforms || {}, {
	            textureParticle: { type: "f", value: null },
	            alpha: { type: "f", value: 0.75 },
	            threshold: { type: "f", value: 5.0 }
	        }]);

	        var _this = _possibleConstructorReturn(this, (SRParticleMesh.__proto__ || Object.getPrototypeOf(SRParticleMesh)).call(this, sideCount, size, options));

	        _this.material.blending = THREE.CustomBlending;
	        _this.material.blendEquation = THREE.AddEquation;
	        _this.material.blendSrc = THREE.SrcAlphaFactor;
	        _this.material.blendDst = THREE.OneFactor;
	        _this.material.depthWrite = false;

	        _ObjectUtil2.default.defineUniformAccessor(_this, _this.material.uniforms, "size");
	        return _this;
	    }

	    return SRParticleMesh;
	}(_ParticleMesh3.default);

	exports.default = SRParticleMesh;

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var build = function build() {
	    var sideCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
	    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	    var geometry = new THREE.BufferGeometry();

	    var indices = [];
	    var vertices = [];
	    var centers = [];
	    var uv = [];
	    var uv2 = [];

	    var inv = 1 / sideCount;
	    var hsize = size * 0.5;
	    for (var y = 0; y < sideCount; y++) {
	        for (var x = 0; x < sideCount; x++) {
	            var px = x;
	            var py = y;

	            var u = x * inv;
	            var v = y * inv;

	            vertices.push(x, y, 0); // lt
	            uv2.push(0, 0);

	            vertices.push(x + size, y, 0); // rt
	            uv2.push(1, 0);

	            vertices.push(x + size, y + size, 0); // rb
	            uv2.push(1, 1);

	            vertices.push(x, y + size, 0); // lb
	            uv2.push(0, 1);

	            var centerX = x + hsize;
	            var centerY = y + hsize;
	            for (var i = 0; i < 4; i++) {
	                centers.push(centerX, centerY, 0);
	                uv.push(u, v);
	            }
	        }
	    }

	    var len = vertices.length / 3;
	    for (var _i = 0; _i < len; _i += 4) {
	        var a = _i,
	            b = _i + 1,
	            c = _i + 2,
	            d = _i + 3;
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

	var ParticleMesh = function (_THREE$Mesh) {
	    _inherits(ParticleMesh, _THREE$Mesh);

	    function ParticleMesh(sideCount, size, options) {
	        _classCallCheck(this, ParticleMesh);

	        var geometry = build(sideCount, size);

	        options = options || {};

	        var _this = _possibleConstructorReturn(this, (ParticleMesh.__proto__ || Object.getPrototypeOf(ParticleMesh)).call(this, geometry, new THREE.RawShaderMaterial({
	            vertexShader: options.vertexShader,
	            fragmentShader: options.fragmentShader,
	            uniforms: THREE.UniformsUtils.merge([{
	                time: { type: "f", value: 0.0 },
	                size: { type: "f", value: 1.0 },
	                texturePosition: { type: "t", value: null },
	                textureRotation: { type: "t", value: null },
	                textureVelocity: { type: "t", value: null }
	            }, options.uniforms]),
	            transparent: true,
	            side: THREE.DoubleSide
	        })));

	        _this.frustumCulled = false;
	        return _this;
	    }

	    _createClass(ParticleMesh, [{
	        key: 'size',
	        get: function get() {
	            return this.material.uniforms.size.value;
	        },
	        set: function set(v) {
	            return this.material.uniforms.size.value = v;
	        }
	    }]);

	    return ParticleMesh;
	}(THREE.Mesh);

	exports.default = ParticleMesh;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Tween = __webpack_require__(1);

	var _Tween2 = _interopRequireDefault(_Tween);

	__webpack_require__(20);

	var _MathUtil = __webpack_require__(23);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	var _ObjectUtil = __webpack_require__(36);

	var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LowpolyAnimation = {
	    idleEnd: { type: "v2", value: new THREE.Vector2(5.6, 29) },
	    idleAnimScale: { type: "v3", value: new THREE.Vector3(0.7469875, 1.96503, 0.874217) },
	    idleAnimOffset: { type: "v3", value: new THREE.Vector3(-0.40479, -0.01306768, -0.3395334) },

	    walkEnd: { type: "v2", value: new THREE.Vector2(1.6, 8) },
	    walkAnimScale: { type: "v3", value: new THREE.Vector3(0.6830251, 1.937408, 1.168666) },
	    walkAnimOffset: { type: "v3", value: new THREE.Vector3(-0.3224577, -0.05507544, -0.6959282) },

	    runEnd: { type: "v2", value: new THREE.Vector2(1.2, 6) },
	    runAnimScale: { type: "v3", value: new THREE.Vector3(0.6909093, 1.903564, 1.669754) },
	    runAnimOffset: { type: "v3", value: new THREE.Vector3(-0.3355445, -0.04656972, -0.9657606) }
	};

	var MarineAnimation = {
	    idleEnd: { type: "v2", value: new THREE.Vector2(4, 19.5) },
	    idleAnimScale: { type: "v3", value: new THREE.Vector3(45.94874, 189.3317, 59.17) },
	    idleAnimOffset: { type: "v3", value: new THREE.Vector3(-21.52636, -0.3575773, -32.31999) },

	    walkEnd: { type: "v2", value: new THREE.Vector2(1, 5) },
	    walkAnimScale: { type: "v3", value: new THREE.Vector3(97.86209, 189.1355, 69.99985) },
	    walkAnimOffset: { type: "v3", value: new THREE.Vector3(-51.81821, -0.9133741, -38.39777) },

	    runEnd: { type: "v2", value: new THREE.Vector2(0.7333334, 4) },
	    runAnimScale: { type: "v3", value: new THREE.Vector3(122.8473, 190.9063, 85.10907) },
	    runAnimOffset: { type: "v3", value: new THREE.Vector3(-70.50955, 0.5363531, -46.94572) }
	};

	var CrowdMesh = function (_THREE$Mesh) {
	    _inherits(CrowdMesh, _THREE$Mesh);

	    function CrowdMesh(folder, instances, options) {
	        _classCallCheck(this, CrowdMesh);

	        options = options || {};

	        var marine = options.marine || false;
	        if (marine) {
	            folder += "marine/";
	        } else {
	            folder += "lowpoly/";
	        }

	        var uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, THREE.UniformsLib.fog, marine ? MarineAnimation : LowpolyAnimation,, {
	            textureIdle: { type: "t", value: null },
	            idleTexelSize: { type: "v2", value: new THREE.Vector2(0, 0) },

	            textureWalk: { type: "t", value: null },
	            walkTexelSize: { type: "v2", value: new THREE.Vector2(0, 0) },

	            textureRun: { type: "t", value: null },
	            runTexelSize: { type: "v2", value: new THREE.Vector2(0, 0) },

	            texturePosition: { type: "t", value: options.texturePosition },
	            textureVelocity: { type: "t", value: options.textureVelocity },
	            textureRotation: { type: "t", value: options.textureRotation },

	            useSlit: { type: "f", value: 0.0 },
	            slitScale: { type: "v4", value: new THREE.Vector4(5.0, 4.2, 0.1, 0.1) },
	            slitSpeed: { type: "v4", value: new THREE.Vector4(0.6, 0.6, 1, 1) },
	            slitOffset: { type: "f", value: 0.0 },
	            slitSize: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
	            // textureNoise: { type: "t", value: null },

	            textureBoundaryDepth: { type: "t", value: null },
	            useBoundary: { type: "f", value: 1.0 },
	            boundaryMin: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
	            boundaryMax: { type: "v3", value: new THREE.Vector3(1, 1, 1) },

	            streetScale: { type: "v3", value: options.streetScale },
	            streetOffset: { type: "v3", value: options.streetOffset },

	            useEnv: { type: "f", value: 0.46 },
	            textureEnv: { type: "t", value: null },

	            center: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
	            height: { type: "f", value: 0.0 },
	            fps: { type: "f", value: 5.0 },
	            time: { type: "f", value: 0.0 },

	            // mesh physical
	            diffuse: { type: "v3", value: new THREE.Color(0xfce9db) },
	            emissive: { type: "v3", value: new THREE.Color(0x111111) },
	            roughness: { type: "f", value: 1.0 },
	            metalness: { type: "f", value: 0.0 },
	            opacity: { type: "f", value: 1.0 },
	            reflectivity: { type: "f", value: 0.4 },
	            envMapIntensity: { type: "f", value: 0.5 },
	            clearCoat: { type: "f", value: 1.0 },
	            clearCoatRoughness: { type: "f", value: 1.0 }
	        }]);

	        var defineMarine = marine ? 1.0 : 0.01;

	        var _this = _possibleConstructorReturn(this, (CrowdMesh.__proto__ || Object.getPrototypeOf(CrowdMesh)).call(this, new THREE.Geometry(), new THREE.RawShaderMaterial({
	            vertexShader: __webpack_require__(55),
	            fragmentShader: __webpack_require__(56),
	            uniforms: uniforms,
	            // side: THREE.DoubleSide
	            side: THREE.BackSide,
	            lights: true,
	            fog: true,
	            defines: {
	                MARINE: defineMarine,
	                USE_FOG: true
	            }
	        })));

	        _this.customDepthMaterial = new THREE.RawShaderMaterial({
	            vertexShader: _this.material.vertexShader,
	            fragmentShader: __webpack_require__(57),
	            defines: {
	                MARINE: defineMarine,
	                DEPTH: true
	            },
	            uniforms: uniforms
	        });

	        var alone = new THREE.Mesh(new THREE.Geometry(), new THREE.RawShaderMaterial({
	            vertexShader: _this.material.vertexShader,
	            fragmentShader: _this.material.fragmentShader,
	            uniforms: _this.material.uniforms,
	            defines: {
	                MARINE: defineMarine,
	                ALONE: true,
	                USE_FOG: true
	            },
	            side: THREE.BackSide,
	            lights: true,
	            fog: true
	        }));
	        alone.customDepthMaterial = new THREE.RawShaderMaterial({
	            vertexShader: _this.customDepthMaterial.vertexShader,
	            fragmentShader: _this.customDepthMaterial.fragmentShader,
	            defines: {
	                MARINE: defineMarine,
	                DEPTH: true,
	                ALONE: true
	            },
	            uniforms: uniforms
	        });
	        alone.castShadow = true;
	        alone.frustumCulled = false;
	        _this.add(alone);

	        _this.castShadow = true;
	        // this.castShadow = this.receiveShadow = true;

	        Promise.all([_this.loadTexture(folder + "Idle.png"), _this.loadTexture(folder + "Walk.png"), _this.loadTexture(folder + "Run.png"), _this.loadTexture("../dest/textures/env/shibuya.jpg"), _this.loadTexture("../dest/textures/noise/perlin.jpg")]).then(function (textures) {
	            _this.material.uniforms.textureIdle.value = textures[0];
	            _this.material.uniforms.idleTexelSize.value = new THREE.Vector2(1 / textures[0].image.width, 1 / textures[0].image.height);

	            _this.material.uniforms.textureWalk.value = textures[1];
	            _this.material.uniforms.walkTexelSize.value = new THREE.Vector2(1 / textures[1].image.width, 1 / textures[1].image.height);

	            _this.material.uniforms.textureRun.value = textures[2];
	            _this.material.uniforms.runTexelSize.value = new THREE.Vector2(1 / textures[2].image.width, 1 / textures[2].image.height);

	            var cubemap = options.equiToCube.convert(textures[3], 1024);
	            _this.material.uniforms.textureEnv.value = cubemap;

	            var textureNoise = textures[4];
	            textureNoise.wrapS = textureNoise.wrapT = THREE.RepeatWrapping;
	            // this.material.uniforms.textureNoise.value = textureNoise;

	            var objLoader = new THREE.OBJLoader();
	            objLoader.load(folder + "Human.obj", function (model) {
	                var mesh = model.children[0];

	                var bgeo = mesh.geometry;
	                bgeo.computeBoundingBox();
	                uniforms.height.value = bgeo.boundingBox.max.y;

	                alone.geometry = bgeo;

	                var igeo = new THREE.InstancedBufferGeometry();
	                // bgeo.computeVertexNormals();
	                // bgeo.computeFaceNormals();

	                igeo.addAttribute("position", bgeo.attributes.position.clone());
	                igeo.addAttribute("normal", bgeo.attributes.normal.clone());
	                igeo.addAttribute("uv", bgeo.attributes.uv.clone());

	                var scales = new THREE.InstancedBufferAttribute(new Float32Array(instances * 3), 3, 1);
	                for (var i = 0, n = scales.count; i < n; i++) {
	                    var sy = Math.random() * 0.15 + 0.85;
	                    scales.setXYZ(i, Math.random() * 0.1 + 0.9, sy, sy);
	                }

	                var offsets = new THREE.InstancedBufferAttribute(new Float32Array(instances * 4), 4, 1);
	                for (var _i = 0, _n = offsets.count; _i < _n; _i++) {
	                    offsets.setXYZW(_i, Math.random() * 0.5, // expansion
	                    0, // unused
	                    Math.random() * 30.0, // offset for animation
	                    Math.random() * 0.2 + 0.8 // speed for animation
	                    );
	                }

	                // uv for sampling
	                var uv2 = new THREE.InstancedBufferAttribute(new Float32Array(instances * 2), 2, 1);
	                var sideCount = Math.sqrt(instances);
	                var invSideCount = 1 / sideCount;
	                var uvOffset = 0.5 * invSideCount;
	                for (var _i2 = 0, _n2 = uv2.count; _i2 < _n2; _i2++) {
	                    uv2.setXY(_i2, _i2 % sideCount * invSideCount + uvOffset, Math.floor(_i2 / sideCount) * invSideCount + uvOffset);
	                }

	                igeo.addAttribute("scale", scales);
	                igeo.addAttribute("fluctuation", offsets);
	                igeo.addAttribute("uv2", uv2);

	                _this.geometry = igeo;
	            });
	        });

	        _this.frustumCulled = false;

	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "useSlit");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "slitScale");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "slitSpeed");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "slitOffset");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "slitSize");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "useEnv");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "textureEnv");

	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "useBoundary");

	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "diffuse");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "emissive");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "metalness");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "roughness");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "opacity");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "reflectivity");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "envMapIntensity");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "clearCoat");
	        _ObjectUtil2.default.defineUniformAccessor(_this, uniforms, "clearCoatRoughness");
	        return _this;
	    }

	    _createClass(CrowdMesh, [{
	        key: "merge",
	        value: function merge(buffer) {
	            var geometry = new THREE.Geometry();
	            geometry.fromBufferGeometry(buffer);
	            geometry.mergeVertices();
	            return new THREE.BufferGeometry().fromGeometry(geometry);
	        }
	    }, {
	        key: "loadTexture",
	        value: function loadTexture(path) {
	            return new Promise(function (resolve, reject) {
	                var loader = new THREE.TextureLoader();
	                loader.load(path, function (texture) {
	                    resolve(texture);
	                });
	            });
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.material.uniforms.time.value += dt;
	        }
	    }, {
	        key: "animateScale",
	        value: function animateScale(scale) {
	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

	            var self = this;

	            var from = self.scale.clone();
	            _Tween2.default.remove(self.scaleTween);
	            self.scaleTween = new _Tween2.default.Tween({
	                t: 0
	            }).to({
	                t: 1
	            }, duration).easing(_Tween2.default.Easing.Linear.None).onUpdate(function () {
	                var s = from.clone().lerp(scale, this.t);
	                self.scale.set(s.x, s.y, s.z);
	            }).onComplete(function () {
	                self.scale.set(scale.x, scale.y, scale.z);
	            }).start();
	        }
	    }, {
	        key: "animateSlitOffset",
	        value: function animateSlitOffset(offset) {
	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;

	            var self = this;

	            var to = self.slitOffset + offset;

	            _Tween2.default.remove(self.slitOffsetTween);
	            self.slitOffsetTween = new _Tween2.default.Tween({
	                slitOffset: self.slitOffset
	            }).to({
	                slitOffset: to
	            }, duration).easing(_Tween2.default.Easing.Quadratic.Out).onUpdate(function () {
	                self.slitOffset = this.slitOffset;
	            }).onComplete(function () {
	                self.slitOffset = to;
	            }).start();
	        }
	    }, {
	        key: "animateSlitScale",
	        value: function animateSlitScale(sx, sy, sz, sw) {
	            var duration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 500;

	            var self = this;

	            _Tween2.default.remove(self.slitScaleTween);

	            var from = self.slitScale.clone();
	            self.slitScaleTween = new _Tween2.default.Tween({
	                t: 0
	            }).to({
	                t: 1
	            }, duration).easing(_Tween2.default.Easing.Quadratic.Out).onUpdate(function () {
	                var s = from.clone();
	                s.x = _MathUtil2.default.lerp(s.x, sx, this.t);
	                s.y = _MathUtil2.default.lerp(s.y, sy, this.t);
	                s.z = _MathUtil2.default.lerp(s.z, sz, this.t);
	                s.w = _MathUtil2.default.lerp(s.w, sw, this.t);
	                self.slitScale = s;
	            }).onComplete(function () {}).start();
	        }
	    }, {
	        key: "animateSlitSize",
	        value: function animateSlitSize(size) {
	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

	            var self = this;

	            var from = self.slitSize.clone();
	            _Tween2.default.remove(self.slitSizeTween);
	            self.slitSizeTween = new _Tween2.default.Tween({
	                t: 0
	            }).to({
	                t: 1
	            }, duration).easing(_Tween2.default.Easing.Quadratic.Out).onUpdate(function () {
	                var s = from.clone().lerp(size, this.t);
	                self.slitSize.set(s.x, s.y, s.z);
	            }).onComplete(function () {
	                self.slitSize.set(size.x, size.y, size.z);
	            }).start();
	        }
	    }, {
	        key: "toggleUseSlit",
	        value: function toggleUseSlit() {
	            this.animateUseSlit(this.useSlit < 0.5 ? 1 : 0);
	        }
	    }, {
	        key: "animateUseSlit",
	        value: function animateUseSlit(to) {
	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

	            var self = this;

	            _Tween2.default.remove(self.useSlitTween);
	            self.useSlitTween = new _Tween2.default.Tween({
	                useSlit: self.useSlit
	            }).to({
	                useSlit: to
	            }, duration).easing(_Tween2.default.Easing.Quadratic.Out).onUpdate(function () {
	                self.useSlit = this.useSlit;
	            }).onComplete(function () {
	                self.useSlit = to;
	            }).start();
	        }
	    }, {
	        key: "updateSystem",
	        value: function updateSystem(system) {
	            this.material.uniforms.texturePosition.value = system.position;
	            this.material.uniforms.textureVelocity.value = system.velocity;
	            this.material.uniforms.textureRotation.value = system.rotation;
	        }
	    }]);

	    return CrowdMesh;
	}(THREE.Mesh);

	exports.default = CrowdMesh;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nhighp float random_2_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_1_1(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_1_2(vec3 x) {\n  return mod289_1_1(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_1_3(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_1_1(i); // Avoid truncation effects in permutation\n  vec3 p = permute_1_2( permute_1_2( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n\n#ifndef PI\n#define PI 3.1415926\n#endif\n\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelMatrix;\n\n// position textures\n\nuniform highp sampler2D textureIdle;\nuniform vec2 idleTexelSize;\nuniform vec2 idleEnd;\nuniform vec3 idleAnimScale;\nuniform vec3 idleAnimOffset;\n\nuniform highp sampler2D textureWalk;\nuniform vec2 walkTexelSize;\nuniform vec2 walkEnd;\nuniform vec3 walkAnimScale;\nuniform vec3 walkAnimOffset;\n\nuniform highp sampler2D textureRun;\nuniform vec2 runTexelSize;\nuniform vec2 runEnd;\nuniform vec3 runAnimScale;\nuniform vec3 runAnimOffset;\n\nuniform vec3 center;\nuniform float fps;\nuniform float time;\n\nuniform vec3 streetScale, streetOffset;\n\nuniform highp sampler2D texturePosition, textureVelocity, textureRotation;\n\nuniform float useSlit;\nuniform vec4 slitScale, slitSpeed;\nuniform vec3 slitSize;\nuniform float slitOffset;\n// uniform sampler2D textureNoise;\n\nuniform sampler2D textureBoundaryDepth;\nuniform float useBoundary;\nuniform vec3 boundaryMin, boundaryMax;\n\nuniform float height;\n\nattribute vec3 position;\n\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2; // uv coordiate for simulation\n\nattribute vec3 scale;\nattribute vec4 fluctuation;\n\nvarying float vThrottle;\nvarying vec3 vPosition;\n\n#ifndef DEPTH\nvarying vec3 vWorld;\nvarying vec3 vNormal;\nvarying vec3 vViewPosition;\n\n#include <fog_pars_vertex>\n\n#endif\n\nconst float COLOR_DEPTH = 255.0;\nconst float COLOR_DEPTH_INV = 1.0 / COLOR_DEPTH;\n\nvec4 tex2Dlod(sampler2D tex, vec4 uv) {\n    return texture2D(tex, uv.xy);\n}\n\nvec3 sample_animation(sampler2D tex, vec2 texelSize, vec2 end, vec3 animScale, vec3 animOffset, vec3 vertex, vec2 texcoord1, float t) {\n\tfloat frame = min(t * fps, end.y);\n\n\t#ifdef BILINEAR_OFF\n\tfloat frame1 = frame;\n\t#else\n\tfloat frame1 = floor(frame);\n\tfloat frame2 = min(frame1 + 1.0, end.y);\n\tfloat tFilter = frame - frame1;\n\t#endif\n\n\tvec4 uv = vec4(0, 0, 0, 0);\n\tuv.xy = texcoord1 + vec2(0.0, frame1 * texelSize.y);\n\n\tvec3 pos1 = tex2Dlod(tex, uv).rgb;\n\n\tuv.y += 0.5;\n    vec3 pos2 = tex2Dlod(tex, uv).rgb;\n\n\tvec3 pos = (pos1 + pos2 / COLOR_DEPTH) * animScale.xyz + animOffset.xyz;\n\n\t#ifdef BILINEAR_OFF\n\tvertex.xyz = pos;\n\t#else\n\tuv.xy = texcoord1 + vec2(0.0, frame2 * texelSize.y);\n\tpos1 = tex2Dlod(tex, uv).rgb;\n\n\tuv.y += 0.5;\n\tpos2 = tex2Dlod(tex, uv).rgb;\n\n\tpos2 = (pos1 + pos2 / COLOR_DEPTH) * animScale.xyz + animOffset.xyz;\n\n\tvertex.xyz = mix(pos, pos2, tFilter);\n\t#endif\n\n    return vertex;\n}\n\n// Quaternion multiplication\n// http://mathworld.wolfram.com/Quaternion.html\nvec4 qmul(vec4 q1, vec4 q2) {\n\treturn vec4(\n\t\tq2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),\n\t\tq1.w * q2.w - dot(q1.xyz, q2.xyz)\n\t);\n}\n\n// Vector rotation with a quaternion\n// http://mathworld.wolfram.com/Quaternion.html\nvec3 rotate_vector(vec3 v, vec4 r) {\n\tvec4 r_c = r * vec4(-1, -1, -1, 1);\n\treturn qmul(r, qmul(vec4(v, 0), r_c)).xyz;\n}\n\nvec3 rotate_vector_at(vec3 v, vec3 center, vec4 r) {\n\tvec3 dir = v - center;\n\treturn center + rotate_vector(dir, r);\n}\n\n// A given angle of rotation about a given axis\nvec4 rotate_angle_axis(float angle, vec3 axis) {\n\tfloat sn = sin(angle * 0.5);\n\tfloat cs = cos(angle * 0.5);\n\treturn vec4(axis * sn, cs);\n}\n\nvec3 sample_idle(float start, float speed) {\n    float t = mod(start + time * speed, idleEnd.x);\n    return sample_animation(textureIdle, idleTexelSize, idleEnd, idleAnimScale, idleAnimOffset, position, uv, t);\n}\n\nvec3 sample_rest() {\n    return sample_animation(textureIdle, idleTexelSize, idleEnd, idleAnimScale, idleAnimOffset, position, uv, 0.0);\n}\n\nvec3 sample_walk(float start, float speed) {\n    float t = mod(start + time * speed, walkEnd.x);\n    return sample_animation(textureWalk, walkTexelSize, walkEnd, walkAnimScale, walkAnimOffset, position, uv, t);\n}\n\nvec3 sample_run(float start, float speed) {\n    float t = mod(start + time * speed, runEnd.x);\n    return sample_animation(textureRun, runTexelSize, runEnd, runAnimScale, runAnimOffset, position, uv, t);\n}\n\nvec3 slit_scan_position(vec3 pos, vec2 seed) {\n    // noise\n    float t = time * 0.1;\n    float tt = t * 0.1;\n    float offset = slitOffset * 0.15;\n    vec2 uv0 = vec2(t * slitSpeed.x + offset + pos.y * slitScale.z * 0.1, seed.x + tt);\n    vec2 uv1 = vec2(seed.y + tt, t * slitSpeed.y + offset + pos.y * slitScale.w * 0.1);\n\n    // pos.x += (texture2D(textureNoise, uv0).r - 0.5) * slitScale.x;\n    // pos.z += (texture2D(textureNoise, uv1).r - 0.5) * slitScale.y;\n    pos.x += snoise_1_3(vec2(time * slitSpeed.x + slitOffset + pos.y * slitScale.z, seed.x) - 0.5) * slitScale.x;\n    pos.z += snoise_1_3(vec2(seed.y, time * slitSpeed.y + slitOffset + pos.y * slitScale.w) - 0.5) * slitScale.y;\n    return pos;\n}\n\nvec3 slit_scan(vec3 pos, vec2 seed) {\n    return slit_scan_position(pos, seed) * slitSize;\n}\n\nconst float edge_min = 0.01;\nconst float edge_max = 1.0 - edge_min;\nvec3 boundary_position(vec3 world, float t) {\n    float x = (world.x - boundaryMin.x) / (boundaryMax.x - boundaryMin.x);\n    float z = (world.z - boundaryMin.z) / (boundaryMax.z - boundaryMin.z);\n    float depth;\n    if(x < edge_min || x > edge_max || z < edge_min || z > edge_max) {\n        depth = 1.0;\n    } else {\n        depth = texture2D(textureBoundaryDepth, vec2(x, 1.0 - z)).r;\n    }\n    world.y += ((1.0 - depth) * (boundaryMax.y - boundaryMin.y) + boundaryMin.y) * t;\n    return world;\n}\n\n#ifndef DEPTH\nvoid output_varying(vec3 norm, vec3 world) {\n    vWorld = world;\n    vNormal = normal;\n    vViewPosition.xyz = -(viewMatrix * vec4(world, 1.0)).xyz;\n}\n#endif\n\nvoid alone() {\n    vec3 pos = sample_idle(0.0, 1.0);\n\n    vec4 mPosition = modelMatrix * vec4(pos, 1.0);\n\n    vec4 rot = rotate_angle_axis(-PI * 0.5 * float(MARINE), vec3(0, 1, 0));\n    mPosition.xyz = rotate_vector(mPosition.xyz, rot);\n\n    vec3 slitPosition = slit_scan(mPosition.xyz, uv2 * 10.0);\n    mPosition.xyz = mix(mPosition.xyz, slitPosition, useSlit);\n    mPosition.xyz += center;\n    mPosition.xyz = boundary_position(mPosition.xyz, 1.0);\n    // mPosition.xyz = vortex(mPosition.xyz);\n\n    gl_Position = projectionMatrix * (viewMatrix * mPosition);\n\n    vPosition = position;\n    vThrottle = height;\n\n    #ifndef DEPTH\n    // vec3 n = normalize((normal + position.xyz) * 0.5);\n    output_varying(normal, mPosition.xyz);\n    #endif\n}\n\nconst float walkThres = 0.01;\nconst float invWalkThres = 1.0 / walkThres;\nconst float runThres = 0.03;\nconst float invRunThres = 1.0 / (runThres - walkThres);\n\nvoid crowd() {\n    vec4 velocity = texture2D(textureVelocity, uv2);\n\n    vec3 pos;\n    float speed = length(velocity.xyz);\n    if(speed > runThres) {\n        pos = sample_run(fluctuation.z, fluctuation.w);\n    } else if(speed > walkThres) {\n        pos = sample_walk(fluctuation.z, fluctuation.w);\n    } else {\n        vec3 idle = sample_idle(fluctuation.z, fluctuation.w);\n        vec3 walk = sample_walk(fluctuation.z, fluctuation.w);\n        pos = mix(idle, walk, clamp(speed * invWalkThres, 0.0, 1.0));\n    }\n    pos.xyz *= scale;\n\n    vec4 mPosition = modelMatrix * vec4(pos, 1.0);\n\n    vec4 rot = texture2D(textureRotation, uv2);\n\n    vec4 rotation = rotate_angle_axis(-PI * 0.5 * float(MARINE), vec3(0, 1, 0));\n    rot = qmul(rot, rotation);\n\n    mPosition.xyz = rotate_vector(mPosition.xyz, rot);\n\n    vec3 slitPosition = slit_scan(mPosition.xyz, uv2 * 10.0);\n    mPosition.xyz = mix(mPosition.xyz, slitPosition, useSlit);\n\n    vec4 tr = texture2D(texturePosition, uv2);\n    vec3 streetTr = tr.xyz * streetScale + streetOffset;\n    mPosition.xyz += vec3(streetTr.x, 0, -streetTr.y);\n    mPosition.xyz = boundary_position(mPosition.xyz, useBoundary);\n\n    vec4 mvPosition = viewMatrix * mPosition;\n    gl_Position = projectionMatrix * mvPosition;\n\n    vPosition = position;\n    vThrottle = velocity.w * height;\n\n    #ifndef DEPTH\n    vec3 norm = rotate_vector(normal, rot);\n    output_varying(norm, mPosition.xyz);\n\n\t#include <fog_vertex>\n    #endif\n}\n\nvoid main() {\n    #ifdef ALONE\n        alone();\n    #else\n        crowd();\n    #endif\n}\n"

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	module.exports = "// #extension GL_OES_standard_derivatives : enable\n\nprecision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\nuniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n\nuniform float useEnv;\nuniform samplerCube textureEnv;\n\nvarying vec3 vPosition;\nvarying vec3 vWorld;\nvarying vec3 vNormal;\nvarying float vThrottle;\nvarying vec3 vViewPosition;\n\n// standard material\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n// envmap_pars_fragment\nuniform float reflectivity;\nuniform float envMapIntensity;\n\n// meshphysical_frag\nuniform float clearCoat;\nuniform float clearCoatRoughness;\n\n#include <common>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <fog_pars_fragment>\n\nvoid main() {\n    if(vPosition.y > vThrottle) {\n        discard;\n    }\n\n\tvec4 diffuseColor = vec4(diffuse, opacity);\n\tReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n\tvec3 totalEmissiveRadiance = emissive;\n\n    float specularStrength = 1.0;\n    float roughnessFactor = roughness;\n    float metalnessFactor = metalness;\n\n\t#include <normal_flip>\n    vec3 normal = vNormal * flipNormal;\n\n\t// accumulation\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\tvec4 color = vec4(outgoingLight, diffuseColor.a);\n\n    vec3 eyeDir = normalize(vWorld.xyz - cameraPosition);\n    vec4 envColor = color * textureCube(textureEnv, reflect(normalize(eyeDir), normalize(normal)));\n    color = mix(color, envColor, useEnv);\n\n    gl_FragColor = color;\n    #include <fog_fragment>\n}\n"

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\n#include <packing>\n\nvarying vec3 vPosition;\nvarying float vThrottle;\n\nvoid main() {\n    if(vPosition.y > vThrottle) {\n        discard;\n    }\n\n    gl_FragColor = packDepthToRGBA(gl_FragCoord.z);\n}\n"

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\n\nvec2 barrelDistortion_1_0(vec2 coord, float amt) {\n  vec2 cc = coord - 0.5;\n  float dist = dot(cc, cc);\n  return coord + cc * dist * amt;\n}\n\nfloat sat_1_1(float t) {\n  return clamp( t, 0.0, 1.0 );\n}\n\nfloat linterp_1_2(float t) {\n  return sat_1_1(1.0 - abs(2.0 * t - 1.0));\n}\n\nfloat remap_1_3(float t, float a, float b) {\n  return sat_1_1((t - a) / (b - a));\n}\n\nvec4 spectrum_offset_1_4(float t) {\n  vec4 ret;\n  float lo = step(t, 0.5);\n  float hi = 1.0 - lo;\n  float w = linterp_1_2(remap_1_3(t, 1.0 / 6.0, 5.0 / 6.0));\n  ret = vec4(lo, 1.0, hi, 1.) * vec4(1.0 - w, w, 1.0 - w, 1.);\n  return pow(ret, vec4(1.0 / 2.2));\n}\n\nvec4 apply_1_5(sampler2D tex, vec2 uv, float distortion) {\n  const int num_iter = 9; //12;\n  const float reci_num_iter_f = 1.0 / float(num_iter);\n\n  vec4 sumcol = vec4(0.0);\n  vec4 sumw = vec4(0.0);\n  for (int i = 0; i < num_iter; i++){\n    float t = float(i) * reci_num_iter_f;\n    vec4 w = spectrum_offset_1_4(t);\n    sumw += w;\n    sumcol += w * texture2D(tex, barrelDistortion_1_0(uv, .04 * distortion * t));\n  }\n\n  return sumcol / sumw;\n}\n\n\n\n\nuniform sampler2D tDiffuse;\nuniform float distortion;\n\nvarying vec2 vUv;\n\nvoid main() {\n    gl_FragColor = apply_1_5(tDiffuse, vUv, distortion);\n}\n"

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\nuniform int mode;\nuniform float time, dt;\nuniform float death;\nuniform int recovery;\n\nuniform sampler2D textureBoundaryDepth;\nuniform vec3 boundaryMin, boundaryMax;\nuniform float emitterHeight;\n\nvoid init() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    const float seedScale = 100.0;\n    vec3 seed = vec3(random_1_0(uv.xy * seedScale), random_1_0(uv.yx * seedScale), random_1_0(vec2(time, uv.x) * seedScale));\n\n    vec3 interval = boundaryMax - boundaryMin;\n    float depth = texture2D(textureBoundaryDepth, vec2(seed.x, 1.0 - seed.z)).r;\n    float x = seed.x * interval.x + boundaryMin.x;\n    float y = (1.0 - depth) * interval.y + boundaryMin.y;\n    float z = seed.z * interval.z + boundaryMin.z;\n    gl_FragColor = vec4(x, y + emitterHeight * seed.y, z, 1.0);\n}\n\nvoid update() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    vec4 pos = texture2D(texturePosition, uv);\n    vec4 vel = texture2D(textureVelocity, uv);\n\n    float decay = random_1_0(vec2(uv.yx) * 100.0);\n    pos.w -= dt * (0.1 + 0.1 * decay) * death;\n\n    if(recovery == 1 && pos.w < 0.0)  {\n        init();\n    } else {\n        pos.xyz += vel.xyz * dt;\n        gl_FragColor = pos;\n    }\n}\n\nvoid main() {\n    if(mode == 0) {\n        init();\n    } else {\n        update();\n    }\n}\n"

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x) {\n     return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_4 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_5 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_5;\n  vec3 i1 = min( g_1_5.xyz, l.zxy );\n  vec3 i2 = max( g_1_5.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_4.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_0(i);\n  vec4 p = permute_1_1( permute_1_1( permute_1_1(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_4.wyz - D_1_4.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_6 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_7 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_6.xy,h.z);\n  vec3 p3 = vec3(a1_1_6.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_2(vec4(dot(p0_1_7,p0_1_7), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_7 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_7,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\nhighp float random_2_8(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\nuniform int mode;\nuniform float time, speed;\nuniform vec3 force;\nuniform vec3 vortexCenter;\nuniform float vortexIntensity;\n\nconst float seedScale = 100.0;\n\nvoid init() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    float r = random_2_8(uv * seedScale) * 0.02 + 0.92;\n    gl_FragColor = vec4(0.0, 0.0, 0.0, r);\n}\n\nvoid update() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n    vec4 pos = texture2D(texturePosition, uv);\n    if(pos.a < 0.0) {\n        init();\n    } else {\n        vec4 vel = texture2D(textureVelocity, uv);\n        vel.xyz *= vel.w;\n\n        float t = time * 0.5;\n        vec2 seed = uv * seedScale;\n\n        vec3 v = vec3(\n            (snoise_1_3(vec3(seed.x, seed.y, t) - 0.5)),\n            (snoise_1_3(vec3(seed.x, t, seed.y) - 0.5)),\n            (snoise_1_3(vec3(t, seed.y, seed.x) - 0.5))\n        ) * speed + force;\n\n        vec3 dir = vortexCenter - pos.xyz;\n        vec3 right = cross(normalize(dir), vec3(0, 1, 0));\n        v += right * vortexIntensity;\n\n        vel.xyz += v;\n\n        gl_FragColor = vel;\n    }\n}\n\nvoid main() {\n    if(mode == 0) {\n        init();\n    } else {\n        update();\n    }\n}\n"

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n#define QUATERNION_IDENTITY vec4(0, 0, 0, 1)\n\n#ifndef PI\n#define PI 3.1415926\n#endif\n\nvec3 random_point_on_sphere(vec2 uv) {\n    float u = random_1_0(uv) * 2.0 - 1.0;\n    float theta = random_1_0(uv + 0.333) * PI * 2.0;\n    float u2 = sqrt(1.0 - u * u);\n    return vec3(u2 * cos(theta), u2 * sin(theta), u);\n}\n\n// Quaternion multiplication\n// http://mathworld.wolfram.com/Quaternion.html\nvec4 qmul(vec4 q1, vec4 q2) {\n\treturn vec4(\n\t\tq2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),\n\t\tq1.w * q2.w - dot(q1.xyz, q2.xyz)\n\t);\n}\n\n// Vector rotation with a quaternion\n// http://mathworld.wolfram.com/Quaternion.html\nvec3 rotate_vector(vec3 v, vec4 r) {\n\tvec4 r_c = r * vec4(-1, -1, -1, 1);\n\treturn qmul(r, qmul(vec4(v, 0), r_c)).xyz;\n}\n\nvec3 rotate_vector_at(vec3 v, vec3 center, vec4 r) {\n\tvec3 dir = v - center;\n\treturn center + rotate_vector(dir, r);\n}\n\n// A given angle of rotation about a given axis\nvec4 rotate_angle_axis(float angle, vec3 axis) {\n\tfloat sn = sin(angle * 0.5);\n\tfloat cs = cos(angle * 0.5);\n\treturn vec4(axis * sn, cs);\n}\n\nvec4 q_conj(vec4 q) {\n\treturn vec4(-q.x, -q.y, -q.z, q.w);\n}\n\nuniform float time;\nuniform int mode;\n\nvoid init() {\n    gl_FragColor = QUATERNION_IDENTITY;\n}\n\nvoid update() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n    vec4 v = texture2D(textureVelocity, uv);\n    vec4 r = texture2D(textureRotation, uv);\n\n    float theta = length(v.xyz) * 0.01 * v.w;\n    vec4 dq = vec4(random_point_on_sphere(uv) * sin(theta), cos(theta));\n\n    gl_FragColor = normalize(qmul(dq, r));\n}\n\nvoid main() {\n    if(mode == 0) {\n        init();\n    } else {\n        update();\n    }\n}\n"

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n#define PI 3.1415926\n#define QUATERNION_IDENTITY vec4(0, 0, 0, 1)\n\nvec3 random_point_on_sphere(vec2 uv) {\n    float u = random_1_0(uv) * 2.0 - 1.0;\n    float theta = random_1_0(uv + 0.333) * PI * 2.0;\n    float u2 = sqrt(1.0 - u * u);\n    return vec3(u2 * cos(theta), u2 * sin(theta), u);\n}\n\n// Quaternion multiplication\n// http://mathworld.wolfram.com/Quaternion.html\nvec4 qmul(vec4 q1, vec4 q2) {\n\treturn vec4(\n\t\tq2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),\n\t\tq1.w * q2.w - dot(q1.xyz, q2.xyz)\n\t);\n}\n\n// Vector rotation with a quaternion\n// http://mathworld.wolfram.com/Quaternion.html\nvec3 rotate_vector(vec3 v, vec4 r) {\n\tvec4 r_c = r * vec4(-1, -1, -1, 1);\n\treturn qmul(r, qmul(vec4(v, 0), r_c)).xyz;\n}\n\nvec3 rotate_vector_at(vec3 v, vec3 center, vec4 r) {\n\tvec3 dir = v - center;\n\treturn center + rotate_vector(dir, r);\n}\n\n// A given angle of rotation about a given axis\nvec4 rotate_angle_axis(float angle, vec3 axis) {\n\tfloat sn = sin(angle * 0.5);\n\tfloat cs = cos(angle * 0.5);\n\treturn vec4(axis * sn, cs);\n}\n\nvec4 q_conj(vec4 q) {\n\treturn vec4(-q.x, -q.y, -q.z, q.w);\n}\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\n\nuniform sampler2D textureVelocity;\nuniform sampler2D textureRotation;\nuniform sampler2D texturePosition;\n\nuniform float threshold;\nuniform float size;\n\nattribute vec3 position;\nattribute vec3 center;\nattribute vec2 uv;\nattribute vec2 uv2;\n\nvarying vec2 vUv2;\n\nvec4 billboard(vec3 pos, vec2 uv, float scale) {\n    mat4 billboardMatrix = viewMatrix;\n    billboardMatrix[3][0] = billboardMatrix[3][1] = billboardMatrix[3][2] = billboardMatrix[3][3] = 0.0;\n\n    vec4 p = vec4(vec4(pos, 1.0) + vec4((uv * 2.0 - vec2(1.0, 1.0)) * scale, 0, 1) * billboardMatrix);\n    return projectionMatrix * (viewMatrix * p);\n}\n\nvoid main() {\n    vec4 pos = texture2D(texturePosition, uv);\n    float s = size * smoothstep(0.0, 0.25, pos.w) * smoothstep(1.0, 0.7, pos.w);\n    s *= smoothstep(threshold, threshold + 3.5, pos.y);\n    gl_Position = billboard(pos.xyz, uv2, s);\n    vUv2 = uv2;\n}\n"

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform sampler2D textureParticle;\nuniform float alpha;\n\nvarying vec2 vUv2;\n\nvoid main() {\n    vec4 color = texture2D(textureParticle, vUv2);\n    color.a *= alpha;\n    gl_FragColor = color;\n}\n"

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\nuniform int mode, movement;\nuniform float throttle;\nuniform float speed, time, dt;\n\nuniform float limit;\n\nuniform highp sampler2D textureStreet;\nuniform vec4 streetTexelSize;\n\nuniform vec2 gatherPosition;\n\nvec3 sample_street(float t, float p) {\n    float y = (mod(floor(p * streetTexelSize.w), streetTexelSize.w) + 0.5) * streetTexelSize.z;\n    return texture2D(textureStreet, vec2(t, y)).xyz;\n}\n\nvoid init() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    float seed = (random_1_0(uv.xy) - 0.5) * 0.1;\n    float seed2 = (random_1_0(uv.yx) - 0.5) * 0.1;\n    float seed3 = random_1_0(uv.yx + vec2(3.17, 17.3));\n    vec3 to = vec3(gatherPosition.x + seed, gatherPosition.y + seed2, 0.0);\n    gl_FragColor = vec4(to, seed3);\n}\n\nvoid update() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    vec4 pos = texture2D(texturePosition, uv);\n    vec4 vel = texture2D(textureVelocity, uv);\n\n    vec3 v = vel.xyz * dt;\n\n    if(movement == 6) {\n        pos.xyz += v;\n        gl_FragColor = pos;\n        return;\n    }\n\n    float m = length(v);\n    const float threshold = 0.000001;\n    if(m > threshold) {\n        v.xy = normalize(v.xy) * clamp(m, 0.0, limit);\n        pos.xy += v.xy;\n        pos.z += v.z;\n    }\n    gl_FragColor = pos;\n}\n\nvoid main() {\n    if(mode == 0) {\n        init();\n    } else {\n        update();\n    }\n}\n"

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_2_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_1(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_2(vec4 x) {\n     return mod289_1_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_3(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_4(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_5 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_6 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_6;\n  vec3 i1 = min( g_1_6.xyz, l.zxy );\n  vec3 i2 = max( g_1_6.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_5.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_1(i);\n  vec4 p = permute_1_2( permute_1_2( permute_1_2(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_5.wyz - D_1_5.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_7 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_8 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_7.xy,h.z);\n  vec3 p3 = vec3(a1_1_7.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_3(vec4(dot(p0_1_8,p0_1_8), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_8 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_8,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nuniform int mode, movement;\nuniform float throttle;\nuniform float speed, time, dt;\n\nuniform highp sampler2D textureStreet;\nuniform vec4 streetTexelSize;\n\nuniform vec2 gatherPosition;\nuniform vec2 direction;\n\nconst vec3 minVel = vec3(-1, -1, -1);\nconst vec3 maxVel = vec3(1, 1, 1);\n\nvec2 limit_vel(vec2 vel) {\n    vel.x = clamp(vel.x, minVel.x, maxVel.x);\n    vel.y = clamp(vel.y, minVel.y, maxVel.y);\n    return vel;\n}\n\nvec3 repel(vec2 uv, vec3 pos) {\n    const float threshold = 0.002;\n\n    vec3 v = vec3(0, 0, 0);\n\n    for(float y = 0.0; y < 1.0; y += resolutionTexelSize.y) {\n        for(float x = 0.0; x < 1.0; x += resolutionTexelSize.x) {\n            vec3 other = texture2D(texturePosition, vec2(x, y)).xyz;\n            vec2 dir = (pos.xy - other.xy);\n            float dist = length(dir);\n            if(0.00001 < dist && dist < threshold) {\n                v.xy += dir;\n            }\n        }\n    }\n\n    return v;\n}\n\nvec3 sample_street(float t, float p) {\n    float y = (mod(floor(p * streetTexelSize.w), streetTexelSize.w) + 0.5) * streetTexelSize.z;\n    float ratio = texture2D(textureStreet, vec2(0.0, y)).w;\n    // float ratio = 1.0;\n    return texture2D(textureStreet, vec2(mod(t * ratio, 1.0), y)).xyz;\n}\n\nfloat get_decay(vec2 uv) {\n    return random_2_0(uv * 10.0) * 0.05 + 0.94;\n}\n\nvec4 street_velocity(vec2 uv, vec4 pos, vec4 vel) {\n    float decay = get_decay(uv);\n    vec3 to = sample_street(time * 0.25 * decay, pos.w);\n\n    // offset\n    to.xy += vec2(\n        random_2_0(uv), random_2_0(uv.yx)\n    ) * 0.005;\n\n    vec3 dir = to.xyz - pos.xyz;\n\n    float mag = length(dir);\n    const float threshold = 0.005;\n\n    if(mag > threshold) {\n        vel.xyz += normalize(dir) * clamp(mag, 0.0, 0.001) * speed;\n    }\n\n    return vel;\n}\n\nvec4 gather_velocity(vec2 uv, vec4 pos, vec4 vel) {\n    vec2 dir = (gatherPosition - pos.xy);\n    float mag = length(dir);\n    float threshold = 0.005 + random_2_0(uv) * 0.1; // distance\n\n    if(mag > threshold) {\n        vel.xy += normalize(dir) * clamp(mag, 0.0, 0.001) * speed;\n    } else {\n        vel.xyz *= 0.8;\n    }\n    vel.z -= pos.z * 0.1;\n\n    return vel;\n}\n\nvec4 matrix_velocity(vec2 uv, vec4 pos, vec4 vel) {\n    vec3 dir = (vec3(uv, 0) - pos.xyz);\n    float mag = length(dir);\n    const float threshold = 0.005; // distance\n    if(mag > threshold) {\n        vel.xyz += normalize(dir) * clamp(mag, 0.0, 0.001) * speed;\n    } else {\n        vel.xyz *= 0.8;\n    }\n\n    return vel;\n}\n\nvec4 direction_velocity(vec2 uv, vec4 pos, vec4 vel) {\n    vec3 dir = vec3(direction.xy, 0.0);\n    float mag = length(dir);\n    const float threshold = 0.005;\n    if(mag > threshold) {\n        vel.xyz += normalize(dir) * clamp(mag, 0.0, 0.01);\n    }\n\n    return vel;\n}\n\nvoid init() {\n    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n}\n\nvoid update() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    vec4 pos = texture2D(texturePosition, uv);\n    vec4 vel = texture2D(textureVelocity, uv);\n\n    float decay = get_decay(uv);\n    vel.xyz *= decay;\n\n    if(movement == 1) {\n        vel = gather_velocity(uv, pos, vel);\n    } else if(movement == 2) {\n        vel = matrix_velocity(uv, pos, vel);\n        vel.xyz += repel(uv, pos.xyz);\n    } else if(movement == 3) {\n        vel = direction_velocity(uv, pos, vel);\n        vel.xyz += repel(uv, pos.xyz);\n    } else if(movement == 5) {\n        vel.xyz += repel(uv, pos.xyz);\n    } else {\n        vel = street_velocity(uv, pos, vel);\n        vel.xyz += repel(uv, pos.xyz) * 0.25;\n    }\n    vel.xy = limit_vel(vel.xy);\n\n    if(uv.x <= throttle) {\n        vel.w = min(vel.w + dt, 1.0);\n    } else {\n        vel.w = max(vel.w - dt, 0.0);\n    }\n\n    gl_FragColor = vel;\n}\n\nvoid main() {\n    if(mode == 0) {\n        init();\n    } else {\n        update();\n    }\n}\n"

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n#define PI 3.1415926\n#define QUATERNION_IDENTITY vec4(0, 0, 0, 1)\n\nvec3 random_point_on_sphere(vec2 uv) {\n    float u = random_1_0(uv) * 2.0 - 1.0;\n    float theta = random_1_0(uv + 0.333) * PI * 2.0;\n    float u2 = sqrt(1.0 - u * u);\n    return vec3(u2 * cos(theta), u2 * sin(theta), u);\n}\n\n// Quaternion multiplication\n// http://mathworld.wolfram.com/Quaternion.html\nvec4 qmul(vec4 q1, vec4 q2) {\n\treturn vec4(\n\t\tq2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),\n\t\tq1.w * q2.w - dot(q1.xyz, q2.xyz)\n\t);\n}\n\n// Vector rotation with a quaternion\n// http://mathworld.wolfram.com/Quaternion.html\nvec3 rotate_vector(vec3 v, vec4 r) {\n\tvec4 r_c = r * vec4(-1, -1, -1, 1);\n\treturn qmul(r, qmul(vec4(v, 0), r_c)).xyz;\n}\n\nvec3 rotate_vector_at(vec3 v, vec3 center, vec4 r) {\n\tvec3 dir = v - center;\n\treturn center + rotate_vector(dir, r);\n}\n\n// A given angle of rotation about a given axis\nvec4 rotate_angle_axis(float angle, vec3 axis) {\n\tfloat sn = sin(angle * 0.5);\n\tfloat cs = cos(angle * 0.5);\n\treturn vec4(axis * sn, cs);\n}\n\nvec4 q_conj(vec4 q) {\n\treturn vec4(-q.x, -q.y, -q.z, q.w);\n}\n\nvec4 q_look_at(vec3 forward, vec3 up) {\n    vec3 right = normalize(cross(forward, up));\n    up = normalize(cross(forward, right));\n\n    float m00 = right.x;\n    float m01 = right.y;\n    float m02 = right.z;\n    float m10 = up.x;\n    float m11 = up.y;\n    float m12 = up.z;\n    float m20 = forward.x;\n    float m21 = forward.y;\n    float m22 = forward.z;\n\n    float num8 = (m00 + m11) + m22;\n    vec4 q = QUATERNION_IDENTITY;\n    if (num8 > 0.0)\n    {\n        float num = sqrt(num8 + 1.0);\n        q.w = num * 0.5;\n        num = 0.5 / num;\n        q.x = (m12 - m21) * num;\n        q.y = (m20 - m02) * num;\n        q.z = (m01 - m10) * num;\n        return q;\n    }\n\n    if ((m00 >= m11) && (m00 >= m22))\n    {\n        float num7 = sqrt(((1.0 + m00) - m11) - m22);\n        float num4 = 0.5 / num7;\n        q.x = 0.5 * num7;\n        q.y = (m01 + m10) * num4;\n        q.z = (m02 + m20) * num4;\n        q.w = (m12 - m21) * num4;\n        return q;\n    }\n\n    if (m11 > m22)\n    {\n        float num6 = sqrt(((1.0 + m11) - m00) - m22);\n        float num3 = 0.5 / num6;\n        q.x = (m10 + m01) * num3;\n        q.y = 0.5 * num6;\n        q.z = (m21 + m12) * num3;\n        q.w = (m20 - m02) * num3;\n        return q;\n    }\n\n    float num5 = sqrt(((1.0 + m22) - m00) - m11);\n    float num2 = 0.5 / num5;\n    q.x = (m20 + m02) * num2;\n    q.y = (m21 + m12) * num2;\n    q.z = 0.5 * num5;\n    q.w = (m01 - m10) * num2;\n    return q;\n}\n\nvec4 q_slerp(vec4 a, vec4 b, float t) {\n    // if either input is zero, return the other.\n    if (length(a) == 0.0) {\n        if (length(b) == 0.0) {\n            return QUATERNION_IDENTITY;\n        }\n        return b;\n    } else if (length(b) == 0.0) {\n        return a;\n    }\n\n    float cosHalfAngle = a.w * b.w + dot(a.xyz, b.xyz);\n\n    if (cosHalfAngle >= 1.0 || cosHalfAngle <= -1.0) {\n        return a;\n    } else if (cosHalfAngle < 0.0) {\n        b.xyz = -b.xyz;\n        b.w = -b.w;\n        cosHalfAngle = -cosHalfAngle;\n    }\n\n    float blendA;\n    float blendB;\n    if (cosHalfAngle < 0.99) {\n        // do proper slerp for big angles\n        float halfAngle = acos(cosHalfAngle);\n        float sinHalfAngle = sin(halfAngle);\n        float oneOverSinHalfAngle = 1.0 / sinHalfAngle;\n        blendA = sin(halfAngle * (1.0 - t)) * oneOverSinHalfAngle;\n        blendB = sin(halfAngle * t) * oneOverSinHalfAngle;\n    } else {\n        // do lerp if angle is really small.\n        blendA = 1.0 - t;\n        blendB = t;\n    }\n\n    vec4 result = vec4(blendA * a.xyz + blendB * b.xyz, blendA * a.w + blendB * b.w);\n    if (length(result) > 0.0) {\n        return normalize(result);\n    }\n    return QUATERNION_IDENTITY;\n}\n\nuniform float dt, time;\nuniform int mode, movement;\n\nvoid align(vec2 uv) {\n    vec4 r = texture2D(textureRotation, uv);\n    vec4 vel = texture2D(textureVelocity, uv);\n    const float epsilon = 0.0001;\n\n    vel.xyz = vec3(vel.x, 0.0, -vel.y);\n    float mag = length(vel.xyz);\n    if(mag > epsilon) {\n        vec3 dir = normalize(vel.xyz);\n\n        float t = dt * mag * 200.0;\n        r = q_slerp(r, q_look_at(dir, vec3(0, -1, 0)), clamp(t, 0.0, 1.0));\n    }\n    gl_FragColor = normalize(r);\n}\n\nvoid fluid(vec2 uv) {\n    vec4 r = texture2D(textureRotation, uv);\n    vec4 vel = texture2D(textureVelocity, uv);\n\n    float theta = length(vel.xyz) * 0.0005;\n    vec4 dq = vec4(random_point_on_sphere(uv) * sin(theta), cos(theta));\n    gl_FragColor = normalize(qmul(dq, r));\n}\n\nvoid init() {\n    gl_FragColor = QUATERNION_IDENTITY;\n}\n\nvoid update() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    if(movement == 6) {\n        fluid(uv);\n    } else {\n        align(uv);\n    }\n    // align(uv);\n}\n\nvoid main() {\n    if(mode == 0) {\n        init();\n    } else {\n        update();\n    }\n}\n"

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vue = __webpack_require__(68);

	var _vue2 = _interopRequireDefault(_vue);

	var _KeyCode = __webpack_require__(25);

	var _KeyCode2 = _interopRequireDefault(_KeyCode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var KeyCodeState = {
	    Default: 0,
	    Pressed: 1,
	    Selected: 2
	};

	var THRESHOLD_WIDTH = 640;

	var Keyboard = function (_THREE$EventDispatche) {
	    _inherits(Keyboard, _THREE$EventDispatche);

	    function Keyboard(el) {
	        _classCallCheck(this, Keyboard);

	        var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this));

	        var self = _this;

	        new _vue2.default({
	            el: el,
	            data: {
	                isMobile: false,
	                isKeyDown: false,
	                KeyCodeState: KeyCodeState,
	                headers: ["camera", "crowd", "city"],
	                holdables: [_KeyCode2.default.q, _KeyCode2.default.w, _KeyCode2.default.e, _KeyCode2.default.a, _KeyCode2.default.s, _KeyCode2.default.d, _KeyCode2.default.f],
	                toggles: [_KeyCode2.default.r, _KeyCode2.default.y, _KeyCode2.default.g, _KeyCode2.default.z, _KeyCode2.default.x],
	                keys: [[{
	                    key: "q",
	                    work: "bird",
	                    // 同時に押せないキーを定義
	                    uncooccurrence: [_KeyCode2.default.w, _KeyCode2.default.e]
	                }, {
	                    key: "w",
	                    work: "fixed",
	                    uncooccurrence: [_KeyCode2.default.q, _KeyCode2.default.e]
	                }, {
	                    key: "e",
	                    work: "orbit",
	                    uncooccurrence: [_KeyCode2.default.q, _KeyCode2.default.w]
	                }, {
	                    key: "r",
	                    work: "invert"
	                }, {
	                    key: "t",
	                    work: "mirror"
	                }, {
	                    key: "y",
	                    work: "glitch"
	                }], [{
	                    key: "a",
	                    work: "street",
	                    uncooccurrence: [_KeyCode2.default.s, _KeyCode2.default.d, _KeyCode2.default.f]
	                }, {
	                    key: "s",
	                    work: "march",
	                    uncooccurrence: [_KeyCode2.default.a, _KeyCode2.default.d, _KeyCode2.default.f]
	                }, {
	                    key: "d",
	                    work: "gather",
	                    uncooccurrence: [_KeyCode2.default.a, _KeyCode2.default.s, _KeyCode2.default.f]
	                }, {
	                    key: "f",
	                    work: "wait",
	                    uncooccurrence: [_KeyCode2.default.a, _KeyCode2.default.s, _KeyCode2.default.d]
	                }, {
	                    key: "g",
	                    work: "noise"
	                }, {
	                    key: "h",
	                    work: "shake",
	                    // 押すと同時に発火するキーを定義
	                    cooccurrence: _KeyCode2.default.g
	                }], [{
	                    key: "z",
	                    work: "noise"
	                }, {
	                    key: "x",
	                    work: "line"
	                }]],
	                selected: null
	            },
	            mounted: function mounted() {
	                var _this2 = this;

	                this.keys = this.keys.map(function (row) {
	                    return row.map(function (elem) {
	                        return {
	                            key: elem.key.toUpperCase(),
	                            work: elem.work,
	                            code: _KeyCode2.default[elem.key],
	                            state: KeyCodeState.Default,
	                            cooccurrence: elem.cooccurrence,
	                            uncooccurrence: elem.uncooccurrence
	                        };
	                    });
	                });

	                document.addEventListener("keydown", function (e) {
	                    var key = _this2.find(e.keyCode);
	                    _this2.press(key);
	                });
	                document.addEventListener("keyup", function (e) {
	                    var key = _this2.find(e.keyCode);
	                    _this2.unpress(key);
	                });

	                // press default keys
	                this.press(this.find(_KeyCode2.default.e));
	                this.press(this.find(_KeyCode2.default.a));

	                window.addEventListener("resize", function () {
	                    _this2.resize();
	                });
	                this.resize();
	            },
	            methods: {
	                resize: function resize() {
	                    var w = window.innerWidth;
	                    this.isMobile = w < THRESHOLD_WIDTH;
	                },
	                press: function press(key) {
	                    var _this3 = this;

	                    if (key) {
	                        switch (key.state) {
	                            case KeyCodeState.Pressed:
	                                // toggle key
	                                if (this.isToggle(key)) {
	                                    key.state = KeyCodeState.Default;
	                                    if (this.selected == key) {
	                                        key.state = KeyCodeState.Selected;
	                                    }
	                                }
	                                break;
	                            default:
	                                key.state = KeyCodeState.Pressed;
	                                if (key.cooccurrence) {
	                                    var cooccurrence = this.find(key.cooccurrence);
	                                    cooccurrence.state = KeyCodeState.Pressed;
	                                }
	                                if (key.uncooccurrence) {
	                                    key.uncooccurrence.forEach(function (code) {
	                                        var other = _this3.find(code);
	                                        if (other) {
	                                            other.state = KeyCodeState.Default;
	                                        }
	                                    });
	                                }
	                                break;
	                        }
	                    }
	                },
	                unpress: function unpress(key) {
	                    if (key && !this.isHoldable(key) && !this.isToggle(key)) {
	                        key.state = KeyCodeState.Default;
	                        if (this.selected == key) {
	                            key.state = KeyCodeState.Selected;
	                        }
	                    }
	                },
	                select: function select(key) {
	                    if (key && key.state != KeyCodeState.Pressed) {
	                        key.state = KeyCodeState.Selected;
	                    }
	                    this.selected = key;
	                },
	                unselect: function unselect() {
	                    if (this.selected && this.selected.state == KeyCodeState.Selected) {
	                        this.selected.state = KeyCodeState.Default;
	                    }
	                    this.selected = null;
	                },
	                find: function find(code) {
	                    for (var idx in this.keys) {
	                        var row = this.keys[idx];
	                        for (var j = 0, n = row.length; j < n; j++) {
	                            var key = row[j];
	                            if (key.code == code) {
	                                return key;
	                            }
	                        }
	                    }
	                    return null;
	                },
	                isHoldable: function isHoldable(key) {
	                    return this.holdables.find(function (code) {
	                        return code == key.code;
	                    });
	                },
	                isToggle: function isToggle(key) {
	                    return this.toggles.find(function (code) {
	                        return code == key.code;
	                    });
	                },
	                mouseOver: function mouseOver(key) {
	                    this.select(key);
	                },
	                mouseOut: function mouseOut(key) {
	                    this.unselect();
	                },
	                mouseDown: function mouseDown(key) {
	                    if (this.isKeyDown) return;

	                    self.dispatchEvent({
	                        type: "keydown",
	                        message: {
	                            keyCode: key.code
	                        }
	                    });
	                    this.press(key);

	                    this.isKeyDown = true;
	                },
	                mouseUp: function mouseUp(key) {
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
	        return _this;
	    }

	    return Keyboard;
	}(THREE.EventDispatcher);

	exports.default = Keyboard;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * Vue.js v2.3.3
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	!function (e, t) {
	  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : e.Vue = t();
	}(undefined, function () {
	  "use strict";
	  function e(e) {
	    return void 0 === e || null === e;
	  }function t(e) {
	    return void 0 !== e && null !== e;
	  }function n(e) {
	    return !0 === e;
	  }function r(e) {
	    return !1 === e;
	  }function i(e) {
	    return "string" == typeof e || "number" == typeof e;
	  }function o(e) {
	    return null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
	  }function a(e) {
	    return "[object Object]" === Ti.call(e);
	  }function s(e) {
	    return "[object RegExp]" === Ti.call(e);
	  }function c(e) {
	    return null == e ? "" : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? JSON.stringify(e, null, 2) : String(e);
	  }function u(e) {
	    var t = parseFloat(e);return isNaN(t) ? e : t;
	  }function l(e, t) {
	    for (var n = Object.create(null), r = e.split(","), i = 0; i < r.length; i++) {
	      n[r[i]] = !0;
	    }return t ? function (e) {
	      return n[e.toLowerCase()];
	    } : function (e) {
	      return n[e];
	    };
	  }function f(e, t) {
	    if (e.length) {
	      var n = e.indexOf(t);if (n > -1) return e.splice(n, 1);
	    }
	  }function p(e, t) {
	    return ji.call(e, t);
	  }function d(e) {
	    var t = Object.create(null);return function (n) {
	      return t[n] || (t[n] = e(n));
	    };
	  }function v(e, t) {
	    function n(n) {
	      var r = arguments.length;return r ? r > 1 ? e.apply(t, arguments) : e.call(t, n) : e.call(t);
	    }return n._length = e.length, n;
	  }function h(e, t) {
	    t = t || 0;for (var n = e.length - t, r = new Array(n); n--;) {
	      r[n] = e[n + t];
	    }return r;
	  }function m(e, t) {
	    for (var n in t) {
	      e[n] = t[n];
	    }return e;
	  }function g(e) {
	    for (var t = {}, n = 0; n < e.length; n++) {
	      e[n] && m(t, e[n]);
	    }return t;
	  }function y() {}function _(e, t) {
	    var n = o(e),
	        r = o(t);if (!n || !r) return !n && !r && String(e) === String(t);try {
	      return JSON.stringify(e) === JSON.stringify(t);
	    } catch (n) {
	      return e === t;
	    }
	  }function b(e, t) {
	    for (var n = 0; n < e.length; n++) {
	      if (_(e[n], t)) return n;
	    }return -1;
	  }function $(e) {
	    var t = !1;return function () {
	      t || (t = !0, e.apply(this, arguments));
	    };
	  }function C(e) {
	    var t = (e + "").charCodeAt(0);return 36 === t || 95 === t;
	  }function x(e, t, n, r) {
	    Object.defineProperty(e, t, { value: n, enumerable: !!r, writable: !0, configurable: !0 });
	  }function w(e) {
	    if (!Ui.test(e)) {
	      var t = e.split(".");return function (e) {
	        for (var n = 0; n < t.length; n++) {
	          if (!e) return;e = e[t[n]];
	        }return e;
	      };
	    }
	  }function k(e, t, n) {
	    if (Bi.errorHandler) Bi.errorHandler.call(null, e, t, n);else {
	      if (!Ji || "undefined" == typeof console) throw e;console.error(e);
	    }
	  }function A(e) {
	    return "function" == typeof e && /native code/.test(e.toString());
	  }function O(e) {
	    co.target && uo.push(co.target), co.target = e;
	  }function S() {
	    co.target = uo.pop();
	  }function T(e, t) {
	    e.__proto__ = t;
	  }function E(e, t, n) {
	    for (var r = 0, i = n.length; r < i; r++) {
	      var o = n[r];x(e, o, t[o]);
	    }
	  }function j(e, t) {
	    if (o(e)) {
	      var n;return p(e, "__ob__") && e.__ob__ instanceof ho ? n = e.__ob__ : vo.shouldConvert && !ro() && (Array.isArray(e) || a(e)) && Object.isExtensible(e) && !e._isVue && (n = new ho(e)), t && n && n.vmCount++, n;
	    }
	  }function N(e, t, n, r) {
	    var i = new co(),
	        o = Object.getOwnPropertyDescriptor(e, t);if (!o || !1 !== o.configurable) {
	      var a = o && o.get,
	          s = o && o.set,
	          c = j(n);Object.defineProperty(e, t, { enumerable: !0, configurable: !0, get: function get() {
	          var t = a ? a.call(e) : n;return co.target && (i.depend(), c && c.dep.depend(), Array.isArray(t) && D(t)), t;
	        }, set: function set(t) {
	          var r = a ? a.call(e) : n;t === r || t !== t && r !== r || (s ? s.call(e, t) : n = t, c = j(t), i.notify());
	        } });
	    }
	  }function L(e, t, n) {
	    if (Array.isArray(e) && "number" == typeof t) return e.length = Math.max(e.length, t), e.splice(t, 1, n), n;if (p(e, t)) return e[t] = n, n;var r = e.__ob__;return e._isVue || r && r.vmCount ? n : r ? (N(r.value, t, n), r.dep.notify(), n) : (e[t] = n, n);
	  }function I(e, t) {
	    if (Array.isArray(e) && "number" == typeof t) return void e.splice(t, 1);var n = e.__ob__;e._isVue || n && n.vmCount || p(e, t) && (delete e[t], n && n.dep.notify());
	  }function D(e) {
	    for (var t = void 0, n = 0, r = e.length; n < r; n++) {
	      t = e[n], t && t.__ob__ && t.__ob__.dep.depend(), Array.isArray(t) && D(t);
	    }
	  }function M(e, t) {
	    if (!t) return e;for (var n, r, i, o = Object.keys(t), s = 0; s < o.length; s++) {
	      n = o[s], r = e[n], i = t[n], p(e, n) ? a(r) && a(i) && M(r, i) : L(e, n, i);
	    }return e;
	  }function P(e, t) {
	    return t ? e ? e.concat(t) : Array.isArray(t) ? t : [t] : e;
	  }function R(e, t) {
	    var n = Object.create(e || null);return t ? m(n, t) : n;
	  }function F(e) {
	    var t = e.props;if (t) {
	      var n,
	          r,
	          i,
	          o = {};if (Array.isArray(t)) for (n = t.length; n--;) {
	        "string" == typeof (r = t[n]) && (i = Ni(r), o[i] = { type: null });
	      } else if (a(t)) for (var s in t) {
	        r = t[s], i = Ni(s), o[i] = a(r) ? r : { type: r };
	      }e.props = o;
	    }
	  }function B(e) {
	    var t = e.directives;if (t) for (var n in t) {
	      var r = t[n];"function" == typeof r && (t[n] = { bind: r, update: r });
	    }
	  }function H(e, t, n) {
	    function r(r) {
	      var i = mo[r] || go;c[r] = i(e[r], t[r], n, r);
	    }"function" == typeof t && (t = t.options), F(t), B(t);var i = t.extends;if (i && (e = H(e, i, n)), t.mixins) for (var o = 0, a = t.mixins.length; o < a; o++) {
	      e = H(e, t.mixins[o], n);
	    }var s,
	        c = {};for (s in e) {
	      r(s);
	    }for (s in t) {
	      p(e, s) || r(s);
	    }return c;
	  }function U(e, t, n, r) {
	    if ("string" == typeof n) {
	      var i = e[t];if (p(i, n)) return i[n];var o = Ni(n);if (p(i, o)) return i[o];var a = Li(o);if (p(i, a)) return i[a];var s = i[n] || i[o] || i[a];return s;
	    }
	  }function V(e, t, n, r) {
	    var i = t[e],
	        o = !p(n, e),
	        a = n[e];if (K(Boolean, i.type) && (o && !p(i, "default") ? a = !1 : K(String, i.type) || "" !== a && a !== Ii(e) || (a = !0)), void 0 === a) {
	      a = z(r, i, e);var s = vo.shouldConvert;vo.shouldConvert = !0, j(a), vo.shouldConvert = s;
	    }return a;
	  }function z(e, t, n) {
	    if (p(t, "default")) {
	      var r = t.default;return e && e.$options.propsData && void 0 === e.$options.propsData[n] && void 0 !== e._props[n] ? e._props[n] : "function" == typeof r && "Function" !== J(t.type) ? r.call(e) : r;
	    }
	  }function J(e) {
	    var t = e && e.toString().match(/^\s*function (\w+)/);return t ? t[1] : "";
	  }function K(e, t) {
	    if (!Array.isArray(t)) return J(t) === J(e);for (var n = 0, r = t.length; n < r; n++) {
	      if (J(t[n]) === J(e)) return !0;
	    }return !1;
	  }function q(e) {
	    return new yo(void 0, void 0, void 0, String(e));
	  }function W(e) {
	    var t = new yo(e.tag, e.data, e.children, e.text, e.elm, e.context, e.componentOptions);return t.ns = e.ns, t.isStatic = e.isStatic, t.key = e.key, t.isComment = e.isComment, t.isCloned = !0, t;
	  }function Z(e) {
	    for (var t = e.length, n = new Array(t), r = 0; r < t; r++) {
	      n[r] = W(e[r]);
	    }return n;
	  }function G(e) {
	    function t() {
	      var e = arguments,
	          n = t.fns;if (!Array.isArray(n)) return n.apply(null, arguments);for (var r = 0; r < n.length; r++) {
	        n[r].apply(null, e);
	      }
	    }return t.fns = e, t;
	  }function Y(t, n, r, i, o) {
	    var a, s, c, u;for (a in t) {
	      s = t[a], c = n[a], u = Co(a), e(s) || (e(c) ? (e(s.fns) && (s = t[a] = G(s)), r(u.name, s, u.once, u.capture, u.passive)) : s !== c && (c.fns = s, t[a] = c));
	    }for (a in n) {
	      e(t[a]) && (u = Co(a), i(u.name, n[a], u.capture));
	    }
	  }function Q(r, i, o) {
	    function a() {
	      o.apply(this, arguments), f(s.fns, a);
	    }var s,
	        c = r[i];e(c) ? s = G([a]) : t(c.fns) && n(c.merged) ? (s = c, s.fns.push(a)) : s = G([c, a]), s.merged = !0, r[i] = s;
	  }function X(n, r, i) {
	    var o = r.options.props;if (!e(o)) {
	      var a = {},
	          s = n.attrs,
	          c = n.props;if (t(s) || t(c)) for (var u in o) {
	        var l = Ii(u);ee(a, c, u, l, !0) || ee(a, s, u, l, !1);
	      }return a;
	    }
	  }function ee(e, n, r, i, o) {
	    if (t(n)) {
	      if (p(n, r)) return e[r] = n[r], o || delete n[r], !0;if (p(n, i)) return e[r] = n[i], o || delete n[i], !0;
	    }return !1;
	  }function te(e) {
	    for (var t = 0; t < e.length; t++) {
	      if (Array.isArray(e[t])) return Array.prototype.concat.apply([], e);
	    }return e;
	  }function ne(e) {
	    return i(e) ? [q(e)] : Array.isArray(e) ? ie(e) : void 0;
	  }function re(e) {
	    return t(e) && t(e.text) && r(e.isComment);
	  }function ie(r, o) {
	    var a,
	        s,
	        c,
	        u = [];for (a = 0; a < r.length; a++) {
	      s = r[a], e(s) || "boolean" == typeof s || (c = u[u.length - 1], Array.isArray(s) ? u.push.apply(u, ie(s, (o || "") + "_" + a)) : i(s) ? re(c) ? c.text += String(s) : "" !== s && u.push(q(s)) : re(s) && re(c) ? u[u.length - 1] = q(c.text + s.text) : (n(r._isVList) && t(s.tag) && e(s.key) && t(o) && (s.key = "__vlist" + o + "_" + a + "__"), u.push(s)));
	    }return u;
	  }function oe(e, t) {
	    return o(e) ? t.extend(e) : e;
	  }function ae(r, i, a) {
	    if (n(r.error) && t(r.errorComp)) return r.errorComp;if (t(r.resolved)) return r.resolved;if (n(r.loading) && t(r.loadingComp)) return r.loadingComp;if (!t(r.contexts)) {
	      var s = r.contexts = [a],
	          c = !0,
	          u = function u() {
	        for (var e = 0, t = s.length; e < t; e++) {
	          s[e].$forceUpdate();
	        }
	      },
	          l = $(function (e) {
	        r.resolved = oe(e, i), c || u();
	      }),
	          f = $(function (e) {
	        t(r.errorComp) && (r.error = !0, u());
	      }),
	          p = r(l, f);return o(p) && ("function" == typeof p.then ? e(r.resolved) && p.then(l, f) : t(p.component) && "function" == typeof p.component.then && (p.component.then(l, f), t(p.error) && (r.errorComp = oe(p.error, i)), t(p.loading) && (r.loadingComp = oe(p.loading, i), 0 === p.delay ? r.loading = !0 : setTimeout(function () {
	        e(r.resolved) && e(r.error) && (r.loading = !0, u());
	      }, p.delay || 200)), t(p.timeout) && setTimeout(function () {
	        e(r.resolved) && f(null);
	      }, p.timeout))), c = !1, r.loading ? r.loadingComp : r.resolved;
	    }r.contexts.push(a);
	  }function se(e) {
	    if (Array.isArray(e)) for (var n = 0; n < e.length; n++) {
	      var r = e[n];if (t(r) && t(r.componentOptions)) return r;
	    }
	  }function ce(e) {
	    e._events = Object.create(null), e._hasHookEvent = !1;var t = e.$options._parentListeners;t && fe(e, t);
	  }function ue(e, t, n) {
	    n ? bo.$once(e, t) : bo.$on(e, t);
	  }function le(e, t) {
	    bo.$off(e, t);
	  }function fe(e, t, n) {
	    bo = e, Y(t, n || {}, ue, le, e);
	  }function pe(e, t) {
	    var n = {};if (!e) return n;for (var r = [], i = 0, o = e.length; i < o; i++) {
	      var a = e[i];if (a.context !== t && a.functionalContext !== t || !a.data || null == a.data.slot) r.push(a);else {
	        var s = a.data.slot,
	            c = n[s] || (n[s] = []);"template" === a.tag ? c.push.apply(c, a.children) : c.push(a);
	      }
	    }return r.every(de) || (n.default = r), n;
	  }function de(e) {
	    return e.isComment || " " === e.text;
	  }function ve(e, t) {
	    t = t || {};for (var n = 0; n < e.length; n++) {
	      Array.isArray(e[n]) ? ve(e[n], t) : t[e[n].key] = e[n].fn;
	    }return t;
	  }function he(e) {
	    var t = e.$options,
	        n = t.parent;if (n && !t.abstract) {
	      for (; n.$options.abstract && n.$parent;) {
	        n = n.$parent;
	      }n.$children.push(e);
	    }e.$parent = n, e.$root = n ? n.$root : e, e.$children = [], e.$refs = {}, e._watcher = null, e._inactive = null, e._directInactive = !1, e._isMounted = !1, e._isDestroyed = !1, e._isBeingDestroyed = !1;
	  }function me(e, t, n) {
	    e.$el = t, e.$options.render || (e.$options.render = $o), $e(e, "beforeMount");var r;return r = function r() {
	      e._update(e._render(), n);
	    }, e._watcher = new jo(e, r, y), n = !1, null == e.$vnode && (e._isMounted = !0, $e(e, "mounted")), e;
	  }function ge(e, t, n, r, i) {
	    var o = !!(i || e.$options._renderChildren || r.data.scopedSlots || e.$scopedSlots !== Hi);if (e.$options._parentVnode = r, e.$vnode = r, e._vnode && (e._vnode.parent = r), e.$options._renderChildren = i, t && e.$options.props) {
	      vo.shouldConvert = !1;for (var a = e._props, s = e.$options._propKeys || [], c = 0; c < s.length; c++) {
	        var u = s[c];a[u] = V(u, e.$options.props, t, e);
	      }vo.shouldConvert = !0, e.$options.propsData = t;
	    }if (n) {
	      var l = e.$options._parentListeners;e.$options._parentListeners = n, fe(e, n, l);
	    }o && (e.$slots = pe(i, r.context), e.$forceUpdate());
	  }function ye(e) {
	    for (; e && (e = e.$parent);) {
	      if (e._inactive) return !0;
	    }return !1;
	  }function _e(e, t) {
	    if (t) {
	      if (e._directInactive = !1, ye(e)) return;
	    } else if (e._directInactive) return;if (e._inactive || null === e._inactive) {
	      e._inactive = !1;for (var n = 0; n < e.$children.length; n++) {
	        _e(e.$children[n]);
	      }$e(e, "activated");
	    }
	  }function be(e, t) {
	    if (!(t && (e._directInactive = !0, ye(e)) || e._inactive)) {
	      e._inactive = !0;for (var n = 0; n < e.$children.length; n++) {
	        be(e.$children[n]);
	      }$e(e, "deactivated");
	    }
	  }function $e(e, t) {
	    var n = e.$options[t];if (n) for (var r = 0, i = n.length; r < i; r++) {
	      try {
	        n[r].call(e);
	      } catch (n) {
	        k(n, e, t + " hook");
	      }
	    }e._hasHookEvent && e.$emit("hook:" + t);
	  }function Ce() {
	    To = wo.length = ko.length = 0, Ao = {}, Oo = So = !1;
	  }function xe() {
	    So = !0;var e, t;for (wo.sort(function (e, t) {
	      return e.id - t.id;
	    }), To = 0; To < wo.length; To++) {
	      e = wo[To], t = e.id, Ao[t] = null, e.run();
	    }var n = ko.slice(),
	        r = wo.slice();Ce(), Ae(n), we(r), io && Bi.devtools && io.emit("flush");
	  }function we(e) {
	    for (var t = e.length; t--;) {
	      var n = e[t],
	          r = n.vm;r._watcher === n && r._isMounted && $e(r, "updated");
	    }
	  }function ke(e) {
	    e._inactive = !1, ko.push(e);
	  }function Ae(e) {
	    for (var t = 0; t < e.length; t++) {
	      e[t]._inactive = !0, _e(e[t], !0);
	    }
	  }function Oe(e) {
	    var t = e.id;if (null == Ao[t]) {
	      if (Ao[t] = !0, So) {
	        for (var n = wo.length - 1; n > To && wo[n].id > e.id;) {
	          n--;
	        }wo.splice(n + 1, 0, e);
	      } else wo.push(e);Oo || (Oo = !0, ao(xe));
	    }
	  }function Se(e) {
	    No.clear(), Te(e, No);
	  }function Te(e, t) {
	    var n,
	        r,
	        i = Array.isArray(e);if ((i || o(e)) && Object.isExtensible(e)) {
	      if (e.__ob__) {
	        var a = e.__ob__.dep.id;if (t.has(a)) return;t.add(a);
	      }if (i) for (n = e.length; n--;) {
	        Te(e[n], t);
	      } else for (r = Object.keys(e), n = r.length; n--;) {
	        Te(e[r[n]], t);
	      }
	    }
	  }function Ee(e, t, n) {
	    Lo.get = function () {
	      return this[t][n];
	    }, Lo.set = function (e) {
	      this[t][n] = e;
	    }, Object.defineProperty(e, n, Lo);
	  }function je(e) {
	    e._watchers = [];var t = e.$options;t.props && Ne(e, t.props), t.methods && Re(e, t.methods), t.data ? Le(e) : j(e._data = {}, !0), t.computed && De(e, t.computed), t.watch && Fe(e, t.watch);
	  }function Ne(e, t) {
	    var n = e.$options.propsData || {},
	        r = e._props = {},
	        i = e.$options._propKeys = [],
	        o = !e.$parent;vo.shouldConvert = o;for (var a in t) {
	      !function (o) {
	        i.push(o);var a = V(o, t, n, e);N(r, o, a), o in e || Ee(e, "_props", o);
	      }(a);
	    }vo.shouldConvert = !0;
	  }function Le(e) {
	    var t = e.$options.data;t = e._data = "function" == typeof t ? Ie(t, e) : t || {}, a(t) || (t = {});for (var n = Object.keys(t), r = e.$options.props, i = n.length; i--;) {
	      r && p(r, n[i]) || C(n[i]) || Ee(e, "_data", n[i]);
	    }j(t, !0);
	  }function Ie(e, t) {
	    try {
	      return e.call(t);
	    } catch (e) {
	      return k(e, t, "data()"), {};
	    }
	  }function De(e, t) {
	    var n = e._computedWatchers = Object.create(null);for (var r in t) {
	      var i = t[r],
	          o = "function" == typeof i ? i : i.get;n[r] = new jo(e, o, y, Io), r in e || Me(e, r, i);
	    }
	  }function Me(e, t, n) {
	    "function" == typeof n ? (Lo.get = Pe(t), Lo.set = y) : (Lo.get = n.get ? !1 !== n.cache ? Pe(t) : n.get : y, Lo.set = n.set ? n.set : y), Object.defineProperty(e, t, Lo);
	  }function Pe(e) {
	    return function () {
	      var t = this._computedWatchers && this._computedWatchers[e];if (t) return t.dirty && t.evaluate(), co.target && t.depend(), t.value;
	    };
	  }function Re(e, t) {
	    e.$options.props;for (var n in t) {
	      e[n] = null == t[n] ? y : v(t[n], e);
	    }
	  }function Fe(e, t) {
	    for (var n in t) {
	      var r = t[n];if (Array.isArray(r)) for (var i = 0; i < r.length; i++) {
	        Be(e, n, r[i]);
	      } else Be(e, n, r);
	    }
	  }function Be(e, t, n) {
	    var r;a(n) && (r = n, n = n.handler), "string" == typeof n && (n = e[n]), e.$watch(t, n, r);
	  }function He(e) {
	    var t = e.$options.provide;t && (e._provided = "function" == typeof t ? t.call(e) : t);
	  }function Ue(e) {
	    var t = Ve(e.$options.inject, e);t && Object.keys(t).forEach(function (n) {
	      N(e, n, t[n]);
	    });
	  }function Ve(e, t) {
	    if (e) {
	      for (var n = Array.isArray(e), r = Object.create(null), i = n ? e : oo ? Reflect.ownKeys(e) : Object.keys(e), o = 0; o < i.length; o++) {
	        for (var a = i[o], s = n ? a : e[a], c = t; c;) {
	          if (c._provided && s in c._provided) {
	            r[a] = c._provided[s];break;
	          }c = c.$parent;
	        }
	      }return r;
	    }
	  }function ze(e, n, r, i, o) {
	    var a = {},
	        s = e.options.props;if (t(s)) for (var c in s) {
	      a[c] = V(c, s, n || {});
	    } else t(r.attrs) && Je(a, r.attrs), t(r.props) && Je(a, r.props);var u = Object.create(i),
	        l = function l(e, t, n, r) {
	      return Ye(u, e, t, n, r, !0);
	    },
	        f = e.options.render.call(null, l, { data: r, props: a, children: o, parent: i, listeners: r.on || {}, injections: Ve(e.options.inject, i), slots: function slots() {
	        return pe(o, i);
	      } });return f instanceof yo && (f.functionalContext = i, f.functionalOptions = e.options, r.slot && ((f.data || (f.data = {})).slot = r.slot)), f;
	  }function Je(e, t) {
	    for (var n in t) {
	      e[Ni(n)] = t[n];
	    }
	  }function Ke(r, i, a, s, c) {
	    if (!e(r)) {
	      var u = a.$options._base;if (o(r) && (r = u.extend(r)), "function" == typeof r && (!e(r.cid) || void 0 !== (r = ae(r, u, a)))) {
	        ft(r), i = i || {}, t(i.model) && Ge(r.options, i);var l = X(i, r, c);if (n(r.options.functional)) return ze(r, l, i, a, s);var f = i.on;i.on = i.nativeOn, n(r.options.abstract) && (i = {}), We(i);var p = r.options.name || c;return new yo("vue-component-" + r.cid + (p ? "-" + p : ""), i, void 0, void 0, void 0, a, { Ctor: r, propsData: l, listeners: f, tag: c, children: s });
	      }
	    }
	  }function qe(e, n, r, i) {
	    var o = e.componentOptions,
	        a = { _isComponent: !0, parent: n, propsData: o.propsData, _componentTag: o.tag, _parentVnode: e, _parentListeners: o.listeners, _renderChildren: o.children, _parentElm: r || null, _refElm: i || null },
	        s = e.data.inlineTemplate;return t(s) && (a.render = s.render, a.staticRenderFns = s.staticRenderFns), new o.Ctor(a);
	  }function We(e) {
	    e.hook || (e.hook = {});for (var t = 0; t < Mo.length; t++) {
	      var n = Mo[t],
	          r = e.hook[n],
	          i = Do[n];e.hook[n] = r ? Ze(i, r) : i;
	    }
	  }function Ze(e, t) {
	    return function (n, r, i, o) {
	      e(n, r, i, o), t(n, r, i, o);
	    };
	  }function Ge(e, n) {
	    var r = e.model && e.model.prop || "value",
	        i = e.model && e.model.event || "input";(n.props || (n.props = {}))[r] = n.model.value;var o = n.on || (n.on = {});t(o[i]) ? o[i] = [n.model.callback].concat(o[i]) : o[i] = n.model.callback;
	  }function Ye(e, t, r, o, a, s) {
	    return (Array.isArray(r) || i(r)) && (a = o, o = r, r = void 0), n(s) && (a = Ro), Qe(e, t, r, o, a);
	  }function Qe(e, n, r, i, o) {
	    if (t(r) && t(r.__ob__)) return $o();if (!n) return $o();Array.isArray(i) && "function" == typeof i[0] && (r = r || {}, r.scopedSlots = { default: i[0] }, i.length = 0), o === Ro ? i = ne(i) : o === Po && (i = te(i));var a, s;if ("string" == typeof n) {
	      var c;s = Bi.getTagNamespace(n), a = Bi.isReservedTag(n) ? new yo(Bi.parsePlatformTagName(n), r, i, void 0, void 0, e) : t(c = U(e.$options, "components", n)) ? Ke(c, r, e, i, n) : new yo(n, r, i, void 0, void 0, e);
	    } else a = Ke(n, r, e, i);return t(a) ? (s && Xe(a, s), a) : $o();
	  }function Xe(n, r) {
	    if (n.ns = r, "foreignObject" !== n.tag && t(n.children)) for (var i = 0, o = n.children.length; i < o; i++) {
	      var a = n.children[i];t(a.tag) && e(a.ns) && Xe(a, r);
	    }
	  }function et(e, n) {
	    var r, i, a, s, c;if (Array.isArray(e) || "string" == typeof e) for (r = new Array(e.length), i = 0, a = e.length; i < a; i++) {
	      r[i] = n(e[i], i);
	    } else if ("number" == typeof e) for (r = new Array(e), i = 0; i < e; i++) {
	      r[i] = n(i + 1, i);
	    } else if (o(e)) for (s = Object.keys(e), r = new Array(s.length), i = 0, a = s.length; i < a; i++) {
	      c = s[i], r[i] = n(e[c], c, i);
	    }return t(r) && (r._isVList = !0), r;
	  }function tt(e, t, n, r) {
	    var i = this.$scopedSlots[e];if (i) return n = n || {}, r && m(n, r), i(n) || t;var o = this.$slots[e];return o || t;
	  }function nt(e) {
	    return U(this.$options, "filters", e, !0) || Mi;
	  }function rt(e, t, n) {
	    var r = Bi.keyCodes[t] || n;return Array.isArray(r) ? -1 === r.indexOf(e) : r !== e;
	  }function it(e, t, n, r) {
	    if (n) if (o(n)) {
	      Array.isArray(n) && (n = g(n));var i;for (var a in n) {
	        if ("class" === a || "style" === a) i = e;else {
	          var s = e.attrs && e.attrs.type;i = r || Bi.mustUseProp(t, s, a) ? e.domProps || (e.domProps = {}) : e.attrs || (e.attrs = {});
	        }a in i || (i[a] = n[a]);
	      }
	    } else ;return e;
	  }function ot(e, t) {
	    var n = this._staticTrees[e];return n && !t ? Array.isArray(n) ? Z(n) : W(n) : (n = this._staticTrees[e] = this.$options.staticRenderFns[e].call(this._renderProxy), st(n, "__static__" + e, !1), n);
	  }function at(e, t, n) {
	    return st(e, "__once__" + t + (n ? "_" + n : ""), !0), e;
	  }function st(e, t, n) {
	    if (Array.isArray(e)) for (var r = 0; r < e.length; r++) {
	      e[r] && "string" != typeof e[r] && ct(e[r], t + "_" + r, n);
	    } else ct(e, t, n);
	  }function ct(e, t, n) {
	    e.isStatic = !0, e.key = t, e.isOnce = n;
	  }function ut(e) {
	    e._vnode = null, e._staticTrees = null;var t = e.$vnode = e.$options._parentVnode,
	        n = t && t.context;e.$slots = pe(e.$options._renderChildren, n), e.$scopedSlots = Hi, e._c = function (t, n, r, i) {
	      return Ye(e, t, n, r, i, !1);
	    }, e.$createElement = function (t, n, r, i) {
	      return Ye(e, t, n, r, i, !0);
	    };
	  }function lt(e, t) {
	    var n = e.$options = Object.create(e.constructor.options);n.parent = t.parent, n.propsData = t.propsData, n._parentVnode = t._parentVnode, n._parentListeners = t._parentListeners, n._renderChildren = t._renderChildren, n._componentTag = t._componentTag, n._parentElm = t._parentElm, n._refElm = t._refElm, t.render && (n.render = t.render, n.staticRenderFns = t.staticRenderFns);
	  }function ft(e) {
	    var t = e.options;if (e.super) {
	      var n = ft(e.super);if (n !== e.superOptions) {
	        e.superOptions = n;var r = pt(e);r && m(e.extendOptions, r), t = e.options = H(n, e.extendOptions), t.name && (t.components[t.name] = e);
	      }
	    }return t;
	  }function pt(e) {
	    var t,
	        n = e.options,
	        r = e.extendOptions,
	        i = e.sealedOptions;for (var o in n) {
	      n[o] !== i[o] && (t || (t = {}), t[o] = dt(n[o], r[o], i[o]));
	    }return t;
	  }function dt(e, t, n) {
	    if (Array.isArray(e)) {
	      var r = [];n = Array.isArray(n) ? n : [n], t = Array.isArray(t) ? t : [t];for (var i = 0; i < e.length; i++) {
	        (t.indexOf(e[i]) >= 0 || n.indexOf(e[i]) < 0) && r.push(e[i]);
	      }return r;
	    }return e;
	  }function vt(e) {
	    this._init(e);
	  }function ht(e) {
	    e.use = function (e) {
	      if (e.installed) return this;var t = h(arguments, 1);return t.unshift(this), "function" == typeof e.install ? e.install.apply(e, t) : "function" == typeof e && e.apply(null, t), e.installed = !0, this;
	    };
	  }function mt(e) {
	    e.mixin = function (e) {
	      return this.options = H(this.options, e), this;
	    };
	  }function gt(e) {
	    e.cid = 0;var t = 1;e.extend = function (e) {
	      e = e || {};var n = this,
	          r = n.cid,
	          i = e._Ctor || (e._Ctor = {});if (i[r]) return i[r];var o = e.name || n.options.name,
	          a = function a(e) {
	        this._init(e);
	      };return a.prototype = Object.create(n.prototype), a.prototype.constructor = a, a.cid = t++, a.options = H(n.options, e), a.super = n, a.options.props && yt(a), a.options.computed && _t(a), a.extend = n.extend, a.mixin = n.mixin, a.use = n.use, Ri.forEach(function (e) {
	        a[e] = n[e];
	      }), o && (a.options.components[o] = a), a.superOptions = n.options, a.extendOptions = e, a.sealedOptions = m({}, a.options), i[r] = a, a;
	    };
	  }function yt(e) {
	    var t = e.options.props;for (var n in t) {
	      Ee(e.prototype, "_props", n);
	    }
	  }function _t(e) {
	    var t = e.options.computed;for (var n in t) {
	      Me(e.prototype, n, t[n]);
	    }
	  }function bt(e) {
	    Ri.forEach(function (t) {
	      e[t] = function (e, n) {
	        return n ? ("component" === t && a(n) && (n.name = n.name || e, n = this.options._base.extend(n)), "directive" === t && "function" == typeof n && (n = { bind: n, update: n }), this.options[t + "s"][e] = n, n) : this.options[t + "s"][e];
	      };
	    });
	  }function $t(e) {
	    return e && (e.Ctor.options.name || e.tag);
	  }function Ct(e, t) {
	    return "string" == typeof e ? e.split(",").indexOf(t) > -1 : !!s(e) && e.test(t);
	  }function xt(e, t, n) {
	    for (var r in e) {
	      var i = e[r];if (i) {
	        var o = $t(i.componentOptions);o && !n(o) && (i !== t && wt(i), e[r] = null);
	      }
	    }
	  }function wt(e) {
	    e && e.componentInstance.$destroy();
	  }function kt(e) {
	    for (var n = e.data, r = e, i = e; t(i.componentInstance);) {
	      i = i.componentInstance._vnode, i.data && (n = At(i.data, n));
	    }for (; t(r = r.parent);) {
	      r.data && (n = At(n, r.data));
	    }return Ot(n);
	  }function At(e, n) {
	    return { staticClass: St(e.staticClass, n.staticClass), class: t(e.class) ? [e.class, n.class] : n.class };
	  }function Ot(e) {
	    var n = e.class,
	        r = e.staticClass;return t(r) || t(n) ? St(r, Tt(n)) : "";
	  }function St(e, t) {
	    return e ? t ? e + " " + t : e : t || "";
	  }function Tt(n) {
	    if (e(n)) return "";if ("string" == typeof n) return n;var r = "";if (Array.isArray(n)) {
	      for (var i, a = 0, s = n.length; a < s; a++) {
	        t(n[a]) && t(i = Tt(n[a])) && "" !== i && (r += i + " ");
	      }return r.slice(0, -1);
	    }if (o(n)) {
	      for (var c in n) {
	        n[c] && (r += c + " ");
	      }return r.slice(0, -1);
	    }return r;
	  }function Et(e) {
	    return ua(e) ? "svg" : "math" === e ? "math" : void 0;
	  }function jt(e) {
	    if (!Ji) return !0;if (fa(e)) return !1;if (e = e.toLowerCase(), null != pa[e]) return pa[e];var t = document.createElement(e);return e.indexOf("-") > -1 ? pa[e] = t.constructor === window.HTMLUnknownElement || t.constructor === window.HTMLElement : pa[e] = /HTMLUnknownElement/.test(t.toString());
	  }function Nt(e) {
	    if ("string" == typeof e) {
	      var t = document.querySelector(e);return t || document.createElement("div");
	    }return e;
	  }function Lt(e, t) {
	    var n = document.createElement(e);return "select" !== e ? n : (t.data && t.data.attrs && void 0 !== t.data.attrs.multiple && n.setAttribute("multiple", "multiple"), n);
	  }function It(e, t) {
	    return document.createElementNS(sa[e], t);
	  }function Dt(e) {
	    return document.createTextNode(e);
	  }function Mt(e) {
	    return document.createComment(e);
	  }function Pt(e, t, n) {
	    e.insertBefore(t, n);
	  }function Rt(e, t) {
	    e.removeChild(t);
	  }function Ft(e, t) {
	    e.appendChild(t);
	  }function Bt(e) {
	    return e.parentNode;
	  }function Ht(e) {
	    return e.nextSibling;
	  }function Ut(e) {
	    return e.tagName;
	  }function Vt(e, t) {
	    e.textContent = t;
	  }function zt(e, t, n) {
	    e.setAttribute(t, n);
	  }function Jt(e, t) {
	    var n = e.data.ref;if (n) {
	      var r = e.context,
	          i = e.componentInstance || e.elm,
	          o = r.$refs;t ? Array.isArray(o[n]) ? f(o[n], i) : o[n] === i && (o[n] = void 0) : e.data.refInFor ? Array.isArray(o[n]) && o[n].indexOf(i) < 0 ? o[n].push(i) : o[n] = [i] : o[n] = i;
	    }
	  }function Kt(e, n) {
	    return e.key === n.key && e.tag === n.tag && e.isComment === n.isComment && t(e.data) === t(n.data) && qt(e, n);
	  }function qt(e, n) {
	    if ("input" !== e.tag) return !0;var r;return (t(r = e.data) && t(r = r.attrs) && r.type) === (t(r = n.data) && t(r = r.attrs) && r.type);
	  }function Wt(e, n, r) {
	    var i,
	        o,
	        a = {};for (i = n; i <= r; ++i) {
	      o = e[i].key, t(o) && (a[o] = i);
	    }return a;
	  }function Zt(e, t) {
	    (e.data.directives || t.data.directives) && Gt(e, t);
	  }function Gt(e, t) {
	    var n,
	        r,
	        i,
	        o = e === ha,
	        a = t === ha,
	        s = Yt(e.data.directives, e.context),
	        c = Yt(t.data.directives, t.context),
	        u = [],
	        l = [];for (n in c) {
	      r = s[n], i = c[n], r ? (i.oldValue = r.value, Xt(i, "update", t, e), i.def && i.def.componentUpdated && l.push(i)) : (Xt(i, "bind", t, e), i.def && i.def.inserted && u.push(i));
	    }if (u.length) {
	      var f = function f() {
	        for (var n = 0; n < u.length; n++) {
	          Xt(u[n], "inserted", t, e);
	        }
	      };o ? Q(t.data.hook || (t.data.hook = {}), "insert", f) : f();
	    }if (l.length && Q(t.data.hook || (t.data.hook = {}), "postpatch", function () {
	      for (var n = 0; n < l.length; n++) {
	        Xt(l[n], "componentUpdated", t, e);
	      }
	    }), !o) for (n in s) {
	      c[n] || Xt(s[n], "unbind", e, e, a);
	    }
	  }function Yt(e, t) {
	    var n = Object.create(null);if (!e) return n;var r, i;for (r = 0; r < e.length; r++) {
	      i = e[r], i.modifiers || (i.modifiers = ya), n[Qt(i)] = i, i.def = U(t.$options, "directives", i.name, !0);
	    }return n;
	  }function Qt(e) {
	    return e.rawName || e.name + "." + Object.keys(e.modifiers || {}).join(".");
	  }function Xt(e, t, n, r, i) {
	    var o = e.def && e.def[t];if (o) try {
	      o(n.elm, e, n, r, i);
	    } catch (r) {
	      k(r, n.context, "directive " + e.name + " " + t + " hook");
	    }
	  }function en(n, r) {
	    if (!e(n.data.attrs) || !e(r.data.attrs)) {
	      var i,
	          o,
	          a = r.elm,
	          s = n.data.attrs || {},
	          c = r.data.attrs || {};t(c.__ob__) && (c = r.data.attrs = m({}, c));for (i in c) {
	        o = c[i], s[i] !== o && tn(a, i, o);
	      }Wi && c.value !== s.value && tn(a, "value", c.value);for (i in s) {
	        e(c[i]) && (ia(i) ? a.removeAttributeNS(ra, oa(i)) : ta(i) || a.removeAttribute(i));
	      }
	    }
	  }function tn(e, t, n) {
	    na(t) ? aa(n) ? e.removeAttribute(t) : e.setAttribute(t, t) : ta(t) ? e.setAttribute(t, aa(n) || "false" === n ? "false" : "true") : ia(t) ? aa(n) ? e.removeAttributeNS(ra, oa(t)) : e.setAttributeNS(ra, t, n) : aa(n) ? e.removeAttribute(t) : e.setAttribute(t, n);
	  }function nn(n, r) {
	    var i = r.elm,
	        o = r.data,
	        a = n.data;if (!(e(o.staticClass) && e(o.class) && (e(a) || e(a.staticClass) && e(a.class)))) {
	      var s = kt(r),
	          c = i._transitionClasses;t(c) && (s = St(s, Tt(c))), s !== i._prevClass && (i.setAttribute("class", s), i._prevClass = s);
	    }
	  }function rn(e) {
	    function t() {
	      (a || (a = [])).push(e.slice(v, i).trim()), v = i + 1;
	    }var n,
	        r,
	        i,
	        o,
	        a,
	        s = !1,
	        c = !1,
	        u = !1,
	        l = !1,
	        f = 0,
	        p = 0,
	        d = 0,
	        v = 0;for (i = 0; i < e.length; i++) {
	      if (r = n, n = e.charCodeAt(i), s) 39 === n && 92 !== r && (s = !1);else if (c) 34 === n && 92 !== r && (c = !1);else if (u) 96 === n && 92 !== r && (u = !1);else if (l) 47 === n && 92 !== r && (l = !1);else if (124 !== n || 124 === e.charCodeAt(i + 1) || 124 === e.charCodeAt(i - 1) || f || p || d) {
	        switch (n) {case 34:
	            c = !0;break;case 39:
	            s = !0;break;case 96:
	            u = !0;break;case 40:
	            d++;break;case 41:
	            d--;break;case 91:
	            p++;break;case 93:
	            p--;break;case 123:
	            f++;break;case 125:
	            f--;}if (47 === n) {
	          for (var h = i - 1, m = void 0; h >= 0 && " " === (m = e.charAt(h)); h--) {}m && Ca.test(m) || (l = !0);
	        }
	      } else void 0 === o ? (v = i + 1, o = e.slice(0, i).trim()) : t();
	    }if (void 0 === o ? o = e.slice(0, i).trim() : 0 !== v && t(), a) for (i = 0; i < a.length; i++) {
	      o = on(o, a[i]);
	    }return o;
	  }function on(e, t) {
	    var n = t.indexOf("(");return n < 0 ? '_f("' + t + '")(' + e + ")" : '_f("' + t.slice(0, n) + '")(' + e + "," + t.slice(n + 1);
	  }function an(e) {
	    console.error("[Vue compiler]: " + e);
	  }function sn(e, t) {
	    return e ? e.map(function (e) {
	      return e[t];
	    }).filter(function (e) {
	      return e;
	    }) : [];
	  }function cn(e, t, n) {
	    (e.props || (e.props = [])).push({ name: t, value: n });
	  }function un(e, t, n) {
	    (e.attrs || (e.attrs = [])).push({ name: t, value: n });
	  }function ln(e, t, n, r, i, o) {
	    (e.directives || (e.directives = [])).push({ name: t, rawName: n, value: r, arg: i, modifiers: o });
	  }function fn(e, t, n, r, i, o) {
	    r && r.capture && (delete r.capture, t = "!" + t), r && r.once && (delete r.once, t = "~" + t), r && r.passive && (delete r.passive, t = "&" + t);var a;r && r.native ? (delete r.native, a = e.nativeEvents || (e.nativeEvents = {})) : a = e.events || (e.events = {});var s = { value: n, modifiers: r },
	        c = a[t];Array.isArray(c) ? i ? c.unshift(s) : c.push(s) : a[t] = c ? i ? [s, c] : [c, s] : s;
	  }function pn(e, t, n) {
	    var r = dn(e, ":" + t) || dn(e, "v-bind:" + t);if (null != r) return rn(r);if (!1 !== n) {
	      var i = dn(e, t);if (null != i) return JSON.stringify(i);
	    }
	  }function dn(e, t) {
	    var n;if (null != (n = e.attrsMap[t])) for (var r = e.attrsList, i = 0, o = r.length; i < o; i++) {
	      if (r[i].name === t) {
	        r.splice(i, 1);break;
	      }
	    }return n;
	  }function vn(e, t, n) {
	    var r = n || {},
	        i = r.number,
	        o = r.trim,
	        a = "$$v";o && (a = "(typeof $$v === 'string'? $$v.trim(): $$v)"), i && (a = "_n(" + a + ")");var s = hn(t, a);e.model = { value: "(" + t + ")", expression: '"' + t + '"', callback: "function ($$v) {" + s + "}" };
	  }function hn(e, t) {
	    var n = mn(e);return null === n.idx ? e + "=" + t : "var $$exp = " + n.exp + ", $$idx = " + n.idx + ";if (!Array.isArray($$exp)){" + e + "=" + t + "}else{$$exp.splice($$idx, 1, " + t + ")}";
	  }function mn(e) {
	    if (zo = e, Vo = zo.length, Ko = qo = Wo = 0, e.indexOf("[") < 0 || e.lastIndexOf("]") < Vo - 1) return { exp: e, idx: null };for (; !yn();) {
	      Jo = gn(), _n(Jo) ? $n(Jo) : 91 === Jo && bn(Jo);
	    }return { exp: e.substring(0, qo), idx: e.substring(qo + 1, Wo) };
	  }function gn() {
	    return zo.charCodeAt(++Ko);
	  }function yn() {
	    return Ko >= Vo;
	  }function _n(e) {
	    return 34 === e || 39 === e;
	  }function bn(e) {
	    var t = 1;for (qo = Ko; !yn();) {
	      if (e = gn(), _n(e)) $n(e);else if (91 === e && t++, 93 === e && t--, 0 === t) {
	        Wo = Ko;break;
	      }
	    }
	  }function $n(e) {
	    for (var t = e; !yn() && (e = gn()) !== t;) {}
	  }function Cn(e, t, n) {
	    Zo = n;var r = t.value,
	        i = t.modifiers,
	        o = e.tag,
	        a = e.attrsMap.type;if ("select" === o) kn(e, r, i);else if ("input" === o && "checkbox" === a) xn(e, r, i);else if ("input" === o && "radio" === a) wn(e, r, i);else if ("input" === o || "textarea" === o) An(e, r, i);else if (!Bi.isReservedTag(o)) return vn(e, r, i), !1;return !0;
	  }function xn(e, t, n) {
	    var r = n && n.number,
	        i = pn(e, "value") || "null",
	        o = pn(e, "true-value") || "true",
	        a = pn(e, "false-value") || "false";cn(e, "checked", "Array.isArray(" + t + ")?_i(" + t + "," + i + ")>-1" + ("true" === o ? ":(" + t + ")" : ":_q(" + t + "," + o + ")")), fn(e, wa, "var $$a=" + t + ",$$el=$event.target,$$c=$$el.checked?(" + o + "):(" + a + ");if(Array.isArray($$a)){var $$v=" + (r ? "_n(" + i + ")" : i) + ",$$i=_i($$a,$$v);if($$c){$$i<0&&(" + t + "=$$a.concat($$v))}else{$$i>-1&&(" + t + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{" + hn(t, "$$c") + "}", null, !0);
	  }function wn(e, t, n) {
	    var r = n && n.number,
	        i = pn(e, "value") || "null";i = r ? "_n(" + i + ")" : i, cn(e, "checked", "_q(" + t + "," + i + ")"), fn(e, wa, hn(t, i), null, !0);
	  }function kn(e, t, n) {
	    var r = n && n.number,
	        i = 'Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return ' + (r ? "_n(val)" : "val") + "})",
	        o = "var $$selectedVal = " + i + ";";o = o + " " + hn(t, "$event.target.multiple ? $$selectedVal : $$selectedVal[0]"), fn(e, "change", o, null, !0);
	  }function An(e, t, n) {
	    var r = e.attrsMap.type,
	        i = n || {},
	        o = i.lazy,
	        a = i.number,
	        s = i.trim,
	        c = !o && "range" !== r,
	        u = o ? "change" : "range" === r ? xa : "input",
	        l = "$event.target.value";s && (l = "$event.target.value.trim()"), a && (l = "_n(" + l + ")");var f = hn(t, l);c && (f = "if($event.target.composing)return;" + f), cn(e, "value", "(" + t + ")"), fn(e, u, f, null, !0), (s || a || "number" === r) && fn(e, "blur", "$forceUpdate()");
	  }function On(e) {
	    var n;t(e[xa]) && (n = qi ? "change" : "input", e[n] = [].concat(e[xa], e[n] || []), delete e[xa]), t(e[wa]) && (n = Qi ? "click" : "change", e[n] = [].concat(e[wa], e[n] || []), delete e[wa]);
	  }function Sn(e, _t2, n, r, i) {
	    if (n) {
	      var o = _t2,
	          a = Go;_t2 = function t(n) {
	        null !== (1 === arguments.length ? o(n) : o.apply(null, arguments)) && Tn(e, _t2, r, a);
	      };
	    }Go.addEventListener(e, _t2, Xi ? { capture: r, passive: i } : r);
	  }function Tn(e, t, n, r) {
	    (r || Go).removeEventListener(e, t, n);
	  }function En(t, n) {
	    if (!e(t.data.on) || !e(n.data.on)) {
	      var r = n.data.on || {},
	          i = t.data.on || {};Go = n.elm, On(r), Y(r, i, Sn, Tn, n.context);
	    }
	  }function jn(n, r) {
	    if (!e(n.data.domProps) || !e(r.data.domProps)) {
	      var i,
	          o,
	          a = r.elm,
	          s = n.data.domProps || {},
	          c = r.data.domProps || {};t(c.__ob__) && (c = r.data.domProps = m({}, c));for (i in s) {
	        e(c[i]) && (a[i] = "");
	      }for (i in c) {
	        if (o = c[i], "textContent" !== i && "innerHTML" !== i || (r.children && (r.children.length = 0), o !== s[i])) if ("value" === i) {
	          a._value = o;var u = e(o) ? "" : String(o);Nn(a, r, u) && (a.value = u);
	        } else a[i] = o;
	      }
	    }
	  }function Nn(e, t, n) {
	    return !e.composing && ("option" === t.tag || Ln(e, n) || In(e, n));
	  }function Ln(e, t) {
	    return document.activeElement !== e && e.value !== t;
	  }function In(e, n) {
	    var r = e.value,
	        i = e._vModifiers;return t(i) && i.number || "number" === e.type ? u(r) !== u(n) : t(i) && i.trim ? r.trim() !== n.trim() : r !== n;
	  }function Dn(e) {
	    var t = Mn(e.style);return e.staticStyle ? m(e.staticStyle, t) : t;
	  }function Mn(e) {
	    return Array.isArray(e) ? g(e) : "string" == typeof e ? Oa(e) : e;
	  }function Pn(e, t) {
	    var n,
	        r = {};if (t) for (var i = e; i.componentInstance;) {
	      i = i.componentInstance._vnode, i.data && (n = Dn(i.data)) && m(r, n);
	    }(n = Dn(e.data)) && m(r, n);for (var o = e; o = o.parent;) {
	      o.data && (n = Dn(o.data)) && m(r, n);
	    }return r;
	  }function Rn(n, r) {
	    var i = r.data,
	        o = n.data;if (!(e(i.staticStyle) && e(i.style) && e(o.staticStyle) && e(o.style))) {
	      var a,
	          s,
	          c = r.elm,
	          u = o.staticStyle,
	          l = o.normalizedStyle || o.style || {},
	          f = u || l,
	          p = Mn(r.data.style) || {};r.data.normalizedStyle = t(p.__ob__) ? m({}, p) : p;var d = Pn(r, !0);for (s in f) {
	        e(d[s]) && Ea(c, s, "");
	      }for (s in d) {
	        (a = d[s]) !== f[s] && Ea(c, s, null == a ? "" : a);
	      }
	    }
	  }function Fn(e, t) {
	    if (t && (t = t.trim())) if (e.classList) t.indexOf(" ") > -1 ? t.split(/\s+/).forEach(function (t) {
	      return e.classList.add(t);
	    }) : e.classList.add(t);else {
	      var n = " " + (e.getAttribute("class") || "") + " ";n.indexOf(" " + t + " ") < 0 && e.setAttribute("class", (n + t).trim());
	    }
	  }function Bn(e, t) {
	    if (t && (t = t.trim())) if (e.classList) t.indexOf(" ") > -1 ? t.split(/\s+/).forEach(function (t) {
	      return e.classList.remove(t);
	    }) : e.classList.remove(t);else {
	      for (var n = " " + (e.getAttribute("class") || "") + " ", r = " " + t + " "; n.indexOf(r) >= 0;) {
	        n = n.replace(r, " ");
	      }e.setAttribute("class", n.trim());
	    }
	  }function Hn(e) {
	    if (e) {
	      if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
	        var t = {};return !1 !== e.css && m(t, Ia(e.name || "v")), m(t, e), t;
	      }return "string" == typeof e ? Ia(e) : void 0;
	    }
	  }function Un(e) {
	    Ua(function () {
	      Ua(e);
	    });
	  }function Vn(e, t) {
	    (e._transitionClasses || (e._transitionClasses = [])).push(t), Fn(e, t);
	  }function zn(e, t) {
	    e._transitionClasses && f(e._transitionClasses, t), Bn(e, t);
	  }function Jn(e, t, n) {
	    var r = Kn(e, t),
	        i = r.type,
	        o = r.timeout,
	        a = r.propCount;if (!i) return n();var s = i === Ma ? Fa : Ha,
	        c = 0,
	        u = function u() {
	      e.removeEventListener(s, l), n();
	    },
	        l = function l(t) {
	      t.target === e && ++c >= a && u();
	    };setTimeout(function () {
	      c < a && u();
	    }, o + 1), e.addEventListener(s, l);
	  }function Kn(e, t) {
	    var n,
	        r = window.getComputedStyle(e),
	        i = r[Ra + "Delay"].split(", "),
	        o = r[Ra + "Duration"].split(", "),
	        a = qn(i, o),
	        s = r[Ba + "Delay"].split(", "),
	        c = r[Ba + "Duration"].split(", "),
	        u = qn(s, c),
	        l = 0,
	        f = 0;return t === Ma ? a > 0 && (n = Ma, l = a, f = o.length) : t === Pa ? u > 0 && (n = Pa, l = u, f = c.length) : (l = Math.max(a, u), n = l > 0 ? a > u ? Ma : Pa : null, f = n ? n === Ma ? o.length : c.length : 0), { type: n, timeout: l, propCount: f, hasTransform: n === Ma && Va.test(r[Ra + "Property"]) };
	  }function qn(e, t) {
	    for (; e.length < t.length;) {
	      e = e.concat(e);
	    }return Math.max.apply(null, t.map(function (t, n) {
	      return Wn(t) + Wn(e[n]);
	    }));
	  }function Wn(e) {
	    return 1e3 * Number(e.slice(0, -1));
	  }
	  function Zn(n, r) {
	    var i = n.elm;t(i._leaveCb) && (i._leaveCb.cancelled = !0, i._leaveCb());var a = Hn(n.data.transition);if (!e(a) && !t(i._enterCb) && 1 === i.nodeType) {
	      for (var s = a.css, c = a.type, l = a.enterClass, f = a.enterToClass, p = a.enterActiveClass, d = a.appearClass, v = a.appearToClass, h = a.appearActiveClass, m = a.beforeEnter, g = a.enter, y = a.afterEnter, _ = a.enterCancelled, b = a.beforeAppear, C = a.appear, x = a.afterAppear, w = a.appearCancelled, k = a.duration, A = xo, O = xo.$vnode; O && O.parent;) {
	        O = O.parent, A = O.context;
	      }var S = !A._isMounted || !n.isRootInsert;if (!S || C || "" === C) {
	        var T = S && d ? d : l,
	            E = S && h ? h : p,
	            j = S && v ? v : f,
	            N = S ? b || m : m,
	            L = S && "function" == typeof C ? C : g,
	            I = S ? x || y : y,
	            D = S ? w || _ : _,
	            M = u(o(k) ? k.enter : k),
	            P = !1 !== s && !Wi,
	            R = Qn(L),
	            F = i._enterCb = $(function () {
	          P && (zn(i, j), zn(i, E)), F.cancelled ? (P && zn(i, T), D && D(i)) : I && I(i), i._enterCb = null;
	        });n.data.show || Q(n.data.hook || (n.data.hook = {}), "insert", function () {
	          var e = i.parentNode,
	              t = e && e._pending && e._pending[n.key];t && t.tag === n.tag && t.elm._leaveCb && t.elm._leaveCb(), L && L(i, F);
	        }), N && N(i), P && (Vn(i, T), Vn(i, E), Un(function () {
	          Vn(i, j), zn(i, T), F.cancelled || R || (Yn(M) ? setTimeout(F, M) : Jn(i, c, F));
	        })), n.data.show && (r && r(), L && L(i, F)), P || R || F();
	      }
	    }
	  }function Gn(n, r) {
	    function i() {
	      w.cancelled || (n.data.show || ((a.parentNode._pending || (a.parentNode._pending = {}))[n.key] = n), v && v(a), b && (Vn(a, f), Vn(a, d), Un(function () {
	        Vn(a, p), zn(a, f), w.cancelled || C || (Yn(x) ? setTimeout(w, x) : Jn(a, l, w));
	      })), h && h(a, w), b || C || w());
	    }var a = n.elm;t(a._enterCb) && (a._enterCb.cancelled = !0, a._enterCb());var s = Hn(n.data.transition);if (e(s)) return r();if (!t(a._leaveCb) && 1 === a.nodeType) {
	      var c = s.css,
	          l = s.type,
	          f = s.leaveClass,
	          p = s.leaveToClass,
	          d = s.leaveActiveClass,
	          v = s.beforeLeave,
	          h = s.leave,
	          m = s.afterLeave,
	          g = s.leaveCancelled,
	          y = s.delayLeave,
	          _ = s.duration,
	          b = !1 !== c && !Wi,
	          C = Qn(h),
	          x = u(o(_) ? _.leave : _),
	          w = a._leaveCb = $(function () {
	        a.parentNode && a.parentNode._pending && (a.parentNode._pending[n.key] = null), b && (zn(a, p), zn(a, d)), w.cancelled ? (b && zn(a, f), g && g(a)) : (r(), m && m(a)), a._leaveCb = null;
	      });y ? y(i) : i();
	    }
	  }function Yn(e) {
	    return "number" == typeof e && !isNaN(e);
	  }function Qn(n) {
	    if (e(n)) return !1;var r = n.fns;return t(r) ? Qn(Array.isArray(r) ? r[0] : r) : (n._length || n.length) > 1;
	  }function Xn(e, t) {
	    !0 !== t.data.show && Zn(t);
	  }function er(e, t, n) {
	    var r = t.value,
	        i = e.multiple;if (!i || Array.isArray(r)) {
	      for (var o, a, s = 0, c = e.options.length; s < c; s++) {
	        if (a = e.options[s], i) o = b(r, nr(a)) > -1, a.selected !== o && (a.selected = o);else if (_(nr(a), r)) return void (e.selectedIndex !== s && (e.selectedIndex = s));
	      }i || (e.selectedIndex = -1);
	    }
	  }function tr(e, t) {
	    for (var n = 0, r = t.length; n < r; n++) {
	      if (_(nr(t[n]), e)) return !1;
	    }return !0;
	  }function nr(e) {
	    return "_value" in e ? e._value : e.value;
	  }function rr(e) {
	    e.target.composing = !0;
	  }function ir(e) {
	    e.target.composing && (e.target.composing = !1, or(e.target, "input"));
	  }function or(e, t) {
	    var n = document.createEvent("HTMLEvents");n.initEvent(t, !0, !0), e.dispatchEvent(n);
	  }function ar(e) {
	    return !e.componentInstance || e.data && e.data.transition ? e : ar(e.componentInstance._vnode);
	  }function sr(e) {
	    var t = e && e.componentOptions;return t && t.Ctor.options.abstract ? sr(se(t.children)) : e;
	  }function cr(e) {
	    var t = {},
	        n = e.$options;for (var r in n.propsData) {
	      t[r] = e[r];
	    }var i = n._parentListeners;for (var o in i) {
	      t[Ni(o)] = i[o];
	    }return t;
	  }function ur(e, t) {
	    if (/\d-keep-alive$/.test(t.tag)) return e("keep-alive", { props: t.componentOptions.propsData });
	  }function lr(e) {
	    for (; e = e.parent;) {
	      if (e.data.transition) return !0;
	    }
	  }function fr(e, t) {
	    return t.key === e.key && t.tag === e.tag;
	  }function pr(e) {
	    e.elm._moveCb && e.elm._moveCb(), e.elm._enterCb && e.elm._enterCb();
	  }function dr(e) {
	    e.data.newPos = e.elm.getBoundingClientRect();
	  }function vr(e) {
	    var t = e.data.pos,
	        n = e.data.newPos,
	        r = t.left - n.left,
	        i = t.top - n.top;if (r || i) {
	      e.data.moved = !0;var o = e.elm.style;o.transform = o.WebkitTransform = "translate(" + r + "px," + i + "px)", o.transitionDuration = "0s";
	    }
	  }function hr(e) {
	    return ns = ns || document.createElement("div"), ns.innerHTML = e, ns.textContent;
	  }function mr(e, t) {
	    var n = t ? Fs : Rs;return e.replace(n, function (e) {
	      return Ps[e];
	    });
	  }function gr(e, t) {
	    function n(t) {
	      l += t, e = e.substring(t);
	    }function r(e, n, r) {
	      var i, s;if (null == n && (n = l), null == r && (r = l), e && (s = e.toLowerCase()), e) for (i = a.length - 1; i >= 0 && a[i].lowerCasedTag !== s; i--) {} else i = 0;if (i >= 0) {
	        for (var c = a.length - 1; c >= i; c--) {
	          t.end && t.end(a[c].tag, n, r);
	        }a.length = i, o = i && a[i - 1].tag;
	      } else "br" === s ? t.start && t.start(e, [], !0, n, r) : "p" === s && (t.start && t.start(e, [], !1, n, r), t.end && t.end(e, n, r));
	    }for (var i, o, a = [], s = t.expectHTML, c = t.isUnaryTag || Di, u = t.canBeLeftOpenTag || Di, l = 0; e;) {
	      if (i = e, o && Ds(o)) {
	        var f = o.toLowerCase(),
	            p = Ms[f] || (Ms[f] = new RegExp("([\\s\\S]*?)(</" + f + "[^>]*>)", "i")),
	            d = 0,
	            v = e.replace(p, function (e, n, r) {
	          return d = r.length, Ds(f) || "noscript" === f || (n = n.replace(/<!--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g, "$1")), t.chars && t.chars(n), "";
	        });l += e.length - v.length, e = v, r(f, l - d, l);
	      } else {
	        var h = e.indexOf("<");if (0 === h) {
	          if (vs.test(e)) {
	            var m = e.indexOf("--\x3e");if (m >= 0) {
	              n(m + 3);continue;
	            }
	          }if (hs.test(e)) {
	            var g = e.indexOf("]>");if (g >= 0) {
	              n(g + 2);continue;
	            }
	          }var y = e.match(ds);if (y) {
	            n(y[0].length);continue;
	          }var _ = e.match(ps);if (_) {
	            var b = l;n(_[0].length), r(_[1], b, l);continue;
	          }var $ = function () {
	            var t = e.match(ls);if (t) {
	              var r = { tagName: t[1], attrs: [], start: l };n(t[0].length);for (var i, o; !(i = e.match(fs)) && (o = e.match(cs));) {
	                n(o[0].length), r.attrs.push(o);
	              }if (i) return r.unarySlash = i[1], n(i[0].length), r.end = l, r;
	            }
	          }();if ($) {
	            !function (e) {
	              var n = e.tagName,
	                  i = e.unarySlash;s && ("p" === o && as(n) && r(o), u(n) && o === n && r(n));for (var l = c(n) || "html" === n && "head" === o || !!i, f = e.attrs.length, p = new Array(f), d = 0; d < f; d++) {
	                var v = e.attrs[d];ms && -1 === v[0].indexOf('""') && ("" === v[3] && delete v[3], "" === v[4] && delete v[4], "" === v[5] && delete v[5]);var h = v[3] || v[4] || v[5] || "";p[d] = { name: v[1], value: mr(h, t.shouldDecodeNewlines) };
	              }l || (a.push({ tag: n, lowerCasedTag: n.toLowerCase(), attrs: p }), o = n), t.start && t.start(n, p, l, e.start, e.end);
	            }($);continue;
	          }
	        }var C = void 0,
	            x = void 0,
	            w = void 0;if (h >= 0) {
	          for (x = e.slice(h); !(ps.test(x) || ls.test(x) || vs.test(x) || hs.test(x) || (w = x.indexOf("<", 1)) < 0);) {
	            h += w, x = e.slice(h);
	          }C = e.substring(0, h), n(h);
	        }h < 0 && (C = e, e = ""), t.chars && C && t.chars(C);
	      }if (e === i) {
	        t.chars && t.chars(e);break;
	      }
	    }r();
	  }function yr(e, t) {
	    var n = t ? Hs(t) : Bs;if (n.test(e)) {
	      for (var r, i, o = [], a = n.lastIndex = 0; r = n.exec(e);) {
	        i = r.index, i > a && o.push(JSON.stringify(e.slice(a, i)));var s = rn(r[1].trim());o.push("_s(" + s + ")"), a = i + r[0].length;
	      }return a < e.length && o.push(JSON.stringify(e.slice(a))), o.join("+");
	    }
	  }function _r(e, t) {
	    function n(e) {
	      e.pre && (s = !1), Cs(e.tag) && (c = !1);
	    }gs = t.warn || an, ws = t.getTagNamespace || Di, xs = t.mustUseProp || Di, Cs = t.isPreTag || Di, bs = sn(t.modules, "preTransformNode"), _s = sn(t.modules, "transformNode"), $s = sn(t.modules, "postTransformNode"), ys = t.delimiters;var r,
	        i,
	        o = [],
	        a = !1 !== t.preserveWhitespace,
	        s = !1,
	        c = !1;return gr(e, { warn: gs, expectHTML: t.expectHTML, isUnaryTag: t.isUnaryTag, canBeLeftOpenTag: t.canBeLeftOpenTag, shouldDecodeNewlines: t.shouldDecodeNewlines, start: function start(e, a, u) {
	        var l = i && i.ns || ws(e);qi && "svg" === l && (a = Rr(a));var f = { type: 1, tag: e, attrsList: a, attrsMap: Dr(a), parent: i, children: [] };l && (f.ns = l), Pr(f) && !ro() && (f.forbidden = !0);for (var p = 0; p < bs.length; p++) {
	          bs[p](f, t);
	        }if (s || (br(f), f.pre && (s = !0)), Cs(f.tag) && (c = !0), s) $r(f);else {
	          wr(f), kr(f), Tr(f), Cr(f), f.plain = !f.key && !a.length, xr(f), Er(f), jr(f);for (var d = 0; d < _s.length; d++) {
	            _s[d](f, t);
	          }Nr(f);
	        }if (r ? o.length || r.if && (f.elseif || f.else) && Sr(r, { exp: f.elseif, block: f }) : r = f, i && !f.forbidden) if (f.elseif || f.else) Ar(f, i);else if (f.slotScope) {
	          i.plain = !1;var v = f.slotTarget || '"default"';(i.scopedSlots || (i.scopedSlots = {}))[v] = f;
	        } else i.children.push(f), f.parent = i;u ? n(f) : (i = f, o.push(f));for (var h = 0; h < $s.length; h++) {
	          $s[h](f, t);
	        }
	      }, end: function end() {
	        var e = o[o.length - 1],
	            t = e.children[e.children.length - 1];t && 3 === t.type && " " === t.text && !c && e.children.pop(), o.length -= 1, i = o[o.length - 1], n(e);
	      }, chars: function chars(e) {
	        if (i && (!qi || "textarea" !== i.tag || i.attrsMap.placeholder !== e)) {
	          var t = i.children;if (e = c || e.trim() ? Mr(i) ? e : Zs(e) : a && t.length ? " " : "") {
	            var n;!s && " " !== e && (n = yr(e, ys)) ? t.push({ type: 2, expression: n, text: e }) : " " === e && t.length && " " === t[t.length - 1].text || t.push({ type: 3, text: e });
	          }
	        }
	      } }), r;
	  }function br(e) {
	    null != dn(e, "v-pre") && (e.pre = !0);
	  }function $r(e) {
	    var t = e.attrsList.length;if (t) for (var n = e.attrs = new Array(t), r = 0; r < t; r++) {
	      n[r] = { name: e.attrsList[r].name, value: JSON.stringify(e.attrsList[r].value) };
	    } else e.pre || (e.plain = !0);
	  }function Cr(e) {
	    var t = pn(e, "key");t && (e.key = t);
	  }function xr(e) {
	    var t = pn(e, "ref");t && (e.ref = t, e.refInFor = Lr(e));
	  }function wr(e) {
	    var t;if (t = dn(e, "v-for")) {
	      var n = t.match(zs);if (!n) return;e.for = n[2].trim();var r = n[1].trim(),
	          i = r.match(Js);i ? (e.alias = i[1].trim(), e.iterator1 = i[2].trim(), i[3] && (e.iterator2 = i[3].trim())) : e.alias = r;
	    }
	  }function kr(e) {
	    var t = dn(e, "v-if");if (t) e.if = t, Sr(e, { exp: t, block: e });else {
	      null != dn(e, "v-else") && (e.else = !0);var n = dn(e, "v-else-if");n && (e.elseif = n);
	    }
	  }function Ar(e, t) {
	    var n = Or(t.children);n && n.if && Sr(n, { exp: e.elseif, block: e });
	  }function Or(e) {
	    for (var t = e.length; t--;) {
	      if (1 === e[t].type) return e[t];e.pop();
	    }
	  }function Sr(e, t) {
	    e.ifConditions || (e.ifConditions = []), e.ifConditions.push(t);
	  }function Tr(e) {
	    null != dn(e, "v-once") && (e.once = !0);
	  }function Er(e) {
	    if ("slot" === e.tag) e.slotName = pn(e, "name");else {
	      var t = pn(e, "slot");t && (e.slotTarget = '""' === t ? '"default"' : t), "template" === e.tag && (e.slotScope = dn(e, "scope"));
	    }
	  }function jr(e) {
	    var t;(t = pn(e, "is")) && (e.component = t), null != dn(e, "inline-template") && (e.inlineTemplate = !0);
	  }function Nr(e) {
	    var t,
	        n,
	        r,
	        i,
	        o,
	        a,
	        s,
	        c = e.attrsList;for (t = 0, n = c.length; t < n; t++) {
	      if (r = i = c[t].name, o = c[t].value, Vs.test(r)) {
	        if (e.hasBindings = !0, a = Ir(r), a && (r = r.replace(Ws, "")), qs.test(r)) r = r.replace(qs, ""), o = rn(o), s = !1, a && (a.prop && (s = !0, "innerHtml" === (r = Ni(r)) && (r = "innerHTML")), a.camel && (r = Ni(r)), a.sync && fn(e, "update:" + Ni(r), hn(o, "$event"))), s || xs(e.tag, e.attrsMap.type, r) ? cn(e, r, o) : un(e, r, o);else if (Us.test(r)) r = r.replace(Us, ""), fn(e, r, o, a, !1, gs);else {
	          r = r.replace(Vs, "");var u = r.match(Ks),
	              l = u && u[1];l && (r = r.slice(0, -(l.length + 1))), ln(e, r, i, o, l, a);
	        }
	      } else un(e, r, JSON.stringify(o));
	    }
	  }function Lr(e) {
	    for (var t = e; t;) {
	      if (void 0 !== t.for) return !0;t = t.parent;
	    }return !1;
	  }function Ir(e) {
	    var t = e.match(Ws);if (t) {
	      var n = {};return t.forEach(function (e) {
	        n[e.slice(1)] = !0;
	      }), n;
	    }
	  }function Dr(e) {
	    for (var t = {}, n = 0, r = e.length; n < r; n++) {
	      t[e[n].name] = e[n].value;
	    }return t;
	  }function Mr(e) {
	    return "script" === e.tag || "style" === e.tag;
	  }function Pr(e) {
	    return "style" === e.tag || "script" === e.tag && (!e.attrsMap.type || "text/javascript" === e.attrsMap.type);
	  }function Rr(e) {
	    for (var t = [], n = 0; n < e.length; n++) {
	      var r = e[n];Gs.test(r.name) || (r.name = r.name.replace(Ys, ""), t.push(r));
	    }return t;
	  }function Fr(e, t) {
	    e && (ks = Qs(t.staticKeys || ""), As = t.isReservedTag || Di, Hr(e), Ur(e, !1));
	  }function Br(e) {
	    return l("type,tag,attrsList,attrsMap,plain,parent,children,attrs" + (e ? "," + e : ""));
	  }function Hr(e) {
	    if (e.static = zr(e), 1 === e.type) {
	      if (!As(e.tag) && "slot" !== e.tag && null == e.attrsMap["inline-template"]) return;for (var t = 0, n = e.children.length; t < n; t++) {
	        var r = e.children[t];Hr(r), r.static || (e.static = !1);
	      }
	    }
	  }function Ur(e, t) {
	    if (1 === e.type) {
	      if ((e.static || e.once) && (e.staticInFor = t), e.static && e.children.length && (1 !== e.children.length || 3 !== e.children[0].type)) return void (e.staticRoot = !0);if (e.staticRoot = !1, e.children) for (var n = 0, r = e.children.length; n < r; n++) {
	        Ur(e.children[n], t || !!e.for);
	      }e.ifConditions && Vr(e.ifConditions, t);
	    }
	  }function Vr(e, t) {
	    for (var n = 1, r = e.length; n < r; n++) {
	      Ur(e[n].block, t);
	    }
	  }function zr(e) {
	    return 2 !== e.type && (3 === e.type || !(!e.pre && (e.hasBindings || e.if || e.for || Ei(e.tag) || !As(e.tag) || Jr(e) || !Object.keys(e).every(ks))));
	  }function Jr(e) {
	    for (; e.parent;) {
	      if (e = e.parent, "template" !== e.tag) return !1;if (e.for) return !0;
	    }return !1;
	  }function Kr(e, t, n) {
	    var r = t ? "nativeOn:{" : "on:{";for (var i in e) {
	      var o = e[i];r += '"' + i + '":' + qr(i, o) + ",";
	    }return r.slice(0, -1) + "}";
	  }function qr(e, t) {
	    if (!t) return "function(){}";if (Array.isArray(t)) return "[" + t.map(function (t) {
	      return qr(e, t);
	    }).join(",") + "]";var n = ec.test(t.value),
	        r = Xs.test(t.value);if (t.modifiers) {
	      var i = "",
	          o = "",
	          a = [];for (var s in t.modifiers) {
	        rc[s] ? (o += rc[s], tc[s] && a.push(s)) : a.push(s);
	      }a.length && (i += Wr(a)), o && (i += o);return "function($event){" + i + (n ? t.value + "($event)" : r ? "(" + t.value + ")($event)" : t.value) + "}";
	    }return n || r ? t.value : "function($event){" + t.value + "}";
	  }function Wr(e) {
	    return "if(!('button' in $event)&&" + e.map(Zr).join("&&") + ")return null;";
	  }function Zr(e) {
	    var t = parseInt(e, 10);if (t) return "$event.keyCode!==" + t;var n = tc[e];return "_k($event.keyCode," + JSON.stringify(e) + (n ? "," + JSON.stringify(n) : "") + ")";
	  }function Gr(e, t) {
	    e.wrapData = function (n) {
	      return "_b(" + n + ",'" + e.tag + "'," + t.value + (t.modifiers && t.modifiers.prop ? ",true" : "") + ")";
	    };
	  }function Yr(e, t) {
	    var n = Ns,
	        r = Ns = [],
	        i = Ls;Ls = 0, Is = t, Os = t.warn || an, Ss = sn(t.modules, "transformCode"), Ts = sn(t.modules, "genData"), Es = t.directives || {}, js = t.isReservedTag || Di;var o = e ? Qr(e) : '_c("div")';return Ns = n, Ls = i, { render: "with(this){return " + o + "}", staticRenderFns: r };
	  }function Qr(e) {
	    if (e.staticRoot && !e.staticProcessed) return Xr(e);if (e.once && !e.onceProcessed) return ei(e);if (e.for && !e.forProcessed) return ri(e);if (e.if && !e.ifProcessed) return ti(e);if ("template" !== e.tag || e.slotTarget) {
	      if ("slot" === e.tag) return mi(e);var t;if (e.component) t = gi(e.component, e);else {
	        var n = e.plain ? void 0 : ii(e),
	            r = e.inlineTemplate ? null : li(e, !0);t = "_c('" + e.tag + "'" + (n ? "," + n : "") + (r ? "," + r : "") + ")";
	      }for (var i = 0; i < Ss.length; i++) {
	        t = Ss[i](e, t);
	      }return t;
	    }return li(e) || "void 0";
	  }function Xr(e) {
	    return e.staticProcessed = !0, Ns.push("with(this){return " + Qr(e) + "}"), "_m(" + (Ns.length - 1) + (e.staticInFor ? ",true" : "") + ")";
	  }function ei(e) {
	    if (e.onceProcessed = !0, e.if && !e.ifProcessed) return ti(e);if (e.staticInFor) {
	      for (var t = "", n = e.parent; n;) {
	        if (n.for) {
	          t = n.key;break;
	        }n = n.parent;
	      }return t ? "_o(" + Qr(e) + "," + Ls++ + (t ? "," + t : "") + ")" : Qr(e);
	    }return Xr(e);
	  }function ti(e) {
	    return e.ifProcessed = !0, ni(e.ifConditions.slice());
	  }function ni(e) {
	    function t(e) {
	      return e.once ? ei(e) : Qr(e);
	    }if (!e.length) return "_e()";var n = e.shift();return n.exp ? "(" + n.exp + ")?" + t(n.block) + ":" + ni(e) : "" + t(n.block);
	  }function ri(e) {
	    var t = e.for,
	        n = e.alias,
	        r = e.iterator1 ? "," + e.iterator1 : "",
	        i = e.iterator2 ? "," + e.iterator2 : "";return e.forProcessed = !0, "_l((" + t + "),function(" + n + r + i + "){return " + Qr(e) + "})";
	  }function ii(e) {
	    var t = "{",
	        n = oi(e);n && (t += n + ","), e.key && (t += "key:" + e.key + ","), e.ref && (t += "ref:" + e.ref + ","), e.refInFor && (t += "refInFor:true,"), e.pre && (t += "pre:true,"), e.component && (t += 'tag:"' + e.tag + '",');for (var r = 0; r < Ts.length; r++) {
	      t += Ts[r](e);
	    }if (e.attrs && (t += "attrs:{" + yi(e.attrs) + "},"), e.props && (t += "domProps:{" + yi(e.props) + "},"), e.events && (t += Kr(e.events, !1, Os) + ","), e.nativeEvents && (t += Kr(e.nativeEvents, !0, Os) + ","), e.slotTarget && (t += "slot:" + e.slotTarget + ","), e.scopedSlots && (t += si(e.scopedSlots) + ","), e.model && (t += "model:{value:" + e.model.value + ",callback:" + e.model.callback + ",expression:" + e.model.expression + "},"), e.inlineTemplate) {
	      var i = ai(e);i && (t += i + ",");
	    }return t = t.replace(/,$/, "") + "}", e.wrapData && (t = e.wrapData(t)), t;
	  }function oi(e) {
	    var t = e.directives;if (t) {
	      var n,
	          r,
	          i,
	          o,
	          a = "directives:[",
	          s = !1;for (n = 0, r = t.length; n < r; n++) {
	        i = t[n], o = !0;var c = Es[i.name] || ic[i.name];c && (o = !!c(e, i, Os)), o && (s = !0, a += '{name:"' + i.name + '",rawName:"' + i.rawName + '"' + (i.value ? ",value:(" + i.value + "),expression:" + JSON.stringify(i.value) : "") + (i.arg ? ',arg:"' + i.arg + '"' : "") + (i.modifiers ? ",modifiers:" + JSON.stringify(i.modifiers) : "") + "},");
	      }return s ? a.slice(0, -1) + "]" : void 0;
	    }
	  }function ai(e) {
	    var t = e.children[0];if (1 === t.type) {
	      var n = Yr(t, Is);return "inlineTemplate:{render:function(){" + n.render + "},staticRenderFns:[" + n.staticRenderFns.map(function (e) {
	        return "function(){" + e + "}";
	      }).join(",") + "]}";
	    }
	  }function si(e) {
	    return "scopedSlots:_u([" + Object.keys(e).map(function (t) {
	      return ci(t, e[t]);
	    }).join(",") + "])";
	  }function ci(e, t) {
	    return t.for && !t.forProcessed ? ui(e, t) : "{key:" + e + ",fn:function(" + String(t.attrsMap.scope) + "){return " + ("template" === t.tag ? li(t) || "void 0" : Qr(t)) + "}}";
	  }function ui(e, t) {
	    var n = t.for,
	        r = t.alias,
	        i = t.iterator1 ? "," + t.iterator1 : "",
	        o = t.iterator2 ? "," + t.iterator2 : "";return t.forProcessed = !0, "_l((" + n + "),function(" + r + i + o + "){return " + ci(e, t) + "})";
	  }function li(e, t) {
	    var n = e.children;if (n.length) {
	      var r = n[0];if (1 === n.length && r.for && "template" !== r.tag && "slot" !== r.tag) return Qr(r);var i = t ? fi(n) : 0;return "[" + n.map(vi).join(",") + "]" + (i ? "," + i : "");
	    }
	  }function fi(e) {
	    for (var t = 0, n = 0; n < e.length; n++) {
	      var r = e[n];if (1 === r.type) {
	        if (pi(r) || r.ifConditions && r.ifConditions.some(function (e) {
	          return pi(e.block);
	        })) {
	          t = 2;break;
	        }(di(r) || r.ifConditions && r.ifConditions.some(function (e) {
	          return di(e.block);
	        })) && (t = 1);
	      }
	    }return t;
	  }function pi(e) {
	    return void 0 !== e.for || "template" === e.tag || "slot" === e.tag;
	  }function di(e) {
	    return !js(e.tag);
	  }function vi(e) {
	    return 1 === e.type ? Qr(e) : hi(e);
	  }function hi(e) {
	    return "_v(" + (2 === e.type ? e.expression : _i(JSON.stringify(e.text))) + ")";
	  }function mi(e) {
	    var t = e.slotName || '"default"',
	        n = li(e),
	        r = "_t(" + t + (n ? "," + n : ""),
	        i = e.attrs && "{" + e.attrs.map(function (e) {
	      return Ni(e.name) + ":" + e.value;
	    }).join(",") + "}",
	        o = e.attrsMap["v-bind"];return !i && !o || n || (r += ",null"), i && (r += "," + i), o && (r += (i ? "" : ",null") + "," + o), r + ")";
	  }function gi(e, t) {
	    var n = t.inlineTemplate ? null : li(t, !0);return "_c(" + e + "," + ii(t) + (n ? "," + n : "") + ")";
	  }function yi(e) {
	    for (var t = "", n = 0; n < e.length; n++) {
	      var r = e[n];t += '"' + r.name + '":' + _i(r.value) + ",";
	    }return t.slice(0, -1);
	  }function _i(e) {
	    return e.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	  }function bi(e, t) {
	    var n = _r(e.trim(), t);Fr(n, t);var r = Yr(n, t);return { ast: n, render: r.render, staticRenderFns: r.staticRenderFns };
	  }function $i(e, t) {
	    try {
	      return new Function(e);
	    } catch (n) {
	      return t.push({ err: n, code: e }), y;
	    }
	  }function Ci(e, t) {
	    var n = (t.warn, dn(e, "class"));n && (e.staticClass = JSON.stringify(n));var r = pn(e, "class", !1);r && (e.classBinding = r);
	  }function xi(e) {
	    var t = "";return e.staticClass && (t += "staticClass:" + e.staticClass + ","), e.classBinding && (t += "class:" + e.classBinding + ","), t;
	  }function wi(e, t) {
	    var n = (t.warn, dn(e, "style"));n && (e.staticStyle = JSON.stringify(Oa(n)));var r = pn(e, "style", !1);r && (e.styleBinding = r);
	  }function ki(e) {
	    var t = "";return e.staticStyle && (t += "staticStyle:" + e.staticStyle + ","), e.styleBinding && (t += "style:(" + e.styleBinding + "),"), t;
	  }function Ai(e, t) {
	    t.value && cn(e, "textContent", "_s(" + t.value + ")");
	  }function Oi(e, t) {
	    t.value && cn(e, "innerHTML", "_s(" + t.value + ")");
	  }function Si(e) {
	    if (e.outerHTML) return e.outerHTML;var t = document.createElement("div");return t.appendChild(e.cloneNode(!0)), t.innerHTML;
	  }var Ti = Object.prototype.toString,
	      Ei = l("slot,component", !0),
	      ji = Object.prototype.hasOwnProperty,
	      Ni = d(function (e) {
	    return e.replace(/-(\w)/g, function (e, t) {
	      return t ? t.toUpperCase() : "";
	    });
	  }),
	      Li = d(function (e) {
	    return e.charAt(0).toUpperCase() + e.slice(1);
	  }),
	      Ii = d(function (e) {
	    return e.replace(/([^-])([A-Z])/g, "$1-$2").replace(/([^-])([A-Z])/g, "$1-$2").toLowerCase();
	  }),
	      Di = function Di() {
	    return !1;
	  },
	      Mi = function Mi(e) {
	    return e;
	  },
	      Pi = "data-server-rendered",
	      Ri = ["component", "directive", "filter"],
	      Fi = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated"],
	      Bi = { optionMergeStrategies: Object.create(null), silent: !1, productionTip: !1, devtools: !1, performance: !1, errorHandler: null, ignoredElements: [], keyCodes: Object.create(null), isReservedTag: Di, isReservedAttr: Di, isUnknownElement: Di, getTagNamespace: y, parsePlatformTagName: Mi, mustUseProp: Di, _lifecycleHooks: Fi },
	      Hi = Object.freeze({}),
	      Ui = /[^\w.$]/,
	      Vi = y,
	      zi = "__proto__" in {},
	      Ji = "undefined" != typeof window,
	      Ki = Ji && window.navigator.userAgent.toLowerCase(),
	      qi = Ki && /msie|trident/.test(Ki),
	      Wi = Ki && Ki.indexOf("msie 9.0") > 0,
	      Zi = Ki && Ki.indexOf("edge/") > 0,
	      Gi = Ki && Ki.indexOf("android") > 0,
	      Yi = Ki && /iphone|ipad|ipod|ios/.test(Ki),
	      Qi = Ki && /chrome\/\d+/.test(Ki) && !Zi,
	      Xi = !1;if (Ji) try {
	    var eo = {};Object.defineProperty(eo, "passive", { get: function get() {
	        Xi = !0;
	      } }), window.addEventListener("test-passive", null, eo);
	  } catch (e) {}var to,
	      no,
	      ro = function ro() {
	    return void 0 === to && (to = !Ji && "undefined" != typeof global && "server" === global.process.env.VUE_ENV), to;
	  },
	      io = Ji && window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
	      oo = "undefined" != typeof Symbol && A(Symbol) && "undefined" != typeof Reflect && A(Reflect.ownKeys),
	      ao = function () {
	    function e() {
	      r = !1;var e = n.slice(0);n.length = 0;for (var t = 0; t < e.length; t++) {
	        e[t]();
	      }
	    }var t,
	        n = [],
	        r = !1;if ("undefined" != typeof Promise && A(Promise)) {
	      var i = Promise.resolve(),
	          o = function o(e) {
	        console.error(e);
	      };t = function t() {
	        i.then(e).catch(o), Yi && setTimeout(y);
	      };
	    } else if ("undefined" == typeof MutationObserver || !A(MutationObserver) && "[object MutationObserverConstructor]" !== MutationObserver.toString()) t = function t() {
	      setTimeout(e, 0);
	    };else {
	      var a = 1,
	          s = new MutationObserver(e),
	          c = document.createTextNode(String(a));s.observe(c, { characterData: !0 }), t = function t() {
	        a = (a + 1) % 2, c.data = String(a);
	      };
	    }return function (e, i) {
	      var o;if (n.push(function () {
	        if (e) try {
	          e.call(i);
	        } catch (e) {
	          k(e, i, "nextTick");
	        } else o && o(i);
	      }), r || (r = !0, t()), !e && "undefined" != typeof Promise) return new Promise(function (e, t) {
	        o = e;
	      });
	    };
	  }();no = "undefined" != typeof Set && A(Set) ? Set : function () {
	    function e() {
	      this.set = Object.create(null);
	    }return e.prototype.has = function (e) {
	      return !0 === this.set[e];
	    }, e.prototype.add = function (e) {
	      this.set[e] = !0;
	    }, e.prototype.clear = function () {
	      this.set = Object.create(null);
	    }, e;
	  }();var so = 0,
	      co = function co() {
	    this.id = so++, this.subs = [];
	  };co.prototype.addSub = function (e) {
	    this.subs.push(e);
	  }, co.prototype.removeSub = function (e) {
	    f(this.subs, e);
	  }, co.prototype.depend = function () {
	    co.target && co.target.addDep(this);
	  }, co.prototype.notify = function () {
	    for (var e = this.subs.slice(), t = 0, n = e.length; t < n; t++) {
	      e[t].update();
	    }
	  }, co.target = null;var uo = [],
	      lo = Array.prototype,
	      fo = Object.create(lo);["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (e) {
	    var t = lo[e];x(fo, e, function () {
	      for (var n = arguments, r = arguments.length, i = new Array(r); r--;) {
	        i[r] = n[r];
	      }var o,
	          a = t.apply(this, i),
	          s = this.__ob__;switch (e) {case "push":case "unshift":
	          o = i;break;case "splice":
	          o = i.slice(2);}return o && s.observeArray(o), s.dep.notify(), a;
	    });
	  });var po = Object.getOwnPropertyNames(fo),
	      vo = { shouldConvert: !0, isSettingProps: !1 },
	      ho = function ho(e) {
	    if (this.value = e, this.dep = new co(), this.vmCount = 0, x(e, "__ob__", this), Array.isArray(e)) {
	      (zi ? T : E)(e, fo, po), this.observeArray(e);
	    } else this.walk(e);
	  };ho.prototype.walk = function (e) {
	    for (var t = Object.keys(e), n = 0; n < t.length; n++) {
	      N(e, t[n], e[t[n]]);
	    }
	  }, ho.prototype.observeArray = function (e) {
	    for (var t = 0, n = e.length; t < n; t++) {
	      j(e[t]);
	    }
	  };var mo = Bi.optionMergeStrategies;mo.data = function (e, t, n) {
	    return n ? e || t ? function () {
	      var r = "function" == typeof t ? t.call(n) : t,
	          i = "function" == typeof e ? e.call(n) : void 0;return r ? M(r, i) : i;
	    } : void 0 : t ? "function" != typeof t ? e : e ? function () {
	      return M(t.call(this), e.call(this));
	    } : t : e;
	  }, Fi.forEach(function (e) {
	    mo[e] = P;
	  }), Ri.forEach(function (e) {
	    mo[e + "s"] = R;
	  }), mo.watch = function (e, t) {
	    if (!t) return Object.create(e || null);if (!e) return t;var n = {};m(n, e);for (var r in t) {
	      var i = n[r],
	          o = t[r];i && !Array.isArray(i) && (i = [i]), n[r] = i ? i.concat(o) : [o];
	    }return n;
	  }, mo.props = mo.methods = mo.computed = function (e, t) {
	    if (!t) return Object.create(e || null);if (!e) return t;var n = Object.create(null);return m(n, e), m(n, t), n;
	  };var go = function go(e, t) {
	    return void 0 === t ? e : t;
	  },
	      yo = function yo(e, t, n, r, i, o, a) {
	    this.tag = e, this.data = t, this.children = n, this.text = r, this.elm = i, this.ns = void 0, this.context = o, this.functionalContext = void 0, this.key = t && t.key, this.componentOptions = a, this.componentInstance = void 0, this.parent = void 0, this.raw = !1, this.isStatic = !1, this.isRootInsert = !0, this.isComment = !1, this.isCloned = !1, this.isOnce = !1;
	  },
	      _o = { child: {} };_o.child.get = function () {
	    return this.componentInstance;
	  }, Object.defineProperties(yo.prototype, _o);var bo,
	      $o = function $o() {
	    var e = new yo();return e.text = "", e.isComment = !0, e;
	  },
	      Co = d(function (e) {
	    var t = "&" === e.charAt(0);e = t ? e.slice(1) : e;var n = "~" === e.charAt(0);e = n ? e.slice(1) : e;var r = "!" === e.charAt(0);return e = r ? e.slice(1) : e, { name: e, once: n, capture: r, passive: t };
	  }),
	      xo = null,
	      wo = [],
	      ko = [],
	      Ao = {},
	      Oo = !1,
	      So = !1,
	      To = 0,
	      Eo = 0,
	      jo = function jo(e, t, n, r) {
	    this.vm = e, e._watchers.push(this), r ? (this.deep = !!r.deep, this.user = !!r.user, this.lazy = !!r.lazy, this.sync = !!r.sync) : this.deep = this.user = this.lazy = this.sync = !1, this.cb = n, this.id = ++Eo, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new no(), this.newDepIds = new no(), this.expression = "", "function" == typeof t ? this.getter = t : (this.getter = w(t), this.getter || (this.getter = function () {})), this.value = this.lazy ? void 0 : this.get();
	  };jo.prototype.get = function () {
	    O(this);var e,
	        t = this.vm;if (this.user) try {
	      e = this.getter.call(t, t);
	    } catch (e) {
	      k(e, t, 'getter for watcher "' + this.expression + '"');
	    } else e = this.getter.call(t, t);return this.deep && Se(e), S(), this.cleanupDeps(), e;
	  }, jo.prototype.addDep = function (e) {
	    var t = e.id;this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this));
	  }, jo.prototype.cleanupDeps = function () {
	    for (var e = this, t = this.deps.length; t--;) {
	      var n = e.deps[t];e.newDepIds.has(n.id) || n.removeSub(e);
	    }var r = this.depIds;this.depIds = this.newDepIds, this.newDepIds = r, this.newDepIds.clear(), r = this.deps, this.deps = this.newDeps, this.newDeps = r, this.newDeps.length = 0;
	  }, jo.prototype.update = function () {
	    this.lazy ? this.dirty = !0 : this.sync ? this.run() : Oe(this);
	  }, jo.prototype.run = function () {
	    if (this.active) {
	      var e = this.get();if (e !== this.value || o(e) || this.deep) {
	        var t = this.value;if (this.value = e, this.user) try {
	          this.cb.call(this.vm, e, t);
	        } catch (e) {
	          k(e, this.vm, 'callback for watcher "' + this.expression + '"');
	        } else this.cb.call(this.vm, e, t);
	      }
	    }
	  }, jo.prototype.evaluate = function () {
	    this.value = this.get(), this.dirty = !1;
	  }, jo.prototype.depend = function () {
	    for (var e = this, t = this.deps.length; t--;) {
	      e.deps[t].depend();
	    }
	  }, jo.prototype.teardown = function () {
	    var e = this;if (this.active) {
	      this.vm._isBeingDestroyed || f(this.vm._watchers, this);for (var t = this.deps.length; t--;) {
	        e.deps[t].removeSub(e);
	      }this.active = !1;
	    }
	  };var No = new no(),
	      Lo = { enumerable: !0, configurable: !0, get: y, set: y },
	      Io = { lazy: !0 },
	      Do = { init: function init(e, t, n, r) {
	      if (!e.componentInstance || e.componentInstance._isDestroyed) {
	        (e.componentInstance = qe(e, xo, n, r)).$mount(t ? e.elm : void 0, t);
	      } else if (e.data.keepAlive) {
	        var i = e;Do.prepatch(i, i);
	      }
	    }, prepatch: function prepatch(e, t) {
	      var n = t.componentOptions;ge(t.componentInstance = e.componentInstance, n.propsData, n.listeners, t, n.children);
	    }, insert: function insert(e) {
	      var t = e.context,
	          n = e.componentInstance;n._isMounted || (n._isMounted = !0, $e(n, "mounted")), e.data.keepAlive && (t._isMounted ? ke(n) : _e(n, !0));
	    }, destroy: function destroy(e) {
	      var t = e.componentInstance;t._isDestroyed || (e.data.keepAlive ? be(t, !0) : t.$destroy());
	    } },
	      Mo = Object.keys(Do),
	      Po = 1,
	      Ro = 2,
	      Fo = 0;!function (e) {
	    e.prototype._init = function (e) {
	      var t = this;t._uid = Fo++, t._isVue = !0, e && e._isComponent ? lt(t, e) : t.$options = H(ft(t.constructor), e || {}, t), t._renderProxy = t, t._self = t, he(t), ce(t), ut(t), $e(t, "beforeCreate"), Ue(t), je(t), He(t), $e(t, "created"), t.$options.el && t.$mount(t.$options.el);
	    };
	  }(vt), function (e) {
	    var t = {};t.get = function () {
	      return this._data;
	    };var n = {};n.get = function () {
	      return this._props;
	    }, Object.defineProperty(e.prototype, "$data", t), Object.defineProperty(e.prototype, "$props", n), e.prototype.$set = L, e.prototype.$delete = I, e.prototype.$watch = function (e, t, n) {
	      var r = this;n = n || {}, n.user = !0;var i = new jo(r, e, t, n);return n.immediate && t.call(r, i.value), function () {
	        i.teardown();
	      };
	    };
	  }(vt), function (e) {
	    var t = /^hook:/;e.prototype.$on = function (e, n) {
	      var r = this,
	          i = this;if (Array.isArray(e)) for (var o = 0, a = e.length; o < a; o++) {
	        r.$on(e[o], n);
	      } else (i._events[e] || (i._events[e] = [])).push(n), t.test(e) && (i._hasHookEvent = !0);return i;
	    }, e.prototype.$once = function (e, t) {
	      function n() {
	        r.$off(e, n), t.apply(r, arguments);
	      }var r = this;return n.fn = t, r.$on(e, n), r;
	    }, e.prototype.$off = function (e, t) {
	      var n = this,
	          r = this;if (!arguments.length) return r._events = Object.create(null), r;if (Array.isArray(e)) {
	        for (var i = 0, o = e.length; i < o; i++) {
	          n.$off(e[i], t);
	        }return r;
	      }var a = r._events[e];if (!a) return r;if (1 === arguments.length) return r._events[e] = null, r;for (var s, c = a.length; c--;) {
	        if ((s = a[c]) === t || s.fn === t) {
	          a.splice(c, 1);break;
	        }
	      }return r;
	    }, e.prototype.$emit = function (e) {
	      var t = this,
	          n = t._events[e];if (n) {
	        n = n.length > 1 ? h(n) : n;for (var r = h(arguments, 1), i = 0, o = n.length; i < o; i++) {
	          n[i].apply(t, r);
	        }
	      }return t;
	    };
	  }(vt), function (e) {
	    e.prototype._update = function (e, t) {
	      var n = this;n._isMounted && $e(n, "beforeUpdate");var r = n.$el,
	          i = n._vnode,
	          o = xo;xo = n, n._vnode = e, n.$el = i ? n.__patch__(i, e) : n.__patch__(n.$el, e, t, !1, n.$options._parentElm, n.$options._refElm), xo = o, r && (r.__vue__ = null), n.$el && (n.$el.__vue__ = n), n.$vnode && n.$parent && n.$vnode === n.$parent._vnode && (n.$parent.$el = n.$el);
	    }, e.prototype.$forceUpdate = function () {
	      var e = this;e._watcher && e._watcher.update();
	    }, e.prototype.$destroy = function () {
	      var e = this;if (!e._isBeingDestroyed) {
	        $e(e, "beforeDestroy"), e._isBeingDestroyed = !0;var t = e.$parent;!t || t._isBeingDestroyed || e.$options.abstract || f(t.$children, e), e._watcher && e._watcher.teardown();for (var n = e._watchers.length; n--;) {
	          e._watchers[n].teardown();
	        }e._data.__ob__ && e._data.__ob__.vmCount--, e._isDestroyed = !0, e.__patch__(e._vnode, null), $e(e, "destroyed"), e.$off(), e.$el && (e.$el.__vue__ = null), e.$options._parentElm = e.$options._refElm = null;
	      }
	    };
	  }(vt), function (e) {
	    e.prototype.$nextTick = function (e) {
	      return ao(e, this);
	    }, e.prototype._render = function () {
	      var e = this,
	          t = e.$options,
	          n = t.render,
	          r = t.staticRenderFns,
	          i = t._parentVnode;if (e._isMounted) for (var o in e.$slots) {
	        e.$slots[o] = Z(e.$slots[o]);
	      }e.$scopedSlots = i && i.data.scopedSlots || Hi, r && !e._staticTrees && (e._staticTrees = []), e.$vnode = i;var a;try {
	        a = n.call(e._renderProxy, e.$createElement);
	      } catch (t) {
	        k(t, e, "render function"), a = e._vnode;
	      }return a instanceof yo || (a = $o()), a.parent = i, a;
	    }, e.prototype._o = at, e.prototype._n = u, e.prototype._s = c, e.prototype._l = et, e.prototype._t = tt, e.prototype._q = _, e.prototype._i = b, e.prototype._m = ot, e.prototype._f = nt, e.prototype._k = rt, e.prototype._b = it, e.prototype._v = q, e.prototype._e = $o, e.prototype._u = ve;
	  }(vt);var Bo = [String, RegExp],
	      Ho = { name: "keep-alive", abstract: !0, props: { include: Bo, exclude: Bo }, created: function created() {
	      this.cache = Object.create(null);
	    }, destroyed: function destroyed() {
	      var e = this;for (var t in e.cache) {
	        wt(e.cache[t]);
	      }
	    }, watch: { include: function include(e) {
	        xt(this.cache, this._vnode, function (t) {
	          return Ct(e, t);
	        });
	      }, exclude: function exclude(e) {
	        xt(this.cache, this._vnode, function (t) {
	          return !Ct(e, t);
	        });
	      } }, render: function render() {
	      var e = se(this.$slots.default),
	          t = e && e.componentOptions;if (t) {
	        var n = $t(t);if (n && (this.include && !Ct(this.include, n) || this.exclude && Ct(this.exclude, n))) return e;var r = null == e.key ? t.Ctor.cid + (t.tag ? "::" + t.tag : "") : e.key;this.cache[r] ? e.componentInstance = this.cache[r].componentInstance : this.cache[r] = e, e.data.keepAlive = !0;
	      }return e;
	    } },
	      Uo = { KeepAlive: Ho };!function (e) {
	    var t = {};t.get = function () {
	      return Bi;
	    }, Object.defineProperty(e, "config", t), e.util = { warn: Vi, extend: m, mergeOptions: H, defineReactive: N }, e.set = L, e.delete = I, e.nextTick = ao, e.options = Object.create(null), Ri.forEach(function (t) {
	      e.options[t + "s"] = Object.create(null);
	    }), e.options._base = e, m(e.options.components, Uo), ht(e), mt(e), gt(e), bt(e);
	  }(vt), Object.defineProperty(vt.prototype, "$isServer", { get: ro }), Object.defineProperty(vt.prototype, "$ssrContext", { get: function get() {
	      return this.$vnode.ssrContext;
	    } }), vt.version = "2.3.3";var Vo,
	      zo,
	      Jo,
	      Ko,
	      qo,
	      Wo,
	      Zo,
	      Go,
	      Yo,
	      Qo = l("style,class"),
	      Xo = l("input,textarea,option,select"),
	      ea = function ea(e, t, n) {
	    return "value" === n && Xo(e) && "button" !== t || "selected" === n && "option" === e || "checked" === n && "input" === e || "muted" === n && "video" === e;
	  },
	      ta = l("contenteditable,draggable,spellcheck"),
	      na = l("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),
	      ra = "http://www.w3.org/1999/xlink",
	      ia = function ia(e) {
	    return ":" === e.charAt(5) && "xlink" === e.slice(0, 5);
	  },
	      oa = function oa(e) {
	    return ia(e) ? e.slice(6, e.length) : "";
	  },
	      aa = function aa(e) {
	    return null == e || !1 === e;
	  },
	      sa = { svg: "http://www.w3.org/2000/svg", math: "http://www.w3.org/1998/Math/MathML" },
	      ca = l("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template"),
	      ua = l("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", !0),
	      la = function la(e) {
	    return "pre" === e;
	  },
	      fa = function fa(e) {
	    return ca(e) || ua(e);
	  },
	      pa = Object.create(null),
	      da = Object.freeze({ createElement: Lt, createElementNS: It, createTextNode: Dt, createComment: Mt, insertBefore: Pt, removeChild: Rt, appendChild: Ft, parentNode: Bt, nextSibling: Ht, tagName: Ut, setTextContent: Vt, setAttribute: zt }),
	      va = { create: function create(e, t) {
	      Jt(t);
	    }, update: function update(e, t) {
	      e.data.ref !== t.data.ref && (Jt(e, !0), Jt(t));
	    }, destroy: function destroy(e) {
	      Jt(e, !0);
	    } },
	      ha = new yo("", {}, []),
	      ma = ["create", "activate", "update", "remove", "destroy"],
	      ga = { create: Zt, update: Zt, destroy: function destroy(e) {
	      Zt(e, ha);
	    } },
	      ya = Object.create(null),
	      _a = [va, ga],
	      ba = { create: en, update: en },
	      $a = { create: nn, update: nn },
	      Ca = /[\w).+\-_$\]]/,
	      xa = "__r",
	      wa = "__c",
	      ka = { create: En, update: En },
	      Aa = { create: jn, update: jn },
	      Oa = d(function (e) {
	    var t = {};return e.split(/;(?![^(]*\))/g).forEach(function (e) {
	      if (e) {
	        var n = e.split(/:(.+)/);n.length > 1 && (t[n[0].trim()] = n[1].trim());
	      }
	    }), t;
	  }),
	      Sa = /^--/,
	      Ta = /\s*!important$/,
	      Ea = function Ea(e, t, n) {
	    if (Sa.test(t)) e.style.setProperty(t, n);else if (Ta.test(n)) e.style.setProperty(t, n.replace(Ta, ""), "important");else {
	      var r = Na(t);if (Array.isArray(n)) for (var i = 0, o = n.length; i < o; i++) {
	        e.style[r] = n[i];
	      } else e.style[r] = n;
	    }
	  },
	      ja = ["Webkit", "Moz", "ms"],
	      Na = d(function (e) {
	    if (Yo = Yo || document.createElement("div"), "filter" !== (e = Ni(e)) && e in Yo.style) return e;for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < ja.length; n++) {
	      var r = ja[n] + t;if (r in Yo.style) return r;
	    }
	  }),
	      La = { create: Rn, update: Rn },
	      Ia = d(function (e) {
	    return { enterClass: e + "-enter", enterToClass: e + "-enter-to", enterActiveClass: e + "-enter-active", leaveClass: e + "-leave", leaveToClass: e + "-leave-to", leaveActiveClass: e + "-leave-active" };
	  }),
	      Da = Ji && !Wi,
	      Ma = "transition",
	      Pa = "animation",
	      Ra = "transition",
	      Fa = "transitionend",
	      Ba = "animation",
	      Ha = "animationend";Da && (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (Ra = "WebkitTransition", Fa = "webkitTransitionEnd"), void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend && (Ba = "WebkitAnimation", Ha = "webkitAnimationEnd"));var Ua = Ji && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout,
	      Va = /\b(transform|all)(,|$)/,
	      za = Ji ? { create: Xn, activate: Xn, remove: function remove(e, t) {
	      !0 !== e.data.show ? Gn(e, t) : t();
	    } } : {},
	      Ja = [ba, $a, ka, Aa, La, za],
	      Ka = Ja.concat(_a),
	      qa = function (r) {
	    function o(e) {
	      return new yo(E.tagName(e).toLowerCase(), {}, [], void 0, e);
	    }function a(e, t) {
	      function n() {
	        0 == --n.listeners && s(e);
	      }return n.listeners = t, n;
	    }function s(e) {
	      var n = E.parentNode(e);t(n) && E.removeChild(n, e);
	    }function c(e, r, i, o, a) {
	      if (e.isRootInsert = !a, !u(e, r, i, o)) {
	        var s = e.data,
	            c = e.children,
	            l = e.tag;t(l) ? (e.elm = e.ns ? E.createElementNS(e.ns, l) : E.createElement(l, e), g(e), v(e, c, r), t(s) && m(e, r), d(i, e.elm, o)) : n(e.isComment) ? (e.elm = E.createComment(e.text), d(i, e.elm, o)) : (e.elm = E.createTextNode(e.text), d(i, e.elm, o));
	      }
	    }function u(e, r, i, o) {
	      var a = e.data;if (t(a)) {
	        var s = t(e.componentInstance) && a.keepAlive;if (t(a = a.hook) && t(a = a.init) && a(e, !1, i, o), t(e.componentInstance)) return f(e, r), n(s) && p(e, r, i, o), !0;
	      }
	    }function f(e, n) {
	      t(e.data.pendingInsert) && n.push.apply(n, e.data.pendingInsert), e.elm = e.componentInstance.$el, h(e) ? (m(e, n), g(e)) : (Jt(e), n.push(e));
	    }function p(e, n, r, i) {
	      for (var o, a = e; a.componentInstance;) {
	        if (a = a.componentInstance._vnode, t(o = a.data) && t(o = o.transition)) {
	          for (o = 0; o < S.activate.length; ++o) {
	            S.activate[o](ha, a);
	          }n.push(a);break;
	        }
	      }d(r, e.elm, i);
	    }function d(e, n, r) {
	      t(e) && (t(r) ? r.parentNode === e && E.insertBefore(e, n, r) : E.appendChild(e, n));
	    }function v(e, t, n) {
	      if (Array.isArray(t)) for (var r = 0; r < t.length; ++r) {
	        c(t[r], n, e.elm, null, !0);
	      } else i(e.text) && E.appendChild(e.elm, E.createTextNode(e.text));
	    }function h(e) {
	      for (; e.componentInstance;) {
	        e = e.componentInstance._vnode;
	      }return t(e.tag);
	    }function m(e, n) {
	      for (var r = 0; r < S.create.length; ++r) {
	        S.create[r](ha, e);
	      }A = e.data.hook, t(A) && (t(A.create) && A.create(ha, e), t(A.insert) && n.push(e));
	    }function g(e) {
	      for (var n, r = e; r;) {
	        t(n = r.context) && t(n = n.$options._scopeId) && E.setAttribute(e.elm, n, ""), r = r.parent;
	      }t(n = xo) && n !== e.context && t(n = n.$options._scopeId) && E.setAttribute(e.elm, n, "");
	    }function y(e, t, n, r, i, o) {
	      for (; r <= i; ++r) {
	        c(n[r], o, e, t);
	      }
	    }function _(e) {
	      var n,
	          r,
	          i = e.data;if (t(i)) for (t(n = i.hook) && t(n = n.destroy) && n(e), n = 0; n < S.destroy.length; ++n) {
	        S.destroy[n](e);
	      }if (t(n = e.children)) for (r = 0; r < e.children.length; ++r) {
	        _(e.children[r]);
	      }
	    }function b(e, n, r, i) {
	      for (; r <= i; ++r) {
	        var o = n[r];t(o) && (t(o.tag) ? ($(o), _(o)) : s(o.elm));
	      }
	    }function $(e, n) {
	      if (t(n) || t(e.data)) {
	        var r,
	            i = S.remove.length + 1;for (t(n) ? n.listeners += i : n = a(e.elm, i), t(r = e.componentInstance) && t(r = r._vnode) && t(r.data) && $(r, n), r = 0; r < S.remove.length; ++r) {
	          S.remove[r](e, n);
	        }t(r = e.data.hook) && t(r = r.remove) ? r(e, n) : n();
	      } else s(e.elm);
	    }function C(n, r, i, o, a) {
	      for (var s, u, l, f, p = 0, d = 0, v = r.length - 1, h = r[0], m = r[v], g = i.length - 1, _ = i[0], $ = i[g], C = !a; p <= v && d <= g;) {
	        e(h) ? h = r[++p] : e(m) ? m = r[--v] : Kt(h, _) ? (x(h, _, o), h = r[++p], _ = i[++d]) : Kt(m, $) ? (x(m, $, o), m = r[--v], $ = i[--g]) : Kt(h, $) ? (x(h, $, o), C && E.insertBefore(n, h.elm, E.nextSibling(m.elm)), h = r[++p], $ = i[--g]) : Kt(m, _) ? (x(m, _, o), C && E.insertBefore(n, m.elm, h.elm), m = r[--v], _ = i[++d]) : (e(s) && (s = Wt(r, p, v)), u = t(_.key) ? s[_.key] : null, e(u) ? (c(_, o, n, h.elm), _ = i[++d]) : (l = r[u], Kt(l, _) ? (x(l, _, o), r[u] = void 0, C && E.insertBefore(n, _.elm, h.elm), _ = i[++d]) : (c(_, o, n, h.elm), _ = i[++d])));
	      }p > v ? (f = e(i[g + 1]) ? null : i[g + 1].elm, y(n, f, i, d, g, o)) : d > g && b(n, r, p, v);
	    }function x(r, i, o, a) {
	      if (r !== i) {
	        if (n(i.isStatic) && n(r.isStatic) && i.key === r.key && (n(i.isCloned) || n(i.isOnce))) return i.elm = r.elm, void (i.componentInstance = r.componentInstance);var s,
	            c = i.data;t(c) && t(s = c.hook) && t(s = s.prepatch) && s(r, i);var u = i.elm = r.elm,
	            l = r.children,
	            f = i.children;if (t(c) && h(i)) {
	          for (s = 0; s < S.update.length; ++s) {
	            S.update[s](r, i);
	          }t(s = c.hook) && t(s = s.update) && s(r, i);
	        }e(i.text) ? t(l) && t(f) ? l !== f && C(u, l, f, o, a) : t(f) ? (t(r.text) && E.setTextContent(u, ""), y(u, null, f, 0, f.length - 1, o)) : t(l) ? b(u, l, 0, l.length - 1) : t(r.text) && E.setTextContent(u, "") : r.text !== i.text && E.setTextContent(u, i.text), t(c) && t(s = c.hook) && t(s = s.postpatch) && s(r, i);
	      }
	    }function w(e, r, i) {
	      if (n(i) && t(e.parent)) e.parent.data.pendingInsert = r;else for (var o = 0; o < r.length; ++o) {
	        r[o].data.hook.insert(r[o]);
	      }
	    }function k(e, n, r) {
	      n.elm = e;var i = n.tag,
	          o = n.data,
	          a = n.children;if (t(o) && (t(A = o.hook) && t(A = A.init) && A(n, !0), t(A = n.componentInstance))) return f(n, r), !0;if (t(i)) {
	        if (t(a)) if (e.hasChildNodes()) {
	          for (var s = !0, c = e.firstChild, u = 0; u < a.length; u++) {
	            if (!c || !k(c, a[u], r)) {
	              s = !1;break;
	            }c = c.nextSibling;
	          }if (!s || c) return !1;
	        } else v(n, a, r);if (t(o)) for (var l in o) {
	          if (!j(l)) {
	            m(n, r);break;
	          }
	        }
	      } else e.data !== n.text && (e.data = n.text);return !0;
	    }var A,
	        O,
	        S = {},
	        T = r.modules,
	        E = r.nodeOps;for (A = 0; A < ma.length; ++A) {
	      for (S[ma[A]] = [], O = 0; O < T.length; ++O) {
	        t(T[O][ma[A]]) && S[ma[A]].push(T[O][ma[A]]);
	      }
	    }var j = l("attrs,style,class,staticClass,staticStyle,key");return function (r, i, a, s, u, l) {
	      if (e(i)) return void (t(r) && _(r));var f = !1,
	          p = [];if (e(r)) f = !0, c(i, p, u, l);else {
	        var d = t(r.nodeType);if (!d && Kt(r, i)) x(r, i, p, s);else {
	          if (d) {
	            if (1 === r.nodeType && r.hasAttribute(Pi) && (r.removeAttribute(Pi), a = !0), n(a) && k(r, i, p)) return w(i, p, !0), r;r = o(r);
	          }var v = r.elm,
	              m = E.parentNode(v);if (c(i, p, v._leaveCb ? null : m, E.nextSibling(v)), t(i.parent)) {
	            for (var g = i.parent; g;) {
	              g.elm = i.elm, g = g.parent;
	            }if (h(i)) for (var y = 0; y < S.create.length; ++y) {
	              S.create[y](ha, i.parent);
	            }
	          }t(m) ? b(m, [r], 0, 0) : t(r.tag) && _(r);
	        }
	      }return w(i, p, f), i.elm;
	    };
	  }({ nodeOps: da, modules: Ka });Wi && document.addEventListener("selectionchange", function () {
	    var e = document.activeElement;e && e.vmodel && or(e, "input");
	  });var Wa = { inserted: function inserted(e, t, n) {
	      if ("select" === n.tag) {
	        var r = function r() {
	          er(e, t, n.context);
	        };r(), (qi || Zi) && setTimeout(r, 0);
	      } else "textarea" !== n.tag && "text" !== e.type && "password" !== e.type || (e._vModifiers = t.modifiers, t.modifiers.lazy || (e.addEventListener("change", ir), Gi || (e.addEventListener("compositionstart", rr), e.addEventListener("compositionend", ir)), Wi && (e.vmodel = !0)));
	    }, componentUpdated: function componentUpdated(e, t, n) {
	      if ("select" === n.tag) {
	        er(e, t, n.context);(e.multiple ? t.value.some(function (t) {
	          return tr(t, e.options);
	        }) : t.value !== t.oldValue && tr(t.value, e.options)) && or(e, "change");
	      }
	    } },
	      Za = { bind: function bind(e, t, n) {
	      var r = t.value;n = ar(n);var i = n.data && n.data.transition,
	          o = e.__vOriginalDisplay = "none" === e.style.display ? "" : e.style.display;r && i && !Wi ? (n.data.show = !0, Zn(n, function () {
	        e.style.display = o;
	      })) : e.style.display = r ? o : "none";
	    }, update: function update(e, t, n) {
	      var r = t.value;r !== t.oldValue && (n = ar(n), n.data && n.data.transition && !Wi ? (n.data.show = !0, r ? Zn(n, function () {
	        e.style.display = e.__vOriginalDisplay;
	      }) : Gn(n, function () {
	        e.style.display = "none";
	      })) : e.style.display = r ? e.__vOriginalDisplay : "none");
	    }, unbind: function unbind(e, t, n, r, i) {
	      i || (e.style.display = e.__vOriginalDisplay);
	    } },
	      Ga = { model: Wa, show: Za },
	      Ya = { name: String, appear: Boolean, css: Boolean, mode: String, type: String, enterClass: String, leaveClass: String, enterToClass: String, leaveToClass: String, enterActiveClass: String, leaveActiveClass: String, appearClass: String, appearActiveClass: String, appearToClass: String, duration: [Number, String, Object] },
	      Qa = { name: "transition", props: Ya, abstract: !0, render: function render(e) {
	      var t = this,
	          n = this.$slots.default;if (n && (n = n.filter(function (e) {
	        return e.tag;
	      }), n.length)) {
	        var r = this.mode,
	            o = n[0];if (lr(this.$vnode)) return o;var a = sr(o);if (!a) return o;if (this._leaving) return ur(e, o);var s = "__transition-" + this._uid + "-";a.key = null == a.key ? s + a.tag : i(a.key) ? 0 === String(a.key).indexOf(s) ? a.key : s + a.key : a.key;var c = (a.data || (a.data = {})).transition = cr(this),
	            u = this._vnode,
	            l = sr(u);if (a.data.directives && a.data.directives.some(function (e) {
	          return "show" === e.name;
	        }) && (a.data.show = !0), l && l.data && !fr(a, l)) {
	          var f = l && (l.data.transition = m({}, c));if ("out-in" === r) return this._leaving = !0, Q(f, "afterLeave", function () {
	            t._leaving = !1, t.$forceUpdate();
	          }), ur(e, o);if ("in-out" === r) {
	            var p,
	                d = function d() {
	              p();
	            };Q(c, "afterEnter", d), Q(c, "enterCancelled", d), Q(f, "delayLeave", function (e) {
	              p = e;
	            });
	          }
	        }return o;
	      }
	    } },
	      Xa = m({ tag: String, moveClass: String }, Ya);delete Xa.mode;var es = { props: Xa, render: function render(e) {
	      for (var t = this.tag || this.$vnode.data.tag || "span", n = Object.create(null), r = this.prevChildren = this.children, i = this.$slots.default || [], o = this.children = [], a = cr(this), s = 0; s < i.length; s++) {
	        var c = i[s];c.tag && null != c.key && 0 !== String(c.key).indexOf("__vlist") && (o.push(c), n[c.key] = c, (c.data || (c.data = {})).transition = a);
	      }if (r) {
	        for (var u = [], l = [], f = 0; f < r.length; f++) {
	          var p = r[f];p.data.transition = a, p.data.pos = p.elm.getBoundingClientRect(), n[p.key] ? u.push(p) : l.push(p);
	        }this.kept = e(t, null, u), this.removed = l;
	      }return e(t, null, o);
	    }, beforeUpdate: function beforeUpdate() {
	      this.__patch__(this._vnode, this.kept, !1, !0), this._vnode = this.kept;
	    }, updated: function updated() {
	      var e = this.prevChildren,
	          t = this.moveClass || (this.name || "v") + "-move";if (e.length && this.hasMove(e[0].elm, t)) {
	        e.forEach(pr), e.forEach(dr), e.forEach(vr);var n = document.body;n.offsetHeight;e.forEach(function (e) {
	          if (e.data.moved) {
	            var n = e.elm,
	                r = n.style;Vn(n, t), r.transform = r.WebkitTransform = r.transitionDuration = "", n.addEventListener(Fa, n._moveCb = function e(r) {
	              r && !/transform$/.test(r.propertyName) || (n.removeEventListener(Fa, e), n._moveCb = null, zn(n, t));
	            });
	          }
	        });
	      }
	    }, methods: { hasMove: function hasMove(e, t) {
	        if (!Da) return !1;if (null != this._hasMove) return this._hasMove;var n = e.cloneNode();e._transitionClasses && e._transitionClasses.forEach(function (e) {
	          Bn(n, e);
	        }), Fn(n, t), n.style.display = "none", this.$el.appendChild(n);var r = Kn(n);return this.$el.removeChild(n), this._hasMove = r.hasTransform;
	      } } },
	      ts = { Transition: Qa, TransitionGroup: es };vt.config.mustUseProp = ea, vt.config.isReservedTag = fa, vt.config.isReservedAttr = Qo, vt.config.getTagNamespace = Et, vt.config.isUnknownElement = jt, m(vt.options.directives, Ga), m(vt.options.components, ts), vt.prototype.__patch__ = Ji ? qa : y, vt.prototype.$mount = function (e, t) {
	    return e = e && Ji ? Nt(e) : void 0, me(this, e, t);
	  }, setTimeout(function () {
	    Bi.devtools && io && io.emit("init", vt);
	  }, 0);var ns,
	      rs = !!Ji && function (e, t) {
	    var n = document.createElement("div");return n.innerHTML = '<div a="' + e + '">', n.innerHTML.indexOf(t) > 0;
	  }("\n", "&#10;"),
	      is = l("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),
	      os = l("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),
	      as = l("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),
	      ss = [/"([^"]*)"+/.source, /'([^']*)'+/.source, /([^\s"'=<>`]+)/.source],
	      cs = new RegExp("^\\s*" + /([^\s"'<>\/=]+)/.source + "(?:\\s*(" + /(?:=)/.source + ")\\s*(?:" + ss.join("|") + "))?"),
	      us = "[a-zA-Z_][\\w\\-\\.]*",
	      ls = new RegExp("^<((?:" + us + "\\:)?" + us + ")"),
	      fs = /^\s*(\/?)>/,
	      ps = new RegExp("^<\\/((?:" + us + "\\:)?" + us + ")[^>]*>"),
	      ds = /^<!DOCTYPE [^>]+>/i,
	      vs = /^<!--/,
	      hs = /^<!\[/,
	      ms = !1;"x".replace(/x(.)?/g, function (e, t) {
	    ms = "" === t;
	  });var gs,
	      ys,
	      _s,
	      bs,
	      $s,
	      Cs,
	      xs,
	      ws,
	      ks,
	      As,
	      Os,
	      Ss,
	      Ts,
	      Es,
	      js,
	      Ns,
	      Ls,
	      Is,
	      Ds = l("script,style,textarea", !0),
	      Ms = {},
	      Ps = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&amp;": "&", "&#10;": "\n" },
	      Rs = /&(?:lt|gt|quot|amp);/g,
	      Fs = /&(?:lt|gt|quot|amp|#10);/g,
	      Bs = /\{\{((?:.|\n)+?)\}\}/g,
	      Hs = d(function (e) {
	    var t = e[0].replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"),
	        n = e[1].replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&");return new RegExp(t + "((?:.|\\n)+?)" + n, "g");
	  }),
	      Us = /^@|^v-on:/,
	      Vs = /^v-|^@|^:/,
	      zs = /(.*?)\s+(?:in|of)\s+(.*)/,
	      Js = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,
	      Ks = /:(.*)$/,
	      qs = /^:|^v-bind:/,
	      Ws = /\.[^.]+/g,
	      Zs = d(hr),
	      Gs = /^xmlns:NS\d+/,
	      Ys = /^NS\d+:/,
	      Qs = d(Br),
	      Xs = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,
	      ec = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,
	      tc = { esc: 27, tab: 9, enter: 13, space: 32, up: 38, left: 37, right: 39, down: 40, delete: [8, 46] },
	      nc = function nc(e) {
	    return "if(" + e + ")return null;";
	  },
	      rc = { stop: "$event.stopPropagation();", prevent: "$event.preventDefault();", self: nc("$event.target !== $event.currentTarget"), ctrl: nc("!$event.ctrlKey"), shift: nc("!$event.shiftKey"), alt: nc("!$event.altKey"), meta: nc("!$event.metaKey"), left: nc("'button' in $event && $event.button !== 0"), middle: nc("'button' in $event && $event.button !== 1"), right: nc("'button' in $event && $event.button !== 2") },
	      ic = { bind: Gr, cloak: y },
	      oc = { staticKeys: ["staticClass"], transformNode: Ci, genData: xi },
	      ac = { staticKeys: ["staticStyle"], transformNode: wi, genData: ki },
	      sc = [oc, ac],
	      cc = { model: Cn, text: Ai, html: Oi },
	      uc = { expectHTML: !0, modules: sc, directives: cc, isPreTag: la, isUnaryTag: is, mustUseProp: ea, canBeLeftOpenTag: os, isReservedTag: fa, getTagNamespace: Et, staticKeys: function (e) {
	      return e.reduce(function (e, t) {
	        return e.concat(t.staticKeys || []);
	      }, []).join(",");
	    }(sc) },
	      lc = function (e) {
	    function t(t, n) {
	      var r = Object.create(e),
	          i = [],
	          o = [];if (r.warn = function (e, t) {
	        (t ? o : i).push(e);
	      }, n) {
	        n.modules && (r.modules = (e.modules || []).concat(n.modules)), n.directives && (r.directives = m(Object.create(e.directives), n.directives));for (var a in n) {
	          "modules" !== a && "directives" !== a && (r[a] = n[a]);
	        }
	      }var s = bi(t, r);return s.errors = i, s.tips = o, s;
	    }function n(e, n, i) {
	      n = n || {};var o = n.delimiters ? String(n.delimiters) + e : e;if (r[o]) return r[o];var a = t(e, n),
	          s = {},
	          c = [];s.render = $i(a.render, c);var u = a.staticRenderFns.length;s.staticRenderFns = new Array(u);for (var l = 0; l < u; l++) {
	        s.staticRenderFns[l] = $i(a.staticRenderFns[l], c);
	      }return r[o] = s;
	    }var r = Object.create(null);return { compile: t, compileToFunctions: n };
	  }(uc),
	      fc = lc.compileToFunctions,
	      pc = d(function (e) {
	    var t = Nt(e);return t && t.innerHTML;
	  }),
	      dc = vt.prototype.$mount;return vt.prototype.$mount = function (e, t) {
	    if ((e = e && Nt(e)) === document.body || e === document.documentElement) return this;var n = this.$options;if (!n.render) {
	      var r = n.template;if (r) {
	        if ("string" == typeof r) "#" === r.charAt(0) && (r = pc(r));else {
	          if (!r.nodeType) return this;r = r.innerHTML;
	        }
	      } else e && (r = Si(e));if (r) {
	        var i = fc(r, { shouldDecodeNewlines: rs, delimiters: n.delimiters }, this),
	            o = i.render,
	            a = i.staticRenderFns;n.render = o, n.staticRenderFns = a;
	      }
	    }return dc.call(this, e, t);
	  }, vt.compile = fc, vt;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ })
/******/ ]);