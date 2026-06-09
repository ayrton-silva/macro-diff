import { cn } from '#/lib/utils'
import { Switch } from '@base-ui/react/switch'
import { Skull, TowerControl, Eye, Crosshair } from 'lucide-react'

type MatchTimelineFiltersProps = {
  filter: {
    championKills: boolean
    objectives: boolean
    buildings: boolean
    wards: boolean
  }
  setFilter: any
}

const filterOptions = [
  {
    icon: Skull,
    title: 'Champion Kills',
    filterOption: 'championKills',
  },
  {
    icon: Crosshair,
    title: 'Objectives',
    filterOption: 'objectives',
  },
  {
    icon: TowerControl,
    title: 'Buildings',
    filterOption: 'buildings',
  },
  {
    icon: Eye,
    title: 'Wards',
    filterOption: 'wards',
  },
]

export function MatchTimelineFilters({
  filter,
  setFilter,
}: MatchTimelineFiltersProps) {
  return (
    <div className="mb-4 bg-gray-900 rounded-md px-4 py-2 pb-6">
      <h2 className="mb-6 tracking-widest uppercase font-semibold text-gray-300 mt-4 ml-2">
        Timeline Filters
      </h2>
      <div className="space-y-4">
        {filterOptions.map((opt) => (
          <div
            className={cn(
              'p-3 rounded-md ring',
              filter[opt.filterOption]
                ? 'bg-[#0F3736] ring-emerald-700 text-emerald-400'
                : 'ring-gray-600',
            )}
          >
            <label className="flex items-center justify-between gap-2 text-base">
              <div className="flex gap-3 items-center">
                <opt.icon size={20} />
                <span>{opt.title}</span>
              </div>
              <Switch.Root
                checked={filter[opt.filterOption]}
                onClick={() =>
                  setFilter({
                    ...filter,
                    [opt.filterOption]: !filter[opt.filterOption],
                  })
                }
                className="
          relative flex h-6 w-12 rounded-full
          hover:bg-gray-500
          bg-gray-600
          p-[3px]
          hover:cursor-pointer
      
   
          transition-colors duration-150
          focus-visible:outline-blue-800
          active:bg-gray-400
          data-[checked]:bg-emerald-400
          data-[checked]:hover:bg-emerald-300
          dark:bg-gray-700
        "
              >
                <Switch.Thumb
                  className="
            aspect-square h-full rounded-full
            bg-gray-900
            shadow-md
            transition-transform duration-150
            data-[checked]:translate-x-6
          "
                />
              </Switch.Root>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
