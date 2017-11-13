function Time() {
    var day     = 1;
    var hour    = 0;
    var minute  = 0;

    this.startTime = function () {
        document.getElementById("gameTime").innerHTML = "Jour " + day + " - " + hour + "h" + isZero(minute);
        
        if (minute == 50) {
            minute = 0;
            hour++;
        } else {
            minute += 10;
        }

        if (hour == 24) {
            hour   = 0;
            minute = 0;
            day++;
        }
    }

    /**
     * Si le nombre est 0, retourne le String "00"
     * Sinon retourne la valeur du nombre initial en Int
     * @param {Int} number 
     */
    function isZero(number) {
        if (number == 0) {
            return "00";
        } else {
            return number;
        }
    }

    /**
     * COMING SOON
     */
    this.stopTime = function() {
        clearInterval();
    }

    /**
     * COMING SOON
     */
    this.speedUpTime = function(speed) {

    }
}