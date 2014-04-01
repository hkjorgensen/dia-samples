// Initialise a few variables
var socket = null;
var options = null;

var alpha = null;
var beta = null;
var gamma = null;


// When the browser is ready
$(document).ready(function() {
  // setup graph
  options = {
    series: { shadowSize: 0 }, // drawing is faster without shadows
    //yaxis: { min: -10, max: 10 },
    xaxis: { show: false }
  };

  var sampleSize = 200;
  alpha = new Smoother(sampleSize);
  beta = new Smoother(sampleSize);
  gamma = new Smoother(sampleSize);

  // Connect realtime stuff up
  socket = io.connect('/');

  if (kattegat.device.mobile()) {
    // Hide raw data on mobiles
    $('#dataDisplay').hide();
    $('#overlay').show();
    // Device supports 'devicemotion' event
    if (window.DeviceMotionEvent) {
      $(window).on('devicemotion', onDeviceMotion);
    }
  } else {
    socket.on('say', onSay);
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
  var d = motion.rotationRate;

  // Keep track of the data
  alpha.push(d.alpha);
  beta.push(d.beta);
  gamma.push(d.gamma);

  // Show numbers
  $('#alpha').html(d.alpha.toFixed(3) + '<br>high: ' + alpha.getHigh().toFixed(3) + '<br>low: ' + alpha.getLow().toFixed(3) + '<br>smoothed: ' + alpha.get().toFixed(3));
  $('#beta').html(d.beta.toFixed(3) + '<br>high: ' + beta.getHigh().toFixed(3) + '<br>low: ' + beta.getLow().toFixed(3) + '<br>smoothed: ' + beta.get().toFixed(3));
  $('#gamma').html(d.gamma.toFixed(3) + '<br>high: ' + gamma.getHigh().toFixed(3) + '<br>low: ' + gamma.getLow().toFixed(3) + '<br>smoothed: ' + gamma.get().toFixed(3));

  // Plot numbers
  $.plot($("#plot"), [
    { color:"red",  data:alpha.getIndexedData() },
    { color:"blue", data:beta.getIndexedData() },
    { color:"green",data:gamma.getIndexedData() }
    ], options);
}
