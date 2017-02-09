myApp.factory('RecipeFactory', ['$http', function($http) {

var recipeResult = [];
//var recipeId = '';
var setSearch = '';


var request = function() {
    //var tagString = $scope.recipeSearchField;
    //console.log(tagString);
    //formatTagsForApiCall(tagString);

    var request = {
     method: 'GET',
     url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=20&tags=' + setSearch,
     headers: {
       'Content-Type': 'application/json',
       'X-Mashape-Key': 'SQ10bf0CXymshkdJgwkErfFdYGT4p14N1aUjsnHZ8npfsZOeJD'
     }
   };
   var promise = $http(request).then(
      function(response) {
        console.log('req:',request);
        console.log('resp',response);
        returnResults = response.data.recipes;
      });
   
    // $http(request).then(successCallback, errorCallback);
    return promise;
  };


var findRecipe = function() {

    //var recipeId = id;
    //console.log(recipeId);

    var request = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + recipeId + '/analyzedInstructions',
      headers: {
        'Content-Type': 'application/json',
        'X-Mashape-Key': 'SQ10bf0CXymshkdJgwkErfFdYGT4p14N1aUjsnHZ8npfsZOeJD'
      }
    };  
    var promise = $http(request).then(
        function(response) {
            console.log('req:',request);
            console.log('resp:',response);  
            recipeResult = response.data;
            //console.log(recipeResult);
        });

  return promise;
  };



return {
  getRecipeFactory: function(){
    return findRecipe();
  },

  recipeSteps: function(){
    return recipeResult;
  },

  setID: function(id) {
    recipeId = id;
  },


  setSearch: function(search) {
    setSearch = search;
  },

  sendRequest: function(){
    return request();
  },

  returnRequest: function(){
    return returnResults; 
  }
}

 }]); 