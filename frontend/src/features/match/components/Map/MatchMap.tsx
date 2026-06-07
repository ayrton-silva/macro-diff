import { MapTooltip } from '#/components/ui/map-tooltip'
import { ChampionIcon } from '#/shared/game/ChampionIcon'

export type EventMarker = {
  eventId: number
  type: string
  timestamp?: number
  monsterType?: string
  monsterSubType?: string
  positionx?: number
  positiony?: number
  icon?: string
  assistingParticipantIds: []
  buildingType?: string
  creatorId?: string
  killType?: string
  killerId?: string
  killerName?: string
  multiKillLength?: number
  participantPuuid?: string
  teamId?: number
  towerType?: string
  victimId?: string
  victimName?: string
  wardType?: string
}

export type ParticipantMarker = {
  positionX: number
  positionY: number
  champion: string
  kills: number
  deaths: number
  assists: number
  gameName: string
  teamPosition: string
  summonerId: string
  currentGold: number
  jungleMinionsKilled: number
  minionsKilled: number
  teamId: number
  champLevel: number
  isDead: boolean
  lastDeath: number
  brw: number
}

type MatchMapProps = {
  participants: ParticipantMarker[]
  events: EventMarker[]
  currentTimestamp: number[]
}

const MIN_X = -2250
const MAX_X = 16970
const MIN_Y = -1100
const MAX_Y = 15870

export function MatchMap({
  participants,
  events,
  currentTimestamp,
}: MatchMapProps) {
  events.map((z)=> z.killerName = participants.filter((p)=> p.summonerId == z.killerId)[0]?.gameName)
  events.map((z)=> z.victimName = participants.filter((p)=> p.summonerId == z.victimId)[0]?.gameName)
  return (
    <div
      className="mt-8"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <div className="rounded-md w-260">
        <img
          className="w-260 h-auto block"
          src="/assets/Summoner's_Rift_Update_Mapv2.png"
          alt="Summoner's Rift Map"
        />
      </div>
      {events.map(
        (p, index) =>
          p.positionx &&
          p.positiony && 
          (
            <div
              key={index}
              className={`absolute group transition-all transition-discrete duration-1000 -translate-x-1/2 -translate-y-1/2 z-10 hover:z-50 ${p.timestamp && p.timestamp + 120000 < currentTimestamp[0] && p.type != 'BUILDING_KILL' ? 'hidden opacity-20 scale-95 z-0' : `${p.type == 'BUILDING_KILL' && p.timestamp && p.timestamp + 120000 < currentTimestamp[0] ? 'opacity-50 scale-90':''}`}`}
              style={{
                left: `${((p.positionx - MIN_X) / (MAX_X - MIN_X)) * 100}%`,
                top: `${100 - ((p.positiony - MIN_Y) / (MAX_Y - MIN_Y)) * 100}%`,
              }}
            >
              <MapTooltip
                eventData={p}
                classProp="bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block"
              />
              <span className="block text-3xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-150">
                {p.type === 'CHAMPION_KILL' ? (
                  <div>
                    <img
                      src="/assets/MapMarkers/Kill.png"
                      alt="killed champion"
                      className="w-10"
                    />
                  </div>
                ) : p.monsterType === 'DRAGON' ? (
                  <div>
                    <img
                      src={`/assets/MapMarkers/${p.monsterSubType}.png`}
                      alt={`Dragon ${p.monsterSubType} image`}
                      className="w-18"
                    />
                  </div>
                ) : p.buildingType === 'TOWER_BUILDING' ? (
                  <div>
                    <img
                      src="/assets/MapMarkers/Tower.png"
                      alt="killed champion"
                      className="w-14"
                    />
                  </div>
                ) : p.buildingType === 'INHIBITOR_BUILDING' ? (
                  <div>
                    <img
                      src="/assets/MapMarkers/Inhibitor.png"
                      alt="killed champion"
                      className="w-14"
                    />
                  </div>
                ) : p.monsterType === 'RIFTHERALD' ? (
                  <div>
                    <img
                      src="/assets/MapMarkers/Riftherald.png"
                      alt="killed champion"
                      className="w-18"
                    />
                  </div>
                ) : p.monsterType === 'HORDE' ? (
                  <div>
                    <img
                      src="/assets/MapMarkers/Horde.png"
                      alt="killed champion"
                      className="w-8"
                    />
                  </div>
                ) : p.monsterType === 'BARON_NASHOR' ? (
                  <div>
                    <img
                      src="/assets/MapMarkers/BaronNashor.png"
                      alt="killed champion"
                      className="w-18"
                    />
                  </div>
                ) : (
                  ''
                )}
              </span>
            </div>
          ),
      )}
      {participants.map(
        (p, index) =>
          p.positionX &&
          p.positionY && (
            <div
              key={index}
              className={`absolute group transition-all transition-discrete duration-1000 -translate-x-1/2 -translate-y-1/2 z-10 hover:z-50`}
              style={{
                left: `${((p.positionX - MIN_X) / (MAX_X - MIN_X)) * 100}%`,
                top: `${100 - ((p.positionY - MIN_Y) / (MAX_Y - MIN_Y)) * 100}%`,
              }}
            >
              <MapTooltip
                participant={p}
                classProp="bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block"
              />
              <div className="transition-all transition-discrete duration-200 hover:scale-115 relative">
                <ChampionIcon
                  icon={p.champion}
                  level={p.champLevel}
                  removeLevel={p.isDead}
                  avatarProp="w-12 h-12"
                  classProp={`block rounded-full  border-2 ${p.teamId.toString() === '100' ? 'border-cyan-400' : 'border-red-400'} ${p.isDead && 'grayscale-100'}`}
                />
                {p.isDead && (
                  <div className="w-full h-full rounded-full flex justify-center items-center absolute top-1/2 left-1/2 -translate-1/2 text-xl text-red-500 text-shadow-black text-shadow-lg font-bold bg-[rgba(0,0,0,0.3)]">
                    {p.brw}
                  </div>
                )}
              </div>
            </div>
          ),
      )}
    </div>
  )
}
