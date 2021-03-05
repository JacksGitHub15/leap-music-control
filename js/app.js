lissa.BUFFER_SIZE = 1024;

lissa.init = function($) {
  var context = null;
  if (typeof AudioContext !== 'undefined')
    context = new AudioContext();
  else if (typeof webkitAudioContext !== 'undefined')
    context = new webkitAudioContext();
  else {
    alert("Web Audio API not found. :(");
    return;
  }

  lissa.templates.init();
  lissa.figure.init();
  lissa.synth.init(lissa.BUFFER_SIZE);

  var synth_processor = context.createScriptProcessor(lissa.BUFFER_SIZE, 0, 2);
  synth_processor.onaudioprocess = lissa.process;

  synth_processor.connect(context.destination);
  lissa.figure.draw();

  lissa.controls.init($('.controls'));

  $(window).focus(function() { lissa.active = true; });
  $(window).blur(function() { lissa.active = false; });

  lissa.active = document.hasFocus;
  if (lissa.active)
    window.focus();
};

(function($){
  window.onload = function() {
      lissa.init($);
  };
})(jQuery);
