import type {
  EventMarker,
  ParticipantMarker,
} from '#/features/match/components/Map/MatchMap'
import { capitalizeString, returnTime } from '#/shared/game/helpers'
import { SummonerPositionIcon } from '#/shared/game/SummonerPositionIcon'
import * as React from 'react'

type MapTooltipProps = {
  classProp?: string
  eventData?: EventMarker
  participant?: ParticipantMarker
}

const dragonColor = {
  'FIRE_DRAGON': 'text-red-500',
  'AIR_DRAGON': 'text-cyan-300',
  'WATER_DRAGON': 'text-emerald-500',
  'HEXTECH_DRAGON': 'text-cyan-500',
  'CHEMTECH_DRAGON': 'text-green-500',
  'EARTH_DRAGON': 'text-amber-700'
}

function MapTooltip({ classProp, eventData, participant }: MapTooltipProps) {
  return (
    <label
      data-slot="label"
      className={`absolute bg-gray-800 border-2 border-gray-900 rounded-sm p-1 w-fit text-center text-[10px] text-white z-50 ${classProp}`}
    >
      {participant && (
        <div className="flex flex-col items-center align-middle text-nowrap gap-1">
          <p className="flex justify-between border-b-2 items-center w-full border-gray-700">
            <SummonerPositionIcon
              teamPosition={participant?.teamPosition}
              customClass="size-6"
            />
            <span className="text-sm">
              {participant?.kills}/
              <span className="text-red-500">{participant?.deaths}</span>/
              {participant?.assists}
            </span>
          </p>
          <div className="flex flex-col items-start align-baseline">
            <p>Name: {participant?.gameName}</p>
            <p>Champion: {participant.champion}</p>
            <div className="flex p-1 w-full justify-between mt-1 items-center border-t-2 border-dashed border-gray-700">
              <div className="flex gap-0.5 text-amber-400">
                <img
                  className="size-3"
                  src="/assets/Gold_icon.svg"
                  alt="Gold coin symbol"
                />
                {participant.currentGold}
              </div>

              <span>CS: {participant.minionsKilled+participant.jungleMinionsKilled}</span>
            </div>
          </div>
        </div>
      )}
      {eventData?.type == 'ELITE_MONSTER_KILL' && (
        <div className="flex flex-col items-center align-baseline text-nowrap">
          <p className={`${eventData?.teamId == 100 ? 'text-cyan-500' : 'text-red-500'}`}>{eventData?.teamId == 100 ? 'Blue Team':'Red Team'}</p>
          <p>Secured</p>
          <p className='text-purple-500'>{eventData?.monsterType == 'BARON_NASHOR' && capitalizeString(eventData?.monsterType?.toLowerCase().split('_')[0])+" "+capitalizeString(eventData?.monsterType?.toLowerCase().split('_')[1])}</p>
          <p className='text-purple-500'>{eventData?.monsterType != 'DRAGON' && eventData?.monsterType != 'BARON_NASHOR' ? eventData?.monsterType && capitalizeString(eventData?.monsterType) : ''}</p>
          <p className={`${eventData.monsterSubType && dragonColor[eventData.monsterSubType]}`}>{eventData?.monsterSubType ? eventData?.monsterSubType && capitalizeString(eventData?.monsterSubType?.toLowerCase().split('_')[0])+" "+capitalizeString(eventData?.monsterSubType?.toLowerCase().split('_')[1]) : ''}</p>
          <div className="flex w-full items-center justify-center self-center align-middle border-t-2 border-dashed border-gray-700">
          {eventData?.timestamp && returnTime(eventData?.timestamp)}
          </div>
        </div>
      )}
      {eventData?.type == 'BUILDING_KILL' && (
        <div className="flex flex-col items-center align-baseline text-nowrap">
          <p className={`${eventData?.teamId == 100 ? 'text-red-500':'text-cyan-500'}`}>{eventData?.teamId == 100 ? 'Red Team': 'Blue Team'}</p>
          <p>Secured</p>
          <p className={`${eventData?.teamId == 200 ? 'text-red-500':'text-cyan-500'}`}>{eventData?.towerType && capitalizeString(eventData?.towerType?.toLowerCase().split('_')[0])+" "+capitalizeString(eventData?.towerType?.toLowerCase().split('_')[1])}</p>
          <p className={`${eventData?.teamId == 200 ? 'text-red-500':'text-cyan-500'}`}>{eventData?.buildingType == 'INHIBITOR_BUILDING' ? 'Inhibitor':''}</p>
          <div className="flex w-full items-center justify-center self-center align-middle border-t-2 border-dashed border-gray-700">
          {eventData?.timestamp && returnTime(eventData?.timestamp)}
          </div>
        </div>
      )}
      {eventData?.type == 'CHAMPION_KILL' && (
        <div className="flex flex-col items-center align-baseline text-nowrap">
          <p>{eventData?.killerName}</p>
          <p className='text-red-300'>killed</p>
          <p className='text-gray-300'>{eventData?.victimName}</p>
          <div className="flex w-full items-center justify-center self-center align-middle border-t-2 border-dashed border-gray-700">
          {eventData?.timestamp && returnTime(eventData?.timestamp)}
          </div>
        </div>
      )}
    </label>
  )
}

export { MapTooltip }
