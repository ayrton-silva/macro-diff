export async function fetchMatchTimelineById(matchId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/matchTimeline/${matchId}`,
  )

  return await response.json()
}
