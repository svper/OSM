
export class Team {
    id: number;
    uniqueId: number;
    logopath: string;
    leagueId: number;
    leagueTypeId: number;
    name: string;
    city: string;
    goal: number;
    stadiumName: string;
    stadiumCapacity: number;
    ranking: number;
    stadiumLevel: number;
    previousRanking: number;
    budget: number;

    //custom fields

    transfersIn: number;
    valueIn: number;
    priceIn: number;

    transfersOut: number;
    valueOut: number;
    priceOut: number;

    transfersNet: number;
    valueNet: number;
    priceNet: number;


    constructor(args: any) {
        this.id = parseInt(args.id);
        this.uniqueId = parseInt(args.uniqueId);
        this.logopath = args.logopath;
        this.leagueId = parseInt(args.leagueId);
        this.leagueTypeId = parseInt(args.leagueTypeId);
        this.name = args.name;
        this.city = args.city;
        this.goal = parseInt(args.goal);
        this.stadiumName = args.stadiumName
        this.stadiumCapacity = parseInt(args.stadiumCapacity);
        this.stadiumLevel = parseInt(args.stadiumLevel);
        this.previousRanking = parseInt(args.previousRanking);
        this.budget = parseInt(args.budget);
        this.ranking = parseInt(args.ranking);


        this.transfersIn = parseInt(args.transfersIn);
        this.valueIn = parseInt(args.valueIn);
        this.priceIn = parseInt(args.priceIn);

        this.transfersOut = parseInt(args.transfersOut);
        this.valueOut = parseInt(args.valueOut);
        this.priceOut = parseInt(args.priceOut);

        this.transfersNet = this.transfersIn - this.transfersOut;
        this.valueNet = this.valueOut - this.valueIn;
        this.priceNet = this.priceOut - this.priceIn;
    }
}



