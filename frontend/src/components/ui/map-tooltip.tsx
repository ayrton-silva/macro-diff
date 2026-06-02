import type { EventMarker, ParticipantMarker } from "#/features/match/components/Map/MatchMap"
import { returnTime } from "#/shared/game/helpers"
import * as React from "react"

type MapTooltipProps = {
    classProp?: string,
    eventData?: EventMarker
    participant?: ParticipantMarker
}

function MapTooltip({ classProp, eventData, participant }: MapTooltipProps) {
    return (
        <label
            data-slot="label"
            className={`absolute bg-gray-800 border-2 border-gray-900 rounded-sm p-2 w-24 text-center text-xs text-white z-50 ${classProp}`}>
            <div>
                <p>
                {eventData?.type}
                {participant && participant.champion}
            </p>
{/*           <p>
                {eventData?.killerId}
            </p>
          <p>
                {eventData?.victimId}
            </p> */}
            <p>
                {eventData?.buildingType}
            </p>
            <p>
                {eventData?.monsterSubType}
            </p>
            <p>
                {returnTime(eventData?.timestamp)}
            </p>
            </div>
        </label>
    )
}

export { MapTooltip }
