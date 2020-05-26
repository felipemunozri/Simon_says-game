var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level = 0;
var started = false;

$(document).on("keydown", function(){ 
  if(!started){
    $("#level-title").text("Level "+level);

    nextSequence(); 

    started = true;
  }
});  

function nextSequence(){
  level= level+1;

  $("#level-title").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);

  var randomChosenColour=buttonColours[randomNumber]; 

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").on("click", function(){
  var userChosenColour=$(this).attr("id"); 

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  var clickedButton= new Audio("sounds/"+name+".mp3");

  clickedButton.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
} 

function gameOver(){
  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  playSound("wrong");

  $("#level-title").text("Game Over, Press Any Key to Restart");
} 

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
      console.log("success");
      setTimeout(function(){
        nextSequence();
      }, 1000);
      userClickedPattern=[];
    }
  }else{
    console.log("wrong");
    gameOver();
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

