function Time() {
    var minute  = 0;
    
    this.timeOut = null;

    this.startTime = function () {
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
        }

		
		Object.keys(builds).forEach(function(key) {
			if(builds[key].hour == hour && builds[key].day+1 == day && builds[key].batiment.length>1 && minute == 0){
				
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
							if(Game.hero.supply[keyPrice] >= updatePrice[keyPrice])
								Game.hero.supply[keyPrice]-= updatePrice[keyPrice];
							else
								error = 1;
						})
					}
				}
					
				if(abs2[pos] < builds[key].batiment[3] && error == 0){
					abs2[pos] = abs2[pos]+1;
					builds[key].day = day;
				}
			}
		})
	
		
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