function Item(x, y) {
  let pos = {
	  x, 
	  y,
	  w: 10,
	  h: 10,
	};
  
  let self = {
    pos,
    update,
    type: 'item',
  }
  
	function update() {
  }
  
  return self;
}