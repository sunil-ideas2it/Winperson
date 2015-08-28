/**
 * job.js
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: job.js is a angular controller through which req are send to sails controller .
 */
angular.module('WinpersonApp').controller('jobController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    // set-up loading state
    $scope.signupForm = {
        loading: false
    }

    $scope.submitJobForm = function() {

        // Set the loading state (i.e. show loading spinner)
        $scope.signupForm.loading = true;

        // Submit request to Sails.
        $http.post('/job', {
                title: $scope.jobForm.title,
                description: $scope.jobForm.description,
                experience: $scope.jobForm.experience,
                salary: $scope.jobForm.salary
            })
            .then(function onSuccess(sailsResponse) {
                var id = sailsResponse.data.id
                $location.path('/question/' + id);
            })

    }
}]);