import { Team, Player } from "./models";
export class Transfer {
    id: number;
    leagueId: number;
    value: number;
    price: number;
    weekNr: number;
    startDay: number;
    timestamp: number;
    date: Date;
    player: any;
    destinationTeam: Team;
    sourceTeam: Team;

    premierTransfer: boolean;


    //Calculated fields
    valuePriceDiff: number;

    constructor(args: any) {
        this.id = parseInt(args.id);
        this.leagueId = parseInt(args.leagueId);
        this.value = parseInt(args.value);
        this.price = parseInt(args.price);
        this.weekNr = parseInt(args.weekNr);
        this.startDay = parseInt(args.startDay);
        if (args.player)
            this.player = new Player(args.player);
        if (this.sourceTeam)
            this.sourceTeam = new Team(args.sourceTeam);
        if (this.destinationTeam)
            this.destinationTeam = new Team(args.destinationTeam);
        this.date = new Date(0);
        this.date.setUTCSeconds(parseInt(args.timestamp));
        this.valuePriceDiff = this.price - this.value;


        if (this.sourceTeam && this.destinationTeam)
            this.premierTransfer = this.sourceTeam.ranking > 0 && this.destinationTeam.ranking > 0;
    }

}