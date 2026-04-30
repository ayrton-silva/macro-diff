export type RiotSummonerRequest = {
  puuid: string
  region?: string
}

export type RiotSummonerResponse = {
  puuid: string
  profileIconId: number
  revisionDate: string
  summonerLevel: number
}

export type RiotSummonerBadRepsonse = {
  status: {
    status_code: number,
    message: string
  }
}