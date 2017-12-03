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
	
	this.ctx.drawImage(Loader.getImage('culture_ble'), 300, 0);
	this.ctx.fillText(this.hero.supply.ble, 340, 25);
	
	this.ctx.drawImage(Loader.getImage('pierre'), 395, 0);
	this.ctx.fillText(this.hero.supply.pierre, 435, 25);
	
	this.ctx.drawImage(Loader.getImage('argile'), 495, 0);
	this.ctx.fillText(this.hero.supply.argile, 535, 25);
	
	this.ctx.drawImage(Loader.getImage('culture_mais'), 110, 32);
	this.ctx.fillText(this.hero.supply.mais, 150, 57);
	
	this.ctx.drawImage(Loader.getImage('fer'), 205, 32);
	this.ctx.fillText(this.hero.supply.fer, 245, 57);
	
	this.ctx.drawImage(Loader.getImage('argent'), 300, 32);
	this.ctx.fillText(this.hero.supply.argent, 340, 57);
	
	this.ctx.drawImage(Loader.getImage('or'), 395, 32);
	this.ctx.fillText(this.hero.supply.or, 435, 57);
	
	this.ctx.drawImage(Loader.getImage('culture_raisin'), 495, 32);
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
	
	
	
	//menu bas
	this.ctx.beginPath();
    this.ctx.rect(0, height-tsizePar2, tsizePar2, tsizePar2);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
	
	
	if(menuclick==1){
		var incrementation = 1;
		Object.keys(allBuilding).forEach(function(key) {// building.js setBuilding
			Game.ctx.beginPath();
			Game.ctx.rect(incrementation * tsizePar2, height-tsizePar2, tsizePar2, height);
			Game.ctx.fillStyle = 'yellow';
			Game.ctx.fill();
			Game.ctx.drawImage(Loader.getImage(key), incrementation * tsizePar2, height-tsizePar2);
			
			incrementation ++;
		})
		
		
		// this.ctx.beginPath();
		// this.ctx.rect(tsizePar2, height-tsizePar2, tsizePar2, height);
		// this.ctx.fillStyle = 'yellow';
		// this.ctx.fill();
		// this.ctx.beginPath();
		// this.ctx.rect(2*tsizePar2, height-tsizePar2, tsizePar2, height);
		// this.ctx.fillStyle = 'blue';
		// this.ctx.fill();
		
		
	}else{
		// this.ctx.clearRect(tsizePar2, height-tsizePar2, width, height);
	}
	
	
	if(menussclick != 0){

		this.ctx.globalAlpha = 0.5;
		this.ctx.fillRect(0, height-tsizePar2*6, 330, 160);
		this.ctx.globalAlpha = 1.0;
		
		this.ctx.font="20px Arial";
		this.ctx.fillStyle = 'black';
		this.ctx.fillText(allBuilding[keySelected].menussclickTitre, 15, height-tsizePar2*5);
		
		this.ctx.drawImage(Loader.getImage('ok'), 250, height-tsizePar2*5.5);
		this.ctx.drawImage(Loader.getImage('ko'), 290, height-tsizePar2*5.5);
		
		this.ctx.font="15px Arial";
		var lines = allBuilding[keySelected].description_fr.split("\n");
		this.ctx.fillStyle = 'blue';
		var u = 1;
		for (i = 0; i < lines.length; i++) {
			 		this.ctx.fillText(lines[i],15, u+height-tsizePar2*4);
					u = u+15;
		}
		
		u = u+10;
		a = 15;
		Object.keys(allBuilding[keySelected].supplyBuild).forEach(function(key) {
			
			if(Game.hero.supply[key] >= allBuilding[keySelected].supplyBuild[key])
				Game.ctx.fillStyle = 'green';
			else
				Game.ctx.fillStyle = 'red';
			
			Game.ctx.fillText(allBuilding[keySelected].supplyBuild[key],a, u+height-tsizePar2*4);
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
							
		
		menussclick			= 1;
		keySelected 		= '';
		
		var incr1 = 1;
		var incr2 = 2;
		
		Object.keys(allBuilding).forEach(function(key) {// building.js setBuilding
			if(xClick > menuH * incr1 && xClick < menuH * incr2){
				keySelected = key;
			}
			
			incr1++;
			incr2++;
		})
		
		
		
	}
}

Game._clickBatiment = function () {
	Object.keys(builds).forEach(function(key) {
		// if(rowClick+'-'+colClick == key && Game.he)
			// console.log(builds);

	})
	if(batimentclick == 1){ //detail batiment
		var canvas = document.getElementById('map_canvas');
		var width = canvas.width;
		var height = canvas.height;	
		var tsizePar2 = map.tsize/2;
		
		this.ctx.beginPath();
		this.ctx.rect(width/4, height/4, width/4, height/2);
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
		}
	}
}