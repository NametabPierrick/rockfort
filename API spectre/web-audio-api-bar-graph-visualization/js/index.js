$('.play-button').click(function() {
  if (!$('body').hasClass('loading')) {
    $('body').addClass('loading');
    $(this).addClass('hidden');
    demo();
  }
});

function demo() {
  console.log('demo started');
  var actx = new (window.AudioContext || window.webkitAudioContext)();
  var source = actx.createBufferSource();
  var analyser = actx.createAnalyser();
  var playing = false;
  
  analyser.fftSize = 32;
  actx.smoothingConstant = 1;
  source.connect(analyser);
  analyser.connect(actx.destination);
  
  var req = new XMLHttpRequest();
  req.open('GET', 'https://dl.dropboxusercontent.com/u/87705298/Skull%20Fire.mp3', true);
  req.responseType = 'arraybuffer';
  
  req.onload = function() {
    actx.decodeAudioData(req.response, function(buffer) {
      $('.body').removeClass('loading');
      $('.loading-text').addClass('hidden');
      console.log('received');
      source.buffer = buffer;
      source.start(0);
      playing = true;
    });
  };
  req.send();
  
  function update() {
    if (playing) {
      var aData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(aData);
      
      for(var i = 0; i < analyser.fftSize; i++) {
        $($('.bars > .bar').get(i)).height(aData[i] * ($(window).height() / 300));
      }
    }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}