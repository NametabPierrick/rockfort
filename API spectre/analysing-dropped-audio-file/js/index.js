var output = document.getElementById('output'),
    can = document.getElementById('c'),
    ctx = can.getContext('2d'),
    
    player = document.createElement('audio'),
    audio = document.createElement('audio'),
    context = new AudioContext(),
    analyser = context.createAnalyser(),
    animationFrame = null;

    document.body.appendChild(player);
    source = context.createMediaElementSource(audio);
    source.connect(analyser);

function stopEvent (event) {
  event.preventDefault();
  event.stopPropagation();
}

function windowResize () {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
}
window.onresize = windowResize;
windowResize();

/**
 * Reduce un array al tamaño deseado haciendo la media
 * de las partes que quedan.
 *
 * Ejemplo para tamaño 2:
 * [1, 1, 2, 2] => [1, 2]
 * [2, 4, 5, 5] => [3, 5]
 */
function reduce (array, size) {
  if (size >= array.length) { return array; }
  var newArray = [],
      step = parseInt(array.length / size);
  
  for (var i = 0; i < array.length; i += step) {
    var sum = 0;
    for (var j = 0; j < step && (i + j) < array.length; j++) {
      sum += array[i + j];
    }
    newArray.push(parseInt(sum / step));
  }
  
  return newArray;
}

function renderFrame (audio, analyser) {
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(frequencyData);
      frequencyData = reduce(frequencyData, can.width / 10);
      //output.innerHTML = Array.prototype.join.apply(frequencyData, [' ']);
  
  var colWidth = can.width / frequencyData.length,
      colHeight = can.height / 255;
      ctx.clearRect(0, 0, can.width, can.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  
  ctx.beginPath();
  ctx.moveTo(0, can.height);
  for (var i = 1; i < frequencyData.length; i++) {
    ctx.lineTo(i * colWidth, can.height - 10 - frequencyData[i] * colHeight);
  }
  ctx.lineTo(can.width, can.height);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  animationFrame = requestAnimationFrame(function () {
    renderFrame(audio, analyser);
  });
}

function playAudio (url, name) {
  audio.autoplay = player.autoplay = true;
  audio.src = player.src = url;
  audio.play();
  player.play();
  $('h1').html(name);
  cancelAnimationFrame(animationFrame);
  renderFrame(audio, analyser);
}

function dropAudio (event) {
  stopEvent(event);
  var file = event.originalEvent.dataTransfer.files[0],
      url = URL.createObjectURL(file);
      playAudio(url, file.name);
}

$(window)
  .on('dragover', stopEvent)
  .on('dragenter', stopEvent)
  .on('drop', dropAudio);