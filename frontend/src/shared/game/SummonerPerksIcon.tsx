import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSummonerPerks } from "../hooks/useSummonerSpells";

interface SummonerPerksIconProps {
    summonerSpellKey: number
}

export function SummonerSpellIcon({summonerPerkKey}:SummonerPerksIconProps) {
    const { status, data: perks, error, isFetching } = useSummonerPerks()
    let perk = ''

   if (perk?.data) {
     for (const [key, value] of Object.entries(perk?.data) ) {
        if (value.key === summonerPerkKey.toString()) {
            spell = value.id
        }
    }
   }
    
    return (
        <Avatar className="w-7 h-7">
            <AvatarImage className="rounded-xs border border-black" src={`https://ddragon.leagueoflegends.com/cdn/16.9.1/img/spell/${perk}.png`} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}