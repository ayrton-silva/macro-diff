import { Skeleton } from '#/components/ui/skeleton'
import { SummonerCard } from '#/features/search-summoners/components/SummonerCard'
import { useSummoners } from '#/features/search-summoners/hooks/useSummoners'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/search-summoners')({
  component: RouteComponent,
})

function RouteComponent() {
  const { gameName, tagLine, region } = useSearch({
    from: Route.fullPath,
  })

  const { status, data, error, isFetching } = useSummoners({
    gameName,
    tagLine,
    region,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      if (data.puuid) {
        navigate({
          to: `/summoner`,
          search: {
            gameName: gameName,
            region: region,
            tagLine: tagLine,
          },
        })
      }
    }
  }, [data])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-8 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Search Results</h1>
        {isFetching ? (
          <p>Searching Summoner...</p>
        ) : (
          <p>
            Found {data?.directSearch?.length} summoners matching{' '}
            <span className="font-bold text-cyan-500">"{gameName}"</span>
          </p>
        )}
      </div>
      {isFetching ? (
        <div className="mt-4 border border-gray-700 bg-[#0E1828] rounded-md p-4 pb-5">
          <div className="flex gap-4">
            <Skeleton className="size-14 shrink-0" />
            <div className="flex flex-col w-full gap-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-2/3 h-4" />
            </div>
          </div>
        </div>
      ) : (
        data?.directSearch?.length > 0 && (
          <div className="mt-4 border border-gray-700 bg-[#0E1828] rounded-md">
            {data?.directSearch?.map((summoner) => (
              <SummonerCard summoner={summoner} />
            ))}
          </div>
        )
      )}
    </div>
  )
}
