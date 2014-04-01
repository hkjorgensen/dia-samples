// Initialise a few variables
var socket = null;
var options = null;
var sampleSize = null;

var highBeta = null;
var lowBeta = null;
var meanBeta = null;

var highAlpha = null;
var lowAlpha = null;
var meanAlpha = null;

var highGamma = null;
var lowGamma = null;
var meanGamma = null;

var data = {
  beta:[],
  alpha:[],
  gamma:[]
};

//Small function to check if phone device
var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

//When the browser is ready
$(document).ready(function() {
  // setup graph
  options = {
    series: { shadowSize: 0 }, // drawing is faster without shadows
    //yaxis: { min: -10, max: 10 },
    xaxis: { show: false }
  };

  sampleSize = 200;

  // Connect realtime stuff up
  socket = io.connect('/');
  socket.on('say', onSay);

  //Trigger is mobile show overlay
  if ( isMobile.any() ) {
    $('ul').hide();
    $('#overlay').show();
  } else {
    //Attach eventlisteners to window
    $(window).on('devicemotion', onDeviceMotion);
  }
});

//Collect data and send it to the server
function onDeviceMotion(e) {
  var motion = e.originalEvent;

  // console.log(motion);
  var acceleration = {
    x: motion.acceleration.x,
    y: motion.acceleration.y,
    z: motion.acceleration.z
  };
  var accelerationIncludingGravity = {
    x: motion.accelerationIncludingGravity.x,
    y: motion.accelerationIncludingGravity.y,
    z: motion.accelerationIncludingGravity.z
  };
  var rotationRate = {
    alpha: motion.rotationRate.alpha,
    beta: motion.rotationRate.beta,
    gamma: motion.rotationRate.gamma
  };

  socket.emit('say', {
    acceleration: acceleration,
    accelerationIncludingGravity: accelerationIncludingGravity,
    rotationRate: rotationRate
  });
}

//Do something with the data from a third device (Phone, tablet etc.)
function onSay(motion) {
  var rotationRate = motion.rotationRate;

  data.alpha.push(rotationRate.alpha);
  if (data.alpha.length > sampleSize) { data.alpha.shift(); }
  var resAlpha = [];
  for (var i = 0; i < data.alpha.length; ++i){
    resAlpha.push([i, data.alpha[i]]);

    if (data.alpha[i] > highAlpha) { highAlpha = data.alpha[i]; }
    if (data.alpha[i] < lowAlpha) { lowAlpha = data.alpha[i]; }
    meanAlpha = meanAlpha + data.alpha[i];
  }

  meanAlpha = meanAlpha / data.alpha.length;

  $('#alpha').html(rotationRate.alpha + '<br>high/low: ' + highAlpha + ' / ' + lowAlpha + '<br>mean: ' + meanAlpha);
  $.plot($("#plotalpha"), [ resAlpha ], options);

  //Update beta
  data.beta.push(rotationRate.beta);
  if (data.beta.length > sampleSize) { data.beta.shift(); }
  var resBeta = [];
  for (var i = 0; i < data.beta.length; ++i){
    resBeta.push([i, data.beta[i]]);

    if (data.beta[i] > highBeta) { highBeta = data.beta[i]; }
    if (data.beta[i] < lowBeta) { lowBeta = data.beta[i]; }
    meanBeta = meanBeta + data.beta[i];
  }

  meanBeta = meanBeta / data.beta.length;

  $('#beta').html(rotationRate.beta + '<br>high/low: ' + highBeta + ' / ' + lowBeta + '<br>mean: ' + meanBeta);
  $.plot($("#plotbeta"), [ resBeta ], options);

  data.gamma.push(rotationRate.gamma);
  if (data.gamma.length > sampleSize) { data.gamma.shift(); }
  var resGamma = [];
  for (var i = 0; i < data.gamma.length; ++i){
    resGamma.push([i, data.gamma[i]]);

    if (data.gamma[i] > highGamma) { highGamma = data.gamma[i]; }
    if (data.gamma[i] < lowGamma) { lowGamma = data.gamma[i]; }
    meanGamma = meanGamma + data.gamma[i];
  }

  meanGamma = meanGamma / data.gamma.length;

  $('#gamma').html(rotationRate.gamma + '<br>high/low: ' + highGamma + ' / ' + lowGamma + '<br>mean: ' + meanGamma);
  $.plot($("#plotgamma"), [ resGamma ], options);
}
