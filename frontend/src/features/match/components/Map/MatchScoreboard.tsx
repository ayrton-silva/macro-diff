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
    <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-11/12 h-16 bg-[rgba(30,41,57,0.7)] z-30 px-4 py-2 rounded-md backdrop-blur-[6px] before:w-1 before:absolute before:left-0 before:top-0 before:bg-cyan-400 before:bottom-0 before:rounded-l-sm after:w-1 after:absolute after:right-0 after:top-0 after:bg-red-400 after:bottom-0 after:rounded-r-sm">
      <div className="flex justify-between items-center h-full">
        <div className="flex gap-16 mr-auto">
          <h2 className="text-cyan-400 font-bold uppercase tracking-wider">
            Blue Team
          </h2>
          <div className="flex gap-2 justify-center items-center">
            <img className="size-6" src="/assets/Turret_icon.png" alt="" />
            {blue.buildings.length}
          </div>
          <div>
            <div className="flex gap-2 justify-center items-center relative">
              <img className="size-6" src="/assets/Gold_icon.svg" alt="" />
              {(blue.gold / 1000).toFixed(1)}K
              {blue.gold - red.gold >= 1000 && (
                <span className="absolute text-emerald-400 text-xs left-[40%] whitespace-nowrap -bottom-3.5">
                  +{((blue.gold - red.gold) / 1000).toFixed(1)}K
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center text-2xl w-40 font-bold absolute top-[50%] left-1/2 -translate-1/2 h-[120%] p-3 bg-gray-800 shadow-[0px_5px_24px_rgb(0,0,0,0.5)]">
          <h3 className="text-cyan-400">{blue.kills}</h3>
          <img src="/assets/versus.png" className="size-8" alt="" />
          <h3 className="text-red-400">{red.kills}</h3>
        </div>
        <div className="flex gap-16 ml-auto">
          <div>
            <div className="flex gap-2 justify-center items-center relative">
              <img className="size-6" src="/assets/Gold_icon.svg" alt="" />
              {(red.gold / 1000).toFixed(1)}K
              {red.gold - blue.gold >= 1000 && (
                <span className="absolute text-emerald-400 text-xs left-[40%] whitespace-nowrap -bottom-3.5">
                  +{((red.gold - blue.gold) / 1000).toFixed(1)}K
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <img className="size-6" src="/assets/Turret_icon.png" alt="" />
            {red.buildings.length}
          </div>
          <h2 className="text-red-400 font-bold uppercase tracking-wider">
            Red Team
          </h2>
        </div>
      </div>
      <div className="absolute top-full w-3/5 left-1/2 -translate-x-1/2 h-10 bg-[rgba(30,41,57,0.5)] z-30 px-4 py-2  backdrop-blur-[10px] rounded-b-md">
        <div className="flex justify-between">
          <div>
            <div className="flex gap-2 items-center justify-center">
              <img src="/assets/Voidgrub.png" className="size-6" alt="" />
              <span>{blue.hordes}</span>
            </div>
          </div>
          <div>
            <div className="flex gap-2 items-center justify-center">
              <img src="/assets/Voidgrub.png" className="size-6" alt="" />
              <span>{red.hordes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
