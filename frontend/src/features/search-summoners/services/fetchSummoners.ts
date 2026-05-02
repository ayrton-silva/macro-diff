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
    `http://localhost:3001/summoners/search?gameName=${gameName}&tagLine=${tagLine}&region=${region}`,
  )

  return await response.json()
}
