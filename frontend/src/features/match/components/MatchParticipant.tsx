import { ChampionIcon } from '@/shared/game/ChampionIcon'
import { SummonerSpellIcon } from '@/shared/game/SummonerSpellIcon'
import { ItemIcon } from '@/shared/game/ItemIcon'
import type { Participant } from '@/shared/game/MatchEvent/types'
import { SummonerPositionIcon } from '#/shared/game/SummonerPositionIcon'
import { calculateKDA } from '#/shared/game/helpers'

interface ParticipantProps {
  participant: Participant
}

export function MatchParticipant({ participant }: ParticipantProps) {
  return (
    <div className="bg-transparent text-white">
      <div className="flex justify-between">
        <div className='flex gap-4'>
          <div className="flex items-center justify-center gap-2">
            <div className="w-fit">
              <ChampionIcon
                icon={participant.championName}
                level={participant.champLevel}
                classProp={`rounded-full border-2 ${participant.teamId == 100 ? "border-cyan-400" : "border-red-400"}`}
              />
            </div>
            <div>
              <SummonerPositionIcon teamPosition={participant.teamPosition} customClass='size-6' />
            </div>
            <div>
              <SummonerSpellIcon summonerSpellKey={participant.summoner1Id} />
              <SummonerSpellIcon summonerSpellKey={participant.summoner2Id} />
            </div>
          </div>
          <div>
            <div className="flex gap-1">
              <ItemIcon itemKey={participant.item0} />
              <ItemIcon itemKey={participant.item1} />
              <ItemIcon itemKey={participant.item2} />
              <ItemIcon itemKey={participant.item6} />
            </div>
            <div className="flex gap-1">
              <ItemIcon itemKey={participant.item3} />
              <ItemIcon itemKey={participant.item4} />
              <ItemIcon itemKey={participant.item5} />

            </div>
          </div>
        </div>

        <div className='flex flex-col items-end justify-center'>
          <p className="gap-1 font-bold">
            <span>{participant.kills}</span>
            <span>/</span>
            <span className='text-red-400'>{participant.deaths}</span>
            <span>/</span>
            <span>{participant.assists}</span>
          </p>
          <p className="flex text-xs text-gray-400 font-semibold space-x-1">
            <span>{calculateKDA(participant.kills, participant.assists, participant.deaths)}:1 KDA</span>
            <span>-</span>
            <span>CS: {participant.totalMinionsKilled}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
