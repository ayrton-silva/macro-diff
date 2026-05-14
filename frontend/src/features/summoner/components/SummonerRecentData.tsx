import { useCallback, useEffect, useRef, useState } from 'react'
import { MatchDataCollector } from './MatchDataCollector'
import type { Participant } from '#/shared/game/MatchEvent/types'
import { ChampionIcon } from '#/shared/game/ChampionIcon'

interface Page {
  data: Match[]
  cursor: string
}

interface MatchRecentDataCardProps {
  matchesData: {
    data: {
      pages: Page[]
    }
    status: string
  }
  summonerId: string
}

interface Match {
  matchId: string
  gameDuration: number
  gameEndTimestamp: string
  gameMode: string
  gameType: string
  platformId: string
  queueId: number
  participants: Participant[]
}

export function SummonerRecentData({
  matchesData,
  summonerId,
}: MatchRecentDataCardProps) {
  const [laneData, setLaneData] = useState({
    TOP: 0,
    JUNGLE: 0,
    MIDDLE: 0,
    BOTTOM: 0,
    UTILITY: 0,
  })
  const [winLoseData, setWinLoseData] = useState({
    WIN: 0,
    LOSE: 0,
  })
  const [championData, setChampionData] = useState<(string | null)[]>([])

  const allMatches = matchesData.data?.pages.flatMap((page) => page.data) ?? []

  const processedMatchesRef = useRef(new Set<string>())

  useEffect(() => {
    processedMatchesRef.current = new Set()
    setChampionData([])
    setLaneData({ TOP: 0, JUNGLE: 0, MIDDLE: 0, BOTTOM: 0, UTILITY: 0 })
    setWinLoseData({ WIN: 0, LOSE: 0 })
  }, [allMatches.length])

  const handleMatchData = useCallback((matchId: string | null,position: string | null, winLose: boolean | null, champion: string | null) => {
  if (!position || !(position in laneData)) return
  if (!matchId || processedMatchesRef.current.has(matchId)) return

    processedMatchesRef.current.add(matchId)

    const winLoseKey = winLose ? 'WIN' : 'LOSE'
    
    setLaneData((prev) => ({
      ...prev,
      [position]: prev[position as keyof typeof prev] + 1,
    }))
    setChampionData(prev => [...prev, champion]);
    setWinLoseData((prev) => ({
      ...prev,
      [winLoseKey]: prev[winLoseKey as keyof typeof prev] + 1,
    }))
  }, [allMatches])

  function calculateChampionRank() {
    const championsMap = new Map()
    if(!championData.length) return
    championData.forEach((data)=>{
      championsMap.set(data, (championsMap.get(data) ?? 0) + 1)
    })
    const top = [...championsMap.entries()].sort((a,b)=> b[1]-a[1])

    const response = []
    for (let i = 0; i < 3; i++) {
      if (!top[i]) {
        response.push(['champion', 0])
      } else {
        response.push(top[i])
      }
    }
    return response
  }


function calculateLaneMaxHeight() {
  const max = 72

  const highest = Math.max(...Object.values(laneData))

  if (highest === 0) {
    return {
      TOP: 0,
      JUNGLE: 0,
      MIDDLE: 0,
      BOTTOM: 0,
      UTILITY: 0,
    }
  }

  const ratio = max / highest

  return {
    TOP: laneData.TOP * ratio,
    JUNGLE: laneData.JUNGLE * ratio,
    MIDDLE: laneData.MIDDLE * ratio,
    BOTTOM: laneData.BOTTOM * ratio,
    UTILITY: laneData.UTILITY * ratio,
  }
}
  function calculateWinLoseMaxSize() {
    const max = 180
    const total = winLoseData.WIN + winLoseData.LOSE
    if (total === 0) return { 
      WIN: 0, 
      LOSE: 0,
    }
    const ratio = max / total

    const response = {
      WIN: ratio * winLoseData.WIN,
      LOSE: ratio * winLoseData.LOSE,
    }
    return response
  }
  function calculateWinRate() {
    return Math.floor((calculateWinLoseMaxSize().WIN/(calculateWinLoseMaxSize().LOSE+calculateWinLoseMaxSize().WIN))*100)
  }
  return (
    <>
      {allMatches.map(({ matchId }) => (
        <MatchDataCollector
          key={matchId}
          matchId={matchId}
          summonerId={summonerId}
          onData={handleMatchData}
        />
      ))}
      <div className="border border-gray-700 rounded-md bg-[#121826] h-53">
        <div className="p-4 border-b-2 w-full">
          <h2 className=" tracking-widest uppercase font-semibold text-gray-300 ml-1">
            Recent Matches: <span className='text-cyan-400'>{allMatches.length}</span>
          </h2>
        </div>
        <div className="flex p-4 gap-4">
          <div className="flex flex-col ">
            <div className='flex'>
            <p className='tracking-widest uppercase font-semibold text-xs text-gray-300'>Win Rate: </p>
            <p className={calculateWinRate() < 51 ? "text-red-400 text-base -mt-1 ml-1": "text-green-400 text-base -mt-1 ml-1"}>{calculateWinRate()}%</p>
            </div>
          <div className="flex w-fit items-center mt-7">
            <p className="text-xs">Win</p>
            <div className="flex w-fit items-center mx-2 gap-0.5">
              <span
                className="flex items-center justify-center w-12 bg-green-400  rounded-l-sm border-2 border-green-500"
                style={{
                  width: `${winLoseData.WIN < 1 ? 16 : calculateWinLoseMaxSize().WIN}px`,
                }}
              >
                <p className="text-md text-black font-semibold">{winLoseData.WIN}</p>
              </span>
                            <span
                className="flex items-center justify-center w-12 bg-red-400 rounded-r-sm border-2 border-red-500"
                style={{
                  width: `${winLoseData.LOSE < 1 ? 16 : calculateWinLoseMaxSize().LOSE}px`,
                }}
              >
                <p className="text-md text-black font-semibold">{winLoseData.LOSE}</p>
              </span>
              <p className="text-xs ml-1">Lose</p>
            </div>
            </div>
          </div>
          <div className="flex flex-col border-l-2 justify-between">
            <h3 className='tracking-widest uppercase font-semibold ml-4 text-xs text-gray-300'>Roles:</h3>
            <div className='flex gap-4 items-end '>
            <div className="flex flex-col w-fit items-center ml-6">
              <p className="text-xs">{laneData.TOP}</p>
              <span
                className="w-6 rounded-sm bg-amber-400"
                style={{
                  height: `${laneData.TOP < 1 ? 4 : calculateLaneMaxHeight().TOP}px`,
                }}
              ></span>
              <p className="text-xs mt-1">Top</p>
            </div>
            <div className="flex flex-col w-fit items-center">
              <p className="text-xs">{laneData.JUNGLE}</p>
              <span
                className="w-6 rounded-sm bg-green-400"
                style={{
                  height: `${laneData.JUNGLE < 1 ? 4 : calculateLaneMaxHeight().JUNGLE}px`,
                }}
              ></span>
              <p className="text-xs mt-1">Jungle</p>
            </div>
            <div className="flex flex-col w-fit items-center">
              <p className="text-xs">{laneData.MIDDLE}</p>
              <span
                className="w-6 rounded-sm bg-cyan-400"
                style={{
                  height: `${laneData.MIDDLE < 1 ? 4 : calculateLaneMaxHeight().MIDDLE}px`,
                }}
              ></span>
              <p className="text-xs mt-1">Mid</p>
            </div>
            <div className="flex flex-col w-fit items-center">
              <p className="text-xs">{laneData.BOTTOM}</p>
              <span
                className="w-6 rounded-sm bg-red-400"
                style={{
                  height: `${laneData.BOTTOM < 1 ? 4 : calculateLaneMaxHeight().BOTTOM}px`,
                }}
              ></span>
              <p className="text-xs mt-1">Adc</p>
            </div>
            <div className="flex flex-col w-fit items-center">
              <p className="text-xs">{laneData.UTILITY}</p>
              <span
                className="w-6 rounded-sm bg-blue-500"
                style={{
                  height: `${laneData.UTILITY < 1 ? 4 : calculateLaneMaxHeight().UTILITY}px`,
                }}
              ></span>
              <p className="text-xs mt-1">Sup</p>
            </div>
            </div>
          </div>
          <div className='flex flex-col ml-6 border-l-2 justify-between'>
            <h3 className='tracking-widest uppercase font-semibold ml-4 text-xs text-gray-300'>Top 3 Played Champions:</h3>
            <div className='flex ml-6'>
              {calculateChampionRank()?.map((data)=> 
                <div className="flex mx-2 items-center justify-center">
                  <div className="flex flex-col w-fit items-center">
                    {data[0] == "champion" ? "" : <p className="text-xs">{data[0]}</p> }
                    <div className='flex'>
                    <ChampionIcon
                      icon={data[0]}
                      classProp='rounded-full border-2'
                      removeLevel={true}
                    />
                    </div>
                    {data[1] ? <p className="text-xs">{data[1]}</p>: ""}
                  </div>
                </div>
              )}
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
