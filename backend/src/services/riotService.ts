const RIOT_API_KEY = process.env.RIOT_API_KEY

type RiotAccountResponse = {
  puuid: string
  gameName: string
  tagLine: string
}

export async function getRiotAccount(
  region: string,
  gameName: string,
  tagLine: string,
): Promise<RiotAccountResponse> {
  const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`

  const response = await fetch(url, {
    headers: {
      'X-Riot-Token': RIOT_API_KEY || '',
    },
  })

  const data: Partial<RiotAccountResponse> = await response.json()

  if (!data.puuid || !data.gameName || !data.tagLine) {
    throw new Error('Invalid Riot API response')
  }

  return data as RiotAccountResponse
}
