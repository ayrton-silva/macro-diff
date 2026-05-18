import { ChampionIcon } from '@/shared/game/ChampionIcon'
import { SummonerSpellIcon } from '@/shared/game/SummonerSpellIcon'
import { ItemIcon } from '@/shared/game/ItemIcon'
import { Link } from '@tanstack/react-router'
import { useExistentMatch } from '../hooks/useExistentMatches'
import { returnDateAgo } from '@/shared/game/helpers'
import { SummonerPerkIcon } from '#/shared/game/SummonerPerksIcon'
import type { Participant } from '#/shared/game/MatchEvent/types'

interface MatchCardProps {
  matchId: string
  summonerId: string
}



interface ParticipantCardProps {
  participant: Participant
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
  return (
    <div className="flex items-center h-full w-full text-white text-shadow-black text-shadow-lg">
      <div className="flex items-center border-l h-full w-full">
        <div className='ml-4 mr-4 size-10'>
          <img
            src={`https://wiki.leagueoflegends.com/en-us/images/thumb/${(participant.teamPosition[0].toUpperCase() + participant.teamPosition.slice(1).toLowerCase()).replace('Utility', 'Support')}_icon.png/120px-${(participant.teamPosition[0].toUpperCase() + participant.teamPosition.slice(1).toLowerCase()).replace('Utility', 'Support')}_icon.png`}
          />
        </div>
        <div className="flex h-full items-center w-full">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <div className="w-fit">
                <ChampionIcon
                  icon={participant.championName}
                  level={participant.champLevel}
                />
              </div>
              <div>
                <SummonerSpellIcon summonerSpellKey={participant.summoner1Id} />
                <SummonerSpellIcon summonerSpellKey={participant.summoner2Id} />
              </div>
              <div>
                <SummonerPerkIcon summonerPerkKey={participant.perksPrimaryStyleSelection0} />
                <SummonerPerkIcon summonerPerkKey={participant.perksSubStyle} isSubPerk={true} customClass='size-5'/>
              </div>
            </div>

            <div className="flex gap-1">
              <ItemIcon itemKey={participant.item0} />
              <ItemIcon itemKey={participant.item1} />
              <ItemIcon itemKey={participant.item2} />
              <ItemIcon itemKey={participant.item3} />
              <ItemIcon itemKey={participant.item4} />
              <ItemIcon itemKey={participant.item5} />
              <ItemIcon itemKey={participant.item6} />
            </div>

            <div className="flex flex-col ml-4 gap-2 font-bold shrink-0">
              <div className='flex gap-1 text-sm'>
                <p className=''>Gold:</p>
                <p className='text-amber-400'>{participant.goldEarned > 1000 ? `${Math.floor(participant.goldEarned/1000)}.${(Math.floor(participant.goldEarned%1000)/100).toFixed()}k` : participant.goldEarned}</p>
              </div>
              <div className='flex gap-1 text-sm'>
                <p className=''>CS:</p>
                <p className='text-gray-300'>{participant.totalMinionsKilled+participant.neutralMinionsKilled}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center border-l items-start p-4 gap-2 h-full ml-auto min-w-28">
            <p className="font-bold text-lg">
              <span>{participant.kills}</span>
              <span>/</span>
              <span className='text-red-500'>{participant.deaths}</span>
              <span>/</span>
              <span>{participant.assists}</span>
            </p>
            <p className="text-sm">
              <span>{(participant.kills + participant.assists) == 0 ? "0" : (Math.round((100 * (participant.kills + participant.assists) / (participant.deaths == 0 ? 1 : participant.deaths))) / 100)}:1 KDA</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SummonerMatchCard({ matchId, summonerId }: MatchCardProps) {
  const { status, data, error, isFetching } = useExistentMatch(matchId)

  if (!data) {
    return null
  }

  const summonerWin = data?.participants.filter(
    (p) => p.summonerId === summonerId,
  )[0]?.win

  console.log('matchId', matchId)

  return (
    <div className="grid gap-6 mt-1 text-shadow-black text-shadow-lg">
      <div
        className={`
          relative ring-2 rounded-xl
          ${data?.gameDuration < 240
            ? 'bg-gray-800 ring-gray-400'
            : summonerWin
              ? 'bg-[#172335] ring-green-400'
              : 'bg-[#221923] ring-red-400'
          }
            `}
      >
        <div className='flex h-full justify-between'>
          <div className='p-4 flex-1'>
            <div
              className={`absolute w-2 h-full rounded-l-xl top-0 left-0 ${data?.gameDuration < 240
                ? 'bg-gray-400'
                : summonerWin
                  ? 'bg-[#172335] bg-green-400'
                  : 'bg-[#221923] bg-red-400'
                }`}
            ></div>
            <div className="flex gap-4 text-white">
              <div className="w-full flex gap-4 items-center">
                <div className="ml-2 mr-4 space-y-1">
                  <h3
                    className={`text-lg font-bold ${data?.gameDuration < 240 ? 'text-gray-400' : summonerWin ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {data?.gameDuration < 240
                      ? 'Remake'
                      : summonerWin
                        ? 'Victory'
                        : 'Defeat'}
                  </h3>
                  <h4 className="text-xs pb-2">
                    {returnDateAgo(data?.gameEndTimestamp)}
                  </h4>
                  <h4>
                    {data?.queueId === 420 ? 'Ranked Solo' : 'Ranked Flex'}
                  </h4>
                  <h4>{`${Math.floor(data?.gameDuration / 60)}m ${Math.floor(data?.gameDuration % 60)}s`}</h4>
                </div>
                {data?.participants
                  .filter((p) => p.summonerId === summonerId)
                  ?.map((participant) => (
                    <div className="flex-1" key={participant.puuid}>
                      <ParticipantCard participant={participant} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Link to="/match" search={{ matchId: matchId }}
            className={`border-l-2 px-2 min-w-18 self-stretch  text-center content-center items-center rounded-r-2xl hover:cursor-pointer hover:bg-black/30 ${data?.gameDuration < 240
              ? 'bg-gray-600/40 text-gray-300!'
              : summonerWin
                ? 'bg-green-800/20 text-green-300!'
                : 'bg-red-800/20 text-red-300!'
              }`}><p>&gt;</p>
          </Link>
        </div>
      </div>
    </div>
  )
}