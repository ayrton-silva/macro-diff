export type RiotMatchesRequest = {
  puuid: string
  region?: string
  numberOfMatches: number
  start?: number
}

export type RiotExistentMatchesRequest = {
  puuid: string
  region?: string
  numberOfMatches: number
  cursor: string
}

export type RiotMatchesResponse = Array<string>

export type RiotMatchDataRequest = {
  matchId: string
  region?: string
}
export type RiotMatchDataResponse = {
  info: {
    gameDuration: number
    gameEndTimestamp: string
    gameMode: string
    gameType: string
    platformId: string
    queueId: number
    participants: Participants[]
  }
}
export type RiotMatchTimelineDataResponse = {
  metadata: {
    matchId: string
  }
  info: {
    frames: [{
      events: Events[]
      participantFrames: {
        "1" : ParticipantFrames,
        "2" : ParticipantFrames,
        "3" : ParticipantFrames,
        "4" : ParticipantFrames,
        "5" : ParticipantFrames,
        "6" : ParticipantFrames,
        "7" : ParticipantFrames,
        "8" : ParticipantFrames,
        "9" : ParticipantFrames,
        "10" : ParticipantFrames
      }
      timestamp: number
    }],
    participants: [{
      participantId: number
      puuid:string
    }]
  }
}


export type Participants = {
  puuid: string
  championName: string
  champLevel: number
  assists: number
  deaths: number
  kills: number
  lane: string
  teamPosition: string
  summoner1Id: number
  summoner2Id: number
  totalMinionsKilled: number
  neutralMinionsKilled: number
  totalDamageDealtToChampions: number
  wardsPlaced: number
  goldEarned: number
  riotIdGameName: string
  riotIdTagline: string
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  perks: {
    statPerks: {
      defense: number
      flex: number
      offense: number
    }
    styles: [
      {
        selections: [
          { perk: number },
          { perk: number },
          { perk: number },
          { perk: number },
        ]
        style: number
      },
      {
        selections: [{ perk: number }, { perk: number }]
        style: number
      },
    ]
  }
  teamId: string
  win: boolean
}



export type Events = {
  timestamp: number
  type: string
  creatorId?: number
  wardType?: string
  itemId?: number
  participantId?: number
  teamId?: number
  buildingType: string
  laneType?: string
  towerType?: string
  victimId?: number
  killerId?: number
  killType?: string
  multiKillLength?: number
  position?: {
    x: number
    y: number
  }
  monsterSubType?: string
  monsterType?: string
}

export type ParticipantFrames = {
  
    position: {
      x: number
      y: number
    }
    level: number
    minionsKilled: number
    currentGold: number
    totalGold: number
    damageStats: {
      totalDamageDoneToChampions: number
  }
  
}
