export type RiotSummonerLeagueRequest = {
  puuid: string
  region?: string
}

export type RiotSummonerLeagueResponse = Array<RiotSummonerLeague>

export type RiotSummonerLeague = {
  leagueId: string
  queueType: string
  tier: string
  rank: string
  puuid: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}
