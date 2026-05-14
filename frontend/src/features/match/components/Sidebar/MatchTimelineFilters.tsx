type MatchTimelineFiltersProps = {
  filter: {
    championKills: boolean
    objectives: boolean
    buildings: boolean
    wards: boolean
  }
  setFilter: any
}

export function MatchTimelineFilters({
  filter,
  setFilter,
}: MatchTimelineFiltersProps) {
  console.log('filter', filter)
  return (
    <div className="mb-4 bg-gray-900 rounded-md px-4 py-2">
      <h2 className="mb-6 tracking-widest uppercase font-semibold text-gray-300 mt-4 ml-2">
        Timeline Filters
      </h2>
      <h1>ue {filter.championKills}</h1>
      <div
        className={filter.championKills ? 'bg-emerald-400' : ''}
        onClick={() =>
          setFilter({ ...filter, championKills: !filter.championKills })
        }
      >
        Champion Kills
      </div>
      <div
        className={filter.objectives ? 'bg-emerald-400' : ''}
        onClick={() => setFilter({ ...filter, objectives: !filter.objectives })}
      >
        Objectives
      </div>
      <div
        className={filter.buildings ? 'bg-emerald-400' : ''}
        onClick={() => setFilter({ ...filter, buildings: !filter.buildings })}
      >
        Buildings
      </div>
      <div
        className={filter.wards ? 'bg-emerald-400' : ''}
        onClick={() => setFilter({ ...filter, wards: !filter.wards })}
      >
        Wards
      </div>
    </div>
  )
}
