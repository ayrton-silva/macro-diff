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

export const dragonColor = {
  'FIRE_DRAGON': 'text-orange-500',
  'AIR_DRAGON': 'text-cyan-300',
  'WATER_DRAGON': 'text-emerald-500',
  'HEXTECH_DRAGON': 'text-cyan-500',
  'CHEMTECH_DRAGON': 'text-green-500',
  'EARTH_DRAGON': 'text-amber-700',
  'ELDER_DRAGON': 'text-indigo-300'
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

export function capitalizeComplexString(string: string){
  let stringArray = string.split('_')
  for (let i = 0; i < stringArray.length; i++) {
    stringArray[i] = capitalizeString(stringArray[i].toLowerCase())
  }
  return stringArray.join(' ')
}

export function returnDateAgo(input: number) {
  const timeAgo = (new Date().getTime() - +input) / 1000 / 3600 / 24

  if (timeAgo * 24 < 1) {
    return Math.floor(timeAgo * 24 * 60) + ' min ago'
  }
  if (timeAgo < 1) {
    return Math.floor(timeAgo * 24) + ' hours ago'
  }
  return Math.round(timeAgo) + ' days ago'
}
export function returnTime(input: number) {
  return (
    (Math.floor(input / 60000) < 10
      ? '0' + Math.floor(input / 60000)
      : Math.floor(input / 60000)) +
    ':' +
    (Math.floor((input % 60000) / 1000) < 10
      ? '0' + Math.floor((input % 60000) / 1000)
      : Math.floor((input % 60000) / 1000))
  )
}

export function showDivisionByTier(tier: string) {
  return !['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(tier)
}

export function calculateKDA(kills: number, assists: number, deaths: number) {
  return kills + assists == 0
    ? '0'
    : Math.round((100 * (kills + assists)) / (deaths == 0 ? 1 : deaths)) / 100
}
