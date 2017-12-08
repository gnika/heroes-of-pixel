allMonsters['troll'] = {
	'nom' 			 : 'troll',
	'level'			 :	1,
	'attaque'		 : [7, 10],
	'defense'		 : [2, 7],
	'regeneration'	 : 0.07,
	'vitesse'		 : [10, 20],
	'image'			 : 'troll',
};
allMonsters['scorpion'] = {
	'nom' 			 : 'scorpion',
	'level'			 :	1,
	'attaque'		 : [7, 9],
	'defense'		 : [1, 5],
	'regeneration'	 : 0.05,
	'vitesse'		 : [10, 20],
	'image'			 : 'scorpion'
};
allMonsters['balrog'] = {
	'nom' 			 : 'balrog',
	'level'			 :	1,
	'attaque'		 : [10, 20],
	'defense'		 : [3, 8],
	'regeneration'	 : 0.1,
	'vitesse'		 : [10, 20],
	'image'			 : 'balrog'
};
allMonsters['cyclone'] = {
	'nom' 			 : 'cyclone',
	'level'			 :	1,
	'attaque'		 : [10, 20],
	'defense'		 : [10, 20],
	'regeneration'	 : 0.1,
	'vitesse'		 : [10, 20],
	'image'			 : 'cyclone'
};
allMonsters['gobelin'] = {
	'nom' 			 : 'gobelin',
	'level'			 :	1,
	'attaque'		 : [10, 20],
	'defense'		 : [6, 11],
	'regeneration'	 : 0.1,
	'vitesse'		 : [10, 20],
	'image'			 : 'gobelin'
};
allMonsters['brigand'] = {
	'nom' 			 : 'brigand',
	'level'			 :	1,
	'attaque'		 : [10, 20],
	'defense'		 : [10, 20],
	'regeneration'	 : 0.1,
	'vitesse'		 : [10, 20],
	'image'			 : 'brigand'
};
allMonsters['darkKnight'] = {
	'nom' 			 : 'darkKnight',
	'level'			 :	2,
	'attaque'		 : [10, 20],
	'defense'		 : [10, 20],
	'regeneration'	 : 0.1,
	'vitesse'		 : [10, 20],
	'image'			 : 'darkKnight'
};
allMonsters['main'] = {
	'nom' 			 : 'main',
	'level'			 :	1,
	'attaque'		 : [10, 20],
	'defense'		 : [8, 12],
	'regeneration'	 : 0.1,
	'vitesse'		 : [10, 20],
	'image'			 : 'main'
};
allMonsters['vampire'] = {
	'nom' 			 : 'vampire',
	'level'			 :	3,
	'attaque'		 : [10, 20],
	'defense'		 : [20, 25],
	'regeneration'	 : 0.1,
	'vitesse'		 : [10, 20],
	'image'			 : 'vampire'
};

///////////////AMIS

allMonsters['ami'] = {
	'nom' 			 : 'ami',
	'level'			 :	1,
	'attaque'		 : [0, 0],
	'defense'		 : [999, 999],
	'regeneration'	 : 1,
	'vitesse'		 : [0, 0],
	'image'			 : 'ami'
};
allMonsters['ami2'] = {
	'nom' 			 : 'ami2',
	'level'			 :	1,
	'attaque'		 : [0, 0],
	'defense'		 : [999, 999],
	'regeneration'	 : 1,
	'vitesse'		 : [0, 0],
	'image'			 : 'ami2'
};
allMonsters['friend'] = {
	'nom' 			 : 'friend',
	'level'			 :	1,
	'attaque'		 : [0, 0],
	'defense'		 : [999, 999],
	'regeneration'	 : 1,
	'vitesse'		 : [0, 0],
	'image'			 : 'friend'
};
allMonsters['friend2'] = {
	'nom' 			 : 'friend2',
	'level'			 :	1,
	'attaque'		 : [0, 0],
	'defense'		 : [999, 999],
	'regeneration'	 : 1,
	'vitesse'		 : [0, 0],
	'image'			 : 'friend2'
};
allMonsters['jailor'] = {
	'nom' 			 : 'jailor',
	'level'			 :	1,
	'attaque'		 : [0, 0],
	'defense'		 : [999, 999],
	'regeneration'	 : 1,
	'vitesse'		 : [0, 0],
	'image'			 : 'jailor'
};
allMonsters['parrain'] = {
	'nom' 			 : 'parrain',
	'level'			 :	1,
	'attaque'		 : [0, 0],
	'defense'		 : [999, 999],
	'regeneration'	 : 1,
	'vitesse'		 : [0, 0],
	'image'			 : 'parrain'
};
allMonsters['woman'] = {
	'nom' 			 : 'woman',
	'level'			 :	1,
	'attaque'		 : [0, 0],
	'defense'		 : [999, 999],
	'regeneration'	 : 1,
	'vitesse'		 : [0, 0],
	'image'			 : 'woman'
};

function Monstre(map, x, y, row, col, attaque, defense, regeneration, level, imageParam, vitesse, directionX, directionY) {
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
    this.image2 = imageParam+'2';
    this.vitesse = vitesse;
    this.directionX = directionX;
    this.directionY = directionY;
    this.collisionHero = 0;
    this.name = 'monstre'+row+'-'+col;
}
    
function generateMonstre(map, x, y, row, col, name, vitesse, directionX, directionY){
		
	var nameMonstre = 'monstre'+row+'-'+col;
	this.nameMonstre = new Monstre(map, x, y, row, col, Game.getRandomInt(allMonsters[name].attaque[0], allMonsters[name].attaque[1]),
														Game.getRandomInt(allMonsters[name].defense[0], allMonsters[name].defense[1]),
														allMonsters[name].regeneration, 
														allMonsters[name].level, 
														allMonsters[name].image, 
														vitesse, 
														directionX, 
														directionY);
	
	monsters[row+'-'+col] = this.nameMonstre;
}
	

Monstre.SPEED = 50; // pixels per second
 
Monstre.prototype.move = function (delta, hx, hy) {
		
    // move Monstre
    this.x += this.directionX * this.vitesse * Monstre.SPEED * delta;
    this.y += this.directionY * this.vitesse * Monstre.SPEED * delta;
    // check if we walked into a non-walkable tile
	
	
	pos = this.map.getRow(this.y)*this.map.rows+this.map.getCol(this.x);
	
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
			absobs2[posTuile] = 2;
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


		if(this.directionX == -1 && monsters[basX+'-'+this.col] && this.map.getRow(this.x) > this.map.getRow(monsters[basX+'-'+this.col].x)){	//gauche
			this.directionX = 1;	//droite
		}
		else if(this.directionX == 1 && monsters[hautX+'-'+this.col] && this.map.getRow(this.x) < this.map.getRow(monsters[hautX+'-'+this.col].x)){	//droite
			this.directionX=-1;			//gauche
		}
		if(this.directionY==-1 && monsters[this.row+'-'+basY] && this.map.getCol(this.y) > this.map.getCol(monsters[this.row+'-'+basY].y)){		//monte
			this.directionY=1;		//descend
		}
			
		else if(this.directionY==1 && monsters[this.row+'-'+hautY] && this.map.getCol(this.y) < this.map.getCol(monsters[this.row+'-'+hautY].y)){
			this.directionY=-1;	
		}
		


		if(this.directionX != 0 && monsters[this.row+'-'+hautY] && monsters[this.row+'-'+hautY].directionY == -1){
			monsters[this.row+'-'+hautY].directionY = 1;
		}
		else if(this.directionX != 0 && monsters[this.row+'-'+basY] && monsters[this.row+'-'+basY].directionY == 1){
			monsters[this.row+'-'+basY].directionY = -1;
		}
		

////////////////////////////////////////////initial
		// if(this.directionX == -1){
			// this.directionX = 1;
		// }
		// else if(this.directionX ==1){
			// this.directionX=-1;
		// }
		// if(this.directionY==-1)
			// this.directionY=1;
		// else if(this.directionY==1)
			// this.directionY=-1;
		

        // return;
	}
// rencontre héro
	if(this.directionX == 0 && this.directionY == 0 && this.vitesse > 0){
		
		//monstre attaque le héros
		var attaque = this.attaque - Game.hero.defense;
		if (attaque < 0)attaque = 0.4;	
			Game.hero.life = Game.hero.life - attaque*0.05;
	}
	
	//si le monstre bouge de haut en bas, si le héro est dessus ou dessous lui, le monstre s'arrête
	//si le monstre bouge de gauche à droite, si le héro est à gauche ou à droite de lui, le monstre s'arrête
	if((((this.directionY == 1 || this.directionY == -1 || (this.directionY==0 && this.directionX==0)) && posHero[0] == this.map.getRow(this.x)) && 
	(posHero[1] == hautY || posHero[1] == basY || posHero[1] == this.map.getCol(this.y))) || 
	
	(((this.directionX == 1 || this.directionX == -1 || (this.directionY==0 && this.directionX==0))
	&& posHero[1] == this.map.getCol(this.y)) && 
	(posHero[0] == hautX || posHero[0] == basX || posHero[0] == this.map.getRow(this.x)))
	
	)	{
		
		//monstre s'enfuit si peu de vie
		// if(this.life <= 15){
			// this.directionX = this.directionX*-1;
			// this.directionY = this.directionY*-1;
		// }
		// else 
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
 