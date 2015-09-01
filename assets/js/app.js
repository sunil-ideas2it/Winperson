/**
 * app.js
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: app.js is a angular routing for frontend.
 */
var winperson = angular.module('WinpersonApp', ['ngRoute','toastr','compareTo']);
winperson.config(function ($routeProvider,$locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'signupController'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html'
    })
     .when('/job', {
      templateUrl: 'views/job.html',	
      controller: 'jobController'
    })
      .when('/question/:id', {
      templateUrl: 'views/question.html',
      controller: 'questionsController'
    })
      .when('/invite', {
      templateUrl: 'views/invite.html',
      controller: 'invitesController'
    })
      .when('/sendmails', {
      templateUrl: 'views/sendmail.html',
      controller: 'invitesController'
    })
      .when('/test/:token', {
      templateUrl: 'views/test.html',
      controller: 'testController'
    })
      .when('/applicantsignup/:token', {
      templateUrl: 'views/applicantsignup.html',
      controller: 'testController'
    })
      .when('/logout', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    });
}).run(function($rootScope, $location) {

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($rootScope.loggedInUser == null) {
        // no logged user, redirect to /login
        if ( next.templateUrl === "views/login.html") {
        } else {
          $location.path("/");
        }
      }
    });
  });