
import {Player,Team,Transfer} from "../models/models";
export class DataService {
        static $inject = ["$http"];
        static iid = "DataService";
        constructor(private $http: ng.IHttpService) { 
        } 
        
                 
        public getTransfers = () : ng.IPromise<Transfer[]> => {
               return this.$http<Transfer[]>({
                url: `./api.php?q=transfers`, 
                method: "get"
                           
              }).then(result => result.data);
        }; 

        public getTeams = () : ng.IPromise<Team[]> => {
               return this.$http<Team[]>({
                url: `./api.php?q=teams`, 
                method: "get"
                           
              }).then(result => result.data);
        }; 


         
    }