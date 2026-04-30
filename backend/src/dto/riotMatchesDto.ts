export type RiotMatchesRequest = {
    puuid: string,
    region?: string,
    numberOfMatches: number
}

export type RiotMatchesResponse = Array<string>

export type RiotMatchDataRequest = {
    matchId: string,
    region?: string
}
export type RiotMatchDataResponse = {
    info:{
        gameDuration: number,
        gameEndTimestamp: string,
        gameMode: string,
        gameType: string,
        participants: Participants[],
    }
}
export type Participants = {
    puuid: string,
    championName: string,
    lane: string,
    teamPosition: string,
    summoner1Id: number,
    summoner2Id: number,
    totalMinionsKilled: number,
    totalDamageDealtToChampions: number,
    wardsPlaced: number,
    goldEarned: number,
    item0: number,
    item1: number,
    item2: number,
    item3: number,
    item4: number,
    item5: number,
    item6: number,
    riotIdGameName: string,
    riotIdTagline: string,
    win: boolean
}
