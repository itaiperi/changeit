mainApp.controller('EventPageController', function($scope) {
  console.log("Hello world i am here!!");

var roleName = ["Painter", "Driver", "Singer", "Engineer", "Dancer", "Chef"];
var roleCounts = ["70%", "20%", "40%", "90%", "10%", "2%"];
var roleDescription = ["Volunteering Omer Elderly", "The Strokes Franz Ferdinands","Renovating Julie Park", "Cleaning Itai Beach", "S.O.S. Dor Animals", "Blood Jason Donation"];
var arrRoles=[];
for(var i=0;i<roleName.length;i++)
{
  var name = roleName[i];
  var description = roleDescription[i];
  arrRoles.push({
      name:name,
      description:description,
      loadCount: roleCounts[i]
  });
}
$scope.rolesData = arrRoles;

Morris.Donut({
        element: 'donut-example',
        // fill: #009688,
        data: [
          {label: "Painters", value: 70},
          {label: "Drivers", value: 20},
          {label: "Singers", value: 40}
        ]
      });

});