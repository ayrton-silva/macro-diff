import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

interface ChampionIconProps {
  icon: string
  level?: number
  removeLevel?:boolean
  classProp?: string
}

export function ChampionIcon({  icon, level , removeLevel, classProp}: ChampionIconProps) {
  return (
    <Avatar className="w-14 h-14">
      <AvatarImage
        className={`rounded-xs ${classProp}`}
        src={`https://ddragon.leagueoflegends.com/cdn/16.9.1/img/champion/${icon}.png`}
      />{!removeLevel ?
      <AvatarBadge className="bg-black w-5! h-5! flex items-center justify-center ring-0">
        <span className="text-xs font-bold text-white">{level}</span>
      </AvatarBadge>: ""}
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
