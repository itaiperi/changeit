mainApp.controller('EventFormController', function($scope) {
  console.log("EventForm time!!!");

  var flag=0;
  if(flag==0)
  {
  	$('#modal-Organizer-Details').openModal();
  }
  else $('#modal-Organizer-Details').closeModal();

 //  var currentTime = new Date();
	// $scope.currentTime = currentTime;
	// $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	// $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	// $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	// $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	// $scope.today = 'Today';
	// $scope.clear = 'Clear';
	// $scope.close = 'Close';
	// $scope.onStart = function () {
	//     console.log('onStart');
	// };
	// $scope.onRender = function () {
	//     console.log('onRender');
	// };
	// $scope.onOpen = function () {
	//     console.log('onOpen');
	// };
	// $scope.onClose = function () {
	//     console.log('onClose');
	// };
	// $scope.onSet = function () {
	//     console.log('onSet');
	// };
	// $scope.onStop = function () {
	//     console.log('onStop');
	// };

});