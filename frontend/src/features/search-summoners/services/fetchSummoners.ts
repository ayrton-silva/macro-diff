type SearchSummonersRequest = {
  gameName: string
  region: string
  tagLine: string
}

export async function fetchSummoners({
  gameName,
  region,
  tagLine,
}: SearchSummonersRequest) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/summoners/search?gameName=${gameName}&tagLine=${tagLine}&region=${region}`,
  )

  return await response.json()
}
