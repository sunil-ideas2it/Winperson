angular.module('WinpersonApp').controller('AnswerController', ['$scope', '$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {

    $scope.showJob = function() {

            $http.get('/showJob', {

                })
                .then(function onSuccess(sailsResponse) {

                    $scope.jobs = sailsResponse.data.jobObject;

                })
                .catch(function onError(sailsResponse) {

                    if (sailsResponse.status === 400 || 404) {

                        res.status(400).send('Something broke!');
                    }

                })


        },
       
    $scope.showAnswer = function() {

        $http.post('/showAnswer', {
                id: $routeParams.id

            })
            .then(function onSuccess(sailsResponse) {

                $scope.answers = sailsResponse.data.answerObject;

            })
            .catch(function onError(sailsResponse) {

                if (sailsResponse.status === 400 || 404) {

                    res.status(400).send('Something broke!');
                }

            })


    };


}])