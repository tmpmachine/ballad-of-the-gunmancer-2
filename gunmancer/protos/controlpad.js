function ControlPad(c, controller, redraw) {
  
  let isLocked = false;
  let isDrag = false;
// 	let cam = {
// 	  x: 0,
// 	  y: 0,
// 	};
  let rad = 0;
  let u = 0;
  let r = 0;
  let l = 0;
  let bottom = 0;
  let touchId = -1;
  let direction = 0;
  if (typeof(controller.sensor) == 'undefined') {
    controller.sensor = JSON.parse(JSON.stringify(controller));
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

  function stopMovement(e) {
    if (!isDrag)
      return

    // redraw();
      for (let touch of e.changedTouches) {
        if (touch.identifier === touchId) {
          isDrag = false;
          touchId = -1;
          touchPad = null;
          direction = 0;
          self.isActivated = false;
          break;
        }
      }
  }
  
  function movement(e) {
    
    if (isLocked)
      return;
      
    let dX = e.pageX;
    let dY = e.pageY;
    
   if (isDrag) {
      // cam.x += movement.x - dX;
      // cam.y += movement.y - dY;
      movement.x = dX;
      movement.y = dY;
      calc(dX, dY);
      // redraw();
    } 
  }
  
  let cc = document.createElement('canvas');
  cc.width = (controller.r+3)*2;
  cc.height = (controller.r+3)*2;
  let d = cc.getContext('2d');
  d.beginPath();
  d.fillStyle = '#aaaaaa57';
  d.arc(cc.width/2, cc.height/2, controller.r+3, 0, 2 * Math.PI);
  d.fill();
  let posX = controller.x-cc.width/2;
  let posY = controller.y-cc.height/2;
  
  function drawCircle() {
    c.drawImage(cc,posX,posY);
    drawLine();
  }
      
  function drawLine() {
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
  
  function startMovement(e) {
   
    if (isLocked)
      return
   
    if (isDrag)
      return
      
    if (touchId > 0)
      return
    
    touchId = -1;
    
    let dragMode = false;
    let touchPad = null;
    
    for (let touch of e.changedTouches) {
      let x = touch.pageX;
      let y = touch.pageY;
      if (inbox(x,y)) {
        // let d = Math.sqrt(Math.pow(controller.sensor.x - x, 2) + Math.pow(controller.sensor.y - y, 2));
        // if (d < controller.sensor.r + 30) {
          touchId = touch.identifier;
          touchPad = touch;
          
          self.isActivated = true;
          isDrag = true;
          movement.x = x;
          movement.y = y;
          calc(x, y);
          // redraw();
          break;
        // }
      }
    }
  }
  
  function inbox(x,y) {
    if (x > controller.sensor.x-controller.sensor.r &&
        x < controller.sensor.x+controller.sensor.r*2 &&
        y > controller.sensor.y-controller.sensor.r &&
        y < controller.sensor.y+controller.sensor.r*2) {
          return true
        }
        return false
  }

  function checkMultiTouch(e) {
    if (isLocked)
      return;
    
    if (!isDrag)
      return
      
      for (let touch of e.changedTouches) {
        if (touch.identifier === touchId) {
          movement(touch);
          break;
        }
      }
  }
  
  // let touchWait;
  // function proxyStartMovement(e) {
    // e.preventDefault();
    // window.clearTimeout(touchWait);
    // touchWait = window.setTimeout(() => {
      // startMovement(e);
    // }, 50);
  // }
  
  
  function lock() {
    isLocked = true;
  }
  
  function unlock() {
    isLocked = false;
  }
  
  let self = {
    // cam,
    lock,
    unlock,
    drawCircle,
    isActivated: false,
    start: startMovement,
    end: stopMovement,
    move: checkMultiTouch,
  };
  
  Object.defineProperty(self, 'direction', { get: () => direction, });
  Object.defineProperty(self, 'isDrag', { get: () => isDrag, });
  Object.defineProperty(self, 'touchId', { get: () => touchId, });
  
  return self; 
}