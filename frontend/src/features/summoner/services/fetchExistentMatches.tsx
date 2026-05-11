export type fetchExistentMatchesByPuuidRequest = {
  puuid: string
  numberOfMatches?: number
  cursor?: string
}

export async function fetchExistentMatchesByPuuid({
  puuid,
  numberOfMatches = 3,
  cursor = '',
}: fetchExistentMatchesByPuuidRequest) {
  const response = await fetch(
    `http://localhost:3001/existentMatches/${puuid}?numberOfMatches=${numberOfMatches}${cursor && `&cursor=${cursor}`}
`,
  )

  return await response.json()
}

export async function fetchExistentMatchById(matchId: string) {
  const response = await fetch(`http://localhost:3001/match/${matchId}`)

  return await response.json()
}
