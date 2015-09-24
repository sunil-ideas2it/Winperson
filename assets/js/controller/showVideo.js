angular.module('WinpersonApp').controller('ShowVideoController',
	[
	'$scope',
	'$http',
	'video',
	'$routeParams',
	function($scope, $http, video, $routeParams) {

  var vname = $routeParams.vname;
  video.addSource('mp4', '/video/' + vname + '.mp4');
  $http.post('/getUserDetail', {
    videoFileName: $routeParams.vname,
  })
    .then(function onSuccess(sailsResponse) {
      $scope.applicant = sailsResponse.data[0];
    });
},
]);