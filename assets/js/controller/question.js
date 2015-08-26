/**
 * question.js
 *
 * @author      :: Sunil Hirole
 * @description :: question.js is a angular controller through which req are send to sails controller .
 */

angular.module('WinpersonApp').controller('questionsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $scope.submitQuestionForm = function() {
        console.log('----------ques controller---------', $scope.questionForm.question);
        // Submit request to Sails.
        
        var arrayOfObjects = JSON.parse($scope.questionForm.question)
        console.log('---------------------array---------------');
        console.log(arrayOfObjects);
        $http.post('/questions', {
                question: arrayOfObjects,
                jobid : $routeParams.id,
                timeperques: $scope.questionForm.timeperques,
                quespertest: $scope.questionForm.quespertest
            })
            .then(function onSuccess(sailsResponse) {
                window.location = '#/invite';
            })
    }
}]);