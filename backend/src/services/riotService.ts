import type {
  RiotAccountRequest,
  RiotAccountResponse,
} from '../dto/riotAccountDto'
import type {
  RiotSummonerRequest,
  RiotSummonerResponse,
} from '../dto/riotSummonerDto'
import type {
  RiotSummonerLeagueRequest,
  RiotSummonerLeagueResponse,
} from '../dto/riotSummonerLeagueDto'

const RIOT_API_KEY = process.env.RIOT_API_KEY

export function validateRegion(region: string | undefined) {
  let response = ''
  switch (region) {
    case 'br1':
      response = 'americas'
      break

    default:
      response = 'americas'
      break
  }

  return response
}

export async function getAccount({
  gameName,
  region,
  tagLine,
}: RiotAccountRequest): Promise<RiotAccountResponse> {
  const url = `https://${validateRegion(region)}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
  const response = await fetch(url, {
    headers: {
      'X-Riot-Token': RIOT_API_KEY || '',
    },
  })
  const data = await response.json()

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Player not found!')
    }

    throw new Error(`Riot API error: ${response.status}`)
  }

  return data as RiotAccountResponse
}

export async function getSummoner({
  puuid,
  region = 'br1',
}: RiotSummonerRequest): Promise<RiotSummonerResponse> {
  const url = `https://${encodeURIComponent(region)}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}`

  const response = await fetch(url, {
    headers: {
      'X-Riot-Token': RIOT_API_KEY || '',
    },
  })

  const data = (await response.json()) as RiotSummonerResponse

  if (!data.puuid) {
    throw new Error('Invalid Riot API response')
  }

  return { ...data, region }
}
export async function getSummonerNameByPuuid({
  puuid,
  region,
}: RiotSummonerRequest): Promise<{
  puuid: string
  gameName: string
  tagLine: string
  region: string | undefined
}> {
  const url = `https://${validateRegion(region)}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${encodeURIComponent(puuid)}`

  const response = await fetch(url, {
    headers: {
      'X-Riot-Token': RIOT_API_KEY || '',
    },
  })

  const data = (await response.json()) as RiotAccountResponse

  if (!data.puuid) {
    throw new Error('Invalid Riot API response')
  }

  return { ...data, region: validateRegion(region) }
}

export async function getSummonerLeague({
  puuid,
  region = 'br1',
}: RiotSummonerLeagueRequest): Promise<RiotSummonerLeagueResponse> {
  const url = `https://${encodeURIComponent(region)}.api.riotgames.com/lol/league/v4/entries/by-puuid/${encodeURIComponent(puuid)}`
  const response = await fetch(url, {
    headers: {
      'X-Riot-Token': RIOT_API_KEY || '',
    },
  })

  const data = (await response.json()) as RiotSummonerLeagueResponse

  if (!data) {
    throw new Error('Invalid Riot API response')
  }

  return data
}
