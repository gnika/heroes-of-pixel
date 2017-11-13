function Time() {
    var day     = 1;
    var hour    = 0;
    var minute  = 0;
    
    this.timeOut = null;

    this.startTime = function (speedValue = 1000) {
        document.getElementById("gameTime").innerHTML = "Jour " + day + " - " + checkNumber(hour) + "h" + checkNumber(minute);
        
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