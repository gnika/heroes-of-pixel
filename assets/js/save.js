function save(){
	var save = location.search.split('save=')[1]/////RECUPERATION DE SAUVEGARDE !	
	if(typeof(save) != 'undefined'){
		monsters	 = [];
		builds		 = [];
		artefacts	 = [];
		save = save.replace(/%22/g, '"');
		var save = JSON.parse(save);
		
		var monstreSave = save[0];
		var batimentsSave = save[1];
		var artefactMapSave = save[2];
		var heroSave = save[3];
		var mapSave = save[4];

		for(var i = 0; i< monstreSave.length; i++){
			generateMonstre(Game.hero.map, monstreSave[i][5], monstreSave[i][6], monstreSave[i][4], monstreSave[i][3], monstreSave[i][8], monstreSave[i][2], monstreSave[i][0], monstreSave[i][1], monstreSave[i][7]);
		}
		for(var i = 0; i< artefactMapSave.length; i++){
			generateArtefact(Game.hero.map, artefactMapSave[i][0], artefactMapSave[i][1], artefactMapSave[i][3], artefactMapSave[i][2], artefactMapSave[i][4]);
		}
		
		for(var i = 0; i< batimentsSave.length; i++){
			var nameBuild 			= batimentsSave[i][4];
			var caracteristiqueEntree 	= batimentsSave[i][6];
			var caracteristiqueValue 	= batimentsSave[i][10];
			var caracteristiqueSave 	= [];
			var a = 0;
			Object.keys(caracteristiqueEntree).forEach(function(key) {
				
				caracteristiqueSave[caracteristiqueEntree[key]] = caracteristiqueValue[a];
				a++;
			})
			
			Game.nameBuild = new Building(map, batimentsSave[i][0], batimentsSave[i][1], batimentsSave[i][2], batimentsSave[i][3], 60, batimentsSave[i][5], batimentsSave[i][9], caracteristiqueSave,  batimentsSave[i][7],  batimentsSave[i][8]);
			builds[batimentsSave[i][2]+'-'+batimentsSave[i][3]] = Game.nameBuild;	
		}
		
		niveauMap		= mapSave[4];
		Game.hero.agilite			 = heroSave[0];
		Game.hero.attaque			 = heroSave[1];
		Game.hero.attaqueEnCours	 = heroSave[2];
		Game.hero.defense			 = heroSave[3];
		Game.hero.x					 = heroSave[4];
		Game.hero.y					 = heroSave[5];
		Game.hero.life				 = heroSave[6];
		Game.hero.fatigue			 = heroSave[7];
		Game.hero.exploration		 = heroSave[8];
		Game.hero.artefact			 = heroSave[9];
		Game.hero.supply			 = heroSave[11];
		
		var equipEntree 	= heroSave[12];
		var equipValue	 	= heroSave[13];
		var equipSave 		= [];
		var a = 0;
		Object.keys(equipEntree).forEach(function(key) {
			equipSave[equipEntree[key]] = equipValue[a];
			a++;
		})
		Game.hero.equipement		 = equipSave;
		
		abs1 			= mapSave[0];
		abs2		 	= mapSave[1];
		
		Game.hero.map.layers[0] = mapSave[2];
		Game.hero.map.layers[1] = mapSave[3];
		
		absobs1		 	= mapSave[2];				//BUG JE COMPRENDS PAS POURQUOI
		absobs2			= mapSave[3];
	}
}