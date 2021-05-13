function Display(canvas) {
  
  let initialBound;
  let initialRatio;
  let bound;
  let scale = 1;
  let isFullScreen = false;
  
  function resize() {
    let newBound = canvas.getBoundingClientRect();
    if (initialRatio > newBound.width/newBound.height) {
      scale = newBound.width / initialBound.width; 
      bound.y = (newBound.height - initialBound.height * scale) / 2 + newBound.top;
      bound.x = 0;
      isFullScreen = true;
    }
    else if (initialRatio < newBound.width/newBound.height) {
      scale = newBound.height / initialBound.height; 
      bound.x = (newBound.width - initialBound.width * scale) / 2 + newBound.left;
      bound.y = 0;
      isFullScreen = true;
    } else {
      scale = 1;
      bound.x = initialBound.left;
      bound.y = initialBound.top;
      isFullScreen = false;
    }
  };
  
  function init() {
    initialBound = canvas.getBoundingClientRect();
    bound = canvas.getBoundingClientRect();
    initialRatio = bound.width / bound.height;
    window.onresize = resize;
  };
  
  
  function requestFullScreen(force = false) {
    var doc = window.document;
    var docEl = canvas;
  
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
    if(force || (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement)) {
      display.isFullScreen = true;
      requestFullScreen.call(docEl);
      setTimeout(display.resize, 1000);
      screen.orientation.lock("landscape").catch(L);
    }
    else {
      display.isFullScreen = false;
      cancelFullScreen.call(doc);
    }
  }
   
  let self = {
    init,
    bound,
    requestFullScreen,
  }
  
  Object.defineProperty(this, 'scale', {
    get: () => scale,
  });
  Object.defineProperty(this, 'isFullScreen', {
    get: () => isFullScreen,
  });
  Object.defineProperty(this, 'resize', {
    get: () => resize,
  });
  
  
  return self;
}