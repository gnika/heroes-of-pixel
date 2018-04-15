DUREE_ANIMATION 				= 50;
DUREE_ANIMATION_MAP				= 150;
niveauMap						= 1;
niveauMapSelect					= 0;//pour ne passer qu'une fois au niveau suivant
builds          				= [];
buildsTmp          				= [];//pour garder les batiments construits quand on va dans une piece
layer1Tmp						= [];//pour garder les tuiles explorées quand on va dans une piece
layer2Tmp						= [];//pour garder les tuiles exploréess quand on va dans une piece
layer1ExplTmp					= [];//pour garder les tuiles explorées quand on va dans une piece
layer2ExplTmp					= [];//pour garder les tuiles explorées quand on va dans une piece
artefactsTmp					= [];//pour garder les artefacts quand on va dans une piece
monstersTmp						= [];//pour garder les monstres quand on va dans une piece
xyHeroTmp						= [];//pour garder les coordonnées quand on va dans une piece
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
dialogue						= 0;
yHeroClick						= 0;
menuclick						= 0;
menuBodyClick					= 0;
batimentclick					= 0;
menussclick						= 0;
menussclickPlaceBatiment		= 0;
PlaceBatiment					= [];
hour	   						= 8;
day			    				= 1;
batimentClickResponsive		 	= 4;
colonneBatimentClicResponsive	= 0;
dirx 							= 0;
diry							= 0;
dirx2 							= 0;
diry2							= 0;
path							= [];
paramX							= 0;
paramY							= 0;
directionAttaque				= '';
lifeHero						= 60;
clignote						= 0;







 
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

function animation(map, x, y, imageName, etat){
	var isArray = Array.isArray(imageName);
	
	this.map = map;
	this.x = x;
    this.y = y;
	if(isArray == false)
		this.image = Loader.getImage(imageName);
	else
		this.images = imageName;
	this.etat = Loader.getImage(etat);
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
	// var audio = new Audio('assets/sound/ambiance1.mp3');
	// audio.loop = true;
	// audio.play();
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	
	//resize en fonction de l'écran
	canvas  = document.getElementById('map_canvas');
    canvas.width = x;
    canvas.height = y - 60;
	
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
    this.tileAtlas2 = Loader.getImage('tiles2');
    this.tileAtlas3 = Loader.getImage('tiles3');
    this.tileAtlas4 = Loader.getImage('tiles4');
    this.tileAtlas5 = Loader.getImage('tiles5');
	
 
	this.anim = 0;
	this.animMap = 0;
	this.animSprite = 0;
	this.animAttaque = 0;
	this.animSpriteRetour = 0;
	this.animBref = 0;
	this.animBulle = 50;
	this.animBulleBas = 0;
	
	objets['pelle'] = {'img':'pelle_bois', 'name':'pelle', 'life':100, 'possession':1, 'equipe':0};
	objets['faux']  = {'img':'faux_bois', 'name':'faux', 'life':100, 'possession':1, 'equipe':0};
	objets['pioche']  = {'img':'pioche_bois', 'name':'pioche', 'life':100, 'possession':0, 'equipe':0};
	objets['epee']  = {'img':'epee_bois', 'name':'epee', 'life':100, 'possession':1, 'equipe':0};
	objets['road']  = {'img':'road_bois', 'name':'road', 'life':100, 'possession':1, 'equipe':0};
	
    this.hero = new Hero(map, 160, 160, lifeHero, 60, 15, 5, 0, objets);//map - x - y - vie - attaque - defense - xp - objet
	
	save();//RECUPERATION DE LA SAUVEGARDE
	
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
			var equip 	= Game._getToolEquipe();
			var pos     = map.getRow(yClick)*map.rows+map.getCol(xClick);
			var posHero = colHero * map.cols + rowHero;

			if(menussclickPlaceBatiment == 1){ 		//placement de batiment
				
				Object.keys(PlaceBatiment).forEach(function(key) {
					if(	pos == PlaceBatiment[key].pos && PlaceBatiment[key].img == 'buildOn' ){
						
						var xBat = 0;
						var yBat = 0;
						
						if(key == 'droite'){
							xBat = Game.hero.x + (map.tsize/2);
							yBat = Game.hero.y - map.tsize/2;
						}
						if(key == 'gauche'){
							xBat = Game.hero.x - (map.tsize + map.tsize/2);
							yBat = Game.hero.y - map.tsize/2;
						}
						if(key == 'haut'){
							xBat = Game.hero.x - map.tsize/2;
							yBat = Game.hero.y - (map.tsize + map.tsize/2);
						}
						if(key == 'bas'){
							xBat = Game.hero.x - map.tsize/2;
							yBat = Game.hero.y + map.tsize/2;
						}
						
						
						abs2[pos]= PlaceBatiment['batiment'].typeBatiment[0];
						var nameBuild = 'build-'+rowClick+'-'+colClick+'-ing';
						
						Object.keys(PlaceBatiment['batiment'].supply).forEach(function(key) { // paye le prix
							Game.hero.supply[key] =  Game.hero.supply[key] - PlaceBatiment['batiment'].supply[key];
						})
						
						Game.nameBuild = new Building(map, xBat, yBat, rowClick,
						colClick, PlaceBatiment['batiment'].life, PlaceBatiment['batiment'].nameBuild, PlaceBatiment['batiment'].typeBatiment,
						PlaceBatiment['batiment'].caracteristique, PlaceBatiment['batiment'].typeTile, PlaceBatiment['batiment'].solid);
						builds[rowClick+'-'+colClick]=Game.nameBuild;

						anim = new animation(map, xBat + map.tsize/2, yBat, 'cloud');
						
					}
				})
				
				menussclickPlaceBatiment = 0;
				PlaceBatiment = [];
				return false;
			}
			
			if(menuclick == 1 && menussclick == 0 && xClick > map.tsize*3 + Game.camera.x){
				menuclick = 0;
				return false;
			}
			if(rowClick == rowHero && colHero == colClick && batimentclick == 0 && dialogue == 0 && menuclick == 0	){
				Game.hero.creuse(xClick, yClick, Game.hero.map);
				return false;
			}
			
			if( menuclick== 0 && monsters[rowClick+'-'+colClick] && (( rowHero == rowClick || rowHero == rowClick+1 || rowHero == rowClick-1)
				&&(colHero == colClick+1 || colHero == colClick-1 || colHero == colClick)) && monsters[rowClick+'-'+colClick].attaque == 0){
					dialogue = 1;
					Game.dialogue(monsters[rowClick+'-'+colClick]);
				}
				
			
			/*gestion menu*/
		
			var xClick = event.clientX - rect.left;
			var yClick = event.clientY - rect.top;
			
			if(xClick < 60 && yClick >rect.height/14 && yClick < rect.height/14+64){
				Game.hero.food();
				return false;
			}
			
			var n = 0;
			var equip = 0;
			Object.keys(objets).forEach(function(key) {// menu.js ligne 54
				if(Game.hero.equipement[key].possession == 1 && Game.hero.equipement[key].life > 0){
					if(xClick < 60 && yClick >rect.height/6+n && yClick < rect.height/6+64+n){
						if(Game.hero.equipement[key].equipe == 1){
							Game._removeEquipe();
							equip = 1;
						}else{
							Game._removeEquipe();
							Game.hero.equipement[key].equipe = 1;
							equip = 1;
						}
					}
					n = n+100;
				}
			})
			// n = n+100;
			
			if(xClick < 60 && yClick >rect.height/6+n && yClick < rect.height/6+64+n && menuclick == 0 && menuBodyClick == 0){
				menuclick = 1;
			}
			else if(xClick < 60 && yClick >rect.height/6+n && yClick < rect.height/6+64+n && menuclick == 1 && menuBodyClick == 0){
				menuclick = 0;
				menussclick=0;
			}
			Game._clickMenu(xClick, yClick, menuH, rect, Game.hero.map.tsize);
			
			if(menussclick == 0 && batimentclick == 0 && menuBodyClick == 0 && dialogue == 0 && equip == 0){	// bouge si aucun menu n'est ouvert
					path		 = [];
					
					var rowX = map.getRow(Game.hero.x);
					var colY = map.getCol(Game.hero.y);
					Game.hero.x = rowX * map.tsize+ map.tsize/2;
					Game.hero.y = colY * map.tsize+ map.tsize/2;
					
					clickCanvasX = 0;
					clickCanvasY = 0;
					dirx		 = 0;
					diry		 = 0;
					paramX		 = 0;
					paramY		 = 0;
					posHeroInitial = posHero;
					
					path = findPath(posHero, pos);
					// console.log(path);
					// bouger avec le click de souris
					xHeroClick = xHero;
					yHeroClick = yHero;
					
			}
			//si fiche du batiment ouvert
			if(batimentclick == 1){
				if( xClick > rect.width/4 && xClick < 32 + rect.width/4 
				&&  yClick > rect.height/4 &&  yClick <  rect.height/4 + 32){ //ko
					batimentclick = 0;
				}

				if( xClick > rect.width/3+128+colonneBatimentClicResponsive && xClick < 32 + rect.width/3+128+colonneBatimentClicResponsive 
				&&  yClick > rect.height/5+35 &&  yClick <  rect.height/5+35 + 32){ //ok upgrade batiment
					Game.hero._upgradeBuild(builds[map.getRow(Game.hero.x)+'-'+map.getCol(Game.hero.y)]);
					// console.log(builds, map.getRow(Game.hero.x)+'-'+map.getCol(Game.hero.y), builds[map.getRow(Game.hero.x)+'-'+map.getCol(Game.hero.y)]);
				}
			}
			
			//si dialogue ouvert
			if(dialogue == 1){
				// alert(xClick);
				// alert(rect.width);
				// alert(screen.width);
				// xClick = event.pageX;
				// yClick = event.pageY;
				
				if( xClick > rect.width/4 && xClick < 32 + rect.width/4 
				&&  yClick > rect.height/4 &&  yClick <  rect.height/4 + 32){ //ko
					dialogue = 0;
				}

				if( xClick > rect.width/4 +290 && xClick < 32 + rect.width/4 +290
				&&  yClick > rect.height/4+20+100 &&  yClick <  rect.height/4 + 32+20+200){ //acceptQuete
					Game._questClickPay();
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
						Game.hero[nameArtefact]();	//nom de l'artefact en dynamique
					}
					Game.hero.artefact.splice(index, 1);
					menuBodyClick = 0;
				}
				
			}
			//si sous menu ouvert
			if(menussclick!=0){
				//map.tsize*7, map.tsize*2+10
				if(xClick >map.tsize*7 && xClick <map.tsize*7+32 && yClick >map.tsize*2+10 &&  yClick < map.tsize*2+10+32 ){ //ok
					Game.hero.addBuild(Game.hero.x, Game.hero.y, map, allBuilding[keySelected].paramBuild['typeBatiment'],
					allBuilding[keySelected].caracteristique, allBuilding[keySelected].supplyBuild, allBuilding[keySelected].paramBuild['typeTile'],
					allBuilding[keySelected].paramBuild['life'], allBuilding[keySelected].paramBuild['solid']);
				}
				if(xClick >map.tsize*7+32 && xClick <map.tsize*7+64 && yClick >map.tsize*2+10 &&  yClick < map.tsize*2+10+32 ){ //ko
					menussclick = 0;
				}
			}
			
			
			
		},
	false);
	
    // document.getElementById("speed0").addEventListener('click', function () {
        // clearTimeout(currentTime.timeOut);
    // });
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
		Game.camera = new Camera(Game.hero.map, x, y-50);
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
    // var dirx = 0;
    // var diry = 0;
    // if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
    // else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
    // else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
    // else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }

	
	var rowX = map.getRow(this.hero.x);
	var colY = map.getCol(this.hero.y);
	
	posHero = colY * map.cols + rowX;
	
	
		
	if(path.length > 1){	//si les deux prochains mouvements sont en ligne droite
		if(path[1] == path[0] + 1 && posHero == path[0] ){
			dirx2 = 1;
			diry2 = 0;
		}
		if( path[1] == path[0] - 1 && posHero == path[0] ){
			dirx2 = -1;
			diry2 = 0;
		}
		if( path[1] == path[0] + map.rows && posHero == path[0] ){
			diry2 = 1;
			dirx2 = 0;
		}
		if( path[1] == path[0] - map.rows && posHero == path[0] ){
			diry2 = -1;
			dirx2 = 0;
		}
	}else{
		dirx2 = 0;
		diry2 = 0;
	}
	
	if( path.length > 0 ){
		if(path[0] != posHero){
			
			if(path[0] == posHeroInitial + 1 )
				clickCanvasX = 1;
			if( path[0] == posHeroInitial - 1 )
				clickCanvasX = -1;
			if( path[0] == posHeroInitial + map.rows )
				clickCanvasY = 1;
			if( path[0] == posHeroInitial - map.rows )
				clickCanvasY = -1;			
			
		}else {
				var rowX = map.getRow(this.hero.x);
				var colY = map.getCol(this.hero.y);
				paramX = rowX * map.tsize+ map.tsize/2;
				paramY = colY * map.tsize+ map.tsize/2;
				
				if((paramX == this.hero.x ) && (this.hero.y == paramY) || (dirx == dirx2 && diry == diry2)){
					
					path.shift();
					posHeroInitial = posHero;
					paramX		 = 0;
					paramY		 = 0;
					clickCanvasX = 0;
					clickCanvasY = 0;
				}
				
		}
	}else{
		posHeroInitial = posHero;
	}
	
	if(this.hero.life<=0) return false;
	
	if(clickCanvasX!=0 || clickCanvasY!=0 ){//|| (dirx == dirx2 || diry == diry2)
		dirx = clickCanvasX;
		diry = clickCanvasY;
	}else{
		dirx = 0;
		diry = 0;
	}
	
    this.hero.move(delta, dirx, diry, paramX, paramY, dirx2, diry2);
	
	if( path.length == 0){
		
		clickCanvasX = 0;
		clickCanvasY = 0;
		dirx		 = 0;
		diry		 = 0;
		paramX		 = 0;
		paramY		 = 0;

	}
	
	//mouvement monstres
	Object.keys(monsters).forEach(function(key) {
		if(monsters[key].vitesse >0){
			monsters[key].move(delta, Game.hero.x, Game.hero.y);
		}
	})
	//mouvement paysans
	paysanMove(delta);
	
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
	Game.animMap++;
	
    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var tile = map.getTile(layer, c, r);
			
			if(c%2 == 0){
				if(Game.animMap>=DUREE_ANIMATION_MAP/2)
						heigtImage = 64;
					else
						heigtImage = 0;
			}else{
				if(Game.animMap>=DUREE_ANIMATION_MAP/2)
						heigtImage = 0;
					else
						heigtImage = 64;
			}
			
            var x = (c - startCol) * map.tsize + offsetX;
            var y = (r - startRow) * map.tsize + offsetY;
			
			var tileA = this.tileAtlas;	//cycle jour / nuit
			// console.log(hour);
			if(hour >=23 || (hour>=0 && hour < 5))
				tileA = this.tileAtlas5;
			if(hour >=5 && hour < 6)
				tileA = this.tileAtlas4;
			if(hour >=6 && hour < 8)
				tileA = this.tileAtlas3;
			if(hour >=8 && hour < 10)
				tileA = this.tileAtlas2;
			if(hour >=10 && hour < 18)
				tileA = this.tileAtlas;
			if(hour >=18 && hour < 20)
				tileA = this.tileAtlas2;
			if(hour >=20 && hour < 22)
				tileA = this.tileAtlas3;
			if(hour >=22 && hour < 23)
				tileA = this.tileAtlas4;
			
			if (tile !== 0) { // 0 => empty tile

				
				
                this.ctx.drawImage(
                    tileA, // image
                    (tile - 1) * map.tsize, // source x
                    heigtImage, // source y
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
				// Game.hero.image = Loader.getImage('hero2');
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
	
	if(Game.animMap>=DUREE_ANIMATION_MAP)
		 Game.animMap=0;
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
	
	var entrepots = [];
	
	Object.keys(builds).forEach(function(key) {//entrepot
		if(builds[key].batiment == 61)
			entrepots.push(map.getRow(builds[key].y)*map.rows+map.getCol(builds[key].x));
	})
	
	Object.keys(builds).forEach(function(key) {// pour les bulles decompte de batiment / routes de liaison
	
		var posB = map.getRow(builds[key].y)*map.rows+map.getCol(builds[key].x);
		
		if(builds[key].batiment != 61 && builds[key].road == ''){ //ne le fait qu'une fois. Il faudrait un bouton dans la fiche du batiment pour trouver le chemin le plus rapide si deuxieme entrepot construit
			var pathBat = [];
			for (var i = 0; i < entrepots.length; i++){
				pathBat.push(findRoute(posB, entrepots[i]));
			}

			if(pathBat.length > 0){
				var plusPetitChemin = '';
				for (var i = 0; i < pathBat.length; i++) {
					if(plusPetitChemin == ''){
						plusPetitChemin = pathBat[i];
					}
					else if(pathBat[i].length < plusPetitChemin.length){
						plusPetitChemin = pathBat[i];
					}
				}
				
				if(plusPetitChemin.length > 0)
					plusPetitChemin.unshift(posB);
				
				builds[key].road = plusPetitChemin;	//doit toujours rester tel quel
				builds[key].paysan_position = {x: builds[key].x, y: builds[key].y};
			}
		}
			
		
		if(builds[key].batiment.length >1){

			if(builds[key].animBulle == null){
				builds[key].animBulle	 = 50;
				builds[key].animBulleBas = 0;
			}
			
			var position = builds[key].paysan_fois;
			
			if(builds[key].animBulle < 100 && builds[key].animBulleBas == 0)
				builds[key].animBulle++;
			if(builds[key].animBulle == 100)
				builds[key].animBulleBas = 1;
			if(builds[key].animBulle <= 100 && builds[key].animBulleBas == 1)
				builds[key].animBulle--;
			if(builds[key].road == '')
				position = 'no_road';
					
			Game.ctx.drawImage(
				Loader.getImage(position), // image
				0, // source x
				0, // source y
				map.tsize, // source width
				map.tsize, // source height
				builds[key].x+15-Game.camera.x,  // target x
				builds[key].y-5-Game.camera.y-builds[key].animBulle, 
				map.tsize, // target width
				map.tsize // target height
			);
			

			if(typeof(builds[key].caracteristique['prixUpdate']) != 'undefined' && builds[key].paysan_retour == 1 && builds[key].paysan_manque == ''){
				Game.ctx.drawImage(
					// Loader.getImage(Object.keys(builds[key].paysan_manque)[0]), // image
					Loader.getImage(Object.keys(builds[key].caracteristique['prixUpdate'])[0]), // image
					0, // source x
					0, // source y
					map.tsize, // source width
					map.tsize, // source height
					builds[key].paysan_position.x - Game.camera.x,  // target x
					builds[key].paysan_position.y-5 - Game.camera.y-builds[key].animBulle, 
					map.tsize, // target width
					map.tsize // target height
				);
				
				
			}
			if(typeof(builds[key].caracteristique['prixUpdate']) != 'undefined' && builds[key].paysan_retour == 1 && builds[key].paysan_manque != ''){
				Game.ctx.drawImage(
					Loader.getImage('no_'+Object.keys(builds[key].paysan_manque)[0]), // image
					0, // source x
					0, // source y
					map.tsize, // source width
					map.tsize, // source height
					builds[key].paysan_position.x - Game.camera.x,  // target x
					builds[key].paysan_position.y-15 - Game.camera.y-builds[key].animBulle, 
					map.tsize, // target width
					map.tsize // target height
				);
			}
			
			if(builds[key].animBulle == 50 && builds[key].animBulleBas == 1){
					builds[key].animBulleBas = 0;
			}
		}
	})
		
	
	//emplacement batiment consuctible
	if(menussclickPlaceBatiment == 1){
		this.hero.checkBuildPlace();		
	}
	
	
	// draw main character nouvel emplacement
	renderHero();
	
	
	if(this.hero.life<=0){
	   this.ctx.font = "60px bold cursive";
	   this.ctx.fillStyle = "black";
	   this.ctx.fillText("VOUS AVEZ PERDU !",this.hero.screenX - this.hero.width / 2,this.hero.screenY - this.hero.height / 2);

	}
	

	if(typeof(anim) != "undefined" && anim !== null) {
		if(Game.animBref<=DUREE_ANIMATION){
				if(anim.etat !== null)
					Game.ctx.drawImage(
						anim.etat, // image
						0, // source x
						0, // source y
						map.tsize, // source width
						map.tsize, // source height
						anim.x-30-Game.camera.x,  // target x
						anim.y-15-Game.camera.y-Game.animBref, 
						map.tsize, // target width
						map.tsize // target height
					);
							
				if(typeof(anim.images) != "undefined"){
					
					var n = 0;
					for(var i = 0; i < anim.images.length;i++){
						Game.ctx.drawImage(
							Loader.getImage(anim.images[i]), // image
							0, // source x
							0, // source y
							map.tsize, // source width
							map.tsize, // source height
							anim.x-15-Game.camera.x-n,  // target x
							anim.y-15-Game.camera.y-Game.animBref, 
							map.tsize, // target width
							map.tsize // target height
						);
						n = n - 20;
					}
				}else
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
		this.ctx.fillRect(xpos, ypos, life, 5);
		
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
			
				if(monsters[key].attaque > 0){
					Game.ctx.fillStyle="#FF0000";
					Game.ctx.fillRect(2+monsters[key].x-Game.camera.x, monsters[key].y+70-Game.camera.y, monsters[key].life, 5);
				}
			}
		}else{
				Game.hero.supply.xp = Game.hero.supply.xp +monsters[key].level*5;//XP A CHAQUE MONSTRE VAINCU EN FONCTION DU LEVEL DU MONSTRE
				anim = new animation(map, monsters[key].x, monsters[key].y, 'xp');
				
				delete monsters[key];						
					
			}
		})
		
		
		Object.keys(builds).forEach(function(key) {
			if(builds[key].road.length >0  && builds[key].paysan_fois > 0){
				animPaysan(builds[key]);				
			}
		})
		// if(Game.animSpriteRetour == 0)
			Game.animSprite ++;
		// else
			// Game.animSprite --;
	// if(Game.animSprite >= DUREE_ANIMATION)
		// Game.animSpriteRetour = 1;
	// if(Game.animSprite <= 0)
		// Game.animSpriteRetour = 0;
	if(Game.animSprite >= DUREE_ANIMATION){
		Game.animSprite = 0;
		if(Game.animSpriteRetour == 0)
			Game.animSpriteRetour = 1;
		else
			Game.animSpriteRetour = 0;
	}
	if(directionAttaque != ''){
		Game.animAttaque ++;
		if(Game.animAttaque >= DUREE_ANIMATION){
			Game.animAttaque = 0;
			directionAttaque = '';
		}
	}
	
	
	this.ctx.fillStyle="#FF0000";
	this.ctx.fillRect(this.hero.screenX-30, this.hero.screenY+40, this.hero.life, 5);
	this.ctx.fillStyle="blue";
	this.ctx.fillRect(this.hero.screenX-30, this.hero.screenY+47, this.hero.fatigue, 5);
	if(this._getToolEquipe() == 'epee'){
		this.ctx.fillStyle="green";
		this.ctx.fillRect(this.hero.screenX-30, this.hero.screenY+54, this.hero.attaqueEnCours, 5);
	}
	
	
    this._drawGridMenu();
	
	
	if(builds[this.hero.map.getRow(this.hero.x)+'-'+this.hero.map.getCol(this.hero.y)] && menuclick == 0){//loupe si heros sur batiment
		Game.ctx.drawImage(
			Loader.getImage('loupe'),
			this.hero.x-16-this.camera.x,
			this.hero.y-this.camera.y
		);
	}
	
    this._clickBatiment();
    this._clickBody();
    this._clickMonstre();
};