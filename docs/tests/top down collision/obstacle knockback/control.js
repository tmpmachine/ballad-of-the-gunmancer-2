let handleKey = function() { };
let keys = {};
let controls = {
  left: false,
  right: false,
  up: false,
  down: false,
  actionA: false,
};

function attachListener() {
  
  let horizontalMovementState = {
    state: null,
    controls: {
      left: false,
      rigt: false,
    },
    none: function(e) {
      if (e.type == 'keydown') {
        switch(e.key) {
          case 'a': 
            this.controls.left = true;
            this.change('left');
            break;
          case 'd': 
            this.controls.right = true;
            this.change('right');
            break;
        }
      }
    },
    left: function(e) {
      switch(e.key) {
        case 'd': 
          if (e.type == 'keydown') {
            this.controls.right = true;
            this.change('right');
          } else if (e.type == 'keyup') {
            this.controls.right = false;
          }
          break;
        case 'a':
          if (e.type == 'keyup') {
            if (this.controls.right) {
              this.controls.left = false;
              this.controls.right = true;
              this.change('right');
            } else {
              this.controls.left = false;
              this.change('none');
            }
          }
          break;
      }
    },
    right: function(e) {
      switch(e.key) {
        case 'a': 
          if (e.type == 'keydown') {
            this.controls.left = true;
            this.change('left');
          } else if (e.type == 'keyup') {
            this.controls.left = false;
          }
          break;
        case 'd':
          if (e.type == 'keyup') {
            if (this.controls.left) {
              this.controls.left = true;
              this.controls.right = false;
              this.change('left');
            } else {
              this.controls.right = false;
              this.change('none');
            }
          }
          break;
      }
    },
    change: function(stateName) {
      switch (stateName) {
        case 'none':
          controls.left = false;
          controls.right = false;
          break;
        case 'left':
          controls.left = true;
          controls.right = false;
          break;
        case 'right':
          controls.left = false;
          controls.right = true;
          break;
      }
      this.state = this[stateName];
    }
  };
  horizontalMovementState.state = horizontalMovementState.none;
  
  
  let verticalMovementState = {
    state: null,
    controls: {
      up: false,
      down: false,
    },
    none: function(e) {
      if (e.type == 'keydown') {
        switch(e.key) {
          case 'w': 
            this.controls.up = true;
            this.change('up');
            break;
          case 's': 
            this.controls.down = true;
            this.change('down');
            break;
        }
      }
    },
    up: function(e) {
      switch(e.key) {
        case 's': 
          if (e.type == 'keydown') {
            this.controls.down = true;
            this.change('down');
          } else if (e.type == 'keyup') {
            this.controls.down = false;
          }
          break;
        case 'w':
          if (e.type == 'keyup') {
            if (this.controls.down) {
              this.controls.up = false;
              this.controls.down = true;
              this.change('down');
            } else {
              this.controls.up = false;
              this.change('none');
            }
          }
          break;
      }
    },
    down: function(e) {
      switch(e.key) {
        case 'w': 
          if (e.type == 'keydown') {
            this.controls.up = true;
            this.change('up');
          } else if (e.type == 'keyup') {
            this.controls.up = false;
          }
          break;
        case 's':
          if (e.type == 'keyup') {
            if (this.controls.up) {
              this.controls.up = true;
              this.controls.down = false;
              this.change('up');
            } else {
              this.controls.down = false;
              this.change('none');
            }
          }
          break;
      }
    },
    change: function(stateName) {
      switch (stateName) {
        case 'none':
          controls.up = false;
          controls.down = false;
          break;
        case 'up':
          controls.up = true;
          controls.down = false;
          break;
        case 'down':
          controls.up = false;
          controls.down = true;
          break;
      }
      this.state = this[stateName];
    }
  };
  verticalMovementState.state = verticalMovementState.none;
  
  let actionState = {
    state: null,
    controls: {
      actionA: false,
    },
    none: function(e) {
      if (e.type == 'keydown') {
        switch(e.key) {
          case 'k': 
            this.controls.actionA = true;
            this.change('actionA');
            break;
        }
      }
    },
    actionA: function(e) {
      switch(e.key) {
        case 'k':
          if (e.type == 'keyup') {
            this.controls.actionA = false;
            this.change('none');
          }
          break;
      }
    },
    change: function(stateName) {
      switch (stateName) {
        case 'none':
          controls.actionA = false;
          break;
        case 'actionA':
          controls.actionA = true;
          break;
      }
      this.state = this[stateName];
    }
  };
  actionState.state = actionState.none;
  
  
  let handler = function(e) {
    horizontalMovementState.state(e);
    verticalMovementState.state(e);
    actionState.state(e);
  };
  
  function reset() {
    for (let key in controls) {
      controls[key] = false; 
    }
  }
  
  window.addEventListener('keydown', handler);
  window.addEventListener('keyup', handler);
  window.addEventListener('blur', reset);
}