/**
 * login.js
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: login.js is a angular controller through which req are send to sails controller .
 */
angular.module('WinpersonApp').controller('loginController', ['$scope','$location','$rootScope', '$http', 'toastr', function($scope, $location,$rootScope,$http, toastr) {

    // set-up loginForm loading state
    $scope.loginForm = {
        loading: false
    }

    $scope.submitLoginForm = function() {

        // Set the loading state (i.e. show loading spinner)
        $scope.loginForm.loading = true;

        // Submit request to Sails.
        $http.put('/login', {
                email: $scope.loginForm.email,
                password: $scope.loginForm.password
            })
            .then(function onSuccess(sailsResponse) {

                // Refresh the page now that we've been logged in.
                if(sailsResponse.data.role==='1'){
                    $rootScope.loggedInUser = $scope.loginForm.email;
                    window.location = '#/job';
                }
                else {
                    window.location = '#/dashboard';
                }
                      
            })
            .catch(function onError(sailsResponse) {

                // Handle known error type(s).
                // Invalid username / password combination.
                if (sailsResponse.status === 400 || 404) {
                    // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
                    //
                    toastr.error('Invalid email/password combination.', 'Error', {
                        closeButton: true
                    });
                    return;
                }

                toastr.error('An unexpected error occurred, please try again.', 'Error', {
                    closeButton: true
                });
                return;

            })
            .finally(function eitherWay() {
                $scope.loginForm.loading = false;
            });
    }

     $scope.signout = function() {
        console.log('-----in sign out----');

       $http.put('/logout', {
            })
            .then(function onSuccess(sailsResponse) {

                // Refresh the page now that we've been logged in.
                    $rootScope.loggedInUser = null;
                    window.location = '/';
                      
            })

   };

}]);