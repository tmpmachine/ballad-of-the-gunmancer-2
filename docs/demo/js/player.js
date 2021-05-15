let player = (() => {
  
  let type = 'player';
  let pos = {
    x: 120,
    y: 40,
    w: 24,
    h: 24,
    l: false,
    r: false,
  }
  let vspeed = 2;
  let hspeed = 1.6;
  let imgOffsetX = -34
  
  function snapLeft() {
    if (pos.x < 0)
      pos.x = 0
  }
  function snapTop() {
    if (pos.y < 0)
      pos.y = 0
  }
  function snapRight() {
    if (pos.x+pos.w > game.ctx.canvas.width)
      pos.x = game.ctx.canvas.width - pos.w;
  }
  function snapBottom() {
    if (pos.y+pos.h > game.ctx.canvas.height)
      pos.y = game.ctx.canvas.height - pos.h;
  }
  
  let canvas = document.createElement('canvas');
  canvas.width = pos.w;
  canvas.height = 23;
  let c = canvas.getContext('2d');
  c.imageSmoothingEnabled = false;
  
  let img = new Image();
  img.onload = function() {
    c.drawImage(img, 0, 0);

    imgIL.width = this.width;
    imgIL.height = this.height;
    imgILctx.scale(-1,1);
    imgILctx.drawImage(this,-this.width+38,0);
    // imgILctx.drawImage(this,0,0);
  };
  img.src = 'assets/idle.png';
  let frame = 0;
  let frameLen = 5;
  let frameHeight = 23;
  let tick = 0;
  let frameDuration = 8;
  
  let imgR = new Image();
  imgR.onload = function() {
    imgL.width = imgR.width;
    imgL.height = imgR.height;
    imgLctx.scale(-1,1);
    imgLctx.drawImage(imgR,-imgL.width+37,0);
  }
  imgR.src = 'assets/run.png';
  let activeImage = img;
  
  let imgL = document.createElement('canvas');
  let imgLctx = imgL.getContext('2d');
  
  
  let imgIL = document.createElement('canvas');
  let imgILctx = imgIL.getContext('2d');
  // document.body.append(imgIL)
  c.fillStyle = 'white'
  let facingLeft = false;
  let activeFrameName = 'none';
  let activeFrame = frame;
  let animation = {
    update: function(name) {
      if (activeFrameName == name && activeFrame == frame) {
        return
      }
      activeFrameName = name;
      activeFrame = frame;
      // c.fillRect(0,0,pos.w,pos.h);
      c.clearRect(0,0,pos.w,pos.h);
      switch (name) {
        case 'left':
          activeImage = imgL;
          frameLen = 4;
          // c.clearRect(0,0,pos.w,pos.h);
          c.drawImage(activeImage, imgOffsetX, -frame*frameHeight);
          break;
        case 'right':
          activeImage = imgR;
          frameLen = 4;
          // c.clearRect(0,0,pos.w,pos.h);
          c.drawImage(activeImage, imgOffsetX, -frame*frameHeight);
          break;
       case 'none':
          // c.clearRect(0,0,pos.w,pos.h);
          frameLen = 5;
          if (facingLeft) {
            activeImage = imgIL;
            c.drawImage(activeImage, imgOffsetX, -frame*frameHeight);
          } else {
            activeImage = img;
            c.drawImage(activeImage, imgOffsetX, -frame*frameHeight);
          }
          break;
      }
    }
  };
  
  let move = false;
	let canShoot = true;
	let cooldownMax = {
    shoot: 10,
  };
  let cooldown = JSON.parse(JSON.stringify(cooldownMax));
  
  // let actionState = {
  //   state: null,
  //   change: function(stateName) {
  //     this.state = actionState[stateName];
  //   },
  //   none: {
  //     update: function() {
  //       if (controls.actionA)
  //         actionState.change('shoot');
  //     }
  //   },
  //   shoot: {
  //     update: function() {
  //       if (controls.actionA) {
  //         // L('shooting')
  //         if (canShoot) {
  //           spawnObject({
  //             pos: {
  //               x: pos.x,
  //               y: pos.y,
  //             },
  //             facingLeft,
  //             name: 'bullet',
  //           });
  //           canShoot = false;
  //         } else {
  //           coolDown--;
  //           if (coolDown < 0) {
  //             coolDown = 15;
  //             canShoot = true;
  //           }
  //         }
  //       } else {
  //         actionState.change('none');
  //       }
  //     },
  //   }
  // };
  // actionState.state = actionState.none;
  
  let bodyState = {
    state: null,
    change: function(stateName) {
      this.state = bodyState[stateName];
    },
    idle: {
      update: function() {
        if (controls.left || controls.right || controls.up || controls.down)
          bodyState.change('move');
      }
    },
    move: {
      update: function() {
        move = false;
        pos.l = false;
        pos.r = false;
        pos.b = false;
        pos.t = false;

        if (controls.left) {
          oldX = pos.x
          pos.x -= vspeed;
          pos.l = true;
          animation.update('left');
          move = true;
          facingLeft = true;
        } else if (controls.right) {
          oldX = pos.x
          pos.x += vspeed;
          // snapRight();
          pos.r = true;
          animation.update('right');
          move = true;
          facingLeft = false;
        }
        
        if (controls.up) {
          oldY = pos.y
          pos.y -= hspeed;
          // snapTop()
          move = true;
          pos.t = true
          if (facingLeft)
            animation.update('left');
          else
            animation.update('right');
        } else if (controls.down) {
          oldY = pos.y
          pos.y += hspeed;
          // snapBottom();
          move = true;
          pos.b = true
          if (facingLeft)
            animation.update('left');
          else
            animation.update('right');
        }
        
        if (!move) {
          bodyState.change('idle');
          animation.update('none');
        }
      }
    },
  };
  bodyState.state = bodyState.idle;
  
  function snapWorld() {
    if (pos.l) snapLeft()
    else if (pos.r) snapRight()
    if (pos.t) snapTop()
    else if (pos.b) snapBottom()
  }
  
  
  
  // function snapObLeft() {
  //   if (pos.x < 0)
  //     pos.x = 0
  // }
  // function snapTop() {
  //   if (pos.y < 0)
  //     pos.y = 0
  // }
  function snapObRight(ob) {
    if (pos.x+pos.w > ob.pos.x)
      pos.x = ob.pos.x - pos.w;
  }
  function snapObBottom(ob) {
     if (pos.y+pos.h > ob.pos.y)
       pos.y = ob.pos.y - pos.h;
   }
   
   
   
  let oldX,oldY;
  let hitBox = {
    pos:{
      y:0,
    }
  }
   
   function isCollideTop(target) {
    if (pos.y + pos.h > target.pos.y && oldY + pos.h <= target.pos.y) {
      if (pos.x + pos.w > target.pos.x && pos.x < target.pos.x + target.pos.w) {
        pos.y = target.pos.y - pos.h;
      }
    }
  }
  
  function isCollideBottom(target) {
    if (pos.y + hitBox.pos.y < target.pos.y + target.pos.h && oldY + hitBox.pos.y >= target.pos.y + target.pos.h) {
      if (pos.x + pos.w > target.pos.x && pos.x < target.pos.x + target.pos.w) {
        pos.y = target.pos.y + target.pos.h - hitBox.pos.y;
      }
    }
  }
  
  
  function isCollideRight(target) {
    if (pos.x < target.pos.x + target.pos.w && oldX >= target.pos.x + target.pos.w && pos.y + pos.h > target.pos.y && pos.y + hitBox.pos.y< target.pos.y + target.pos.h) {
      pos.x = target.pos.x + target.pos.w;
    }
  }
  
  function isCollideLeft(target) {
    if (pos.x + pos.w > target.pos.x && oldX + pos.w <= target.pos.x && pos.y + pos.h > target.pos.y && pos.y + hitBox.pos.y < target.pos.y + target.pos.h) {
      pos.x = target.pos.x - pos.w;
    }
  }
  
  
  function handleCollision() {
    snapWorld();
    for (let i=0; i<objectPool.length; i++) {
      if (objectPool[i].type == 'box') {
          let o = objectPool[i];
          if (o.collide.top && pos.b)
            isCollideTop(o);
          else if (o.collide.bottom && pos.t)
            isCollideBottom(o);
          if (o.collide.left && pos.r)
            isCollideLeft(o);
          else if (o.collide.right && pos.l)
            isCollideRight(o);
      }
    }
  }
  
  function updateCooldown() {
    for (let key in cooldown) {
      if (cooldown[key] < cooldownMax[key]) {
        cooldown[key]++;
      } else {
        applyCooldownEffect(key);
      }
    }
  }
  
  function applyCooldownEffect(key) {
    switch (key) {
      case 'shoot':
        canShoot = true;
        break;
    }
  }
  
  function shoot(direction) {
	  if (canShoot) {
	   
	   let targetPos = {x:pos.x,y:pos.y}
	   switch (direction) {
	      case 1: targetPos.x++; break;
	      case 2: targetPos.x++;
	      case 3: targetPos.y++; break;
	      case 4: targetPos.y++;
	      case 5: targetPos.x--; break;
	      case 6: targetPos.x--;
	      case 7: targetPos.y--; break;
	      case 8: 
	        targetPos.x++; 
	        targetPos.y--; 
	      break;
	    }
	    
	    canShoot = false;
	    cooldown.shoot = 0;
  	 // let bullet = ;
  	 // bullet.setTarget(targetPos);
  	  objectPool.push(Bullet(pos.x, pos.y, targetPos));
	  }
	}
  	
  
  function updateMovement() {
    bodyState.state.update();
    updateCooldown();
    // if (pad2.isActivated) {
      // shoot(pad2.direction);
    // }
    if (direction2 > 0) {
      shoot(direction2);
    }
    // actionState.state.update();
  }
  
  let animaFrame = {
    update: function() {
      return
      if (tick < frameDuration) {
        tick++;
      } else {
        tick = 0;
        if (frame+1 < frameLen) {
          frame++;
        } else {
          frame = 0;
        }
        c.clearRect(0,0,pos.w,pos.h);
        c.drawImage(activeImage, imgOffsetX, -frame*frameHeight);
      }
      // c.beginPath();
      // c.rect(0, 0, c.canvas.width,c.canvas.height);
      // c.stroke();
    }
  };
  
  function update() {
    updateMovement();
    // handleCollision();
    animaFrame.update();
  }
  
  let self = {
    update,
    img: canvas,
  };
  
  Object.defineProperty(self, 'pos', { get: () => pos });
  Object.defineProperty(self, 'type', { get: () => type });
  
  return self;
  
})();