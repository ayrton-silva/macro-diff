import { changeStyleOnSummonerLeague } from '#/shared/game/helpers'
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

export function SummonerSearchlistCard({ summoner }: SummonerCardProps) {
  console.log('summoner', summoner)
  return (
    <div className="flex h-16 items-center border-b border-gray-700 bg-gray-900 last:border-b-0 hover:bg-gray-900/70 ">
      <Link
        to={`/summoner`}
        search={{
          gameName: summoner.gameName,
          region: summoner.region,
          tagLine: summoner.tagLine,
        }}
      >
        <div className="p-4 flex pb-5 items-center">
            <ProfileIcon icon={summoner.profileIconId} className='rounded-4xl size-10' avatarSize='size-10'/>
          <div className="flex ml-4 min-w-48 items-center">
            <h3 className="text-white font-light text-sm">{summoner.gameName}</h3>
            <span className="bg-gray-800 text-white ml-2 px-2 py-1 block w-fit text-xs rounded-xs">
              #{summoner.tagLine}
            </span>
          </div>
          {summoner.summonerLeagues
            .filter((l) => l.queueType === 'RANKED_SOLO_5x5')
            .map((league) => (
              <div className="ml-16 gap-12 hidden text-left sm:flex text-white font-light text-sm">
                  <h3 className={`min-w-24 ${changeStyleOnSummonerLeague(league.tier)}`}>
                    {league.tier} {league.rank}
                  </h3>
                  <h3>{league.leaguePoints} LP</h3>
              </div>
            ))}
        </div>
      </Link>
    </div>
  )
}
