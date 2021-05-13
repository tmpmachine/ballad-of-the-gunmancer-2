function ControlPad(c, controller, redraw) {
  
  let isLocked = false;
  let touchId = [];
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
  let touchPadId = -1;
  let direction = 0;
  if (typeof(controller.sensor) == 'undefined') {
    controller.sensor = JSON.parse(JSON.stringify(controller));
  }
  
  function hasTouchId(id) {
    return touchId.indexOf(id) >= 0;
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

    direction = 0;
    redraw();

    if (e.changedTouches) {
      for (let touch of e.changedTouches) {
        if (hasTouchId(touch.identifier)) {
          isDrag = false;
          touchId.length = 0;
          break;
        }
      }
    } else {
      isDrag = false;
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
      redraw();
      drawLine();
    } 
  }
  
  function drawCircle() {
    c.beginPath();
    c.fillStyle = '#aaaaaa57';
    c.arc(controller.x, controller.y, controller.r+3, 0, 2 * Math.PI);
    c.fill();
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
    
    touchId.length = 0;
    
    let dragMode = false;
    let dX;
    let dY;
    let touchPad = null;
    let touchCount = 0;
    
    if (e.changedTouches) {
      let touches = [];
      for (let touch of e.targetTouches) {
        let isAvailable = checkAvailability(touch);
        if (!isAvailable)
          continue;
        
        touches.push(touch)
        touchCount++;
        
        touchId.push(touch.identifier);
        
        let x = touch.pageX;
        let y = touch.pageY;
        let d = Math.sqrt(Math.pow(controller.sensor.x - x, 2) + Math.pow(controller.sensor.y - y, 2));

        if (touchPad === null && d < controller.sensor.r + 30) {
          dX = x;
          dY = y;
          touchPadId = touch.identifier;
          touchPad = touch;    
        }
      }
      
      if (touchCount === 2) {
        dX = touches[0].pageX;
        dY = touches[0].pageY;
        touchPadId = touches[0].identifier;
        dragMode = true;
      }
      
    }
    
    if (touchPad !== null || dragMode) {
      isDrag = true;
      movement.x = dX;
      movement.y = dY;
      calc(dX, dY);
      redraw();
      drawLine();
    }
  }

  function checkMultiTouch(e) {
    if (isLocked)
      return;
    
    if (!isDrag)
      return
      
    if (e.changedTouches) {
      let id;
      // debug1.textContent = touchId
      for (let touch of e.changedTouches) {
        if (touch.identifier === touchPadId) {
          movement(touch);
          break;
        }
      }
    } else {
      movement(e);
    }
  }
  
  let touchWait;
  function proxyStartMovement(e) {
    e.preventDefault();
    window.clearTimeout(touchWait);
    touchWait = window.setTimeout(() => {
      startMovement(e);
    }, 50);
  }
  
  function checkAvailability(targetTouches) { 
    return true 
  }
  
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
    touchId,
    hasTouchId,
    drawCircle,
    checkAvailability,
    start: proxyStartMovement,
    end: stopMovement,
    move: checkMultiTouch,
  };
  
  Object.defineProperty(self, 'direction', { get: () => direction, });
  Object.defineProperty(self, 'isDrag', { get: () => isDrag, });
  Object.defineProperty(self, 'checkAvailability', { set: (handler) => checkAvailability = handler, });
  
  return self; 
}