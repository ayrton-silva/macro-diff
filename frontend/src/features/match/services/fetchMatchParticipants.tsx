export async function fetchMatchParticipantsByMatchId(matchId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/participants/${matchId}`,
  )

  return await response.json()
}
