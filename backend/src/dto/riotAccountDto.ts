export type RiotAccountRequest = {
  gameName: string
  tagLine: string
  region?: string
}

export type RiotAccountResponse = {
  puuid: string
  gameName: string
  tagLine: string
}
