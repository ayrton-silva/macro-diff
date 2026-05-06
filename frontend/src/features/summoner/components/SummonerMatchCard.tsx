import { useMatch } from '@/features/matches-list/hooks/useMatches'
import { Card, CardContent } from '@/components/ui/card'
import { ChampionIcon } from '@/shared/game/ChampionIcon'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { SummonerSpellIcon } from '#/shared/game/SummonerSpellIcon'
import { ItemIcon } from '#/shared/game/ItemIcon'
import { Link } from '@tanstack/react-router'
import { returnDateAgo } from '#/shared/game/helpers'

interface MatchCardProps {
  matchId: string
  summonerId: string
}

interface Participant {
  puuid: string
  championName: string
  champLevel: number
  lane: string
  teamPosition: string
  summoner1Id: number
  summoner2Id: number
  totalMinionsKilled: number
  totalDamageDealtToChampions: number
  wardsPlaced: number
  goldEarned: number
  riotIdGameName: string
  riotIdTagline: string
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  teamId: string
  win: boolean
  summoner: {
    gameName: string
    tagLine: string
    region: string
  }
  kills: number
  deaths: number
  assists: number
}

interface ParticipantCardProps {
  participant: Participant
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
  return (
    <Link
      to={`/summoner`}
      search={{
        gameName: participant.summoner.gameName,
        region: participant.summoner.region,
        tagLine: participant.summoner.tagLine,
      }}
    >
      <Card className="bg-transparent text-white">
        <CardContent>
          <>
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{participant.summoner.gameName}</h3>
              <Avatar>
                <AvatarImage
                  className="rounded-none"
                  src={`https://wiki.leagueoflegends.com/en-us/images/thumb/${(participant.teamPosition[0].toUpperCase() + participant.teamPosition.slice(1).toLowerCase()).replace('Utility', 'Support')}_icon.png/120px-${(participant.teamPosition[0].toUpperCase() + participant.teamPosition.slice(1).toLowerCase()).replace('Utility', 'Support')}_icon.png`}
                />
              </Avatar>
            </div>

            <div className="flex gap-4">
              <div className="flex gap-1">
                <div className="shadow-2xl shadow-black w-fit">
                  <ChampionIcon
                    icon={participant.championName}
                    level={participant.champLevel}
                  />
                </div>
                <div>
                  <SummonerSpellIcon
                    summonerSpellKey={participant.summoner1Id}
                  />
                  <SummonerSpellIcon
                    summonerSpellKey={participant.summoner2Id}
                  />
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

              <p className="flex gap-2 text-lg font-bold">
                <span>{participant.kills}</span>
                <span>/</span>
                <span>{participant.deaths}</span>
                <span>/</span>
                <span>{participant.assists}</span>
              </p>
            </div>
          </>
        </CardContent>
      </Card>
    </Link>
  )
}

export function SummonerMatchCard({ matchId, summonerId }: MatchCardProps) {
  const { status, data, error, isFetching } = useMatch(matchId)

  if (!data) {
    return null
  }

  console.log('aquuiui', data)

  const summonerWin = data?.participants.filter(
    (p) => p.summonerId === summonerId,
  )[0].win

  return (
    <div className="grid gap-6">
      <Card
        className={`
          relative ring-2
          ${
            summonerWin
              ? 'bg-[#172335] ring-green-400'
              : 'bg-[#221923] ring-red-400'
          }
            `}
      >
        <CardContent>
          <div
            className={`absolute w-2 h-full top-0 left-0 ${
              summonerWin
                ? 'bg-[#172335] bg-green-400'
                : 'bg-[#221923] bg-red-400'
            }`}
          ></div>
          <div className="flex gap-4 text-white">
            <div className="w-full flex gap-4">
              <div className="ml-2 mr-4 space-y-1">
                <h3
                  className={`text-lg font-bold ${summonerWin ? 'text-green-400' : 'text-red-400'}`}
                >
                  {summonerWin ? 'Victory' : 'Defeat'}
                </h3>
                <h4 className='text-xs pb-2'>{returnDateAgo(data?.gameEndTimestamp)}</h4>
                <h4>{data?.queueId === 420 ? 'Ranked Solo' : 'Ranked Flex'}</h4>
                <h4>{`${Math.floor(data?.gameDuration / 60)}m ${Math.floor(data?.gameDuration % 60)}s`}</h4>
              </div>
              {data?.participants
                .filter((p) => p.summonerId === summonerId)
                ?.map((participant) => (
                  <ParticipantCard participant={participant} />
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
