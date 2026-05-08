export type fetchExistentMatchesByPuuidRequest = {
  puuid: string
  numberOfMatches?: number
  skip?: number
}

export async function fetchExistentMatchesByPuuid({
  puuid,
  numberOfMatches = 3,
  skip = 0,
}: fetchExistentMatchesByPuuidRequest) {
  const response = await fetch(
    `http://localhost:3001/existentMatches/${puuid}?numberOfMatches=${numberOfMatches}&skip=${isNaN(skip) ? 0 : skip}
`,
  )

  return await response.json()
}

export async function fetchExistentMatchById(matchId: string) {
  const response = await fetch(`http://localhost:3001/match/${matchId}`)

  return await response.json()
}
