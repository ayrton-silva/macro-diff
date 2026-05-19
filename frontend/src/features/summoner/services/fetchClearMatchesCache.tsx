export async function fetchClearMatchesCacheByPuuid(puuid: string) {
  const response = await fetch(`http://localhost:3001/clearMatchesCache/${puuid}`)

  return await response.json()
}
