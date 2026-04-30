import { useMatches } from '@/features/matches-list/hooks/useMatches'
import { MatchCard } from '@/features/matches-list/components/MatchCard'
import { createFileRoute } from '@tanstack/react-router'
import { useChampions } from '@/shared/hooks/useChampions'

export const Route = createFileRoute('/matches')({
  component: RouteComponent,
})


function RouteComponent() {
  const { status, data, error, isFetching } = useMatches('-Wj7wFERxJTf8fIj0qNENBY1WzrBGsSzRF6o09mwZfpL5M7GTrnvA11RE34N4mU0MCoNnsQhnoQvbw')
  const { status: statusChampions, data: dataChampions, error: errorChampions, isFetching: isFetchingChampions } = useChampions()

  return (
     data?.map((match: string) => (
      <MatchCard matchId={match}/>
     ))
  )
}
