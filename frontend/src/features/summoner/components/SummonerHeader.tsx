type SummonerHeaderProps = {
  summoner: {
    gameName: string
  }
}

export function SummonerHeader({ summoner }: SummonerHeaderProps) {
  return (
    <div>
      <h1>Summoner Header {summoner.gameName}</h1>
    </div>
  )
}
