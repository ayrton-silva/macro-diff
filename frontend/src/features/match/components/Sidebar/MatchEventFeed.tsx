import { cn } from '#/lib/utils'
import {
  getMatchEventColors,
  getMatchEventTeam,
  getParticipant,
} from '#/shared/game/helpers/MatchEvent'
import type {
  MatchEvent,
  Participant,
  TeamId,
} from '#/shared/game/MatchEvent/types'
import { Crosshair, Eye, Skull, TowerControl } from 'lucide-react'

type MatchEventFeedProps = {
  events: MatchEvent[]
  participants: Participant[]
  filter: {
    championKills: boolean
    objectives: boolean
    buildings: boolean
    wards: boolean
  }
  timelineValues: [number, number]
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
      <span className="mr-1">Ward Placed by</span>
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
      <span className="mx-1">killed</span>
      <PlayerName participant={victim} />
    </div>
  )
}

function ObjectiveCompleted({
  event,
  participants,
}: {
  event: MatchEvent
  participants: Participant[]
}) {
  const killer = getParticipant(participants, event.killerId!)

  return (
    <div>
      {killer ? (
        <PlayerName participant={killer} />
      ) : (
        <span
          className={event.teamId === 100 ? 'text-cyan-400' : 'text-red-400'}
        >
          {event.teamId === 100 ? 'Blue' : 'Red'} Team
        </span>
      )}
      <span className="mx-1">destroyed</span>
      {event.monsterSubType ? (
        <span className="text-purple-500">{event.monsterSubType}</span>
      ) : (
        <span className="text-purple-500">{event.monsterType}</span>
      )}
    </div>
  )
}

function BuildingDestroyed({
  event,
  participants,
}: {
  event: MatchEvent
  participants: Participant[]
}) {
  const killer = getParticipant(participants, event.killerId!)

  return (
    <div>
      {killer ? (
        <PlayerName participant={killer} />
      ) : (
        <span
          className={event.teamId === 100 ? 'text-cyan-400' : 'text-red-400'}
        >
          {event.teamId === 100 ? 'Blue' : 'Red'} Team
        </span>
      )}
      <span className="mx-1">secured</span>
      {event.towerType ? (
        <span className="text-purple-500">{event.towerType}</span>
      ) : (
        <span className="text-purple-500">{event.buildingType}</span>
      )}
    </div>
  )
}

export function MatchEventFeed({
  events,
  participants,
  filter,
  timelineValues,
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
    //filterMap.set('TURRET_PLATE_DESTROYED', true)
    filterMap.set('BUILDING_KILL', true)
  }

  if (filter.championKills) {
    filterMap.set('CHAMPION_KILL', true)
    //filterMap.set('CHAMPION_SPECIAL_KILL', true)
  }

  if (filter.objectives) {
    filterMap.set('ELITE_MONSTER_KILL', true)
  }

  const sorteredMatchEvents = events
    .filter((e) => filterMap.get(e.type) === true)
    .filter(
      (e) =>
        e.timestamp >= timelineValues[0] && e.timestamp <= timelineValues[1],
    )
    .sort((a, b) => a.timestamp - b.timestamp)

  function getMatchEventIcon({ matchEvent }: { matchEvent: MatchEvent }) {
    let icon = null

    if (['BUILDING_KILL', 'TURRET_PLATE_DESTROYED'].includes(matchEvent.type)) {
      icon = TowerControl
    }

    if (matchEvent.type === 'CHAMPION_KILL') {
      icon = Skull
    }

    if (matchEvent.type === 'WARD_PLACED') {
      icon = Eye
    }

    if (matchEvent.type === 'ELITE_MONSTER_KILL') {
      icon = Crosshair
    }

    return { icon }
  }

  console.log('filtroaweawhe', sorteredMatchEvents)

  return (
    <div className="bg-gray-900 px-4 py-2 rounded-md pb-6">
      <h2 className="mb-6 tracking-widest uppercase font-semibold text-gray-300 mt-4 ml-2">
        Event Feed
      </h2>
      <div className="flex flex-col gap-8 border-l-2 border-l-gray-700 ml-2">
        {sorteredMatchEvents
          .map((e) =>
            e.type === 'BUILDING_KILL'
              ? { ...e, teamId: (e.teamId === 100 ? 200 : 100) as TeamId }
              : e,
          )
          .map((e, i) => {
            const team = getMatchEventTeam({ matchEvent: e, participants })
            const colors = getMatchEventColors(team)
            const eventIcon = getMatchEventIcon({ matchEvent: e })

            return (
              <div className="flex flex-col gap-2 relative pl-7 text-sm">
                <div
                  className={cn(
                    'rounded-full ring-2 w-6 h-6 absolute -left-3 top-0 flex items-center justify-center',
                    ...Object.values(colors),
                  )}
                >
                  {eventIcon.icon && <eventIcon.icon size={18} />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{`${Math.floor(
                    e.timestamp / 1000 / 60,
                  )
                    .toString()
                    .padStart(2, '0')}:${Math.floor((e.timestamp / 1000) % 60)
                    .toString()
                    .padStart(2, '0')}`}</span>
                </div>
                <p>
                  {e.type === 'WARD_PLACED' && (
                    <WardPlaced event={e} participants={participants} />
                  )}
                  {(e.type === 'CHAMPION_KILL' ||
                    e.type === 'CHAMPION_SPECIAL_KILL') && (
                    <ChampionKill event={e} participants={participants} />
                  )}
                  {(e.type === 'BUILDING_KILL' ||
                    e.type === 'TURRET_PLATE_DESTROYED') && (
                    <BuildingDestroyed event={e} participants={participants} />
                  )}
                  {e.type === 'ELITE_MONSTER_KILL' && (
                    <ObjectiveCompleted event={e} participants={participants} />
                  )}
                </p>
              </div>
            )
          })}
      </div>
    </div>
  )
}
