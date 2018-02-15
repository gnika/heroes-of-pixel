DUREE_ANIMATION 				= 50;
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
	objets['epee']  = {'img':'epee_bois', 'name':'epee', 'life':100, 'possession':0, 'equipe':0};
	
    this.hero = new Hero(map, 160, 160, 60, 60, 15, 5, 0, objets);//map - x - y - vie - attaque - defense - xp - objet
	

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
			var menuH = Game.hero.map.tsize/2;	
		document.getElementById("div1").innerHTML = '';
		document.getElementById("div2").innerHTML = '';
		var tile = document.getElementById("edit").value;
		
		var editAbs = document.querySelector('input[name = "editAbs"]:checked').value;
		
		if(editAbs == 1)
			abs1[colClick * map.rows + rowClick] = tile;
		else
			abs2[colClick * map.rows + rowClick] = tile;
		
			for(var i = 0; i < abs1.length; i++){
				var inner = document.getElementById("div1").innerHTML;
				if(i==0)
					inner+=abs1[i];
				else
				inner+=', '+abs1[i];
				document.getElementById("div1").innerHTML = inner;
			}
		
			document.getElementById("div1").innerHTML = 'abs1 = ['+document.getElementById("div1").innerHTML +'];';
			
			for(var i = 0; i < abs2.length; i++){
				var inner = document.getElementById("div2").innerHTML;
				if(i==0)
					inner+=abs2[i];
				else
				inner+=', '+abs2[i];
				document.getElementById("div2").innerHTML = inner;
			}
			document.getElementById("div2").innerHTML = 'abs2 = ['+document.getElementById("div2").innerHTML +'];';

			
			document.getElementById("row").value = rowClick;
			document.getElementById("col").value = colClick;
			document.getElementById("x").value = rowClick*64;
			document.getElementById("y").value = colClick*64;
			document.getElementById("place").value = colClick*48+rowClick;
		},
	false);
	
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
			
				if(tile==8){
					if(Game.anim>=DUREE_ANIMATION){
						abs2[r*map.rows+c]=9;
					}
				}
				else if(tile==9){
					if(Game.anim>=DUREE_ANIMATION){
						abs2[r*map.rows+c]=8;
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
		
		
	}
	
	if(Game.anim>=DUREE_ANIMATION)
		 Game.anim=0;
};
 
Game._drawGridMenu = function () {
        var width = map.cols * map.tsize;
		var height = map.rows * map.tsize;
		var x, y;
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
    this._clickMonstre();
};