DUREE_ANIMATION = 55;
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
// if(this.following.life==0)
// console.log(map.getCol(this.following.x));//////////////////////////////MAP

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
 
function Troll(map, x, y, life, name, attaque, defense) {
    this.map = map;
    this.attaque = attaque;
    this.defense = defense;
    this.x = x;
    this.y = y;
    this.name = name;
    this.life = life;
    this.width = map.tsize;
    this.height = map.tsize;
    this.image = Loader.getImage('troll3');
}
 
 
 
Game.load = function () {
    return [
        Loader.loadImage('tiles', '../assets/tiles_new.png'),
        Loader.loadImage('hero', '../assets/character.png'),
        Loader.loadImage('hero2', '../assets/character2.png'),
        Loader.loadImage('troll1', '../assets/troll1.jpg'),
        Loader.loadImage('troll2', '../assets/troll2.jpg'),
        Loader.loadImage('troll3', '../assets/troll3.png')
    ];
};
 
Game.init = function () {
    Keyboard.listenForEvents(
        [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
    this.tileAtlas = Loader.getImage('tiles');
 
	this.anim = 0;
    this.hero = new Hero(map, 160, 160, 60, 30, 200, 0, 0, 0, 0, 'pelle');//map - x - y - vie - attaque - defense - ecu - bois - ble - argile
	generateTroll(64, 64, '1_1');
    
	function generateTroll(x, y, name){
		var nameTroll = 'troll'+name;
		this.nameTroll = new Troll(map, x, y, 60, name, 22, 18);
		monsters.push(this.nameTroll);
	}
	
    this.camera = new Camera(map, 1024, 768);
    this.camera.follow(this.hero);
	document.getElementById("addBuild").addEventListener('click',
		function(){
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map);
		},
	false);
	document.getElementById("addCorn").addEventListener('click',
		function(){
			Game.hero.addCorn(Game.hero.x, Game.hero.y, map, 'heure_plante', 3);
		},
	false);
	document.getElementById("creuse").addEventListener('click',
		function(){
			Game.hero.creuse(Game.hero.x, Game.hero.y, map);
		},
	false);
	
	
};
 
Game.update = function (delta) {
               
 
                
    // handle hero movement with arrow keys
    var dirx = 0;
    var diry = 0;
	
    if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
    else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
    else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
    else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }
	// console.log(dirx);
	if(this.hero.life<=0) return false;
    this.hero.move(delta, dirx, diry);
    this.camera.update();
};
 
Game.getTool = function(){
	return document.querySelector('input[name="tools"]:checked').value;
}
 
Game._drawLayer = function (layer) {
    var startCol = Math.floor(this.camera.x / map.tsize);
                // console.log(startCol);
    var endCol = startCol + (this.camera.width / map.tsize);
    var startRow = Math.floor(this.camera.y / map.tsize);
    var endRow = startRow + (this.camera.height / map.tsize);
    var offsetX = -this.camera.x + startCol * map.tsize;
    var offsetY = -this.camera.y + startRow * map.tsize;
	Game.anim++;
    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var tile = map.getTile(layer, c, r);
			
			var nameBuild = 'build-'+r+c+'-ing';
			
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
			if(tile==6 || tile==7){
				builds.forEach(function(element) {
					if(element.name == nameBuild)
						Game._drawRectangle ('#FFFFFF', Math.round(x), Math.round(y)+map.tsize*2+5, element.life);
				});
				
			}
			// console.log(anim);
			
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
	
	
	
};
 
Game._drawRectangle = function (color, xpos, ypos, life) {
        this.ctx.fillStyle=color;
		this.ctx.fillRect(xpos, ypos, life, 10);
		
};
 
Game.render = function () {
    // draw map background layer
    this._drawLayer(0);
    // draw main character
    this.ctx.drawImage(
        this.hero.image,
        this.hero.screenX - this.hero.width / 2,
        this.hero.screenY - this.hero.height / 2
    );
   
   
    monsters.forEach(function(element) {
        
                if(element.life>0){
                    // draw main character
                    Game.ctx.drawImage(
                        element.image, // image
                        0, // source x
                        0, // source y
                        map.tsize, // source width
                        map.tsize, // source height
                        // Math.round(x),  // target x
                        // Math.round(y), // target y
                        element.x-Game.camera.x,  // target x
                        element.y-Game.camera.y, // target y
                        map.tsize, // target width
                        map.tsize // target height
                    );
            
                Game.ctx.fillStyle="#FF0000";
                Game.ctx.fillRect(2+element.x-Game.camera.x, element.y+70-Game.camera.y, element.life, 10);
               }else{
                    for (var i=0; i<monsters.length; i++)
                    {
                        if (monsters[i].name == element.name) 
                            monsters.splice(i, 1);
                    }
                   
               }
                
                
            });   

               
	this.ctx.fillStyle="#FF0000";
	this.ctx.fillRect(this.hero.screenX-30, this.hero.screenY+40, this.hero.life, 10);
		   
	
               
               
                if(this.hero.life<=0){
                               this.ctx.font = "50px Arial";
                               this.ctx.fillText("VOUS AVEZ PERDU !",0,this.hero.screenY);
                }
               
    // draw map top layer
    this._drawLayer(1);
 
    this._drawGrid();
    
};