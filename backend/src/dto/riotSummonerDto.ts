export type RiotSummonerRequest = {
  puuid: string
  region?: string
}

export type RiotSummonerResponse = {
  puuid: string
  profileIconId: number
  revisionDate: string
  summonerLevel: number
  region: string
}

export type RiotSummonerBadRepsonse = {
  status: {
    status_code: number,
    message: string
  }
}