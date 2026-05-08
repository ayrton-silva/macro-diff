import { z } from 'zod'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useSummoner } from '@/features/summoner/hooks/useSummoner'
import { SummonerHeader } from '@/features/summoner/components/SummonerHeader'
import { SummonerMatchCard } from '@/features/summoner/components/SummonerMatchCard'
import { SummonerRankCard } from '@/features/summoner/components/SummonerRankCard'
import { useExistentMatches } from '@/features/summoner/hooks/useExistentMatches'
import { LoadMoreMatchesButton } from '#/features/summoner/components/LoadMoreMatchesButton'

const summonerSearchSchema = z.object({
  gameName: z.string().default(''),
  region: z.string().default(''),
  tagLine: z.string().default(''),
})

export const Route = createFileRoute('/summoner')({
  component: RouteComponent,
  validateSearch: summonerSearchSchema,
})

function RouteComponent() {
  const { gameName, tagLine, region } = useSearch({
    from: Route.fullPath,
  })

  const { status, data, error, isFetching } = useSummoner({
    gameName,
    tagLine,
    region,
  })

  const {
    status: statusMatches,
    data: dataMatches,
    error: errorMatches,
    isFetching: isFetchingMatches,
  } = useExistentMatches({ puuid: data?.id })

  console.log('matches', dataMatches)
  console.log('skip', (+dataMatches?.pages.length - 1) * 3)
  console.log('awiehuawe', typeof ((+dataMatches?.pages.length - 1) * 3))

  return (
    <div>
      {data && <SummonerHeader summoner={data} />}
      <div className="flex gap-8 items-start">
        {data && <SummonerRankCard summoner={data} />}
        <div className="w-full mr-80">
          {/* <h2 className="mb-4">Match History</h2> */}
          <div className="space-y-6">
            {dataMatches?.pages.flat().map((match: string) => (
              <SummonerMatchCard matchId={match} summonerId={data?.id} />
            ))}
          </div>
          {data && (
            <LoadMoreMatchesButton
              puuid={data?.id}
              skip={+dataMatches?.pages.length * 3}
            />
          )}
        </div>
      </div>
    </div>
  )
}
