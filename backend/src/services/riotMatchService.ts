import type {
  RiotMatchesRequest,
  RiotMatchesResponse,
} from '../dto/riotMatchesDto'

import type {
  RiotMatchDataRequest,
  RiotMatchDataResponse,
} from '../dto/riotMatchesDto'

const RIOT_API_KEY = process.env.RIOT_API_KEY

export async function getMatches({
  puuid,
  region = 'americas',
  numberOfMatches
}: RiotMatchesRequest): Promise<RiotMatchesResponse> {
  const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${numberOfMatches}`

  const response = await fetch(url, {
    headers: {
      'X-Riot-Token': RIOT_API_KEY || '',
    },
  })

  const data = (await response.json()) as RiotMatchesResponse

  if (!data) {
    throw new Error('Invalid Riot API response')
  }

  return data
}

export async function getMatchDetails({
  matchId,
  region = 'americas',
}: RiotMatchDataRequest): Promise<RiotMatchDataResponse> {
  const url = `https://${encodeURIComponent(region)}.api.riotgames.com/lol/match/v5/matches/${matchId}`

  const response = await fetch(url, {
    headers: {
      'X-Riot-Token': RIOT_API_KEY || '',
    },
  })

  const data = await response.json() as RiotMatchDataResponse

  if (!data) {
    throw new Error('Invalid Riot API response')
  }
  return data
}