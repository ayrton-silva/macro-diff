import { ProfileIcon } from '#/shared/game/ProfileIcon'
import { Link } from '@tanstack/react-router'

interface SummonerCardProps {
  summoner: {
    gameName: string
    profileIconId: number
    region: string
    tagLine: string
    level: number
    summonerLeagues: [
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

export function SummonerCard({ summoner }: SummonerCardProps) {
  console.log('summoner', summoner)
  return (
    <div className="border-b border-gray-700 last:border-b-0 hover:bg-black/10">
      <Link
        to={`/summoner`}
        search={{
          gameName: summoner.gameName,
          region: summoner.region,
          tagLine: summoner.tagLine,
        }}
      >
        <div className="p-4 flex pb-5">
          <div className="relative">
            <ProfileIcon icon={summoner.profileIconId} />
            <span className="absolute bg-gray-700 left-1/2 px-1 py-0.5 whitespace-nowrap rounded-sm -translate-1/2 text-white text-xs">
              {summoner.level}
            </span>
          </div>
          <div className="ml-4 min-w-48">
            <h3 className="text-white font-bold">{summoner.gameName}</h3>
            <span className="bg-gray-800 text-white px-2 block mt-2 w-fit text-xs py-1 rounded-xs">
              {summoner.region}
            </span>
          </div>
          {summoner.summonerLeagues
            .filter((l) => l.queueType === 'RANKED_SOLO_5x5')
            .map((league) => (
              <div className="ml-16 flex gap-4">
                <img
                  className="w-16 h-16"
                  src={`/public/assets/Tier Icon/${league.tier}.png`}
                  alt=""
                />
                <div>
                  <h3>
                    {league.tier} {league.rank}
                  </h3>
                  <h3>{league.leaguePoints} LP</h3>
                </div>
              </div>
            ))}
        </div>
      </Link>
    </div>
  )
}
