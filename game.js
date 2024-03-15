var buttonColors=["red","blue","green","yellow"];
var gamepattern=[];

var userclickedpattern=[];
$(".btn").click(function(){
    var colorchosen=$(this).attr("id");
    userclickedpattern.push(colorchosen);
    playsound(colorchosen);
    animatePress(colorchosen);
    checkAnswer(userclickedpattern.length-1);
});

function nextSequence(){
    var randomnum=Math.floor(Math.random()*4);
    var randomchosencolor=buttonColors[randomnum];
    gamepattern.push(randomchosencolor);
    var button=$("#"+randomchosencolor);
    button.fadeOut(100).fadeIn(100);
    playsound(randomchosencolor);
    userclickedpattern=[];
    level++;
    $("#level-title").text("Level "+level);
}

function playsound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentcolour){
    $("#"+currentcolour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolour).removeClass("pressed");
    },100);
}

var gamestarted=false;
var level=0;
$(document).keypress(function(){
    if(!gamestarted){
        $("#level-title").text("Level "+level);
        nextSequence();
        gamestarted=true;
    }
    
});

function checkAnswer(currentlevel){
    if(gamepattern[currentlevel]===userclickedpattern[currentlevel]){
        if(userclickedpattern.length===gamepattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    }
    else{
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamepattern=[];
    gamestarted=false;
}