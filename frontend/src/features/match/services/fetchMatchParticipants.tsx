export async function fetchMatchParticipantsByMatchId(matchId: string) {
  const response = await fetch(`http://localhost:3001/participants/${matchId}`)

  return await response.json()
}
