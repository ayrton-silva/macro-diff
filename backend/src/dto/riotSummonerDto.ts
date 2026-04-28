export type RiotSummonerRequest = {
  puuid: string
  region?: string
}

export type RiotSummonerResponse = {
  puuid: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
}
