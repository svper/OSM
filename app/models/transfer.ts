import { Team, Player } from "./models";
export class Transfer {
    id: number;
    leagueId: number;
    value: number;
    price: number;
    weekNr: number;
    startDay: number;
    timestamp: number;
    date:Date;
    player: Player;
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

        this.date = new Date(0);
        this.date.setUTCSeconds(args.timestamp);

        this.player = args.player;
        this.sourceTeam = args.sourceTeam;
        this.destinationTeam = args.destinationTeam;

        this.calculate();
    }

    calculate = () => {
        this.valuePriceDiff = this.price - this.value;

        if (this.sourceTeam.ranking > 0 && this.destinationTeam.ranking > 0)
            this.premierTransfer = true;
        else
            this.premierTransfer = false;
    }

}