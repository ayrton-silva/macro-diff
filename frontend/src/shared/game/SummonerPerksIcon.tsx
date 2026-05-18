import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { perkImageNames } from "./MatchEvent/types";

interface SummonerPerksIconProps {
    summonerPerkKey: number,
    customClass?: string,
    isSubPerk?: boolean
}

export function SummonerPerkIcon({summonerPerkKey, customClass, isSubPerk = false}:SummonerPerksIconProps) {
    let parent = ''
    let name = ''
    for(const [key,value] of Object.entries(perkImageNames)){
        for(const [k,val] of Object.entries(value)){
            if(+k == summonerPerkKey){
                parent = key
                name = val
            }
        }
        
    }
    return (
        <Avatar className="w-7 h-7 items-center justify-center">
            {isSubPerk ?        <AvatarImage 
            className={`rounded-full items-center border-0 border-black ${customClass}`} 
            src={`https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/${name}.png`} />:
            <AvatarImage 
            className={`rounded-full items-center border-0 border-black ${customClass}`} 
            src={`https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/${parent}/${name}/${name}.png`} />
            }
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}