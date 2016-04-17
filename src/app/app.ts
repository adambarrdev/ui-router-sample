
module app {
    'use strict';

    export interface IBaseController {
        title: string;
        headerIcon: string;
    }

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    function appConfig($stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $locationProvider: angular.ILocationProvider) {

        $stateProvider
            .state("home", {
                url: "/",
                controller: "HomeController",
                controllerAs: "vm",
                templateUrl: "app/home/home.html"
            })
            .state("about", {
                abstract: true,
                url: "/about",
                controller: "AboutController",
                controllerAs: "vm",
                templateUrl: "app/about/about.html",
            })
            .state("about.index", {
                url: "",
                template: '<h3>Index state</h3>'
            })
            .state("about.contact", {
                url: "/contact",
                template: '<h3>Contact state</h3>'
            });

        $urlRouterProvider.otherwise("/");

        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});

    }

    appRunner.$inject = ['$rootScope', '$state', '$stateParams'];
    function appRunner($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            // console.log("stateChangeStart");
            // console.log("from state", fromState);
            // console.log("to state", toState);
            //if (toState.authenticate && !AuthService.isLoggedIn()) {
            // User isn’t authenticated
            //     $state.transitionTo("public.home");
            //     event.preventDefault();
            //}
        });

    }

    angular
        .module('app', [
            'ui.router',
            'ui.bootstrap'
        ])
        .config(appConfig)
        .run(appRunner);
}