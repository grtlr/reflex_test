// Configuration
var currentActive = 4;

// Global State
var running = false;
var startTime;
var lastTime;
var lastActive = currentActive;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNext() {
    var r = getRandomInt(1, 8);
    return (currentActive + r) % 9
}

window.onload = function() {
    // active field
   $("#" + currentActive).addClass('active');
};

$(function() {
      $("#reset").click( function()
           {
               $("#" + currentActive).removeClass('active');
               $("#results").find("tr:gt(0)").remove();
               currentActive = 4;
               lastActive = currentActive;
               $("#" + currentActive).addClass('active'); 
               running = false;
           }
      );
});

function log(from, to, delta) {
    $("#results").append("<tr><td>"+from+"</td><td>"+to+"</td><td>"+delta+"ms</td></tr>");
}

$('body').keydown(function(e){
    var now = Date.now();
    if(e.keyCode == 32){
        e.preventDefault();
        var delta = 0;
        if(running){
            delta = now - lastTime;
            lastTime = now;
        } else{
            startTime = now;
            lastTime = now;
            running=true;
        }
        lastActive = currentActive;
        $("#" + lastActive).removeClass('active');
        currentActive = getNext();

        // add row
        log(lastActive+1,currentActive+1,delta);

        $("#" + currentActive).addClass('active');
        window.scrollTo(0, 0)
    }
});
