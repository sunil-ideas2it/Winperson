/**
 * login.js
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: login.js is a angular controller through which req are send to sails controller .
 */
angular.module('WinpersonApp').controller('loginController', ['$scope','$location','$rootScope', '$http', 'toastr','$cookieStore', function($scope, $location,$rootScope,$http, toastr,$cookieStore) {

    // set-up loginForm loading state
    $scope.loginForm = {
        loading: false
    }
   $rootScope.loggedInUser = $cookieStore.get('user') || null; 
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
                 $rootScope.loggedInUser = sailsResponse.data ;
                $cookieStore.put('user',$rootScope.loggedInUser);
               
                if(sailsResponse.data.role==='1'){
                    
                    window.location = '#/job';
                }
                else {

                     id =sailsResponse.data.id;
                    window.location = '#/startTest/'+id;
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

       $http.put('/logout', {
            })
            .then(function onSuccess(sailsResponse) {

                // Refresh the page now that we've been logged in.
                    $rootScope.loggedInUser = null;
                    $cookieStore.remove('user');                              
            })

   };

}]);