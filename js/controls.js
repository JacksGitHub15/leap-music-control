/*
  Reference:
  Matt Tytel, lissa, (2013), GitHub repository, https://github.com/mtytel/lissa
  This was used for inspiration and guidance
 */

lissa.controls = {};

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
    window.location.reload();
  })
}

lissa.controls.knob = function ($container, f, settings) {
  var $knob = null;

  function render() {
    $container.append(lissa.templates.templates.knob(settings));
    $knob = $container.find('#' + settings.id).first();
    $knob.knob({ change: f });
    $knob.on('change', function (ev) {
      f($knob.val());
    });
  }

  function getVal() {   // only called by setFreq
    return $knob.val();
  }

  function setVal(val) {  // set values of all knobs
    $knob.val(val).trigger('change');
    f(val);
  }

  return {
    render: render,
    getVal: getVal,
    setVal: setVal,
  };
};


lissa.controls.knobLeapMotion = function ($container, f, settings) {
  var $knob = null;
  activateLeapMotion();
  function activateLeapMotion() {
    setupLeapMotion();
    /*
       * Sets up the leap motion controller by binding to events 
       * and starting the loop with the captured data.
       **/
    function setupLeapMotion() {
      var leapController = new Leap.Controller();
      leapController.connect();

      Leap.loop(onLeapCapturedData);
    }

    function onLeapCapturedData(leapData) {

      if (!leapData.hands || leapData.hands.length === 0)
        return;

      var verticalPosition = leapData.hands[0].palmPosition[1];
      var percentage = Math.max(Math.min(((verticalPosition - 50) / 350), 1), 0);

      var valueLeapMotion;
      valueLeapMotion = $knob.val() * percentage;
      valueLeapMotion = Math.round(valueLeapMotion);
      console.log("valueLeapMotion " + valueLeapMotion);

      var event = new window.Event('input');
      knob.dispatchEvent(event);

      return valueLeapMotion;
    }
  }

  var $knob = null;

  function render() {
    $container.append(lissa.templates.templates.knob(settings));
    $knob = $container.find('#' + settings.id).first();
    $knob.knob({ change: f });

    $knob.on('change', function (ev) {
      f($knob.val());
    });
  }

  function getVal() {
    console.log("$knob.val() " + $knob.val());
    return $knob.val();
  }

  function setVal(val) {
    $knob.val(val).trigger('change');
    f(val);
  }

  return {
    render: render,
    getVal: getVal,
    setVal: setVal,
  };
};


lissa.controls.oscillator = function ($container, title, model, base_freq_knob) {
  // model is a lissa.oscillator()

  var id_prefix = $container.attr('id');

  var freq_mul_knob = null;
  var freq_divi_knob = null;
  var freq_detu_knob = null;
  var phase_knob = null;
  var sin_knob = null;
  var tri_knob = null;

  var freq_mul_knob_settings = {
    label: 'MULTIPLY',
    min_val: 1,
    max_val: 12,
    default_val: 1,
    id: get_id('mul-knob'),
  };

  var freq_divi_knob_settings = {
    label: 'DIVIDE',
    min_val: 1,
    max_val: 12,
    default_val: 1,
    id: get_id('divi-knob'),
  };

  var freq_detu_knob_settings = {
    label: 'DETUNE',
    min_val: -100,
    max_val: 100,
    default_val: 0,
    id: get_id('detu-knob'),
  };

  var phase_knob_settings = {
    label: 'PHASE',
    min_val: -180,
    max_val: 180,
    default_val: model.getPhase() * 360,
    id: get_id('phase-knob'),
  };

  var sin_knob_settings = {
    label: 'SIN',
    min_val: 0,
    max_val: 100,
    default_val: model.getAmp('sin') * 100,
    id: get_id('sin-knob'),
  };

  var tri_knob_settings = {
    label: 'TRI',
    min_val: 0,
    max_val: 100,
    default_val: model.getAmp('tri') * 100,
    id: get_id('tri-knob'),
  };

  function setFreq() {
    // setTimeout makes sure all knobs have updated before reading their value
    setTimeout(function () {
      var freq = base_freq_knob.getVal() * (1.0 * freq_mul_knob.getVal() / freq_divi_knob.getVal()) * Math.pow(2, freq_detu_knob.getVal() / 12000.0);
      model.setFreq(freq);
    }, 0);
  }

  function setLeapMotionFreq() {
    setTimeout(function () {
      var freq = base_freq_knob.getVal() * (1.0 * freq_mul_knob.getVal() / freq_divi_knob.getVal()) * Math.pow(2, freq_detu_knob.getVal() / 12000.0);
      model.setLeapMotionFreq(freq);
    }, 0);
  }

  // $container.attr('id') is used to prefix the ids of the knobs
  function get_id(s) {
    return id_prefix + '-' + s;
  }

  function render() {
    var $el = lissa.templates.templates.oscillator({ title: title });
    $container.append($el);

    var $col1 = $container.find('.knob-column.col-1').first();
    var $col2 = $container.find('.knob-column.col-2').first();
    var $col3 = $container.find('.knob-column.col-3').first();

    if (mul_checkbox.checked) {
      freq_mul_knob = lissa.controls.knobLeapMotion($col1, setFreq, freq_mul_knob_settings);
      freq_mul_knob.render();
    }
    else {
      freq_mul_knob = lissa.controls.knob($col1, setFreq, freq_mul_knob_settings);
      freq_mul_knob.render();
    }

    if (divi_checkbox.checked) {
      freq_divi_knob = lissa.controls.knobLeapMotion($col1, setFreq, freq_divi_knob_settings);
      freq_divi_knob.render();
    }
    else {
      freq_divi_knob = lissa.controls.knob($col1, setFreq, freq_divi_knob_settings);
      freq_divi_knob.render();
    }

    if (detu_checkbox.checked) {
      freq_detu_knob = lissa.controls.knobLeapMotion($col2, setFreq, freq_detu_knob_settings);
      freq_detu_knob.render();
    }
    else {
      freq_detu_knob = lissa.controls.knob($col2, setFreq, freq_detu_knob_settings);
      freq_detu_knob.render();
    }

    if (phase_checkbox.checked) {
      phase_knob = lissa.controls.knobLeapMotion($col2,
        function (val) {
          model.setPhase(val / 360);
        },
        phase_knob_settings);
      phase_knob.render();
    }
    else {
      phase_knob = lissa.controls.knob($col2,
        function (val) {
          model.setPhase(val / 360);
        },
        phase_knob_settings);
      phase_knob.render();
    }

    function wave_amp_setter(type, max) {
      return function (val) {
        model.setAmp(type, val / max);
      };
    }

    if (sin_checkbox.checked) {
      sin_knob = lissa.controls.knobLeapMotion($col3,
        wave_amp_setter('sin', sin_knob_settings.max_val), sin_knob_settings);
      sin_knob.render();
    }
    else {
      sin_knob = lissa.controls.knob($col3,
        wave_amp_setter('sin', sin_knob_settings.max_val), sin_knob_settings);
      sin_knob.render();
    }

    if (tri_checkbox.checked) {
      tri_knob = lissa.controls.knobLeapMotion($col3,
        wave_amp_setter('tri', tri_knob_settings.max_val), tri_knob_settings);
      tri_knob.render();
    }
    else {
      tri_knob = lissa.controls.knob($col3,
        wave_amp_setter('tri', tri_knob_settings.max_val), tri_knob_settings);
      tri_knob.render();
    }
  }

  function randomize() {
    freq_mul_knob.setVal(lissa.utils.random_int(1, 5));
    freq_divi_knob.setVal(lissa.utils.random_int(1, 5));
    freq_detu_knob.setVal(lissa.utils.random_int(-7, 7));
    var sin_amount = lissa.utils.random_int(0, 100);
    sin_knob.setVal(sin_amount);
    if (lissa.harmonograph_type === 'lateral')
      tri_knob.setVal(100 - sin_amount);
    else
      tri_knob.setVal(0);
  }

  return {
    render: render,
    randomize: randomize,
    setFreq: setFreq,
  };
};

lissa.controls.minicolors = function ($container) {
  function init() {
    $container.each(function () {
      $(this).minicolors({
        animationSpeed: 0,
        textfield: !$(this).hasClass('no-textfield'),
        change: function (hex, opacity) {
          var red = parseInt(hex.substring(1, 3), 16);
          var green = parseInt(hex.substring(3, 5), 16);
          var blue = parseInt(hex.substring(5, 7), 16);
          lissa.figure.setColor(red, green, blue);
        },
      });
    });
  }

  function randomize() {
    var red = Math.floor(256 * Math.random());
    var green = Math.floor(256 * Math.random());
    var blue = Math.floor(256 * Math.random());
    lissa.figure.setColor(red, green, blue);

    var red_hex = '0' + red.toString(16);
    var green_hex = '0' + green.toString(16);
    var blue_hex = '0' + blue.toString(16);
    $container.minicolors('value', '#' + red_hex.substring(red_hex.length - 2)
      + green_hex.substring(green_hex.length - 2)
      + blue_hex.substring(blue_hex.length - 2));
  }

  return {
    init: init,
    randomize: randomize,
  };
};


lissa.controls.randomizer = function ($container, items) {
  var $randomize_button = $container.find('.randomize').first();

  function init() {
    $randomize_button.on('click', randomize);
  }

  function randomize() {
    _.each(items, function (item) {
      item.randomize();
    });
  }

  function maybeRandomize() {
    if (Math.random() < 0.2) {
      randomize();
    }
  }

  return {
    init: init,
  };
};


lissa.controls.harmonograph_type = function ($container, model) {
  var $buttons = $container.find('.harmonograph-type .simple-button');

  model.harmonograph_type = null;

  function init() {
    $buttons.on('click', function (ev) {
      var $this = $(this);
      choose($this);
    });
    choose($($buttons[0]));
  }

  function choose($this) {
    model.harmonograph_type = $this.data('type');
    $buttons.removeClass('pressed');
    $this.addClass('pressed');
  }

  function randomize() {
    var x = Math.random();
    var i = 0;
    if (x < 0.5) {
      i = 0;
    } else if (x < 0.75) {
      i = 1;
    } else {
      i = 2;
    }
    choose($($buttons[i]));
  }

  return {
    init: init,
    randomize: randomize,
  };
};


lissa.controls.init = function ($container) {
  var base_freq_knob_settings = {
    label: 'BASE FREQUENCY',
    min_val: 1,
    max_val: 500,
    default_val: 200,
    id: 'base-freq-knob'
  };

  var base_freq_knob = lissa.controls.knob(
    $container.find('#base_freq').first(),
    function (val) {
      left_oscillator_control.setFreq();
      right_oscillator_control.setFreq();
    },
    base_freq_knob_settings
  );
  base_freq_knob.render();

  var left_oscillator_control = lissa.controls.oscillator(
    $container.find('#left-oscillator').first(),
    'X-axis Oscillator',
    lissa.synth.left,
    base_freq_knob
  );
  left_oscillator_control.render();

  var right_oscillator_control = lissa.controls.oscillator(
    $container.find('#right-oscillator').first(),
    'Y-axis Oscillator',
    lissa.synth.right,
    base_freq_knob
  );
  right_oscillator_control.render();

  var minicolors = lissa.controls.minicolors($('.minicolors'));
  minicolors.init();

  var harmonograph_type = lissa.controls.harmonograph_type($container, lissa);
  harmonograph_type.init();

  var randomizer = lissa.controls.randomizer($container, [harmonograph_type, right_oscillator_control, left_oscillator_control, minicolors]);
  randomizer.init();
};


lissa.templates = function () {
  function init() {
    // a wrapper around _.template to give error messages
    var that = this;
    $('script[type="underscore/template"]').each(function () {
      var template = null;
      var $this = $(this);
      var id = $(this).attr('id');

      try {
        template = _.template($this.text());
      }
      catch (error) {
        console.log('Error compiling template', id, error);
      }

      that.templates[id] = function () {
        try {
          return template.apply(this, arguments);
        }
        catch (error) {
          console.log('Error executing template', id, error);
        }
      };
    });
  }
  return {
    templates: {},
    init: init,
  };

}();