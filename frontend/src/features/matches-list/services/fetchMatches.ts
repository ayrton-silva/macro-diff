export async function fetchMatchesByPuuid(puuid: string) {
  const response = await fetch(
    `http://localhost:3001/matches/${puuid}?numberOfMatches=3`,
  )

  return await response.json()
}

export async function fetchMatchById(matchId: string) {
  const response = await fetch(`http://localhost:3001/match/${matchId}`)

  return await response.json()
}
