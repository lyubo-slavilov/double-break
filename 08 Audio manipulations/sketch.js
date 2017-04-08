var sound;
var peaks;
var dur = 102.80115625; //this is a cheat. We premesured the actual duration ;(
var amp; //Amplitude analizer
var fft; //Fourier Transform analyzer
var fbins = 128;
function preload() {
    sound = loadSound('sound.mp3');
}


function keyPressed() {
    if (key == ' ') {
        if (sound.isPlaying()) {
            sound.stop();
        } else {
            sound.play();
        }
    }
}

function mousePressed() {
    var hpos = constrain(mouseX, 0, width);
    hpos = map(hpos, 0, width, 0, sound.duration());

    sound.jump(hpos);
}

function setup() {
	createCanvas(1200, 600);
	background(0);

    peaks = sound.getPeaks(width);
    amp = new p5.Amplitude();
    fft = new p5.FFT();
}

function draw() {

    //we use rect() to clear the bottom part of the scene
    fill(0);
    rect(0, height/2, width, height);


    //SPECTRAL stuff
    var fqs = fft.analyze(fbins);
    var barw = ceil(width / (fbins-32));


    colorMode(HSB);
    noStroke();
    var hpos = map(sound.currentTime(), 0, dur, 0, width);
    for (var i = 0; i < fqs.length; i++) {
        var fy = map(i, 0, fbins - 32, height/2, 0);

        var fa = map(fqs[i], 1, 255, 0, 0.2);
        var fh = ceil(height / (fbins-32));

        fill(100,255,80, fa);

        rect(hpos, fy,1,fh);

        var barh = map(fqs[i], 0, 255, 0, height / 2);
        var hue = map(barh, 0, height / 2, 0, 60)
        fill(hue, 255, 100);
        rect(i*barw, height - barh, barw, barh);
    }
    colorMode(RGB);

    //WAVE FORM stuff
    var a = amp.getLevel();
    a = map(a, 0, 0.5, 127, 255);

    for (var i = 0; i < peaks.length; i++) {
        if (i <= hpos) {
            stroke(200, 0, 0, a);
        } else {
            stroke(0, 255, 0, a);
        }
        var peak = peaks[i];
        var l = map(peak, -1, 1, -100, 100);

        line(i, 3*height /4 + l, i, 3*height / 4 - l)
    }

    //Playhead
    stroke(200,0,0);
    line(hpos, height/2, hpos, height);
}
