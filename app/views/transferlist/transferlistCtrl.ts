'use strict';

import { DataService } from "../../services/dataService";
import { Player, Team, Transfer,ListedTransfer } from "../../models/models";
export class TransferListCtrl {
    static iid = "TransferListCtrl";
    static $inject = [DataService.iid];
    listedTransfers: any[] = [];
    sortProperty: string = "-date";
    filter: any;
    constructor(public dataSvc: DataService) {
        this.dataSvc.getTransferList().then((transfers: Transfer[]) => {
            for (let t of transfers) {
                this.listedTransfers.push(new ListedTransfer(t));
            }
        }, () => {
            alert("call failed");
        });
    }

}