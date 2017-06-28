
class Peak extends THREE.EventDispatcher {

    // threshold: 0.0 ~ 1.0
    constructor(threshold) {
        super();
        this.threshold = threshold;
        this.flag = false;
    }

    bang(isOver) {
        if(this.flag != isOver) {
            if(isOver) {
                this.dispatchEvent({
                    type: "bang"
                });
            }
            this.flag = isOver;
        }
    }

}

export default class AudioAnalyser extends THREE.EventDispatcher {

    constructor(options) {
        super();

        this.ready = false;

        options = options || {};

        this.fftSize = options.fftSize || 512;
        this.fps = options.fps || 30;
        this.smooth = options.smooth || 0.75;
        this.volumeScale = options.volumeScale || 1.0;

        this.volume = 0;

        this.peaks = [];
        this.data = [];

        let AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        this.context = new AudioContext();
    }

    setup() {
        return new Promise((resolve, reject) => {
            if (this.context) {
                this.getUserMedia(
                    {
                        audio: true, 
                        video: false
                    }, 
                    (stream) => {
                        this.dispatchEvent({type: "complete"})

                        this.success(stream);
                        resolve();
                    }, 
                    (err) => {
                        this.error(err);
                        reject();
                    }
                );
            }
        });
    }

    peak(threshold) {
        let peak = new Peak(threshold);
        this.peaks.push(peak);
        return peak;
    }

    getUserMedia(setting, success, error) {
        let gum = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (!!gum) {
            // localhost or httpsだと動く　他は、chromeに引数が必要 --unsafely-treat-insecure-origin-as-secure="example.com"
            // https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins
            gum.call(navigator, setting, success, error);
        }
    }

    error(err) {
        console.log(err);
    }

    success(stream) {
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

    get frequencyBinCount() {
        return Math.floor(this.fftSize * 0.5);
    }

    analyse() {
        this.analyser.getByteFrequencyData(this.data);

        this.calculateVolume();

        let v = this.smoothedVolume;
        this.peaks.forEach((peak) => {
            let isOver = (v > peak.threshold);
            peak.bang(isOver);
        });

        this.dispatchEvent({type: "analyse"})
    }

    calculateVolume() {
        let vol = 0;
        let len = this.data.length;
        for(let i = 0; i < len; i++) {
            let input = this.data[i];
            let hinput = (input * 0.5);
            vol += hinput * hinput;
        }
        vol /= len;
        vol = Math.sqrt(vol);

        this.volume *= this.smooth;
        this.volume += (1.0 - this.smooth) * vol;
    }

    start() {
        this.interval = this.loop();
    }

    stop() {
        clearInterval(this.interval);
    }

    loop() {
        return setInterval(() => {
            this.analyse();
        }, 1000 / this.fps);
    }

    get smoothedVolume() {
        return this.volume / 255 * this.volumeScale;
    }

};

export {
    Peak
};

