var socket = null;
var options = null;

var x = null;
var y = null;
var z = null;

// When the browser is ready
$(document).ready(function() {
  // setup graph
  options = {
    series: { shadowSize: 0 }, // drawing is faster without shadows
    xaxis: { show: false }
  };

  var sampleSize = 200;
  x = new Smoother(sampleSize);
  y = new Smoother(sampleSize);
  z = new Smoother(sampleSize);

  // Connect realtime stuff up
  socket = io.connect('/');
  socket.on('say', onSay);

  if (kattegat.device.mobile()) {
    // Hide raw data on mobiles
    $('#dataDisplay').hide();
    $('#overlay').show();
  }

  // Device supports 'devicemotion' event
  if (window.DeviceMotionEvent) {
    $(window).on('devicemotion', onDeviceMotion);
  }
});

// Collect data and send it via sockets
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

// Do something with the data from a third device (Phone, tablet etc.)
function onSay(motion) {
  var d = motion.accelerationIncludingGravity;

  // Keep track of the data
  x.push(d.x);
  y.push(d.y);
  z.push(d.z);

  // Show numbers
  $('#ax').html(d.x.toFixed(3) + '<br>high: ' + x.getHigh().toFixed(3) + '<br>low: ' + x.getLow().toFixed(3) + '<br>smoothed: ' + x.get().toFixed(3));
  $('#ay').html(d.y.toFixed(3) + '<br>high: ' + y.getHigh().toFixed(3) + '<br>low: ' + y.getLow().toFixed(3) + '<br>smoothed: ' + y.get().toFixed(3));
  $('#az').html(d.z.toFixed(3) + '<br>high: ' + z.getHigh().toFixed(3) + '<br>low: ' + z.getLow().toFixed(3) + '<br>smoothed: ' + z.get().toFixed(3));
    
  // Plot numbers
  $.plot($("#plot"), [ 
    { color:"red",  data:x.getIndexedData() }, 
    { color:"blue", data:y.getIndexedData() },
    { color:"green",data:z.getIndexedData() }
    ], options);

}

