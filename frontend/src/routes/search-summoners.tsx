import { SummonerCard } from '#/features/search-summoners/components/SummonerCard'
import { useSummoners } from '#/features/search-summoners/hooks/useSummoners'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/search-summoners')({
  component: RouteComponent,
})

function RouteComponent() {
  const { gameName, tagLine, region } = useSearch({
    from: Route.fullPath,
  })

  const [summoner, setSummoner] = useState({})

  const { status, data, error, isFetching } = useSummoners({
    gameName,
    tagLine,
    region,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success') {
      setSummoner(data)
    }
  }, [data])

  useEffect(() => {
    if (
      summoner.hasOwnProperty('summonerExactlyMatch') &&
      summoner.summonerExactlyMatch.length > 0
    ) {
      navigate({
        to: `/summoner`,
        search: {
          gameName: summoner.summonerExactlyMatch[0].gameName,
          region: summoner.summonerExactlyMatch[0].region,
          tagLine: summoner.summonerExactlyMatch[0].tagLine,
        },
      })
    }
  }, [summoner])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-8 mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Search Results</h1>
        <p>
          Found {summoner?.directSearch?.length} summoners matching{' '}
          <span className="font-bold text-green-500">"{gameName}"</span>
        </p>
      </div>
      <div className="mt-4 border border-gray-700 bg-[#0E1828] rounded-md">
        {summoner?.directSearch?.map((summoner) => (
          <SummonerCard summoner={summoner} />
        ))}
      </div>
    </div>
  )
}
