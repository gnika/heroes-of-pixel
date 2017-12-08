DUREE_ANIMATION 				= 50;
builds          				= [];
allBuilding     				= [];
allMonsters     				= [];
allArtefacts    				= [];
monsters        				= [];
supply          				= [];
objets		    				= [];
artefacts	    				= [];
artefactSelectionne		    	= [];
clickCanvasX 					= 0;
clickCanvasY 					= 0;
xHeroClick						= 0;
yHeroClick						= 0;
menuclick						= 0;
menuBodyClick					= 0;
batimentclick					= 0;
menussclick						= 0;
hour	   						= 0;
day			    				= 1;
batimentClickResponsive		 	= 4;
colonneBatimentClicResponsive	= 0;
 
function Camera(map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.maxX = map.cols * map.tsize - width;
    this.maxY = map.rows * map.tsize - height; }
 
Camera.prototype.follow = function (sprite) {
    this.following = sprite;
    sprite.screenX = 0;
    sprite.screenY = 0;
};
 
Camera.prototype.update = function () {
    // assume followed sprite should be placed at the center of the screen
    // whenever possible

    if(this.following.life==0)return;
    this.following.screenX = this.width / 2;
    this.following.screenY = this.height / 2;
 
    // make the camera follow the sprite
    this.x = this.following.x - this.width / 2;
    this.y = this.following.y - this.height / 2;
    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
 
    // in map corners, the sprite cannot be placed in the center of the screen
    // and we have to change its screen coordinates
 
    // left and right sides
    if (this.following.x < this.width / 2 ||
        this.following.x > this.maxX + this.width / 2) {
        this.following.screenX = this.following.x - this.x;
    }
    // top and bottom sides
    if (this.following.y < this.height / 2 ||
        this.following.y > this.maxY + this.height / 2) {
        this.following.screenY = this.following.y - this.y;
    }
               
};

function objet(name, media, life, attaque){
	this.name=name;
	this.life=life;
	this.attaque=attaque;
	this.image=Loader.getImage(media);
}

function animation(map, x, y, imageName){
	this.map = map;
	this.x = x;
    this.y = y;
	this.image = Loader.getImage(imageName);
}

function animBackground(map, x, y, imageName){
	this.map = map;
	this.x = x;
    this.y = y;
	this.image = Loader.getImage(imageName);
}
 
Game.load = function () {
    return 	this.defineImages();
};

Game.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
Game.init = function () {
	setBuilding();
	var audio = new Audio('assets/sound/ambiance1.mp3');
	audio.loop = true;
	audio.play();
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	
	//resize en fonction de l'écran
	canvas  = document.getElementById('map_canvas');
    canvas.width = x;
    canvas.height = y - 50;
	
	var width = canvas.width;
	if(width < 1300){//menu.js ligne 211
		batimentClickResponsive = 2;
		colonneBatimentClicResponsive = 70;
	}
	
	var rect = canvas.getBoundingClientRect();
	
    var currentTime = new Time();
    currentTime.startTime(1000);
    
    Keyboard.listenForEvents(
        [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]
	);
    this.tileAtlas = Loader.getImage('tiles');
 
	this.anim = 0;
	this.animBref = 0;
	this.animBulle = 50;
	this.animBulleBas = 0;
	
	objets['pelle'] = {'img':'pelle_bois', 'name':'pelle', 'life':100, 'possession':1, 'equipe':0};
	objets['faux']  = {'img':'faux_bois', 'name':'faux', 'life':100, 'possession':1, 'equipe':0};
	objets['pioche']  = {'img':'pioche_bois', 'name':'pioche', 'life':100, 'possession':1, 'equipe':0};
	objets['epee']  = {'img':'epee_bois', 'name':'epee', 'life':100, 'possession':1, 'equipe':0};
	
	
    this.hero = new Hero(map, 160, 160, 60, 60, 15, 5, 0, objets);//map - x - y - vie - attaque - defense - xp - objet
	var nameBuild = 'build-2-2-ing';
	var caracteristique 	= [];
		caracteristique['showLife'] = 1;
	
	Game.nameBuild = new Building(map, 160, 160, 2, 2, 60, nameBuild, 61, caracteristique, 0, 0);
	builds['2-2'] = Game.nameBuild;
	
	generateArtefact(map, 210, 160, 3, 2, 'lunette_bleu');
	generateArtefact(map, 210, 95, 3, 1, 'lunette_bleu');
	generateArtefact(map, 95, 160, 1, 2, 'culture_raisin');
	generateArtefact(map, 160, 95, 2, 1, 'bombe');
	generateArtefact(map, 160, 192, 2, 3, 'bois');
	generateArtefact(map, 150, 270, 2, 4, 'bombe');
	generateArtefact(map, 150, 350, 2, 5, 'epee_lumiere');
	generateArtefact(map, 150, 400, 2, 6, 'viande');

	generateMonstre(map, 64, 64, 1, 1, 'troll', 0, 0, 0);
	generateMonstre(map, 384, 128, 6, 2, 'brigand', 2, -1, 0);
	generateMonstre(map, 192, 192, 3, 3, 'scorpion', 1, -1, 0);
	generateMonstre(map, 576, 192, 9, 3, 'main', 1.2, 0, 1);
	
	generateMonstre(map, 64, 192, 1, 3, 'ami', 0, 0, 0);

    this.camera = new Camera(map, x, y-100);
    this.camera.follow(this.hero);

	document.getElementById("map_canvas").addEventListener('click',
		function(event){
			//gestion deplacement héros
			var rect = this.getBoundingClientRect();
			var xClick = event.clientX - rect.left+Game.camera.x;
			var yClick = event.clientY - rect.top+Game.camera.y;
			var rowClick = Game.hero.map.getRow(xClick);
			var colClick = Game.hero.map.getCol(yClick);
			var rowHero = Game.hero.map.getRow(Game.hero.x);
			var colHero = Game.hero.map.getCol(Game.hero.y);
			var xHero = Game.hero.x;
			var yHero = Game.hero.y;
			var menuH = Game.hero.map.tsize/2;
			
			if(rowClick == rowHero && colHero == colClick && batimentclick == 0	){	//nourrir
				if(builds[rowClick+'-'+colHero]){
					batimentclick = 1;
					
					return false;
				}
				if(Game.hero.supply.pain >= 5){
					Game.hero.supply.pain-= 5;
					
					if(Game.hero.fatigue >= 40)
						Game.hero.fatigue = 60;
					else
						Game.hero.fatigue+= 20;
					
					anim = new animation(Game.hero.map, xHero, yHero, 'pain');
				}
				return false;
			}
			
			if(menussclick == 0 && batimentclick == 0 && menuBodyClick == 0){	// bouge si aucun menu n'est ouvert
				// bouger avec le click de souris
				xHeroClick = xHero;
				yHeroClick = yHero;
				
				if(rowClick >= rowHero && rowClick <= rowHero+3 && colClick == colHero && rowClick >0)
					clickCanvasX = 1;
				if(rowClick <= rowHero && rowClick >= rowHero-3 && colClick == colHero && rowClick >0)
					clickCanvasX = -1;
				if(clickCanvasX==0 && yClick - Game.camera.y < rect.height-menuH){
					if(colClick >= colHero && colClick <= colHero +3 && rowClick == rowHero)
						clickCanvasY = 1;
					if(colClick <= colHero && colClick >= colHero-3 && rowClick  == rowHero)
						clickCanvasY = -1;
				}
			}
			/*gestion menu*/
		
			var xClick = event.clientX - rect.left;
			var yClick = event.clientY - rect.top;
			
			if(xClick < 60 && yClick >rect.height/10 && yClick < rect.height/10+64)
				Game.hero.creuse(Game.hero.x, Game.hero.y, map);
			
			var n = 0;
			
			Object.keys(objets).forEach(function(key) {// menu.js ligne 54
				if(Game.hero.equipement[key].possession == 1 && Game.hero.equipement[key].life > 0){
					if(xClick < 60 && yClick >rect.height/4+n && yClick < rect.height/4+64+n){
						if(Game.hero.equipement[key].equipe == 1){
							Game._removeEquipe();
						}else{
							Game._removeEquipe();
							Game.hero.equipement[key].equipe = 1;
						}
					}
					n = n+100;
				}
			})
		
		//si fiche du batiment ouvert
		if(batimentclick == 1){
			if( xClick > rect.width/4 && xClick < 32 + rect.width/4 
			&&  yClick > rect.height/4 &&  yClick <  rect.height/4 + 32){ //ko
				batimentclick = 0;
			}

			if( xClick > rect.width/3+128+colonneBatimentClicResponsive && xClick < 32 + rect.width/3+128+colonneBatimentClicResponsive 
			&&  yClick > rect.height/5+35 &&  yClick <  rect.height/5+35 + 32){ //ok upgrade batiment
				Game.hero._upgradeBuild(builds[map.getRow(Game.hero.x)+'-'+map.getCol(Game.hero.y)]);
			}
		}
		
		//si fiche du body ouvert
		if(menuBodyClick == 1){
			if( xClick > rect.width/4 && xClick < 32 + rect.width/4 
			&&  yClick > rect.height/4 &&  yClick <  rect.height/4 + 32){ //ko
				menuBodyClick = 0;
			}
			
			var incr 	= 0;
			var nbLigne = 0;
			//click des artefacts, description apparait
			for(var i =0; i< Game.hero.artefact.length; i++){
				if( xClick > rect.width/4+ incr && xClick < 32 + rect.width/4 + incr
					&&  yClick > rect.height/4+20+180 + nbLigne &&  yClick <  rect.height/4 + 32+20+180 + nbLigne){ //ko
						artefactSelectionne = allArtefacts[Game.hero.artefact[i]];
				}
				incr+= 32;
				if(i>6){
					nbLigne = 55;
					incr = 0;
				}
			}
			//click sur le bouton ok, on utilise l'artefact
			if( xClick > rect.width/4+170 && xClick < 32 + rect.width/4+170 &&  yClick > rect.height/4+20+100 &&  yClick <  rect.height/4+20+100+32){
				var index = Game.hero.artefact.indexOf(artefactSelectionne.name);
				if(artefactSelectionne.duree != ''){
					Game.hero.artefactEnCours[artefactSelectionne.name+'-'+day+'-'+hour] = 
						{
							'artefact' : artefactSelectionne,
							'heure' : hour + artefactSelectionne.duree.heure,
							'jour' : day + artefactSelectionne.duree.jour
						};
					Game.hero.artEnCours(artefactSelectionne);
				}else{
					var nameArtefact = artefactSelectionne.name;
					Game.hero[nameArtefact]();
				}
				Game.hero.artefact.splice(index, 1);
				menuBodyClick = 0;
			}
			
		}
		//si sous menu ouvert
		if(menussclick!=0){
			if(xClick >249 && xClick <278 && yClick >rect.height-menuH*5.5 &&  yClick < rect.height-menuH*5.5+22 ){ //ok
				Game.hero.addBuild(Game.hero.x, Game.hero.y, map, allBuilding[keySelected].paramBuild['typeBatiment'],
				allBuilding[keySelected].caracteristique, allBuilding[keySelected].supplyBuild, allBuilding[keySelected].paramBuild['typeTile'],
				allBuilding[keySelected].paramBuild['life'], allBuilding[keySelected].paramBuild['solid']);
			}

			if(xClick >289 && xClick <317 && yClick >rect.height-menuH*5.5 &&  yClick < rect.height-menuH*5.5+22 ){ //ko
				menussclick = 0;
				menuclick = 0;
			}
		}
		Game._clickMenu(xClick, yClick, menuH, rect, Game.hero.map.tsize);
			
		},
	false);
	
    document.getElementById("speed0").addEventListener('click', function () {
        clearTimeout(currentTime.timeOut);
    });
    document.getElementById("speed1").addEventListener('click', function () {
        clearTimeout(currentTime.timeOut);
        currentTime.startTime(1000);
    });
    document.getElementById("speed2").addEventListener('click', function () {
        clearTimeout(currentTime.timeOut);
        currentTime.startTime(250);
    });
    document.getElementById("speed3").addEventListener('click', function () {
        clearTimeout(currentTime.timeOut);
        currentTime.startTime(100);
    });
	
	window.onresize = resize;

	function resize()
	{
		var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		canvas  = document.getElementById('map_canvas');
		canvas.width = x;
		canvas.height = y - 50;
		Game.camera = new Camera(Game.hero.map, x, y-100);
		Game.camera.follow(Game.hero);
	}
	
};

Game._removeEquipe = function () {
	Object.keys(objets).forEach(function(key) {
		Game.hero.equipement[key].equipe = 0;
	})
}

Game._getToolEquipe = function () {
	
	var objetEquipe = '';
	Object.keys(objets).forEach(function(key) {
		if(Game.hero.equipement[key].equipe == 1)
			objetEquipe = key;
	})
	return objetEquipe;
}
 
Game.update = function (delta) {
               
    // handle hero movement with arrow keys
    var dirx = 0;
    var diry = 0;
    if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
    else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
    else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
    else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }

	if(this.hero.life<=0) return false;
	if(clickCanvasX!=0 || clickCanvasY!=0){
		dirx = clickCanvasX;
		diry = clickCanvasY;
	}
	
    this.hero.move(delta, dirx, diry);
	
	//mouvement monstres
	Object.keys(monsters).forEach(function(key) {
		if(monsters[key].vitesse >0){
			monsters[key].move(delta, Game.hero.x, Game.hero.y);
		}
	})
	
    this.camera.update();
};
 
Game._drawLayer = function (layer) {
    var startCol = Math.floor(this.camera.x / map.tsize);

    var endCol = startCol + (this.camera.width / map.tsize);
    var startRow = Math.floor(this.camera.y / map.tsize);
    var endRow = startRow + (this.camera.height / map.tsize);
    var offsetX = -this.camera.x + startCol * map.tsize;
    var offsetY = -this.camera.y + startRow * map.tsize;
	
	Game.anim++;
	
    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var tile = map.getTile(layer, c, r);
			
			
				// if(tile==6){
					// if(Game.anim>=DUREE_ANIMATION){
						// abs2[r*map.rows+c]=7;
					// }
				// }
				// else if(tile==7){
					// if(Game.anim>=DUREE_ANIMATION){
						// abs2[r*map.rows+c]=6;
					// }
				// }
				
				if(tile==8){
					if(Game.anim>=DUREE_ANIMATION){
						abs2[r*map.rows+c]=9;
						absobs2[r*map.rows+c]=9;
					}
				}
				else if(tile==9){
					if(Game.anim>=DUREE_ANIMATION){
						abs2[r*map.rows+c]=8;
						absobs2[r*map.rows+c]=8;
					}
				}
			
			
            var x = (c - startCol) * map.tsize + offsetX;
            var y = (r - startRow) * map.tsize + offsetY;
			
			if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    Math.round(x),  // target x
                    Math.round(y), // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
			}
        }
    }
	
	if(layer == 1){

		Object.keys(builds).forEach(function(key) {//barre de vie
			if(builds[key].caracteristique['showLife']==1)
				Game._drawRectangle('#FFFFFF', builds[key].row*map.tsize-Math.round(Game.camera.x), builds[key].col*map.tsize-Math.round(Game.camera.y)+map.tsize+5, builds[key].life);
		})
		//sprite personnages
		if(Game.anim>=DUREE_ANIMATION/2){
				Game.hero.image = Loader.getImage('hero2');
				Object.keys(monsters).forEach(function(key) {
					monsters[key].image = Loader.getImage(monsters[key].image1);
				})
		}
		else{
			Game.hero.image = Loader.getImage('hero');
			Object.keys(monsters).forEach(function(key) {
				monsters[key].image = Loader.getImage(monsters[key].image2);
			})
		}
		
		/** start tourelle */
		//tir tourelles portée : 2
		Object.keys(builds).forEach(function(key) {
			if(builds[key].batiment[0] == 6 && builds[key].cible==0){
				Object.keys(monsters).forEach(function(keyMonster) {
					
					if(builds[key].calculPortee(
						builds[key].row, 
						builds[key].col, 
						builds[key].caracteristique['portee'], 
						monsters[keyMonster].row, 
						monsters[keyMonster].col
					)){
						builds[key].cible = monsters[keyMonster];	
					}	
				});
			}
				
		});
	
		Object.keys(builds).forEach(function(key) {
			if(builds[key].batiment[0] == 6 && builds[key].cible!=0){
				yFinal =  builds[key].cible.y;
				xFinal =  builds[key].cible.x+20;
				
				if(builds[key].x>builds[key].cible.x){
					xDistance = builds[key].x- xFinal;
				}
				else{
					xDistance = xFinal - builds[key].x ;
				}
				if(builds[key].y>yFinal)
					yDistance = builds[key].y- yFinal;
					else
					yDistance = yFinal - builds[key].y ;

				
				if((builds[key].xDelta <= xDistance || builds[key].yDelta <= yDistance) && builds[key].cible.life>0){
					
					if(builds[key].xDelta>= xDistance)
						builds[key].xDelta=xDistance;
					if(builds[key].yDelta>= yDistance)
						builds[key].yDelta=yDistance;
					
					if(builds[key].x>xFinal)
						var distX = builds[key].x- builds[key].xDelta-Game.camera.x;
					else
						var distX = builds[key].x+ builds[key].xDelta-Game.camera.x;
					if(builds[key].y>yFinal)
						var distY = builds[key].y- builds[key].yDelta-Game.camera.y;
					else
						var distY = builds[key].y+ builds[key].yDelta-Game.camera.y;
					
					
					Game.ctx.drawImage(
							Loader.getImage('ball'), // image
							0, // source x
							0, // source y
							map.tsize, // source width
							map.tsize, // source height
							distX,  // target x
							distY, 
							map.tsize, // target width
							map.tsize // target height
						);
						
					builds[key].xDelta++;
					builds[key].yDelta++;
				}else{
					builds[key].xDelta=0;
					builds[key].yDelta=0;
					builds[key].cible.life = builds[key].cible.life-builds[key].caracteristique['attaque'];
					builds[key].cible =0;
					builds[key].cibleMouvante =0;
				}
			}
		});

		/** end tourelle */
	}
	
	if(Game.anim>=DUREE_ANIMATION)
		 Game.anim=0;
};
 
Game._drawGridMenu = function () {
        var width = map.cols * map.tsize;
		var height = map.rows * map.tsize;
		var x, y;
		// for (var r = 0; r < map.rows; r++) {
			// x = - this.camera.x;
			// y = r * map.tsize - this.camera.y;
			// this.ctx.beginPath();
			// this.ctx.moveTo(x, y);
			// this.ctx.lineTo(width, y);
			// this.ctx.stroke();
		// }
		// for (var c = 0; c < map.cols; c++) {
			// x = c * map.tsize - this.camera.x;
			// y = - this.camera.y;
			// this.ctx.beginPath();
			// this.ctx.moveTo(x, y);
		   // this.ctx.lineTo(x, height);
			// this.ctx.stroke();
		// }
	
	if(typeof(animBack) != "undefined" && animBack != null) { // pour les bulles qui montent et qui descendent
		
		if(Game.animBulle < 100 && Game.animBulleBas == 0){
			Game.animBulle++;
				Game.ctx.drawImage(
							animBack.image, // image
							0, // source x
							0, // source y
							map.tsize, // source width
							map.tsize, // source height
							animBack.x-15-Game.camera.x,  // target x
							animBack.y-15-Game.camera.y-Game.animBulle, 
							map.tsize, // target width
							map.tsize // target height
						);
		}
		if(Game.animBulle == 100)
			Game.animBulleBas = 1;
		if(Game.animBulle <= 100 && Game.animBulleBas == 1){
			Game.animBulle--;
				Game.ctx.drawImage(
							animBack.image, // image
							0, // source x
							0, // source y
							map.tsize, // source width
							map.tsize, // source height
							animBack.x-15-Game.camera.x,  // target x
							animBack.y-15-Game.camera.y-Game.animBulle, 
							map.tsize, // target width
							map.tsize // target height
						);
		}
		if(Game.animBulle == 50 && Game.animBulleBas == 1){
			animBack		  = null;
			Game.animBulleBas = 0;
		}
	}
	
	// draw main character nouvel emplacement
	this.ctx.drawImage(
        this.hero.image,
        this.hero.screenX - this.hero.width / 2,
        this.hero.screenY - this.hero.height / 2
    );
	
	if(this.hero.life<=0){
	   this.ctx.font = "50px Arial";
	   this.ctx.fillText("VOUS AVEZ PERDU !",0,this.hero.screenY);
	}
	
	
	

	if(typeof(anim) != "undefined" && anim !== null) {
		if(Game.animBref<=DUREE_ANIMATION){
	
				Game.ctx.drawImage(
							anim.image, // image
							0, // source x
							0, // source y
							map.tsize, // source width
							map.tsize, // source height
							anim.x-15-Game.camera.x,  // target x
							anim.y-15-Game.camera.y-Game.animBref, 
							map.tsize, // target width
							map.tsize // target height
						);
			Game.animBref++;
			Game.animBref++;
		}else{
			anim			=	null;
			Game.animBref	=	0;
		}
	}
	
	
	
	this._drawMenu();
	
};



 
Game._drawRectangle = function (color, xpos, ypos, life) {
        this.ctx.fillStyle=color;
		this.ctx.fillRect(xpos, ypos, life, 10);
		
};
 
Game.render = function () {
    // draw map background layer
    this._drawLayer(0);
    // draw main character
    // draw map top layer
    this._drawLayer(1);
   
   
	Object.keys(artefacts).forEach(function(key) {
		if(absobs1[artefacts[key].col * map.rows + artefacts[key].row] != 7){//EXPLORATION 
			Game.ctx.drawImage(
						Loader.getImage(artefacts[key].image), // image
						0, // source x
						0, // source y
						map.tsize, // source width
						map.tsize, // source height
						artefacts[key].x-Game.camera.x,  // target x
						artefacts[key].y-Game.camera.y, // target y
						map.tsize, // target width
						map.tsize // target height
					);
		}
	})
   
	Object.keys(monsters).forEach(function(key) {
	if(monsters[key].life>0){
			// draw main character
			if(absobs1[monsters[key].col * map.rows + monsters[key].row] != 7){//EXPLORATION 
				Game.ctx.drawImage(
					monsters[key].image, // image
					0, // source x
					0, // source y
					map.tsize, // source width
					map.tsize, // source height
					monsters[key].x-Game.camera.x,  // target x
					monsters[key].y-Game.camera.y, // target y
					map.tsize, // target width
					map.tsize // target height
				);
			
	
				Game.ctx.fillStyle="#FF0000";
				Game.ctx.fillRect(2+monsters[key].x-Game.camera.x, monsters[key].y+70-Game.camera.y, monsters[key].life, 10);
			}
		}else{
				Game.hero.xp = Game.hero.xp +monsters[key].level*5;//XP A CHAQUE MONSTRE VAINCU EN FONCTION DU LEVEL DU MONSTRE
				anim = new animation(map, monsters[key].x, monsters[key].y, 'xp');
				
				delete monsters[key];						
					
			}
		})

	this.ctx.fillStyle="#FF0000";
	this.ctx.fillRect(this.hero.screenX-30, this.hero.screenY+40, this.hero.life, 10);
	this.ctx.fillStyle="blue";
	this.ctx.fillRect(this.hero.screenX-30, this.hero.screenY+52, this.hero.fatigue, 10);
	if(this._getToolEquipe() == 'epee'){
		this.ctx.fillStyle="green";
		this.ctx.fillRect(this.hero.screenX-30, this.hero.screenY+64, this.hero.attaqueEnCours, 10);
	}
	
	
    this._drawGridMenu();
	
	
	if(builds[this.hero.map.getRow(this.hero.x)+'-'+this.hero.map.getCol(this.hero.y)]){//loupe si heros sur batiment
		Game.ctx.drawImage(
			Loader.getImage('loupe'),
			this.hero.x-16-this.camera.x,
			this.hero.y-this.camera.y
		);
	}
	
    this._clickBatiment();
    this._clickBody();
};