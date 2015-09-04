mainApp.controller('EventsController', function($scope) {
console.log("Hello world i am in EventsController!!!!!!!!!");

var eventName = ["Elderly", "Renovating a Park", "Cleaning the Beach", "S.O.S. Animals", "Blood Donation", "Blood Diamond"];
var eventLink = ["event", "eventPage", "eventForm", "#", "#", "#"];
var eventsimgs = ["omer.jpg","africanimpact.jpg","workers.jpg","playground.jpg","cow.jpg","beachClean.jpg","fixingHouses.jpg"];
var eventDescription = ["Volunteering Omer Elderly", "The Strokes Franz Ferdinands","Renovating Julie Park", "Cleaning Itai Beach", "S.O.S. Dor Animals", "Blood Jason Donation"];
var arrEvents=[];
for(var i=0;i<eventName.length;i++)
{
  var name = eventName[i];
  var link = eventLink[i];
  var description = eventDescription[i];
  var img = eventsimgs[i];
  arrEvents.push({
      name:name,
      link:link,
      description:description,
      image:img
  });
}


$scope.eventsData = arrEvents;
console.log("######");
console.log(arrEvents.length);
console.log(arrEvents);

});