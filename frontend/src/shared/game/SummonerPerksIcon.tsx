import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { perkImageNames } from "./MatchEvent/types";

interface SummonerPerksIconProps {
    summonerPerkKey: number,
    customClass?: string,
    isSubPerk?: boolean
}

export function SummonerPerkIcon({summonerPerkKey, customClass, isSubPerk = false}:SummonerPerksIconProps) {
    let parent = ''
    let url = ''
    for(const [key,value] of Object.entries(perkImageNames)){
        for(const [k,val] of Object.entries(value)){
            if(+k == summonerPerkKey){
                parent = key
                url = val.url
            }
        }
        
    }
    return (
        <Avatar className="w-7 h-7 items-center justify-center">
            {isSubPerk ?        <AvatarImage 
            className={`rounded-full items-center border-0 border-black ${customClass}`} 
            src={url} />:
            <AvatarImage 
            className={`rounded-full items-center border-0 border-black ${customClass}`} 
            src={url} />
            }
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}