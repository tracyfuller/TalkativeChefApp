myApp.controller('searchController', ['$http', '$scope', '$window', 'RecipeFactory', function($http, $scope, $window, RecipeFactory) {
  
  //console.log('search controller');

  $scope.responseReceived = false;
  $scope.recipeList = [];
  $scope.recipeSearchField = '';
  $scope.hideShowTutorial = false;

  //hookup to factory
  $scope.recipeFactory = RecipeFactory;

  //initial request to find recipes
  $scope.sendRequest = function(recipeSearchField) {

    //captures the search criterai
    var search = $scope.recipeSearchField;

    //sets the search criteria in factory; initalize request and return nresults
    $scope.recipeFactory.setSearch(search);
    animation();
    $scope.recipeFactory.sendRequest(recipeSearchField).then(function(response){
    $scope.recipeList = $scope.recipeFactory.returnRequest();
    
    //opens the response below the fold
    $scope.responseReceived = true;
    $scope.recipeSearchField = '';
    //console.log($scope.recipeList);
    });

    //hides instruction window its open
    $scope.hideShowTutorial = false;

  };

  //sets the recipie id and initializes the function in the factory; goes to results page; this isn't working...
  $scope.getRecipe = function(recipeId){
    var id = recipeId;

    //console.log(id);
    $scope.recipeFactory.setID(id);
    $scope.recipeFactory.getRecipeFactory().then(function(repsonse){
    $window.location.href = '/public/views/recipe.html?id='+id

});

  }

  $scope.toggleTutorial = function(){
    if ($scope.hideShowTutorial == false){
      $scope.hideShowTutorial = true;
    } else {
      $scope.hideShowTutorial = false;
    }
    //console.log($scope.hideShowTutorial);
  }

  var animation = function () {
      var elem = document.getElementById("myBar");
      var width = 1;
      var id = setInterval(frame, 30);

      function frame() {
          if (width >= 100) {
              clearInterval(id);
          } else {
              width++;
              elem.style.width = width + '%';
          }
      }
  }

}]);
