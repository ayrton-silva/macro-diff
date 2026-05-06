import { SearchSummonerForm } from '#/features/home/components/SearchSummonerForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="flex justify-center m-10 mt-6">
      <div className='text-center'>
          <h1 className='flex flex-col text-5xl font-title text-shadow-md mt-20 mb-6 text-shadow-cyan-400'>
          DOMINATE THE
          <span className='text-cyan-400 mt-4'>RIFT</span> 
          </h1>
          <h2 className='text-gray-400'>Track your stats, analyze pro builds, and climb the ranks with the ultimate gaming companion.</h2>
        <SearchSummonerForm />
      </div>
    </main>
  )
}
