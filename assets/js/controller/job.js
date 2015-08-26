/**
 * job.js
 *
 * @author      :: Sunil Hirole
 * @description :: job.js is a angular controller through which req are send to sails controller .
 */

angular.module('WinpersonApp').controller('jobController', ['$scope', '$http','$location',function($scope, $http,$location) {

    // set-up loading state
    $scope.signupForm = {
        loading: false
    }

    $scope.submitJobForm = function() {

        console.log('---------in submit form---------', $scope.jobForm.title);

        // Set the loading state (i.e. show loading spinner)
        $scope.signupForm.loading = true;

        // Submit request to Sails.
        $http.post('/job', {
                title: $scope.jobForm.title,
                description: $scope.jobForm.description,
                experience: $scope.jobForm.experience,
                salary: $scope.jobForm.salary,
                timeperques: $scope.jobForm.timeperques,
                quespertest: $scope.jobForm.quespertest
            })
            .then(function onSuccess(sailsResponse) {
                console.log('------in succe------',sailsResponse.data.id);
                var id= sailsResponse.data.id
                  $location.path('/question/'+id);
            })

    }
}]);