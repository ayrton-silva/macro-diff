import { cn } from '@/lib/utils'
import {
  capitalizeString,
  changeStyleOnSummonerLeague,
} from '#/shared/game/helpers'

type SummonerRankCardProps = {
  summoner: {
    gameName: string
    summonerLeagues?: [
      {
        queueType: string
        tier: string
        rank: string
        leaguePoints: number
        wins: number
        losses: number
      },
    ]
  }
}

export function SummonerRankCard({ summoner }: SummonerRankCardProps) {
  const soloLeague = summoner.summonerLeagues?.filter(
    (l) => l.queueType === 'RANKED_SOLO_5x5',
  )

  if (!soloLeague || soloLeague.length < 1) return null

  const league = soloLeague[0]

  return (
    <div className="ml-80 p-4 text-white border border-gray-700 rounded-md bg-[#121826] shrink-0 w-80">
      <h2 className="mb-4">Current season</h2>
      <div className="flex gap-8">
        <img
          className="size-24"
          src={`/public/assets/Tier Icon/${league.tier}.png`}
          alt=""
        />
        <div>
          <h3
            className={cn(
              'text-xl font-bold',
              changeStyleOnSummonerLeague(league.tier),
            )}
          >
            {capitalizeString(league.tier)}
          </h3>
          <h3 className="font-bold">{league.leaguePoints} LP</h3>
          <h3>
            <span className="text-cyan-400">{`${league.wins}W`}</span> -{' '}
            <span className="text-red-400">{`${league.losses}L`}</span>
            <p>
              {Math.round((league.wins / (league.losses + league.wins)) * 100)}%
              Win Rate
            </p>
          </h3>
        </div>
      </div>
    </div>
  )
}
