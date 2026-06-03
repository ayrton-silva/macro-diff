import { cn } from '@/lib/utils'
import type {
  MatchEvent,
  Participant,
  ParticipantFrames,
} from '@/shared/game/MatchEvent/types'
import { MatchParticipant } from './MatchParticipant'

type MatchTeamSummaryCardProps = {
  participants: Participant[]
  team: string
  events: MatchEvent[]
  participantFrames: ParticipantFrames[]
  timelineValues: [number, number]
}
const lanePosition = {
  TOP: 0,
  JUNGLE: 1,
  MIDDLE: 2,
  BOTTOM: 3,
  UTILITY: 4,
}

export function getParticipantTeam(participants: Participant[], id: string) {
  return participants.find((p) => p.summonerId === id)?.teamId
}

export function MatchTeamSummaryCard({
  participants,
  team,
  events,
  participantFrames,
  timelineValues,
}: MatchTeamSummaryCardProps) {
  return (
    <div className="bg-gray-900 rounded-sm px-8 py-4 relative overflow-hidden">
      <div
        className={cn(
          'absolute w-1 h-full top-0',
          team === 'Blue' ? 'left-0 bg-cyan-600' : 'right-0 bg-red-400',
        )}
      ></div>
      <div
        className={`flex flex-col border-b-2 border-gray-800 py-2 mb-2 ${team == 'Blue' ? 'items-baseline' : 'items-end'}`}
      >
        <h2
          className={cn(
            'font-bold flex gap-3 items-center text-xl  ',
            `${team === 'Blue' ? 'text-cyan-500' : 'text-red-400'}`,
          )}
        >
          {team} Team
          {/* {participants.every((p) => p.win) ? (
            <span className="uppercase text-xs rounded-sm bg-emerald-950 px-2 py-1 border border-emerald-500 text-emerald-300">
              Winner
            </span>
          ) : (
            <span className="uppercase text-xs rounded-sm bg-gray-800 px-2 py-1 border border-gray-500 text-gray-300">
              Defeat
            </span>
          )} */}
        </h2>
      </div>
      {participants.length > 0 &&
        participants
          .sort(
            (a, b) =>
              lanePosition[a.teamPosition] - lanePosition[b.teamPosition],
          )
          .map((p) => (
            <div
              key={p.teamPosition}
              className="flex flex-col py-2 border-b-2 border-dashed last:border-0"
            >
              <h4
                className={`text-sm text-gray-300 mb-2 ${p.teamId == 200 ? 'self-end mr-8' : 'ml-8 '}`}
              >
                {p.summoner.gameName}
              </h4>
              <MatchParticipant
                participant={p}
                events={events}
                participantFrames={participantFrames}
                timelineValues={timelineValues}
              />
            </div>
          ))}
    </div>
  )
}
