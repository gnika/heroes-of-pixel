Game._drawMenu = function () {
	//menu
	var canvas = document.getElementById('map_canvas');
	var width = canvas.width;
	var height = canvas.height;	
	var tsizePar2 = map.tsize/2;
	
	//menu haut
	this.ctx.beginPath();
    this.ctx.rect(0, 0, width, tsizePar2);
    this.ctx.fillStyle = 'brown';
    this.ctx.fill();
	
	this.ctx.font="20px Arial";
	this.ctx.fillStyle = 'black';
	this.ctx.drawImage(Loader.getImage('xp'), 15, 0);
	this.ctx.fillText(this.hero.xp, 55, 25);
	
	this.ctx.drawImage(Loader.getImage('ecu'), 110, 0);
	this.ctx.fillText(this.hero.supply.ecu, 150, 25);
	
	this.ctx.drawImage(Loader.getImage('bois'), 205, 0);
	this.ctx.fillText(this.hero.supply.bois, 245, 25);
	
	this.ctx.drawImage(Loader.getImage('culture_ble'), 300, 0);
	this.ctx.fillText(this.hero.supply.ble, 340, 25);
	
	this.ctx.drawImage(Loader.getImage('farine'), 395, 0);
	this.ctx.fillText(this.hero.supply.farine, 435, 25);
	
	this.ctx.drawImage(Loader.getImage('pain'), 495, 0);
	this.ctx.fillText(this.hero.supply.pain, 535, 25);
	
	this.ctx.drawImage(Loader.getImage('cuivre'), 590, 0);
	this.ctx.fillText(this.hero.supply.cuivre, 630, 25);
	
	this.ctx.drawImage(Loader.getImage('fer'), 685, 0);
	this.ctx.fillText(this.hero.supply.fer, 725, 25);
	
	
	//menu côté
	this.ctx.beginPath();
    this.ctx.rect(0, tsizePar2, map.tsize, height);
    this.ctx.fillStyle = 'brown';
    this.ctx.fill();
	
	n = 0;
	
	Game.ctx.drawImage(Loader.getImage('action'), 0, height/10);
	
	Object.keys(objets).forEach(function(key) {

		if(Game.hero.equipement == objets[key])
			Game.ctx.drawImage(Loader.getImage(objets[key].img+'_use'), 0, height/4+n);
		else
			Game.ctx.drawImage(Loader.getImage(objets[key].img), 0, height/4+n);
		n = n+100;
	})
	
	
	
	//menu bas
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
		
		
	}else{
		this.ctx.clearRect(tsizePar2, height-tsizePar2, width, height);
	}
	
	
	if(menussclick != 0){
		img = new Image();
		
		// img.src = 'assets/menu/Woodmenu.jpg';
		// this.ctx.drawImage(img, 0, height-tsizePar2*6);
		
		this.ctx.globalAlpha = 0.5;
		this.ctx.fillRect(0, height-tsizePar2*6, 330, 160);
		this.ctx.globalAlpha = 1.0;
		
		this.ctx.font="20px Arial";
		this.ctx.fillStyle = 'black';
		this.ctx.fillText(menussclickTitre, 15, height-tsizePar2*5);
		
		this.ctx.drawImage(Loader.getImage('ok'), 250, height-tsizePar2*5.5);
		this.ctx.drawImage(Loader.getImage('ko'), 290, height-tsizePar2*5.5);
		
		this.ctx.font="15px Arial";
		var lines = description_fr.split("\n");
		this.ctx.fillStyle = 'blue';
		var u = 1;
		for (i = 0; i < lines.length; i++) {
			 		this.ctx.fillText(lines[i],15, u+height-tsizePar2*4);
					u = u+15;
		}
		
		u = u+10;
		a = 15;
		Object.keys(Game.supplyBuild).forEach(function(key) {
			
			if(Game.hero.supply[key] >= Game.supplyBuild[key])
				Game.ctx.fillStyle = 'green';
			else
				Game.ctx.fillStyle = 'red';
			
			Game.ctx.fillText(Game.supplyBuild[key],a, u+height-tsizePar2*4);
			Game.ctx.drawImage(Loader.getImage(key), a, 5+u+height-tsizePar2*4);
			a = a+40;
		})
		
	}
	
	// this.ctx.beginPath();
    // this.ctx.rect(width-tsizePar2, height-tsizePar2, tsizePar2, tsizePar2);
    // this.ctx.fillStyle = 'red';
    // this.ctx.fill();
		
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
							
		Game.supplyBuild 	= [];
		caracteristique 	= [];
		paramBuild 			= [];
		menussclick			= 1;
		
		
		if(xClick > menuH && xClick < menuH*2){//blé
			
			caracteristique['showLife'] = 0;
			caracteristique['recompense'] = {'ble': 400};
			caracteristique['outilRecompense'] = 'faux';
			// Game.supplyBuild['ecu'] = 150;
			Game.supplyBuild['ecu'] = 0;
			paramBuild['typeBatiment'] = [10, 11, 12, 13];
			paramBuild['typeTile'] = 0;
			paramBuild['life'] = 3;
			paramBuild['solid'] = 0;
			
			menussclickTitre = 'Champs de blé';
			description_fr = 'Le blé mets 3 jours pour pousser\net permet de nourrir le moulin\n qui le transforme en farine';
			description_en = 'EN blé mets 3 jours pour pousser\net permet de nourrir le moulin\n qui le transforme en farine';
		}
		if(xClick > menuH*2 && xClick < menuH*3){//moulin
		
			Game.supplyBuild['ecu'] = 150;						//prix
			Game.supplyBuild['bois'] = 150;						//prix
			caracteristique['level'] =1;						//level du batiment
			caracteristique['attaque'] =0;						//attaque du batiment
			caracteristique['showLife'] =1;						//montrer ou pas la barre de vie
			caracteristique['portee'] =0;						//portée en case des batiments qui tirent
			caracteristique['prixUpdate'] = {'ble': 100};		//prix à fournir pour passer d'un statut 
			caracteristique['recompense'] = {'farine': 100};	//prix reçu quand le héros ramasse les ressources
			caracteristique['outilRecompense'] = 'faux';		// outil à utiliser pour le héros pour ramasser les ressources
			paramBuild['typeBatiment'] = [20, 21, 22, 23];		// les différents statut du batiment
			paramBuild['typeTile'] = 0;							//type de tile sur lequel doit être construit le batiment
			paramBuild['life'] = 60;							//vie du batiment
			paramBuild['solid'] = 0;							//peut-on passer sur le batiment
			
			menussclickTitre = 'Moulin';
			description_fr = 'Le moulin produit de la farine\n nécéssaire pour fabriquer du pain.';
			description_en = 'EN moulin produit de la farine nécéssaire pour fabriquer du pain.';
		}
		
		if(xClick > menuH*3 && xClick < menuH*4){//boulangerie
		
			// Game.supplyBuild['ecu'] = 150;
			// Game.supplyBuild['bois'] = 150;
			// Game.supplyBuild['cuivre'] = 150;
			Game.supplyBuild['ecu'] = 0;
			caracteristique['level'] = 1;
			caracteristique['attaque'] = 0;
			caracteristique['showLife'] = 1;
			caracteristique['portee'] = 0;
			caracteristique['prixUpdate'] = {'farine': 100};
			caracteristique['recompense'] = {'pain': 100};
			caracteristique['outilRecompense'] = 'faux';
			paramBuild['typeBatiment'] 	  = [24, 25, 26, 27];
			paramBuild['typeTile'] = 0;
			paramBuild['life'] = 60;
			paramBuild['solid'] = 0;
			
			menussclickTitre = 'Boulangerie';
			description_fr = 'La boulangerie produit du pain\nIndispensable pour ne pas mourir de faim';
			description_fr = 'EN boulangerie produit du pain\nIndispensable pour ne pas mourir de faim';
		}
		
		if(xClick > menuH*4 && xClick < menuH*5){//mine de cuivre
			
			Game.supplyBuild['ecu'] = 350;
			Game.supplyBuild['bois'] = 150;
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			paramBuild['typeBatiment'] = [32, 33, 34, 35];
			paramBuild['typeTile'] = 0;
			paramBuild['life'] = 60;
			paramBuild['solid'] = 0;
			
			menussclickTitre = 'Mine de cuivre';
			description_fr = 'Les mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.';
			description_en = 'EN mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.';

		}
		
		if(xClick > menuH*5 && xClick < menuH*6){//mine de fer
			
			Game.supplyBuild['ecu'] = 350;
			Game.supplyBuild['bois'] = 150;
			caracteristique['level'] =1;
			caracteristique['attaque'] =0;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =0;
			paramBuild['typeBatiment'] = [28, 29, 30, 31];
			paramBuild['typeTile'] = 0;
			paramBuild['life'] = 60;
			paramBuild['solid'] = 0;
			
			menussclickTitre = 'Mine de fer';
			description_fr = 'Les mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.';
			description_en = 'EN mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.';

		}
		
		if(xClick > menuH*6 && xClick < menuH*7){//tourelle
			
			Game.supplyBuild['ecu'] = 0;
			// Game.supplyBuild['ecu'] = 350;
			// Game.supplyBuild['bois'] = 150;
			// Game.supplyBuild['cuivre'] = 150;
			// Game.supplyBuild['fer'] = 150;
			
			caracteristique['level'] =1;
			caracteristique['attaque'] =10;
			caracteristique['showLife'] =1;
			caracteristique['portee'] =2;
			paramBuild['typeBatiment'] = [6];
			paramBuild['typeTile'] = 0;
			paramBuild['life'] = 60;
			paramBuild['solid'] = 1;
			
			menussclickTitre = 'Tourelle';
			description_fr = 'Les tourelles permettent d\'attaquer\nles ennemis qui passent à proximité.';
			description_en = 'EN tourelles permettent d\'attaquer\nles ennemis qui passent à proximité.';

		}
	}
}