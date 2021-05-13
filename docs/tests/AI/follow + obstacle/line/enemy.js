

function Enemy(x=150,y=50) {
  
  let type = 'enemy';
  let isRemoved = false;
  // let state = new State();
  let hp = 30;
  let pos = {
    x,
    y,
    w: 10,
    h: 10,
    l: false,
    r: false,
  }
  let imgOffsetX = -34
  
  let vSpeed = 0.3;
  // let vSpeed = 2;
  let hSpeed = 0.5;
  // let hSpeed = 2;
  
  let controls = {
    left: false,
    right: false,
    up: false,
    down: false,
  }
  
  let frame = 0;
  let frameLen = 5;
  let frameHeight = 23;
  let tick = 0;
  let tick2 = 0;
  let frameDuration = 8;
  
  let move = false;
  let coolDown = 15;
  
  
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
          pos.oldX = pos.x
          pos.x -= hSpeed;
          pos.l = true;
          // animation.update('left');
          move = true;
          // facingLeft = true;
        } else if (controls.right) {
          pos.oldX = pos.x
          pos.r = true;
          pos.x += hSpeed;
          // animation.update('right');
          move = true;
          // facingLeft = false;
        }
        
        if (controls.up) {
          pos.oldY = pos.y
          pos.t = true;  
          pos.y -= vSpeed;
          move = true;
          // if (facingLeft)
          //   animation.update('left');
          // else
          //   animation.update('right');
        } else if (controls.down) {
          pos.oldY = pos.y
          pos.b = true;  
          pos.y += vSpeed;
          move = true;
          // if (facingLeft)
          //   animation.update('left');
          // else
          //   animation.update('right');
        }
        
        if (!move) {
          // bodyState.change('idle');
          // animation.update('none');
        }
      }
    },
  };
  bodyState.state = bodyState.idle;
  
  let path = [];
  let pathStart, pathEnd;
  
  function getPath() {
    if (tick2 < 20) {
      tick2++;
      return
    }
      tick2 = 0;
      path.length = 0;
  		pathStart = [Math.floor(pos.x/tileWidth),Math.floor(pos.y/tileWidth)]
  		pathEnd = [Math.floor(player.pos.x/tileWidth),Math.floor(player.pos.y/tileWidth)]
  		path = findPath(world,pathStart,pathEnd);
  		path.shift();
  }
  function updatePath() {
    if (tick2 < 10) {
      tick2++;
      return
    }
    tick2 = 0;
		pathStart = path.length > 0 ? path[0] : lastPath;
		pathEnd = [Math.floor(player.pos.x/tileWidth),Math.floor(player.pos.y/tileWidth)]
		path = findPath(world,pathStart,pathEnd);
  }
  
  let isMoving = false;
  let tolerance = 2
  function move2() {
      dX = path[0][0]*tileWidth;
      dY = path[0][1]*tileWidth;
      // L(pos.x,dX)
      // debug1 = pos.x
      // debug2 = dX
      isMoving = false;
      
    if (pos.x < dX-tolerance) {
      controls.left = false
      controls.right = true
      isMoving = true;
    } else if (pos.x > dX+tolerance) {
      controls.left = true
      controls.right = false
      isMoving = true;
    } else {
      controls.left = false
      controls.right = false
    }
    
    if (pos.y < dY-tolerance) {
      controls.up = false;
      controls.down = true;
      isMoving = true;
    } else if (pos.y > dY+tolerance){
      controls.up = true;
      controls.down = false;
      isMoving = true;
    } else {
      controls.up = false;
      controls.down = false;
    }
      
    if (!isMoving) {
      // L('arived')
      path.shift();
    }
  }
  
  let tick3 = getRandomArbitrary(5,15);
  
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  let lastPath;
  
  function updateMovement() {
    
    if (path.length === 0) {
      getPath();
    } else {
      tick3--
      if (tick3 < 0) {
        lastPath = path.shift();
        tick3 = getRandomArbitrary(5,15)
      }
      if (path.length > 0)
        move2();
      updatePath();
    }
    
    bodyState.state.update();
  }
  
  let oldX,oldY;
  let hitBox = {
    pos:{
      y:0,
    }
  }
  
  function update() {
    updateMovement();
          handleCollision();

  }
  
  function isCollideTop(target) {
    if (pos.y + pos.h > target.pos.y && pos.oldY + pos.h <= target.pos.y) {
      if (pos.x + pos.w > target.pos.x && pos.x < target.pos.x + target.pos.w) {
        pos.y = target.pos.y - pos.h;
      }
    }
  }
  
  function isCollideBottom(target) {
    if (pos.y < target.pos.y + target.pos.h && pos.oldY >= target.pos.y + target.pos.h) {
      if (pos.x + pos.w > target.pos.x && pos.x < target.pos.x + target.pos.w) {
        pos.y = target.pos.y + target.pos.h;
      }
    }
  }
  
  
  function isCollideRight(target) {
    if (pos.x < target.pos.x + target.pos.w && pos.oldX >= target.pos.x + target.pos.w && pos.y + pos.h > target.pos.y && pos.y < target.pos.y + target.pos.h) {
      pos.x = target.pos.x + target.pos.w;
    }
  }
  
  function isCollideLeft(target) {
    if (pos.x + pos.w > target.pos.x && pos.oldX + pos.w <= target.pos.x && pos.y + pos.h > target.pos.y && pos.y < target.pos.y + target.pos.h) {
      pos.x = target.pos.x - pos.w;
    }
  }
  
  
  function handleCollision() {
    for (let i=0; i<object.length; i++) {
      if (object[i].type == 'box') {
          let o = object[i];
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
  
  
  let self = {
    update,
  };
  
  Object.defineProperty(self, 'pos', { get: () => pos });
  Object.defineProperty(self, 'type', { get: () => type });
  Object.defineProperty(self, 'path', { get: () => path });
  Object.defineProperty(self, 'isRemoved', { get: () => isRemoved });
  
  return self;
  
}


// var world = [[]];

// size in the world in sprite tiles
var worldWidth = 320;
var worldHeight = 150;

// size of a tile in pixels
var tileWidth = 10;
var tileHeight = 10;

// for (var x=0; x < 300; x++)
// {
// 	world[x] = [];

// 	for (var y=0; y < 150; y++)
// 	{
// 		world[x][y] = 0;
// 	}
// }


function findPath(world, pathStart, pathEnd)
{
	var	abs = Math.abs;
	var	max = Math.max;
	var	pow = Math.pow;
	var	sqrt = Math.sqrt;

	var maxWalkableTileNum = 0;

	var worldWidth = canvas.width;
	var worldHeight = canvas.height;
	var worldSize =	worldWidth * worldHeight;

	var distanceFunction = EuclideanDistance;
	var findNeighbours = DiagonalNeighbours;


	function EuclideanDistance(Point, Goal)
	{	
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	}

	function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
	{
		if(myN)
		{
			if(myE && canWalkHere(E, N))
			result.push({x:E, y:N});
			if(myW && canWalkHere(W, N))
			result.push({x:W, y:N});
		}
		if(myS)
		{
			if(myE && canWalkHere(E, S))
			result.push({x:E, y:S});
			if(myW && canWalkHere(W, S))
			result.push({x:W, y:S});
		}
	}

	// returns boolean value (world cell is available and open)
	function canWalkHere(x, y)
	{
	  debug1 = '['+x+','+y+'] = '+world[x][y]
		return ((world[x] != null) &&
			(world[x][y] != 1) &&
			(world[x][y] <= maxWalkableTileNum));
	};

	// Node function, returns a new object with Node properties
	// Used in the calculatePath function to store route costs, etc.
	function Node(Parent, Point)
	{
		var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the world linear array
			value:Point.x + (Point.y * worldWidth),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the heuristic estimated cost
			// of an entire path using this node
			f:0,
			// the distanceFunction cost to get
			// from the starting point to this node
			g:0
		};

		return newNode;
	}
		function Neighbours(x, y)
	{
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && canWalkHere(x, N),
		myS = S < worldHeight && canWalkHere(x, S),
		myE = E < worldWidth && canWalkHere(E, y),
		myW = W > -1 && canWalkHere(W, y),
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}

	// Path function, executes AStar algorithm operations
	function calculatePath()
	{
		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		// create an array that will contain all world cells
		var AStar = new Array(worldSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty
		return result;
	}

	return calculatePath();
} // end of findPath() function