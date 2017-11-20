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
		this.ctx.beginPath();
		this.ctx.rect(6*tsizePar2, height-tsizePar2, tsizePar2, height);
		this.ctx.fillStyle = 'pink';
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
	
	
	if(menussclick!=0){
		img = new Image();
		img.src = 'assets/menu/Woodmenu.jpg';
		this.ctx.drawImage(img, 0, height-tsizePar2*6);
		this.ctx.font="20px Arial";
		this.ctx.fillStyle = 'black';
		this.ctx.fillText(menussclick + ' choisit !', 15, height-tsizePar2*5);
		this.ctx.font="15px Arial";
		var lines = description_fr.split("\n");
		this.ctx.fillStyle = 'red';
		var u = 1;
		for (i = 0; i < lines.length; i++) {
			 		this.ctx.fillText(lines[i],15, u+height-tsizePar2*4);
					u = u+20;
				}
		// this.ctx.fillText(description_fr, 15, height-tsizePar2*4);
	}
	
	this.ctx.beginPath();
    this.ctx.rect(width-tsizePar2, height-tsizePar2, tsizePar2, tsizePar2);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
		
};

Game._clickMenu = function (xClick, yClick, menuH, rect, tsizePar) {
	// console.log(width, height);
	var tsizePar2 = tsizePar/2;
	if(yClick > rect.height-menuH && xClick < menuH){
		if(menuclick==0){
			menuclick=1;
		}else{
			menuclick=0;
			menussclick=0;
		}
	}
	
	if(yClick > rect.height-menuH && xClick > menuH && menuclick==1){
							
		var supply 			= [];
		var caracteristique = [];
		
		if(xClick > menuH && xClick < menuH*2){//blé
			
			caracteristique['showLife'] = 0;
			supply['ecu'] = 150;
			
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 10, caracteristique, supply, 0, 3, 0);
			menussclick = 'blé';
			description_fr = 'Le blé mets 3 jours pour pousser\net permet de nourrir le moulin\n qui le transforme en farine';
			description_en = 'EN blé mets 3 jours pour pousser\net permet de nourrir le moulin\n qui le transforme en farine';
		}
		if(xClick > menuH*2 && xClick < menuH*3){//moulin
		
			supply['ecu'] = 150;
			supply['bois'] = 150;
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 20, caracteristique, supply, 0, 60, 1);
			menussclick = 'moulin';
			description_fr = 'Le moulin produit de la farine\n nécéssaire pour fabriquer du pain.';
			description_en = 'EN moulin produit de la farine nécéssaire pour fabriquer du pain.';
		}
		
		if(xClick > menuH*3 && xClick < menuH*4){//boulangerie
		
			supply['ecu'] = 150;
			supply['bois'] = 150;
			supply['cuivre'] = 150;
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 24, caracteristique, supply, 0, 60, 1);
			menussclick = 'boulangerie';
			description_fr = 'La boulangerie produit du pain\nIndispensable pour ne pas mourir de faim';
			description_fr = 'EN boulangerie produit du pain\nIndispensable pour ne pas mourir de faim';
		}
		
		if(xClick > menuH*4 && xClick < menuH*5){//mine de cuivre
			
			supply['ecu'] = 350;
			supply['bois'] = 150;
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 32, caracteristique, supply, 0, 60, 1);
			menussclick = 'cuivre';
			description_fr = 'Les mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.';
			description_en = 'EN mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.';

		}
		
		if(xClick > menuH*5 && xClick < menuH*6){//mine de fer
			
			supply['ecu'] = 350;
			supply['bois'] = 150;
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 28, caracteristique, supply, 0, 60, 1);
			menussclick = 'fer';
			description_fr = 'Les mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.';
			description_en = 'EN mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.';

		}
		
		if(xClick > menuH*6 && xClick < menuH*7){//tourelle
			
			supply['ecu'] = 350;
			supply['bois'] = 150;
			supply['cuivre'] = 150;
			supply['fer'] = 150;
			
			caracteristique['level'] =1;
			caracteristique['attaque'] =10;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =2;
			Game.hero.addBuild(Game.hero.x, Game.hero.y, map, 6, caracteristique, supply, 0, 60, 1);
			menussclick = 'tourelle';
			description_fr = 'Les tourelles permettent d\'attaquer\nles ennemis qui passent à proximité.';
			description_en = 'EN tourelles permettent d\'attaquer\nles ennemis qui passent à proximité.';

		}
	}
}