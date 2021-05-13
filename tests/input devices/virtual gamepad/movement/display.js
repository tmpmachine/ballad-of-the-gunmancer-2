function Display(canvas, onBoundUpdated) {
  
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
  
  function init() {
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
      resize();
    } else {
      display.isFullScreen = false;
      cancelFullScreen.call(doc);
      resize();
    }
  }
   
  let self = {
    init,
    requestFullScreen,
    bound,
    resize,
  };
  
  Object.defineProperty(self, 'scale', { get: () => scale, });
  Object.defineProperty(self, 'isFullScreen', { get: () => isFullScreen, });
  
  return self;
}