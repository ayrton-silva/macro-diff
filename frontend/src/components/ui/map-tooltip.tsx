import type { EventMarker } from "#/features/match/components/Map/MatchMap"
import * as React from "react"

type MapTooltipProps = {
    classProp?: string,
    eventData: EventMarker
}

function MapTooltip({ classProp, eventData }: MapTooltipProps) {
    return (
        <label
            data-slot="label"
            className={`absolute bg-gray-800 border-2 border-gray-900 rounded-sm p-2 w-24 text-center text-xs text-white z-50 ${classProp}`}>
            <p>
                {eventData?.type}
            </p>
          {/*<p>
                {eventData?.killerId}
            </p> */}
            <p>
                {eventData?.buildingType}
            </p>
            <p>
                {eventData?.monsterSubType}
            </p>
        </label>
    )
}

export { MapTooltip }
