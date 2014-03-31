/**
 * Created by Stephen
 */

//This var will store the interval used to decrement the clock.
//It will be referenced in both start and stop
var runningClock;

//This var prevents the user from "stacking" function calls
var started = false;

function start () {
    //If the clock is already started there is no need to take any action
    if(!started){
        //This user should not be able to edit the clock after it has started
        document.getElementById("gameMinutes").setAttribute("disabled", "disabled");
        document.getElementById("gameSeconds").setAttribute("disabled", "disabled");
        document.getElementById("gameTenths").setAttribute("disabled", "disabled");

        //set the interval to one second
        runningClock=setInterval(function(){clock()}, 1000);
        started = true;
    }
}

function stop () {
    //Stop the clock from running
    clearInterval(runningClock);

    //This user should not be able to edit the clock even if it is stopped
    document.getElementById("gameMinutes").setAttribute("disabled", "disabled");
    document.getElementById("gameSeconds").setAttribute("disabled", "disabled");
    document.getElementById("gameTenths").setAttribute("disabled", "disabled");
    started = false;
}

function edit () {
    //While editing the clock there is no need for it to be running.
    stop();

    //Enable the fields so the user can edit them
    document.getElementById("gameMinutes").removeAttribute("disabled");
    document.getElementById("gameSeconds").removeAttribute("disabled");

    //The user will not be allowed to edit the tenths of seconds
    //Set the value to 0
    document.getElementById("gameTenths").setAttribute("disabled", "disabled");
    document.getElementById("gameTenths").value = 0;

    //Since we stopped the clock it is safe to set the flag back to false
    started = false;
}

function clock () {
    if(document.getElementById("gameSeconds").value > 0){
        document.getElementById("gameSeconds").value -= 1;
    }else{
        if(document.getElementById("gameMinutes").value > 0){
            document.getElementById("gameMinutes").value -= 1;
            document.getElementById("gameSeconds").value = 59;
        }else{

        }
    }
}

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