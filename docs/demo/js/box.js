function box2(data = {}) {
  
  let type = 'box';
  let hp = 100;
  let isRemoved = false;
  let pos = {
    x: 150,
    y: 70,
    w: 30,
    h: 30,
  };
  let collide = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  }
  
  if (data.pos) {
    for (let key in data.pos) {
      pos[key] = data.pos[key]
    }
  }
  if (data.collide) {
    for (let key in data.collide) {
      collide[key] = data.collide[key]
    }
  }
  
  
  let img = document.createElement('canvas');
  img.width = pos.w;
  img.height = pos.h;
  let c = img.getContext('2d');
  // c.fillRect(0,0,pos.w,pos.h)

  function update() {
    
  }
  
  function collided(ob) {
    switch (ob.type) {
      case 'bullet':
        hp -= 20;
        pos.x += 2;
        if (hp < 0) {
          destroySelf();
        }
        break;
    }
  }
  
  function destroySelf() {
    isRemoved = true;
  }
  
  let self = {
    update,
    img,
    collided,
  };
  
  Object.defineProperty(self, 'pos', { get: () => pos });
  Object.defineProperty(self, 'type', { get: () => type });
  Object.defineProperty(self, 'isRemoved', { get: () => isRemoved });
  Object.defineProperty(self, 'collide', { get: () => collide });
  
  return self;
}

function box(data = {}) {
  
  let type = 'box';
  let hp = 100;
  let isRemoved = false;
  let pos = {
    x: 150,
    y: 70,
    w: 30,
    h: 30,
  };
  
  if (data.pos) {
    for (let key in data.pos) {
      pos[key] = data.pos[key]
    }
  }
  
  
  let img = document.createElement('canvas');
  img.width = 30;
  img.height = 30;
  let c = img.getContext('2d');
  c.fillRect(0,0,30,30)

  function update() {
    
  }
  
  function collided(ob) {
    switch (ob.type) {
      case 'bullet':
        hp -= 20;
        pos.x += 2;
        if (hp < 0) {
          destroySelf();
        }
        break;
    }
  }
  
  function destroySelf() {
    isRemoved = true;
  }
  
  let self = {
    update,
    img,
    collided,
  };
  
  Object.defineProperty(self, 'pos', { get: () => pos });
  Object.defineProperty(self, 'type', { get: () => type });
  Object.defineProperty(self, 'isRemoved', { get: () => isRemoved });
  Object.defineProperty(self, 'collide', { get: () => collide });
  
  return self;
}