angular.module('WinpersonApp').controller('startTestController', ['$scope', '$http', '$timeout', '$routeParams', '$rootScope', '$cookieStore', function($scope, $http, $timeout, $routeParams, $rootScope, $cookieStore) {




    $rootScope.loggedInUser = null;
    var timeperques = 0;
    $scope.value = 0;
    $scope.count = 0;


    function countdown() {
        console.log(timeperques);
        if ($scope.value <= (timeperques * 10)) {
            $scope.value++;
            $scope.timeout = $timeout(countdown, 1000);

        } else {
            $scope.value = 0;
            $scope.count++;
        }
        //$timeout.cancel($scope.timeout);

    }

    $scope.start = function() {
       
        countdown();

         
    };

    $scope.stop = function() {
        $timeout.cancel($scope.timeout);
    };







   /*var player = videojs("myVideo", {
                    controls: true,
                    width: 320,
                    height: 240,
                    plugins: {
                        record: {
                            audio: true,
                            video: true,
                            maxLength: 40
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
                            console.log('------------base64----------', base64);
                            var update = {
                                'blob': base64
                            };
                            $http.post('/video', update)
                                .success(function(new_recording) {
                                    console.log("success");
                                })
                        })
                        //blobToBase64(player.recordedData,null);

                });*/








$scope.video  = function(){
    console.log('------------video fun----------');
  var player = videojs("myVideo", {
                    controls: true,
                    width: 320,
                    height: 240,
                    //loop: true,
                    plugins: {
                        record: {
                            audio: true,
                            video: true,
                            maxLength: 30
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
                            console.log('------------base64----------', base64);
                            var update = {
                                'blob': base64
                            };
                            $http.post('/video', update)
                                .success(function(new_recording) {
                                    player.recorder.destroy();
                                    console.log("success");
                                })
                        })
                        //blobToBase64(player.recordedData,null);

                });

}

    $scope.findJobId = function() {
        // Submit request to Sails.
        $rootScope.loggedInUser = null;
        $http.post('/startTest', {
                id: $routeParams.id
                    // console.log(eid);
            })
            .then(function onSuccess(sailsResponse) {

                $scope.questions = sailsResponse.data.questionObject;
                timeperques = ($scope.timeperque = sailsResponse.data.jobObject.timeperques);
                $scope.quespertest = (sailsResponse.data.jobObject.quespertest);
                console.log('hiiiiiiiiiiiiiiiii', $scope.quespertest);
                $scope.limit = timeperques * 10;




                




            })
            .catch(function onError(sailsResponse) {
                console.log('----------sails error-------');

                if (sailsResponse.status === 400 || 404) {

                    res.status(400).send('Something broke!');
                }

            })
    }

}]);