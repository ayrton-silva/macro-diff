import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSummonerSpells } from "../hooks/useSummonerSpells";

interface SummonerSpellIconProps {
    summonerSpellKey: number
}

export function SummonerSpellIcon({summonerSpellKey}:SummonerSpellIconProps) {
    const { status, data: spells, error, isFetching } = useSummonerSpells()
    let spell = ''

   if (spells?.data) {
     for (const [key, value] of Object.entries(spells?.data) ) {
        if (value.key === summonerSpellKey.toString()) {
            spell = value.id
        }
    }
   }
    
    return (
        <Avatar className="w-7 h-7">
            <AvatarImage className="rounded-xs border border-black" src={`https://ddragon.leagueoflegends.com/cdn/16.9.1/img/spell/${spell}.png`} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}