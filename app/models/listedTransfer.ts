import { Player, Team } from "./models";

export class ListedTransfer {
    id: number;
    player: Player;
    team: Team;
    transferType: number;
    price: number;
    transferPrice: number;
    value:number;
    cost:number;
    maxSellPrice: number;
    possibleProfit: number;

    profitPercentage:number;

    constructor(args: any) {
        this.id = parseInt(args.id);
        this.transferType = parseInt(args.type);
        this.price = parseInt(args.price);
        this.transferPrice = parseInt(args.transferPrice);
        this.player = new Player(args.player);
        this.team = new Team(args.team);
        this.value = parseInt(args.value);

        //value is 40% of possible sell price
        this.maxSellPrice = 2.5 * this.value;
        this.cost = this.price - this.value;
        this.possibleProfit = this.maxSellPrice - this.price;
        this.profitPercentage = (this.possibleProfit/this.price) * 100;
    }


}



