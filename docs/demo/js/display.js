function Display(canvas) {
  
  let initialBound = canvas.getBoundingClientRect();
  let initialRatio = canvas.width/canvas.height;
  let bound = canvas.getBoundingClientRect();
  let scale = 1;
  let isFullScreen = false;
  
  function resize() {
    let newBound = canvas.getBoundingClientRect();
    if (initialRatio > newBound.width/newBound.height) {
      scale = newBound.width / initialBound.width; 
      bound.y = (newBound.height - initialBound.height * scale) / 2 + newBound.top;
      bound.x = 0;
    }
    else if (initialRatio < newBound.width/newBound.height) {
      scale = newBound.height / initialBound.height; 
      bound.x = (newBound.width - initialBound.width * scale) / 2 + newBound.left;
      bound.y = 0;
    } else {
      scale = 1;
      bound.x = initialBound.left;
      bound.y = initialBound.top;
    }
    if (typeof(onBoundUpdated) != 'undefined')
      onBoundUpdated(bound, scale);
  };
  
  window.onresize = resize;
  
  function requestFullScreen(force = false) {
    var doc = window.document;
    var docEl = canvas;
  
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
    if(force || (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement)) {
      isFullScreen = true;
      requestFullScreen.call(docEl);
      setTimeout(display.resize, 1000);
      canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
      canvas.requestPointerLock();
      screen.orientation.lock("landscape").catch(L);
      resize();
    }
    else {
      isFullScreen = false;
      cancelFullScreen.call(doc);
      resize();
    }
  }
  
  canvas.addEventListener('click', function() {
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    canvas.requestPointerLock();
  });
  
  function updatePosition(e) {
    mouseInput.pos.x += e.movementX * 1/scale;
    mouseInput.pos.y += e.movementY * 1/scale;
  }
  
  function lockChangeAlert() {
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
      console.log('The pointer lock status is now locked');
      mouseInput.isPointerLocked = true;
      document.addEventListener("mousemove", updatePosition, false);
    } else {
      mouseInput.isPointerLocked = false;
      console.log('The pointer lock status is now unlocked');
      document.removeEventListener("mousemove", updatePosition, false);
    }
  }
  
  document.addEventListener('pointerlockchange', lockChangeAlert, false);
  document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
   
  let self = {
    bound,
    requestFullScreen,
  }
  
  Object.defineProperty(self, 'scale', { get: () => scale, });
  Object.defineProperty(self, 'isFullScreen', { get: () => isFullScreen, });
  
  return self;
}