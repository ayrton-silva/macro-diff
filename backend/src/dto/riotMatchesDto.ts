export type RiotMatchesRequest = {
    puuid: string,
    region?: string,
    numberOfMatches: number
}
export type RiotExistentMatchesRequest = {
    puuid: string,
    region?: string,
    numberOfMatches: number,
    skip: number
}

export type RiotMatchesResponse = Array<string>

export type RiotMatchDataRequest = {
    matchId: string,
    region?: string
}
export type RiotMatchDataResponse = {
    info: {
        gameDuration: number,
        gameEndTimestamp: string,
        gameMode: string,
        gameType: string,
        platformId: string,
        queueId: number,
        participants: Participants[],
    }
}
export type Participants = {
    puuid: string,
    championName: string,
    champLevel: number,
    assists: number,
    deaths: number,
    kills: number,
    lane: string,
    teamPosition: string,
    summoner1Id: number,
    summoner2Id: number,
    totalMinionsKilled: number,
    totalDamageDealtToChampions: number,
    wardsPlaced: number,
    goldEarned: number,
    riotIdGameName: string,
    riotIdTagline: string,
    item0: number,
    item1: number,
    item2: number,
    item3: number,
    item4: number,
    item5: number,
    item6: number,
    perks: {
        statPerks: {
            defense: number,
            flex: number,
            offense: number,
        },
        styles: [
            {
                selections: [
                    { perk: number },
                    { perk: number },
                    { perk: number },
                    { perk: number },
                ],
                style: number,
            },
            {
                selections: [
                    { perk: number },
                    { perk: number },
                ]
                style: number,
            }
        ]
    }
    teamId: string,
    win: boolean
}
