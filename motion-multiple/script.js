// Initialise a few variables
var socket = null;
var myId = null;
var roomName = 'multiple';
var clients = {};
var sampleSize = 50;

//When the browser is ready
$(document).ready(function() {
  // Connect realtime stuff up
  socket = io.connect('/');
  //Don't do anything if mobile
  socket.on('hello', onHello);
  socket.on('say', onSay);
  socket.on('join', onJoin);
  socket.on('leave', onLeave);


  // Trigger is mobile show overlay
  if (kattegat.device.mobile()) {
    $('section').hide();
    $('#overlay').show();
  }

  //Attach eventlisteners to window
  $(window).on('devicemotion', onDeviceMotion);
});

// Collect data and send it to the server
function onDeviceMotion(e) {
  var motion = e.originalEvent;

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

  var motionData = {
    acceleration: acceleration,
    accelerationIncludingGravity: accelerationIncludingGravity,
    rotationRate: rotationRate
  };

  socket.emit('say', {
    id: myId,
    motion: motionData
  });
}

// When a client joins the room
function onJoin(e) {
  var id = e.id;

  clients[id] = {
    x: new Smoother(sampleSize),
    y: new Smoother(sampleSize),
    z: new Smoother(sampleSize)
  };

  drawClientHtml(id);
  updateTotal();
}

function onSay(e) {
  var id = e.id;
  var motion = e.motion.accelerationIncludingGravity;
  var client = clients[id];

  if (client) {
    client.x.push(motion.x);
    client.y.push(motion.y);
    client.z.push(motion.z);

    updateInRange();
    updateClientHtml(id);
  }
}

// When a client leaves the room
function onLeave(e) {
  // Server provides an 'id' property for the user
  var id = e.id;

  // Delete id from users we are tracking
  delete clients[id];
  eraseClientHtml(id);
  updateTotal();
}

//As soon as we connect to the server, join a "room"
function onHello(e) {
  myId = e.id;
  socket.emit('join', { room: roomName });
}

//Draw HTML for a new client
function drawClientHtml(id) {
  var html = '<aside id="'+id+'"></div>';
  $('section').append(html);
}

//Update the HTML for a given client
function updateClientHtml(id) {
  var htmlId = '#' + id;
  var client = clients[id];
  var html = '<div>id: '+id+'</div>';
  html += '<div>x: '+client.x.get().toFixed(3)+'</div>';
  html += '<div>y: '+client.y.get().toFixed(3)+'</div>';
  html += '<div>z: '+client.z.get().toFixed(3)+'</div>';

  $(htmlId).html(html);
}

//Remove the HTML for a given client
function eraseClientHtml(id) {
  var htmlId = '#' + id;
  $(htmlId).remove();
}

// Update the visual box
function updateInRange() {
  var range = [];
  var property = 'z';

  //Collect all the numbers in an array
  for (var key in clients) {
    var client = clients[key];
    range.push( client[property].get() );
  }

  var inRange = isInRange(range, 3);

  if (inRange) {
    $('#match').css({ 'background-color': 'lightgreen' });
  } else {
    $('#match').css({ 'background-color': 'red' });
  }
}

//Return true/false based on input
function isInRange(range, maxDiff) {
  //Calculate min and max value
  var min = Math.min.apply(Math, range);
  var max = Math.max.apply(Math, range);

  //Calculate the difference
  var diff = max - min;

  if (diff > maxDiff) {
    return false;
  } else {
    return true;
  }
}

//Update the total number of devices connected
function updateTotal() {
  $('#num').html( getObjectLength(clients) );
}

//Return the number of attributes in an object
function getObjectLength(obj) {
  return Object.keys(obj).length;
}

