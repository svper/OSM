
import { Player, Team, Transfer } from "../models/models";
export class DataService {
  static $inject = ["$http"];
  static iid = "DataService";
  constructor(private $http: ng.IHttpService) {
  }


  public getTransfers = (): ng.IPromise<Transfer[]> => {
    return this.$http<Transfer[]>({
      url: `./api.php?q=transfers`,
      method: "get"

    }).then(result => result.data);
  };

   public getTransferList = (): ng.IPromise<Transfer[]> => {
    return this.$http<Transfer[]>({
      url: `./api.php?q=transferlist`,
      method: "get"

    }).then(result => result.data);
  };

  public getTeams = (): ng.IPromise<Team[]> => {
    return this.$http<Team[]>({
      url: `./api.php?q=teams`,
      method: "get"

    }).then(result => result.data);
  };

  public processDone = (transfers) => {
    var data = $.param({
      json: JSON.stringify(transfers)

    });
    this.$http.post(`./api.php?q=processFile`, transfers).success((response, status) => {
      alert(response);
    })
  }

  public processList= (transfers) => {
    var data = $.param({
      json: JSON.stringify(transfers)

    });
    this.$http.post(`./api.php?q=processTransferList`, transfers).success((response, status) => {
      alert(response);
    })
  }

  public addList= (transfers) => {
    var data = $.param({
      json: JSON.stringify(transfers)

    });
    this.$http.post(`./api.php?q=addTransferList`, transfers).success((response, status) => {
      alert(response);
    })
  }



}