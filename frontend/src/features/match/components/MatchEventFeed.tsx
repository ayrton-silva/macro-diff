import { cn } from '#/lib/utils'
import { Skull } from 'lucide-react'

type Event = {
  eventId: number
  timestamp: number
  type: string
  creatorId?: string
  wardType?: string
  itemId?: number
  participantPuuid?: string
  teamId?: number
  victimId?: string
  killerId?: string
  killType?: string
  positionx?: number
  positiony?: number
  monsterSubType?: string
  monsterType?: string
  matchTimeline: string
  matchTimelineId: string
}

type Participant = {
  summonerId: string
  championName: string
  champLevel: number
  assists: number
  deaths: number
  kills: number
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
  perks: {
    statPerks: {
      defense: number
      flex: number
      offense: number
    }
    styles: [
      {
        selections: [
          { perk: number },
          { perk: number },
          { perk: number },
          { perk: number },
        ]
        style: number
      },
      {
        selections: [{ perk: number }, { perk: number }]
        style: number
      },
    ]
  }
  summoner: {
    gameName: string
    tagLine: string
    region: string
  }
  teamId: string
  win: boolean
}

type MatchEventFeedProps = {
  events: Event[]
  participants: Participant[]
}

export function MatchEventFeed({ events, participants }: MatchEventFeedProps) {
  const sortered = events
    .sort((a, b) => a.timestamp - b.timestamp)
    .filter((e) => e.type === 'CHAMPION_KILL')

  return (
    <div className="flex flex-col gap-8 border-l-2 border-l-gray-700 ml-2">
      {sortered.map((e, i) => {
        const eventTeamColor =
          participants.filter((p) => p.summonerId === e.killerId)[0].teamId ===
          '100'
            ? 'ring-cyan-400 text-cyan-400 bg-cyan-950'
            : 'ring-red-400 text-red-400 bg-red-950'

        const firstBloodColor =
          participants.filter((p) => p.summonerId === e.killerId)[0].teamId ===
          '100'
            ? 'text-cyan-400 bg-cyan-950'
            : 'text-red-300 bg-red-950'

        return (
          <div className="flex flex-col gap-2 relative pl-7">
            <div
              className={cn(
                'rounded-full ring-2 w-6 h-6 absolute -left-2 top-0 flex items-center justify-center',
                eventTeamColor,
              )}
            >
              <Skull size={18} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{`${Math.floor(
                e.timestamp / 1000 / 60,
              )
                .toString()
                .padStart(2, '0')}:${Math.floor((e.timestamp / 1000) % 60)
                .toString()
                .padStart(2, '0')}`}</span>
              {i === 0 && (
                <span
                  className={cn(
                    'uppercase px-1.5 py-0.5 rounded-xs text-xs font-bold',
                    firstBloodColor,
                  )}
                >
                  First Blood
                </span>
              )}
            </div>
            <p>
              {participants.map((p) => {
                if (p.summonerId === e.killerId) {
                  const colorClass =
                    p.teamId === '100' ? 'text-cyan-400' : 'text-red-400'

                  return (
                    <span className={colorClass}>{p.summoner.gameName}</span>
                  )
                }
              })}
              <span className="mx-1">killed</span>
              {participants.map((p) => {
                if (p.summonerId === e.victimId) {
                  const colorClass =
                    p.teamId === '100' ? 'text-cyan-400' : 'text-red-400'

                  return (
                    <span className={colorClass}>{p.summoner.gameName}</span>
                  )
                }
              })}
            </p>
          </div>
        )
      })}
    </div>
  )
}
