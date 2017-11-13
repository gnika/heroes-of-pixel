function Monstre(map, x, y, row, col, attaque, defense, regeneration, level, imageParam, imageParam2, vitesse, directionX, directionY) {
    this.map = map;
    this.level = level;
    this.attaque = attaque;
    this.defense = defense;
    this.regeneration = regeneration;
    this.x = x;
    this.y = y;
    this.row = row;
    this.col = col;
    this.life = 60;
    this.width = map.tsize;
    this.height = map.tsize;
    this.image = imageParam;
    this.image1 = imageParam;
    this.image2 = imageParam2;
    this.vitesse = vitesse;
    this.directionX = directionX;
    this.directionY = directionY;
}

function generateTroll(x, y, row, col){
	var nameTroll = 'troll'+x+y;
	this.nameTroll = new Monstre(map, x, y, row, col, 22, 18, 0.5, 2, 'troll3', 'troll2', 0, 0, 0);
	monsters[row+'-'+col] = this.nameTroll;
	// monsters.push(this.nameTroll);
}
    
function generateMonstre(map, x, y, row, col, attaque, defense, regeneration, level, image1, image2, vitesse, directionX, directionY){
	var nameMonstre = 'troll'+x+y;
	this.nameTroll = new Monstre(map, x, y, row, col, attaque, defense, regeneration, level, image1, image2, vitesse, directionX, directionY);
	
	// console.log(this.nameTroll);
	monsters[row+'-'+col] = this.nameTroll;
}
	

Monstre.SPEED = 50; // pixels per second
 
Monstre.prototype.move = function (delta) {
	
		
    // move Monstre
    this.x += this.directionX * this.vitesse * Monstre.SPEED * delta;
    this.y += this.directionY * this.vitesse * Monstre.SPEED * delta;
    // check if we walked into a non-walkable tile
	
	if(this.directionX == 1){
		var tile = abs2[this.map.getRow(this.y)*this.map.rows+this.map.getCol(this.x)+1];
	}
	if(this.directionX == -1){
		var tile = abs2[this.map.getRow(this.y)*this.map.rows+this.map.getCol(this.x)-1];
	}
	if(this.directionY == 1){
		var tile = abs2[this.map.getRow(this.y)*this.map.rows+this.map.getCol(this.x)+this.map.rows];
	}
	if(this.directionY == -1){
		var tile = abs2[this.map.getRow(this.y)*this.map.rows+this.map.getCol(this.x)-this.map.rows];
	}
	
	var isSolid = tile === 3 || tile === 5 || tile === 6 || tile === 7 || tile === 16 || tile === 17;
    if(isSolid){
		
			if(this.directionX == -1){
				this.directionX = 1;
			}
			else if(this.directionX ==1){
				this.directionX=-1;
			}
			if(this.directionY==-1)
				this.directionY=1;
			else if(this.directionY==1)
				this.directionY=-1;
	}
    // this._ennemy(dirx, diry);
   
 
    // check if he loses life
    // this._loselifeTile(dirx, diry);
	
 
    // clamp values
    var maxX = this.map.cols * this.map.tsize;
    var maxY = this.map.rows * this.map.tsize;
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
	
	if(this.col != Math.round(this.y/this.map.tsize)){
		monsters[Math.round(this.x/this.map.tsize)+'-'+Math.round(this.y/this.map.tsize)] = this;
		delete monsters[this.row+'-'+this.col];		
	// console.log(monsters);
	}
	// delete monsters[this.row+'-'+this.col];		
	
	this.row = Math.round(this.x/this.map.tsize);
	this.col = Math.round(this.y/this.map.tsize);
	// console.log(this);
	
};
 