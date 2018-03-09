function Time() {
    var minute  = 0;
    var semaine  = 1;
    
    this.timeOut = null;

    this.startTime = function () {
		// console.log(layer1Tmp.length);
			if(layer1Tmp.length == 0){
			
			speedValue = arguments[0];
			
			document.getElementById("gameTime").innerHTML = "Jour " + day + " - " + checkNumber(hour) + "h" + checkNumber(minute);
			
			if (minute == 50) {
				minute = 0;
				hour++;
				
				var resteFatigue = Game.hero.fatigue - 1;
				if(resteFatigue < 0)
					resteFatigue = 0;
				
				Game.hero.fatigue = resteFatigue;
				if(resteFatigue == 0){
					Game.hero.life = Game.hero.life - 1;
					if(Game.hero.life < 0)
						Game.hero.life =0;
				}
				
				
				
			} else {
				minute += 10;			
			}

			if (hour == 24) {
				hour   = 0;
				minute = 0;
				day++;
				semaine++;
				
				//generate 5 monstres
				for(var i = 0; i < 5; i++){
					var xRowMonster	 = Math.floor((Math.random() * Game.hero.map.rows) + 1);
					var yColMonster	 = Math.floor((Math.random() * Game.hero.map.cols) + 1);

					var xMonster	 = xRowMonster * Game.hero.map.tsize;
					var yMonster	 = yColMonster * Game.hero.map.tsize;
					var dirY 		 = 0;
					var dirX 		 = 0;
					
					if(abs2[yColMonster*Game.hero.map.rows+xRowMonster] == 0 && !monsters[xRowMonster+'-'+yColMonster]){
						dirX = Math.round((Math.random() - 0.5) * 2);
						if(dirX == 0)
							dirY = Math.round((Math.random() - 0.5) * 2);
						else
							dirX = 0;
						if(dirX == 0 && dirY == 0)
							var vitesse = 0;
						else
							var vitesse = 2;
						
						var generateMonsters = ['brigand', 'gobelin', 'balrog', 'scorpion', 'troll'];
						var rand = generateMonsters[(Math.random() * generateMonsters.length) | 0];
						
						if(yMonster != Game.hero.y && xMonster != Game.hero.x)
							generateMonstre(map, xMonster, yMonster, xRowMonster, yColMonster, rand, vitesse, dirX, dirY);
						
					}

				}
				
				//remplir tous les trous toutes les semaines et apparition d'artefacts
				if(semaine == 7){
					
					
					for(var i = 0; i < 10; i++){
						var xRowMonster	 = Math.floor((Math.random() * Game.hero.map.rows) + 1);
						var yColMonster	 = Math.floor((Math.random() * Game.hero.map.cols) + 1);

						var xMonster	 = xRowMonster * Game.hero.map.tsize;
						var yMonster	 = yColMonster * Game.hero.map.tsize;
						var dirY 		 = 0;
						var dirX 		 = 0;
						
						if(abs2[yColMonster*Game.hero.map.rows+xRowMonster] == 0){
							
							var keys = Object.keys(allArtefacts);
							keys = keys[Math.floor(keys.length * Math.random())];
							if(allArtefacts[keys] != null)
								generateArtefact(map, xMonster, yMonster, xRowMonster, yColMonster, allArtefacts[keys].name);
							
						}

					}
					
					
					
					var i, n = abs1.length;
					for (i = 0; i < n; ++i) {
						if(abs1[i] == 2){
							abs1[i] = 1;
							absobs1[i] = 1;
							
							if( Math.random() < 0.5){
								abs2[i] = 8;
								absobs2[i] = 8;
							}
							
						}
						if(abs1[i] == 58){
							absobs1[i] = 57;
							abs1[i] = 57;
						}
						if(abs1[i] == 60){
							absobs1[i] = 59;
							abs1[i] = 59;
						}
					}
					semaine = 1;
				}
				
			}

			// if(Game.hero){
				// console.log(Game.hero.artefactEnCours.keys(Game.hero.artefactEnCours).length);
				 // if(Game.hero.artefactEnCours
			// }
			
			Object.keys(builds).forEach(function(key) {
				if(builds[key].hour == hour && builds[key].day+1 == day && builds[key].batiment.length>1 && minute == 0){
					
					
					var maintenance = builds[key].caracteristique['maintenance'];
					
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
					}
					builds[key].day = day;
					
					var error = 0;
					//maintenance par jour
					Object.keys(maintenance).forEach(function(keyPrice) {
							if(Game.hero.supply[keyPrice] < maintenance[keyPrice])
								error = 1;
						})
						
						if(error == 0){
							Object.keys(maintenance).forEach(function(keyPrice) {
								Game.hero.supply[keyPrice]-= maintenance[keyPrice];
							})
						}else{
							builds[key].life-=10;
							if(builds[key].life <= 0){
								anim = new animation(map, builds[key].x, builds[key].y, 'cloud');
								delete builds[key];
								abs2[pos] = 2;
								absobs2[pos] = 2;
							}
						}
				}
			})
		
		}
			
			var className = this; // A changer
			this.timeOut  = setTimeout(function () { className.startTime(speedValue) }, speedValue);
    }

    /**
     * Retourne un double digit dans le cas où number est inférieur à 0
     * @param {mixed} number 
     */
    function checkNumber(number) {
        if (number == 0) {
            return "00";
        } else if (number < 10) {
            return "0" + number;
        } else {
            return number;
        }
    }
}