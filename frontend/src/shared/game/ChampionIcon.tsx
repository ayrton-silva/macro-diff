import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChampionIconProps {
    icon: string
    level?: number
}

export function ChampionIcon({icon, level}:ChampionIconProps) {
    return (
        <Avatar className="w-14 h-14">
            <AvatarImage className="rounded-xs" src={`https://ddragon.leagueoflegends.com/cdn/16.9.1/img/champion/${icon}.png`} />
                     <AvatarBadge className="bg-black w-5! h-5! flex items-center justify-center ring-0">
                               <span className="text-xs font-bold">{level}</span>
                                </AvatarBadge>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}