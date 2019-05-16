function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  var spacing=map(mouseX,0,width,20,180);
  var spacing2 =map(mouseY,0,height,5,120);
 beginShape();
  for(k=0;k<361;k+=spacing)
  {
  // beginShape();  
for(i=0;i<3600;i+=spacing2)
{
  x=200+(10+k)*sin(i);
   y=200+(10+k)*cos(i);
 vertex(x,y);
}
    endShape();
  }
  
}

function mousePressed()
{
  console.log(mouseX);
  console.log(mouseY);
}