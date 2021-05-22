	Object.defineProperty(window, 'debug', {set: content => debugTxt.textContent = content })

let canvasPad = document.createElement('canvas');
let controller = {x: 40, y: canvas.height-40, r: 24, padding: 100};
	let controller2 = {x: 240, y: canvas.height-40, r: 24, padding: 100};
  let cp = canvasPad.getContext('2d');
  let pad = ControlPad(cp, controller, redrawPad);
  let pad2 = ControlPad(cp, controller2, redrawPad);
  let direction = 0;
  let direction2 = 0;
  
  
  
  
  	function updateControls() {
  	    controls.right = false || keyboardKeys.right;
        controls.left = false  || keyboardKeys.left;
        controls.up = false  || keyboardKeys.up;
        controls.down = false  || keyboardKeys.down;
        
        
      
      // switch (pad.direction) {
      // switch (direction) {
      //   case 1: controls.right = true; break;
      //   case 3: controls.down = true; break;
      //   case 5: controls.left = true; break;
      //   case 7: controls.up = true; break;
        
      //   case 2: 
      //     controls.right = true; 
      //     controls.down = true; 
      //     break;
      //   case 4: 
      //     controls.left = true; 
      //     controls.down = true; 
      //     break;
      //   case 6: 
      //     controls.left = true; 
      //     controls.up = true; 
      //     break;
      //   case 8: 
      //     controls.right = true; 
      //     controls.up = true; 
      //     break;
      // }
      
	}
	
	
  function redrawPad() {
	  cp.clearRect(controller.x-(controller.r+controller.padding)/2,controller.y-(controller.r+controller.padding)/2,controller.r+controller.padding,controller.r+controller.padding)
	  cp.clearRect(controller2.x-(controller2.r+controller2.padding)/2,controller2.y-(controller2.r+controller2.padding)/2,controller2.r+controller2.padding,controller2.r+controller2.padding)
    pad.drawCircle();
    pad2.drawCircle();
	}
	
	redrawPad()

// let paused = true;
let renderCanvas = document.createElement('canvas');
  renderCanvas.width = 720;
  renderCanvas.height = 300;
  
  let cr = canvas.getContext('2d');
  cr.imageSmoothingEnabled = false;
  let c = renderCanvas.getContext('2d');
  c.imageSmoothingEnabled = false;
  
  
  let touches = [];
  function touch_fun(event) {
  	touches = event.touches;
  	event.preventDefault();
  }
  // canvas.addEventListener('touchstart', touch_fun, false);
  // canvas.addEventListener('touchmove', touch_fun, false);
  // canvas.addEventListener('touchenter', touch_fun, false);
  // canvas.addEventListener('touchend', touch_fun, false);
  // canvas.addEventListener('touchleave', touch_fun, false);
  // canvas.addEventListener('touchcancel', touch_fun, false);
  
  // canvas.addEventListener('touchstart', pad.start);
  // document.addEventListener('touchend', pad.end);
  // document.addEventListener('touchmove', pad.move);
  
  // canvas.addEventListener('touchstart', pad2.start);
  // document.addEventListener('touchend', pad2.end);
  // document.addEventListener('touchmove', pad2.move);
  
  
let paused = false;
  let display = new Display(canvas, onBoundUpdated);
  function onBoundUpdated(bound, scale) {
    // c.imageSmoothingEnabled = false;
    // cr.imageSmoothingEnabled = false
	  controller.sensor.x = 40*scale + bound.x;
	  controller.sensor.y = (canvas.height-40)*scale + bound.y;
	  controller.sensor.r = 24*scale
	  controller.sensor.padding = 100*scale
	  
	  controller2.sensor.x = controller2.x*scale + bound.x;
	  controller2.sensor.y = (canvas.height-40)*scale + bound.y;
	  controller2.sensor.r = 24*scale
	  controller2.sensor.padding = 100*scale
	}
	let crosshairs = Crosshairs();
	
	
function Crosshairs() {
	  let pos = {
  	  x: 0, 
  	  y: 0,
  	  w: 10,
  	  h: 10,
  	};

  function snapToWorldEdge() {
	  if (pos.x < 0)
  	   pos.x = 0;
  	else if (pos.x+pos.w > viewport.x+viewport.width)
  	   pos.x = (viewport.x+viewport.width) - pos.w;
   	if (pos.y < 0)
  	   pos.y = 0;
    else if (pos.y+pos.h > viewport.y+viewport.height)
  	   pos.y = (viewport.y+viewport.height) - pos.h;
	}

  	function update() {
  	  pos.x = mouseInput.pos.x+viewport.x;
  	  pos.y = mouseInput.pos.y+viewport.y;
  	  snapToWorldEdge();
  	}
  	
	  let self = {
	    pos,
	    update,
	  }
	  
	  return self;
	}

let cam = Camera(player);
let objectPool = [player, cam];
	let viewport = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
  }
  
  let area = 
    {
      x: 0,
      y: 0,
      width: 360,
      height: canvas.height,
    };
    
  function unlockAreaX() {
    area.width += 240
    cam.pos.x -=((cam.pos.x-viewport.x)-viewport.width/2)
	}
	
	function unlockAreaY() {
    area.height += 150
    cam.pos.y -=((cam.pos.y-viewport.y)-viewport.height/2)
	}
	
  
function Camera(target) {
    let pos = {
      x: 0,
      y: 0,
      w:5,
      h:5,
    }
    
    function update() {
      // snap cam to world edge
      // if (viewport.x > pos.x)
      // pos.x += (Math.max(target.pos.x, viewport.x) - pos.x) * 0.05
      // else
      pos.x += (target.pos.x - pos.x) * 0.05
       
      pos.y += (target.pos.y - pos.y) * 0.05
    }
      
    let self = {
      pos,
      update,
      type: 'cam'
    };
    
    return self;
	}


const game = (() => {
  
  
  Object.defineProperty(window, 'debug1', {set:txt=>$('#debug1').textContent = txt});
  Object.defineProperty(window, 'debug2', {set:txt=>$('#debug2').textContent = txt});
  Object.defineProperty(window, 'debug3', {set:txt=>$('#debug3').textContent = txt});
  Object.defineProperty(window, 'debug4', {set:txt=>$('#debug4').textContent = txt});
  
  function drawCrosshairs() {
	  crosshairs.update();
	  c.beginPath();
	  c.moveTo(crosshairs.pos.x+5, crosshairs.pos.y)
	  c.lineTo(crosshairs.pos.x+5, crosshairs.pos.y+10)
	  c.moveTo(crosshairs.pos.x, crosshairs.pos.y+5)
	  c.lineTo(crosshairs.pos.x+10, crosshairs.pos.y+5)
	  c.stroke();
	 // c.fillRect(crosshairs.pos.x, crosshairs.pos.y, crosshairs.pos.w, crosshairs.pos.h);
	}
  
  let unlocked =false;
  let unlockedY =false;
  
  function checkUnlockedArea() {
    if (!unlocked && player.pos.x > 300) {
      unlocked = true;
      unlockAreaX();
    }
    
    if (!unlockedY && player.pos.y > 130) {
      unlockedY = true;
      unlockAreaY();
    }
  }
  
  let background = document.createElement('canvas');
  let bg = background.getContext('2d');
  bg.fillStyle = 'white';
  bg.fillRect(0,0,300,150);
    
    
  function calc(e,sx,sy) {
    let a = e.pageY - sy;
    let b = e.pageX - sx;
    let c = Math.sqrt(a*a + b*b);
  
    rad = Math.asin(a*-1 / c);
    u = 0;
    r = 0;
    l = 0;
    bottom = 0;
    let direction = 0;
    
    if (e.pageY < sy) {
      u = rad/1.5;
      if (e.pageX >= sx) {
        r = 1-u;
      } else if (e.pageX < sx) {
        l = 1-u;
      }
    } else if (e.pageY == sy) {
      // debug = 2
      if (e.pageX > sx)
        r = 1-bottom;
      else if (e.pageX < sx)
        l = 1-bottom;
    } else if (e.pageY > sy) {
      // debug = 3
      bottom = rad/1.5*-1;
      if (e.pageX > sx)
        r = 1-bottom;
      else if (e.pageX < sx)
        l = 1-bottom;
    }
    if (u > .75 && (l < .25 && r < .25))
      direction = 7;
    else if (u <= .75 && u >= .24 && (l >= .24))
      direction = 6;
    else if (l > .75 && (u < .25 && bottom < .25))
      direction = 5;
    else if (bottom <= .75 && bottom >= .24 && (l >= .24))
      direction = 4;
    else if (bottom > .75 && (l < .25 && r < .25))
      direction = 3;
    else if (bottom <= .75 && bottom >= .24 && (r >= .24))
      direction = 2;
    else if (r > .75 && (u < .25 && bottom < .25))
      direction = 1;
    else if (u <= .75 && u >= .24 && (r >= .24))
      direction = 8;
    return direction
  }
    
  function updateControl()
  {
  // 	for( var k in keys)
  // 	{
  // 		$(k).style.background = '';
  		direction = 0;
  		  direction2 = 0;
  		for (i=0; i<touches.length; i++)
  		{
  			var T=touches[i];
  			switch (T.identifier) {
  			  case 0:
      		  direction = calc(T, controller.x, controller.y)
  			    break;
  			  case 1:
      		  direction2 = calc(T, controller2.x, controller2.y)
  			    break;
  			}
  		// 	L(T)
  		// 	if( point_in_rect(T.clientX,T.clientY))
  		// 	{
  				// $(k).style.background = '#AAF';
  				// move(k);
  		// 	}
  		}
  // 	}
  }
  // setInterval(updateControl,1000/30);
    
  function animate() {
    window.requestAnimationFrame(animate);
    if (paused)
      return;
    // checkUnlockedArea();
    c.fillStyle = 'white'
	  c.fillRect(viewport.x,viewport.y,c.canvas.width,c.canvas.height)
	  c.fillStyle = 'black'
	  
    // c.drawImage(background,viewport.x,viewport.y)
    c.drawImage(world, 0, 0);
    updateControls();
    for (var i = 0; i < objectPool.length; i++) {
      // if (objectPool[i].isRemoved) {
      //   objectPool.splice(i, 1);
      //   i--;
      //   continue;
      // }
      objectPool[i].update();
      
      if (objectPool[i].isNotRendered)
        continue
      
      if (objectPool[i].type == 'Bullet') {
        c.fillRect(objectPool[i].pos.x, objectPool[i].pos.y, 10, 10);
      }
      if (objectPool[i].type == 'cam') {
        c.fillRect(objectPool[i].pos.x, objectPool[i].pos.y, 5,5);
      } else {
        c.drawImage(objectPool[i].img, objectPool[i].pos.x, objectPool[i].pos.y);
        // c.fillRect(objectPool[i].pos.x, objectPool[i].pos.y, 10, 10);
      }
      
      
      // if (objectPool[i].type == 'enemy') {
        // drawPath(objectPool[i]);
      // }
    }
    
	  drawCrosshairs()
    
	  viewport.x = cam.pos.x-viewport.width/2
	  viewport.y = cam.pos.y-viewport.height/2
	 // snapCamToWorldEdge();
	  snapCamToArea();
	  
	  cr.drawImage(c.canvas, viewport.x, viewport.y, viewport.width, viewport.height, 0, 0, viewport.width, viewport.height);
    cr.drawImage(canvasPad,0,0)
    // if (pad.isActivated)
    //   cr.fillRect(10,10,10,10);
    // if (pad2.isActivated)
    //   cr.fillRect(30,10,10,10);
    // drawWorldGrid();
  }
  
  function snapCamToArea() {
	  if (viewport.x < area.x)
  	   viewport.x = area.x;
  	else if (viewport.x+viewport.width > area.width)
  	   viewport.x = (area.x+area.width) - viewport.width;
   	if (viewport.y < area.y)
  	   viewport.y = area.y;
    else if (viewport.y+viewport.height > area.height)
  	   viewport.y = (area.y+area.height) - viewport.height;
	}
  
  function drawPath(enemy) {
      c.beginPath();
    	for (rp=0; rp<enemy.path.length; rp++) {
    		c.rect(enemy.path[rp][0]*tileWidth,
    		enemy.path[rp][1]*tileHeight,
    		tileWidth, tileHeight);
    	}		
    	c.stroke();
    	pause = true
  }

  function start() {
    drawGameWorld();
    animate();
    attachListener();
    window.world = ww;
    // objectPool.push(Enemy(150,150))
    // objectPool.push(Enemy(50, 20));
    // objectPool.push(Enemy(10, 100));
  }
  
  let ww = []
  while (ww.length < 30) {
    let a = []
    while (a.length < 20)
      a.push([0]);
    ww.push(a);
  }
  
  function drawWorldGrid() {
    c.beginPath();
    let tilez = 32;
    for (var i = 0; i < ww.length; i++) {
      for (var j = 0; j < ww[i].length; j++) {
        c.rect(i*tilez,j*tilez,tilez,tilez)
        if (ww[i][j] == 1)
          c.fillRect(i*tilez,j*tilez,tilez,tilez)
      }
    }
    c.stroke();
  }
  
  let world = document.createElement('canvas');
  let w = world.getContext('2d');
  w.imageSmoothingEnabled = false
  
  function drawGameWorld() {
    fetch('data/atlas.json').then(r=>r.json()).then(json => {
      L(json);
      let img = new Image();
      img.src = json.tileset;
      let tileSize = 32;
      img.onload = function() {
        for (var i = 0; i < json.tiles[0].length; i++) {
          let tile = json.tiles[0][i];
          let x = tile[0]*tileSize;
          let y = tile[1]*tileSize;
          w.drawImage(img, 0,0, 16,16,x,y,tileSize,tileSize);
        }
        
         for (var i = 0; i < json.objects.length; i++) {
          let tile = json.objects[i];
          let x = tile[0]*tileSize;
          let y = tile[1]*tileSize;
          let type = tile[2];
          ww[tile[0]][tile[1]] = 1;
          return
          objectPool.push(box2({
            pos:{
              x,
              y,
              w:tileSize,
              h:tileSize
            },
            collide: {
              top: [0,4,5,8,10,11,13,14].includes(type),
              left: [1,4,5,6,9,10,11,12].includes(type),
              bottom: [2,4,6,7,11,12,13,14].includes(type),
              right: [3,4,7,8,9,10,12,13].includes(type),
            }
          }));
        }
      };
    });
  }
  
  self = {
    ctx: c,
    start,
    world: ww,
  };
  
  return self;
  
})();