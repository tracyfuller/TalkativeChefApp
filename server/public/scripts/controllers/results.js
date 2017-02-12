myApp.controller('resultsController', ['$http', '$scope', '$window', 'RecipeFactory', function($http, $scope, $window, RecipeFactory) {

//console.log('results controller');

$scope.recipeFactory = RecipeFactory;

$scope.recipeContainerTest = true;
$scope.responseReceived = false;

//get the ID off of URL; plan b since I couldn't get the factory to work;
var address = document.URL;
var ID = address.split('=').pop();

var text = [];
var paragraph = '';
var sentence = [];
//goes to the factory: sets id pulled from url; gets and returns recipe info;
$scope.recipeFactory.setID(ID);
$scope.recipeFactory.getRecipeFactory(ID).then(function(response){

  $scope.recipeInfo = $scope.recipeFactory.recipeSteps();
  $scope.steps = $scope.recipeInfo.analyzedInstructions[0].steps
  //console.log($scope.recipeInfo);
  //console.log($scope.steps);
  //console.log($scope.steps.length)

  $scope.steps.forEach(
    function(step, index){
      //push to array;
      text.push(step.step);
    });
  //console.log(text.join());
  paragraph = text.join();
  sentence = paragraph.split('.')
  //console.log(sentence);

  });

// might not need the code below:
// intialize an empty array to hold ingredients;


  // loop through the returned array and pull out the directions;




//code for the search bar
  $scope.sendRequest = function(recipeSearchField) {

    //captures the search criterai
    var search = $scope.recipeSearchField;

    //sets the search criteria in factory; initalize request and return nresults
    $scope.recipeFactory.setSearch(search);
    $scope.recipeFactory.sendRequest(recipeSearchField).then(function(response){
    $scope.recipeList = $scope.recipeFactory.returnRequest();

    //opens the response below the fold
    //console.log($scope.recipeList);
    });


  };

/**************BEGIN SPEECH******************/

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

//set commands and grammar for initial
var commands = [ "first", " first", "first ", " first ", "first step", " first step", "first step ", " first step "];
var grammar = '#JSGF V1.0; grammar commands; public <next> = ' + commands.join(' | ') + ' ;';

//set commands and grammar for second
var secondCommands = [ "next", " next", "next ", " next ", "next step", " next step", "next step ", " next step "];
var grammar = '#JSGF V1.0; grammar commands; public <next> = ' + secondCommands.join(' | ') + ' ;';

var redoCommands = [ "repeat step", " repeat step", "repeat step ", " repeat step ", "again", " again", "again ", " again "];
var grammar = '#JSGF V1.0; grammar commands; public <next> = ' + redoCommands.join(' | ') + ' ;';

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var recognizing = false;

//define lists of cues
var firstList= '';
commands.forEach(function(v, i, a){
  //console.log(v, i);
  firstList += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});

var secondList= '';
secondCommands.forEach(function(v, i, a){
  //console.log(v, i);
  secondList += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});

//function on start button click
speech = function(){
  responsiveVoice.speak("Let me know when you're ready.");
  recognizing = true;
  recognition.start();
  //console.log('Ready to receive a command.');

    //test loop for commands
    // for(i=0; i<$scope.steps.length; i++){
    //   console.log($scope.steps[i].step);
    // };

}
  var sentenceStep = 0;

//function on stop button click
stopspeech = function(){
    recognizing = false;
    recognition.stop();
    recognition.continuous = false;
    responsiveVoice.speak("You are all done.");
    //console.log('Speech recognition service disconnected');
  }


//listening event
recognition.onresult = function(event) {
  //console.log('testing');

  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;

//initailize the step at 0;


//idea: loop through the each command array as i speak; if there is a match to any arrai, do this; second commands needs to have as many

   commands.forEach(function(v, i, a){
    // command.
    // //s/  +/ /g;
    if(command.toLowerCase() == v.toLowerCase()){
      //console.log('before step',sentenceStep);
      responsiveVoice.speak(sentence[0]);
      sentenceStep = 0;
      //console.log('after step',sentenceStep)
      //recognizing = false;
      //recognition.stop();}
      }else{
      console.log(command);

    }
   });

   secondCommands.forEach(function(v, i, a){
    if(command.toLowerCase() == v.toLowerCase()){
      //console.log(sentenceStep);
      sentenceStep = sentenceStep + 1;
      responsiveVoice.speak(sentence[sentenceStep]);
      //step = step + 1;

      }else{
      console.log(command);
      }
      });

    redoCommands.forEach(function(v, i, a){
    if(command.toLowerCase() == v.toLowerCase()){
      //step = step + 1;
      //console.log(sentenceStep);
      responsiveVoice.speak(sentence[sentenceStep]);

      //recognizing = false;
      //recognition.stop();}
      }else{
      console.log(command);
      }
   });

   recognition.onnomatch = function(event) {
     diagnostic.textContent = "I didn't recognise that message.";
     //reset();
   }

   recognition.onerror = function(event) {
     diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
     //recognition.stop();
   }

}
}]);
