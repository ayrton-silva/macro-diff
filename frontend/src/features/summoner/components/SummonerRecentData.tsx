import { cn } from '#/lib/utils';
import { useExistentMatch } from '../hooks/useExistentMatches'

interface Page {
    data: Match[];
    cursor: string;
}

interface MatchRecentDataCardProps {
    matchesData: {
        data: {
            pages: Page[];
        };
        status: string;
    };
    summonerId: string
}

interface Match {
    matchId: string,
    gameDuration: number,
    gameEndTimestamp: string,
    gameMode: string,
    gameType: string,
    platformId: string,
    queueId: number,
    participants: Participant[]
}

type Participant = {
    summonerId: string
    championName: string
    champLevel: number
    assists: number
    deaths: number
    kills: number
    lane: string
    teamPosition: string
    summoner1Id: number
    summoner2Id: number
    totalMinionsKilled: number
    totalDamageDealtToChampions: number
    wardsPlaced: number
    goldEarned: number
    riotIdGameName: string
    riotIdTagline: string
    item0: number
    item1: number
    item2: number
    item3: number
    item4: number
    item5: number
    item6: number
    perks: {
        statPerks: {
            defense: number
            flex: number
            offense: number
        }
        styles: [
            {
                selections: [
                    { perk: number },
                    { perk: number },
                    { perk: number },
                    { perk: number },
                ]
                style: number
            },
            {
                selections: [{ perk: number }, { perk: number }]
                style: number
            },
        ]
    }
    summoner: {
        gameName: string
        tagLine: string
        region: string
    }
    teamId: string
    win: boolean
}

export function SummonerRecentData({ matchesData, summonerId }: MatchRecentDataCardProps) {
    const laneData = {
        TOP: 0,
        JUNGLE: 0,
        MIDDLE: 0,
        BOTTOM: 0,
        UTILITY: 0,
    }
    if (matchesData.status == "success" && matchesData.data.pages) {
        matchesData.data.pages[0].data.forEach((p) => {
            const { status, data, error, isFetching } = useExistentMatch(p.matchId)

            if (status == 'success') {
                const summonerRecentData = data.participants.filter((p) => p.summonerId == summonerId);
                if (summonerRecentData[0].teamPosition == 'TOP') {
                    laneData.TOP++
                }
                if (summonerRecentData[0].teamPosition == 'JUNGLE') {
                    laneData.JUNGLE++
                }
                if (summonerRecentData[0].teamPosition == 'MIDDLE') {
                    laneData.MIDDLE++
                }
                if (summonerRecentData[0].teamPosition == 'BOTTOM') {
                    laneData.BOTTOM++
                }
                if (summonerRecentData[0].teamPosition == 'UTILITY') {
                    laneData.UTILITY++
                }

            }
        })
    }

    return (
        <div className="border border-gray-700 rounded-md bg-[#121826]">
            <div className='p-4 border-b-2 w-full'>
                <h2 className=" tracking-widest uppercase font-semibold text-gray-300 ml-1">Recent Maches</h2>
            </div>
            <div className='flex'>
                <div className='flex p-4 gap-4 items-end'>
                    <div className='flex flex-col gap-0.5 w-fit items-center' >
                        <p className='text-xs'>{laneData.TOP}</p>
                        <span className='w-6 bg-amber-400' style={{ height: `${laneData.TOP < 1 ? 4 : (1 + laneData.TOP)*10}px` }}></span>
                        <p className='text-xs mt-1'>Top</p>
                    </div>
                    <div className='flex flex-col w-fit items-center' >
                        <p className='text-xs'>{laneData.JUNGLE}</p>
                        <span className='w-6 bg-green-400' style={{ height: `${laneData.JUNGLE < 1 ? 4 : (1 + laneData.JUNGLE)*10}px` }}></span>
                        <p className='text-xs mt-1'>Jungle</p>
                    </div>
                    <div className='flex flex-col w-fit items-center' >
                        <p className='text-xs'>{laneData.MIDDLE}</p>
                        <span className='w-6 bg-cyan-400' style={{ height: `${laneData.MIDDLE < 1 ? 4 : (1 + laneData.MIDDLE)*10}px` }}></span>
                        <p className='text-xs mt-1'>Mid</p>
                    </div>
                    <div className='flex flex-col w-fit items-center' >
                        <p className='text-xs'>{laneData.BOTTOM}</p>
                        <span className='w-6 bg-red-400' style={{ height: `${laneData.BOTTOM < 1 ? 4 : (1 + laneData.BOTTOM)*10}px` }}></span>
                        <p className='text-xs mt-1'>Adc</p>
                    </div>
                    <div className='flex flex-col w-fit items-center' >
                        <p className='text-xs'>{laneData.UTILITY}</p>
                        <span className='w-6 bg-blue-400' style={{ height: `${laneData.UTILITY < 1 ? 4 : (1 + laneData.UTILITY)*10}px` }}></span>
                        <p className='text-xs mt-1'>Sup</p>
                    </div>
                </div>
            </div>

        </div>
    )
}