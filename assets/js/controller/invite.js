/**
 * Invite.js
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: invite.js is a angular controller through which req are send to sails controller .
 */
angular.module('WinpersonApp').directive('fileModel',
    [
    '$parse',
    function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    },
  };
},
])

.service('fileUpload',
    [
    '$http',
    '$routeParams',
    function($http, $routeParams) {
  this.uploadFileToUrl = function(file, uploadUrl) {
    var fd = new FormData();
    fd.append('file', file);
    fd.append('jobidd', $routeParams.jobidd);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
      },
    })
            .success(function(data) {
              console.log('upload data', data);
              if (data.result) {

                alert('file uploaded. See .tmp/uploads folder.');
                window.location = '#/job';
              }
            })
            .error(function(err) {
              alert('there was an error uploading the file.');
              console.log(err);
            });
  };
},
])

.controller('invitesController',
    [
    '$scope',
    '$http',
    'fileUpload',
     function($scope, $http, fileUpload) {

       $scope.uploadFile = function() {
    var file = $scope.csvFile;
    if (($scope.csvFile.name.substring($scope.csvFile.name.lastIndexOf('.') + 1) != 'csv')) {
      $scope.errorMsg = 'please upload valid csv file';
      if ($scope.errorMsg) {
        alert($scope.errorMsg);
        return ;
      }
    }
    console.log('file is ');
    console.dir(file);
    var uploadUrl = '/invites';
    fileUpload.uploadFileToUrl(file, uploadUrl);

  };

       $scope.sendEmailto = function() {

         // Set the loading state (i.e. show loading spinner)
         $scope.emailForm.loading = true;
         // Submit request to Sails.
         $http.post('/sendmails', {
      email: $scope.emailForm.email,
    })
            .then(function onSuccess(sailsResponse) {
              window.location = '#/job';
            })
            .catch(function onError(sailsResponse) {

              // Handle known error type(s).
              // If using sails-disk adpater -- Handle Duplicate Key
              var emailAddressAlreadyInUse = sailsResponse.status == 409;

              if (emailAddressAlreadyInUse) {
                toastr.error('That email address has already been taken, please try again.', 'Error');
                return;
              }

            })
            .finally(function eitherWay() {
              $scope.emailForm.loading = false;
            });
       };

     },
     ]);