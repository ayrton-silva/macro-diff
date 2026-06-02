'use client';

type Marker = {
    type: string;
    monsterSubType?: string;
    x: number;
    y: number;
    icon?: string;
};

const MARKERS: Marker[] = [
    { type: 'BUILDING_KILL', x: 10504, y: 1029, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 5846, y: 6396, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 4318, y: 13875, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 5048, y: 4812, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 981, y: 10441, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 13866, y: 4505, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 3651, y: 3696, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 1512, y: 6699, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 1169, y: 4287, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 1748, y: 2270, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 6919, y: 1483, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 4281, y: 1253, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 2177, y: 1807, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 1748, y: 2270, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 9767, y: 10113, icon: '🗼' },
    { type: 'BUILDING_KILL', x: 8955, y: 8510, icon: '🗼' },
    { type: 'MONSTER_ELITE_KILL', monsterSubType: 'CHEMTECH_DRAGON', x: 9837, y: 4397, icon: '🐉' },
    { type: 'MONSTER_ELITE_KILL', monsterSubType: 'CHEMTECH_DRAGON', x: 9847, y: 4427, icon: '🐉' },
    { type: 'MONSTER_ELITE_KILL', monsterSubType: 'CHEMTECH_DRAGON', x: 10370, y: 4930, icon: '🐉' },
    { type: 'CHAMPION_KILL', x: 12904, y: 1347, icon: '💀' },
    { type: 'CHAMPION_KILL', x: 2288, y: 13528, icon: '💀' },
    { type: 'CHAMPION_KILL', x: 12498, y: 1354, icon: '💀' },
];

const MIN_X = -2250;
const MAX_X = 16970;
const MIN_Y = -1100;
const MAX_Y = 15870;


type MatchMapProps = {
    /*   min: number
      max: number
      values: [number, number]
      setValues: SetStateAction<[number, number]> */
}

export function MatchMap({
    /*   min,
      max,
      values,
      setValues, */
}: MatchMapProps) {

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div className="rounded-md w-260">
                <img
                    className="w-260 h-auto block"
                    src="/public/assets/Summoner's_Rift_Update_Mapv2.png"
                    alt="Summoner's Rift Map"
                />
            </div>
            {MARKERS.map((p) => <span className="absolute text-4xl -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${((p.x - MIN_X) / (MAX_X - MIN_X)) * 100}%`, top: `${100 - ((p.y - MIN_Y) / (MAX_Y - MIN_Y)) * 100}%` }}>{p.icon} </span>)}

        </div>
    )
}
