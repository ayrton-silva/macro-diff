import { Spinner } from '#/components/ui/spinner'
import { useInfiniteExistentMatches } from '../hooks/useExistentMatches'

type LoadMoreMatchesButtonProps = {
  puuid: string
  cursor: string
}

export function LoadMoreMatchesButton({
  puuid,
  cursor,
}: LoadMoreMatchesButtonProps) {
  const { fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteExistentMatches({
      puuid,
      cursor,
      numberOfMatches: 3,
    })

  return (
    <button
      disabled={isFetchingNextPage}
      className="flex items-center justify-center mt-6 w-full border cursor-pointer border-gray-700 rounded-md py-3 bg-[#121826] enabled:hover:brightness-150 disabled:opacity-60 disabled:pointer-none: disabled:cursor-not-allowed"
      onClick={() => fetchNextPage()}
    >
      {isFetching ? <Spinner className="size-6" /> : 'Load more'}
    </button>
  )
}
