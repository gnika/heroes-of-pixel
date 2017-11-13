


function Building(map, x, y, row, col, life, name, hourstart, batiment, caracteristique) {
   this.map = map;
   this.life = life;
   this.name = name;
    this.x = x;
    this.y = y;
   this.col = col;
   this.row = row;
   this.hourstart = hourstart;
   this.batiment = batiment;
   this.caracteristique=caracteristique;
   //si batiment envoit des projectiles
   this.xDelta=0;
   this.yDelta=0;
   this.cible=0;
}

function Hero(map, x, y, life, attaque, defense, ecu, bois, argile, ble, xp, equipement) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.life = life;
    this.xp = xp;
    this.width = map.tsize;
    this.height = map.tsize;
    this.attaque = attaque;
    this.defense = defense;
    this.equipement = equipement;
    this.supply = {
        ecu:    ecu, 
        bois:   bois, 
        argile: argile, 
        ble:    ble
    };
    this.image = Loader.getImage('hero');
	
	this.addBuild = function (x, y, map, typeBatiment)
	{
		var dirx = 0;
		var diry = 0;
		if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }//pour ne pas pouvoir construire quand il se déplace
		else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
		else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
		else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }
		if(dirx!=0 || diry!=0) return false;
		
		
		
		pos = map.getRow(y)*map.rows+map.getCol(x);

		if(abs2[pos+1]==0 && abs1[pos+1]==1){
			// console.log(Game.hero.x);//pour éviter au héros de rester bloquer dans le batiment
				Game.hero.x = 32+64*map.getCol(x);
			abs2[pos+1]= typeBatiment;
			var nameBuild = 'build-'+map.getRow(y)+'-'+parseInt(map.getCol(x)+1, 10)+'-ing';
			
			var caracteristique = [];
			caracteristique['level'] =1;
			caracteristique['attaque'] =10;
			caracteristique['showLife'] =1;
			// console.log(caracteristique['showLife']);
			Game.nameBuild = new Building(map, x+32, y, map.getCol(x)+1, map.getRow(y), 60, nameBuild, 'hourstart', typeBatiment, caracteristique);
			builds[map.getCol(x)+1+'-'+map.getRow(y)]=Game.nameBuild;
			// builds.push(Game.nameBuild);
			
			
			anim = new animation(map, x+32, y, 'cloud');
		}
	}
	
	this.addCorn = function (x, y, map, hourstart, life, typeCulture)
	{
		var dirx = 0;
		var diry = 0;
		this.hourstart = hourstart;
		posCorn = map.getRow(y)*map.rows+map.getCol(x);
		
		// if(abs2[posCorn]==0 && abs1[posCorn]==1 && Game.hero.supply.ecu >=150){
		if(abs2[posCorn]==0 && abs1[posCorn]==1 && Game.hero.supply.ecu >=0){
			abs2[posCorn]=typeCulture;
			var nameBuild = 'ble-'+map.getRow(y)+parseInt(map.getCol(x), 10);
			Game.hero.supply.ecu = Game.hero.supply.ecu-150;
			document.getElementById("argent_value").innerHTML = Game.hero.supply.ecu;
			
			var caracteristique = [];
			caracteristique['showLife'] = 10;
			Game.nameBuild = new Building(map, x, y, map.getCol(x), map.getRow(y), life, nameBuild, 'hourstart', typeCulture, caracteristique);
			// builds.push(Game.nameBuild);
			builds[map.getCol(x)+'-'+map.getRow(y)]=Game.nameBuild;
			anim = new animation(map, x, y, 'cloud');
		}
		
		
	}
	
	this.creuse = function (x, y, map)
	{
        var equip = Game.getTool();
        var ecu = this.supply.ecu;
        pos     = map.getRow(y)*map.rows+map.getCol(x);
		
		var vertical = map.getCol(x);
		var horizontal = map.getRow(y);
		
		if (abs2[pos] == 0 && abs1[pos] !=2 && equip == 'pelle') {
			abs1[pos] = 2;
			abs2[pos] = 0;
			this.supply.ecu = ecu + 10;
			document.getElementById("argent_value").innerHTML = this.supply.ecu;
		} else if (abs1[pos] == 2  && equip == 'pelle'){
			this.supply.ecu = ecu + 1;
            document.getElementById("argent_value").innerHTML = this.supply.ecu;
        } else if ((abs2[pos] == 8 || abs2[pos]== 9) && abs1[pos] == 1  && equip == 'faux') {
            abs1[pos] = 2;
            abs2[pos] = 0;
			this.supply.ecu = ecu + 1;
            document.getElementById("argent_value").innerHTML = this.supply.ecu;
		} else if ((abs2[pos] == 10)  && equip == 'faux') {

			if(builds[vertical+'-'+horizontal].batiment == 10){
				builds[vertical+'-'+horizontal].life = builds[vertical+'-'+horizontal].life-1;
				if(builds[vertical+'-'+horizontal].life==0){
					delete builds[vertical+'-'+horizontal];
					abs1[pos] = 2;
					abs2[pos] = 0;					
				}else{
					abs2[pos]=10;
				}
				
				this.supply.ble=this.supply.ble+100;
				document.getElementById("ble_value").innerHTML = this.supply.ble;
			
			}
			// console.log(builds);
		}
		
		if(this.supply.ecu > ecu){
			//animation gold
			anim = new animation(map, x, y, 'coin');
		}
	}
	
}
Hero.SPEED = 256; // pixels per second
 
Hero.prototype.move = function (delta, dirx, diry) {
    // move hero
    this.x += dirx * Hero.SPEED * delta;
    this.y += diry * Hero.SPEED * delta;
    // move lifehero	
	// if(dirx == 1|| diry == 1 || dirx == -1|| diry == -1)//si mouvement
   
   
   //SI ON VEUT UNE IMAGE SPECIALE SI LE HEROS MARCHE
   // if(Game.anim>=DUREE_ANIMATION/2){
		// this.image = Loader.getImage('hero2');
		
   // }
	// else{
		// this.image = Loader.getImage('hero');
		
	// }
 
    // check if we walked into a non-walkable tile
    this._collide(dirx, diry);
    this._ennemy(dirx, diry);
   
 
    // check if he loses life
    this._loselifeTile(dirx, diry);
	
 
    // clamp values
    var maxX = this.map.cols * this.map.tsize;
    var maxY = this.map.rows * this.map.tsize;
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
};
 
Hero.prototype._loselifeTile = function (dirx, diry) {
    var row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    var left = this.x - this.width / 2;
    var right = this.x + this.width / 2 - 1;
    var top = this.y - this.height / 2;
    var bottom = this.y + this.height / 2 - 1;
               
                var collision =
        this.map.isLoseWinLife(left, top) ||
        this.map.isLoseWinLife(right, top) ||
        this.map.isLoseWinLife(right, bottom) ||
        this.map.isLoseWinLife(left, bottom);
                              
                // var tileActuelle = this.map.isLoseLife(this.x, this.y);
				if(collision=='life')
					if(this.life<60)
						this.life=this.life+0.1;
                if(collision==true){
				   if(this.life>0)
						this.life=this.life-0.1;
                }
                                              
};
 

 
Hero.prototype._collide = function (dirx, diry) {
    var row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    var left = this.x - this.width / 2;
    var right = this.x + this.width / 2 - 1;
    var top = this.y - this.height / 2;
    var bottom = this.y + this.height / 2 - 1;
               
 
    // check for collisions on sprite sides
    // var collision = false;
    var collision =
        this.map.isSolidTileAtXY(left, top) ||
        this.map.isSolidTileAtXY(right, top) ||
        this.map.isSolidTileAtXY(right, bottom) ||
        this.map.isSolidTileAtXY(left, bottom);
    if (!collision) { return; }
 
    if (diry > 0) {
        row = this.map.getRow(bottom);
        this.y = -this.height / 2 + this.map.getY(row);
    }
    else if (diry < 0) {
        row = this.map.getRow(top);
        this.y = this.height / 2 + this.map.getY(row + 1);
    }
    else if (dirx > 0) {
        col = this.map.getCol(right);
        this.x = -this.width / 2 + this.map.getX(col);
    }
    else if (dirx < 0) {
        col = this.map.getCol(left);
        this.x = this.width / 2 + this.map.getX(col + 1);
    }
               
               
               
}; 

 
Hero.prototype._ennemy = function (dirx, diry) {
    var row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    var left = this.x - this.width / 2;
    var right = this.x + this.width / 2 - 1;
    var top = this.y - this.height / 2;
    var bottom = this.y + this.height / 2 - 1;
               
 
    // check for collisions on sprite sides
    var collision =
        this.map.isEnnemyTileAtXY(left, top) ||
        this.map.isEnnemyTileAtXY(right, top) ||
        this.map.isEnnemyTileAtXY(right, bottom) ||
        this.map.isEnnemyTileAtXY(left, bottom);
    if (!collision) {
		
		Object.keys(monsters).forEach(function(key) {
			if(monsters[key].life<60)
				monsters[key].life = monsters[key].life+monsters[key].regeneration;
		})
		return;
	}
	
    if (diry > 0) {
        row = this.map.getRow(bottom);
        this.y = -this.height / 2 + this.map.getY(row);
    }
    else if (diry < 0) {
        row = this.map.getRow(top);
        this.y = this.height / 2 + this.map.getY(row + 1);
    }
    else if (dirx > 0) {
        col = this.map.getCol(right);
        this.x = -this.width / 2 + this.map.getX(col);
    }
    else if (dirx < 0) {
        col = this.map.getCol(left);
        this.x = this.width / 2 + this.map.getX(col + 1);
    }

	//ATTAQUER UN ENNEMI : A REVOIR POUR PLUS TARD : ENNEMI NE PERD DES POINTS DE VIE QUE QUAND ON ATTAQUE 
    if(this.life >0){
		 
		var lifeHero = collision.attaque-this.defense;
		if(lifeHero < 0) lifeHero =0.1;
		var lifeMonster = this.attaque-collision.defense;
		if(lifeMonster < 0) lifeMonster =0.1;
		
		this.life = this.life-(lifeHero);
		
		var equip = Game.getTool();
		if(collision.life >0 && equip=='epee'){
			// if(collision.life-(lifeMonster)<0){
				// lifeMonster=collision.life;
			// }
			collision.life = collision.life-(lifeMonster);
		}
			
    }         
};