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
	var nameTroll = 'monstre'+x+y;
	this.nameTroll = new Monstre(map, x, y, row, col, 22, 18, 0.5, 2, 'troll3', 'troll2', 0, 0, 0);
	monsters[row+'-'+col] = this.nameTroll;
	// monsters.push(this.nameTroll);
}
    
function generateMonstre(map, x, y, row, col, attaque, defense, regeneration, level, image1, image2, vitesse, directionX, directionY){
	var nameMonstre = 'monstre'+row+'-'+col;
	this.nameMonstre = new Monstre(map, x, y, row, col, attaque, defense, regeneration, level, image1, image2, vitesse, directionX, directionY);
	
	// console.log(this.nameTroll);
	monsters[row+'-'+col] = this.nameMonstre;
}
	

Monstre.SPEED = 50; // pixels per second
 
Monstre.prototype.move = function (delta, hx, hy) {
		
    // move Monstre
    this.x += this.directionX * this.vitesse * Monstre.SPEED * delta;
    this.y += this.directionY * this.vitesse * Monstre.SPEED * delta;
    // check if we walked into a non-walkable tile
	
	
	pos = this.map.getRow(this.y)*this.map.rows+this.map.getCol(this.x);

	// if( abs2[pos]==10 || abs2[pos]==11 || abs2[pos]==12 || abs2[pos]==13 )
		// abs2[pos]=2;
	
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
        var enplus=1;
	}
	if(this.directionY == -1){
		var tile = abs2[pos];
		var tile1 = abs1[pos];
        var enplus=0;
	}


//rencontre avec les batiments

	if(this.directionY == 1 || this.directionY == -1)//vers le haut ou vers le bas
		keyBatiment = parseInt(this.map.getRow(this.x), 10)+'-'+parseInt(this.map.getCol(this.y)+enplus, 10);
	else
		keyBatiment = parseInt(this.map.getRow(this.x)+enplus, 10)+'-'+parseInt(this.map.getCol(this.y), 10);

		
	if(builds[keyBatiment]) {
		builds[keyBatiment].life = builds[keyBatiment].life - this.attaque;
		if (builds[keyBatiment].life <= 0) {
			
			posTuile = builds[keyBatiment].col*this.map.rows+builds[keyBatiment].row;
			abs2[posTuile] = 2;
			anim = new animation(map, builds[keyBatiment].x, builds[keyBatiment].y, 'cloud');
			delete builds[keyBatiment];
		}else{
			
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
	}

	var hautY =this.col+1;
	var basY =this.col-1;
	var hautX =this.row+1;
	var basX =this.row-1;
	var posHero = this.map.isHeroTileAtXY(hx, hy);

	
	// console.log(monsters, hautY, hautX, basY, basX);
    // si rencontre autre monstre
	if((this.directionX!=0 && (monsters[basX+'-'+this.col] || monsters[hautX+'-'+this.col]))
		|| (this.directionY!=0 && (monsters[this.row+'-'+basY] || monsters[this.row+'-'+hautY]))
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
// rencontre héro
	
	//si le monstre bouge de haut en bas, si le héro est dessus ou dessous lui, le monstre s'arrête
	//si le monstre bouge de gauche à droite, si le héro est à gauche ou à droite de lui, le monstre s'arrête
	if((((this.directionY == 1 || this.directionY == -1 || (this.directionY==0 && this.directionX==0)) && posHero[0] == this.map.getRow(this.x)) && 
	(posHero[1] == hautY || posHero[1] == basY || posHero[1] == this.map.getCol(this.y))) || 
	
	(((this.directionX == 1 || this.directionX == -1 || (this.directionY==0 && this.directionX==0))
	&& posHero[1] == this.map.getCol(this.y)) && 
	(posHero[0] == hautX || posHero[0] == basX || posHero[0] == this.map.getRow(this.x)))
	
	)	{

		
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
		var isSolid = tile === 3 || tile === 5 || tile === 16 || tile === 17 || (tile === 4 && tile1 === 3);
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
 