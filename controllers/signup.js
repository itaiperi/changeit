mainApp.controller('SignUpController', function($scope) {
  console.log("SignUp time!!!");

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