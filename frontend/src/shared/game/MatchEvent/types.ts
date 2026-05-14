export type MatchEvent = {
  eventId: number
  timestamp: number
  type: string
  creatorId?: string
  wardType?: string
  itemId?: number
  participantPuuid?: string
  teamId?: TeamId
  victimId?: string
  killerId?: string
  killType?: string
  positionx?: number
  positiony?: number
  monsterSubType?: string
  monsterType?: string
  matchTimeline: string
  matchTimelineId: string
}

export type Participant = {
  summonerId: string
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
  summoner: {
    gameName: string
    tagLine: string
    region: string
  }
  teamId: TeamId
  win: boolean
}

export type TeamId = 100 | 200
