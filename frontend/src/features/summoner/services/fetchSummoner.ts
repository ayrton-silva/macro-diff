type SummonerRequest = {
  gameName: string
  region: string
  tagLine: string
}

export async function fetchSummoner({
  gameName,
  region,
  tagLine,
}: SummonerRequest) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/summoner?gameName=${gameName}&tagLine=${tagLine}&region=${region}`,
  )

  return await response.json()
}
