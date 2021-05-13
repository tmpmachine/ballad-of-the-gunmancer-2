let mouseInput = (function() {
  
  let pos = {
    x: 0,
    y: 0,
  }
  
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
    pos.x = e.clientX;
    pos.y = e.clientY;
  }

  window.addEventListener('mousemove', handler);
  window.addEventListener('mousedown', handler);
  window.addEventListener('mouseup', handler);

  let self = {
    pos,    
  };
  
  return self;

})();