var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var border = 10;
var centerX = c.width / 2;
var centerY = c.height / 2;
var radius = 40;

var radiusEye = 50;

var faceCenterX = centerX;
var faceCenterY = border+radius;

var radiusEyeIn = 3;

var eyeYPosition = faceCenterY-8
    
var reyedx = faceCenterX+(radiusEyeIn/2)+14;
var reyedy = eyeYPosition;

var leyedx = faceCenterX-(radiusEyeIn/2)-14;
var leyedy = eyeYPosition;

var eyesgap = 4;

var eyeXGap = (radiusEye/2)+9;

var reyedxafter = reyedx;
var reyedyafter = reyedy;

var leyedxafter = leyedx;
var leyedyafter = leyedy;



function drawscreen(){
  ctx.beginPath();
  ctx.arc(faceCenterX, faceCenterY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'rgba(100,100,100,0.5)';
  ctx.fill();
  ctx.stroke();

  var radiusEye = 12;
  ctx.beginPath();
  ctx.arc(faceCenterX-eyeXGap, eyeYPosition, radiusEye, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(faceCenterX+eyeXGap, eyeYPosition, radiusEye, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.fill();
  ctx.stroke();
}

function draweyes() {
  
  ctx.beginPath();
  ctx.arc(reyedxafter, reyedyafter, radiusEyeIn, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(leyedxafter, leyedyafter, radiusEyeIn, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fill();
}

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

function mouseMove(e) {
        var mouseX = e.pageX - this.offsetLeft - faceCenterX;
        var mouseY = e.pageY - this.offsetTop - eyeYPosition;
  
        var ratioX = Math.abs(mouseX)/(Math.abs(mouseX)+Math.abs(mouseY));
        var ratioY = Math.abs(mouseY)/(Math.abs(mouseX)+Math.abs(mouseY));
  
        
        if(mouseX > 0){
          reyedxafter = reyedx + (ratioX*eyesgap);        
        } else {
          reyedxafter = reyedx - (ratioX*eyesgap);
        }
        
        if(mouseY > 0){
          reyedyafter = reyedy + (ratioY*eyesgap);
        } else {
          reyedyafter = reyedy - (ratioY*eyesgap);         
        }
  
        if(mouseX > 0){
          leyedxafter = leyedx + (ratioX*eyesgap);
        } else {
          leyedxafter = leyedx - (ratioX*eyesgap);
        }
  
        if(mouseY > 0){
          leyedyafter = leyedy + (ratioY*eyesgap);
        } else {
          leyedyafter = leyedy - (ratioY*eyesgap);
        }
  
        ctx.clearRect(0, 0, c.width, c.height);
        drawscreen();
        draweyes();
}

function init() {
    //c.addEventListener('mousedown', mouseDown, false);
   // c.addEventListener('mouseup', mouseUp, false);
    c.addEventListener('mousemove', mouseMove, false);
    drawscreen();
    draweyes();
}

init();