type Team = {
  kills: number
  gold: number
  dragons: []
  buildings: []
  nashors: number
  hordes: number
  herald: number
  winner: false
  participants: {}
}

type MatchScoreboardProps = {
  blue: Team
  red: Team
}

export function MatchScoreboard({ blue, red }: MatchScoreboardProps) {
  return (
    <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-11/12 h-16 bg-gray-800 z-30 px-4 py-2 rounded-md">
      <div className="flex justify-between items-center">
        <h2>Blue Team</h2>
        <div className="flex gap-2 justify-center items-center">
          <img className="size-6" src="/public/assets/Turret_icon.png" alt="" />
          {blue.buildings.length}
        </div>
        <div>
          <div className="flex gap-2 justify-center items-center">
            <img className="size-6" src="/public/assets/Gold_icon.svg" alt="" />
            {(blue.gold / 1000).toFixed(1)}K
          </div>
          {blue.gold - red.gold >= 1000 && (
            <span>+{((blue.gold - red.gold) / 1000).toFixed(1)}K</span>
          )}
        </div>
        <div>{blue.kills}</div>
        <span>X</span>
        <div>{red.kills}</div>
        <div>
          <div className="flex gap-2 justify-center items-center">
            <img className="size-6" src="/public/assets/Gold_icon.svg" alt="" />
            {(red.gold / 1000).toFixed(1)}K
          </div>
          {red.gold - blue.gold >= 1000 && (
            <span>+{((red.gold - blue.gold) / 1000).toFixed(1)}K</span>
          )}
        </div>
        <div className="flex gap-2 justify-center items-center">
          <img className="size-6" src="/public/assets/Turret_icon.png" alt="" />
          {red.buildings.length}
        </div>
        <h2>Red Team</h2>
      </div>
    </div>
  )
}
