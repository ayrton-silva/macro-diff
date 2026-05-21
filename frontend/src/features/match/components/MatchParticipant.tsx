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

function getUpgradedBoots(itemId: number) {
  let isUpgraded = false;
  let value = 0
  switch (itemId) {
    case  3008 : 
    value = 3168
    isUpgraded =true
      break;
    case  3009 : 
    value = 3170
    isUpgraded =true
      break;
    case  3158 : 
    value = 3171
    isUpgraded =true
      break;
    case  3006 : 
    value = 3172
    isUpgraded =true
      break;
    case  3111 : 
    value = 3173
    isUpgraded =true
      break;
    case  3047 : 
    value = 3174
    isUpgraded =true
      break;
    case  3020 : 
    value = 3175
    isUpgraded =true
      break;
    default: 
    value = itemId
    isUpgraded =false
      break;
  }
  return {"value":value, "isUpgraded":isUpgraded}
}

export function MatchParticipant({ 
  participant, 
  events,
  participantFrames,
  timelineValues 
}: ParticipantProps) {
  const currentMinionsKilled = participantFrames?.filter((z)=> z.participantPuuid == participant.summonerId &&  z.timestamp <= timelineValues[1])
    .map((b)=> b.minionsKilled)[participantFrames?.filter((z)=> z.participantPuuid == participant.summonerId &&  z.timestamp <= timelineValues[1])
    .map((b)=> b.minionsKilled).length-1]
  
  const kills = events?.filter((z)=> z.killerId == participant.summonerId && z.type == "CHAMPION_KILL" && z.timestamp <= timelineValues[1])
    .reduce((total)=> total+=1,0)
  const deaths = events?.filter((z)=> z.victimId == participant.summonerId && z.type == "CHAMPION_KILL" && z.timestamp <= timelineValues[1])
    .reduce((total)=> total+=1,0)
  const assists = events?.filter((z)=> z.type == "CHAMPION_KILL" && z.timestamp <= timelineValues[1]).filter((p)=> p.assistingParticipantIds.indexOf(participant.summonerId) != -1)
    .reduce((total)=> total+=1,0)

  const currentLevel = participantFrames?.filter((z)=> z.participantPuuid == participant.summonerId &&  z.timestamp <= timelineValues[1]).sort((a,b)=> b.level-a.level).map((c)=> c.level)[0]

  const items:number[] = []

  const byParticipantAndTime = (type: string) => (z: typeof events[0]) =>
    z.participantPuuid === participant.summonerId &&
    z.type === type &&
    z.timestamp <= timelineValues[1]

  const safeRemove = (itemId: number) => {
    const idx = items.indexOf(itemId)
    if (idx !== -1) items.splice(idx, 1)
  }
  const undoItem = (beforeId:number, afterId:number) => {
    safeRemove(beforeId)
    if( afterId > 0){
      items.push(afterId)
    }
  }

  events?.filter(byParticipantAndTime("ITEM_PURCHASED"))
    .forEach((b) => items.push(b.itemId!))

  events?.filter(byParticipantAndTime("ITEM_DESTROYED"))
    .forEach((b) => {safeRemove(b.itemId!)})

  events?.filter(byParticipantAndTime("ITEM_SOLD"))
    .forEach((b) => safeRemove(b.itemId!)) 

  events?.filter(byParticipantAndTime("ITEM_UNDO"))
    .forEach((b) => undoItem(b.beforeId!, b.afterId!)) 

  events?.filter((z) =>
    z.participantPuuid === participant.summonerId &&
    z.itemId &&
    z.type === "ITEM_DESTROYED" &&
    z.timestamp <= timelineValues[1] &&
    getUpgradedBoots(z.itemId).isUpgraded === true
  ).forEach((b) => items.push(getUpgradedBoots(b.itemId!).value))

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
                <div className='flex mb-4'>
                {items.map((a)=> <ItemIcon itemKey={a} />)}
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
              <span>CS: {currentMinionsKilled ? currentMinionsKilled : participant.totalMinionsKilled}</span>
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
                <span>CS: {currentMinionsKilled ? currentMinionsKilled : participant.totalMinionsKilled}
                </span>
              </p>
            </div>
            <div>
                <div className='flex mb-4'>
                {items.map((a)=> <ItemIcon itemKey={a} />)}
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
