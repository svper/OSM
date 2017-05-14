'use strict';

import { DataService } from "../../services/dataService";
export class ProcessCtrl {
    static iid = "ProcessCtrl";
    static $inject = [DataService.iid];
    jsonText:string;
    constructor(public dataSvc: DataService) {
       /* this.dataSvc.getTeams().then((teams: Team[]) => {
           for(let t of teams){
                    this.teams.push(new Team(t));
            }
        }, () => { 
            alert("call failed"); });*/
    }

    getJsonFromText =() =>{
        console.log(JSON.parse(this.jsonText));
    }

    process = () => {
        this.dataSvc.processData(JSON.parse(this.jsonText));
    }

}