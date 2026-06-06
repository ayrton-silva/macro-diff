export async function fetchMatchById(matchId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/match/${matchId}`,
  )

  return await response.json()
}
