import * as angular from "angular";
import * as jQuery from "jquery";
import * as uibootstrap from "angular-ui-bootstrap";

var $ = require('jquery');
(<any>window).jQuery = $;
(<any>window).$ = $;

//import * as uirouter from "angular-ui-router";
import {TransferCtrl} from "./views/transfers/transferCtrl";


import {DataService} from "./services/dataService";

var uirouter = require("angular-ui-router");
//load in custom scss file
require("../assets/styles/custom.scss");
require("bootstrap/dist/js/bootstrap.js");
require("bootstrap/dist/css/bootstrap.css");
var app = angular.module("osm", [uirouter, uibootstrap]);

app.controller(TransferCtrl.iid, TransferCtrl);


app.service(DataService.iid, DataService);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider: any, $urlRouterProvider: any) {
    $urlRouterProvider.otherwise("/transfers");
    $stateProvider
        .state('transfers', {
            url: '/transfers',
            template: require('./views/transfers/transfer.html'),
            controller: TransferCtrl.iid,
            controllerAs: 'ctrl'
        });
}]);