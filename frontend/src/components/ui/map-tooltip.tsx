import type {
  EventMarker,
  ParticipantMarker,
} from '#/features/match/components/Map/MatchMap'
import { returnTime } from '#/shared/game/helpers'
import { SummonerPositionIcon } from '#/shared/game/SummonerPositionIcon'
import * as React from 'react'

type MapTooltipProps = {
  classProp?: string
  eventData?: EventMarker
  participant?: ParticipantMarker
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
          <p>{eventData?.type}</p>
          <p>{eventData?.monsterSubType}</p>
          <p>{eventData?.timestamp && returnTime(eventData?.timestamp)}</p>
        </div>
      )}
      {eventData?.type == 'BUILDING_KILL' && (
        <div className="flex flex-col items-center align-baseline text-nowrap">
          <p>{eventData?.type}</p>
          <p>{eventData?.buildingType}</p>
          <p>{eventData?.timestamp && returnTime(eventData?.timestamp)}</p>
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
