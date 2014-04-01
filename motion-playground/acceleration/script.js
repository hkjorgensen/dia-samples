// Initialise a few variables
var socket = null;
var options = null;
var sampleSize = null;

var highX = null;
var lowX = null;
var meanX = null;

var highY = null;
var lowY = null;
var meanY = null;


var highZ = null;
var lowZ = null;
var meanZ = null;

var data = {
  x:[],
  y:[],
  z:[]
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
  var acceleration = motion.acceleration;

  //Update the graphs
  data.x.push(acceleration.x);
  if (data.x.length > sampleSize) { data.x.shift(); }
  var resX = [];
  for (var i = 0; i < data.x.length; ++i){
    resX.push([i, data.x[i]]);

    if (data.x[i] > highX) { highX = data.x[i]; }
    if (data.x[i] < lowX) { lowX = data.x[i]; }
    meanX = meanX + data.x[i];
  }

  meanX = meanX / data.x.length;

  $('#ax').html(acceleration.x + '<br>high/low: ' + highX + ' / ' + lowX + '<br>mean: ' + meanX);
  $.plot($("#plotax"), [ resX ], options);

  data.y.push(acceleration.y);
  if (data.y.length > sampleSize) { data.y.shift(); }
  var resY = [];
  for (var i = 0; i < data.y.length; ++i){
    resY.push([i, data.y[i]]);

    if (data.y[i] > highY) { highY = data.y[i]; }
    if (data.y[i] < lowY) { lowY = data.y[i]; }
    meanY = meanY + data.y[i];
  }

  meanY = meanY / data.y.length;

  $('#ay').html(acceleration.y + '<br>high/low: ' + highY + ' / ' + lowY + '<br>mean: ' + meanY);
  $.plot($("#plotay"), [ resY ], options);

  data.z.push(acceleration.z);
  if (data.z.length > sampleSize) { data.z.shift(); }
  var resZ = [];
  for (var i = 0; i < data.z.length; ++i){
    resZ.push([i, data.z[i]]);

    if (data.z[i] > highZ) { highZ = data.z[i]; }
    if (data.z[i] < lowZ) { lowZ = data.z[i]; }
    meanZ = meanZ + data.z[i];
  }

  meanZ = meanZ / data.z.length;

  $('#az').html(acceleration.z + '<br>high/low: ' + highZ + ' / ' + lowZ + '<br>mean: ' + meanZ);
  $.plot($("#plotaz"), [ resZ ], options);
}
