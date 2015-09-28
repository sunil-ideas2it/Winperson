/**
 * app.js
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: app.js is a angular routing for frontend.
 */
var winperson = angular.module('WinpersonApp',
  [
  'ngRoute',
  'toastr',
  'compareTo',
  'ngCookies',
  'ngVideo',
  'ngGrid',
  ]);
winperson.config(function ($routeProvider, $locationProvider) {
  //var token = $routeParams.id;
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginController',
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'signupController',
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
    })
     .when('/job/:id', {
      templateUrl: 'views/job.html',
      controller: 'jobController',
    })
     .when('/job', {
      templateUrl: 'views/job.html',
      controller: 'jobController',
    })
      .when('/question/:id', {
      templateUrl: 'views/question.html',
      controller: 'questionsController',
    })
      .when('/invite/:jobidd', {
      templateUrl: 'views/invite.html',
      controller: 'invitesController',
    })
      .when('/startTest/:id', {
      templateUrl: 'views/startTest.html',
      controller: 'startTestController',
    })
      .when('/sendmails', {
      templateUrl: 'views/sendmail.html',
      controller: 'invitesController',
    })
      .when('/test/:token', {
      templateUrl: 'views/test.html',
      controller: 'testController',

    })
      .when('/applicantsignup/:token', {
      templateUrl: 'views/applicantsignup.html',
      controller: 'testController',
    })
      .when('/showJob', {
      templateUrl: 'views/showjob.html',
      controller: 'AnswerController',
    })
       .when('/showanswer/:jobid/:userid', {
      templateUrl: 'views/showanswer.html',
      controller: 'AnswerController',
    })
       .when('/showApplicant/:id', {
      templateUrl: 'views/showApplicant.html',
      controller: 'AnswerController',
    })
      .when('/logout', {
      templateUrl: 'views/login.html',
      controller: 'loginController',
    });
  //otherwise( { redirectTo: '/' });
}).run(
[
'$location',
'$rootScope',
'$cookieStore',
'$routeParams',
function($location, $rootScope, $cookieStore, $routeParams) {
  $rootScope.loggedInUser = $cookieStore.get('user') || null;
  var token = $location.path().split(/[\s/]+/).pop();
  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    // redirect to login page if not logged in and trying to access a restricted page
    var restrictedPage = $.inArray($location.path(),
  [
  '/signup',
  '/test/' + token,
  '/applicantsignup/' + token,
  ]) === -1;
    if (restrictedPage && $rootScope.loggedInUser === null) {
      $location.path('/');
    }
  });

},
]);