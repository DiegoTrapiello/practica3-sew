class NavigatorChecker {
    constructor() {}
    checkNavigator() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            document.write("<p>API File es soportado por este navegador. </p>");
        } else {
            document.write("<p>API File no es soportado por este navegador.</p>")

        }
    }
}

class MyMp3Reader {
    constructor() {
        // for legacy browsers
        this.AudioContext = window.AudioContext || window.webkitAudioContext;

        this.audioContext = new AudioContext();
        this.track = null;
        this.gainNode = this.audioContext.createGain();
        this.panner = null;
    }

    leerArchivoAudio(files) {
        var file = files[0];
        var tipoMp3 = ".mp3";
        if (file.name.match(tipoMp3)) {
            this.activarBoton(file);
            modifier = new SoundModifier();
            modifier.activarControlVolumen();
            modifier.activarControlStereo();


            drawer = new CanvasDrawer();
            drawer.canvas.style.display = "block";

            //Crear los efectos
            modifier.conectar();
            modifier.asignarListenersSelector();

            //Se escoge este por defecto
            drawer.prepararOndas();
            this.activarBotonesCanvas();

            modifier.cambiarEfecto();
            document.getElementById("input").disabled = true;
            document.getElementById("hide").style.display = "block";

        } else {
            $(document).ready(function () {
                $("#readError").text("No se puede mostrar el contenido de este archivo.");
                $("#textArea").text("");
            });

        }
    };



    activarBoton(file) {

        var sound = document.createElement('audio');
        sound.id = 'audio-player';
        sound.controls = 'controls';
        sound.src = URL.createObjectURL(file);
        sound.style.display = "none";
        document.getElementById('song').appendChild(sound);

        this.track = this.audioContext.createMediaElementSource(sound);
        const playButton = document.querySelector('button');
        playButton.addEventListener('click', function () {

            // check if context is in suspended state (autoplay policy)
            if (reader.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }

            // play or pause track depending on state
            if (this.dataset.playing === 'false') {
                sound.play();
                this.dataset.playing = 'true';
                if (drawer != null) {
                    if (drawer.dibujarBarrasSelected)
                        drawer.dibujarBarras();
                    else if (drawer.dibujarOndasSelected)
                        drawer.dibujarOndas();
                }
            } else if (this.dataset.playing === 'true') {
                sound.pause();
                this.dataset.playing = 'false';
            }

        }, false);
        playButton.disabled = false;
        playButton.style.display = "inline-block";

        sound.addEventListener('ended', function () {
            playButton.dataset.playing = 'false';
        }, false);
    }

    activarBotonesCanvas() {
        const ondasButton = document.getElementById('ondas');
        ondas.addEventListener('click', function () {
            drawer.prepararOndas();
        }, false);
        ondasButton.disabled = false;
        ondasButton.style.display = "inline-block";


        const barrasButton = document.getElementById('barras');
        barras.addEventListener('click', function () {
            drawer.prepararBarras();
        }, false);
        barrasButton.disabled = false;
        barrasButton.style.display = "inline-block";

    }
}

class CanvasDrawer {

    constructor() {
        this.dibujarOndasSelected = true;
        this.dibujarBarrasSelected = false;
        this.audioCtx = reader.audioContext;
        this.analyser = this.audioCtx.createAnalyser();
        this.track = reader.track;
        this.canvas = document.getElementById('canvas');
        this.canvasCtx = canvas.getContext('2d');
        this.analyser.fftSize;
        this.bufferLength;
        this.dataArray;
        this.drawVisual;
    }

    prepararOndas() {
        drawer.dibujarOndasSelected = true;
        drawer.dibujarBarrasSelected = false;
        drawer.analyser.fftSize = 2048;
        drawer.bufferLength = drawer.analyser.frequencyBinCount;
        drawer.dataArray = new Uint8Array(drawer.bufferLength);
        drawer.canvasCtx.clearRect(0, 0, drawer.canvas.width, drawer.canvas.height);
        drawer.dibujarOndas();
    }

    dibujarOndas() {
        drawer.drawVisual = requestAnimationFrame(drawer.dibujarOndas)
        drawer.analyser.getByteTimeDomainData(drawer.dataArray);
        drawer.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        drawer.canvasCtx.fillRect(0, 0, drawer.canvas.width, drawer.canvas.height);
        drawer.canvasCtx.lineWidth = 2;
        drawer.canvasCtx.strokeStyle = 'rgb(255,255,255)';
        drawer.canvasCtx.beginPath();

        var sliceWidth = drawer.canvas.width * 1.0 / drawer.bufferLength;
        var x = 0;
        for (var i = 0; i < drawer.bufferLength; i++) {

            var v = drawer.dataArray[i] / 128.0;
            var y = v * drawer.canvas.height / 2;

            if (i === 0) {
                drawer.canvasCtx.moveTo(x, y);
            } else {
                drawer.canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }
        drawer.canvasCtx.lineTo(drawer.canvas.width, drawer.canvas.height / 2);
        drawer.canvasCtx.stroke();
    }

    prepararBarras() {
        drawer.dibujarOndasSelected = false;
        drawer.dibujarBarrasSelected = true;
        drawer.analyser.fftSize = 256;
        drawer.bufferLength = drawer.analyser.frequencyBinCount;
        drawer.dataArray = new Uint8Array(drawer.bufferLength);

        drawer.canvasCtx.clearRect(0, 0, drawer.canvas.width, drawer.canvas.height);
        drawer.dibujarBarras();
    }

    dibujarBarras() {
        drawer.drawVisual = requestAnimationFrame(drawer.dibujarBarras);

        drawer.analyser.getByteFrequencyData(drawer.dataArray);

        drawer.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        drawer.canvasCtx.fillRect(0, 0, drawer.canvas.width, drawer.canvas.height);

        var barWidth = (drawer.canvas.width / drawer.bufferLength) * 1.5;
        var barHeight;
        var x = 0;

        for (var i = 0; i < drawer.bufferLength; i++) {
            barHeight = drawer.dataArray[i];

            drawer.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            drawer.canvasCtx.fillRect(x, drawer.canvas.height - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
        }
    };

}

class SoundModifier {

    constructor() {
        this.distortion = reader.audioContext.createWaveShaper();
        this.bassBoost = reader.audioContext.createBiquadFilter();
        this.reverb = reader.audioContext.createConvolver();
        this.effectSelect = document.getElementById("effect");
        this.crearReverberacion();
    }

    crearReverberacion() {
        var peticion = new XMLHttpRequest();
        //Obtengo el sonido para crear la reverberación de esta página y no de manera local debido las póliticas de CORS de los navegadores actuales
        //https://stackoverflow.com/questions/2376745/does-html5-allow-you-to-interact-with-local-client-files-from-within-a-browser
        //Tampoco queria usar el API File porque no le encuentro el sentido que el usuario tenga que, de manera manual, subir el fichero de audio con el
        //que crear la reverberación
        peticion.open("GET", "http://reverbjs.org/Library/AbernyteGrainSilo.m4a", true);
        peticion.responseType = "arraybuffer";
        peticion.onload = function () {
            reader.audioContext.decodeAudioData(peticion.response,
                function (buffer) {
                    modifier.reverb.buffer = buffer;
                });
        }
        peticion.send();

    }


    //Método que genera una curva de distorsion, sacada de http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
    makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;
        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    };

    activarControlStereo() {
        const pannerOptions = {
            pan: 0
        };
        reader.panner = new StereoPannerNode(reader.audioContext, pannerOptions);


        var range = document.createElement('input');
        range.type = "range";
        range.id = "panner";
        range.min = "-1";
        range.max = "1";
        range.value = "0";
        range.step = "0.01";
        document.getElementById('range-panner').appendChild(range);

        range.addEventListener('input', function () {
            reader.panner.pan.value = this.value;
        }, false);


    }


    activarControlVolumen() {
        var range = document.createElement('input');
        range.type = "range";
        range.id = "volume";
        range.min = "0";
        range.max = "2";
        range.value = "1";
        range.step = "0.01";
        document.getElementById('range').appendChild(range);
        range.addEventListener('input', function () {
            reader.gainNode.gain.value = this.value;
            console.log(reader.gainNode.gain.value);
        }, false);


    }


    asignarListenersSelector() {
        this.effectSelect.onchange = function () {
            modifier.cambiarEfecto();
        }
    }

    cambiarEfecto() {
        this.distortion.oversample = '4x';
        this.bassBoost.gain.setTargetAtTime(0, reader.audioContext.currentTime, 0);
        var efectoSeleccionado = this.effectSelect.value;
        console.log(efectoSeleccionado);
        reader.gainNode.disconnect();
        if (efectoSeleccionado == "reverb") {
            console.log("Reverberacion activada");
            reader.gainNode.connect(this.reverb);
        } else if (efectoSeleccionado == "distortion") {
            console.log("Distorsion activada");
            reader.gainNode.connect(this.distortion);
            this.distortion.curve = this.makeDistortionCurve(200);
        } else if (efectoSeleccionado == "bassboost") {
            console.log("Bass Boost Activado");
            reader.gainNode.connect(this.bassBoost);
            this.bassBoost.type = "lowshelf";
            this.bassBoost.frequency.setTargetAtTime(1000, reader.audioContext.currentTime, 0)
            this.bassBoost.gain.setTargetAtTime(25, reader.audioContext.currentTime, 0)
        } else if (efectoSeleccionado == "off") {
            reader.gainNode.connect(reader.panner);
            console.log("Efectos Desactivados");
        }

    }

    conectar() {
        reader.track.connect(reader.gainNode);
        reader.gainNode.connect(reader.panner);
        modifier.distortion.connect(reader.panner);
        modifier.bassBoost.connect(reader.panner);
        modifier.reverb.connect(reader.panner);
        reader.panner.connect(drawer.analyser);
        drawer.analyser.connect(reader.audioContext.destination);
    }



}




var checker = new NavigatorChecker();
checker.checkNavigator();
var reader = new MyMp3Reader();
var drawer = null;
var modifier = null;