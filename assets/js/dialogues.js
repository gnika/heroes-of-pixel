Game.dialogue = function(monstre) {	
	var idQuest = monstre.idQuete;
	Game['_quest'+idQuest](monstre);
}

Game._quest1 = function(monstre){
	dialogueText = "Bonjour étranger.\n Pour vaincre la sorcière Scotia, il vous faudra\n survivre dans ce monde étrange et dangereux.\n\n Pour voir le détail d\'un batiment,\n déplacez-vous dessus et cliquer sur le bâtiment\n\n Pensez à vous nourrir en cliquant\n sur vous-même pour faire remonter votre fatigue\n\n Votre objectif, dans chaque région que vous\n explorerez, est de trouver\n l\'orbe qui vous fera quitter ces lieux.";
	supplyText = '';																	//conditions de quete
	artefactText = '';														//conditions de quete
	buildText = '';		//conditions de quete
	// buildText = [{name: 'culture_ble', nombre:1, level:2}];		//conditions de quete
	// recompenses = ["Game.hero.equipement['epee'].possession = 1;", "Game.hero.equipement['epee'].life = 100;"];
	// updateFermetureDialogue = ["monstre.idQuete = 2"];
	// texteRecompense = 'Merci.\n Revenez me voir \n quand vous voulez';
}
Game._quest2 = function(monstre){
	dialogueText = "Je me nomme Baccata. Pour vous servir\n\n Pour connaître votre condition physique, \n cliquez sur le menu accessible\n en bas à gauche de l\'écran\n\n Pour construire un bâtiment,\n cliquez sur le menu juste à côté\n\n Votre défense indique votre résistance\n face aux monstres que vous cotoierez. \n\n Votre exploration indique\n votre capacité à voir loin\n lorsque vous explorez\n\n Certains objets que vous ramassez\n modifient ces statistiques.";
	supplyText = '';																	//conditions de quete
	artefactText = '';														//conditions de quete
	buildText = '';	
}
Game._quest3 = function(monstre){
	dialogueText = "Bonjour, chevalier\n\n Vos ressources primaires s'affichent\n en haut de n'écran. \n\n Vos ressources finies s'affichent dans\n l'entrepôt, qui est votre bâtiment principal.\n\n Construisez des bâtiments pour\n produire des ressources";
	supplyText = '';																	//conditions de quete
	artefactText = '';														//conditions de quete
	buildText = '';	
}
Game._quest4 = function(monstre){
	dialogueText = "Pour récolter de l\'argent, creusez des trous :\n cliquez sur la pelle pour être équipé, \n allez sur l\'herbe, et cliquez\n sur le bouton action.\n\nPour récolter du bois, fauchez les ronces :\n cliquez sur la faux pour être équipé, \n allez sur les ronces, et cliquez\n sur le bouton action.\n Attention toutefois : les ronces vous font perdre\n des points de vie !";
	supplyText = '';																	//conditions de quete
	artefactText = '';														//conditions de quete
	buildText = '';	
}

Game._quest5 = function(monstre){
	dialogueText = 'Bonjour étranger.\n Trouvez la clé pour ouvrir cette barrière,\n et vous pourrez passer';	
	supplyText = '';																		//conditions de quete
	artefactText = {'cle': 1};														//conditions de quete
	buildText = '';		//conditions de quete
	recompenses = ["abs2[445] = 0;abs2[397] = 0;"];
	updateFermetureDialogue = [monstre.name+"=6"];
	texteRecompense = 'Merci.\n changez vite de région, à présent !';
}

Game._quest6 = function(monstre){
	dialogueText = "Bonjour étranger \n ";
	supplyText = '';																	//conditions de quete
	artefactText = '';														//conditions de quete
	buildText = '';	
}

Game._quest7 = function(monstre){
	dialogueText = 'Bonjour étranger.\n Je peux vous fournir une épée\n pour seulement\n';	
	supplyText = {'farine': 500, 'ecu' : 5};																	//conditions de quete
	artefactText = {'corde': 1, 'manche': 1, 'silex': 1};														//conditions de quete
	// buildText = [{name: 'culture_ble', nombre:2, level:2}, {name: 'culture_raisin', nombre:2, level:2}];		//conditions de quete
	buildText = [{name: 'culture_ble', nombre:1, level:2}];		//conditions de quete
	recompenses = ["Game.hero.equipement['epee'].possession = 1;", "Game.hero.equipement['epee'].life = 100;"];
	// updateFermetureDialogue = ["monstre.idQuete = 2"];
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
		// console.log(dialogueText);
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
		
		
		Game.ctx.fillStyle = 'white';
		var n = 0;
		
		for(var i =0; i< buildText.length; i++){//CONDITIONS DES BATIMENTS DU PERSONNAGE
			var buildVoulus = allBuilding[buildText[i].name].paramBuild['typeBatiment'];
			var nbVoulus = buildText[i].nombre;
			var levelVoulus = buildText[i].level;
			
			var nbBatimentPossedes = 0;
			var nbBatimentLevelPossedes = 0;
			
			Object.keys(builds).forEach(function(key) {
					if(JSON.stringify(builds[key].batiment)==JSON.stringify(buildVoulus)){
						nbBatimentPossedes++;
						if(builds[key].level == levelVoulus)
							nbBatimentLevelPossedes++;
					}				
				
			})
			
			
			if(nbBatimentPossedes != nbVoulus || nbBatimentLevelPossedes != nbBatimentPossedes){
				error = 1;
				Game.ctx.fillStyle = 'gray';
			}else
				Game.ctx.fillStyle = 'white';
			
			
			Game.ctx.fillText(buildText[i].nombre, width/4+215, height/4+138 + n);
			Game.ctx.drawImage(Loader.getImage(buildText[i].name), width/4+245, height/4+110 + n);
			Game.ctx.fillText('lvl '+buildText[i].level, width/4+280, height/4+135 + n);
			n = n+40;
			
		}
		
		if(error == 0 && (supplyText!='' || artefactText!='' || buildText!='' ))
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
					if(artefactsVoulus <= artefactText[key]){
						Game.hero.artefact.splice(i, 1);
					}
				}
			}
		})
		
		for(var i =0; i< recompenses.length; i++){		
			eval(recompenses[i]);
		}
		
		for(var i =0; i< updateFermetureDialogue.length; i++){	
			var res = updateFermetureDialogue[i].split("=");		
			var monstreName = res[0];
			var questUp 	= res[1];
			Object.keys(monsters).forEach(function(key) {
				if(monsters[key].name == monstreName){
					monsters[key].idQuete = questUp;
				}
			})
		}
		dialogueText = texteRecompense;
		supplyText = '';
		artefactText = '';
		buildText = '';
	}
}