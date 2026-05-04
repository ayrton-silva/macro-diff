import { ProfileIcon } from '#/shared/game/ProfileIcon'

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
          className="size-24 ring-2 rounded-md ring-green-400"
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
      </div>
    </div>
  )
}
