'use strict';

import { DataService } from "../../services/dataService";
import { Player, Team, Transfer } from "../../models/models";
export class TransferCtrl {
    static iid = "TransferCtrl";
    static $inject = [DataService.iid];
    transfers: any[];
    constructor(public dataSvc: DataService) {
        this.dataSvc.getTransfers().then((transfers: Transfer[]) => {
            this.transfers = transfers;
        }, () => { 
            alert("call failed"); });
    }

}