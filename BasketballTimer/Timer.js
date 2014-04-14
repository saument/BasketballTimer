/**
 * Created by Stephen
 */


(function() {

    window.Clock = function (clk){
        this.minutes = clk + "Minutes";
        this.seconds = clk + "Seconds";
        this.tenths = clk + "Tenths";
        return this;
    }

    //This var will store the interval used to decrement the clock.
    //It will be referenced in both start and stop
    this.runningClock;

    //This var prevents the user from "stacking" function calls
    this.started = false;

    Clock.prototype.start = function() {
        //If the clock is already started there is no need to take any action
        if(!this.started){
            //This user should not be able to edit the clock after it has started
            document.getElementById(this.minutes).setAttribute("disabled", "disabled");
            document.getElementById(this.seconds).setAttribute("disabled", "disabled");
            document.getElementById(this.tenths).setAttribute("disabled", "disabled");

            //set the interval to one second
            this.runningClock = setInterval(function(){this.tick()}, 1000);
            this.started = true;
        }
    }

    Clock.prototype.stop = function() {
        //Stop the clock from running
        clearInterval(this.runningClock);

        //This user should not be able to edit the clock even if it is stopped
        document.getElementById(this.minutes).setAttribute("disabled", "disabled");
        document.getElementById(this.seconds).setAttribute("disabled", "disabled");
        document.getElementById(this.tenths).setAttribute("disabled", "disabled");
        this.started = false;
    }

    Clock.prototype.edit = function() {
        //While editing the clock there is no need for it to be running.
        this.stop();

        //Enable the fields so the user can edit them
        document.getElementById(this.minutes).removeAttribute("disabled");
        document.getElementById(this.seconds).removeAttribute("disabled");

        //The user will not be allowed to edit the tenths of seconds
        //Set the value to 0
        document.getElementById(this.tenths).setAttribute("disabled", "disabled");
        document.getElementById(this.tenths).value = 0;

        //Since we stopped the clock it is safe to set the flag back to false
        this.started = false;
    }

    Clock.prototype.tick = function () {
        if(document.getElementById(this.seconds).value > 0){
            document.getElementById(this.seconds).value -= 1;
        }else{
            if(document.getElementById(this.minutes).value > 0){
                document.getElementById(this.minutes).value -= 1;
                document.getElementById(this.minutes).value = 59;
            }else{

            }
        }
    }
}());

var gameClock = new Clock("game");
var shotClock = new Clock("shot");


//This function is called when the user wants to modify the score of either team
//The parameters specify the team and the score adjustment ( + or - )
function adjustScore(team, adjustment){
    var intVal;
    if(team == "home"){
        if(adjustment == "up"){
            //the return type of value is a string so use parse int so that we
            //can manipulate it as an integer
            intVal = parseInt(document.getElementById("homeScore").value) + 1;
            document.getElementById("homeScore").value = intVal;
        }else{
            //it does not make sense to have a score less than 0
            //if it is not less than 0, the initial call in the if will take care of the decrement
            if((document.getElementById("homeScore").value -= 1) < 0){
                document.getElementById("homeScore").value = 0;
            }
        }
    }else{
        if(adjustment == "up"){
            intVal = parseInt(document.getElementById("awayScore").value) + 1;
            document.getElementById("awayScore").value = intVal;
        }else{
            if((document.getElementById("awayScore").value -= 1) < 0){
                document.getElementById("awayScore").value = 0;
            }
        }
    }
}