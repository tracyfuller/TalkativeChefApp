myApp.factory('RecipeFactory', ['$http', function($http) {

var recipeResult = [];
var recipeId = '';
var setSearch = '';


var request = function() {

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

    var request = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + recipeId + '/information',
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
        });

  return promise;
  };



return {
  //info once we find the recipe
  getRecipeFactory: function(){
    return findRecipe();
  },

  recipeSteps: function(){
    return recipeResult;
  },

  setID: function(id) {
    recipeId = id;
  },

  //search for recipe
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