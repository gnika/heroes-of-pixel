DUREE_ANIMATION = 50;
builds          = [];
monsters        = [];
supply          = [];



 
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
 
 
 
Game.load = function () {
    return [
        Loader.loadImage('tiles', 'assets/tiles_new.png'),
		Loader.loadImage('hero', 'assets/character.png'),
		Loader.loadImage('hero2', 'assets/character2.png'),
		Loader.loadImage('troll2', 'assets/troll2.png'),
		Loader.loadImage('troll3', 'assets/troll3.png'),
		Loader.loadImage('scorpion1', 'assets/scorpion1.png'),
		Loader.loadImage('scorpion2', 'assets/scorpion2.png'),
		Loader.loadImage('coin', 'assets/coin.png'),
		Loader.loadImage('cloud', 'assets/cloud.png'),
		Loader.loadImage('xp', 'assets/xp.png'),
		Loader.loadImage('ball', 'assets/ball.png'),
		Loader.loadImage('pain', 'assets/bread.png')
    ];
};
 
Game.init = function () {
    var currentTime = new Time();
    currentTime.startTime(1000);
    
    Keyboard.listenForEvents(
        [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
    this.tileAtlas = Loader.getImage('tiles');
 
	this.anim = 0;
	this.animBref = 0;
    this.hero = new Hero(map, 160, 160, 60, 15, 200, 0, 0, 0, 0, 0, 'pelle');//map - x - y - vie - attaque - defense - ecu - bois - ble - argile - xp - objet
	generateTroll(64, 64, 1, 1);
	// generateTroll(192, 192, 3, 3);
	// generateMonstre(map, 192, 192, 3, 3, 10, 10, 0.2, 1, 'scorpion1', 'scorpion2', 2, -1, 0);
	generateMonstre(map, 384, 192, 6, 2, 10, 10, 0.2, 1, 'scorpion1', 'scorpion2', 1, -1, 0);
	generateMonstre(map, 576, 192, 9, 3, 3, 10, 0.2, 1, 'scorpion1', 'scorpion2', 0.2, 0, 1);

    this.camera = new Camera(map, 1024, 768);
    this.camera.follow(this.hero);

	document.getElementById("addTour").addEventListener('click',
		function(){
			var caracteristique = [];
			caracteristique['level'] =1;
			caracteristique['attaque'] =10;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =2;
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 6, caracteristique, 0, 60, 1);
		},
	false);

	document.getElementById("addMoulin").addEventListener('click',
		function(){
			var caracteristique = [];
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 20, caracteristique, 0, 60, 1);
		},
	false);

	document.getElementById("addBoulangerie").addEventListener('click',
		function(){
			var caracteristique = [];
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 24, caracteristique, 0, 60, 1);
		},
	false);

	document.getElementById("addMineFer").addEventListener('click',
		function(){
			var caracteristique = [];
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 28, caracteristique, 0, 60, 1);
		},
	false);

	document.getElementById("addMineCuivre").addEventListener('click',
		function(){
			var caracteristique = [];
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 32, caracteristique, 0, 60, 1);
		},
	false);

	document.getElementById("addTour").addEventListener('click',
		function(){
			var caracteristique = [];
			caracteristique['level'] =1;
			caracteristique['attaque'] =10;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =2;
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 6, caracteristique, 0, 60, 1);
		},
	false);
	document.getElementById("addCorn").addEventListener('click',
		function(){
			var caracteristique = [];
			caracteristique['showLife'] =0;
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 10, caracteristique, 0, 3, 0);
		},
	false);
	document.getElementById("creuse").addEventListener('click',
		function(){
			Game.hero.creuse(Game.hero.x, Game.hero.y, map);
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
	
	
	
};
 
Game.update = function (delta) {
               
 
                
    // handle hero movement with arrow keys
    var dirx = 0;
    var diry = 0;
	
    if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
    else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
    else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
    else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }

	if(this.hero.life<=0) return false;
    this.hero.move(delta, dirx, diry);
	
	//mouvement monstres
	Object.keys(monsters).forEach(function(key) {
		if(monsters[key].vitesse >0){
			monsters[key].move(delta, Game.hero.x, Game.hero.y);
		}
	})
	
    this.camera.update();
};
 
Game.getTool = function(){
	return document.querySelector('input[name="tools"]:checked').value;
}
 
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
			
			if(tile==6){
				if(Game.anim>=DUREE_ANIMATION){
					abs2[r*map.rows+c]=7;
				}
			}
			else if(tile==7){
				if(Game.anim>=DUREE_ANIMATION){
					abs2[r*map.rows+c]=6;
				}
			}
			
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
	
	if(typeof(anim) != "undefined" && anim !== null) {
		if(Game.animBref<=DUREE_ANIMATION){
	
				Game.ctx.drawImage(
							anim.image, // image
							0, // source x
							0, // source y
							map.tsize, // source width
							map.tsize, // source height
							anim.x-Game.camera.x,  // target x
							anim.y-Game.camera.y-Game.animBref, 
							map.tsize, // target width
							map.tsize // target height
						);
			Game.animBref++;
			Game.animBref++;
		}else{
			anim=null;
			Game.animBref=0;
		}
	}



	//tir tourelles portée : 2
	Object.keys(builds).forEach(function(key) {
		if(builds[key].batiment == 6 && builds[key].cible==0){
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
		if(builds[key].batiment == 6 && builds[key].cible!=0){
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
   if(Game.anim>=DUREE_ANIMATION)
	   Game.anim=0;
};
 
Game._drawGrid = function () {
        var width = map.cols * map.tsize;
    var height = map.rows * map.tsize;
    var x, y;
    for (var r = 0; r < map.rows; r++) {
        x = - this.camera.x;
        y = r * map.tsize - this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
    }
    for (var c = 0; c < map.cols; c++) {
        x = c * map.tsize - this.camera.x;
        y = - this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
       this.ctx.lineTo(x, height);
        this.ctx.stroke();
    }
	
	// draw main character joachim nouvel emplacement
	this.ctx.drawImage(
        this.hero.image,
        this.hero.screenX - this.hero.width / 2,
        this.hero.screenY - this.hero.height / 2
    );
	
	if(this.hero.life<=0){
	   this.ctx.font = "50px Arial";
	   this.ctx.fillText("VOUS AVEZ PERDU !",0,this.hero.screenY);
	}
	
};
 
Game._drawRectangle = function (color, xpos, ypos, life) {
        this.ctx.fillStyle=color;
		this.ctx.fillRect(xpos, ypos, life, 10);
		
};
 
Game.render = function () {
    // draw map background layer
    this._drawLayer(0);
    // draw main character
    //joachim change place juste après le dessin de la grille
   // console.log(monsters);
   
   
   
    // draw map top layer
    this._drawLayer(1);
   
	Object.keys(monsters).forEach(function(key) {
	if(monsters[key].life>0){
			// draw main character
			Game.ctx.drawImage(
				monsters[key].image, // image
				0, // source x
				0, // source y
				map.tsize, // source width
				map.tsize, // source height
				// Math.round(x),  // target x
				// Math.round(y), // target y
				monsters[key].x-Game.camera.x,  // target x
				monsters[key].y-Game.camera.y, // target y
				map.tsize, // target width
				map.tsize // target height
			);
	
		Game.ctx.fillStyle="#FF0000";
		Game.ctx.fillRect(2+monsters[key].x-Game.camera.x, monsters[key].y+70-Game.camera.y, monsters[key].life, 10);
		}else{
				Game.hero.xp = Game.hero.xp +monsters[key].level*5;//XP A CHAQUE MONSTRE VAINCU EN FONCTION DU LEVEL DU MONSTRE
				document.getElementById("xp_value").innerHTML = Game.hero.xp;
				anim = new animation(map, monsters[key].x, monsters[key].y, 'xp');
				
				delete monsters[key];						
					
			}
		})

	this.ctx.fillStyle="#FF0000";
	this.ctx.fillRect(this.hero.screenX-30, this.hero.screenY+40, this.hero.life, 10);
    this._drawGrid();
	this._drawMenu();
};