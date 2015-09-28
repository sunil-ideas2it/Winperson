
angular.module('WinpersonApp').controller('AnswerController',
  [
  '$scope',
  '$http',
  '$routeParams',
  '$rootScope',
  'video',
  function($scope, $http, $routeParams, $rootScope, video) {


    $scope.showJob = function() {
    $scope.gridOptions = { data: 'jobs',
     columnDefs:
     [
     {field: 'id', displayName: 'Job Id'},
                  {field: 'title', displayName: 'Title'},
                  {field: 'description',displayName: 'Description'},
                  { displayName: 'Details', cellTemplate:
                  '<div class="grid-action-cell">' +
                  '<a href="#/showApplicant/{{row.getProperty(\'id\')}}">Click Here</a></div>',},
                 ],};

    $http.get('/showJob', {

        })
                .then(function onSuccess(sailsResponse) {
                  console.log(sailsResponse.data.jobObject);
                  $scope.jobs = sailsResponse.data.jobObject;

                })
                .catch(function onError(sailsResponse) {
                  if (sailsResponse.status === 400 || 404) {
                    res.status(400).send('Something broke!');
                  }
                });
  };

    $scope.showAnswer = function() {
    $scope.gridOptions = { data: 'answers',
        columnDefs:
        [
        {field: 'question', displayName: 'Question'},
                     { displayName: 'Video', cellTemplate:
                     '<div class="grid-action-cell">' +
                     '<a ng-click="getVideo(row)" href="">Click Here</a></div>',},
                    ],};

    $http.post('/showAnswer', {
      id: $routeParams.jobid,
      userid: $routeParams.userid,


    })
            .then(function onSuccess(sailsResponse) {
              $scope.answers = sailsResponse.data.answerObject;
            })
            .catch(function onError(sailsResponse) {
              if (sailsResponse.status === 400 || 404) {
                res.status(400).send('Something broke!');
              }
            });
  };

    $scope.showApplicant = function() {
    $scope.gridOptions = { data: 'invites',
         columnDefs:
         [
         {field: 'jobid', displayName: 'Job Id'},
                      {field: 'firstname', displayName: 'Applicant Name'},
                      {field: 'emailid',displayName: 'Email'},
                      {field: 'status',displayName: 'Status'},
                      { displayName: 'Details', cellTemplate:
                      '<div class="grid-action-cell">' +
                      '<a href="#/showanswer/{{row.getProperty(\'jobid\')}}' +
                      '/{{row.getProperty(\'applicantId\')}}">Click Here</a></div>',},
                     ],};

    $http.post('/showApplicant', {
      id: $routeParams.id,
    })
            .then(function onSuccess(sailsResponse) {
              $scope.invites = sailsResponse.data.inviteObject;
            })
            .catch(function onError(sailsResponse) {
              if (sailsResponse.status === 400 || 404) {
                res.status(400).send('Something broke!');
              }
            });
  };

    $scope.getVideo = function(videofile) {
    console.log('-------------Video file-----------', videofile.entity.videoFileName);
    video.addSource('mp4', '/video/' + videofile.entity.videoFileName + '.mp4');
  };
  },
  ]);