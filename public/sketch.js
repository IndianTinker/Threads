var socket;
var sessionid;
var borderColor = '#e0e4cc';
var strokeW = 100;
var i = 0;

function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  socket = io.connect('https://threads-function-rohit.herokuapp.com/');
  socket.on('connect', function () {
    sessionid = socket.id;
    console.log(sessionid);
  });
  socket.on('mouse', newDrawing)
  socket.on('intro', setColor)
  strokeW = Math.floor(width / 50);
}

function touchStarted() {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  strokeW = Math.floor(windowWidth / 50);
}


function newDrawing(data) {
  console.log("Data from other " + data);
}

function setColor(data) {
  console.log("Data from other host " + data);
  borderColor = data;
  console.log(typeof borderColor);

}

function draw() {
  background(0);

  strokeWeight(1);
  noFill();
  stroke(255);
  var spacing = map(mouseX, 0, width, 20, 180);
  var spacing2 = map(mouseY, 0, height, 5, 120);
  beginShape();
  for (k = 0; k < 361; k += spacing) {
    // beginShape();  
    for (i = 0; i < 3600; i += spacing2) {
      x = (width / 2) + (10 + k) * sin(i);
      y = (height / 2) + (10 + k) * cos(i);
      vertex(x, y);
    }
    endShape();
  }

  noFill();
  stroke(borderColor);
  strokeWeight(strokeW);
  rect(strokeW / 2, strokeW / 2, width - strokeW, height - strokeW);
}

function mouseDragged() {
  var cVal = dist(width / 2, height / 2, mouseX, mouseY);
  cVal = Math.floor(cVal);
  console.log(cVal);
  //console.log("Sending Data: " + mouseX + "," + mouseY);
  var data = {
    id: sessionid,
    val: cVal
  }
  socket.emit('mouse', data);


}