import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfileIcon {
  icon: number
  avatarSize?: string
  className?: string
}

export function ProfileIcon({ icon, avatarSize, className }: ProfileIcon) {
  return (
    <Avatar className={cn(avatarSize)    
        }
        >
      <AvatarImage
        className={cn("rounded-xs", className)          
        }
        src={`https://ddragon.leagueoflegends.com/cdn/16.9.1/img/profileicon/${icon}.png`}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
