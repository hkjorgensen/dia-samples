// Initialise a few variables
var socket = null;

//When the browser is ready
$(document).ready(function() {
  // Connect realtime stuff up
  socket = io.connect('/');
  socket.on('say', onSay);
  //Attach eventlisteners to window
  $(window).on('deviceorientation', onDeviceOrientation);
});

function onDeviceOrientation(e) {
  var motion = e.originalEvent;
  var rotation = {
    alpha: motion.alpha,
    beta: motion.beta,
    gamma: motion.gamma
  };

  socket.emit('say', {
    rotation: rotation
  });
}

//Do something with the data from a third device (Phone, tablet etc.)
function onSay(motion) {
  //WIP
  var cssTransform = 'rotateX(' + motion.rotation.beta + 'deg) rotateY(' + ( -motion.rotation.gamma ) + 'deg) rotateZ(' + ( motion.rotation.alpha - 180 )*-1 + 'deg)';
  $('aside').css({ 'transform': cssTransform });
}
