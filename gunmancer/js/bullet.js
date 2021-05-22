	function Bullet(x, y, target) {
	  
	  let pos = {
  	  x, 
  	  y,
  	  w: 10,
  	  h: 10,
  	};
  // 	let target = {
  // 	  x,
  // 	  y,
  // 	}
  	let velocity = {x:0, y:0};
  	let bulletSpeed = 5;
    let deltaX, deltaY, velocityScale;
	  let damage = 74;
	
	let img = document.createElement('canvas');
//   img.width = 10;
//   img.height = 10;
//   let c = img.getContext('2d');
//   c.fillRect(0,0,pos.w,pos.h)
    
  	function update() {
  	  
      pos.x += velocity.x;
      pos.y += velocity.y;
      
      // if (pos.x < viewport.x || 
      //     pos.y < viewport.y || 
      //     pos.x > viewport.x + viewport.width || 
      //     pos.y > viewport.y + viewport.height )
        // continue
        // self.isNotRendered = true;
      
      // for (var i = 0; i < objectPool.length; i++) {
        // if (objectPool[i] !== self) {
          // if (['player','bullet','cam'].indexOf(objectPool[i].type) < 0 && isCollide(objectPool[i], self)) {
            // destroySelf();
            // objectPool[i].collided(self);
          // }
        // }
      // }
  	}
  	
  	
  // 	function setTarget(target) {
      deltaX = target.pos.x - x;
      deltaY = target.pos.y - y;
      let magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      velocityScale = bulletSpeed / magnitude;
      velocity.x = deltaX * velocityScale;
      velocity.y = deltaY * velocityScale;
  // 	}

  	 function destroySelf() {
    self.isRemoved = true;
  }
  	
	  let self = {
	    pos,
	    update,
	    isRemoved: false,
	   // setTarget,
  	   isNotRendered: false,
	    img,
	    type: 'Bullet'
	  }
	  
  	
	  return self;
	}

// function Bullet(data) {
  
//   let type = 'bullet';
//   let isRemoved = false;
//   let facingLeft = false;
//   let pos = {
//     x: 10,
//     y: 10,
//     w: 15,
//     h: 8,
//   };
  
//   if (data.pos) {
//     for (let key in data.pos) {
//       pos[key] = data.pos[key]
//     }
//   }
//   if (typeof(data.facingLeft) != 'undefined')
//     facingLeft = data.facingLeft;
  
//   let img = document.createElement('canvas');
//   img.width = 10;
//   img.height = 10;
//   let c = img.getContext('2d');
//   c.fillRect(0,0,pos.w,pos.h)
//   let speed = 5;
  
//   function update() {
//     if (facingLeft)
//       pos.x -= speed;
//     else
//       pos.x += speed;
//     for (var i = 0; i < objectPool.length; i++) {
//       if (objectPool[i] !== self) {
//         if (['player','bullet'].indexOf(objectPool[i].type) < 0 && isCollide(objectPool[i], self)) {
//           destroySelf();
//           objectPool[i].collided(self);
//         }
//       }
//     }
//   }
  
//   function destroySelf() {
//     isRemoved = true;
//   }
  
//   let self = {
//     update,
//     img
//   };
  
//   Object.defineProperty(self, 'pos', { get: () => pos });
//   Object.defineProperty(self, 'type', { get: () => type });
//   Object.defineProperty(self, 'isRemoved', { get: () => isRemoved });
  
//   return self;
// }