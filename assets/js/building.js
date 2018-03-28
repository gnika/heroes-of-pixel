function Building(map, x, y, row, col, life, name, batiment, caracteristique, typeTile, solid) {
    this.map = map;
    this.life = life;
    this.name = name;
     this.x = x;
     this.y = y;
    this.level = 1;
    this.hour = hour;//heure de construction
    this.day = day;//jour de construction
    this.batiment = batiment;
    this.caracteristique=caracteristique;
    //si batiment envoit des projectiles
    this.xDelta=0;
    this.yDelta=0;
    this.row=row;
    this.col=col;
    this.cible=0;
    this.cibleMouvante=0;
    this.typeTile=typeTile;
    this.solid=solid;
    
    this.calculPortee = function(x, y, portee, rowMonstre, colMonstre)
    { 
    
        xLimiteMoins = x - portee;
        xLimitePlus = x + portee;
        
        yLimiteMoins = y - portee;
        yLimitePlus = y + portee;
        
        if(xLimiteMoins<0)
            xLimiteMoins = 0;
        if(yLimiteMoins<0)
            yLimiteMoins = 0;
        
        var porteeX = [x];
        var porteeY = [y];
        
        for(var i=1;i<=portee;i++){
            porteeX.push(x-i); 
            porteeX.push(x+i); 
            porteeY.push(y-i); 
            porteeY.push(y+i); 
        }
        
        if(porteeX.includes(rowMonstre) && porteeY.includes(colMonstre))
            return true;
        else 
            return false;
        
    }
 } 
 
 function setBuilding()
 {
	 
	 
		var supplyBuild 		= [];		//scierie
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		caracteristique['showLife'] = 1;
		// caracteristique['level'] = 1;
		caracteristique['maintenance'] = {'ecu': 25};
		caracteristique['prixUpdate'] = {'bois': 5};
		caracteristique['recompense'] = {'planche': 10};
		caracteristique['updateNiveau'] = {'ecu': 100, 'bois': 25};
		supplyBuild['ecu'] = 100;
		supplyBuild['pierre'] = 25;
		paramBuild['typeBatiment'] = [44, 45, 46, 47];
		paramBuild['typeTile'] = [1, 0];
		paramBuild['life'] = 60;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Scierie';
		description_fr = 'transforme le bois en planche';
		description_en = 'EN transforme le bois en planche';

		allBuilding['scierie']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		var supplyBuild 		= [];	//mine de fer
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		supplyBuild['ecu'] = 250;
		supplyBuild['planche'] = 25;
		// caracteristique['level'] =1;
		caracteristique['maintenance'] = {'ecu': 25};
		caracteristique['updateNiveau'] = {'ble': 25, 'or': 25};
		caracteristique['attaque'] =0;
		caracteristique['showLife'] =1;
		caracteristique['portee'] =0;
		caracteristique['recompense'] = {'fer': 10};
		paramBuild['typeBatiment'] = [32, 33, 34, 35];
		paramBuild['typeTile'] = [1, 88];
		paramBuild['life'] = 60;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Mine de fer';
		description_fr = 'Les mines de fer génèrent du fer\nnécessaire à la création\nde plusieurs bâtiments et objets.';
		description_en = 'EN mines de fer génèrent du fer\nnécessaire à la création\nde plusieurs bâtiments et objets.';
			
		allBuilding['mine_fer']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		var supplyBuild 		= [];	//mine d'or
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		supplyBuild['pierre'] = 20;
		supplyBuild['planche'] = 30;
		supplyBuild['ecu'] = 30;
		// supplyBuild['bois'] = 150;
		// caracteristique['level'] =1;
		caracteristique['maintenance'] = {'ecu': 25};
		caracteristique['updateNiveau'] = {'ble': 50, 'argile': 100};
		caracteristique['attaque'] =0;
		caracteristique['showLife'] =1;
		caracteristique['recompense'] = {'or': 10};
		caracteristique['portee'] =0;
		caracteristique['updateNiveau'] = {'ble': 20, 'or': 30};
		paramBuild['typeBatiment'] = [48, 49, 50, 51];
		paramBuild['typeTile'] = [62, 52];
		paramBuild['life'] = 60;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Mine d\'or';
		description_fr = 'Les mines d\'or génèrent de l\'or \nnécessaire à la création\nde plusieurs bâtiments et objets.';
		description_en = 'EN mines d\'or génèrent de l\'or\nnécessaire à la création\nde plusieurs bâtiments et objets.';
			
		allBuilding['mine_or']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		var supplyBuild 		= [];	//blé
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		caracteristique['showLife'] = 0;
		// caracteristique['level'] = 1;
		caracteristique['recompense'] = {'ble': 50};
		// caracteristique['updateNiveau'] = {'ecu': 40, 'argile': 100, 'fer': 100, 'vin': 1000};
		caracteristique['updateNiveau'] = {'ecu': 100};
		caracteristique['outilRecompense'] = 'faux';
		caracteristique['maintenance'] = {'ecu': 10};
		caracteristique['loseLife'] = 1;
		supplyBuild['bois'] = 30;
		supplyBuild['argile'] = 25;
		paramBuild['typeBatiment'] = [36, 37, 38, 39];
		paramBuild['typeTile'] = [1, 0];
		paramBuild['life'] = 3;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Champs de blé';
		description_fr = 'Le blé mets 3 jours pour pousser\net permet de nourrir le moulin\n qui le transforme en farine';
		description_en = 'EN blé mets 3 jours pour pousser\net permet de nourrir le moulin\n qui le transforme en farine';

		allBuilding['culture_ble']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
	 };
		var supplyBuild 		= [];	//vigne
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		caracteristique['showLife'] = 0;
		// caracteristique['level'] = 1;
		caracteristique['recompense'] = {'vigne': 10};
		caracteristique['updateNiveau'] = {'or': 10, 'argile': 10};
		caracteristique['outilRecompense'] = 'faux';
		caracteristique['maintenance'] = {'ecu': 15};
		caracteristique['loseLife'] = 1;
		supplyBuild['planche'] = 20;
		supplyBuild['ecu'] = 25;
		paramBuild['typeBatiment'] = [40, 41, 42, 43];
		paramBuild['typeTile'] = [1, 0];
		paramBuild['life'] = 3;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Vigne';
		description_fr = 'La vigne génère du raisin,\n nécessaire à la fabrication du vin';
		description_en = 'EN La vigne génère du raisin, nécessaire à la fabrication du vin';

		allBuilding['culture_raisin']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
	 };
		var supplyBuild 		= [];	//moulin
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		supplyBuild['ecu'] = 150;						//prix
		supplyBuild['bois'] = 150;		
		caracteristique['maintenance'] = {'ecu': 25};		//prix à payer par jour pour maintenance
		caracteristique['updateNiveau'] = {'ble': 50, 'argile': 100}; //prix à payer pour augmenter un niveau
		// caracteristique['level'] =1;						//level du batiment
		caracteristique['attaque'] =0;						//attaque du batiment
		caracteristique['showLife'] =1;						//montrer ou pas la barre de vie
		caracteristique['portee'] =0;						//portée en case des batiments qui tirent
		caracteristique['prixUpdate'] = {'ble': 100};		//prix à fournir pour passer d'un statut 
		caracteristique['recompense'] = {'farine': 100};	//prix reçu quand le héros ramasse les ressources
		caracteristique['outilRecompense'] = 'faux';		// outil à utiliser pour le héros pour ramasser les ressources
		paramBuild['typeBatiment'] = [20, 21, 22, 23];		// les différents statut du batiment
		paramBuild['typeTile'] = [1, 0];							//type de tile sur lequel doit être construit le batiment
		paramBuild['life'] = 60;							//vie du batiment
		paramBuild['solid'] = 0;							//peut-on passer sur le batiment
			
		menussclickTitre = 'Moulin';
		description_fr = 'Le moulin produit de la farine\n nécéssaire pour fabriquer du pain.';
		description_en = 'EN moulin produit de la farine nécéssaire pour fabriquer du pain.';

		allBuilding['moulin']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		var supplyBuild 		= [];	//boulangerie
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		supplyBuild['ecu'] = 150;
		supplyBuild['bois'] = 150;
		supplyBuild['fer'] = 150;
		// caracteristique['level'] = 1;
		caracteristique['maintenance'] = {'ecu': 25};
		caracteristique['updateNiveau'] = {'ble': 50, 'argile': 100};
		caracteristique['attaque'] = 0;
		caracteristique['showLife'] = 1;
		caracteristique['portee'] = 0;
		caracteristique['prixUpdate'] = {'farine': 100};
		caracteristique['recompense'] = {'pain': 100};
		caracteristique['outilRecompense'] = 'faux';
		paramBuild['typeBatiment'] 	  = [24, 25, 26, 27];
		paramBuild['typeTile'] = [1, 0];
		paramBuild['life'] = 60;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Boulangerie';
		description_fr = 'La boulangerie produit du pain\nIndispensable pour ne pas mourir de faim';
		description_en = 'EN boulangerie produit du pain\nIndispensable pour ne pas mourir de faim';
			
		allBuilding['boulangerie']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		
		var supplyBuild 		= [];	//mine d'argent
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		supplyBuild['ecu'] = 350;
		supplyBuild['bois'] = 150;
		// caracteristique['level'] =1;
		caracteristique['maintenance'] = {'ecu': 25};
		caracteristique['updateNiveau'] = {'ble': 50, 'argile': 100};
		caracteristique['attaque'] =0;
		caracteristique['showLife'] =1;
		caracteristique['portee'] =0;
		paramBuild['typeBatiment'] = [28, 29, 30, 31];
		paramBuild['typeTile'] = [1, 0];
		paramBuild['life'] = 60;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Mine d\'argent';
		description_fr = 'Les mines d\argent génèrent de l\'argent\nnécessaire à la création\nde plusieurs bâtiments et objets.';
		description_en = 'EN Les mines d\argent génèrent de l\'argent\nnécessaire à la création\nde plusieurs bâtiments et objets.';
			
		allBuilding['mine_argent']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		var supplyBuild 		= [];	//tourelle
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		// supplyBuild['ecu'] = 0;
		supplyBuild['ecu'] = 350;
		supplyBuild['bois'] = 150;
		supplyBuild['fer'] = 150;
		supplyBuild['fer'] = 150;
			
		// caracteristique['level'] =1;
		caracteristique['maintenance'] = {'ecu': 25};
		caracteristique['updateNiveau'] = {'ble': 50, 'argile': 100};
		caracteristique['attaque'] =10;
		caracteristique['showLife'] =1;
		caracteristique['portee'] =2;
		paramBuild['typeBatiment'] = [6];
		paramBuild['typeTile'] = [1, 0];
		paramBuild['life'] = 60;
		paramBuild['solid'] = 1;
		
		menussclickTitre = 'Tourelle';
		description_fr = 'Les tourelles permettent d\'attaquer\nles ennemis qui passent à proximité.';
		description_en = 'EN tourelles permettent d\'attaquer\nles ennemis qui passent à proximité.';
			
		allBuilding['tour']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		var supplyBuild 		= [];		//mais
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		caracteristique['showLife'] = 0;
		// caracteristique['level'] = 1;
		caracteristique['maintenance'] = {'ecu': 25};
		caracteristique['updateNiveau'] = {'ble': 50, 'argile': 100};
		caracteristique['recompense'] = {'mais': 400};
		caracteristique['outilRecompense'] = 'faux';
		supplyBuild['ecu'] = 0;
		paramBuild['typeBatiment'] = [10, 11, 12, 13];
		paramBuild['typeTile'] = [1, 0];
		paramBuild['life'] = 3;
		paramBuild['loseLife'] = 1;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Champs de maïs';
		description_fr = 'Le maïs mets 3 jours pour pousser\net permet de nourrir les cochons';
		description_en = 'EN maïs mets 3 jours pour pousser\net permet de nourrir les cochons';

		allBuilding['culture_mais']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		var supplyBuild 		= [];		//elevage cochon
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		caracteristique['showLife'] = 1;
		// caracteristique['level'] = 1;
		caracteristique['maintenance'] = {'ecu': 25};
		caracteristique['updateNiveau'] = {'ble': 50, 'argile': 100};
		caracteristique['recompense'] = {'cochon': 400};
		supplyBuild['ecu'] = 0;
		paramBuild['typeBatiment'] = [53, 54, 55, 56];
		paramBuild['typeTile'] = [1, 0];
		paramBuild['life'] = 60;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Elevage';
		description_fr = 'L\'élevage génère des cochons';
		description_en = 'EN L\'élevage génère des cochons';

		allBuilding['culture_cochon']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		var supplyBuild 		= [];		//boucherie
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		caracteristique['showLife'] = 1;
		caracteristique['recompense'] = {'viande': 400};
		// caracteristique['level'] = 1;
		caracteristique['maintenance'] = {'ecu': 25};
		caracteristique['updateNiveau'] = {'ble': 50, 'argile': 100};
		supplyBuild['ecu'] = 0;
		paramBuild['typeBatiment'] = [63, 64, 65, 66];
		paramBuild['typeTile'] = [1, 0];
		caracteristique['prixUpdate'] = {'cochon': 0};
		paramBuild['life'] = 60;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Boucherie';
		description_fr = 'Transforme les cochons en viande';
		description_en = 'EN Transforme les cochons en viande';

		allBuilding['boucherie']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
		
		
		var supplyBuild 		= [];		//entrepot
		var caracteristique 	= [];
		var paramBuild 			= [];
		
		supplyBuild['ecu'] = 99900;
		paramBuild['typeBatiment'] = [61];
		paramBuild['typeTile'] = [1, 0];
		caracteristique['showLife'] = 1;
		caracteristique['maintenance'] = {'ecu': 0};
		// caracteristique['level'] =1;
		paramBuild['life'] = 60;
		paramBuild['solid'] = 0;
		
		menussclickTitre = 'Entrepôt';
		description_fr = 'Bâtiment de départ';
		description_en = 'EN Bâtiment de départ';

		allBuilding['entrepot']  = {
		 'caracteristique'	: caracteristique,
		 'supplyBuild' 		: supplyBuild,
		 'paramBuild' 		: paramBuild,
		 'menussclickTitre' : menussclickTitre,
		 'description_fr'	: description_fr,
		 'description_en'	: description_en
		};
	 
	 
	 
	 
 }