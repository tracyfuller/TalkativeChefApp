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
console.log($scope.recipeInfo);
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
