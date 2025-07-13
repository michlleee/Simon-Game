
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 1;
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;

function nextSequence(){
    userClickedPattern = [];

    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    for(let i = 0; i < gamePattern.length; i++){
        setTimeout(function(){
            //animate pressed button
            animateButton(gamePattern[i]);
        
            //implement sound
            implementSound(gamePattern[i]);

        }, i*600);
        console.log(gamePattern);
    }
    level++;
}

function animateButton(color){
    $("." + color).addClass("pressed");
    setTimeout(function (){
        $("." + color).removeClass("pressed");
    }, 100);
}

function implementSound(color){
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        
        if(userClickedPattern.length === gamePattern.length){
            console.log(userClickedPattern.length);
            console.log(gamePattern.length);
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }

    }
    else{
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);


        console.log("failed");
        restartGame();
        
    }
}

$(".btn").on("click", function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animateButton(userChosenColor);
    implementSound(userChosenColor);

    var lastAnswer = (userClickedPattern.length) - 1;
    checkAnswer(lastAnswer)
});

function startGame(){
    $(document).on("keydown", function(){
        if(!gameStart){
            $("h1").text("Level " + level);
            nextSequence();
            gameStart = true;
        }
    });
}

function restartGame(){
    level = 0;
    gameStart = false;
    gamePattern = [];
    userClickedPattern = [];
    startGame();
}

startGame();

