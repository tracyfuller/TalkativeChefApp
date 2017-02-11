myApp.controller('resultsController', ['$http', '$scope', '$window', 'RecipeFactory', function($http, $scope, $window, RecipeFactory) {

console.log('results controller');

$scope.recipeFactory = RecipeFactory;

$scope.recipeContainerTest = true;
$scope.responseReceived = false;


//get the ID off of URL; plan b since I couldn't get the factory to work;
var address = document.URL;
var ID = address.split('=').pop();

//goes to the factory: sets id pulled from url; gets and returns recipe info;
$scope.recipeFactory.setID(ID);
$scope.recipeFactory.getRecipeFactory(ID).then(function(response){
  $scope.recipeInfo = $scope.recipeFactory.recipeSteps();
  $scope.steps = $scope.recipeInfo.analyzedInstructions[0].steps
  console.log($scope.recipeInfo);
  console.log($scope.steps);
  console.log($scope.steps.length)

  });

//code for the search bar
  $scope.sendRequest = function(recipeSearchField) {

    //captures the search criterai
    var search = $scope.recipeSearchField;

    //sets the search criteria in factory; initalize request and return nresults
    $scope.recipeFactory.setSearch(search);
    $scope.recipeFactory.sendRequest(recipeSearchField).then(function(response){
    $scope.recipeList = $scope.recipeFactory.returnRequest();
    $scope.recipeSearchField = '';
    
    $scope.responseReceived = true; //sets the response box to show
    $scope.recipeContainerTest = false; //this sets the current recipe list to false so that results show on same page;



    //opens the response below the fold
    console.log($scope.recipeList);
    });


  };

  $scope.getRecipe = function(recipeId){
    var id = recipeId;

    console.log(id);
    $scope.recipeFactory.setID(id);
    $scope.recipeFactory.getRecipeFactory().then(function(repsonse){
    //$window.location.href = '/public/views/recipe.html?id='+id
    $scope.responseReceived = false; //sets the response box to show
    $scope.recipeContainerNew = true; //this sets the current recipe list to false so that results show on same page;

    $scope.recipeInfoNew = $scope.recipeFactory.recipeSteps();
    $scope.stepsNew = $scope.recipeInfo.analyzedInstructions[0].steps
    console.log($scope.recipeInfoNew);
    });
  }

/**************BEGIN SPEECH******************/

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

//set commands and grammar for initial
var commands = [ "first", " first", "first ", " first "];
var grammar = '#JSGF V1.0; grammar commands; public <next> = ' + commands.join(' | ') + ' ;';

//set commands and grammar for second
var secondCommands = [ "next", " next", "next ", " next "];
var grammar = '#JSGF V1.0; grammar commands; public <next> = ' + secondCommands.join(' | ') + ' ;';

var redoCommands = [ "again", " again", "again ", " again "];
var grammar = '#JSGF V1.0; grammar commands; public <next> = ' + redoCommands.join(' | ') + ' ;';

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var recognizing = false;

//define lists of cues
var firstList= '';
commands.forEach(function(v, i, a){
  console.log(v, i);
  firstList += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});

var secondList= '';
secondCommands.forEach(function(v, i, a){
  console.log(v, i);
  secondList += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});

//function on button click
speech = function(){
  responsiveVoice.speak("Let me know when you're ready.");
  recognizing = true;
  recognition.start();
  console.log('Ready to receive a command.');

    //test loop for commands
    for(i=0; i<$scope.steps.length; i++){
      console.log($scope.steps[i].step);
    };

}

//listening event
recognition.onresult = function(event) {
  console.log('testing');

  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;

//initailize the step at 0;
  var step = 0;

//idea: loop through the each command array as i speak; if there is a match to any arrai, do this; second commands needs to have as many 

   commands.forEach(function(v, i, a){
    // command.
    // //s/  +/ /g;
    if(command.toLowerCase() == v.toLowerCase()){
      responsiveVoice.speak($scope.steps[step].step);
      //recognizing = false;
      //recognition.stop();}
      }else{
      console.log(command);
      
    }
   });

   secondCommands.forEach(function(v, i, a){
    if(command.toLowerCase() == v.toLowerCase()){
      step = step + 1;
      console.log(step);
      responsiveVoice.speak($scope.steps[step].step);

      //recognizing = false;
      //recognition.stop();}
      }else{
      console.log(command);
      }
      });

    redoCommands.forEach(function(v, i, a){
    if(command.toLowerCase() == v.toLowerCase()){
      //step = step + 1;
      console.log(step);
      responsiveVoice.speak($scope.steps[step].step);

      //recognizing = false;
      //recognition.stop();}
      }else{
      console.log(command);
      }
   });
}


recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that message.";
  //reset();
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  //recognition.stop();
}


}]);
