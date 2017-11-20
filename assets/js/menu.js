Game._drawMenu = function () {
	//menu
	var canvas = document.getElementById('map_canvas');
	var width = canvas.width;
	var height = canvas.height;	
	var tsizePar2 = map.tsize/2;	
	this.ctx.beginPath();
    this.ctx.rect(0, height-tsizePar2, tsizePar2, tsizePar2);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
	
	if(menuclick==1){
		
		this.ctx.beginPath();
		this.ctx.rect(tsizePar2, height-tsizePar2, tsizePar2, height);
		this.ctx.fillStyle = 'yellow';
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.rect(2*tsizePar2, height-tsizePar2, tsizePar2, height);
		this.ctx.fillStyle = 'blue';
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.rect(3*tsizePar2, height-tsizePar2, tsizePar2, height);
		this.ctx.fillStyle = 'green';
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.rect(4*tsizePar2, height-tsizePar2, tsizePar2, height);
		this.ctx.fillStyle = 'violet';
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.rect(5*tsizePar2, height-tsizePar2, tsizePar2, height);
		this.ctx.fillStyle = 'gray';
		this.ctx.fill();
		
		var imageObj = new Image();
		imageObj.src = "assets/menu/corn.png";
		this.ctx.drawImage(imageObj, tsizePar2, height-tsizePar2);
		
		var imageObj = new Image();
		imageObj.src = "assets/menu/moulin.png";
		this.ctx.drawImage(imageObj, 2*tsizePar2, height-tsizePar2);
		
		var imageObj = new Image();
		imageObj.src = "assets/menu/boulangerie.png";
		this.ctx.drawImage(imageObj, 3*tsizePar2, height-tsizePar2);
		
		var imageObj = new Image();
		imageObj.src = "assets/menu/iron_mine.png";
		this.ctx.drawImage(imageObj, 4*tsizePar2, height-tsizePar2);
		
		var imageObj = new Image();
		imageObj.src = "assets/menu/mine_silver.png";
		this.ctx.drawImage(imageObj, 5*tsizePar2, height-tsizePar2);
		
		var imageObj = new Image();
		imageObj.src = "assets/menu/house.png";
		this.ctx.drawImage(imageObj, 6*tsizePar2, height-tsizePar2);
		
		
	}else
		this.ctx.clearRect(tsizePar2, height-tsizePar2, width, height);
	
	this.ctx.beginPath();
    this.ctx.rect(width-tsizePar2, height-tsizePar2, tsizePar2, tsizePar2);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
};

Game._clickMenu = function (xClick, yClick, menuH, rect) {
	
	
			if(yClick > rect.height-menuH && xClick < menuH){
				if(menuclick==0){
					menuclick=1;
				}else{
					menuclick=0;
				}
			}
			
			if(yClick > rect.height-menuH && xClick > menuH && menuclick==1){
				
					
					
					if(xClick > menuH && xClick < menuH*2){//blé
						var caracteristique = [];
						caracteristique['showLife'] =0;
						Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 10, caracteristique, 0, 3, 0);
					}
					if(xClick > menuH*2 && xClick < menuH*3){//moulin
						var caracteristique = [];
						caracteristique['level'] =1;
						caracteristique['attaque'] =0;
						caracteristique['showLife'] =1;
						caracteristique['portee'] =0;
						Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 20, caracteristique, 0, 60, 1);
					}
					
					if(xClick > menuH*3 && xClick < menuH*4){//boulangerie
						var caracteristique = [];
						caracteristique['level'] =1;
						caracteristique['attaque'] =0;
						caracteristique['showLife'] =1;
						caracteristique['portee'] =0;
						Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 24, caracteristique, 0, 60, 1);
					}
					
					if(xClick > menuH*4 && xClick < menuH*5){//mine de cuivre
						var caracteristique = [];
						caracteristique['level'] =1;
						caracteristique['attaque'] =0;
						caracteristique['showLife'] =1;
						caracteristique['portee'] =0;
						Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 32, caracteristique, 0, 60, 1);
					}
					
					if(xClick > menuH*5 && xClick < menuH*6){//mine de fer
						var caracteristique = [];
						caracteristique['level'] =1;
						caracteristique['attaque'] =0;
						caracteristique['showLife'] =1;
						caracteristique['portee'] =0;
						Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 28, caracteristique, 0, 60, 1);
					}
					
					if(xClick > menuH*6 && xClick < menuH*7){//tourelle
						var caracteristique = [];
						caracteristique['level'] =1;
						caracteristique['attaque'] =10;
						caracteristique['showLife'] =1;
						caracteristique['portee'] =2;
						Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 6, caracteristique, 0, 60, 1);
					}
			}
}