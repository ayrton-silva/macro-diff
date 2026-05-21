import { ChampionIcon } from '@/shared/game/ChampionIcon'
import { SummonerSpellIcon } from '@/shared/game/SummonerSpellIcon'
import { ItemIcon } from '@/shared/game/ItemIcon'
import type { MatchEvent, Participant, ParticipantFrames } from '@/shared/game/MatchEvent/types'
import { SummonerPositionIcon } from '#/shared/game/SummonerPositionIcon'
import { calculateKDA } from '#/shared/game/helpers'
import { SummonerPerkIcon } from '#/shared/game/SummonerPerksIcon'

interface ParticipantProps {
  participant: Participant
  events: MatchEvent[]
  participantFrames: ParticipantFrames[]
  timelineValues: [number, number]
}

export function MatchParticipant({ 
  participant, 
  events,
  participantFrames,
  timelineValues 
}: ParticipantProps) {
  const currentMinionsKilled = participantFrames?.filter((z)=> z.participantPuuid == participant.summonerId && z.timestamp >=  timelineValues[0] && z.timestamp <= timelineValues[1])
    .map((b)=> b.minionsKilled)[participantFrames?.filter((z)=> z.participantPuuid == participant.summonerId && z.timestamp >=  timelineValues[0] && z.timestamp <= timelineValues[1])
    .map((b)=> b.minionsKilled).length-1]
  
  const kills = events?.filter((z)=> z.killerId == participant.summonerId && z.type == "CHAMPION_KILL" && z.timestamp <= timelineValues[1])
    .reduce((total)=> total+=1,0)
  const deaths = events?.filter((z)=> z.victimId == participant.summonerId && z.type == "CHAMPION_KILL" && z.timestamp <= timelineValues[1])
    .reduce((total)=> total+=1,0)
  const assists = events?.filter((z)=> z.type == "CHAMPION_KILL" && z.timestamp <= timelineValues[1]).filter((p)=> p.assistingParticipantIds.indexOf(participant.summonerId) != -1)
    .reduce((total)=> total+=1,0)

  const currentLevel = participantFrames?.filter((z)=> z.participantPuuid == participant.summonerId && z.timestamp >=  timelineValues[0] && z.timestamp <= timelineValues[1]).sort((a,b)=> b.level-a.level).map((c)=> c.level)[0]

  const items:number[] = []
  events?.filter((z)=> z.participantPuuid == participant.summonerId && z.type == "ITEM_PURCHASED" && z.timestamp <= timelineValues[1]).forEach((b)=> items.push(b.itemId!))
  events?.filter((z)=> z.participantPuuid == participant.summonerId && z.type == "ITEM_DESTROYED" && z.timestamp <= timelineValues[1]).forEach((b)=> items.splice(items.indexOf(b.itemId!),1))
  // events?.filter((z)=> z.participantPuuid == participant.summonerId && z.type == "ITEM_SOLD" && z.timestamp <= timelineValues[1]).forEach((b)=> items.splice(items.indexOf(b.itemId),1))
  // events?.filter((z)=> z.participantPuuid == participant.summonerId && z.type == "ITEM_UNDO" && z.timestamp <= timelineValues[1]).forEach((b)=> items.splice(items.indexOf(b.itemId),1))

  console.log(items)
  return (
    <div className="bg-transparent text-white mb-1">
      {participant.teamId == 100 ?
        <div className="flex justify-between">
          <div className='flex gap-4'>
            <div className="flex items-center justify-center gap-2">
              <div>
                <SummonerPositionIcon teamPosition={participant.teamPosition} customClass='size-6' />
              </div>
              <div className="w-fit">
                <ChampionIcon
                  icon={participant.championName}
                  level={currentLevel ? currentLevel : participant.champLevel}
                  classProp={`rounded-full border-2 border-cyan-400`}
                />
              </div>

              <div className='flex gap-0.5'>
                <div>
                  <SummonerSpellIcon summonerSpellKey={participant.summoner1Id} />
                  <SummonerSpellIcon summonerSpellKey={participant.summoner2Id} />
                </div>
                <div>
                  <SummonerPerkIcon summonerPerkKey={participant.perksPrimaryStyleSelection0} />
                  <SummonerPerkIcon summonerPerkKey={participant.perksSubStyle} customClass='size-5' />
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-1">
                {items.map((a)=> <ItemIcon itemKey={a} />)}
{/*                 <ItemIcon itemKey={participant.item0} />
                <ItemIcon itemKey={participant.item1} />
                <ItemIcon itemKey={participant.item2} />
                <ItemIcon itemKey={participant.item6} />
              </div>
              <div className="flex gap-1">
                <ItemIcon itemKey={participant.item3} />
                <ItemIcon itemKey={participant.item4} />
                <ItemIcon itemKey={participant.item5} /> */}

              </div>
            </div>
          </div>

          <div className='flex flex-col items-end justify-center'>
            <p className="gap-1 font-bold">
              <span>{kills}</span>
              <span>/</span>
              <span className='text-red-400'>{deaths}</span>
              <span>/</span>
              <span>{assists}</span>
            </p>
            <p className="flex text-xs text-gray-400 font-semibold space-x-1">
              <span>{calculateKDA(kills, assists, deaths)}:1 KDA</span>
              <span>-</span>
              <span>CS: {currentMinionsKilled}</span>
            </p>
          </div>
        </div>
        :
        <div className="flex gap-2">
          <div className='flex justify-between w-full'>
            <div className='flex flex-col items-baseline justify-center'>
              <p className="font-bold">
                <span>{kills}</span>
                <span>/</span>
                <span className='text-red-400'>{deaths}</span>
                <span>/</span>
                <span>{assists}</span>
              </p>
              <p className="flex text-xs text-gray-400 font-semibold space-x-1">
                <span>{calculateKDA(kills, assists, deaths)}:1 KDA</span>
                <span>-</span>
                <span>CS: {currentMinionsKilled}
                </span>
              </p>
            </div>
            <div>
              <div className="flex flex-wrap gap-1">
                            {items.map((a)=> <ItemIcon itemKey={a} />)}
{/*                 <ItemIcon itemKey={participant.item0} />
                <ItemIcon itemKey={participant.item1} />
                <ItemIcon itemKey={participant.item2} />
                <ItemIcon itemKey={participant.item6} />
              </div>
              <div className="flex gap-1">
                <ItemIcon itemKey={participant.item3} />
                <ItemIcon itemKey={participant.item4} />
                <ItemIcon itemKey={participant.item5} /> */}

              </div>
            </div>
          </div>
          <div className="flex items-center gap-0.5 ml-2">
            <div>
              <SummonerPerkIcon summonerPerkKey={participant.perksPrimaryStyleSelection0} />
              <SummonerPerkIcon summonerPerkKey={participant.perksSubStyle} customClass='size-5' />
            </div>
            <div>
              <SummonerSpellIcon summonerSpellKey={participant.summoner1Id} />
              <SummonerSpellIcon summonerSpellKey={participant.summoner2Id} />
            </div>
          </div>

          <div className="w-fit">
            <ChampionIcon
              icon={participant.championName}
              level={currentLevel ? currentLevel : participant.champLevel}
              classProp={`rounded-full border-2 border-red-400`}
            />
          </div>
          <div className='flex items-center'>
            <SummonerPositionIcon teamPosition={participant.teamPosition} customClass='size-6' />
          </div>
        </div>}
    </div>
  )
}
