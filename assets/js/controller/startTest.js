    angular.module('WinpersonApp').controller('startTestController', ['$scope', '$http', '$timeout', '$routeParams', '$rootScope', '$cookieStore', function($scope, $http, $timeout, $routeParams, $rootScope, $cookieStore) {


    $rootScope.loggedInUser = null;
    var timeperques = 0;
    $scope.value = 0;
    $scope.count = 0;
    $scope.player;
    $scope.questions = null;
    $scope.quespertest=null;
    var i=0;
    $scope.jobId=0;
    function countdown() {
        console.log(timeperques);
        if ($scope.value <= (timeperques * 5)) {
            $scope.value++;
            $scope.timeout = $timeout(countdown, 1000);

        } else {
            $scope.value = 0;
            $scope.count++;
            $scope.video();
        }
    }

    $scope.start = function() {


        countdown();
    };

    $scope.stop = function() {
        $timeout.cancel($scope.timeout);
    };

    
    $scope.video = function() {
       
        if (document.getElementById('myVideo')) {
           
            var videoElem = document.getElementById("myVideo");
            videoElem.parentNode.removeChild(videoElem);
            $scope.player.recorder.destroy();
            
        }                         
            var videostr = '<video id="myVideo" class="video-js vjs-default-skin" ng-init="video()"></video>';
            var myEl = angular.element(document.querySelector('#video'));
            myEl.append(videostr);
            var player = $scope.player = videojs("myVideo", {
                controls: true,
                width: 320,
                height: 240,
                //loop: true,
                plugins: {
                    record: {
                        audio: true,
                        video: true,
                        maxLength: 10
                    }
                }
            });

            // change player background color
            player.el().style.backgroundColor = "#E8E884";

            // error handling
            player.on('deviceError', function() {
                console.log('device error:', player.deviceErrorCode);
            });

            // user clicked the record button and started recording
            player.on('startRecord', function() {
                console.log('started recording!');
            });

            // user completed recording and stream is available
            player.on('finishRecord', function() {
                // the blob object contains the recorded data that
                // can be downloaded by the user, stored on server etc.
                console.log('finished recording: ', player.recordedData);

                var blob = player.recordedData;

                // converts blob to base64
                var blobToBase64 = function(blob, cb) {
                    var reader = new FileReader();
                    reader.onload = function() {
                        var dataUrl = reader.result;
                        var base64 = dataUrl.split(',')[1];
                        cb(base64);
                    };
                    reader.readAsDataURL(blob);
                };
                blobToBase64(blob, function(base64) { // encode
                    if(i<$scope.quespertest){
                        $http.post('/video',{
                            blob:base64,
                            question: $scope.questions[i].question,
                            id: $scope.jobId,
                            userId: $routeParams.id
                            })
                            .success(function(new_recording) {
                                //player.recorder.destroy();
                                console.log("success");
                                i++;
                            })}
                    })
            });        
    }
        
    $scope.findJobId = function() {
        // Submit request to Sails.
        $rootScope.loggedInUser = null;
        $http.post('/startTest', {
                id: $routeParams.id
            })
            .then(function onSuccess(sailsResponse) {

                $scope.questions = sailsResponse.data.questionObject;
                timeperques = ($scope.timeperque = sailsResponse.data.jobObject.timeperques);
                $scope.quespertest = (sailsResponse.data.jobObject.quespertest);
                $scope.jobId = (sailsResponse.data.jobObject.id);
                $scope.limit = timeperques * 5;
            })
            .catch(function onError(sailsResponse) {;
                if (sailsResponse.status === 400 || 404) {
                   res.status(400).send('Something broke!');
                }

            })
    }

}]);