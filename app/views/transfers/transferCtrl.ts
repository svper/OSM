'use strict';

import { DataService } from "../../services/dataService";
import { Player, Team, Transfer } from "../../models/models";
export class TransferCtrl {
    static iid = "TransferCtrl";
    static $inject = [DataService.iid];
    transfers: any[] = [];
    sortProperty: string = "-date";
    filter: any;
    constructor(public dataSvc: DataService) {
        this.dataSvc.getTransfers().then((transfers: Transfer[]) => {
            for (let t of transfers) {
                this.transfers.push(new Transfer(t));
            }
            //this.transfers = transfers;
        }, () => {
            alert("call failed");
        });
    }

    filterPremier = () => {
        this.transfers = this.transfers.filter((transfer:Transfer)=>{return transfer.premierTransfer});
    }

}