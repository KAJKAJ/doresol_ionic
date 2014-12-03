// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('doresolApp', ['ionic', 'firebase', 'env'])

.run(function($ionicPlatform, $location,  $rootScope, $state, Auth, User ,Composite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    var _getUserAuth = function(){
      return Auth.getCurrentUserFromFirebase().then(function(value){
        return value.uid;
      });
    };

    var _getUserData = function(userId){
      return User.getCurrentUserFromFirebase(userId).then(function(value){
        return value.uid;
      });
    };

    // 인증해야 되는 경우
    if (toState.authenticate){
      // 사용자가 계정이 없을 때
      if(!User.getCurrentUser()){
        event.preventDefault();
        _getUserAuth().then(_getUserData).then(Composite.setMyMemorials).then(function(value){
          $state.go(toState, toParams);
        },function(error){
          $state.go('app.search');
        });
      }
    }
  });

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl',
      authenticate: true
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      },
      authenticate: true
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      },
      authenticate: true
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      },
      authenticate: true
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

