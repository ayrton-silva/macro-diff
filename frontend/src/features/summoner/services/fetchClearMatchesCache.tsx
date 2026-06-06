export async function fetchClearMatchesCacheByPuuid(puuid: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/clearMatchesCache/${puuid}`,
  )

  return await response.json()
}
