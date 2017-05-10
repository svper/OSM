export class Player {
    id: number;
    fullName: string;
    name: string;
    position: number;
    statAtt: number;
    statDef: number;
    statOvr: number;
    age: number;
    leagueId: number;
    status: any;
    price: number;
    value: number;
    nationality: string;
    goals: number;
    assists: number;
    type: string;

    constructor(args: any) {
        this.id = parseInt(args.id);
        this.position = parseInt(args.position);
        this.statAtt = parseInt(args.statAtt);
        this.statDef = parseInt(args.statDef);
        this.statOvr = parseInt(args.statOvr);
        this.age = parseInt(args.age);
        this.leagueId = parseInt(args.leagueId);
        this.price = parseInt(args.price);
        this.value = parseInt(args.value);
        this.fullName = args.fullName;
        this.name = args.name;
        this.status = args.status;
        this.nationality = args.nationality;

        this.goals = parseInt(args.goals);
        this.assists = parseInt(args.assists);


        switch (this.position) {
            case 1: {
                this.type = "ATT"
                break;
            }
            case 2: {
                this.type = "MID"
                break;
            }
            case 3: {
                this.type = "DEF"
                break;
            }
            case 4: {
                this.type = "GKP"
                break;
            }
            default: {
                this.type = "ATT"
                break;
            }
        }

    }
}



