Game._drawMenu = function () {
	//menu
	var canvas = document.getElementById('map_canvas');
	var width = canvas.width;
	var height = canvas.height;	
	var tsizePar2 = map.tsize/2;
	
	//menu haut
	this.ctx.beginPath();
    this.ctx.rect(0, 0, width, map.tsize);
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
	
	this.ctx.drawImage(Loader.getImage('ble'), 300, 0);
	this.ctx.fillText(this.hero.supply.ble, 340, 25);
	
	this.ctx.drawImage(Loader.getImage('pierre'), 395, 0);
	this.ctx.fillText(this.hero.supply.pierre, 435, 25);
	
	this.ctx.drawImage(Loader.getImage('argile'), 495, 0);
	this.ctx.fillText(this.hero.supply.argile, 535, 25);
	
	this.ctx.drawImage(Loader.getImage('mais'), 110, 32);
	this.ctx.fillText(this.hero.supply.mais, 150, 57);
	
	this.ctx.drawImage(Loader.getImage('fer'), 205, 32);
	this.ctx.fillText(this.hero.supply.fer, 245, 57);
	
	this.ctx.drawImage(Loader.getImage('argent'), 300, 32);
	this.ctx.fillText(this.hero.supply.argent, 340, 57);
	
	this.ctx.drawImage(Loader.getImage('or'), 395, 32);
	this.ctx.fillText(this.hero.supply.or, 435, 57);
	
	this.ctx.drawImage(Loader.getImage('vigne'), 495, 32);
	this.ctx.fillText(this.hero.supply.vigne, 535, 57);
	
	
	//menu côté
	this.ctx.beginPath();
    this.ctx.rect(0, tsizePar2, map.tsize, height);
    this.ctx.fillStyle = 'brown';
    this.ctx.fill();
	
	n = 0;
	
	Game.ctx.drawImage(Loader.getImage('action'), 0, height/10);
	
	Object.keys(objets).forEach(function(key) {
		if(Game.hero.equipement[key].possession == 1){
			if(Game.hero.equipement[key].equipe == 1)
				Game.ctx.drawImage(Loader.getImage(objets[key].img+'_use'), 0, height/4+n);
			else
				Game.ctx.drawImage(Loader.getImage(objets[key].img), 0, height/4+n);
			n = n+100;
		}
	})
	
	Game.ctx.drawImage(Loader.getImage('construire'),  0, height/4+n);
	n = n+100;
	Game.ctx.drawImage(Loader.getImage('body'),  0, height/4+n);
	
	
	if(menuclick == 1){
		
		this.ctx.beginPath();
		this.ctx.rect(map.tsize-2, map.tsize-2, map.tsize*2+4, height);
		this.ctx.fillStyle = 'black';
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.rect(map.tsize, map.tsize, map.tsize*2, height);
		this.ctx.fillStyle = 'brown';
		this.ctx.fill();
		
		var incrementation = 1;
		var ligne = 1;
		Object.keys(allBuilding).forEach(function(key) {// building.js setBuilding
			Game.ctx.drawImage(Loader.getImage(key), incrementation * map.tsize, map.tsize*ligne);
			
			if(incrementation == 2){
				incrementation = 0;
				ligne ++;
			}
			incrementation ++;
		})
		
	}
	
	
	if(menussclick != 0){

		// this.ctx.globalAlpha = 0.5;
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(map.tsize*3-2, map.tsize*2-2, 332, 164);
		this.ctx.fillStyle = '#ffcd88';
		this.ctx.fillRect(map.tsize*3, map.tsize*2, 330, 160);
		
		this.ctx.font="20px Arial";
		this.ctx.fillStyle = 'black';
		this.ctx.fillText(allBuilding[keySelected].menussclickTitre, map.tsize*3+tsizePar2/2, map.tsize*3-tsizePar2);	//titre du batiment
		
		this.ctx.drawImage(Loader.getImage('ok'), map.tsize*7, map.tsize*2+10);
		this.ctx.drawImage(Loader.getImage('ko'), map.tsize*7+32, map.tsize*2+10);
		
		this.ctx.font="15px Arial";
		var lines = allBuilding[keySelected].description_fr.split("\n");
		this.ctx.fillStyle = 'black';
		var u = 1;
		for (i = 0; i < lines.length; i++) {
			 		this.ctx.fillText(lines[i],map.tsize*3+10, u + map.tsize*3);
					u = u+15;
		}
		u = u+10;
		a = 15;
		
		Object.keys(allBuilding[keySelected].supplyBuild).forEach(function(key) {
			
			if(Game.hero.supply[key] >= allBuilding[keySelected].supplyBuild[key])
				Game.ctx.fillStyle = 'green';
			else
				Game.ctx.fillStyle = 'red';
			
			Game.ctx.fillText(allBuilding[keySelected].supplyBuild[key],map.tsize*3 + a, u+map.tsize*3);
			Game.ctx.drawImage(Loader.getImage(key),map.tsize*3 + a, 5+u+map.tsize*3);
			a = a+40;
		})
		
		Game.ctx.drawImage(
			Game.tileAtlas, // image
			(allBuilding[keySelected].paramBuild['typeTile'][0] - 1) * map.tsize, // source x
			0, // source y
			map.tsize, // source width
			map.tsize, // source height
			a + map.tsize*3,  // target x
			5+u+map.tsize*3, // target y
			map.tsize/2, // target width
			map.tsize/2 // target height
		);
		
		Game.ctx.drawImage(
			Game.tileAtlas, // image
			(allBuilding[keySelected].paramBuild['typeTile'][1] - 1) * map.tsize, // source x
			0, // source y
			map.tsize, // source width
			map.tsize, // source height
			a + map.tsize*3,  // target x
			5+u+map.tsize*3, // target y
			map.tsize/2, // target width
			map.tsize/2 // target height
		);
		
	}
	
	// this.ctx.beginPath();
    // this.ctx.rect(width-tsizePar2, height-tsizePar2, tsizePar2, tsizePar2);
    // this.ctx.fillStyle = 'red';
    // this.ctx.fill();
		
};

Game._clickMenu = function (xClick, yClick, menuH, rect, tsizePar) {
	
	var tsizePar2 = tsizePar/2;

	if(xClick < map.tsize && yClick > rect.height/4+n && yClick < rect.height/4+n+64 &&  menuclick == 0){	//fiche joueur
		Game._clickBody();
		if(menuBodyClick == 0){
			menuBodyClick = 1;
		}else{
			menuBodyClick =0;
		}
		
	}
	if(yClick > map.tsize && xClick > map.tsize && xClick < map.tsize*3 && menuclick==1){

		menussclick			= 1;
		keySelected 		= '';
		
		var xFois = 0;
		if(xClick < map.tsize * 2)
			xFois = 1;
		var yFois = Math.trunc(yClick / map.tsize);
		var incr2 = yFois * 2 - xFois;
		
		var incr1 = 1;
		Object.keys(allBuilding).forEach(function(key) {// building.js setBuilding
			if(incr1 == incr2)
				keySelected = key;
			incr1++;
		})
	}
}

Game._clickBatiment = function () {
	
	if(batimentclick == 1){ //detail batiment
		var canvas = document.getElementById('map_canvas');
		var width = canvas.width;
		var height = canvas.height;	
		var tsizePar2 = map.tsize/2;
			
		if(width < 1300){
			batimentClickResponsive = 2;
			colonneBatimentClicResponsive = 70;
		}
		
		this.ctx.fillStyle = 'black';
		this.ctx.beginPath();
		this.ctx.rect(width/4-5, height/4-5, width/batimentClickResponsive+10, height/2+10);
		this.ctx.fill();	
			
		this.ctx.beginPath();
		this.ctx.rect(width/4, height/4, width/batimentClickResponsive, height/2);
		this.ctx.fillStyle = 'brown';
		this.ctx.fill();
		this.ctx.drawImage(Loader.getImage('ko'), width/4, height/4);
		
		
		this.ctx.fillStyle = 'black';
		// console.log(this.hero.supply.farine);
		if(builds[map.getRow(this.hero.x)+'-'+map.getCol(this.hero.y)].batiment == 61){
			this.ctx.fillText(this.hero.supply.farine, width/4+64, height/4+64);
			this.ctx.drawImage(Loader.getImage('farine'), width/4+64, height/4+68);
			
			this.ctx.fillText(this.hero.supply.pain, width/4+128, height/4+64);
			this.ctx.drawImage(Loader.getImage('pain'), width/4+128, height/4+68);
			
			this.ctx.fillText(this.hero.supply.cochon, width/4+192, height/4+64);
			this.ctx.drawImage(Loader.getImage('cochon'), width/4+192, height/4+68);
			
			this.ctx.fillText(this.hero.supply.viande, width/4+64, height/4+128);
			this.ctx.drawImage(Loader.getImage('jambon'), width/4+64, height/4+132);
			
			this.ctx.fillText(this.hero.supply.cuir, width/4+128, height/4+128);
			this.ctx.drawImage(Loader.getImage('cuir'), width/4+128, height/4+132);
			
			this.ctx.fillText(this.hero.supply.brique, width/4+192, height/4+128);
			this.ctx.drawImage(Loader.getImage('brique'), width/4+192, height/4+132);
			
			this.ctx.drawImage(Loader.getImage('bijou'), width/4+55, height/4+205);
			this.ctx.fillText(this.hero.supply.bijou, width/4+64, height/4+200);
			
			this.ctx.drawImage(Loader.getImage('vin'), width/4+128, height/4+205);
			this.ctx.fillText(this.hero.supply.vin, width/4+128, height/4+200);
			
			this.ctx.drawImage(Loader.getImage('planche'), width/4+192, height/4+205);
			this.ctx.fillText(this.hero.supply.planche, width/4+192, height/4+200);
		}else{	//détail de tous les autres batiments
			var build = builds[map.getRow(this.hero.x)+'-'+map.getCol(this.hero.y)] ;
			var posB = map.getRow(build.y)*map.rows+map.getCol(build.x);
			var position = build.batiment.indexOf(abs2[posB]);
			if(position == 0)
				position = 3;
			else if(position == 1)
				position = 2;
			else if(position == 2)
				position = 1;
			
			this.ctx.fillStyle = 'white';

			this.ctx.fillText('level : '+build.level, width/4+128, height/4+32);
			this.ctx.fillText('vie : '+build.life, width/4+128, height/4+64);
			if(build.caracteristique.outilRecompense)
				this.ctx.drawImage(Loader.getImage(build.caracteristique.outilRecompense+'_bulle'), width/4+50, height/4+25);
			
			this.ctx.fillText('Maintenance / jour', width/4+5, height/4+100);
			var n = 0;
			Object.keys(build.caracteristique.maintenance).forEach(function(key) {
				Game.ctx.fillText(build.caracteristique.maintenance[key], width/4+5, height/4+138 + n);
				Game.ctx.drawImage(Loader.getImage(key), width/4+37, height/4+110 + n);
				n = n+40;
			})
			n = n+40;
			this.ctx.fillText('dans '+position+' jours, bénéfice : ', width/4+5, height/4+100 + n);
			n = n+40;
			Object.keys(build.caracteristique['recompense']).forEach(function(keyRecompense) {
					Game.ctx.fillText(build.caracteristique['recompense'][keyRecompense] * build.level , width/4+5, height/4+100 + n);
					Game.ctx.drawImage(Loader.getImage(keyRecompense), width/4+50, height/4+75 + n);
					
				})

			if( build.level < 3){ //monter de level
				var error = 0; 
				this.ctx.fillText('Prochain', width/3+128+colonneBatimentClicResponsive, height/5+100);
				this.ctx.fillText('niveau', width/3+128+colonneBatimentClicResponsive, height/5+120);
				var n = 0;
				Object.keys(build.caracteristique.updateNiveau).forEach(function(key) {
					if(Game.hero.supply[key] >= build.caracteristique.updateNiveau[key] * build.level)
						Game.ctx.fillStyle = 'greenyellow';
					else{
						Game.ctx.fillStyle = 'red';
						error = 1;
					}
					
					Game.ctx.fillText(build.caracteristique.updateNiveau[key] * build.level, width/3+120+colonneBatimentClicResponsive, height/4+138 + n);
					Game.ctx.drawImage(Loader.getImage(key), width/3+167+colonneBatimentClicResponsive, height/4+110 + n);
					n = n+40;
				})
				
				if(error == 0){
					this.ctx.drawImage(Loader.getImage('ok'), width/3+128+colonneBatimentClicResponsive, height/5+35);
				}
			}else{
				this.ctx.fillText('Niveau', width/3+128, height/5+100);
				this.ctx.fillText('max', width/3+128, height/5+120);
			}
		}
	}
}

Game._clickBody = function () {	//MENU DES EQUIPEMENTS
	
	if(menuBodyClick == 1){
		var canvas = document.getElementById('map_canvas');
		var width = canvas.width;
		var height = canvas.height;	
		var tsizePar2 = map.tsize/2;
			
		if(width < 1300){
			batimentClickResponsive = 2;
			colonneBatimentClicResponsive = 70;
		}
		
		this.ctx.fillStyle = 'black';
		this.ctx.beginPath();
		this.ctx.rect(width/4-5, height/4-5, width/batimentClickResponsive+10, height/2+10);
		
		this.ctx.fill();
		
		this.ctx.beginPath();
		this.ctx.rect(width/4, height/4, width/batimentClickResponsive, height/2);
		this.ctx.fillStyle = 'brown';
		this.ctx.fill();
		
		
		this.ctx.drawImage(Loader.getImage('ko'), width/4, height/4);
		
		this.ctx.fillStyle = 'white';
		if(this.hero.equipement.epee.possession == 1)
			this.ctx.fillText('Attaque : '+ this.hero.attaque, width/4+12, height/4+20+32);
		this.ctx.fillText('Defense : '+ this.hero.defense, width/4+12, height/4+20+64);
		if(this.hero.equipement.epee.possession == 1)
			this.ctx.fillText('Agilité : '+ this.hero.agilite, width/4+12, height/4+20+96);
		this.ctx.fillText('Exploration : '+ this.hero.exploration, width/4+12, height/4+20+128);
		var outilEquipe = this._getToolEquipe();
		if(outilEquipe != '')
			this.ctx.fillText('Outil équipé : '+ Game.hero.equipement[outilEquipe].life + '/100', width/4+12, height/4+20+160);
		
		if(artefactSelectionne != ''){	//description de l'item sélectionné
			var lines = artefactSelectionne.description_fr.split("\n");
			this.ctx.fillStyle = 'gray';
			var u = 1;
			for (var i = 0; i < lines.length; i++) {
						this.ctx.fillText(lines[i],width/4+170, u+height/4+20);
						u = u+25;
			}
			
			if(!artefactSelectionne.quete)// si l'objet peut être utilisé
				this.ctx.drawImage(Loader.getImage('ok'), width/4+170, height/4+20+100);
		
		}
		
		var incr 	= 0;
		var nbLigne = 0;
		for(var i =0; i< this.hero.artefact.length; i++){
			this.ctx.drawImage(Loader.getImage(this.hero.artefact[i]), width/4 + incr, height/4+20+180 + nbLigne);
			
			incr+= 32;
			if(i>6){
				nbLigne = 55;
				incr = 0;
			}
		}
		
	}else
		artefactSelectionne = '';
		
}