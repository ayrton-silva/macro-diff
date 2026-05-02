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
    `http://localhost:3001/summoner?gameName=${gameName}&tagLine=${tagLine}&region=${region}`,
  )

  return await response.json()
}
