function isCollide(rect1,rect2) {
  if (rect1.pos.x < rect2.pos.x + rect2.pos.w &&
     rect1.pos.x + rect1.pos.w > rect2.pos.x &&
     rect1.pos.y < rect2.pos.y + rect2.pos.h &&
     rect1.pos.y + rect1.pos.h > rect2.pos.y) {
      return true
  }
  return false
}

function spawnObject(data) {
  objectPool.push(bullet({
    pos:data.pos,
    facingLeft:data.facingLeft,
  }));
}