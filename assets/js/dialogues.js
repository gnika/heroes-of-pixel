Game.dialogue = function(monstre) {	
	var idQuest = monstre.idQuete;
	Game['_quest'+idQuest](monstre);
}

Game._quest1 = function(monstre){
	dialogueText = 'Bonjour étranger.\n Je peux vous fournir une épée\n pour seulement\n';
	supplyText = {'farine': 500, 'ecu' : 5};
	artefactText = {'corde': 1, 'manche': 1, 'silex': 1};
	recompenses = ["Game.hero.equipement['epee'].possession = 1;", "Game.hero.equipement['epee'].life = 100;"];
	updateFermetureDialogue = ["monstre.idQuete = 2"];
	texteRecompense = 'Merci.\n Revenez me voir \n quand vous voulez';
}
 
Game._clickMonstre = function() {
	if(dialogue == 1){
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
		
		var lines = dialogueText.split("\n");
		this.ctx.fillStyle = 'white';
		var u = 1;
		for (i = 0; i < lines.length; i++) {//TEXTE DU PERSONNAGE
					this.ctx.fillText(lines[i],width/4+35, u+height/4+30);
					u = u+25;
		}
		
		var n = 0;
		var error = 0;
		Object.keys(supplyText).forEach(function(key) {	//CONDITIONS DES RESSOURCES DU PERSONNAGE
			if(Game.hero.supply[key] < supplyText[key]){
				error = 1;
				Game.ctx.fillStyle = 'gray';
			}else
				Game.ctx.fillStyle = 'white';
				Game.ctx.fillText(supplyText[key], width/4+5, height/4+138 + n);
				Game.ctx.drawImage(Loader.getImage(key), width/4+45, height/4+110 + n);
				n = n+40;
		})
		
		
		Game.ctx.fillStyle = 'white';
		var n = 0;
		Object.keys(artefactText).forEach(function(key) { //CONDITIONS DES ARTEFACTS DU PERSONNAGE
			var artefactsVoulus = 0;
			for(var i =0; i< Game.hero.artefact.length; i++){
				if(Game.hero.artefact[i] == key)
					artefactsVoulus++;
			}
			
			if(artefactsVoulus < artefactText[key]){
				error = 1;
				Game.ctx.fillStyle = 'gray';
			}else
				Game.ctx.fillStyle = 'white';
			
			Game.ctx.fillText(artefactText[key], width/4+100, height/4+138 + n);
			Game.ctx.drawImage(Loader.getImage(key), width/4+130, height/4+110 + n);
			n = n+40;
		})
		
		if(error == 0)
			this.ctx.drawImage(Loader.getImage('ok'), width/4+190, height/4+20+100);

	}
}

Game._questClickPay = function() {	
	var error = 0;
	Object.keys(supplyText).forEach(function(key) {//PAYE LE PRIX DE LA QUETE
		if(Game.hero.supply[key] < supplyText[key])
			error = 1;
	})
	
	if(error == 0){
		Object.keys(supplyText).forEach(function(key) {	//PAYE LES RESSOURCES
			Game.hero.supply[key]-= supplyText[key];
		})
		
		Object.keys(artefactText).forEach(function(key) { //PAYE LES ARTEFACTS
			var artefactsVoulus = 0;
			for(var i =0; i< Game.hero.artefact.length; i++){
				if(Game.hero.artefact[i] == key){
					artefactsVoulus++;
					if(artefactsVoulus <= artefactText[key])
						Game.hero.artefact.splice(key, 1);
				}
			}
		})
	}
}