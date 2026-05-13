export async function fetchMatchTimelineById(matchId: string) {
  const response = await fetch(`http://localhost:3001/matchTimeline/${matchId}`)

  return await response.json()
}
