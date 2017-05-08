
export interface Team {
    id: number,
    uniqueId: number,
    logopath: string,
    leagueId: number,
    leagueTypeId: number,
    name: string,
    city: string,
    goal: number,
    stadiumName: string,
    stadiumCapacity: number,
    ranking: number,
    stadiumLevel: number,
    previousRanking: number,
    budget: number,

    //custom fields

    transfersIn: number,
    valueIn: number,
    priceIn: number,
    
    transfersOut: number,
    valueOut: number,
    priceOut: number
}



