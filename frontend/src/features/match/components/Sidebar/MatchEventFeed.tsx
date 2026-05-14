import {
  getMatchEventColors,
  getMatchEventTeam,
  getParticipant,
} from '#/shared/game/helpers/MatchEvent'
import type { MatchEvent, Participant } from '#/shared/game/MatchEvent/types'

type MatchEventFeedProps = {
  events: MatchEvent[]
  participants: Participant[]
  filter: {
    championKills: boolean
    objectives: boolean
    buildings: boolean
    wards: boolean
  }
}

function PlayerName({ participant }: { participant: Participant }) {
  const colorClass =
    +participant.teamId === 100 ? 'text-cyan-400' : 'text-red-400'
  return <span className={colorClass}>{participant.summoner.gameName}</span>
}

function WardPlaced({
  event,
  participants,
}: {
  event: MatchEvent
  participants: Participant[]
}) {
  const creator = getParticipant(participants, event.creatorId!)

  if (!creator) return null

  return (
    <div>
      Ward Placed by
      <PlayerName participant={creator} />
    </div>
  )
}

function ChampionKill({
  event,
  participants,
}: {
  event: MatchEvent
  participants: Participant[]
}) {
  const killer = getParticipant(participants, event.killerId!)
  const victim = getParticipant(participants, event.victimId!)

  if (!killer || !victim) return null

  return (
    <div>
      <PlayerName participant={killer} />
      <span className="block mx-1">killed</span>
      <PlayerName participant={victim} />
    </div>
  )
}

export function MatchEventFeed({
  events,
  participants,
  filter,
}: MatchEventFeedProps) {
  const filterOptions = [
    ['LEVEL_UP', false],
    ['PAUSE_END', false],
    ['ITEM_DESTROYED', false],
    ['ITEM_PURCHASED', false],
    ['SKILL_LEVEL_UP', false],
    ['WARD_PLACED', false],
    ['TURRET_PLATE_DESTROYED', false],
    ['BUILDING_KILL', false],
    ['CHAMPION_KILL', false],
    ['CHAMPION_SPECIAL_KILL', false],
    ['ELITE_MONSTER_KILL', false],
  ]

  const filterMap = new Map(filterOptions)

  if (filter.wards) {
    filterMap.set('WARD_PLACED', true)
  }

  if (filter.buildings) {
    filterMap.set('TURRET_PLATE_DESTROYED', true)
    filterMap.set('BUILDING_KILL', true)
  }

  if (filter.championKills) {
    filterMap.set('CHAMPION_KILL', true)
    filterMap.set('CHAMPION_SPECIAL_KILL', true)
  }

  if (filter.objectives) {
    filterMap.set('ELITE_MONSTER_KILL', true)
  }

  const sorteredMatchEvents = events
    .filter((e) => filterMap.get(e.type) === true)
    .sort((a, b) => a.timestamp - b.timestamp)

  console.log('filtradinho', sorteredMatchEvents)

  return (
    <div className="bg-gray-900 px-4 py-2 rounded-md">
      <h2 className="mb-6 tracking-widest uppercase font-semibold text-gray-300 mt-4 ml-2">
        Event Feed
      </h2>
      <div className="flex flex-col gap-8 border-l-2 border-l-gray-700 ml-2">
        {sorteredMatchEvents.map((e, i) => {
          const team = getMatchEventTeam({ matchEvent: e, participants })
          const colors = getMatchEventColors(team)

          return (
            <h1 className={`${colors['background']}`}>
              {team}
              {e.type === 'WARD_PLACED' && (
                <WardPlaced event={e} participants={participants} />
              )}
              {(e.type === 'CHAMPION_KILL' ||
                e.type === 'CHAMPION_SPECIAL_KILL') && (
                <ChampionKill event={e} participants={participants} />
              )}
            </h1>
          )

          // const eventTeamColor =
          //   participants.filter((p) => p.summonerId === e.killerId)[0]
          //     ?.teamId === '100'
          //     ? 'ring-cyan-400 text-cyan-400 bg-cyan-950'
          //     : 'ring-red-400 text-red-400 bg-red-950'

          // const firstBloodColor =
          //   participants.filter((p) => p.summonerId === e.killerId)[0]
          //     ?.teamId === '100'
          //     ? 'text-cyan-400 bg-cyan-950'
          //     : 'text-red-300 bg-red-950'

          // return (
          //   <div className="flex flex-col gap-2 relative pl-7">
          //     <div
          //       className={cn(
          //         'rounded-full ring-2 w-6 h-6 absolute -left-2 top-0 flex items-center justify-center',
          //         eventTeamColor,
          //       )}
          //     >
          //       <Skull size={18} />
          //     </div>
          //     <div className="flex items-center justify-between">
          //       <span className="text-sm text-gray-300">{`${Math.floor(
          //         e.timestamp / 1000 / 60,
          //       )
          //         .toString()
          //         .padStart(2, '0')}:${Math.floor((e.timestamp / 1000) % 60)
          //         .toString()
          //         .padStart(2, '0')}`}</span>
          //       {i === 0 && (
          //         <span
          //           className={cn(
          //             'uppercase px-1.5 py-0.5 rounded-xs text-xs font-bold',
          //             firstBloodColor,
          //           )}
          //         >
          //           First Blood
          //         </span>
          //       )}
          //     </div>
          //     <p>
          //       {participants.map((p) => {
          //         if (p.summonerId === e.killerId) {
          //           const colorClass =
          //             p.teamId === '100' ? 'text-cyan-400' : 'text-red-400'

          //           return (
          //             <span className={colorClass}>{p.summoner.gameName}</span>
          //           )
          //         }
          //       })}
          //       <span className="mx-1">killed</span>
          //       {participants.map((p) => {
          //         if (p.summonerId === e.victimId) {
          //           const colorClass =
          //             p.teamId === '100' ? 'text-cyan-400' : 'text-red-400'

          //           return (
          //             <span className={colorClass}>{p.summoner.gameName}</span>
          //           )
          //         }
          //       })}
          //     </p>
          //   </div>
          // )
        })}
      </div>
    </div>
  )
}
