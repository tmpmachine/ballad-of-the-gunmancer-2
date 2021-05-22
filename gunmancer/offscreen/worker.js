let L = console.log;
let c;
onmessage = function(e) {
  switch (e.data.type) {
    case 'init':
      c = e.data.canvas.getContext('2d');
      break;
    case 'c1':
      c.clearRect(0,0,c.canvas.width,c.canvas.height)
      calc(e.data.x, e.data.y);
      drawCircle(e.data.controller);
      break;
    case 'c2':
      c.clearRect(0,0,c.canvas.width,c.canvas.height)
      calc(e.data.x, e.data.y);
      drawCircle(e.data.controller);
      break;
    case 'redraw':
      break;
  }
  // console.log('Message received from main script');
  // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  // console.log('Posting message back to main script');
  // postMessage(workerResult);
}

function calc(dX, dY) {
  let a = (dY - controller.sensor.y) * -1;
  let b = dX - controller.sensor.x;
  let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

  rad = Math.asin(a / c);
  u = 0;
  r = 0;
  l = 0;
  bottom = 0;
  direction = 0;
  
  if (dY < controller.sensor.y) {
    u = rad/1.5;
    if (dX >= controller.sensor.x)
      r = 1-u;
    else if (dX < controller.sensor.x)
      l = 1-u;
  } else if (dY == controller.sensor.y) {
    if (dX > controller.sensor.x)
      r = 1-bottom;
    else if (dX < controller.sensor.x)
      l = 1-bottom;
  } else if (dY > controller.sensor.y) {
    bottom = rad/1.5*-1;
    if (dX > controller.sensor.x)
      r = 1-bottom;
    else if (dX < controller.sensor.x)
      l = 1-bottom;
  }
  
  let lo = Math.floor(l * 100);
  let to = Math.floor(u * 100);
  let wo = Math.floor(bottom * 100);
  let ro = Math.floor(r * 100);
  
  if (to > 75 && (lo < 25 && ro < 25))
    direction = 7;
  else if (to <= 75 && to >= 24 && (lo >= 24))
    direction = 6;
  else if (lo > 75 && (to < 25 && wo < 25))
    direction = 5;
  else if (wo <= 75 && wo >= 24 && (lo >= 24))
    direction = 4;
  else if (wo > 75 && (lo < 25 && ro < 25))
    direction = 3;
  else if (wo <= 75 && wo >= 24 && (ro >= 24))
    direction = 2;
  else if (ro > 75 && (to < 25 && wo < 25))
    direction = 1;
  else if (to <= 75 && to >= 24 && (ro >= 24))
    direction = 8;
}

function drawCircle(controller) {
  c.beginPath();
  c.fillStyle = '#aaaaaa57';
  c.arc(controller.x, controller.y, controller.r+3, 0, 2 * Math.PI);
  c.fill();
  // drawLine();
}
    
function drawLine(controller) {
  c.strokeStyle = 'white';
  c.beginPath();
  c.moveTo(controller.x, controller.y);
  if (l != 0)
    c.lineTo(controller.x-controller.r*Math.cos(rad), controller.y-controller.r*Math.sin(rad));
  else
    c.lineTo(controller.x+controller.r*Math.cos(rad), controller.y-controller.r*Math.sin(rad));
  c.stroke();
  c.closePath();
}