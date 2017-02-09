myApp.controller('resultsController', ['$http', '$scope', '$window', 'RecipeFactory', function($http, $scope, $window, RecipeFactory) {

$scope.recipeFactory = RecipeFactory;

var Url = document.URL;
var ID = Url.split('=').pop();


    $scope.recipeFactory.setID(ID);
    $scope.recipeFactory.getRecipeFactory(ID).then(function(response){
    $scope.recipeInfo = $scope.recipeFactory.recipeSteps();
    console.log($scope.recipeInfo);
    });



    // $scope.steps = $scope.recipeFactory.recipeSteps();
    //   console.log($scope.steps);

//intialize an empty array to hold ingredients;
// var text = [];
// var paragraph = '';
// var sentence = [];


//uses the factory to call the API

//var id = $scope.recipeFactory.setID();
    //$scope.recipeFactory.setID();

  
  //console.log($scope.steps);
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
