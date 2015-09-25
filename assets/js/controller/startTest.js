    /**
 * StartTest.js
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: startTest.js is a angular controller through which req are send to sails controller .
 */
    angular.module('WinpersonApp').controller('startTestController',
        [
        '$scope',
        '$http',
        '$timeout',
        '$routeParams',
        '$rootScope',
        '$cookieStore',
        function($scope, $http, $timeout, $routeParams, $rootScope, $cookieStore) {


          $rootScope.loggedInUser = null;
          var timeperques = 0;
          $scope.value = 0;
          $scope.count = 0;
          $scope.questions = null;
          $scope.quespertest = null;
          $scope.base64data = null;
          var i = 0;
          $scope.jobId = 0;
          $scope.flag = 0;
          $scope.player = {};
          function countdown() {
        if (($scope.value < (timeperques * 5)) && ($scope.flag == 1)) {
          $scope.value++;
          $scope.timeout = $timeout(countdown, 1000);
        }
        else {
          $scope.value = 0;
          $scope.count++;
          $scope.player.recorder.destroy();
          $scope.video();
        }
      }

          $scope.next = function() {
        $scope.flag = 0;
        $scope.value = 0;
        $scope.video();

      };

          $scope.video = function() {

            if (document.getElementById('myVideo')) {

              var videoElem = document.getElementById('myVideo');

              videoElem.parentNode.removeChild(videoElem);
              $scope.player.recorder.destroy();

            }


            var videostr = '<video id="myVideo" class="video-js vjs-default-skin" ng-init="video()"></video>';
            var myEl = angular.element(document.querySelector('#video'));
            myEl.append(videostr);
            var player = $scope.player = videojs('myVideo', {
          controls: true,
          width: 320,
          height: 240,
          //Loop: true,
          plugins: {
            record: {
              audio: true,
              video: true,
              maxLength: 10,
            },
          },
        });

            // Change player background color
            player.el().style.backgroundColor = '#E8E884';

            // Error handling
            player.on('deviceError', function() {
          console.log('device error:', player.deviceErrorCode);
        });

            // User clicked the record button and started recording
            player.on('startRecord', function() {
          $scope.flag = 1;
          countdown();
          console.log('started recording!');
        });

            // User completed recording and stream is available
            player.on('finishRecord', function() {
          // The blob object contains the recorded data that
          // Can be downloaded by the user, stored on server etc.
          console.log('finished recording: ', player.recordedData);

          var blob = player.recordedData;
          var reader = new window.FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function() {
            var base64data = reader.result;
            var base64 = base64data.split(',')[1];

            if (i < $scope.quespertest) {
              $http.post('/video', {
                        blob: base64,
                        question: $scope.questions[i].question,
                        id: $scope.jobId,
                        userId: $routeParams.id,
                      }).success(function(new_recording) {
                        //Player.recorder.destroy();
                        console.log('success');
                        i++;
                      });
            }
          };
        });

          };

          $scope.findJobId = function() {
        // Submit request to Sails.
        $rootScope.loggedInUser = null;
        $http.post('/startTest', {
          id: $routeParams.id,
        })
            .then(function onSuccess(sailsResponse) {

              $scope.questions = sailsResponse.data.questionObject;
              timeperques = ($scope.timeperque = sailsResponse.data.jobObject.timeperques);
              $scope.quespertest = (sailsResponse.data.jobObject.quespertest);

              $scope.jobId = (sailsResponse.data.jobObject.id);
              $scope.limit = timeperques * 5;
            })
            .catch(function onError(sailsResponse) {
              if (sailsResponse.status === 400 || 404) {
                res.status(400).send('Something broke!');
              }

            });
      };

        },
        ]);