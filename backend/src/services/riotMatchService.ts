import type {
  RiotMatchesRequest,
  RiotMatchesResponse,
} from '../dto/riotMatchesDto'

import type {
  RiotMatchDataRequest,
  RiotMatchDataResponse,
} from '../dto/riotMatchesDto'

import { validateRegion } from './riotService'

//TO DO: check on getMatchDetails if the match has been completed, if not ignore match.

const RIOT_API_KEY = process.env.RIOT_API_KEY

export async function getMatches({
  puuid,
  region,
  numberOfMatches,
  start,
}: RiotMatchesRequest): Promise<RiotMatchesResponse> {
  const url = `https://${validateRegion(region)}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?${start ? `start=${Number(start)}&` : ''}count=${numberOfMatches}`

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

  const data = (await response.json()) as RiotMatchDataResponse

  if (!data) {
    throw new Error('Invalid Riot API response')
  }

  return data
}

export async function getAllMatchesByPuuid({ puuid }: { puuid: string }) {
  let keepFetching = true
  let start = 0
  const matchesList = []

  while (keepFetching && matchesList.length < 300) {
    const matches = await getMatches({ puuid, numberOfMatches: 100, start })
    matchesList.push(...matches)

    if (matches.length < 100) {
      keepFetching = false
    }

    start += 100
  }

  return matchesList
}
