/**
 * Invite.js
 *
 * @author      :: Sunil Hirole
 * @description :: invite.js is a angular controller through which req are send to sails controller .
 */
angular.module('WinpersonApp').directive('fileModel', ['$parse', function($parse) {
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
        }
    };
}])

.service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        console.log('---------file---------', file);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function(data) {
                console.log('upload data', data);
                if (data.result) {

                    alert('file uploaded. See .tmp/uploads folder.');
                    window.location = '#/sendmails';
                }
            })
            .error(function(err) {
                alert('there was an error uploading the file.');
                console.log(err);
            });
    }
}])

.controller('invitesController', ['$scope', '$http', 'fileUpload', function($scope, $http, fileUpload) {

    $scope.uploadFile = function() {
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);
        var uploadUrl = "/invites";
        fileUpload.uploadFileToUrl(file, uploadUrl);

    }

    $scope.sendEmailto = function() {

        // Set the loading state (i.e. show loading spinner)
        $scope.emailForm.loading = true;
        console.log('------Client invite ctrl', $scope.emailForm.email);
        // Submit request to Sails.
        $http.post('/sendmails', {
                email: $scope.emailForm.email
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
            })
    };

}]);