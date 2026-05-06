export const primaryColor = 'cyan'

const SummonerLeagueConstant = {
  BRONZE: 'text-brown-400',
  CHALLENGER: 'text-white',
  DIAMOND: 'text-cyan-300',
  EMERALD: 'text-green-400',
  GOLD: 'text-amber-400',
  GRANDMASTER: 'text-purple-400',
  IRON: 'text-gray-400',
  MASTER: 'text-purple-400',
  PLATINUM: 'text-cyan-500',
  SILVER: 'text-gray-200',
}

export function changeStyleOnSummonerLeague(summonerLeague: string) {
  let style = ''
  switch (summonerLeague) {
    case 'BRONZE':
      style = SummonerLeagueConstant['BRONZE']
      break
    case 'CHALLENGER':
      style = SummonerLeagueConstant['CHALLENGER']
      break
    case 'DIAMOND':
      style = SummonerLeagueConstant['DIAMOND']
      break
    case 'EMERALD':
      style = SummonerLeagueConstant['EMERALD']
      break
    case 'GOLD':
      style = SummonerLeagueConstant['GOLD']
      break
    case 'GRANDMASTER':
      style = SummonerLeagueConstant['GRANDMASTER']
      break
    case 'IRON':
      style = SummonerLeagueConstant['IRON']
      break
    case 'MASTER':
      style = SummonerLeagueConstant['MASTER']
      break
    case 'PLATINUM':
      style = SummonerLeagueConstant['PLATINUM']
      break
    case 'SILVER':
      style = SummonerLeagueConstant['SILVER']
      break
    default:
      style = 'text-gray-300'
      break
  }
  return style
}

export function capitalizeString(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}
