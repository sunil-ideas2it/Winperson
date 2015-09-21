angular.module('WinpersonApp').controller('ShowVideoController', ['$scope', 'video', '$routeParams', function($scope, video, $routeParams) {


    var vname = $routeParams.vname;

    console.log('hiii', vname);
    video.addSource('mp4', '/video/' + vname + '.mp4');
    /* Controller... */

}]);