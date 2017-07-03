'use strict';

import { DataService } from "../../services/dataService";
export class ProcessCtrl {
    static iid = "ProcessCtrl";
    static $inject = [DataService.iid];
    jsonText:string;
    constructor(public dataSvc: DataService) {
    }

    getJsonFromText =() =>{
        console.log(JSON.parse(this.jsonText));
    }

    processDone = () => {
        this.dataSvc.processDone(JSON.parse(this.jsonText));
    }

     processList = () => {
        this.dataSvc.processList(JSON.parse(this.jsonText));
    }

     addList = () => {
        this.dataSvc.addList(JSON.parse(this.jsonText));
    }

}