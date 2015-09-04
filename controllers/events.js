mainApp.controller('EventsController', function($scope, $http) {
console.log("Hello world i am in EventsController!!!!!!!!!");

// var eventName = ["Elderly", "Renovating a Park", "Cleaning the Beach", "S.O.S. Animals", "Blood Donation", "Blood Diamond"];
// var eventLink = ["event", "eventPage", "eventForm", "#", "#", "#"];
// var eventsimgs = ["omer.jpg","africanimpact.jpg","workers.jpg","playground.jpg","cow.jpg","beachClean.jpg","fixingHouses.jpg"];
// var eventDescription = ["Volunteering Omer Elderly", "The Strokes Franz Ferdinands","Renovating Julie Park", "Cleaning Itai Beach", "S.O.S. Dor Animals", "Blood Jason Donation"];
// var arrEvents=[];
// for(var i=0;i<eventName.length;i++)
// {
//   var name = eventName[i];
//   var link = eventLink[i];
//   var description = eventDescription[i];
//   var img = eventsimgs[i];
//   arrEvents.push({
//       name:name,
//       link:link,
//       description:description,
//       image:img
//   });
// }


// $scope.eventsData = arrEvents;
// console.log("######");
// console.log(arrEvents.length);
// console.log(arrEvents);

$http.get("api/events/getAllEvents/")
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
      $scope.eventsData = arrEvents;
    }
    });
      console.log($scope.eventsData);
});