import { cn } from '@/lib/utils'
import type { Participant } from '@/shared/game/MatchEvent/types'
import { MatchParticipant } from './MatchParticipant'

type MatchTeamSummaryCardProps = {
  participants: Participant[]
  team: string
}
const lanePosition = {
  "TOP":0,
  "JUNGLE":1,
  "MIDDLE":2,
  "BOTTOM":3,
  "UTILITY":4
}

export function MatchTeamSummaryCard({
  participants,
  team,
}: MatchTeamSummaryCardProps) {
  return (
    <div className="bg-gray-900 rounded-sm px-8 py-4 relative overflow-hidden">
      <div
        className={cn(
          'absolute w-1 h-full top-0',
          team === 'Blue' ? 'left-0 bg-cyan-600' : 'right-0 bg-red-400',
        )}
      ></div>
      <div className={`flex flex-col border-b-2 border-gray-800 py-2 mb-2 ${team == 'Blue' ? "items-baseline":"items-end"}`}>
      <h2
        className={cn(
          'font-bold flex gap-3 items-center text-xl  ',
          `${team === 'Blue' ? 'text-cyan-500' : 'text-red-400'}`,
        )}
      >
        {team} Team
        {participants.every((p) => p.win) ? (
          <span className="uppercase text-xs rounded-sm bg-emerald-950 px-2 py-1 border border-emerald-500 text-emerald-300">
            Winner
          </span>
        ) : (
          <span className="uppercase text-xs rounded-sm bg-gray-800 px-2 py-1 border border-gray-500 text-gray-300">
            Defeat
          </span>
        )}
      </h2>
      <div className='flex text-sm text-gray-400 gap-1 mt-0.5'>
        <p>Dragons:</p>
        <p>Towers:</p>
        <p>Gold:</p>
      </div>
      </div>
      {participants.length > 0 &&
        participants.sort((a,b)=> lanePosition[a.teamPosition]- lanePosition[b.teamPosition]).map((p) => 
            <div key={p.teamPosition} className='py-3'><MatchParticipant participant={p}/></div>
        )}
    </div>
  )
}