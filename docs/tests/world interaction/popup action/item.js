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
    type: 'coin',
    isRemoved: false,
  }
  let popup = Popup(x,y-20);
  object.push(popup)
  let isPopupToggled = false;
  
	function update() {
    let d = checkDistance();
    
    if (d < 50) {
      togglePopup(true);
    } else {
      togglePopup(false);
    }
  }
  
  function togglePopup(isShow) {
    if (!isPopupToggled && isShow) {
      popup.isRemoved = false;
      isPopupToggled = true;
    } else if (isPopupToggled && !isShow) {
      popup.isRemoved = true;
      isPopupToggled = false;
    }
  }
  
  function checkDistance() {
    let a = pos.x - player.pos.x;
    let b = pos.y - player.pos.y;
    let c = Math.sqrt( a*a + b*b );
    return c;
  }
  
  return self;
}

function Popup(x, y) {
  let pos = {
	  x, 
	  y,
	  w: 10,
	  h: 10,
	};
  
  let self = {
    pos,
    update,
    type: 'popup',
    isRemoved: true,
  }
  
	function update() {
  }
  
  return self;
}