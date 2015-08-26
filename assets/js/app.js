var winperson = angular.module('WinpersonApp', ['ngRoute','toastr','compareTo']);
winperson.config(function ($routeProvider) {
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
    });

})