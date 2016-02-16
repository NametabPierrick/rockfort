var canvas,
    context,
    audio,
    audioContext,
    analyserNode,
    audioStats,
    lowBeatDetector,
    time,
    scenes = [],
    settings = {
      fft : 1024,
      lowFreq : 20,
      midFreq : 150,
      highFreq : 511,
      debug : false
    },
    debug = {},
    spectrogram,
    spectrogramCanvas,
    spectrogramPos = 0,
    soundCloudClientID = "746146445791746357ff119cff0dbf04",
    modal,
    soundCloudInput,
    soundCloudButton,
    microphoneButton;

console.clear();

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

document.addEventListener("DOMContentLoaded", function() {
  
  //
  // Time Setup
  //
  time = {
    now : +(new Date()),
    dt : 0
  };
  
  //
  // UI
  //
  modal = document.querySelector(".modal");
  soundCloudInput = document.querySelector("#soundcloud-input");
  soundCloudButton = document.querySelector("#load-sound-button");
  microphoneButton = document.querySelector("#microphone-button");
  
  //
  // Graphics Setup
  //
  canvas = document.querySelector("#canvas");
  context = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  
  spectrogramCanvas = document.createElement("canvas");
  spectrogramCanvas.width = canvas.width;
  spectrogramCanvas.height = canvas.height;
  
  spectrogram = spectrogramCanvas.getContext('2d');
  spectrogram.fillStyle = "#000";
  spectrogram.fillRect(0, 0, canvas.width, canvas.height);
  
  //
  // Audio Setup
  //
  audio = new Audio();
  audio.crossOrigin = "anonymous";
  audioContext = new AudioContext();
  
  lowBeatDetector = new BeatDetector(128);
  
  //
  // Event Listeners
  //
  canvas.addEventListener("click", function() {
    
    if(lowBeatDetector) console.log( JSON.stringify(lowBeatDetector.beats) );
    
  });
  
  document.body.addEventListener("dragenter", function(e) {
    
    stopEvent(e);
    
    document.body.classList.add("is-dragging");
    
  });
  document.body.addEventListener("dragleave", function(e) {
    
    stopEvent(e);
    
    document.body.classList.remove("is-dragging");
    
  });
  document.body.addEventListener("dragover", stopEvent);  
  document.body.addEventListener("drop", function(e) {
    
    stopEvent(e);
    
    var url = window.URL.createObjectURL( e.dataTransfer.files[ 0 ] );
    
    audio.src = url;
    audio.play();
    
    modal.classList.add("is-hidden");
    
    document.body.classList.remove("is-dragging");
    
    setupAudioNodes();
    
  });
  
  soundCloudButton.addEventListener("click", function() {
    
    modal.classList.add("is-hidden");
    
    setupAudioNodes();
    loadSoundCloudUrl( soundCloudInput.value );
    
  });
  
  microphoneButton.addEventListener("click", function() {
    
    navigator.getUserMedia({audio: true}, function(mediaStream) {
      
      var source = audioContext.createMediaStreamSource(mediaStream);
      
      setupAudioNodes(source);
      
      modal.classList.add("is-hidden");
      
    }, function(error) {
      
      alert("Well fine then.");
      
    });
    
  });
  
  scenes.push( new Scene({ cx : canvas.width / 2, cy : canvas.height / 2 }) );
  
  loop();
  
});

function loop() {
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  updateTime( time );
  
  var freqs = (audioStats) ? audioStats.getStats() : null;
  
  context.globalCompositeOperation = "screen";
  if(freqs) drawSpectrogram( freqs, audioStats.getAverageVolume(freqs) );
  context.globalCompositeOperation = "source-over";
  
  for(var i = 0; i < scenes.length; i++) {
    
    if(freqs) {
      
      updateSceneWithAudio( scenes[i], time.dt );
      
    }else{
      
      updateSceneWithoutAudio( scenes[i], time.dt );
      
    }
    
    drawScene( context, scenes[i] );
    
  }
  
  if(freqs) drawFreqs( freqs );
  if(settings.debug) drawDebug();
  
  requestAnimationFrame( loop );
  
}

function updateTime(time) {
  
  var now = +(new Date());
  
  time.dt = now - time.now;
  time.now = now;
  
}

function stopEvent(e) {
  
  e.stopPropagation();
  e.preventDefault();
  
}

function get(url, callback) {
  
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    
    if(xhr.readyState == 4 && xhr.status == 200) {
      
      callback.call(null, xhr.responseText);
      
    }
    
  }
  
  xhr.open("GET", url, true);
  xhr.send(null);
  
}

function loadSoundCloudUrl(url) {
  
  get("http://api.soundcloud.com/resolve.json?url=" +  url + "&client_id=" + soundCloudClientID, function(response) {
    
    var trackData = JSON.parse( response );
    
    audio.src = trackData.stream_url + "?client_id=" + soundCloudClientID;
    audio.play();
    
  });
      
}

function setupAudioNodes(source) {
  
  var sourceNode;
  
  // Source Node
  if(source) {
    
    sourceNode = source;
    
  }else{
    
    sourceNode = audioContext.createMediaElementSource( audio );
    
  }
  
  // Analyser Node
  analyserNode = audioContext.createAnalyser();
  analyserNode.smoothingTimeConstant = 0.8;
  analyserNode.fftSize = settings.fft;
  
  // Gain Node
  gainNode = audioContext.createGain();
  gainNode.gain.value = 1;
  
  // Node Connections
  sourceNode.connect( analyserNode );
  analyserNode.connect( gainNode );
  gainNode.connect( audioContext.destination );
  
  // Audio Stats
  audioStats = new AudioStats( analyserNode );
  
}

function Scene(values) {
  
  values = values || {};
  
  this.rotation = values.rotation || 0;
  this.innerRadius = values.innerRadius || 100;
  this.circleRadius = values.circleRadius || 150;
  this.number = values.number || 100;
  this.cx = values.cx || 0;
  this.cy = values.cy || 0;
  this.color = values.color || "#fff";
  this.minNumber = values.number || 50;
  this.distortion = 0;
  
}

function updateSceneWithoutAudio(scene, dt) {
  
  dt /= 1000;
  
  scene.color = "#000";
  scene.rotation += dt;
  scene.innerRadius = Math.sin(scene.rotation * 6) * 5 + 120;
  scene.circleRadius = Math.sin(scene.rotation * 3.74928) * 5 + 85;
  scene.distortion = Math.sin(scene.rotation) + 2;
  
}

function updateSceneWithAudio(scene, dt) {
    
  var freqs = audioStats.getStats();
  var volume = audioStats.getAverageVolume( freqs );
  var superLowFreqs = audioStats.getRangeVolume( freqs, 0, 10 );
  var lowFreqs = audioStats.getRangeVolume( freqs, 0, settings.lowFreq );
  var midFreqs = audioStats.getRangeVolume( freqs, settings.lowFreq + 1, settings.midFreq );
  var highFreqs = audioStats.getRangeVolume( freqs, settings.midFreq + 1, 511 );

  var lowEnergy = audioStats.getRangeEnergy( freqs, 0, settings.lowFreq, true );
  var midEnergy = audioStats.getRangeEnergy( freqs, settings.lowFreq + 1, settings.midFreq, true );
  var highEnergy = audioStats.getRangeEnergy( freqs, settings.midFreq + 1, 511, true );

  var lowBeat = lowBeatDetector.tick( volume );
  
  if(lowBeat) {
    markSpectrogram("rgba(255, 255, 255, 0.2)");
  }

  var rotationSpeed = Math.max((volume - 30) / 160, 0) * 6;

  setDebug("Volume", volume);
  setDebug("Rotation", rotationSpeed);
  setDebug("Beats", lowBeatDetector.beats.length);
  setDebug("BPM", lowBeatDetector.bpm);
  setDebug("Bth", lowBeatDetector.threshold);
  setDebug("Dst", scene.distortion);
  setDebug("Low", lowEnergy);
  setDebug("Mid", midEnergy);
  setDebug("Hgh", highEnergy);

  scene.circleRadius = (highFreqs / 150) * 100 + 5;
  scene.innerRadius = (midFreqs / 200) * 175 + 100;
  scene.color = spectrogramColor( 0.7, volume / 255 );
  scene.number = Math.floor( scene.minNumber + (superLowFreqs / 255) * 100 );
  scene.distortion = (lowEnergy + midEnergy + highEnergy);
  scene.rotation += rotationSpeed;
  
}

function drawScene(ctx, scene) {
  
  // Draw Circles  
  if(scene.number == 0) return;
  
  var angle = scene.rotation;
  var angleOffset = 360 / scene.number;
  var DEGTORAD = Math.PI / 180;
  var _cx, _cy, distortionOffset;
  
  for(var i = 0; i < scene.number; i++) {
    
    distortionOffset = Math.cos( (i / scene.number) * Math.PI * 2 * Math.floor(scene.distortion * 4) + (time.now / 1000)) * scene.distortion * 1.5;
    
    _cx = scene.cx + Math.cos( angle * DEGTORAD ) * (scene.innerRadius + distortionOffset);
    _cy = scene.cy + Math.sin( angle * DEGTORAD ) * (scene.innerRadius + distortionOffset);
    
    ctx.strokeStyle = scene.color;
    ctx.beginPath();
    ctx.arc(_cx, _cy, scene.circleRadius, 0, Math.PI * 2, true);
    ctx.lineStyle = "#000";
    ctx.stroke();
    
    angle += angleOffset;
    
  }
  
}

function setDebug(key, value) {
  
  debug[key] = value;
  
}

function drawDebug() {
  
  context.fillStyle = "#fff";
  context.font = "16px sans-serif";
  
  var index = 1;
  
  for(var key in debug) {
    
    var value = debug[ key ];
    
    context.fillText(key + ": " + value, 10, index * 30);
    
    index++;
    
  }
  
}

function drawFreqs(freqs) {
  
  var color;
  var colors = {
    low: "#0c0",
    mid: "#f90",
    high: "#f00"
  };
  
  var barWidth = canvas.width * 2 / settings.fft;
  
  for(var i = 0; i < freqs.length; i++) {
    
    if(i < settings.lowFreq) {
      color = colors["low"];
    }else if(i < settings.midFreq) {
      color = colors["mid"];
    }else{
      color = colors["high"];
    }
    
    var barHeight = freqs[i] / 4;
    
    context.fillStyle = color;
    context.fillRect(i * barWidth, canvas.height - barHeight - 3, barWidth, barHeight + 3);
    
  }
  
}

function gradientValue(grad, pos) {
  
  var s, e;
  
  for(var i = 1; i < grad.length; i++) {
    
    if( pos <= grad[i].value ) {
      
      s = grad[i-1];
      e = grad[i];
      
      break;
      
    }
    
  }
  
  var p = 1 - ( (pos - s.value) / (e.value - s.value) );
  
  return (s.output * p) + (e.output * (1 - p));
  
}

function spectrogramColor(pos, volume) {
  
  pos = Math.min( Math.max(pos, 0), 1 );
  
  var hue = [
    { value : 0, output : 300 },
    { value : 0.25, output : 200 },
    { value : 1, output : 100 }
  ];
  
  var lum = [
    { value : 0, output : 0 },
    { value : 0.8, output : 19.5 },
    { value : 1, output : 50 }
  ];
  
  var h = gradientValue(hue, volume);
  var s = 100;
  var l = gradientValue(lum, pos);
  
  return "hsl(" + Math.floor(h) + "," + s + "%," + l + "%)";
  
}

function drawSpectrogram(freqs, volume) {
  
  var height = canvas.height / freqs.length;
  
  // Draw
  for(var i = 0; i < freqs.length; i++) {
    
    spectrogram.fillStyle = spectrogramColor( freqs[i] / 255, volume / 255 );
    spectrogram.fillRect(spectrogramPos, i * height, 1, height);
    
  }
  
  // Increment Pos
  spectrogramPos = (spectrogramPos + 1) % canvas.width;
  
  context.drawImage(spectrogramCanvas, 0, 0);
  
}

function markSpectrogram(color) {
  spectrogram.fillStyle = color;
  spectrogram.fillRect(spectrogramPos - 1, 0, 1, canvas.height);
}

function AudioStats(analyser) {
  
  this.analyser = analyser;
  
}

AudioStats.prototype.getStats = function() {
  
  var freqs = new Uint8Array( this.analyser.frequencyBinCount );
  this.analyser.getByteFrequencyData( freqs );
  
  return freqs;
  
}

AudioStats.prototype.getAverageVolume = function(freqs) {
  
  var sum = 0;
  
  for(var i = 0; i < freqs.length; i++) sum += freqs[i];
  
  return sum / freqs.length;
  
}

AudioStats.prototype.getRangeVolume = function(freqs, low, high) {
  
  var volume = 0;
  
  for(var i = low; i <= high; i++) {
    
    volume += freqs[i];
    
  }
  
  return volume / (high - low);
  
}

AudioStats.prototype.getRangeEnergy = function(freqs, low, high, norm) {
  
  var rangeSum = 0,
      sum = 0,
      energy = 0;
  
  for(var i = 0; i < freqs.length; i++) {
    
    if(i >= low && i <= high) rangeSum += freqs[i];
    
    sum += freqs[ i ];
    
  }
  
  energy = (sum > 0) ? (rangeSum / sum) : 0;
  
  if(norm) {
    
    energy /= (high - low) / freqs.length;
    
  }
  
  return energy;
  
}

AudioStats.prototype.getHighestFreq = function( freqs ) {
  
  var maxFreq = 0;
  var maxValue = 0;
  
  for(var i = 0; i < freqs.length; i++) {
    
    if(freqs[i] > maxValue) {
      
      maxFreq = i;
      maxValue = freqs[i];
      
    }
    
  }
  
  return {
    freq : maxFreq,
    value : maxValue
  };
  
}

function BeatDetector() {
  
  this.threshold = 0;
  this.decayRate = 1.01;
  this.lastBeatTime = time.now;
  this.beats = [];
  this.bpm = 0;
  this.sensitivity = 0.1;
  this.minSensitivity = 0.01;
  this.threshold = 0;
  this.decay = 0.9;
  
}

BeatDetector.prototype.calculateBPM = function() {
  
  if(this.beats.length == 0) return 0;
  
  if(this.beats.length == 1) return this.beats[0];
  
  var diffs = [];

  for(var i = 1; i < this.beats.length; i++) {

    diffs.push( this.beats[i] - this.beats[i - 1] );

  }
  
  var avg = diffs.reduce(function(sum, val) { return sum + val; }, 0) / diffs.length;
  
  return 60 / (avg / 1000);
  
}

BeatDetector.prototype.beat = function() {
  
  this.beats.push( time.now );
    
  this.decay = 0;
    
  this.lastBeatTime = time.now;
  
  this.bpm = this.calculateBPM();
  
}

BeatDetector.prototype.tick = function(value) {
  
  var beatDetected = false;
  
  var beatFactor = Math.abs(this.lastValue - value) / 255;
  
  if(beatFactor > this.threshold) {
    
    this.beat();
    
    this.threshold = beatFactor;
    
    beatDetected = true;
    
  }
  
  this.applyDecay();
  
  this.lastValue = value;
  
  return beatDetected;
  
}

BeatDetector.prototype.applyDecay = function() {
  
  var dt = time.now - this.lastBeatTime;
  
  this.threshold = this.sensitivity * (1 - (dt / 1000));
  
  this.threshold = Math.max( this.threshold, this.minSensitivity );
  
}

function normalizedSin(value) {
  
  return (Math.sin(value) + 1) / 2;
  
}

function normalizedCos(value) {
  
  return (Math.cos(value) + 1) / 2;
  
}