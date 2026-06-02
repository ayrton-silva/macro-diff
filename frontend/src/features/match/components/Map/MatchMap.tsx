'use client'

import { MapTooltip } from '#/components/ui/map-tooltip'
import { ChampionIcon } from '#/shared/game/ChampionIcon'

export type EventMarker = {
  eventId: number,
  type: string
  timestamp?: number,
  monsterType?:string
  monsterSubType?: string
  positionx?:number
  positiony?:number
  icon?: string
  assistingParticipantIds:[]
  buildingType?:string
  creatorId?:string
  killType?:string
  killerId?:string
  multiKillLength?:number
  participantPuuid?:string
  teamId?:number
  towerType?:string
  victimId?:string
  wardType?:string
}

export type ParticipantMarker = {
  positionX: number
  positionY: number
  champion: string
  kills: number
  deaths: number
  assists: number
  gameName:string
  teamPosition:string
  summonerId:string
  teamId: number
  level: number
}

type MatchMapProps = {
  participants: ParticipantMarker[]
  events: EventMarker[]
  currentTimestamp: number[]
}

const MIN_X = -2250
const MAX_X = 16970
const MIN_Y = -1100
const MAX_Y = 15870

export function MatchMap({ participants, events, currentTimestamp }: MatchMapProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div className="rounded-md w-260">
        <img
          className="w-260 h-auto block"
          src="/public/assets/Summoner's_Rift_Update_Mapv2.png"
          alt="Summoner's Rift Map"
        />
      </div>
      {events.map((p, index) => ( p.positionx && p.positiony &&
        <div 
          key={index}
          className={`absolute group transition-all transition-discrete duration-1000 -translate-x-1/2 -translate-y-1/2 z-10 hover:z-50 ${p.timestamp+120000 < currentTimestamp[0] ? "hidden opacity-0 scale-95":""}`}
          style={{
            left: `${((p.positionx - MIN_X) / (MAX_X - MIN_X)) * 100}%`,
            top: `${100 - ((p.positiony - MIN_Y) / (MAX_Y - MIN_Y)) * 100}%`,
          }}
        >
        <MapTooltip 
          eventData={p} 
          classProp="bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block" 
        />
        <span className="block text-3xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-150">
          {p.type === "CHAMPION_KILL" ? "💀" : p.monsterType === "DRAGON" ? "🐉" : p.type === "BUILDING_KILL" ? "❌" : p.type === "WARD_PLACED" ? "🌱" : ""}
        </span>
        </div>
      ))}
      {participants.map((p, index) => (
        p.positionX && p.positionY &&
        <div 
          key={index}
          className={`absolute group transition-all transition-discrete duration-1000 -translate-x-1/2 -translate-y-1/2 z-10 hover:z-50 ${p.timestamp+120000 < currentTimestamp[0] ? "hidden opacity-0 scale-95":""}`}
          style={{
            left: `${((p.positionX - MIN_X) / (MAX_X - MIN_X)) * 100}%`,
            top: `${100 - ((p.positionY - MIN_Y) / (MAX_Y - MIN_Y)) * 100}%`,
          }}
        >
        <span
          className="absolute text-4xl -translate-x-1/2 -translate-y-1/2 z-20"
        >
        <MapTooltip 
          participant={p} 
          classProp="bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block" 
        />
          <ChampionIcon
            icon={p.champion}
            removeLevel
            classProp="rounded-full border-2 border-black"
          />
        </span>
        </div>
      ))}
    </div>
  )
}