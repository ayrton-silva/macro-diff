import { cn } from '#/lib/utils'
import { MatchParticipant } from './MatchParticipant'

type Participant = {
  puuid: string
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

type MatchTeamSummaryCardProps = {
  participants: Participant[]
  team: string
}

export function MatchTeamSummaryCard({
  participants,
  team,
}: MatchTeamSummaryCardProps) {
  return (
    <div className="bg-gray-900 rounded-sm px-8 py-4  relative overflow-hidden">
      <div
        className={cn(
          'absolute w-1 h-full top-0',
          team === 'Blue' ? 'left-0 bg-cyan-600' : 'right-0 bg-red-400',
        )}
      ></div>
      <h2
        className={cn(
          'font-bold flex gap-3 items-center text-xl',
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
      {participants.length > 0 &&
        participants.map((p) => <MatchParticipant participant={p} />)}
    </div>
  )
}
