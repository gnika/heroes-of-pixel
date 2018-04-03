function animPaysan(build){
	
	var x1  = 0;
	var y1  = 0;
	var x2 = 0;
	var y2 = 0;
	var x3 = 0;
	var y3 = 0;
	
	if(build.paysan_retour == 0){//paysan qui bouge à gauche :
		x1 = 0;
		y1 = 110;
		x2 = 32;
		y2 = 108;
		x3 = 63;
		y3 = 110;
	}else{
		x1 = 4;
		y1 = 38;
		x2 = 36;
		y2 = 36;
		x3 = 68;
		y3 = 38;
	}
	if(build.diryPaysan == 1){//paysan qui descend :
		x1 = 0;
		y1 = 74;
		x2 = 32;
		y2 = 72;
		x3 = 64;
		y3 = 74;
	}
	if(build.diryPaysan == -1){//paysan qui monte :
		x1 = 0;
		y1 = 2;
		x2 = 32;
		y2 = 0;
		x3 = 64;
		y3 = 2;
	}
	
				
	if(Game.animSprite <= DUREE_ANIMATION / 3 ){
		Game.ctx.drawImage(
			Loader.getImage('paysan'),
			x1,
			y1,
			24,
			30,
			build.paysan_position.x - Game.camera.x,
			build.paysan_position.y - Game.camera.y-30,
			24,
			30
		);
	}
	
	if(Game.animSprite > DUREE_ANIMATION / 3 && Game.animSprite <= DUREE_ANIMATION / 2 ){
		Game.ctx.drawImage(
			Loader.getImage('paysan'),
			x2,
			y2,
			24,
			30,
			build.paysan_position.x - Game.camera.x,
			build.paysan_position.y - Game.camera.y-30,
			24,
			30
		);
	}
	
	if(Game.animSprite > DUREE_ANIMATION / 2 && Game.animSprite <= DUREE_ANIMATION ){
		Game.ctx.drawImage(
			Loader.getImage('paysan'),
			x3,
			y3,
			24,
			30,
			build.paysan_position.x - Game.camera.x,
			build.paysan_position.y - Game.camera.y-30,
			24,
			30
		);
	}
}

function paysanMove(delta){
	Object.keys(builds).forEach(function(key) {
		if(builds[key].road.length >0 && builds[key].paysan_fois > 0){
			
			var rowX = map.getRow(builds[key].paysan_position.x);
			var colY = map.getCol(builds[key].paysan_position.y);
			
			posPaysan = colY * map.cols + rowX;
			
			if(builds[key].posPaysanInitial == 0){
				builds[key].posPaysanInitial	 = posPaysan;
				clone = JSON.parse( JSON.stringify( builds[key] ) ); 	//POUR EVITER DE CHANGER LA REFERENCE
				builds[key].roady = clone.road;
				builds[key].clickCanvasXPaysan	 = 0;
				builds[key].clickCanvasYPaysan	 = 0;
				builds[key].dirxPaysan			 = 0;
				builds[key].diryPaysan			 = 0;
				builds[key].dirx2Paysan			 = 0;
				builds[key].diry2Paysan			 = 0;
				builds[key].positionXPaysan		 = 0;
				builds[key].positionYPaysan		 = 0;
			}
			

			
			if(builds[key].roady.length > 1){	//si les deux prochains mouvements sont en ligne droite
				if(builds[key].roady[1] == builds[key].roady[0] + 1 && posPaysan == builds[key].roady[0] ){
					builds[key].dirxPaysan2 = 1;
					builds[key].diryPaysan2 = 0;
				}
				if( builds[key].roady[1] == builds[key].roady[0] - 1 && posPaysan == builds[key].roady[0] ){
					builds[key].dirxPaysan2 = -1;
					builds[key].diryPaysan2 = 0;
				}
				if( builds[key].roady[1] == builds[key].roady[0] + map.rows && posPaysan == builds[key].roady[0] ){
					builds[key].diryPaysan2 = 1;
					builds[key].dirxPaysan2 = 0;
				}
				if( builds[key].roady[1] == builds[key].roady[0] - map.rows && posPaysan == builds[key].roady[0] ){
					builds[key].diryPaysan2 = -1;
					builds[key].dirxPaysan2 = 0;
				}
			}else{
				builds[key].dirxPaysan2 = 0;
				builds[key].diryPaysan2 = 0;
			}
			
			if( builds[key].roady.length > 0 ){
				if(builds[key].roady[0] != posPaysan){
					
					if(builds[key].roady[0] == builds[key].posPaysanInitial + 1 )
						builds[key].clickCanvasXPaysan = 1;
					if( builds[key].roady[0] == builds[key].posPaysanInitial - 1 )
						builds[key].clickCanvasXPaysan = -1;
					if( builds[key].roady[0] == builds[key].posPaysanInitial + map.rows )
						builds[key].clickCanvasYPaysan = 1;
					if( builds[key].roady[0] == builds[key].posPaysanInitial - map.rows )
						builds[key].clickCanvasYPaysan = -1;			
					
				}else {
						var rowX = map.getRow(builds[key].paysan_position.x);
						var colY = map.getCol(builds[key].paysan_position.y);
						builds[key].positionXPaysan = rowX * map.tsize+ map.tsize/2;
						builds[key].positionYPaysan = colY * map.tsize+ map.tsize/2;
						
						if((builds[key].positionXPaysan == builds[key].paysan_position.x ) && (builds[key].paysan_position.y == builds[key].positionYPaysan) || (builds[key].dirxPaysan == builds[key].dirxPaysan2 && builds[key].diryPaysan == builds[key].diryPaysan2)){
							
							builds[key].roady.shift();
							builds[key].posPaysanInitial	 = posPaysan;
							builds[key].positionXPaysan		 = 0;
							builds[key].positionYPaysan		 = 0;
							builds[key].clickCanvasXPaysan	 = 0;
							builds[key].clickCanvasYPaysan	 = 0;
						}
						
				}
			}else{
				builds[key].posPaysanInitial = posPaysan;
			}
						
			if(builds[key].clickCanvasXPaysan!=0 || builds[key].clickCanvasYPaysan!=0 ){
				builds[key].dirxPaysan = builds[key].clickCanvasXPaysan;
				builds[key].diryPaysan = builds[key].clickCanvasYPaysan;
			}else{
				builds[key].dirxPaysan = 0;
				builds[key].diryPaysan = 0;
			}
			
			// ACTION MOVE
			if(builds[key].positionXPaysan > 0 && builds[key].positionYPaysan > 0){
			
			if(builds[key].dirxPaysan == 1){//vers la droite
				if(builds[key].paysan_position.x > builds[key].positionXPaysan)
					builds[key].paysan_position.x = builds[key].positionXPaysan;
				else
					builds[key].paysan_position.x += builds[key].dirxPaysan * builds[key].paysan_vitesse * delta * builds[key].level;
			}
			if(builds[key].dirxPaysan == -1){//vers la gauche
				if(builds[key].paysan_position.x < builds[key].positionXPaysan)
					builds[key].paysan_position.x = builds[key].positionXPaysan;
				else
					builds[key].paysan_position.x += builds[key].dirxPaysan * builds[key].paysan_vitesse * delta * builds[key].level;
			}
			if(builds[key].dirxPaysan == 0){
				builds[key].paysan_position.x = builds[key].positionXPaysan;
			}
			if(builds[key].diryPaysan == 1){//descend
				if(builds[key].paysan_position.y > builds[key].positionYPaysan)
					builds[key].paysan_position.y = builds[key].positionYPaysan;
				else
					builds[key].paysan_position.y += builds[key].diryPaysan * builds[key].paysan_vitesse * delta * builds[key].level;
			}
			if(builds[key].diryPaysan == -1){//monte
				if(builds[key].paysan_position.y < builds[key].positionYPaysan)
					builds[key].paysan_position.y = builds[key].positionYPaysan;
				else
					builds[key].paysan_position.y += builds[key].diryPaysan * builds[key].paysan_vitesse * delta * builds[key].level;
			}
			if(builds[key].diryPaysan == 0)
				builds[key].paysan_position.y = builds[key].positionYPaysan;
			}else{
				builds[key].paysan_position.x += builds[key].dirxPaysan * builds[key].paysan_vitesse * delta * builds[key].level;
				builds[key].paysan_position.y += builds[key].diryPaysan * builds[key].paysan_vitesse * delta * builds[key].level;
			}
				
			if( builds[key].roady.length == 0){
				clone = JSON.parse( JSON.stringify( builds[key] ) ); 	//POUR EVITER DE CHANGER LA REFERENCE
				if(builds[key].paysan_retour == 0){//atteint son but			
					builds[key].roady = clone.road.reverse();
					builds[key].paysan_retour	  = 1;	
					
					
					// pour afficher l'infobulle de la ressource manquante au dessus du personnage sur le chemin du retour				
					//verifie si toutes les conditions sont faites pour le faire changer d'état
					if((typeof builds[key].caracteristique['prixUpdate'] != "undefined") )
						var updatePrice = builds[key].caracteristique['prixUpdate'];
					else
						updatePrice = 0;
					
					if(updatePrice != 0){	//si on doit payer des ressources pour passer d'un niveau à l'autre - exemple : moulin doit payer 100 blé pour faire de la farine
						
						Object.keys(updatePrice).forEach(function(keyPrice) {
							if(Game.hero.supply[keyPrice] < updatePrice[keyPrice]){
								builds[key].paysan_manque = builds[key].caracteristique['prixUpdate'];
							}else
								builds[key].paysan_manque = '';
						})
					}
					
					
					
					
					
					
					
					
					
				}else{
					builds[key].roady = clone.road;
					builds[key].paysan_retour	  = 0;
					
					
					
					//verifie si toutes les conditions sont faites pour le faire changer d'état
					if((typeof builds[key].caracteristique['prixUpdate'] != "undefined") )
						var updatePrice = builds[key].caracteristique['prixUpdate'];
					else
						updatePrice = 0;
					
					var error = 0;
					var pos = builds[key].col*map.rows+builds[key].row;
					
					if(updatePrice != 0){	//si on doit payer des ressources pour passer d'un niveau à l'autre - exemple : moulin doit payer 100 blé pour faire de la farine
						
						Object.keys(updatePrice).forEach(function(keyPrice) {
							if(Game.hero.supply[keyPrice] < updatePrice[keyPrice])
								error = 1;
							
						})
						
						if(error == 0){
							Object.keys(updatePrice).forEach(function(keyPrice) {
								Game.hero.supply[keyPrice]-= updatePrice[keyPrice];
							})
							
						}
					}
						
					if(abs2[pos] < builds[key].batiment[3] && error == 0){
						abs2[pos] = abs2[pos]+1;
						absobs2[pos] = absobs2[pos]+1;
						builds[key].paysan_fois --;
					}
				}

			}
			
		}
	})
}