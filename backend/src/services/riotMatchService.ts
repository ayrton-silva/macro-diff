import type {
  RiotMatchesRequest,
  RiotMatchesResponse,
} from '../dto/riotMatchesDto'

import type {
  RiotMatchDataRequest,
  RiotMatchDataResponse,
} from '../dto/riotMatchesDto'

import { validateRegion } from './riotService';

const RIOT_API_KEY = process.env.RIOT_API_KEY

export async function getMatches({
  puuid,
  region,
  numberOfMatches
}: RiotMatchesRequest): Promise<RiotMatchesResponse> {
  const url = `https://${validateRegion(region)}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${numberOfMatches}`

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
  region,
}: RiotMatchDataRequest): Promise<RiotMatchDataResponse> {
  const url = `https://${encodeURIComponent(validateRegion(region))}.api.riotgames.com/lol/match/v5/matches/${matchId}`

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
