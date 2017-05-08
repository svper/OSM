import * as angular from "angular";
import * as jQuery from "jquery";
import * as uibootstrap from "angular-ui-bootstrap";




var $ = require('jquery');
(<any>window).jQuery = $;
(<any>window).$ = $;

//import * as uirouter from "angular-ui-router";
import {TransferCtrl} from "./transfers/transferCtrl";


//import {DataService} from "./app/components/services/DataService";

var uirouter = require("angular-ui-router");
//load in custom scss file
require("../assets/styles/custom.scss");
require("bootstrap/dist/js/bootstrap.js");

require("angular-ui-grid/ui-grid.css");

var app = angular.module("gretel", [uirouter, uibootstrap, "ui.grid", "dndLists"]);

app.controller(TransferCtrl.iid, TransferCtrl);


//app.service(DataService.iid, DataService);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
    $urlRouterProvider.otherwise("/transfers");
    $stateProvider
        .state('transfers', {
            url: '/transfers',
            template: require('./app/transfers/transfer.html'),
            controller: TransferCtrl.iid,
            controllerAs: 'ctrl'
        });
}]);