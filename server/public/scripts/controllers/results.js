myApp.controller('resultsController', ['$http', '$scope', '$window', 'RecipeFactory', function($http, $scope, $window, RecipeFactory) {

console.log('results controller');

$scope.recipeFactory = RecipeFactory;

//get the ID off of URL; plan b since I couldn't get the factory to work;
var address = document.URL;
var ID = address.split('=').pop();

//goes to the factory: sets id pulled from url; gets and returns recipe info;
$scope.recipeFactory.setID(ID);
$scope.recipeFactory.getRecipeFactory(ID).then(function(response){
$scope.recipeInfo = $scope.recipeFactory.recipeSteps();
$scope.steps = $scope.recipeInfo.analyzedInstructions[0].steps
console.log($scope.recipeInfo);
console.log($scope.steps[0]);
console.log($scope.steps[1].step);
});

//code for the search bar
  $scope.sendRequest = function(recipeSearchField) {

    //captures the search criterai
    var search = $scope.recipeSearchField;

    //sets the search criteria in factory; initalize request and return nresults
    $scope.recipeFactory.setSearch(search);
    $scope.recipeFactory.sendRequest(recipeSearchField).then(function(response){
    $scope.recipeList = $scope.recipeFactory.returnRequest();

    //opens the response below the fold
    console.log($scope.recipeList);
    });


  };

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

//define both lists of cues
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

}

//listening event
recognition.onresult = function(event) {
  console.log('testing');

  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;

   commands.forEach(function(v, i, a){
    // command.
    // //s/  +/ /g;
    if(command.toLowerCase() == v.toLowerCase()){
      responsiveVoice.speak($scope.steps[0].step);
      //recognizing = false;
      //recognition.stop();}
      }else{
      console.log(command);
      
    }
   });

   secondCommands.forEach(function(v, i, a){
    if(command.toLowerCase() == v.toLowerCase()){
      responsiveVoice.speak($scope.steps[1].step);

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
//might not need the code below:
//intialize an empty array to hold ingredients;
// var text = [];
// var paragraph = '';
// var sentence = [];

  //loop through the returned array and pull out the directions;


  // $scope.steps.forEach(
  //   function(step, index){
  //     //push to array;
  //     text.push(step.step);
  //   });
  // //console.log(text.join());
  // paragraph = text.join();
  // sentence = paragraph.split('.')
  // console.log(sentence);



}]);
