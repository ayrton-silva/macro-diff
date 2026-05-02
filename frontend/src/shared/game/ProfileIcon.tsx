import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfileIcon {
  icon: number
}

export function ProfileIcon({ icon }: ProfileIcon) {
  return (
    <Avatar className="w-14 h-14">
      <AvatarImage
        className="rounded-xs"
        src={`https://ddragon.leagueoflegends.com/cdn/16.9.1/img/profileicon/${icon}.png`}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
