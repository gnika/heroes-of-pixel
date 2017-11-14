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
    this.collisionHero = 0;
    this.name = 'monstre'+row+'-'+col;
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
 
Monstre.prototype.move = function (delta, hx, hy) {
		
    // move Monstre
    this.x += this.directionX * this.vitesse * Monstre.SPEED * delta;
    this.y += this.directionY * this.vitesse * Monstre.SPEED * delta;
    // check if we walked into a non-walkable tile
	
	
	pos = this.map.getRow(this.y)*this.map.rows+this.map.getCol(this.x);

	if( abs2[pos]==10 || abs2[pos]==11 || abs2[pos]==12 || abs2[pos]==13 )
		abs2[pos]=2;
	
	if(this.directionX == 1){
		var tile = abs2[pos+1];
		var tile1 = abs1[pos+1];
		var enplus=1;
	}
	if(this.directionX == -1){
		var tile = abs2[pos];
        var tile1 = abs1[pos];
        var enplus=0;
	}
	if(this.directionY == 1){
		var tile = abs2[pos+this.map.rows];
        var tile1 = abs1[pos+this.map.rows];
        var enplus=0;
	}
	if(this.directionY == -1){
		var tile = abs2[pos];
		var tile1 = abs1[pos];
        var enplus=0;
	}

// console.log(tile, this.col, this.row);
    if( tile==6 || tile==7 ){
		// console.log(builds, this.map.getCol(this.x), (parseInt(this.map.getCol(this.x), 10)+enplus)+'-'+ this.map.getRow(this.y));
		if(builds[(parseInt(this.map.getCol(this.x), 10)+enplus)+'-'+ this.map.getRow(this.y)]) {
            builds[(parseInt(this.map.getCol(this.x), 10)+enplus) + '-' + this.map.getRow(this.y)].life = builds[(parseInt(this.map.getCol(this.x), 10)+enplus) + '-' + this.map.getRow(this.y)].life - this.attaque;
            if (builds[(parseInt(this.map.getCol(this.x), 10)+enplus) + '-' + this.map.getRow(this.y)].life <= 0) {
                abs2[pos] = 2;
                anim = new animation(map, builds[(parseInt(this.map.getCol(this.x), 10)+enplus) + '-' + this.map.getRow(this.y)].x, builds[(parseInt(this.map.getCol(this.x), 10)+enplus) + '-' + this.map.getRow(this.y)].y, 'cloud');
                delete builds[(parseInt(this.map.getCol(this.x), 10)+enplus) + '-' + this.map.getRow(this.y)];

            }
        }
	}
 
	var posHero = this.map.isHeroTileAtXY(hx, hy);
		
	var hautY =this.map.getRow(this.y)+1;
	var basY =this.map.getRow(this.y)-2;
	var hautX =this.map.getCol(this.x)+1;
	var basX =this.map.getCol(this.x)-2;

    // si rencontre autre monstre
	if(monsters[hautX+'-'+hautY] || monsters[basX+'-'+basY] || monsters[basX+'-'+basY]
		|| monsters[basX+'-'+this.map.getRow(this.y)] || monsters[this.map.getCol(this.x)+'-'+basY]
		|| monsters[basX+'-'+this.map.getRow(this.y)]
		// ||
		// (this.directionY == 1 &&  monsters[basX-1+'-'+this.map.getRow(this.y)] || this.directionY == -1 &&  monsters[basX+1+'-'+this.map.getRow(this.y)])

	){

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

        return;
	}


	if((posHero[0] == hautX || posHero[0] == basX || posHero[0] == this.map.getCol(this.x)) &&  (posHero[1] == hautY || posHero[1] == basY || posHero[1] == this.map.getRow(this.y)))	{
		if(this.collisionHero==0){
			this.collisionHero=1;
			olddirectionX = this.directionX;
			olddirectionY = this.directionY;
			this.directionX=0;
			this.directionY=0;
		}
	}else{
		if(this.collisionHero ==1){
			this.directionX = olddirectionX;
			this.directionY = olddirectionY;
			this.collisionHero = 0;
		}
		var isSolid = tile === 3 || tile === 5 || tile === 6 || tile === 7 || tile === 16 || tile === 17 || (tile === 4 && tile1 === 3);
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
	   
		
	 
		// clamp values
		var maxX = this.map.cols * this.map.tsize;
		var maxY = this.map.rows * this.map.tsize;
		this.x = Math.max(0, Math.min(this.x, maxX));
		this.y = Math.max(0, Math.min(this.y, maxY));

		if(this.col != Math.round(this.y/this.map.tsize) || this.row != Math.round(this.x/this.map.tsize)){
			monsters[Math.round(this.x/this.map.tsize)+'-'+Math.round(this.y/this.map.tsize)] = this;
            delete monsters[this.row + '-' + this.col];

		}

        // console.log(monsters);
		this.row = Math.round(this.x/this.map.tsize);
		this.col = Math.round(this.y/this.map.tsize);
	}
	
};
 