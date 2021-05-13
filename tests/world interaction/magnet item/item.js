function Item(x, y) {
  let pos = {
	  x, 
	  y,
	  w: 10,
	  h: 10,
	};
	let hp = 100;
  
  let self = {
    pos,
    update,
    interact,
    type: 'coin',
    isRemoved: false,
  }
  let target = null;
  
	function update() {
    if (target === null) {
      checkDistance();
    } else {
      followPlayer();
      handleCollision();
    }
  }
  
  function checkDistance() {
    let a = pos.x - player.pos.x;
    let b = pos.y - player.pos.y;
    let c = Math.sqrt( a*a + b*b );
    if (c < 50)
      target = player;
  }
  
  
  function followPlayer() {
    pos.x += (target.pos.x - pos.x) * 0.3;
    pos.y += (target.pos.y - pos.y) * 0.3;
  }
	
  function receiveDamage(damage) {
	  hp -= damage;
	  if (hp < 0)
	    self.isRemoved = true;
	}
	
	function interact(actionType, data) {
	  switch (actionType) {
	    case 'receive-damage':
	      receiveDamage(data);
	      break;
	  }
	}  	
	
	function handleCollision() {
     if (target.pos.x < pos.x + pos.w &&
       target.pos.x + target.pos.w > pos.x &&
       target.pos.y < pos.y + pos.h &&
       target.pos.y + target.pos.h > pos.y) {
        self.isRemoved = true;
    }
  }
	
  
  return self;
}