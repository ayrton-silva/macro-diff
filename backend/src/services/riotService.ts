import type {
  RiotAccountRequest,
  RiotAccountResponse,
} from '../dto/riotAccountDto'

const RIOT_API_KEY = process.env.RIOT_API_KEY

export async function getRiotAccount({
  gameName,
  region = 'americas',
  tagLine,
}: RiotAccountRequest): Promise<RiotAccountResponse> {
  const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`

  const response = await fetch(url, {
    headers: {
      'X-Riot-Token': RIOT_API_KEY || '',
    },
  })

  const data = (await response.json()) as RiotAccountResponse

  if (!data.puuid || !data.gameName || !data.tagLine) {
    throw new Error('Invalid Riot API response')
  }

  return data
}
