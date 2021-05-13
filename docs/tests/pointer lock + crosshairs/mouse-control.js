let mouseInput = (function() {
  
  let pos = {
    x: 0,
    y: 0,
  }
  let isPointerLocked = false; 
  
  function handler(e) {
    switch (e.type) {
      case 'mousedown':
        controls.actionA = true;
        updatePosition(e);
        break;
      case 'mouseup':
        controls.actionA = false;
        updatePosition(e);
        break;
      case 'mousemove':
        updatePosition(e);
        break;
    }
  }

  function updatePosition(e) {
    if (isPointerLocked)
      return;
    pos.x = e.clientX;
    pos.y = e.clientY;
  }

  window.addEventListener('mousemove', handler);
  window.addEventListener('mousedown', handler);
  window.addEventListener('mouseup', handler);

  let self = {
    pos,
  };
  
  Object.defineProperty(self, 'isPointerLocked', {set: (state) => isPointerLocked = state});
  
  return self;

})();