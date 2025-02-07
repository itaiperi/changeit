'use strict';

var mainApp = angular.module('myApp', ['ngRoute', 'ngFacebook']);

mainApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        })
         .when('/signup', {
            templateUrl: 'signup.html',
            controller: 'SignUpController'
        })
        .when('/event/:id', {
            templateUrl: 'eventPage.html',
            controller: 'EventPageController'
        })
         .when('/events', {
            templateUrl: 'events.html',
            controller: 'EventsController'
        })
          .when('/eventForm', {
            templateUrl: 'eventForm.html',
            controller: 'EventFormController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

console.log("#1");

mainApp.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1733653573532443'); //enter app id ,  get form fb
  $facebookProvider.setPermissions("email,public_profile, user_posts, publish_actions, user_photos, user_events, user_managed_groups");
});

console.log("#2");

//facebook sdk
mainApp.run(function($rootScope){
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
});

console.log("#3");


mainApp.controller('HomeController', function($scope, $facebook, $http){
    $scope.isLoggedIn = false;
    $scope.yolo = 'yolo';
    console.log($scope.yolo);

    $scope.login = function(){
      console.log("getting to logged in function");
      // $facebook is an angular facebook service
      $facebook.login().then(function(){ //this is logging in to fb
        $scope.isLoggedIn = true;
        refresh();
      });
      // FB.login(function(response) {
      //   refresh();
      // }, {scope:'public_profile, email'});
    }

    $scope.logout = function(){
    $facebook.logout().then(function(){
      $scope.isLoggedIn = false;
      refresh();
    });
  }

$http.get("api/events/getFeaturedEvents/")
.success(function(response){
    var arrEvents=[];
    for(var i=0;i<response.length;i++)
    {
      var name = response[i].name;
      var id = response[i]._id;
      var description = response[i].description;
      var img = response[i].image;
      arrEvents.push({
          name:name,
          id:id,
          description:description,
          image:img
      });
    }
    $scope.eventsData = arrEvents;

});

  function refresh(){
      $facebook.api("/me" , { fields: 'last_name,first_name,email,name' }).then(function(response){
        $scope.welcomeMsg = "Welcome "+ response.name;
        alert($scope.welcomeMsg);
        $scope.isLoggedIn = true;
        $scope.userInfo = response;
        $facebook.api('/me/picture').then(function(response){
          $scope.picture = response.data.url;
        });
    });
  }

});

console.log("#4");

