myApp.controller('searchController', ['$http', '$scope', '$window', 'RecipeFactory', function($http, $scope, $window, RecipeFactory) {
  $scope.responseReceived = false;
  $scope.recipeList = [];
  $scope.recipeSearchField = '';
  $scope.hideShowTutorial = false;

  $scope.recipeFactory = RecipeFactory;

  $scope.sendRequest = function(recipeSearchField) {
    var search = $scope.recipeSearchField;
    $scope.recipeFactory.setSearch(search);
    $scope.recipeFactory.sendRequest(recipeSearchField).then(function(response){
    $scope.recipeList = $scope.recipeFactory.returnRequest();
    $scope.responseReceived = true;
    console.log($scope.recipeList);
    });

    $scope.hideShowTutorial = false;

  };

  $scope.getRecipe = function(recipeId){
    var id = recipeId;

    console.log(id);
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


}]);
