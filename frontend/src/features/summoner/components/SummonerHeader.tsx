import { ProfileIcon } from '#/shared/game/ProfileIcon'
import { Link } from '@tanstack/react-router'
import { RefreshCw, Share2, Undo2 } from 'lucide-react'

type SummonerHeaderProps = {
  summoner: {
    gameName: string
    profileIconId: number
    region: string
    tagLine: string
    level: number
  }
}


export function SummonerHeader({ summoner }: SummonerHeaderProps) {
  return (
    <div className="mb-6 bg-[#121826] px-12 py-8 pl-[320px] flex gap-8 border-b border-b-gray-700">
      <div className="relative w-fit">
        <ProfileIcon
          icon={summoner.profileIconId}
          className="size-24 ring-2 rounded-md ring-cyan-400"
          avatarSize="size-24"
        />
        <div className="absolute bg-gray-700 text-white text-sm left-1/2 px-3 py-1 whitespace-nowrap rounded-full -translate-1/2">
          {summoner.level}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-white text-2xl">{summoner.gameName}</h1>
          <span className="rounded-xs border border-gray-700 bg-gray-800 px-3 py-1">
            #{summoner.tagLine}
          </span>
        </div>
        <span>{summoner.region == "br1" ? <img className='size-6' src="/public/assets/br1.svg" alt="Brazil Flag" /> : summoner.region} </span>
        <Link to={`${window.location}`}
          className='flex items-center w-fit border gap-2 mt-1 px-3 py-2 bg-cyan-400 text-black! hover:text-gray-800 text-sm font-bold rounded-sm hover:cursor-pointer hover:bg-cyan-300'>
          <RefreshCw size={18} />Refresh Data</Link>
        {/* TO DO LOGIC CALLING CURSOR EMPTY AND CREATE A COMPONENT*/}
      </div>
      <div className='flex items-center ml-auto gap-2'>

        <Link to="/" className='flex items-center ml-auto border gap-2 h-12 px-4 py-1 bg-gray-800 text-white! rounded-md hover:cursor-pointer hover:bg-gray-700'><Undo2 /></Link>
        <button className='flex items-center ml-auto border gap-2 h-12 px-4 py-1 bg-gray-800 text-white rounded-md hover:cursor-pointer hover:bg-gray-700 mr-[280px]'><Share2 /></button>
        {/* TO DO SHARE LOGIC AND CREATE A COMPONENT WITH THE LOGIC */}
      </div>
    </div>
  )
}
