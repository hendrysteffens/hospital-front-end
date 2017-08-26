(function () {
  angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

    .config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('home', {
        url: "/",
        templateUrl: "../templates/home/home.html"
      });

      $urlRouterProvider.otherwise('/');
    }])
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
})();
