
function Hero(map, x, y, life, fatigue, attaque, defense, xp, equipement) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.life = life;
    this.fatigue = fatigue;
    this.xp = xp;
    this.width = map.tsize;
    this.height = map.tsize;
    this.attaque = attaque;
    this.defense = defense;
    this.agilite = 10;
    this.attaqueEnCours = 60;
    this.exploration = 1;
    this.equipement = equipement;
    this.artefact = [];
    this.artefactEnCours = [];
    this.supply = {
        ecu:    	0, 
        bois:   	0, 
        argile: 	0, 
        ble:    	0,
        farine: 	2000,
		argent: 	0,
		pain:   	100,
		pierre: 	0,
		or:   		0,
		viande: 	0,
		cuir: 		0,
		brique: 	0,
		fer : 		0,
		vigne:  	0,
		vin: 		0,
		bijou:  	0,
		planche:	0,
		cochon: 	0,
		mais:		0
		};
    this.image = Loader.getImage('hero');
	
	this.addBuild = function (x, y, map, typeBatiment, caracteristique, supply, typeTile, life, solid)
	{
		// console.log(hour);
		var dirx = 0;
		var diry = 0;
		if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }//pour ne pas pouvoir construire quand il se déplace
		else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
		else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
		else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }
		if(dirx!=0 || diry!=0) return false;
		
		var error = 0;
		Object.keys(supply).forEach(function(key) {
			if(Game.hero.supply[key] < supply[key])
				error = 1;
		})
		
		if(error!= 0) {
			return false;
		}
		
		pos = map.getRow(y)*map.rows+map.getCol(x);


		// if(abs2[pos+1]==typeTile && abs1[pos+1]==1){
		if(abs1[pos+1] == typeTile[0] && abs2[pos+1] == typeTile[1]){
			//pour éviter au héros de rester bloquer dans le batiment

			Game.hero.x = map.tsize/2+map.tsize*map.getCol(x);
			abs2[pos+1]= typeBatiment[0];
			var nameBuild = 'build-'+map.getRow(y)+'-'+parseInt(map.getCol(x)+1, 10)+'-ing';
			
			
			
			Object.keys(supply).forEach(function(key) { // paye le prix
				Game.hero.supply[key] =  Game.hero.supply[key] - supply[key];
			})
			
			
			Game.nameBuild = new Building(map, x+map.tsize/2, y, map.getCol(x)+1, map.getRow(y), life, nameBuild, typeBatiment, caracteristique, typeTile, solid);
			builds[map.getCol(x)+1+'-'+map.getRow(y)]=Game.nameBuild;

			anim = new animation(map, x+map.tsize/2, y, 'cloud');
			menussclick = 0; // pour que le sous menu se referme
		}
	}
	
	this.creuse = function (x, y, map)	//quand on clique sur le bouton action
	{
		
		Object.keys(this.supply).forEach(function(key) {
			Game.hero[key] = Game.hero.supply[key];		
		})
		
        var equip 	= Game._getToolEquipe();
        var pos     = map.getRow(y)*map.rows+map.getCol(x);
		
		var vertical = map.getCol(x);
		var horizontal = map.getRow(y);
		//tiles
		if (abs2[pos] == 0 && abs1[pos] !=2 && equip == 'pelle') {
			abs1[pos] = 2;
			abs2[pos] = 0;
			absobs1[pos] = 2;
			absobs2[pos] = 0;
			this.supply.ecu = Game.hero.ecu + 10;
		}
		else if (abs2[pos] == 57 && abs1[pos] != 2 && equip == 'pelle') {
			abs2[pos] = 58;
			absobs2[pos] = 58;
			this.supply.argile = Game.hero.argile + 10;
		} else if (abs2[pos] == 58  && equip == 'pelle'){
			this.supply.argile = Game.hero.argile + 1;
        }else if (abs2[pos] == 59 && abs1[pos] != 2 && equip == 'pioche') {
			abs2[pos] = 60;
			absobs2[pos] = 60;
			this.supply.pierre = Game.hero.pierre + 10;
		} else if (abs2[pos] == 60  && equip == 'pioche'){
			this.supply.pierre = Game.hero.pierre + 1;
        } else if (abs1[pos] == 2  && equip == 'pelle'){
			this.supply.ecu = Game.hero.ecu + 1;
        }else if ((abs2[pos] == 8 || abs2[pos]== 9) && abs1[pos] == 1  && equip == 'faux') {
            abs1[pos] = 2;
            abs2[pos] = 0;
            absobs1[pos] = 2;
            absobs2[pos] = 0;
			this.supply.bois = Game.hero.bois + 5;
		}
		
		//actions buildings si équipé d'un outils
		if(typeof(builds[vertical+'-'+horizontal]) != "undefined" && builds[vertical+'-'+horizontal] !== null){
			if((typeof(builds[vertical+'-'+horizontal].caracteristique['outilRecompense']) === "undefined" || 
			builds[vertical+'-'+horizontal].caracteristique['outilRecompense'] == equip) && 
			abs2[pos] == builds[vertical+'-'+horizontal].batiment[3]){
				
				var recompense = builds[vertical+'-'+horizontal].caracteristique['recompense'];
				Object.keys(recompense).forEach(function(keyRecompense) {
					Game.hero.supply[keyRecompense]+= recompense[keyRecompense] * builds[vertical+'-'+horizontal].caracteristique['level'];
				})
					
				if(	builds[vertical+'-'+horizontal].caracteristique['loseLife'] == 1)
				builds[vertical+'-'+horizontal].life = builds[vertical+'-'+horizontal].life-1;
				if(builds[vertical+'-'+horizontal].life==0){
					delete builds[vertical+'-'+horizontal];
					abs1[pos] = 2;
					abs2[pos] = 0;
				}else{
					abs2[pos]=builds[vertical+'-'+horizontal].batiment[0];
					builds[vertical+'-'+horizontal].day = day;
					builds[vertical+'-'+horizontal].hour = hour;
				}
			}
		}
		
		//animation quand on gagne une ressource
		Object.keys(this.supply).forEach(function(key) {
			if(Game.hero.supply[key] > Game.hero[key])
				anim = new animation(map, x, y, key);
		})
		
		//attaque d'un ennemi 
		if(Game._getToolEquipe() == 'epee' && this.attaqueEnCours == 60){
			if(monsters[(1+vertical)+'-'+horizontal]){
				var attaque = this.attaque - monsters[(1+vertical)+'-'+horizontal].defense;
				monsters[(1+vertical)+'-'+horizontal].life-= attaque; 
			}
			if(monsters[(vertical-1)+'-'+horizontal]){
				var attaque = this.attaque - monsters[(vertical-1)+'-'+horizontal].defense;
				monsters[(vertical-1)+'-'+horizontal].life-= attaque; 
			}
			if(monsters[vertical+'-'+(horizontal+1)]){
				var attaque = this.attaque - monsters[vertical+'-'+(horizontal+1)].defense;
				monsters[vertical+'-'+(horizontal+1)].life-= attaque; 
			}
			if(monsters[vertical+'-'+(horizontal-1)]){
				var attaque = this.attaque - monsters[vertical+'-'+(horizontal-1)].defense;
				monsters[vertical+'-'+(horizontal-1)].life-= attaque; 
			}
			
			this.attaqueEnCours = 0;
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
	
	
	if(Object.keys(this.artefactEnCours).length){	//SI ARTEFACT EN COURS DOIT SE TERMINER
		Object.keys(this.artefactEnCours).forEach(function(key) {
			if(Game.hero.artefactEnCours[key].heure == hour && Game.hero.artefactEnCours[key].jour == day){
				
				Game.hero.attaque-=		 Game.hero.artefactEnCours[key].artefact.attaque;
				Game.hero.defense-=		 Game.hero.artefactEnCours[key].artefact.defense;
				Game.hero.agilite-=		 Game.hero.artefactEnCours[key].artefact.agilite;
				Game.hero.exploration-=  Game.hero.artefactEnCours[key].artefact.exploration;
				
				delete(Game.hero.artefactEnCours[key]);
			}
		})
	}
	
	
    // clamp values
    var maxX = this.map.cols * this.map.tsize;
    var maxY = this.map.rows * this.map.tsize;
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
	
	var rowX = this.map.getRow(this.x);
	var colY = this.map.getCol(this.y);
	
	//EXPLORATION QUI PRENDS EN COMPTE LE POUVOIR D'EXPLORATION DU HEROS
	
	absobs1[colY*map.rows+rowX] = abs1[colY*map.rows+rowX];
	absobs2[colY*map.rows+rowX] = abs2[colY*map.rows+rowX];
	
	for(var i=1; i<=this.exploration; i++){
		
		absobs1[colY*map.rows+rowX+i] = abs1[colY*map.rows+rowX+i];
		absobs2[colY*map.rows+rowX+i] = abs2[colY*map.rows+rowX+i];
		
		absobs1[colY*map.rows+rowX-i] = abs1[colY*map.rows+rowX-i];
		absobs2[colY*map.rows+rowX-i] = abs2[colY*map.rows+rowX-i];
		
		absobs1[colY*map.rows+rowX+map.rows * i] = abs1[colY*map.rows+rowX+map.rows * i];
		absobs2[colY*map.rows+rowX+map.rows * i] = abs2[colY*map.rows+rowX+map.rows * i];
		
		for(var o=1; o<=this.exploration; o++){
			absobs1[colY*map.rows+rowX+map.rows * i+o] = abs1[colY*map.rows+rowX+map.rows * i+o];
			absobs2[colY*map.rows+rowX+map.rows * i+o] = abs2[colY*map.rows+rowX+map.rows * i+o];
			absobs1[colY*map.rows+rowX+map.rows * i-o] = abs1[colY*map.rows+rowX+map.rows * i-o];
			absobs2[colY*map.rows+rowX+map.rows * i-o] = abs2[colY*map.rows+rowX+map.rows * i-o];
		}
		
		absobs1[colY*map.rows+rowX-map.rows * i] = abs1[colY*map.rows+rowX-map.rows * i]; 
		absobs2[colY*map.rows+rowX-map.rows * i] = abs2[colY*map.rows+rowX-map.rows * i];
		
		for(var a=1; a<=this.exploration; a++){
			absobs1[colY*map.rows+rowX-map.rows * i-a] = abs1[colY*map.rows+rowX-map.rows * i-a]; 
			absobs2[colY*map.rows+rowX-map.rows * i-a] = abs2[colY*map.rows+rowX-map.rows * i-a];
			absobs1[colY*map.rows+rowX-map.rows * i+a] = abs1[colY*map.rows+rowX-map.rows * i+a]; 
			absobs2[colY*map.rows+rowX-map.rows * i+a] = abs2[colY*map.rows+rowX-map.rows * i+a];
		}
	}
	
	
	
	//FIN EXPLORATION
	
	if(this.x >= xHeroClick+this.map.tsize || this.y >= yHeroClick+this.map.tsize || this.x <= xHeroClick-this.map.tsize || this.y <= yHeroClick-this.map.tsize ){

		if(clickCanvasX!=0 || clickCanvasY!=0){
			this.y = colY * this.map.tsize+this.map.tsize/2;
			this.x = rowX * this.map.tsize+this.map.tsize/2;
		}
		
		clickCanvasX = 0;
		clickCanvasY = 0;
	}
	//SE FAIRE ATTAQUER PAR UN ENNEMI QUI NE BOUGE PAS
	var ennemiStable = 0;
	var attaqueEnnemi = 0;
	if(monsters[(1+rowX)+'-'+colY] && monsters[(1+rowX)+'-'+colY].vitesse == 0){
				var attaque = monsters[(1+rowX)+'-'+colY].attaque - Game.hero.defense;
				attaqueEnnemi = monsters[(1+rowX)+'-'+colY].attaque;
				ennemiStable = 1;
			}
			if(monsters[(rowX-1)+'-'+colY] && monsters[(rowX-1)+'-'+colY].vitesse == 0){
				var attaque = monsters[(rowX-1)+'-'+colY].attaque - Game.hero.defense;
				attaqueEnnemi = monsters[(rowX-1)+'-'+colY].attaque;
				ennemiStable = 1;
			}
			if(monsters[rowX+'-'+(colY+1)] && monsters[rowX+'-'+(colY+1)].vitesse == 0){
				var attaque = monsters[rowX+'-'+(colY+1)].attaque - Game.hero.defense;
				attaqueEnnemi = monsters[rowX+'-'+(colY+1)].attaque;
				ennemiStable = 1;
			}
			if(monsters[rowX+'-'+(colY-1)] && monsters[rowX+'-'+(colY-1)].vitesse == 0){
				var attaque = monsters[rowX+'-'+(colY-1)].attaque - Game.hero.defense;
				attaqueEnnemi = monsters[rowX+'-'+(colY-1)].attaque;
				ennemiStable = 1;
			}
			
			if(ennemiStable == 1 && attaqueEnnemi > 0){//pour ne pas cibler les amis
				if (attaque <= 0)attaque = 0.4;	
					Game.hero.life = Game.hero.life - attaque*0.05;//liaison avec monstre.js commentaire : //monstre attaque le héros
			}
	
	
	//RECUPERER UN ARTEFACT
	if(artefacts[rowX+'-'+colY]){
		if(artefacts[rowX+'-'+colY].inventaire == 1)
			this.artefact.push(artefacts[rowX+'-'+colY].name);
		else{
			this.attaque+= artefacts[rowX+'-'+colY].attaque;
			this.defense+= artefacts[rowX+'-'+colY].defense;
			this.exploration+= artefacts[rowX+'-'+colY].exploration;
			this.agilite+= artefacts[rowX+'-'+colY].agilite;
			this.xp+= artefacts[rowX+'-'+colY].xp;
			
			for (var key in artefacts[rowX+'-'+colY].supply) {
				Game.hero.supply[key]+= artefacts[rowX+'-'+colY].supply[key];
			}
		}
		
		anim = new animation(map, artefacts[rowX+'-'+colY].x, artefacts[rowX+'-'+colY].y, artefacts[rowX+'-'+colY].image);
		delete artefacts[rowX+'-'+colY];
		
	}
	
	
	if(builds[rowX+'-'+colY]){	//si sur un batiment dont le statut est le dernier (par exemple, le blé a poussé) et qui nécessite de porter un outil dont le héros n'est pas équipé
		var equip 	= Game._getToolEquipe();
		if(
		builds[rowX+'-'+colY].caracteristique['outilRecompense'] != null && 
		equip != builds[rowX+'-'+colY].caracteristique['outilRecompense'] &&
		abs2[colY*map.rows+rowX] == builds[rowX+'-'+colY].batiment[3]
		)
			animBack = new animBackground(this.map, builds[rowX+'-'+colY].x, builds[rowX+'-'+colY].y, builds[rowX+'-'+colY].caracteristique['outilRecompense']+'_bulle');
		else
			animBack	= null;
	}else
		animBack	= null;
	
	//regenerer la barre d'agilite
	if(this.attaqueEnCours < 60)
		this.attaqueEnCours+= this.agilite * 0.05;
		
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
 
Hero.prototype._upgradeBuild = function (build) {	// pour augmenter de 1 le niveau d'un batiment
	// paye le prix : je ne fais pas de vérification car le bouton upgrade n'apparait que si c'est possible
	Object.keys(build.caracteristique.updateNiveau).forEach(function(key) { 
		Game.hero.supply[key] =  Game.hero.supply[key] - build.caracteristique.updateNiveau[key];
	})
	builds[build.row+'-'+build.col].caracteristique.level = builds[build.row+'-'+build.col].caracteristique.level+1;
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
			if(monsters[key].life > 60)
				monsters[key].life = 60;
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
    // if(this.life >0){
		 
		// var lifeHero = collision.attaque-this.defense;
		// if(lifeHero < 0) lifeHero =0.1;
		// var lifeMonster = this.attaque-collision.defense;
		// if(lifeMonster < 0) lifeMonster =0.1;
		
		// this.life = this.life-(lifeHero);
		
		// var equip = Game._getToolEquipe();
		// if(collision.life >0 && equip=='epee'){
			// collision.life = collision.life-(lifeMonster);
		// }
			
    // }         
};