var socket;
var sessionid;
var borderColor = '#e0e4cc';
var borders = [];
var m = 10;
var spacing = 100;
var spacing2 = 100;
var strokeW = 100;
var spacing2buf = 0;

function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  socket = io.connect('http://192.168.0.159:3000');
  socket.on('connect', function () {
    sessionid = socket.id;
    console.log(sessionid);
  });
  socket.on('drawData', newDrawing)
  //socket.on('intro', setColor)
  socket.on('borders', updateBorders);
  strokeW = Math.floor(width / 20);
}

function updateBorders(data) {
  console.log(data);
  borders = data;
  m = constrain((borders.length - 1) * 20, 0, 400);
  console.log(m);
  // for (var i = 0; i < data.length; i++) {
  //   //console.log(data[i].color)
  //   borders[i] = data[i].color;
  // }
  //console.log(borders)
}

function touchStarted() {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  strokeW = Math.floor(windowWidth / 20);
}


function newDrawing(data) {
  cClient = (borders.length - 1);
  console.log("Avg " + data + " cCount: " + cClient);


  spacing2buf = Math.floor(map(data, 0, width / 2, 2, 32));
  if (spacing2buf % 3 == 0) {
    spacing = Math.floor(constrain(data, 10, 70));
    spacing2 = spacing2buf * 10;
  } else {
    spacing = Math.floor(constrain(data, 20, 300));
    spacing2 = spacing2buf * 10;
  }


  console.log("m:" + m + " " + "spacing:" + spacing + " " + "spacing2:" + spacing2);



}

function setColor(data) {
  console.log("Data from other host " + data);
  borderColor = data;
  //console.log(typeof borderColor);

}

function draw() {
  //background(0);

  c = color(0);
  c.setAlpha(70);
  fill(c);
  rect(0, 0, width, height);
  strokeWeight(1);
  noFill();
  stroke(255);
  // var spacing = map(mouseX, 0, width, 20, 180);
  // var spacing2 = map(mouseY, 0, height, 5, 120);
  beginShape();
  for (k = 0; k < 361; k += spacing) {
    // beginShape();  
    for (i = 0; i < 3600; i += spacing2) {
      x = (width / 2) + (m + k) * sin(i);
      y = (height / 2) + (m + k) * cos(i);
      vertex(x, y);
    }
    endShape();
  }

  noFill();
  var borderLen = borders.length;
  if (borderLen <= 0) {
    stroke(borderColor);
    strokeWeight(strokeW);
    rect(strokeW / 2, strokeW / 2, width - strokeW, height - strokeW);
  } else {
    var newStrokeW = Math.floor(strokeW / borderLen)
    for (var i = 0; i < borderLen; i++) {
      stroke(borders[i].color);
      var newWidth = strokeW - (i * newStrokeW)
      strokeWeight(newWidth);
      rect(newWidth / 2, newWidth / 2, width - newWidth, height - newWidth);
    }
  }

}

































// var socket;
// var sessionid;
// var mic;
// var borders = [];

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   //cn.parent('sketch-holder');
//   angleMode(DEGREES);
//   socket = io.connect('http://192.168.0.159:3000/');
//   socket.on('connect', function () {
//     sessionid = socket.id;
//     console.log(sessionid);
//   });
//   // socket.on('borders', (data) => {
//   //   for (var i = 0; i < data.length; i++) {
//   //     borders[i] = data[i].color
//   //   }
//   //   console.log(borders);
//   // })

//   //mic = new p5.AudioIn()
//   //mic.start();
//   // fft = new p5.FFT();
//   // fft.setInput(mic);
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// function newDrawing(data) {
//   console.log("Data from other " + data);
// }

// function draw() {
//   background(0);

//   // let spectrum = fft.analyze();
//   // let spectrum = fft.analyze();

//   // band1 = spectrum.slice(0, 256);
//   // band2 = spectrum.slice(256, 512);
//   // band3 = spectrum.slice(512, 768);
//   // band4 = spectrum.slice(768, 1024);

//   // maxb1 = Math.max(...band1);
//   // maxb2 = Math.max(...band2);
//   // maxb3 = Math.max(...band3);
//   // maxb4 = Math.max(...band4);

//   //micLevel = mic.getLevel();
//   //micLevel = constrain(micLevel * mouseX, 0, width)
//   strokeWeight(1);
//   noFill();
//   stroke(255);
//   var spacing = map(mouseX, 0, width, 0, 180);
//   //var spacing = map(micLevel, 0, 1.2, 120, 20);
//   //console.log(spacing);
//   var spacing2 = map(mouseY, 0, height, 5, 120);
//   beginShape();
//   for (k = 0; k < 361; k += spacing) {

//     for (i = 0; i < 3600; i += spacing2) {
//       x = (width / 2) + (10 + k) * sin(i);
//       y = (height / 2) + (10 + k) * cos(i);
//       vertex(x, y);
//     }
//     endShape();
//   }

//   noFill();
//   stroke('#3AA99E');
//   strokeWeight(5);
//   rect(2, 2, width - 4, height - 4);
// }

// function mousePressed() {
//   //console.log("Sending Data: " + mouseX + "," + mouseY);
//   // var data = {
//   //   id: sessionid,
//   //   x: mouseX,
//   //   y: mouseY
//   // }
//   //socket.emit('mouse', data);
//   // micLevel = mic.getLevel();
//   // console.log(micLevel);
//   console.log(mouseX + "," + mouseY);

// }