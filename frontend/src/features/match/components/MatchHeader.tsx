import { returnDateAgo } from '#/shared/game/helpers'

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
  teamId: string
  win: boolean
}

type MatchHeaderProps = {
  match: {
    matchId: string
    gameDuration: number
    gameEndTimestamp: string
    gameMode: string
    gameType: string
    platformId: string
    queueId: number
    participants: Participant[]
  }
}

export function MatchHeader({ match }: MatchHeaderProps) {
  const blueTeamParticipants = match.participants.filter(
    (p) => p.teamId === '100',
  )
  const redTeamParticipants = match.participants.filter(
    (p) => p.teamId === '200',
  )

  const blueTeamTotalKills = blueTeamParticipants.reduce(
    (total, val) => (total += val.kills),
    0,
  )

  const redTeamTotalKills = redTeamParticipants.reduce(
    (total, val) => (total += val.kills),
    0,
  )

  return (
    <div className="bg-[linear-gradient(90deg,_#101d35_0%,_#0b1020_45%,_#1a1020_75%,_#24101f_100%)] w-full h-32 flex items-center justify-between my-8 px-8 py-4 rounded-lg">
      <div>
        <span className="border border-gray-700 px-2 py-1 rounded-sm text-xs bg-gray-800">
          {match.queueId === 420 ? 'Ranked Solo Duo' : 'Ranked Flex'}
        </span>
        <h1 className="font-bold text-2xl text-white mt-3">Summoner's Rift</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-300">{`${Math.floor(
            match.gameDuration / 60,
          )
            .toString()
            .padStart(2, '0')}:${Math.floor(match.gameDuration % 60)
            .toString()
            .padStart(2, '0')}`}</span>
          <span className="mx-2 text-2xl font-bold">&middot;</span>
          <span className="text-sm text-gray-300">
            Played {returnDateAgo(+match.gameEndTimestamp)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <h2 className="flex flex-col gap-1 justify-center items-center">
          <span className="text-3xl font-bold text-cyan-500">
            {blueTeamTotalKills}
          </span>
          <span className="text-xs uppercase text-cyan-600 font-bold">
            Blue Team
          </span>
        </h2>
        <span className="uppercase text-gray-400 font-bold text-lg">vs</span>
        <h2 className="flex flex-col gap-1 justify-center items-center">
          <span className="text-3xl font-bold text-red-300">
            {redTeamTotalKills}
          </span>
          <span className="text-xs uppercase text-red-400 font-bold">
            Red Team
          </span>
        </h2>
      </div>
      <div>
        <button>share</button>
        <button>replay</button>
      </div>
    </div>
  )
}
