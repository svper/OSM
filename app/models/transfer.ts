import {Team,Player} from "./models";
export interface Transfer {
    id:number,
    leagueId:number,
    value:number,
    price:number,
    weekNr:number,
    startDay:number,
    timestamp:number,
    player:Player,
    destinationTeam:Team,
    sourceTeam:Team
}