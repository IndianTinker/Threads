var socket;
var sessionid;

function setup() {
  createCanvas(displayWidth, displayHeight);
  angleMode(DEGREES);
  socket = io.connect('http://10.10.200.110:3000/');
  socket.on('connect', function () {
    sessionid = socket.id;
    console.log(sessionid);
  });
  socket.on('mouse', newDrawing)
}

function newDrawing(data) {
  console.log("Data from other " + data);
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
  stroke('#3AA99E');
  strokeWeight(5);
  rect(2, 2, width - 4, height - 4);
}

function mousePressed() {
  console.log("Sending Data: " + mouseX + "," + mouseY);
  var data = {
    id: sessionid,
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);


}