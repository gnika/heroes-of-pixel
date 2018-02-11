function Time() {
    var minute  = 0;
    var semaine  = 1;
    
    this.timeOut = null;

    this.startTime = function () {
        speedValue = arguments[0];
        
        document.getElementById("gameTime").innerHTML = "Jour " + day + " - " + checkNumber(hour) + "h" + checkNumber(minute);
        


	
		
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