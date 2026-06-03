import { cn } from '#/lib/utils'
import { RefreshCcw } from 'lucide-react'
import type { SetStateAction } from 'react'
import { Range, getTrackBackground } from 'react-range'

type MatchTimelineProps = {
  min: number
  max: number
  values: [number]
  setValues: SetStateAction<[number]>
}

export function MatchTimeline({
  min,
  max,
  values,
  setValues,
}: MatchTimelineProps) {
  const STEP = 60000
  const MIN = min
  const MAX = max

  function calculateLabelPosition() {
    const intervals = Math.floor(max / (5 * 60000))
    return intervals
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="mb-6 tracking-widest uppercase font-semibold text-gray-300 mt-4 ml-2">
          Timeline Filter
        </h2>
        <div className="flex justify-between items-center gap-3">
          <button
            className={cn(
              'px-2 py-1 border border-gray-700 bg-gray-800 cursor-pointer rounded-md',
              values[0] < 15 * 60000 && 'bg-cyan-600',
            )}
            onClick={() => setValues([5 * 60000])}
          >
            Early (0-15)
          </button>
          <button
            className={cn(
              'px-2 py-1 border border-gray-700 bg-gray-800 cursor-pointer rounded-md',
              values[0] >= 15 * 60000 &&
                values[0] < 20 * 60000 &&
                'bg-cyan-600',
            )}
            onClick={() => setValues([15 * 60000])}
          >
            Mid (15-20)
          </button>
          <button
            className={cn(
              'px-2 py-1 border border-gray-700 bg-gray-800 cursor-pointer rounded-md',
              values[0] >= 20 * 60000 && 'bg-cyan-600',
            )}
            onClick={() => setValues([20 * 60000])}
          >
            Late (20+)
          </button>
        </div>
      </div>
      <div
        className="mx-6"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => {
            setValues(values)
          }}
          renderTrack={({ props, children }) => (
            <>
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '5px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                      values,
                      colors: ['#0092B8', '#364153'],
                      min: MIN,
                      max: MAX,
                    }),
                    alignSelf: 'center',
                  }}
                >
                  {children}
                </div>
              </div>
              <div className="flex justify-between w-full relative">
                {Array.from({ length: calculateLabelPosition() + 1 }).map(
                  (a, i) => (
                    <div
                      className="absolute -bottom-7 -ml-3 text-xs whitespace-nowrap"
                      style={{
                        left: `${((i * 5) / (max / 60000)) * 100}%`,
                      }}
                    >
                      {i * 5}:00
                    </div>
                  ),
                )}
                <div
                  className="absolute -bottom-7 -ml-3 text-xs text-nowrap"
                  style={{
                    left: '100%',
                  }}
                >
                  {(max / 1000 / 60).toFixed(0)}:00
                </div>
              </div>
            </>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              key={props.key}
              className="w-6 h-6 border-[3px] border-cyan-600 rounded-full bg-white"
            ></div>
          )}
        />
      </div>
      <div className="flex justify-between items-center w-full mt-14">
        <div>
          <span className="mr-2">Showing:</span>
          <output className="text-cyan-400" id="output">
            {(values[0] / 1000 / 60).toFixed(0)}:00
          </output>
        </div>
        <button
          className="flex gap-2 items-center px-3 py-2 border border-gray-700 bg-gray-800 cursor-pointer rounded-md"
          onClick={() => setValues([min])}
        >
          <RefreshCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  )
}
