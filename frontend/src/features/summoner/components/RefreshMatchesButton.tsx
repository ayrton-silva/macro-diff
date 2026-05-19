import { Spinner } from '#/components/ui/spinner'
import { RefreshCw } from 'lucide-react'
import { useExistentMatches } from '../hooks/useExistentMatches'
import { fetchClearMatchesCacheByPuuid } from '../services/fetchClearMatchesCache'

type RefreshMatchesButtonProps = {
  puuid: string
}

export function RefreshMatchesButton({ puuid }: RefreshMatchesButtonProps) {
  const { refetch, status, data, isFetching } =  useExistentMatches({ puuid, cursor : "", numberOfMatches: 3})

  async function handleOnClick(){
    await fetchClearMatchesCacheByPuuid(puuid)
    refetch()
  }

  return (
    <button
      disabled={isFetching}
      className="flex items-center w-fit border mt-1 px-3 py-2 bg-cyan-400 text-black! hover:text-gray-800 text-sm font-bold rounded-sm hover:cursor-pointer hover:bg-cyan-300 enabled:hover:brightness-150 disabled:opacity-60 disabled:pointer-none: disabled:cursor-not-allowed"
      onClick={() => handleOnClick()}
    >
      {isFetching ? <Spinner className="size-6" /> : <div className='flex items-center gap-2 '><RefreshCw size={18}/>Refresh Data</div>}
    </button>
  )
}

