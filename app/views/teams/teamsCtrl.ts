'use strict';

import { DataService } from "../../services/dataService";
import { Player, Team, Transfer } from "../../models/models";
export class TeamsCtrl {
    static iid = "TeamsCtrl";
    static $inject = [DataService.iid];
    teams: Team[] = [];
    sortProperty:string = "-id";
    constructor(public dataSvc: DataService) {
        this.dataSvc.getTeams().then((teams: Team[]) => {
           /* for(let t of teams){
                    this.transfers.push(new Team(t));
            }*/
            this.teams = teams;
        }, () => { 
            alert("call failed"); });
    }

}