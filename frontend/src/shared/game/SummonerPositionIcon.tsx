interface SummonerPositionIconProps {
    teamPosition: string,
    customClass?: string,
}

export function SummonerPositionIcon({teamPosition, customClass}:SummonerPositionIconProps) {

    return (
        <div className={`${customClass}`}>
            <img
            src={`https://wiki.leagueoflegends.com/en-us/images/thumb/${(teamPosition[0].toUpperCase() + teamPosition.slice(1).toLowerCase()).replace('Utility', 'Support')}_icon.png/120px-${(teamPosition[0].toUpperCase() + teamPosition.slice(1).toLowerCase()).replace('Utility', 'Support')}_icon.png`}
            />
        </div>
    )
}