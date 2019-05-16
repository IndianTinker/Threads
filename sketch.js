var socket;
var sessionid;
var mic;

function setup() {
  var cn = createCanvas(800, 800);
  cn.parent('sketch-holder');
  angleMode(DEGREES);
  // socket = io.connect('http://10.10.200.110:3000/');
  // socket.on('connect', function () {
  //   sessionid = socket.id;
  //   console.log(sessionid);
  // });
  // socket.on('mouse', newDrawing)

  mic = new p5.AudioIn()
  mic.start();
  // fft = new p5.FFT();
  // fft.setInput(mic);
}


function newDrawing(data) {
  console.log("Data from other " + data);
}

function draw() {
  background(0);

  // let spectrum = fft.analyze();
  // let spectrum = fft.analyze();

  // band1 = spectrum.slice(0, 256);
  // band2 = spectrum.slice(256, 512);
  // band3 = spectrum.slice(512, 768);
  // band4 = spectrum.slice(768, 1024);

  // maxb1 = Math.max(...band1);
  // maxb2 = Math.max(...band2);
  // maxb3 = Math.max(...band3);
  // maxb4 = Math.max(...band4);

  micLevel = mic.getLevel();
  micLevel = constrain(micLevel * mouseX, 0, width)
  strokeWeight(1);
  noFill();
  stroke(255);
  var spacing = map(micLevel, 0, width, 20, 180);
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
  //console.log("Sending Data: " + mouseX + "," + mouseY);
  // var data = {
  //   id: sessionid,
  //   x: mouseX,
  //   y: mouseY
  // }
  //socket.emit('mouse', data);
  micLevel = mic.getLevel();
  console.log(micLevel);


}