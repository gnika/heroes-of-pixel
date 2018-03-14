/* 	astar.js http://github.com/bgrins/javascript-astar
	Implements the astar search algorithm in javascript using a binary heap
	**Requires graph.js**
	
	Binary Heap taken from http://eloquentjavascript.net/appendix2.html
	with license: http://creativecommons.org/licenses/by/3.0/
		
	Example Usage:
		var graph = new Graph([
			[0,0,0,0,0,0,0],
			[1,0,0,0,0,0,1],
			[1,1,0,0,0,0,0],
			[1,1,0,0,0,0,0],
			[1,1,1,1,1,1,0],
			[1,1,0,0,0,0,0],
			[1,1,0,0,0,0,0]
		]);
		var start = graph.nodes[0][0];
		var end = graph.nodes[5][4];
		astar.search(graph.nodes, start, end);
		
	See graph.js for a more advanced example
*/
 function findPath(posStart, posEnd){
	 
	 
	 
	 
	// var graph = new Graph([
			// [0,0,0,0,0,0,0],
			// [0,0,0,1,0,0,1],
			// [1,1,0,0,0,0,0],
			// [1,1,0,0,0,0,0],
			// [1,1,1,1,1,1,0],
			// [1,1,0,0,0,0,0],
			// [1,1,0,0,0,0,0]
		// ]);
		// var start = graph.nodes[1][2];
		// var end = graph.nodes[0][2];
		// console.log(astar.search(graph.nodes, start, end));
	 
	 
	 
	 // console.log(posStart);
	 
	 
	 
	 var absobs1Ar = [];
	 var arrTemp = [];
	 var a = 0;
	 if(map.tileSolid.includes(absobs1[posEnd]) && map.tileSolid.includes(absobs2[posEnd]))
		 return false;
	 
	for (i = 0; i < absobs1.length; i++) { 
		if(a < map.rows){
			
			var isSolid = 0;
			var tile = absobs1[i];
			var tile2 = absobs2[i];
			
			if(map.tileSolid.includes(tile) || map.tileSolid.includes(tile2))
				isSolid = 1;
			
			arrTemp.push(isSolid);
			arrTemp.push(0);
			a++;
		}
		else{
			absobs1Ar.push(arrTemp);
			arrTemp = [];
			a = 0;
		}
	}
	
	var graph = new Graph(absobs1Ar);
	
	posStartCol = Math.trunc(posStart/map.rows);
	posStartRow = posStart%map.rows;
	
	posEndCol = Math.trunc(posEnd/map.rows);
	posposEndRow = posEnd%map.rows;
	
	// console.log(posStartRow, posStartCol);
	var start = graph.nodes[posStartCol][posStartRow];
	var end = graph.nodes[posEndCol][posposEndRow]; 
	var path = astar.search(graph.nodes, start, end);
	var pathReturn = [];
	for (i = 0; i < path.length; i++) { 
		pathReturn.push(map.rows*path[i].x+path[i].y);
	}
	// console.log(path);
	// console.log(pathReturn);
	return pathReturn;
	
 }
var astar = {
    init: function(grid) {
        for(var x = 0; x < grid.length; x++) {
            for(var y = 0; y < grid[x].length; y++) {
            	var node = grid[x][y];
            	node.f
                node.f = 0;
                node.g = 0;
                node.h = 0;
                node.visited = false;
                node.closed = false;
                node.debug = "";
                node.parent = null;
            }   
        }
    },
    search: function(grid, start, end, heuristic) {
        astar.init(grid);
        heuristic = heuristic || astar.manhattan;
        
        var openList   = [];
        openList.push(start);
        
        
		var openHeap = new BinaryHeap(function(node){return node.f;});
		openHeap.push(start);
        
        while(openHeap.size() > 0) {
        	
        	// Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentNode = openHeap.pop();
		    
		    // End case -- result has been found, return the traced path
		    if(currentNode == end) {
			    var curr = currentNode;
			    var ret = [];
			    while(curr.parent) {
				    ret.push(curr);
				    curr = curr.parent;
			    }
			    return ret.reverse();
		    }
    		
		    // Normal case -- move currentNode from open to closed, process each of its neighbors
		    currentNode.closed = true;
		    
		    var neighbors = astar.neighbors(grid, currentNode);
		    for(var i=0; i<neighbors.length;i++) {
			    var neighbor = neighbors[i];
			    
			    if(neighbor.closed || neighbor.isWall()) {
				    // not a valid node to process, skip to next neighbor
				    continue;
			    }
    			
			    // g score is the shortest distance from start to current node, we need to check if
			    //   the path we have arrived at this neighbor is the shortest one we have seen yet
			    // 1 is the distance from a node to it's neighbor.  This could be variable for weighted paths.
			    var gScore = currentNode.g + 1; 
			    var gScoreIsBest = false;
			    var beenVisited = neighbor.visited;
    			
			    if(!beenVisited || gScore < neighbor.g) {
			    
				    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.				    
				    neighbor.visited = true;
				    neighbor.parent = currentNode;
				    neighbor.h = neighbor.h || heuristic(neighbor.pos, end.pos);
				    neighbor.g = gScore;
				    neighbor.f = neighbor.g + neighbor.h;
				    neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
				    
				    if (!beenVisited) {
				    	// Pushing to heap will put it in proper place based on the 'f' value.
				    	openHeap.push(neighbor);
				    }
				    else {
				    	// Already seen the node, but since it has been rescored we need to reorder it in the heap
				    	openHeap.rescoreElement(neighbor);
				    }
				}
		    }
        }
        
        // No result was found -- empty array signifies failure to find path
        return [];
    },
    manhattan: function(pos0, pos1) {
    	// See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    	
        var d1 = Math.abs (pos1.x - pos0.x);
        var d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
    },
    neighbors: function(grid, node) {
        var ret = [];
	    var x = node.x;
	    var y = node.y;
	    
	    if(grid[x-1] && grid[x-1][y]) {
		    ret.push(grid[x-1][y]);
	    }
	    if(grid[x+1] && grid[x+1][y]) {
		    ret.push(grid[x+1][y]);
	    }
	    if(grid[x][y-1] && grid[x][y-1]) {
		    ret.push(grid[x][y-1]);
	    }
	    if(grid[x][y+1] && grid[x][y+1]) {
		    ret.push(grid[x][y+1]);
	    }
	    return ret;
    }
};

